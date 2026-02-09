"use client";

import { Settings, Info } from "lucide-react";

export default function RightSidebar() {
    return (
        <aside className="h-full w-80 border-l border-gray-200 bg-white p-4">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
                <Settings className="h-5 w-5 text-gray-500" />
            </div>

            <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-500" />
                        <h3 className="text-sm font-medium text-gray-900">Node Details</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        Select a node to view its properties
                    </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-2 text-sm font-medium text-gray-900">Settings</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Show grid</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                defaultChecked
                            />
                            <span className="text-sm text-gray-700">Snap to grid</span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    );
}
