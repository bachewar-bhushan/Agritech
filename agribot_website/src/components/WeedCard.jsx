import React, { useState } from "react";
import { useParams } from "react-router-dom";
import cropHerbicideData from "../data/crop_herbicide_translated.json";
import { Leaf, X } from "lucide-react";

function WeedCard() {
  const { cropName } = useParams();
  const formattedCropName = cropName.charAt(0).toUpperCase() + cropName.slice(1);
  
  const relatedWeeds = cropHerbicideData.filter((entry) =>
    entry.Crop.toLowerCase().includes(cropName.toLowerCase())
  );

  const [selectedHerbicide, setSelectedHerbicide] = useState(null);

  return (
    <div className="flex flex-col items-center pt-20 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-6 flex items-center pt-4">
        <Leaf className="w-10 h-10 mr-2 text-green-700" /> {formattedCropName} - Herbicide Guide
      </h1>

      {relatedWeeds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 w-full max-w-[90vw] py-5">
          {relatedWeeds.map((weed, index) => (
            <div key={index} className="bg-white shadow-lg p-6 border border-gray-200 text-gray-700 hover:shadow-2xl hover:transition rounded-2xl">
              
              {/* Display Image Above Name */}
              {weed.Image_URL && (
                <img 
                  src={weed.Image_URL} 
                  alt={weed.copyright} 
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
              )}
              
              <h2 className="text-xl font-bold">{weed.Weed_Species}</h2>
              
              <button
                onClick={() => setSelectedHerbicide(weed.Herbicide)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Herbicide Info
              </button>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <p><span className="font-semibold">Common:</span> {weed.Common_Name}</p>
                <p><span className="font-semibold">Marathi:</span> {weed.Marathi}</p>
                <p><span className="font-semibold">Hindi:</span> {weed.Hindi}</p>
                <p><span className="font-semibold">Gujarati:</span> {weed.Gujarati}</p>
                <p><span className="font-semibold">Punjabi:</span> {weed.Punjabi}</p>
                <p><span className="font-semibold">Tamil:</span> {weed.Tamil}</p>
                <p><span className="font-semibold">Telugu:</span> {weed.Telugu}</p>
                <p><span className="font-semibold">Kannada:</span> {weed.Kannada}</p>
                <p><span className="font-semibold">Bengali:</span> {weed.Bengali}</p>
                <p><span className="font-semibold">Odia:</span> {weed.Odia}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-green-600 mt-4">No data available for {formattedCropName}.</p>
      )}

      {/* Pop-up Herbicide Card */}
      {selectedHerbicide && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 w-80 relative">
            <button
              onClick={() => setSelectedHerbicide(null)}
              className="absolute top-2 right-2 p-2 text-gray-600 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Herbicide Info</h2>
            <p className="mt-2 text-gray-700">{selectedHerbicide}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeedCard;
