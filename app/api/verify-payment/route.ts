import { type NextRequest, NextResponse } from "next/server"

// Mock payment verification
export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log("Mock payment verification:", {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
    })

    // Mock verification - always return success for testing
    // In real implementation, this would verify the signature
    const isAuthentic = true

    if (isAuthentic) {
      console.log("Mock payment verified successfully")

      // Here you would typically save to database
      const mockPaymentRecord = {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        status: "captured",
        amount: 89700, // Mock amount
        currency: "INR",
        verified_at: new Date().toISOString(),
      }

      console.log("Mock payment record:", mockPaymentRecord)

      return NextResponse.json({
        verified: true,
        payment_record: mockPaymentRecord,
      })
    } else {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying mock payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
