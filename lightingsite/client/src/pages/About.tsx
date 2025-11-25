import { Lightbulb, Award, Users, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-muted-foreground">
              Bringing light and innovation to homes and businesses since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="w-full py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2010, Lighting Company has been at the forefront of the lighting industry, 
                providing premium solutions to residential and commercial customers across the country. 
                What started as a small family business has grown into a trusted name in quality lighting.
              </p>
              <p>
                We believe that the right lighting can transform any space, creating ambiance, 
                improving functionality, and enhancing the overall aesthetic of your environment. 
                Our mission is to make premium lighting accessible to everyone.
              </p>
              <p>
                Over the past decade, we've built our reputation on quality products, exceptional 
                customer service, and a deep commitment to innovation. We work directly with leading 
                manufacturers to bring you the latest in lighting technology and design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-center">Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground text-sm">
                  We only offer products that meet our rigorous quality standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-center">Customer First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground text-sm">
                  Your satisfaction is our top priority in everything we do.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-center">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground text-sm">
                  We stay ahead with the latest lighting technology and trends.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-center">Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground text-sm">
                  We're committed to eco-friendly and energy-efficient solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">10K+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">500+</p>
              <p className="text-muted-foreground">Product Varieties</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">14+</p>
              <p className="text-muted-foreground">Years in Business</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-muted-foreground">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-muted-foreground mb-8">
              Our dedicated team of lighting experts is passionate about helping you find the perfect 
              solution for your space. With years of combined experience, we're here to guide you through 
              every step of your lighting journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "John Smith", role: "Founder & CEO" },
                { name: "Sarah Johnson", role: "Head of Design" },
                { name: "Michael Chen", role: "Customer Success" }
              ].map((member) => (
                <Card key={member.name}>
                  <CardHeader>
                    <CardTitle className="text-center text-lg">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground text-sm">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
