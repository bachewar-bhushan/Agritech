import React, { useEffect, useState } from "react";
import axios from "axios";

const Scraper = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetching the data from the backend API
        axios.get("http://localhost:9000/api/scrapper_route/scrapper-tool")
            .then((response) => {
                // Storing the fetched data into the state
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // If data is still being fetched, show a loading message
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
      <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Scraped Data</h2>
  
          {/* Displaying Fertilizer Subsidy Content */}
          <div className="mb-6">
              <h3 className="text-xl font-semibold">Fertilizer Subsidy Content:</h3>
              <ul className="list-disc pl-6">
                  {data.fertiliserSubsidyContent.map((text, index) => (
                      <li key={index}>{text}</li>
                  ))}
              </ul>
          </div>
  
          {/* Displaying PIB Release Content */}
          <div className="mb-6">
              <h3 className="text-xl font-semibold">PIB Release Content:</h3>
              <ul className="list-disc pl-6">
                  {data.pibReleaseContent.map((text, index) => (
                      <li key={index}>{text}</li>
                  ))}
              </ul>
          </div>
  
          {/* Displaying Table Data */}
          <div className="mb-6">
              <h3 className="text-xl font-semibold">Fertilizer Subsidy Table:</h3>
              <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-200">
                      <tr>
                          {data.fertiliserSubsidyTableData[0] && data.fertiliserSubsidyTableData[0].map((cell, i) => (
                              <th key={i} className="border border-gray-400 px-4 py-2 text-left">{cell}</th>
                          ))}
                      </tr>
                  </thead>
                  <tbody>
                      {data.fertiliserSubsidyTableData.slice(1).map((row, index) => (
                          <tr key={index} className="even:bg-gray-100">
                              {row.map((cell, i) => (
                                  <td key={i} className="border border-gray-400 px-4 py-2">{cell}</td>
                              ))}
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
  
};

export default Scraper;
