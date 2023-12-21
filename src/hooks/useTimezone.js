import { useState, useEffect } from "react";

const useTimezone = () => {
  const [timezone, setTimezone] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        setLoading(true);
        const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = "https://www.timeapi.io/api/TimeZone/AvailableTimeZones";

        const response = await fetch(corsProxyUrl + apiUrl, {
          headers: {
            Origin: "*",
          },
        });

        const data = await response.json();
        setTimezone(data);
      } catch (error) {
        console.error(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTimezones();
  }, []);

  return {
    loading,
    error,
    timezone,
  };
};

export default useTimezone;
