const ORS_KEY = import.meta.env.VITE_ORS_API_KEY;

export async function getCoords(
  place: string
): Promise<{ lat: number; lon: number } | null> {
  try {
    const res = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${encodeURIComponent(
        place
      )}`
    );
    const data = await res.json();
    const [lon, lat] = data.features[0].geometry.coordinates;
    return { lat, lon };
  } catch (err) {
    console.error("Failed to get coordinates:", err);
    return null;
  }
}
