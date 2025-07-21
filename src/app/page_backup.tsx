"use client";                                // ★ 맨 위에 꼭 있어야 합니다.
console.log("### TOKEN:", process.env.NEXT_PUBLIC_FINNHUB_API_KEY);

import { useState } from "react";
import { useIpoCalendar } from "../hooks/useIpoCalendar";

/** YYYY‑MM‑DD 포맷 함수 */
function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function HomePage() {
  // 기본 날짜: 오늘 ~ 7일 후
  const today = new Date();
  const weekLater = new Date(today.getTime() + 7 * 86_400_000);

  const [from, setFrom] = useState(toISODate(today));
  const [to, setTo] = useState(toISODate(weekLater));
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading, error } = useIpoCalendar(
    { from, to },
    { enabled }
  );

  /** 버튼 클릭 → fetch 트리거 */
  const handleFetch = () => setEnabled(true);

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">IPO Calendar</h1>

      {/* 날짜 입력 & 버튼 */}
      <div className="flex items-center gap-4">
        <label className="flex flex-col">
          From
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-1 rounded"
          />
        </label>

        <label className="flex flex-col">
          To
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-1 rounded"
          />
        </label>

        <button
  onClick={handleFetch}
  className="
    bg-blue-600 text-white px-4 py-2 rounded
    hover:bg-blue-700 hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-blue-400
    transition
  "
>
  Fetch IPOs
</button>
      </div>

      {/* 상태 표시 */}
      {isLoading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error.message}</p>}

      {/* 결과 테이블 */}
      {data && data.length > 0 && (
        <table className="w-full text-sm border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Company</th>
              <th className="border px-2 py-1">Symbol</th>
              <th className="border px-2 py-1">Shares</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ipo) => (
              <tr key={ipo.symbol + ipo.date}>
                <td className="border px-2 py-1">{ipo.date}</td>
                <td className="border px-2 py-1">{ipo.company}</td>
                <td className="border px-2 py-1">{ipo.symbol}</td>
                <td className="border px-2 py-1">{ipo.numberOfShares}</td>
                <td className="border px-2 py-1">{ipo.price}</td>
                <td className="border px-2 py-1">{ipo.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data && data.length === 0 && !isLoading && !error && (
        <p>No IPOs found for this range.</p>
      )}
    </main>
  );
}
