import { type NextRequest, NextResponse } from "next/server"

// Mock Razorpay order creation
export async function POST(request: NextRequest) {
  try {
    const { amount, currency } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate mock order
    const mockOrder = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount, // amount in paise
      currency: currency || "INR",
      status: "created",
      receipt: `receipt_${Date.now()}`,
      created_at: Math.floor(Date.now() / 1000),
    }

    console.log("Mock order created:", mockOrder)

    // Return the order details along with the public key
    // In production, you would use process.env.RAZORPAY_KEY_ID here
    return NextResponse.json({
      id: mockOrder.id,
      amount: mockOrder.amount,
      currency: mockOrder.currency,
      status: mockOrder.status,
      key: "rzp_test_mock_key_id", // Mock public key for testing
    })
  } catch (error) {
    console.error("Error creating mock order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
