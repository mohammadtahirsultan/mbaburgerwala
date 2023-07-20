import Contact from "../models/contact.js";

export const contactUs = async (req, res) => {
    try {
        const {name,email, message} = req.body

        await Contact.create({name,email,message})
      res.status(200).json({
        success: true,
        message:"Message Sent Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  };