import { useState } from "react";
import type { Route } from "./+types/profile";
import { User, CreditCard, Bell, Shield, LogOut } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Profile - TranslateDocs" },
        { name: "description", content: "Manage your account" },
    ];
}

export default function Profile() {
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Inc.",
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Save profile:", profile);
    };

    return (
        <main className="pt-16 min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Account Settings</h1>
                    <p className="text-gray-600 mt-2">
                        Manage your account and preferences
                    </p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList>
                        <TabsTrigger
                            value="profile"
                            className="flex items-center gap-2"
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="subscription"
                            className="flex items-center gap-2"
                        >
                            <CreditCard className="h-4 w-4" />
                            Subscription
                        </TabsTrigger>
                        <TabsTrigger
                            value="notifications"
                            className="flex items-center gap-2"
                        >
                            <Bell className="h-4 w-4" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="flex items-center gap-2"
                        >
                            <Shield className="h-4 w-4" />
                            Security
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your personal information and email
                                    address
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSaveProfile}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleProfileChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={profile.email}
                                            onChange={handleProfileChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company">
                                            Company (Optional)
                                        </Label>
                                        <Input
                                            id="company"
                                            name="company"
                                            value={profile.company}
                                            onChange={handleProfileChange}
                                        />
                                    </div>

                                    <Button type="submit">Save Changes</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Subscription Tab */}
                    <TabsContent value="subscription">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Plan</CardTitle>
                                    <CardDescription>
                                        You are currently on the Professional
                                        plan
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <h3 className="text-2xl font-bold">
                                                    Professional
                                                </h3>
                                                <Badge>Active</Badge>
                                            </div>
                                            <p className="text-3xl font-bold mb-1">
                                                $49/month
                                            </p>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Billing renews on January 25,
                                                2026
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <span className="text-green-600">
                                                        ✓
                                                    </span>
                                                    500 pages per month
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="text-green-600">
                                                        ✓
                                                    </span>
                                                    50+ languages
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="text-green-600">
                                                        ✓
                                                    </span>
                                                    Priority processing
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="text-green-600">
                                                        ✓
                                                    </span>
                                                    API access
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="space-x-2">
                                            <Button variant="outline">
                                                Change Plan
                                            </Button>
                                            <Button variant="outline">
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Usage This Month</CardTitle>
                                    <CardDescription>
                                        Your usage statistics for January 2026
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                Pages Translated
                                            </p>
                                            <p className="text-2xl font-bold">
                                                247 / 500
                                            </p>
                                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full"
                                                    style={{ width: "49%" }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                Documents
                                            </p>
                                            <p className="text-2xl font-bold">
                                                42
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                Storage Used
                                            </p>
                                            <p className="text-2xl font-bold">
                                                2.4 GB / 10 GB
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>
                                    Choose what notifications you want to
                                    receive
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        {
                                            id: "translation",
                                            label: "Translation completed",
                                            description:
                                                "Get notified when your translations are ready",
                                        },
                                        {
                                            id: "usage",
                                            label: "Usage alerts",
                                            description:
                                                "Receive alerts when you're close to your limit",
                                        },
                                        {
                                            id: "billing",
                                            label: "Billing updates",
                                            description:
                                                "Important billing and payment notifications",
                                        },
                                        {
                                            id: "product",
                                            label: "Product updates",
                                            description:
                                                "New features and improvements",
                                        },
                                        {
                                            id: "marketing",
                                            label: "Marketing emails",
                                            description:
                                                "Tips, best practices, and special offers",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-start justify-between py-3 border-b last:border-0"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium">
                                                    {item.label}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                defaultChecked={
                                                    item.id !== "marketing"
                                                }
                                                className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Button className="mt-6">
                                    Save Preferences
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Change Password</CardTitle>
                                    <CardDescription>
                                        Update your password to keep your
                                        account secure
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">
                                                Current Password
                                            </Label>
                                            <Input
                                                id="current-password"
                                                type="password"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">
                                                New Password
                                            </Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">
                                                Confirm New Password
                                            </Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                            />
                                        </div>
                                        <Button type="submit">
                                            Update Password
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Two-Factor Authentication
                                    </CardTitle>
                                    <CardDescription>
                                        Add an extra layer of security to your
                                        account
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium mb-1">
                                                2FA Status
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Two-factor authentication is not
                                                enabled
                                            </p>
                                        </div>
                                        <Button>Enable 2FA</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Delete Account</CardTitle>
                                    <CardDescription>
                                        Permanently delete your account and all
                                        data
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Once you delete your account, there is
                                        no going back. Please be certain.
                                    </p>
                                    <Button variant="destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Delete Account
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
