import React from 'react';
import { useParams } from "react-router-dom";
import cropHerbicideData from "../data/crop_herbicide.json";

function WeedTable() {
  const { cropName } = useParams();
  const formattedCropName = cropName.charAt(0).toUpperCase() + cropName.slice(1);
  
  const relatedWeeds = cropHerbicideData.filter((entry) =>
    entry.Crop.toLowerCase().includes(cropName.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center pt-20 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        {formattedCropName} - Herbicide Guide
      </h1>

      {relatedWeeds.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-2xl w-full max-w-4xl">
          <table className="w-full text-md text-gray-800 bg-white border border-green-300 rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-green-100 text-gray-900">
                <th className="px-6 py-3 text-left border-b border-green-300">Weed Species</th>
                <th className="px-6 py-3 text-left border-b border-green-300">Herbicide</th>
                <th className="px-6 py-3 text-left border-b border-green-300">Common Name</th>
              </tr>
            </thead>
            <tbody>
              {relatedWeeds.map((weed, index) => (
                <tr key={index} className="odd:bg-white even:bg-green-50 hover:bg-green-100">
                  <td className="px-6 py-3 border-b border-green-300">{weed.Weed_Species}</td>
                  <td className="px-6 py-3 border-b border-green-300">{weed.Herbicide}</td>
                  <td className="px-6 py-3 border-b border-green-300">{weed.Common_Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-green-600 mt-4">No data available for {formattedCropName}.</p>
      )}
    </div>
  );
}

export default WeedTable;
