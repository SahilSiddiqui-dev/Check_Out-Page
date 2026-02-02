import { CheckoutForm } from "@/components/checkout-form"
import { BeautifulBackground } from "@/components/beautiful-background"

export default function Home() {
  return (
    <BeautifulBackground>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="text-shimmer text-6xl font-bold mb-8 tracking-tight leading-tight">Complete Your Booking</h1>
          <p className="text-white/80 text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Experience luxury with our premium hotel booking platform
          </p>
          <div className="mt-8 flex justify-center">
            <div className="feature-badge">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Secure & Encrypted Payment
            </div>
          </div>
        </div>

        <CheckoutForm />
      </div>
    </BeautifulBackground>
  )
}
