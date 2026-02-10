"use client";
import TypedHandle from "@/components/flow/TypedHandle";
import StatusDot from "@/components/flow/StatusDot";
import { Position, NodeProps } from "reactflow";
import { useWorkflowStore } from "@/stores/useWorkflowStore";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function VideoUploadNode({ id, data }: NodeProps) {
    const nodes = useWorkflowStore((s) => s.nodes);
    const setNodes = useWorkflowStore((s) => s.setNodes);

    const videoUrl = data.config?.videoUrl;
    const [showModal, setShowModal] = useState(false);

    const updateVideo = (url: string) => {
        const updatedNodes = nodes.map((node) =>
            node.id === id
                ? {
                    ...node,
                    data: {
                        ...node.data,
                        config: { ...node.data.config, videoUrl: url },
                    },
                }
                : node
        );
        setNodes(updatedNodes);
    };

    const handleFile = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/uploadImage", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`Upload failed: ${res.status}`);
            }

            const result = await res.json();

            if (!result.url) {
                throw new Error("No URL in response");
            }

            updateVideo(result.url);
        } catch (error) {
            console.error("Video upload error:", error);
            // Fallback: use local blob URL
            const localUrl = URL.createObjectURL(file);
            updateVideo(localUrl);
            alert("⚠️ CDN upload failed, using local preview");
        }
    };


    return (
        <>
            <div
                style={{ width: 180 }}
                className="bg-white border rounded-lg shadow relative"
            >
                <StatusDot status={data.status} />
                <TypedHandle type="source" position={Position.Bottom} portType="video" />


                <div className="p-2 text-sm font-semibold border-b">
                    Upload Video
                </div>

                <div className="p-2">
                    {!videoUrl ? (
                        <input
                            type="file"
                            accept="video/*"
                            className="nodrag text-xs w-full"
                            onChange={(e) => {
                                if (e.target.files?.[0]) handleFile(e.target.files[0]);
                            }}
                        />
                    ) : (
                        <>
                            <div
                                style={{ height: '40px', maxHeight: '40px' }}
                                className="w-full overflow-hidden rounded border cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all mb-1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowModal(true);
                                }}
                                title="Click to view full video"
                            >
                                <video src={videoUrl}

                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowModal(true);
                                    }}
                                    className="nodrag flex-1 text-[10px] text-blue-600 hover:underline text-center py-1"
                                >
                                    ▶️ View Full
                                </button>
                                <label className="nodrag flex-1 text-[10px] text-green-600 hover:underline text-center py-1 cursor-pointer">
                                    🔄 Change
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) handleFile(e.target.files[0]);
                                        }}
                                    />
                                </label>
                            </div>
                        </>
                    )}
                </div>

                {/* <TypedHandle type="source" position={Position.Bottom} portType="video" /> */}

            </div>

            {/* Full Video Preview Modal */}
            {showModal && videoUrl &&
                typeof document !== 'undefined' && createPortal(
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: '#000000',
                            zIndex: 99999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => setShowModal(false)}
                    >
                        <div style={{ position: 'relative', padding: '20px' }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowModal(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    zIndex: 100000
                                }}
                            >
                                ✕ Close
                            </button>
                            <video
                                src={videoUrl}
                                controls
                                autoPlay
                                style={{
                                    maxWidth: '85vw',
                                    maxHeight: '85vh',
                                    display: 'block'
                                }}
                            />
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
