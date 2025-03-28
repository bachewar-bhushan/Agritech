import { create } from "zustand";
import axios from "axios";

const useSchemesStore = create((set) => ({
  nabardSchemes: [],
  jansamarthSchemes: {},
  loading: false,
  error: null,

  fetchSchemes: async () => {
    set({ loading: true, error: null });
  
    try {
      // Fetch NABARD schemes
      const nabardResponse = await axios.get("http://localhost:9000/api/scrapper_route/scrape-nabard");
      const nabardSchemes = nabardResponse.data.schemes;  // Extract schemes array
      console.log("Fetched NABARD Schemes:", nabardSchemes); // ✅ Check if data is fetched correctly
  
      // Fetch Jansamarth schemes
      const jansamarthResponse = await axios.get("http://localhost:9000/api/scrapper_route/govt-schemes-jansamarth");
      const jansamarthData = jansamarthResponse.data;
  
      // Group Jansamarth schemes by type
      const groupedJansamarth = jansamarthData.reduce((acc, scheme) => {
        const type = scheme.type || "Other";
        if (!acc[type]) acc[type] = [];
        acc[type].push(scheme);
        return acc;
      }, {});
  
      set({
        nabardSchemes,  // ✅ Ensure it directly holds the array
        jansamarthSchemes: groupedJansamarth,
        loading: false,
      });
  
      console.log("Updated Zustand Store:", nabardSchemes); // ✅ Verify Zustand is updating
    } catch (err) {
      set({ error: "Failed to fetch schemes", loading: false });
      console.error("API Fetch Error:", err);
    }
  },
  
}));

export default useSchemesStore;
