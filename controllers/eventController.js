import Event from '../models/event.js'



export const eventCreate = async (req, res) => {
    try {

        const { title, description, date, time, location, price, totalTickets, availableTickets,ticketTypes } = req.body
        console.log(req.body);
        const newevent = new Event({ title, description, date: { from: new Date(date.from), to: new Date(date.to)}, time, location, price, totalTickets, availableTickets,ticketTypes })
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
        res.send(eventData)

        if (eventData) {

            return res.status(200).json({ message: 'success' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'missing events' });
    }

}
//upadte event
export const upadateEvent = async (req, res) => {
    try {

        const { eventData, _id } = req.body;
        
        console.log(req.body);

        const updateData = await Event.findByIdAndUpdate(_id,eventData, { new: true })

        if (updateData) {
            res.status(200).json({ message: 'event updated successfully' });
        } else {

            res.status(404).send('event not found');
        }

    } catch (error) {
        console.log(error);

        res.status(400).json({ error: 'event updation failed' });
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