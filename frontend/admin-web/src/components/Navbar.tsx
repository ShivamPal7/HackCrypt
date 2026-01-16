import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-secondary border-b border-border shadow-sm">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-heading font-bold text-xl text-primary tracking-tight">
                        Attendix
                    </span>
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors h-8 px-3">
                        Home
                    </Button>
                    <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors h-8 px-3">
                        Features
                    </Button>
                    <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors h-8 px-3">
                        How It Works
                    </Button>
                    <Link to="/login">
                        <Button className="bg-primary hover:opacity-90 text-primary-foreground rounded-md px-6 py-2 h-9 text-sm font-medium ml-4">
                            Staff Portal
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
