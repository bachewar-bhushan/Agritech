import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Unique name to avoid duplicates
    link: String,
    details: Array, // Stores structured content like paragraphs, lists, tables, etc.
    source: String, // "NABARD" or "Jansamarth"
    scrapedAt: { type: Date, default: Date.now } // Store when the scheme was added
});

const Scheme = mongoose.model("Scheme", schemeSchema);
export default Scheme;
