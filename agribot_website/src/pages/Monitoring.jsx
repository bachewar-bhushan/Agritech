import React, { useEffect, useState } from "react";
import { WiThermometer, WiRaindrop, WiHumidity, WiBarometer } from "react-icons/wi";
import { FaLeaf } from "react-icons/fa";
import axios from "axios";

const Monitoring = () => {
  const [weather, setWeather] = useState(null);
  const [herbicide, setHerbicide] = useState("Fetching...");
  const [weedsDetected, setWeedsDetected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=19.076&longitude=72.8777&current_weather=true`
        );
        setWeather(weatherResponse.data.current_weather);

        const farmResponse = await axios.get(`https://your-api.com/farm-data`);
        setHerbicide(farmResponse.data.herbicide || "None used");
        setWeedsDetected(farmResponse.data.weeds || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const farmData = [
    { icon: <WiBarometer size={40} />, label: "pH Level", value: "6.5", unit: "pH" },
    { icon: <FaLeaf size={30} />, label: "NPK Levels", value: "120-50-60", unit: "mg/kg" },
    { icon: <WiRaindrop size={40} />, label: "Soil Moisture", value: "23", unit: "%" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 pt-[12vh]">
      <h1 className="text-3xl font-bold text-green-700 mb-10">Farm Monitoring Dashboard</h1>
      
      {/* Weather & Farm Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {loading ? (
          <p>Loading weather data...</p>
        ) : (
          <>
            <div className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-4">
              <WiThermometer size={50} className="text-red-500" />
              <div>
                <h2 className="text-lg font-semibold">Temperature</h2>
                <p className="text-gray-700">{weather.temperature}°C</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-4">
              <WiHumidity size={50} className="text-blue-500" />
              <div>
                <h2 className="text-lg font-semibold">Humidity</h2>
                <p className="text-gray-700">{weather.relative_humidity}%</p>
              </div>
            </div>
          </>
        )}

        {farmData.map((item, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="text-green-600">{item.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{item.label}</h2>
              <p className="text-gray-700">{item.value} {item.unit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Herbicide & Weeds Detected */}
      <div className="w-full max-w-6xl mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-lg font-semibold text-green-700">Herbicide Used</h2>
          <p className="text-gray-700">{herbicide}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-red-600">Weeds Detected</h2>
          {weedsDetected.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {weedsDetected.map((weed, index) => (
                <li key={index}>{weed}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No weeds detected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
