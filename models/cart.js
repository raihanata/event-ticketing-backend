import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [
            {
                event: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Event',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1
                },
                price: {
                    type: Number, 
                    required: true
                },
                subtotal: {
                    type: Number,
                    required: true
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
            default: 0
        },
    },
    { timestamps: true }

)





const cartModel = mongoose.model("cart", cartSchema)
export default cartModel