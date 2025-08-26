import contact from "../models/contact.js"


export const contactMessage = async (req, res) => {
    try {

        const { name, email, subject, message} = req.body;

      if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }


    const newMessage = new contact({ name, email, subject, message });
    await newMessage.save();

    return res.status(200).json({
      success: true,
      message: "Your message has been saved successfully!",
    });

    }
    catch (error) {
       console.error("Error saving contact message:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
    
}
