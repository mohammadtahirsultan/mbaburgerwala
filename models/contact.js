import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email:String,
  message:String,
  receivedAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
