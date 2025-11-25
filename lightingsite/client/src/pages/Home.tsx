import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Lightbulb } from "lucide-react";

export default function Home() {
  const { data: featuredProducts, isLoading } = trpc.products.featured.useQuery({ limit: 6 });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Lightbulb className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Illuminate Your Space
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover premium lighting solutions for every room and occasion. From modern LED fixtures to classic designs, we have the perfect lighting for your home or business.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">
              Check out our most popular lighting solutions
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    {product.imageUrl && (
                      <div className="w-full h-48 bg-muted overflow-hidden rounded-t-lg">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {product.description || "Premium lighting solution"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">
                        ${(product.price / 100).toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured products available yet.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                All our lighting products are carefully selected for durability and performance.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">
                Quick and reliable delivery to your doorstep within 3-5 business days.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Expert Support</h3>
              <p className="text-muted-foreground">
                Our lighting experts are here to help you choose the perfect solution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
