import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Return History", href: "/return-history" },
  { label: "Notice/Orders", href: "/notice-history" },
];

const Navbar = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold gold-text-gradient">ABC</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            AnyBody can Consult
          </span>
        </Link>

        {isLoggedIn && (
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-gold bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/"
                className="rounded-md border border-gold/30 px-4 py-2 text-sm text-gold hover:bg-gold/10 transition-colors"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <a
                href="https://abcweb2.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ABC Web
              </a>
              <Link
                to="/login"
                className="gradient-gold rounded-md px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
