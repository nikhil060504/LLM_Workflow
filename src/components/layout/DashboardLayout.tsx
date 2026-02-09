import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import CanvasArea from "./CanvasArea";

export default function DashboardLayout() {
    return (
        <div className="h-screen w-screen grid grid-cols-[250px_1fr_300px]">
            <div className="border-r h-full overflow-y-auto">
                <LeftSidebar />
            </div>

            {/* IMPORTANT FIX HERE */}
            <div className="h-full w-full">
                <CanvasArea />
            </div>

            <div className="border-l h-full overflow-y-auto">
                <RightSidebar />
            </div>
        </div>
    );
}
