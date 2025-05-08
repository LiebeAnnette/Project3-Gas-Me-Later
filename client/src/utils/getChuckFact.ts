export async function getChuckFact(): Promise<string | null> {
  try {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await res.json();
    return data.value;
  } catch (err) {
    console.error("Chuck Norris blocked this request:", err);
    return null;
  }
}
