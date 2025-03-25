// Schemes.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch schemes data from the API
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('https://www.myscheme.gov.in/api/v1/schemes?category=Agriculture,Rural%20&%20Environment');
        setSchemes(response.data);
      } catch (err) {
        setError('Failed to fetch schemes.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) return <p>Loading schemes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Agriculture, Rural & Environment Schemes</h1>
      <ul>
        {schemes.map((scheme) => (
          <li key={scheme.id}>
            <h2>{scheme.name}</h2>
            <p>{scheme.description}</p>
            <a href={scheme.link} target="_blank" rel="noopener noreferrer">
              Learn more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schemes;
