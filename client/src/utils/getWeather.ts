const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

/**
 * Gets the weather at a specific location
 * @param lat lattitude of location
 * @param lon longitude of location
 * @param tripDate date of trip
 * @returns object of weather data
 */
export async function getWeather(lat: number, lon: number, tripDate: string) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    );

    const data = await res.json();

    if (!data.list || !Array.isArray(data.list)) {
      console.error("Invalid response from forecast API:", data);
      return null;
    }

    const target = new Date(tripDate).getTime();

    // Find the forecast entry closest to the trip date
    let closest = data.list[0];
    let closestDiff = Math.abs(new Date(closest.dt_txt).getTime() - target);

    for (const forecast of data.list) {
      const forecastTime = new Date(forecast.dt_txt).getTime();
      const diff = Math.abs(forecastTime - target);
      if (diff < closestDiff) {
        closest = forecast;
        closestDiff = diff;
      }
    }

    return {
      temp: Math.round(closest.main.temp),
      description: closest.weather[0].description,
      icon: closest.weather[0].icon,
    };
  } catch (err) {
    console.error("Failed to fetch weather:", err);
    return null;
  }
}
