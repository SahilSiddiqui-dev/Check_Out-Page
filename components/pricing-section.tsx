import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="cosmic-text mb-4 text-4xl font-bold">Universal Pricing</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Choose the perfect plan for your business needs, from small startups to galactic enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`cosmic-card ${plan.featured ? "border-2 border-transparent bg-origin-border" : ""}`}
              style={
                plan.featured
                  ? {
                      backgroundImage:
                        "linear-gradient(#000 0 0), linear-gradient(135deg, #4169E1, #8A2BE2, #FF69B4, #FF7F50)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                    }
                  : {}
              }
            >
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-cosmic-blue" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className={plan.featured ? "cosmic-button w-full" : "w-full bg-muted hover:bg-muted/80"}>
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const pricingPlans = [
  {
    name: "Startup",
    description: "Perfect for small businesses just launching into orbit",
    price: 49,
    features: [
      "Process up to 1,000 transactions/month",
      "Basic analytics dashboard",
      "Email support",
      "2 payment methods",
      "Standard security",
    ],
    featured: false,
  },
  {
    name: "Business",
    description: "For growing businesses ready to explore new galaxies",
    price: 99,
    features: [
      "Process up to 10,000 transactions/month",
      "Advanced analytics dashboard",
      "Priority support",
      "All payment methods",
      "Enhanced security features",
      "Custom checkout experience",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    description: "For galactic-scale operations with universal reach",
    price: 249,
    features: [
      "Unlimited transactions",
      "Real-time analytics",
      "24/7 dedicated support",
      "All payment methods",
      "Quantum-grade security",
      "Custom integration support",
      "Multi-currency support",
    ],
    featured: false,
  },
]
