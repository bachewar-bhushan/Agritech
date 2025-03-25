import React, { useState } from "react";
import { Search, Leaf, Sprout } from "lucide-react";
import cropHerbicideData from "../data/crop_herbicide_translated.json";
import { Link, useNavigate } from "react-router-dom";


const HerbicideGuide = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const crops = [
    { name: "Wheat", image: "wheat.png" },
    { name: "Rice", image: "rice.png" },
    { name: "Cotton", image: "cotton.png" },
    { name: "Maize", image: "maize.png" },
    { name: "Soyabean", image: "soyabean.png" },
    { name: "Sugarcane", image: "sugarcane.png" },
    { name: "Tea", image: "tea.png" },
  ];

  const handleSearch = () => {
    const found = cropHerbicideData.find((weed) =>
      Object.values(weed).some((val) =>
        typeof val === "string" && val.toLowerCase().includes(input.toLowerCase())
      )
    );
    setResult(found || "No matching weed found");
  };

  return (
    <div className="pt-[10vh] flex flex-col items-center justify-center min-h-screen">
      <h1 className="mt-9 font-black text-4xl flex items-center">
        <Sprout size={60} className="mr-2 text-green-700" /> Agritech Herbicide Guide
      </h1>
      <div className="bg-white shadow-lg rounded-lg w-[90vw] mt-9 flex flex-col items-center p-9 border border-gray-300">
      <div className="flex items-center justify-center w-full max-w-lg flex-col md:flex-row">
  {/* Label */}
  <p className="text-gray-700 font-medium text-sm md:text-base mb-2 md:mb-0">
    Enter Weed Name:
  </p>
  {/* Input Field */}
  <input
    type="text"
    placeholder="Enter weed name"
    className="mx-2 px-3 py-2 border border-gray-400 rounded-md flex-grow w-full md:w-auto"
    value={input}
    onChange={(e) => setInput(e.target.value)}
  />
  {/* Search Button */}
  <button
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center mt-2 md:mt-0 md:ml-2"
    onClick={handleSearch}
  >
    <Search className="mr-2 w-4 h-4" /> 
    <span className="hidden md:inline">Search</span>
  </button>
</div>
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md w-80 text-center border border-gray-300">
            {typeof result === "string" ? (
              <p className="text-red-500 font-semibold">{result}</p>
            ) : (
              <>
                <p className="font-semibold text-lg text-gray-700">Weed Species: {result.Weed_Species}</p>
                <p className="text-gray-600">Crop: {result.Crop}</p>
                <p className="text-green-600 font-bold">Herbicide: {result.Herbicide}</p>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center pt-12 pb-9">
        <p className="mt-2 mx-9 text-center text-gray-700 max-w-3xl text-lg font-medium italic mb-4">
          Click on a crop to see the weeds and herbicides associated with it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8">
          {crops.map((crop) => (
            <div key={crop.name} className="w-72">
              <button
                className="w-full bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 border border-gray-300"
                onClick={() => navigate(`/crop/${crop.name.toLowerCase()}`)}
              >
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex justify-center items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{crop.name}</h2>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HerbicideGuide;
