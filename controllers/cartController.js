import Cart from "../models/cart.js"

//Adding events to cart
export const AddeventItems = async (req, res) => {


    try {

        const userId = req.userId

        const { cartItems } = req.body;
      
        
        if (!cartItems || cartItems.tickets.length <= 0) {

            res.status(201).json({ message: 'nothing to updateon cart!' })
        } else {

            let userCart = await Cart.findOne({ userId })
            if (!userCart) {
                userCart = new Cart({ userId })
                userCart.save()
            }

            const subTotal = cartItems.tickets.reduce((acc, ticket) => {
                return acc + ticket.price * ticket.quantity
            }, 0)

            cartItems.subTotal = subTotal

            console.log(cartItems, 'cart item')

            userCart.cartItems.push(cartItems)

          const  totalAmount = userCart.cartItems.reduce( (acc, item) => acc + item.subTotal,0 );
          userCart.totalAmount = totalAmount;
            console.log(totalAmount);
            

            userCart.save()


            res.status(201).json({ message: "Cart created successfully" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create cart", error });
    }
}

//cart view
export const cartView = async (req, res) => {

    try {
        const userId = req.userId;
        const carttData = await Cart.find({ userId });
        console.log(carttData);
        res.send(carttData)

        if (carttData) {

            return res.status(200).json({ message: 'success', carttData });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'missing cart items' });
    }

}
//delete  event items from cart
export const deleteEvent = async (req, res) => {

        try {
    const userId = req.userId;
    const { eventId } = req.body;

    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // remove the event
    userCart.cartItems = userCart.cartItems.filter(
      (item) => item.eventId.toString() !== eventId
    );

    // recalc totalAmount
    userCart.totalAmount = userCart.cartItems.reduce(
      (acc, item) => acc + item.subTotal,
      0
    );

    await userCart.save();

    res.status(200).json({ message: "Event removed from cart", cart: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove event", error });
  }
}


export const deleteByTicketType = async (req, res) => {
  try {
    const userId = req.userId;
    const { eventId, ticketType } = req.body;

    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // find the event
    const eventItem = userCart.cartItems.find(
      (item) => item.eventId.toString() === eventId
    );

    if (!eventItem) {
      return res.status(404).json({ message: "Event not found in cart" });
    }

    // remove the ticket type
    eventItem.tickets = eventItem.tickets.filter(
      (ticket) => ticket.ticketType !== ticketType
    );

    // recalc subTotal for this event
    eventItem.subTotal = eventItem.tickets.reduce(
      (acc, ticket) => acc + ticket.price * ticket.quantity,
      0
    );

    // recalc totalAmount for whole cart
    userCart.totalAmount = userCart.cartItems.reduce(
      (acc, item) => acc + item.subTotal,
      0
    );

    await userCart.save();

    res.status(200).json({ message: "Ticket type removed", cart: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove ticket type", error });
  }
};

//update cart items 

export const upadateCart = async (req, res) => {
    try {
        const { cartId, tickets } = req.body;

        const totalAmount = tickets.reduce(
            (prev, curr) => prev + curr.quantity * curr.price, 0);

        const updatedCart = await Cart.findByIdAndUpdate(cartId, { tickets, totalAmount }, { new: true });
        if (upadateCart) {

            res.status(200).json({ message: 'cart updated successfully' });
        } else {

            res.status(404).send('cart not found');
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'cart updation failed', debug: error });
    }
}