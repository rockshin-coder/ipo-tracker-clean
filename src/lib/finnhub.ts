/* src/lib/finnhub.ts
   전체 덮어쓰기 버전 — CompanyProfile 에 logo·weburl·finnhubIndustry 포함 */

   const API_BASE = "https://finnhub.io/api/v1";

   /* ── IPO 타입 ───────────────────────────── */
   interface RawIpoItem {
     symbol?: string;
     name?: string;
     company?: string;
     exchange?: string;
     date?: string;
     numberOfShares?: string;
     status?: string;
   }
   
   export interface IpoItem {
     symbol: string;
     company: string;
     exchange: string;
     date: string;
     numberOfShares: number;
     status: string;
   }
   
   /* ── 회사 프로필 타입 ────────────────────── */
   export interface CompanyProfile {
     name: string;
     ticker: string;
     exchange: string;
     ipo?: string;
     logo?: string;             // ✔
     weburl?: string;           // ✔
     finnhubIndustry?: string;  // ✔
   }
   
   /* ── 공통 fetch 헬퍼 ─────────────────────── */
   async function apiFetch<T>(endpoint: string): Promise<T> {
     const key = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
     const res = await fetch(`${API_BASE}${endpoint}&token=${key}`, {
       next: { revalidate: 3600 },
     });
     if (!res.ok) throw new Error(`Finnhub API ${res.status}`);
     return res.json() as Promise<T>;
   }
   
   /* ── IPO 캘린더 ─────────────────────────── */
   export async function fetchIpoCalendar(
     from: string,
     to: string
   ): Promise<IpoItem[]> {
     const { ipoCalendar } = await apiFetch<{ ipoCalendar: RawIpoItem[] }>(
       `/calendar/ipo?from=${from}&to=${to}`
     );
   
     return ipoCalendar.map((raw): IpoItem => ({
       symbol: raw.symbol ?? "N/A",
       company: raw.name ?? raw.company ?? "N/A",
       exchange: raw.exchange ?? "N/A",
       date: raw.date ?? "N/A",
       numberOfShares: Number(raw.numberOfShares ?? 0),
       status: raw.status ?? "N/A",
     }));
   }
   export const getIpoCalendar = fetchIpoCalendar; // 레거시 alias
   
   /* ── 회사 프로필 ─────────────────────────── */
   export async function fetchCompanyProfile(
     symbol: string
   ): Promise<CompanyProfile | null> {
     try {
       return await apiFetch<CompanyProfile>(
         `/stock/profile2?symbol=${symbol.toUpperCase()}`
       );
     } catch {
       return null;
     }
   }
   export const getCompanyProfile = fetchCompanyProfile; // 레거시 alias
   