"use client";
import Link from "next/link";
import { useState } from "react";
import { useIpoCalendar } from "@/hooks/useIpoCalendar";

export default function Home() {
  const { ipos, loading, fetchIpos } = useIpoCalendar();
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-12-31");

  return (
    <main className="flex flex-col items-center gap-6 py-10">
      <h1 className="text-3xl font-bold">IPO Tracker</h1>

      {/* 날짜 입력 */}
      <div className="flex gap-4 items-end">
        <label className="flex flex-col text-sm">
          From
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col text-sm">
          To
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
        <button
          onClick={() => fetchIpos(from, to)}
          disabled={loading}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow
                     transition hover:bg-blue-700 hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Loading…" : "Fetch IPOs"}
        </button>
      </div>

      {/* 결과 표 */}
      {ipos.length > 0 && (
        <table className="mt-8 border-collapse">
          <thead>
            <tr className="font-semibold">
              <th className="px-3 py-1 border-b">Date</th>
              <th className="px-3 py-1 border-b">Symbol</th>
              <th className="px-3 py-1 border-b">Company</th>
            </tr>
          </thead>
          <tbody>
            {ipos.map((ipo) => (
              <tr key={`${ipo.symbol}-${ipo.date}`}>
                <td className="px-3 py-1">{ipo.date}</td>
                <td className="px-3 py-1">
                  <Link
                    href={`/company/${ipo.symbol}`}
                    className="text-indigo-600 underline hover:text-indigo-800"
                  >
                    {ipo.symbol}
                  </Link>
                </td>
                <td className="px-3 py-1">{ipo.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
