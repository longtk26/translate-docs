import { Link } from "react-router";
import type { Route } from "./+types/pricing";
import { Check, Zap } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { SUBSCRIPTION_PLANS } from "~/constants";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Pricing - TranslateDocs" },
        {
            name: "description",
            content: "Choose the perfect plan for your translation needs",
        },
    ];
}

export default function Pricing() {
    return (
        <main className="pt-24 pb-12 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Choose the perfect plan for your translation needs. All
                    plans include secure encryption and automatic deletion after
                    30 days.
                </p>
            </div>

            {/* Free Tier */}
            <Card className="max-w-3xl mx-auto mb-12 border-2 border-indigo-200 bg-indigo-50">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-2xl font-bold">
                                    Free Tier
                                </h3>
                                <Badge variant="secondary">
                                    No Credit Card Required
                                </Badge>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Perfect for trying out our service
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-600" />
                                    5 pages per month
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-600" />
                                    Basic translation quality
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-600" />
                                    3 languages available
                                </li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-4">$0</div>
                            <Button asChild>
                                <Link to="/auth/register">
                                    Get Started Free
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Subscription Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {SUBSCRIPTION_PLANS.map((plan) => (
                    <Card
                        key={plan.id}
                        className={`relative ${
                            plan.popular
                                ? "border-2 border-indigo-600 shadow-xl scale-105"
                                : ""
                        }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <Badge className="bg-indigo-600 px-4 py-1">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Most Popular
                                </Badge>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                {plan.name}
                            </CardTitle>
                            <CardDescription>
                                <div className="mt-4 mb-6">
                                    <span className="text-4xl font-bold text-gray-900">
                                        ${plan.price}
                                    </span>
                                    <span className="text-gray-600">
                                        /{plan.period}
                                    </span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2 text-sm"
                                    >
                                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className="w-full"
                                variant={plan.popular ? "default" : "outline"}
                                asChild
                            >
                                <Link to="/auth/register">
                                    {plan.popular
                                        ? "Get Started"
                                        : "Choose Plan"}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pay Per Document */}
            <Card className="max-w-3xl mx-auto mb-12">
                <CardHeader>
                    <CardTitle>Pay Per Document</CardTitle>
                    <CardDescription>
                        No subscription needed. Pay only for what you use.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-indigo-600 mb-1">
                                $0.10
                            </div>
                            <div className="text-sm text-gray-600">
                                per page
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Basic
                            </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-indigo-600 mb-1">
                                $0.20
                            </div>
                            <div className="text-sm text-gray-600">
                                per page
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Standard
                            </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-indigo-600 mb-1">
                                $0.50
                            </div>
                            <div className="text-sm text-gray-600">
                                per page
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Premium (Human Review)
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>
                            10% discount when translating to 3+ languages
                        </span>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                        <Link to="/upload">Start Translation</Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="max-w-3xl mx-auto bg-gray-50">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">
                                Enterprise
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Custom solutions for large organizations with
                                high-volume needs
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-600" />
                                    Custom volume discounts (30-50% off)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-600" />
                                    Dedicated account manager
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-600" />
                                    Custom SLAs and priority support
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-600" />
                                    On-premise deployment option
                                </li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <Button size="lg" variant="outline" asChild>
                                <Link to="/contact">Contact Sales</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto mt-16">
                <h2 className="text-2xl font-bold text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">
                            Can I change plans anytime?
                        </h3>
                        <p className="text-gray-600">
                            Yes! You can upgrade or downgrade your plan at any
                            time. Changes take effect immediately, and we'll
                            prorate the billing accordingly.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">
                            What happens to unused pages?
                        </h3>
                        <p className="text-gray-600">
                            We allow you to rollover up to 20% of unused pages
                            to the next month. This gives you flexibility for
                            months with varying translation needs.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">
                            Do you offer refunds?
                        </h3>
                        <p className="text-gray-600">
                            Yes, we offer a 14-day money-back guarantee on all
                            subscription plans. No questions asked.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">
                            What payment methods do you accept?
                        </h3>
                        <p className="text-gray-600">
                            We accept all major credit cards, PayPal, Apple Pay,
                            and Google Pay. Enterprise customers can also pay
                            via invoice.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
