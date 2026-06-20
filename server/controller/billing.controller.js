import { PLANS } from "../config/plan.js"
import razorpay from "../config/razorpay.js"
import crypto from "crypto"
import User from "../models/user.model.js"
import Payment from "../models/Payment.model.js"

export const billing = async (req, res) => {
    try {
        const { planType } = req.body
        const userId = req.user._id
        const plan = PLANS[planType]

        if (!plan || plan.price == 0) {
            return res.status(400).json({ message: "invalid paid plan" })
        }

        const order = await razorpay.orders.create({
            amount: plan.price * 100, // ₹499 -> 49900 paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                planType,
                userId: req.user._id.toString()
            }
        })
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Order creation failed"
        })
    }
}

export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            planType
        } = req.body

        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex")

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Invalid Payment Signature"
            })
        }

        const existingPayment = await Payment.findOne({
            paymentId: razorpay_payment_id
        })

        if (existingPayment) {
            return res.status(400).json({
                message: "Payment already processed"
            })
        }

        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        let amount = 0

        if (planType === "pro") {
            user.credits += 500
            user.plans = "pro"
            amount = 499
        }

        if (planType === "enterprise") {
            user.credits += 1000
            user.plans = "enterprise"
            amount = 1499
        }

        await user.save()

        await Payment.create({
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            user: user._id,
            planType,
            amount
        })

        return res.status(200).json({
            success: true,
            credits: user.credits
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Payment verification failed"
        })
    }
}