  export const fetchWeather = async (lat, lon) => {
    const API_KEY = process.env.API_KEY;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      const res = await fetch(url);

      if (!res.ok) {
        console.log(res);
        const message = `Weather API error: ${res.status} ${res.statusText}`;
        throw new Error('Failed to fetch weather data');
      }

      const data = await res.json();

      if (!data || typeof data !== "object" || data.cod >= 400) {
        throw new Error(`Weather API returned an invalid response: ${data?.message || "Unknown error"}`);
      }

      return data;

    } catch (error) {
      console.error("Failed to fetch weather:", error.message);
      throw error;
    }
    
  };

  export const fetchNearestCityName = async (lat, lon) => {
    const API_KEY = process.env.API_KEY;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      const data = await res.json();
      console.log(data);
      if (data && data.length > 0) {
        return data[0].name; // nearest city or area name
      }
      return null;
    } catch (error) {
      return null;
    }
    
  }