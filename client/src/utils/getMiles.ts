export async function getMiles(
  start: string,
  end: string
): Promise<number | null> {
  const apiKey = import.meta.env.VITE_ORS_API_KEY;

  const geocode = async (place: string) => {
    const res = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
        place
      )}`
    );
    const data = await res.json();
    const [lon, lat] = data.features[0].geometry.coordinates;
    return [lon, lat];
  };

  try {
    const [startCoords, endCoords] = await Promise.all([
      geocode(start),
      geocode(end),
    ]);

    const routeRes = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
        body: JSON.stringify({
          coordinates: [startCoords, endCoords],
        }),
      }
    );

    const routeData = await routeRes.json();
    const meters = routeData.features[0].properties.summary.distance;
    const miles = meters / 1609.34;

    return Math.round(miles);
  } catch (err) {
    console.error("Failed to calculate miles:", err);
    return null;
  }
}
