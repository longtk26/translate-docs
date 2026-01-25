import { useState } from "react";
import { Search, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { LANGUAGES, QUALITY_LEVELS } from "~/constants";
import type { TranslationConfig } from "~/types";

interface LanguageSelectorProps {
    config: TranslationConfig;
    onChange: (config: Partial<TranslationConfig>) => void;
}

export function LanguageSelector({ config, onChange }: LanguageSelectorProps) {
    const [sourceSearch, setSourceSearch] = useState("");
    const [targetSearch, setTargetSearch] = useState("");
    const [showSourceDropdown, setShowSourceDropdown] = useState(false);
    const [showTargetDropdown, setShowTargetDropdown] = useState(false);

    const filteredSourceLanguages = LANGUAGES.filter(
        (lang) =>
            lang.name.toLowerCase().includes(sourceSearch.toLowerCase()) ||
            lang.nativeName.toLowerCase().includes(sourceSearch.toLowerCase()),
    );

    const filteredTargetLanguages = LANGUAGES.filter(
        (lang) =>
            lang.code !== config.sourceLanguage &&
            (lang.name.toLowerCase().includes(targetSearch.toLowerCase()) ||
                lang.nativeName
                    .toLowerCase()
                    .includes(targetSearch.toLowerCase())),
    );

    const selectedSourceLang = LANGUAGES.find(
        (l) => l.code === config.sourceLanguage,
    );

    const handleTargetLanguageToggle = (langCode: string) => {
        const isSelected = config.targetLanguages.includes(langCode);
        const newTargetLanguages = isSelected
            ? config.targetLanguages.filter((l) => l !== langCode)
            : [...config.targetLanguages, langCode].slice(0, 5);

        onChange({ targetLanguages: newTargetLanguages });
    };

    return (
        <div className="space-y-6">
            {/* Source Language */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Source Language</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="auto-detect"
                                checked={config.autoDetect}
                                onChange={(e) =>
                                    onChange({ autoDetect: e.target.checked })
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <Label
                                htmlFor="auto-detect"
                                className="cursor-pointer"
                            >
                                Auto-detect language
                            </Label>
                        </div>

                        {!config.autoDetect && (
                            <div className="relative">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search languages..."
                                        value={sourceSearch}
                                        onChange={(e) =>
                                            setSourceSearch(e.target.value)
                                        }
                                        onFocus={() =>
                                            setShowSourceDropdown(true)
                                        }
                                        className="pl-10"
                                    />
                                </div>

                                {selectedSourceLang && !showSourceDropdown && (
                                    <div className="mt-2 p-3 border rounded-md flex items-center gap-2">
                                        <span className="text-2xl">
                                            {selectedSourceLang.flag}
                                        </span>
                                        <div>
                                            <p className="font-medium">
                                                {selectedSourceLang.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {selectedSourceLang.nativeName}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {showSourceDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                        {filteredSourceLanguages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                type="button"
                                                onClick={() => {
                                                    onChange({
                                                        sourceLanguage:
                                                            lang.code,
                                                    });
                                                    setShowSourceDropdown(
                                                        false,
                                                    );
                                                    setSourceSearch("");
                                                }}
                                                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <span className="text-xl">
                                                    {lang.flag}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">
                                                        {lang.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {lang.nativeName}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Target Languages */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                            Target Languages
                        </CardTitle>
                        <span className="text-sm text-gray-500">
                            {config.targetLanguages.length}/5 selected
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search and select up to 5 languages..."
                                value={targetSearch}
                                onChange={(e) =>
                                    setTargetSearch(e.target.value)
                                }
                                onFocus={() => setShowTargetDropdown(true)}
                                className="pl-10"
                            />
                        </div>

                        {config.targetLanguages.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {config.targetLanguages.map((langCode) => {
                                    const lang = LANGUAGES.find(
                                        (l) => l.code === langCode,
                                    );
                                    if (!lang) return null;
                                    return (
                                        <Badge
                                            key={langCode}
                                            variant="secondary"
                                            className="flex items-center gap-1 px-3 py-1"
                                        >
                                            <span>{lang.flag}</span>
                                            <span>{lang.name}</span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleTargetLanguageToggle(
                                                        langCode,
                                                    )
                                                }
                                                className="ml-1 hover:text-red-600"
                                            >
                                                ×
                                            </button>
                                        </Badge>
                                    );
                                })}
                            </div>
                        )}

                        {showTargetDropdown && (
                            <div className="border rounded-md max-h-60 overflow-auto">
                                {filteredTargetLanguages.map((lang) => {
                                    const isSelected =
                                        config.targetLanguages.includes(
                                            lang.code,
                                        );
                                    return (
                                        <button
                                            key={lang.code}
                                            type="button"
                                            onClick={() =>
                                                handleTargetLanguageToggle(
                                                    lang.code,
                                                )
                                            }
                                            disabled={
                                                !isSelected &&
                                                config.targetLanguages.length >=
                                                    5
                                            }
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <div className="flex-shrink-0 w-5 h-5 border rounded flex items-center justify-center">
                                                {isSelected && (
                                                    <Check className="h-4 w-4 text-indigo-600" />
                                                )}
                                            </div>
                                            <span className="text-xl">
                                                {lang.flag}
                                            </span>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">
                                                    {lang.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {lang.nativeName}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Quality Level */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        Translation Quality
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {QUALITY_LEVELS.map((level) => (
                            <button
                                key={level.id}
                                type="button"
                                onClick={() => onChange({ quality: level.id })}
                                className={`w-full p-4 border rounded-lg text-left transition-colors ${
                                    config.quality === level.id
                                        ? "border-indigo-600 bg-indigo-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-semibold">
                                                {level.name}
                                            </h4>
                                            <Badge variant="outline">
                                                ${level.price}/page
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {level.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span>⏱️ {level.time}</span>
                                        </div>
                                        <ul className="mt-2 space-y-1">
                                            {level.features.map(
                                                (feature, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-xs text-gray-600 flex items-center gap-1"
                                                    >
                                                        <Check className="h-3 w-3 text-green-600" />
                                                        {feature}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                    <div className="flex-shrink-0 w-5 h-5 border-2 rounded-full flex items-center justify-center">
                                        {config.quality === level.id && (
                                            <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Formatting Options */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        Formatting Options
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="preserve-formatting"
                            checked={config.preserveFormatting}
                            onChange={(e) =>
                                onChange({
                                    preserveFormatting: e.target.checked,
                                })
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <Label
                            htmlFor="preserve-formatting"
                            className="cursor-pointer"
                        >
                            Preserve document formatting
                        </Label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Maintains fonts, styles, images, tables, and layout from
                        the original document
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
