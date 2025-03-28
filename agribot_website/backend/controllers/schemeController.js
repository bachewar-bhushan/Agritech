import Scheme from "../models/Scheme.js";

export const getNabardSchemes = async (req, res) => {
  try {
    const nabardSchemes = await Scheme.find({ source: "NABARD" }); 
    if (!nabardSchemes.length) {
      return res.status(404).json({ success: false, message: "No NABARD schemes found" });
    }
    return res.status(200).json({ success: true, schemes: nabardSchemes });
  } catch (error) {
    console.error("❌ Error fetching NABARD schemes:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getGovtJansamarthSchemes = async (req, res) => {
  try {
    const jansamarthSchemes = await Scheme.find({ source: "Jansamarth" }); 
    if (!jansamarthSchemes.length) {
      return res.status(404).json({ success: false, message: "No Jansamarth schemes found" });
    }
    return res.status(200).json({ success: true, schemes: jansamarthSchemes });
  } catch (error) {
    console.error("❌ Error fetching Govt. Jansamarth schemes:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
