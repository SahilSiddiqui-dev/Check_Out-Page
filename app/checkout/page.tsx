import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="absolute inset-0 -z-10 bg-black/90" />
      <div className="absolute inset-0 -z-10 bg-cosmic-gradient opacity-10 blur-3xl" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="cosmic-text text-3xl font-bold">Complete Your Booking</h1>
          <p className="mt-2 text-gray-400">Secure checkout for your stellar stay</p>
        </div>

        <CheckoutForm />
      </div>
    </main>
  )
}
