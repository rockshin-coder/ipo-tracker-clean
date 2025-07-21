// src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getCompanyProfile } from "@/lib/finnhub";

/**
 * GET /api/profile?symbol=TSLA
 */
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
    // ──────────────────
    const profile = await getCompanyProfile(symbol);
    // ──────────────────
    return NextResponse.json(profile);
  } catch (e: unknown) {
    // e 타입을 정확히 모를 때는 unknown → any 캐스트
    const err = e as any;
    console.error(
      "Finnhub proxy error:",
      err?.response?.status,
      err?.response?.data,
    );
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
