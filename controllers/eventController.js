import mongoose from 'mongoose';
import Event from '../models/event.js'



export const eventCreate = async (req, res) => {
    let ticketTypeEntries = [
        { name: "VIP", price: 0, totalTickets: 0, availableTickets: 0 },
        { name: "VVIP", price: 0, totalTickets: 0, availableTickets: 0 },
        { name: "Regular", price: 0, totalTickets: 0, availableTickets: 0 },
        { name: "Silver", price: 0, totalTickets: 0, availableTickets: 0 },
        { name: "Gold", price: 0, totalTickets: 0, availableTickets: 0 },
    ];
    try {

        console.log(req.file, 'uploaded')
        console.log('pathname : ', `localhost:8000/uploads/${req.file.originalname}`)
        const { title, description, date, time, location, ticketTypes } = req.body
        console.log('req', req.body);
        ticketTypes.map(item => {
            const eventIndex = ticketTypeEntries.findIndex(event => event.name === item.name)
            ticketTypeEntries[eventIndex] = item
            console.log(eventIndex, 'event index')
        })

        console.log(ticketTypeEntries, 'ticket type entries')
        console.log(ticketTypes, 'ticket types')
        const eventData = {
            image:`http://localhost:8000/uploads/${req.file.originalname}`,
            title,
            description,
            date: { from: new Date(date.from), to: new Date(date.to) },
            time,
            location,
            ticketTypes
        }

        const newevent = new Event(eventData)
        await newevent.save()
        res.status(200).json({ message: 'event registered successfully' });
    }

    catch (error) {
        console.log(error);

        res.status(400).json({ error: ' event registration failed' });

    }

}
//event view
export const viewEvent = async (req, res) => {

    try {

        const eventData = await Event.find();
        console.log(eventData);


        if (eventData) {

            res.status(200).json({
                status: true,
                data: eventData,
                message: ''

            })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'missing events' });
    }

}
//upadte event
export const upadateEvent = async (req, res) => {
    try {
        const { _id, eventData, } = req.body;
        const { ticketTypes, ...eventDataUpdates } = eventData

        let updateData = await Event.findByIdAndUpdate(_id, eventDataUpdates, { new: true }).exec()


        if (ticketTypes && ticketTypes.length > 0) {

            for (let i of ticketTypes) {
                console.log(ticketTypes)
                const result = await Event.updateOne({ _id, "ticketTypes.name": i.name }, {
                    "ticketTypes.$.name": i.name,
                    "ticketTypes.$.price": i.price,
                    "ticketTypes.$.totalTickets": i.totalTickets,
                    "ticketTypes.$.availableTickets": i.availableTickets
                })


                if (result.matchedCount === 0) {
                    await Event.updateOne(
                        { _id },
                        { $push: { ticketTypes: i } }
                    );
                }

            }
        }


        if (updateData) {

            res.status(200).json({ message: 'event updated successfully' });
        } else {

            res.status(404).send('event not found');
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'event updation failed', debug: error });
    }
}
//delete event

export const deleteEvent = async (req, res) => {
    try {

        const { id } = req.body;
        const deleteData = await Event.findByIdAndDelete(id);

        if (!deleteData) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Event Item deleted successfully' });


    } catch (error) {
        console.log(error);

        res.status(400).json({ error: ' failed' })
    }
}