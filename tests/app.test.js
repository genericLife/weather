import { fetchWeather } from "../utils/fetchWeather";

global.fetch = jest.fn(); // mock fetch globally

describe("fetchWeather", () => {
  const API_KEY = "53f9d8e4213222cf517d86dc406d67fc";

  const mockWeatherResponse = {
    weather: [{ main: "Clouds", description: "broken clouds" }],
    main: { temp: 10, humidity: 80 },
    name: "Mocked City",
  };

  beforeEach(() => {
    fetch.mockClear();
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWeatherResponse),
    });
  });

  const testLocations = [
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  ];

  testLocations.forEach(({ name, lat, lon }) => {
    test(`returns weather data for ${name}`, async () => {
      const data = await fetchWeather(lat, lon, API_KEY);

      // ensure fetch was called correctly
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`lat=${lat}`)
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`lon=${lon}`)
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`appid=${API_KEY}`)
      );

      // ensure returned data matches mock
      expect(data.weather[0].main).toBe("Clouds");
      expect(data.main.temp).toBe(10);
      expect(data.name).toBe("Mocked City");
    });
  });

  test("throws an error on non-200 response", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(fetchWeather(0, 0, API_KEY)).rejects.toThrow(
      "Failed to fetch weather data"
    );
  });
});