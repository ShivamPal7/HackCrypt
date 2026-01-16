import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export default function AdminLayout() {
    return (
        <div className="grid h-screen w-full lg:grid-cols-[256px_1fr] overflow-hidden">
            <Sidebar />
            <div className="flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 p-8 bg-background overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
