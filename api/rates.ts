import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse,
) {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const symbols = "USD,MXN,COP,GBP,VND,THB,MYR";
  const url = `https://api.exchangerate.host/latest?access_key=${apiKey}&source=USD&currencies=${symbols}&format=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({ error: "Failed to fetch exchange rates" });
  }
}
