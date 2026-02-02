declare global {
  interface Window {
    Razorpay: any
  }
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayResponse) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  theme: {
    color: string
  }
  modal: {
    ondismiss: () => void
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface CreateOrderResponse {
  id: string
  amount: number
  currency: string
  status: string
  key: string // Server will provide the public key
}

// Mock Razorpay class for testing
class MockRazorpay {
  private options: RazorpayOptions

  constructor(options: RazorpayOptions) {
    this.options = options
  }

  open() {
    console.log("Opening mock Razorpay checkout with options:", this.options)

    // Simulate the payment modal
    const shouldSucceed = confirm(
      `Mock Payment Gateway\n\n` +
        `Amount: ₹${(this.options.amount / 100).toFixed(2)}\n` +
        `Merchant: ${this.options.name}\n` +
        `Description: ${this.options.description}\n\n` +
        `Click OK to simulate successful payment, Cancel to simulate failure.`,
    )

    if (shouldSucceed) {
      // Simulate successful payment after delay
      setTimeout(() => {
        const mockResponse: RazorpayResponse = {
          razorpay_payment_id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          razorpay_order_id: this.options.order_id,
          razorpay_signature: `mock_signature_${Date.now()}`,
        }

        console.log("Mock payment successful:", mockResponse)
        this.options.handler(mockResponse)
      }, 1500)
    } else {
      // Simulate payment cancellation
      setTimeout(() => {
        console.log("Mock payment cancelled")
        this.options.modal.ondismiss()
      }, 500)
    }
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined") {
      // For testing, we'll use our mock instead of loading the real script
      console.log("Using mock Razorpay for testing")
      window.Razorpay = MockRazorpay
      resolve(true)
      return
    }

    resolve(true)
  })
}

export const createRazorpayOrder = async (amount: number, currency = "INR"): Promise<CreateOrderResponse> => {
  console.log(`Creating mock order for ₹${amount}`)

  const response = await fetch("/api/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount * 100, // Convert to paise for consistency
      currency,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to create order")
  }

  const result = await response.json()
  console.log("Mock order created:", result)
  return result
}

export const verifyPayment = async (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
): Promise<{ verified: boolean; payment_record?: any }> => {
  console.log("Verifying mock payment:", {
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id,
    signature: razorpay_signature,
  })

  const response = await fetch("/api/verify-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to verify payment")
  }

  const result = await response.json()
  console.log("Mock payment verification result:", result)
  return result
}
