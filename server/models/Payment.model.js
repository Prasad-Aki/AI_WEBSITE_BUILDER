import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
        unique: true
    },

    orderId: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    planType: {
        type: String
    },

    amount: {
        type: Number
    }

}, { timestamps: true })

const Payment = mongoose.model("Payment", paymentSchema)

export default Payment