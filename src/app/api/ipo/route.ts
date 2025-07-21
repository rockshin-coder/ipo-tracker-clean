import { NextResponse } from "next/server";
import { getIpoCalendar } from "@/lib/finnhub";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  if (!from || !to) {
    return NextResponse.json(
      { error: "Query params 'from' and 'to' are required" },
      { status: 400 }
    );
  }

  try {
    const data = await getIpoCalendar(from, to);
    return NextResponse.json({ ipoCalendar: data });
  } catch (e) {
    console.error("Finnhub proxy error:", e);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
