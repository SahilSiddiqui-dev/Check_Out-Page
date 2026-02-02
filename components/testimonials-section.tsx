import { Star } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 -z-10 bg-black/90" />
      <div className="absolute inset-0 -z-10 bg-cosmic-gradient opacity-10 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="cosmic-text mb-4 text-4xl font-bold">Stellar Testimonials</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            See what businesses across the galaxy are saying about our cosmic payment solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="cosmic-card">
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-cosmic-orange text-cosmic-orange" />
                ))}
              </div>
              <p className="mb-4 italic text-gray-300">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-cosmic-gradient" />
                <div className="ml-3">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote:
      "The DesireLovell Payment Platform revolutionized how we handle transactions. The cosmic-grade security gives us peace of mind.",
    name: "Alex Stellar",
    title: "CEO, Nebula Enterprises",
  },
  {
    quote:
      "Integration was seamless and our payment processing speed increased by 300%. It's like our transactions travel at warp speed!",
    name: "Samantha Cosmos",
    title: "CTO, Galactic Commerce",
  },
  {
    quote:
      "The analytics dashboard provides insights we never thought possible. It's like seeing into the future of our business.",
    name: "Marcus Nova",
    title: "CFO, Stardust Solutions",
  },
]
