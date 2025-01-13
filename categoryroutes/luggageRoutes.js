import express from "express";
import { Luggage } from "../modals/productModel.js";

const router = express.Router();

// Get all luggage products
router.get("/", async (req, res) => {
  try {
    const luggage = await Luggage.find({});
    res.send(luggage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new luggage product
router.post("/", async (req, res) => {
  try {
    const { image, title, subtitle, rating, review, price } = req.body;

    const newProduct = new Luggage({
      image,
      title,
      subtitle,
      rating,
      review,
      price,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a luggage product by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLuggage = await Luggage.findByIdAndDelete(id);

    if (!deletedLuggage) {
      return res.status(404).json({ message: "Luggage not found" });
    }

    res.status(200).json({ message: "Luggage deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
