"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CreditCard,
  Lock,
  Tag,
  AlertCircle,
  CheckCircle,
  Info,
  Shield,
  Star,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  Award,
} from "lucide-react"
import {
  loadRazorpayScript,
  createRazorpayOrder,
  verifyPayment,
  type RazorpayOptions,
  type RazorpayResponse,
} from "@/lib/razorpay"

export function CheckoutForm() {
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "failed">("idle")
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  })

  // Sample booking data
  const booking = {
    hotelName: "The Celestial Grand",
    roomType: "Presidential Suite with Panoramic View",
    checkIn: "Dec 15, 2024",
    checkOut: "Dec 18, 2024",
    nights: 3,
    pricePerNight: 299,
    subtotal: 897,
    taxes: 89.7,
    rating: 5,
    guests: 2,
  }

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "luxury20") {
      setAppliedCoupon({ code: couponCode, discount: 179.4 })
    } else if (couponCode.toLowerCase() === "premium10") {
      setAppliedCoupon({ code: couponCode, discount: 89.7 })
    } else {
      alert("Invalid coupon code. Try: LUXURY20 or PREMIUM10")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    const required = ["firstName", "lastName", "email", "phone"]
    return required.every((field) => customerDetails[field as keyof typeof customerDetails].trim() !== "")
  }

  const handleTestPayment = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields (marked with *)")
      return
    }

    setIsProcessing(true)
    setPaymentStatus("idle")
    setPaymentDetails(null)

    try {
      console.log("Starting payment process...")

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error("Failed to load payment script")
      }

      console.log("Creating order...")
      const order = await createRazorpayOrder(total)
      console.log("Order created:", order)

      const options: RazorpayOptions = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: booking.hotelName,
        description: `${booking.roomType} - ${booking.nights} nights`,
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          console.log("Payment response received:", response)
          try {
            console.log("Verifying payment...")
            const verification = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
            )

            if (verification.verified) {
              setPaymentStatus("success")
              setPaymentDetails({
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                amount: total,
                currency: "INR",
                status: "Success",
                timestamp: new Date().toLocaleString(),
              })
              console.log("Payment successful!")
            } else {
              setPaymentStatus("failed")
              console.log("Payment verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            setPaymentStatus("failed")
          }
        },
        prefill: {
          name: `${customerDetails.firstName} ${customerDetails.lastName}`,
          email: customerDetails.email,
          contact: customerDetails.phone,
        },
        theme: {
          color: "#3b82f6",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
            console.log("Payment modal closed")
          },
        },
      }

      console.log("Opening payment modal...")
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("failed")
      alert("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const total = booking.subtotal + booking.taxes - (appliedCoupon?.discount || 0)

  return (
    <div className="mx-auto max-w-7xl">
      {/* Demo Banner */}
      <div className="status-info mb-12">
        <div className="flex items-center gap-4 text-blue-300">
          <div className="icon-glow">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-lg">Demo Mode Active</span>
            <p className="text-sm text-blue-200 mt-1">
              This is a demonstration payment system. Click "OK" in the payment modal to simulate success.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-5">
        {/* Booking Summary */}
        <div className="lg:col-span-2">
          <Card className="beautiful-card hover-glow">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-4 text-white text-2xl">
                <div className="icon-glow">
                  <Award className="h-6 w-6 text-yellow-400" />
                </div>
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Hotel Details */}
              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex">
                      {[...Array(booking.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="feature-badge">Luxury</span>
                  </div>
                  <h3 className="font-bold text-white text-xl mb-2">{booking.hotelName}</h3>
                  <p className="text-white/80 font-medium text-lg mb-4">{booking.roomType}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      <span>Check-in: {booking.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span>Check-out: {booking.checkOut}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Users className="h-4 w-4 text-green-400" />
                      <span>{booking.guests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <MapPin className="h-4 w-4 text-pink-400" />
                      <span>{booking.nights} Nights</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="elegant-separator" />

              {/* Pricing Breakdown */}
              <div className="space-y-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white/80">
                    {booking.nights} nights × ₹{booking.pricePerNight}
                  </span>
                  <span className="font-semibold text-white">₹{booking.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white/80">Taxes & fees</span>
                  <span className="font-semibold text-white">₹{booking.taxes.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-emerald-400 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Discount ({appliedCoupon.code})
                    </span>
                    <span className="font-semibold text-emerald-400">-₹{appliedCoupon.discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="elegant-separator" />

              <div className="glass-panel p-6">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">Total Amount</span>
                  <span className="price-highlight">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="glass-panel p-6 space-y-4">
                <Label className="premium-label flex items-center gap-3">
                  <div className="icon-glow">
                    <Tag className="h-4 w-4 text-purple-400" />
                  </div>
                  Have a coupon code?
                </Label>
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="premium-input flex-1"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-white/60 flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  Try: LUXURY20 or PREMIUM10
                </p>
              </div>

              {/* Payment Status */}
              {paymentStatus === "success" && paymentDetails && (
                <div className="status-success">
                  <div className="flex items-center gap-4 text-emerald-400 mb-4">
                    <div className="icon-glow">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-xl">Payment Successful!</span>
                  </div>
                  <div className="text-emerald-300 space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <p>
                        <strong>Payment ID:</strong>
                        <br />
                        {paymentDetails.payment_id}
                      </p>
                      <p>
                        <strong>Order ID:</strong>
                        <br />
                        {paymentDetails.order_id}
                      </p>
                      <p>
                        <strong>Amount:</strong>
                        <br />₹{paymentDetails.amount.toFixed(2)}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <br />
                        {paymentDetails.status}
                      </p>
                    </div>
                    <p>
                      <strong>Time:</strong> {paymentDetails.timestamp}
                    </p>
                  </div>
                </div>
              )}

              {paymentStatus === "failed" && (
                <div className="status-error">
                  <div className="flex items-center gap-4 text-red-400">
                    <div className="icon-glow">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-xl">Payment Failed. Please try again.</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Customer Details Form */}
        <div className="lg:col-span-3">
          <Card className="beautiful-card hover-glow">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-4 text-white text-2xl">
                <div className="icon-glow">
                  <Lock className="h-6 w-6 text-purple-400" />
                </div>
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label className="premium-label">First Name *</Label>
                    <Input
                      placeholder="John"
                      value={customerDetails.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="premium-input"
                    />
                  </div>
                  <div>
                    <Label className="premium-label">Last Name *</Label>
                    <Input
                      placeholder="Doe"
                      value={customerDetails.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="premium-input"
                    />
                  </div>
                </div>

                <div>
                  <Label className="premium-label">Email Address *</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={customerDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="premium-input"
                  />
                </div>

                <div>
                  <Label className="premium-label">Phone Number *</Label>
                  <Input
                    placeholder="+91 9876543210"
                    value={customerDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="premium-input"
                  />
                </div>

                <div>
                  <Label className="premium-label">Address</Label>
                  <Input
                    placeholder="123 Main Street"
                    value={customerDetails.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="premium-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="premium-label">City</Label>
                    <Input
                      placeholder="Mumbai"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="premium-input"
                    />
                  </div>
                  <div>
                    <Label className="premium-label">PIN Code</Label>
                    <Input
                      placeholder="400001"
                      value={customerDetails.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="premium-input"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="pt-6">
                <Button
                  className="premium-button w-full py-6 text-xl font-bold animate-pulse-glow"
                  onClick={handleTestPayment}
                  disabled={isProcessing || !validateForm()}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6" />
                      Complete Payment - ₹{total.toFixed(2)}
                    </div>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-3 mt-6 text-sm text-white/70">
                  <div className="icon-glow">
                    <Shield className="h-4 w-4" />
                  </div>
                  <span>256-bit SSL encryption • PCI DSS compliant</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
