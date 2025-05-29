"use server";
export async function getJSONRandom() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&count=4`
  );
  const data = await response.json();
  return data;
}

export async function getJSONSearch(query: string) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=4&query=${query}`
  );
  const data = await response.json();
  return data;
}