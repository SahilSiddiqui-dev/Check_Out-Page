import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard, ShieldCheck, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 bg-black/90" />
      <div className="absolute inset-0 -z-10 bg-cosmic-gradient opacity-10 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="cosmic-text mb-6 text-5xl font-bold tracking-tight sm:text-6xl">Cosmic Payment Solutions</h1>
          <p className="mb-10 text-xl text-gray-300">
            Elevate your payment experience to stellar heights with our innovative platform. Seamlessly process
            transactions across the universe of commerce.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="cosmic-button">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-cosmic-blue/30 bg-background/50 backdrop-blur-sm">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="cosmic-card">
            <CreditCard className="mb-4 h-10 w-10 text-cosmic-blue" />
            <h3 className="mb-2 text-xl font-bold">Seamless Transactions</h3>
            <p className="text-gray-400">
              Process payments with the speed of light across multiple galaxies of payment methods.
            </p>
          </div>

          <div className="cosmic-card">
            <ShieldCheck className="mb-4 h-10 w-10 text-cosmic-purple" />
            <h3 className="mb-2 text-xl font-bold">Stellar Security</h3>
            <p className="text-gray-400">
              Your data is protected by cosmic-grade encryption and advanced security protocols.
            </p>
          </div>

          <div className="cosmic-card">
            <Zap className="mb-4 h-10 w-10 text-cosmic-pink" />
            <h3 className="mb-2 text-xl font-bold">Universal Integration</h3>
            <p className="text-gray-400">Connect with any business system across the universe with our flexible API.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
