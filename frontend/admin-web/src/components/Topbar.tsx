import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-secondary px-6 sticky top-0 z-20 shrink-0">
            <div className="flex-1 flex items-center gap-4">
                <div className="h-4 w-[1px] bg-border" />
                <h1 className="font-heading text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
                    Institutional Console
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-2.5 py-0.5 bg-secondary rounded-md border border-border">
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">System: Active</span>
                </div>
                <div className="h-5 w-[1px] bg-border mx-1" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-md bg-secondary p-0 hover:bg-primary/5 hover:text-primary border border-border transition-colors">
                            <UserIcon className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-1 rounded-lg border-border shadow-md bg-card p-1">
                        <DropdownMenuLabel className="font-heading font-bold text-[9px] uppercase tracking-widest px-3 py-2 text-muted-foreground/60">Staff Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-primary/10 focus:text-primary rounded-md px-3 py-2 text-sm">
                            <UserIcon className="h-3.5 w-3.5" />
                            <span className="font-medium">Account Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-destructive/10 focus:text-destructive rounded-md px-3 py-2 text-sm text-destructive">
                            <LogOutIcon className="h-3.5 w-3.5" />
                            <span className="font-medium">Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

function LogOutIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
    );
}

