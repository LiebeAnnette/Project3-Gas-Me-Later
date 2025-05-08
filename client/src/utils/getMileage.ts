export async function getMileage(token: string): Promise<number | null> {
  try {
    const res = await fetch("/api/stats/mileage", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch mileage");

    const data = await res.json();
    return data.totalMiles;
  } catch (err) {
    console.error("Mileage fetch failed:", err);
    return null;
  }
}
