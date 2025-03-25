import React, { useEffect, useState } from "react";

const Notification = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("src/data/notification.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching the JSON data:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-[12vh] px-6">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Notifications</h1>
      <div className="w-full max-w-4xl">
        {paginatedData.length === 0 ? (
          <p className="text-center text-gray-500">No notifications available.</p>
        ) : (
          paginatedData.map((item, index) => (
            <div
              key={startIndex + index}
              className="bg-white p-6 rounded-lg shadow-lg mb-6 border-l-4 border-green-500 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item["Service Name"]}</h2>
              <p className="text-gray-600 mb-2">{item.Description}</p>
              <p className="text-gray-700 font-medium">Maturity Level: {item["Maturity Level"]}</p>
              <p className="text-yellow-500 font-semibold">⭐ {item["Star Rating"]}</p>
              <div className="mt-4 flex space-x-4">
                <a
                  href={item["Service Link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  Service Link
                </a>
                <a
                  href={item["More Info Link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  More Info
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded bg-green-600 mb-9 text-white ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"}`}
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))}
          disabled={currentPage >= totalPages - 1}
          className={`px-4 py-2 rounded bg-green-600 mb-9 text-white ${currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Notification;
