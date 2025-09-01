import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    date:
    {
        from:{
        type: Date,
        required: true
        },
        
        to:{
        type: Date,
        required: true
        }
       
       
    },
    time: {
        type: String
    },
    location:
    {
        type: String,
        required: true
    },
    ticketTypes: [
    {
      name: {
        type: String,
        enum: ["VIP", "VVIP", "Regular", "Silver", "Gold"], 
        required: true,
      },
      price: { type: Number, required: true },
      totalTickets: { type: Number, required: true },
      availableTickets: { type: Number, required: true },
    },
  ],

},
 { timestamps: true })

const eventmodel = mongoose.model('Event', eventSchema)
export default eventmodel