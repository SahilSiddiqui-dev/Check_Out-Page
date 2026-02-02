import { BarChart3, Globe, Layers, Rocket, Shield, Sparkles } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="cosmic-text mb-4 text-4xl font-bold">Cosmic Features</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Our payment platform harnesses the power of the cosmos to deliver an out-of-this-world experience for your
            business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="cosmic-card group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cosmic-gradient-alt">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold group-hover:cosmic-text">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Accept payments from customers across the entire universe with multi-currency support.",
  },
  {
    icon: Shield,
    title: "Quantum Security",
    description: "Advanced encryption and security measures that protect your data across dimensions.",
  },
  {
    icon: BarChart3,
    title: "Stellar Analytics",
    description: "Gain cosmic insights into your business with our powerful reporting dashboard.",
  },
  {
    icon: Rocket,
    title: "Light-Speed Processing",
    description: "Process transactions at the speed of light with our optimized payment infrastructure.",
  },
  {
    icon: Layers,
    title: "Nebula Integration",
    description: "Seamlessly connect with your existing business systems and third-party applications.",
  },
  {
    icon: Sparkles,
    title: "Celestial Experience",
    description: "Provide your customers with a smooth, frictionless payment journey through the cosmos.",
  },
]
