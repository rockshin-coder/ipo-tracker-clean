import { NextResponse } from "next/server";
import { getCompanyProfile } from "@/lib/finnhub";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") ?? "";

  if (!symbol) {
    return NextResponse.json(
      { error: "Query param 'symbol' is required" },
      { status: 400 }
    );
  }

  try {
    const data = await getCompanyProfile(symbol);
    return NextResponse.json(data);
} catch (e: any) {
    console.error("Finnhub proxy error:", e?.response?.status, e?.response?.data);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
  
