/* ------------------------------------------------------------------
   GET /api/profile?symbol=TSLA
-------------------------------------------------------------------*/
import { NextResponse } from "next/server";
import { getCompanyProfile } from "@/lib/finnhub";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json(
      { error: "symbol query‑param required" },
      { status: 400 },
    );
  }

  try {
    const profile = await getCompanyProfile(symbol);
    return NextResponse.json(profile);
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    console.error(
      "Finnhub proxy error:",
      e?.response?.status,
      e?.response?.data,
    );
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
