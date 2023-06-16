import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FAQ = mongoose.model("FAQ", faqSchema);
export default FAQ;
