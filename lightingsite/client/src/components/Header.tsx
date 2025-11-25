import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80">
          <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />
          <span>{APP_TITLE}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => logout()}
            >
              Logout
            </Button>
          ) : (
            <Button 
              size="sm"
              onClick={() => window.location.href = getLoginUrl()}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
