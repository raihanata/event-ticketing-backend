import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cartItems: [{

           eventId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Event",
                        required: true,
                    },
            tickets: [
                {
                    
                    ticketType: {
                        type: String,
                        enum: ["VIP", "VVIP", "Regular", "Silver", "Gold"],
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        min: 1,
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                
                },
            ],
             subTotal: {
                        type: Number,
                        required: true,
                        default: 0
                    },
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