import React from "react";
import { useNavigate } from "react-router-dom";

const crops = [
  { name: "Wheat", image: "/assets/crops/wheat.jpg" },
  { name: "Rice", image: "/assets/crops/rice.jpg" },
  { name: "Cotton", image: "/assets/crops/cotton.jpg" },
  { name: "Maize", image: "/assets/crops/maize.jpg" },
  { name: "Soyabean", image: "/assets/crops/soyabean.jpg" },
  { name: "Sugarcane", image: "/assets/crops/sugarcane.jpg" },
  { name: "Tea", image: "/assets/crops/tea.jpg" },
];

function HerbicideInfo() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center pt-12">
      <h1 className="mt-4 font-black text-3xl">Herbicide Guide</h1>
      <p className="mt-2 mx-9 text-center text-gray-700 max-w-3xl">
        Click on a crop to see the herbicides and weeds associated with it.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {crops.map((crop) => (
          <div key={crop.name} className="w-72">
            <button
              className="w-full bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
              onClick={() => navigate(`/crop/${crop.name.toLowerCase()}`)}
            >
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">{crop.name}</h2>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HerbicideInfo;
