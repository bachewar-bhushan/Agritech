import React, { useState } from 'react';
import axios from 'axios';

const LivePrices = () => {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [commodity, setCommodity] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '579b464db66ec23bdd000001d51e42ce3122467278af845f433bc57a';

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24',
        {
          params: {
            'api-key': apiKey,
            format: 'json',
            'filters[State]': state,
            'filters[District]': district,
            'filters[Commodity]': commodity,
            'filters[Arrival_Date]': arrivalDate,
            limit: 10,
          },
        }
      );
      setResults(response.data.records);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Live Mandi Prices</h1>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="border p-2 rounded w-full" />
          <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} className="border p-2 rounded w-full" />
          <input type="text" placeholder="Commodity" value={commodity} onChange={(e) => setCommodity(e.target.value)} className="border p-2 rounded w-full" />
          <input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Search</button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      
      {results.length > 0 && (
        <table className="w-full mt-6 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">State</th>
              <th className="border p-2">District</th>
              <th className="border p-2">Market</th>
              <th className="border p-2">Commodity</th>
              <th className="border p-2">Variety</th>
              <th className="border p-2">Min Price</th>
              <th className="border p-2">Max Price</th>
              <th className="border p-2">Modal Price</th>
              <th className="border p-2">Arrival Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((record, index) => (
              <tr key={index} className="border-t">
                <td className="border p-2">{record.state}</td>
                <td className="border p-2">{record.district}</td>
                <td className="border p-2">{record.market}</td>
                <td className="border p-2">{record.commodity}</td>
                <td className="border p-2">{record.variety}</td>
                <td className="border p-2">{record.min_price}</td>
                <td className="border p-2">{record.max_price}</td>
                <td className="border p-2">{record.modal_price}</td>
                <td className="border p-2">{record.arrival_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LivePrices;
