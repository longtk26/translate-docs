import { useState } from "react";
import type { Route } from "./+types/glossary";
import {
    Plus,
    Search,
    Download,
    Upload,
    Edit,
    Trash2,
    MoreVertical,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Textarea } from "~/components/ui/textarea";
import type { Glossary, GlossaryTerm } from "~/types";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Glossaries - TranslateDocs" },
        { name: "description", content: "Manage your translation glossaries" },
    ];
}

export default function GlossaryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGlossary, setSelectedGlossary] = useState<string | null>(
        "legal",
    );
    const [isAddTermOpen, setIsAddTermOpen] = useState(false);
    const [isCreateGlossaryOpen, setIsCreateGlossaryOpen] = useState(false);

    // Mock data
    const glossaries: Glossary[] = [
        {
            id: "legal",
            name: "Legal Terms",
            description: "Legal and compliance terminology",
            termCount: 45,
            sourceLanguage: "en",
            targetLanguage: "es",
            createdAt: "2025-01-15",
            updatedAt: "2025-01-20",
        },
        {
            id: "medical",
            name: "Medical Terms",
            description: "Healthcare and medical terminology",
            termCount: 120,
            sourceLanguage: "en",
            targetLanguage: "es",
            createdAt: "2025-01-10",
            updatedAt: "2025-01-18",
        },
        {
            id: "tech",
            name: "Technology",
            description: "IT and software development terms",
            termCount: 89,
            sourceLanguage: "en",
            targetLanguage: "es",
            createdAt: "2025-01-05",
            updatedAt: "2025-01-22",
        },
    ];

    const terms: GlossaryTerm[] = [
        {
            id: "1",
            sourceText: "confidentiality agreement",
            targetText: "acuerdo de confidencialidad",
            context: "Used in legal contracts",
            glossaryId: "legal",
        },
        {
            id: "2",
            sourceText: "intellectual property",
            targetText: "propiedad intelectual",
            context: "Legal term for copyrights, patents, trademarks",
            glossaryId: "legal",
        },
        {
            id: "3",
            sourceText: "jurisdiction",
            targetText: "jurisdicción",
            context: "Legal authority over a territory",
            glossaryId: "legal",
        },
    ];

    const currentGlossary = glossaries.find((g) => g.id === selectedGlossary);

    return (
        <main className="pt-16 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Glossaries</h1>
                        <p className="text-gray-600 mt-2">
                            Create custom glossaries to ensure consistent
                            translations
                        </p>
                    </div>
                    <Dialog
                        open={isCreateGlossaryOpen}
                        onOpenChange={setIsCreateGlossaryOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Glossary
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Glossary</DialogTitle>
                                <DialogDescription>
                                    Create a custom glossary for consistent
                                    translations
                                </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="glossary-name">Name</Label>
                                    <Input
                                        id="glossary-name"
                                        placeholder="e.g., Legal Terms"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="glossary-description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="glossary-description"
                                        placeholder="Brief description of this glossary"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="source-lang">
                                            Source Language
                                        </Label>
                                        <Input
                                            id="source-lang"
                                            defaultValue="English"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="target-lang">
                                            Target Language
                                        </Label>
                                        <Input
                                            id="target-lang"
                                            defaultValue="Spanish"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            setIsCreateGlossaryOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit">Create</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-4 gap-6">
                    {/* Glossary List Sidebar */}
                    <div className="col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Your Glossaries
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {glossaries.map((glossary) => (
                                    <button
                                        key={glossary.id}
                                        onClick={() =>
                                            setSelectedGlossary(glossary.id)
                                        }
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                                            selectedGlossary === glossary.id
                                                ? "bg-indigo-50 border-2 border-indigo-600"
                                                : "border-2 border-transparent hover:bg-gray-50"
                                        }`}
                                    >
                                        <p className="font-medium text-sm">
                                            {glossary.name}
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {glossary.termCount} terms
                                        </p>
                                    </button>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Terms Table */}
                    <div className="col-span-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>
                                            {currentGlossary?.name}
                                        </CardTitle>
                                        <CardDescription>
                                            {currentGlossary?.description}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Import CSV
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Export
                                        </Button>
                                        <Dialog
                                            open={isAddTermOpen}
                                            onOpenChange={setIsAddTermOpen}
                                        >
                                            <DialogTrigger asChild>
                                                <Button size="sm">
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Term
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Add New Term
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Add a new term pair to
                                                        your glossary
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="source-term">
                                                            Source Term
                                                        </Label>
                                                        <Input
                                                            id="source-term"
                                                            placeholder="e.g., confidentiality agreement"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="target-term">
                                                            Target Term
                                                        </Label>
                                                        <Input
                                                            id="target-term"
                                                            placeholder="e.g., acuerdo de confidencialidad"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="context">
                                                            Context (Optional)
                                                        </Label>
                                                        <Textarea
                                                            id="context"
                                                            placeholder="Usage notes or context for this term"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() =>
                                                                setIsAddTermOpen(
                                                                    false,
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button type="submit">
                                                            Add Term
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Search */}
                                <div className="mb-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search terms..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                {/* Terms Table */}
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                                    Source Term
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                                    Target Term
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                                    Context
                                                </th>
                                                <th className="w-12"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {terms.map((term) => (
                                                <tr
                                                    key={term.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="py-3 px-4">
                                                        <p className="font-medium">
                                                            {term.sourceText}
                                                        </p>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <p>{term.targetText}</p>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <p className="text-sm text-gray-600">
                                                            {term.context}
                                                        </p>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                >
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600">
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
