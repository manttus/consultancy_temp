import FAQ from "../../model/faq.js";

export const getFaq = async (req, res) => {
  try {
    const faq = await FAQ.find();
    return res.status(200).send({ data: faq });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};

export const addFaq = (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer)
    return res.status(400).send({ message: "Bad Request" });
  try {
    new FAQ({
      question,
      answer,
    }).save();
    return res.status(200).send({ message: "FAQ added" });
  } catch (err) {
    return resizeBy.status(500).send({ message: "Server Error" });
  }
};
