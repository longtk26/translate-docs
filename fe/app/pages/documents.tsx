import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/documents";
import {
    Search,
    Filter,
    Download,
    Eye,
    Trash2,
    MoreVertical,
    FileText,
    Grid3X3,
    List,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Select } from "~/components/ui/select";
import type { Document } from "~/types";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "My Documents - TranslateDocs" },
        { name: "description", content: "Manage your translated documents" },
    ];
}

// Mock data
const mockDocuments: Document[] = [
    {
        id: "1",
        name: "Business Proposal",
        originalName: "business_proposal.pdf",
        size: 2048000,
        status: "completed",
        sourceLanguage: "en",
        targetLanguages: ["es", "fr"],
        quality: "premium",
        uploadedAt: "2026-01-24T10:30:00Z",
        completedAt: "2026-01-24T12:45:00Z",
        pages: 12,
        cost: 12.0,
        preserveFormatting: true,
    },
    {
        id: "2",
        name: "User Manual",
        originalName: "user_manual.docx",
        size: 5120000,
        status: "processing",
        sourceLanguage: "en",
        targetLanguages: ["de", "ja", "zh-CN"],
        quality: "standard",
        uploadedAt: "2026-01-25T09:15:00Z",
        pages: 45,
        cost: 27.0,
        preserveFormatting: true,
    },
    {
        id: "3",
        name: "Contract Agreement",
        originalName: "contract.pdf",
        size: 1536000,
        status: "completed",
        sourceLanguage: "en",
        targetLanguages: ["es"],
        quality: "premium",
        uploadedAt: "2026-01-23T14:20:00Z",
        completedAt: "2026-01-24T16:30:00Z",
        pages: 8,
        cost: 4.0,
        preserveFormatting: true,
    },
];

export default function Documents() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [documents] = useState<Document[]>(mockDocuments);

    const filteredDocuments = documents.filter((doc) => {
        const matchesSearch = doc.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || doc.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatFileSize = (bytes: number) => {
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(2)} MB`;
    };

    const getStatusBadge = (status: Document["status"]) => {
        switch (status) {
            case "completed":
                return <Badge variant="default">Completed</Badge>;
            case "processing":
                return <Badge className="bg-blue-600">Processing</Badge>;
            case "pending":
                return <Badge variant="secondary">Pending</Badge>;
            case "failed":
                return <Badge variant="destructive">Failed</Badge>;
        }
    };

    return (
        <main className="pt-24 pb-12 px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            My Documents
                        </h1>
                        <p className="text-gray-600">
                            Manage and access all your translated documents
                        </p>
                    </div>
                    <Button asChild>
                        <Link to="/upload">Upload New Document</Link>
                    </Button>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search documents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="processing">Processing</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </Select>

                        <div className="flex items-center border rounded-md">
                            <Button
                                variant={
                                    viewMode === "grid" ? "secondary" : "ghost"
                                }
                                size="icon"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "secondary" : "ghost"
                                }
                                size="icon"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents Grid/List */}
            {filteredDocuments.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            No documents found
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery || statusFilter !== "all"
                                ? "Try adjusting your filters"
                                : "Start by uploading your first document"}
                        </p>
                        <Button asChild>
                            <Link to="/upload">Upload Document</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocuments.map((doc) => (
                        <Card
                            key={doc.id}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                            <FileText className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold truncate">
                                                {doc.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {doc.pages} pages
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="flex-shrink-0"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    to={`/documents/${doc.id}/preview`}
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Preview
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {getStatusBadge(doc.status)}
                                    <div className="text-sm text-gray-600">
                                        <p>
                                            Uploaded:{" "}
                                            {formatDate(doc.uploadedAt)}
                                        </p>
                                        {doc.completedAt && (
                                            <p>
                                                Completed:{" "}
                                                {formatDate(doc.completedAt)}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {doc.targetLanguages
                                            .slice(0, 3)
                                            .map((lang) => (
                                                <Badge
                                                    key={lang}
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {lang.toUpperCase()}
                                                </Badge>
                                            ))}
                                        {doc.targetLanguages.length > 3 && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                +
                                                {doc.targetLanguages.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {doc.status === "completed" && (
                                    <div className="flex gap-2">
                                        <Button
                                            asChild
                                            size="sm"
                                            className="flex-1"
                                        >
                                            <Link
                                                to={`/documents/${doc.id}/preview`}
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                Preview
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    {filteredDocuments.map((doc) => (
                        <Card key={doc.id}>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                            <FileText className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold truncate">
                                                {doc.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{doc.pages} pages</span>
                                                <span>
                                                    {formatFileSize(doc.size)}
                                                </span>
                                                <span>
                                                    {formatDate(doc.uploadedAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        {getStatusBadge(doc.status)}
                                        <div className="flex gap-1">
                                            {doc.targetLanguages
                                                .slice(0, 2)
                                                .map((lang) => (
                                                    <Badge
                                                        key={lang}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {lang.toUpperCase()}
                                                    </Badge>
                                                ))}
                                            {doc.targetLanguages.length > 2 && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    +
                                                    {doc.targetLanguages
                                                        .length - 2}
                                                </Badge>
                                            )}
                                        </div>
                                        {doc.status === "completed" && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        to={`/documents/${doc.id}/preview`}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Preview
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    );
}
