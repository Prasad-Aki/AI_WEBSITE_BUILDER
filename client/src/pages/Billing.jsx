import React from "react"
import axios from "axios"
import { serverUrl } from "../App"
import { store } from "../redux/store"
import { updateCredits } from "../redux/userSlice"


export const handleBuyPlan = async (planType) => {
    try {

        const { data } = await axios.post(
            `${serverUrl}/api/payment/billing`,
            { planType },
            { withCredentials: true }
        )

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: data.amount,
            currency: data.currency,
            order_id: data.id,

            name: "GenWeb.ai",
            description: `${planType} Plan`,

            handler: async function (response) {

                try {

                    const verify = await axios.post(
                        `${serverUrl}/api/payment/verify`,
                        {
                            ...response,
                            planType
                        },
                        { withCredentials: true }
                    )

                    console.log(verify.data)
                    if (verify.data.credits !== undefined) {
                        store.dispatch(updateCredits(verify.data.credits))
                    }

                    alert("Credits Added Successfully")

                } catch (error) {

                    console.log(error)

                    alert("Payment Verification Failed")
                }
            }
        }

        const rzp = new window.Razorpay(options)

        rzp.open()

    } catch (error) {
        console.log(error)
    }
}