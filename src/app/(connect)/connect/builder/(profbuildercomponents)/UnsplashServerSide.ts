"use server";
const unsplashKey = process.env.UNSPLASH_ACCESS!;
export async function getJSONRandom() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${unsplashKey}&count=4`
  );
  const data = await response.json();
  return data;
}
