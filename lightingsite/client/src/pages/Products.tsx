import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: products, isLoading } = trpc.products.list.useQuery({ 
    categoryId: selectedCategory,
    limit: 20,
    offset: 0
  });

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            Browse our complete collection of premium lighting solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="font-bold text-lg mb-4">Categories</h2>
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === undefined ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(undefined)}
                >
                  All Products
                </Button>
                {categories?.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
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
                <p className="text-muted-foreground mb-4">No products found in this category.</p>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedCategory(undefined)}
                >
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
