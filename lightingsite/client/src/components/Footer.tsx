import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">
              Premium lighting solutions for residential and commercial spaces.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">Lighting Fixtures</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">LED Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: info@lightingco.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Fri 9AM-6PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Lighting Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
