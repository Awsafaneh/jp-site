import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const [match, params] = useRoute("/products/:id");
  const productId = params?.id ? parseInt(params.id) : null;
  
  const { data: product, isLoading } = trpc.products.byId.useQuery(
    { id: productId! },
    { enabled: productId !== null }
  );

  if (!match) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12 bg-background">
        <div className="container">
          <Link href="/products">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Product not found.</p>
            <Link href="/products">
              <Button>View All Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container">
        <Link href="/products">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            {product.imageUrl ? (
              <div className="w-full bg-muted rounded-lg overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary mb-2">
                ${(product.price / 100).toFixed(2)}
              </p>
              <p className="text-muted-foreground">
                In Stock
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Premium lighting solution designed to enhance your space with style and functionality."}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-lg">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Premium quality materials
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Energy efficient design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Easy installation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  2-year warranty
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Add to Wishlist
              </Button>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-base">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Free shipping on orders over $50</p>
                <p>Estimated delivery: 3-5 business days</p>
                <p>30-day money-back guarantee</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
