import React, { useEffect, useState } from "react";
import axios from "axios";
import { Landmark, HelpingHand } from "lucide-react";

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const [nabardResponse, jansamarthResponse] = await Promise.all([
          axios.get("http://localhost:9000/api/scrapper_route/scrape-nabard"),
          axios.get(
            "http://localhost:9000/api/scrapper_route/govt-schemes-jansamarth"
          ),
        ]);

        const combinedSchemes = [
          ...nabardResponse.data.schemes.map((scheme) => ({
            ...scheme,
            source: "NABARD",
          })),
          ...jansamarthResponse.data.schemes.map((scheme) => ({
            ...scheme,
            source: "Jan Samarth",
          })),
        ];

        setSchemes(combinedSchemes);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div className="container mx-auto pt-[12vh] px-12 pb-9">
      <h1 className="font-black text-4xl text-center mb-9 mt-4 flex justify-center items-center text-black">
        <Landmark className="w-10 h-10 mr-2 text-green-700" />
        Government Schemes
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-justify">
          {schemes.map((scheme, index) => (
            <div
              key={index}
              className="shadow-xl rounded-xl border px-4 py-2 border-gray-200 text-gray-700 overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => setSelectedScheme(scheme)}
            >
              <div className="p-5 flex items-center">
                <div><HelpingHand className="w-8 h-8 mr-2 text-yellow-500" /></div>
                <h2 className="text-lg font-semibold">{scheme.name}</h2>
              </div>
              <p className="text-sm text-gray-500 px-5">
                Source: {scheme.source}
              </p>
              <p className="text-sm text-blue-600 px-5 mt-2">
                Click to view details
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedScheme && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => setSelectedScheme(null)}
            >
              ✖
            </button>
            <div className="flex items-center">
            <div><HelpingHand className="w-8 h-8 mr-2 text-yellow-500" /></div>
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                {selectedScheme.name}
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Source: {selectedScheme.source}
            </p>
            <div className="overflow-auto max-h-80">
              {selectedScheme.details.map((detail, i) => (
                <div key={i} className="mb-4">
                  {detail.type === "p" && (
                    <p className="text-gray-700">{detail.content}</p>
                  )}
                  {detail.type === "ul" && (
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                      {detail.content.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {detail.type === "table" && (
                    <table className="w-full border border-gray-300 mt-2">
                      <tbody>
                        {detail.content.map((row, rowIndex) => (
                          <tr key={rowIndex} className="border border-gray-200">
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="border border-gray-200 p-2"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
            {selectedScheme.link && (
              <div className="mt-4">
                <a
                  href={selectedScheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View More
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Schemes;
