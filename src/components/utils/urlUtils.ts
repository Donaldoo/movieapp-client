const IS_SERVER = typeof window === "undefined";
export default async function getURL(path: string) {
  const baseURL = IS_SERVER ? process.env.API_URL : window.location.origin;

  return new URL(path, baseURL);
}
