/* src/app/page.tsx */
'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import useIpoCalendar from '@/hooks/useIpoCalendar';
import Link from 'next/link';
import clsx from 'clsx';

export default function Home() {
  /* ───── 날짜 상태 ───── */
  const today = dayjs().format('YYYY-MM-DD');
  const monthAgo = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
  const [from, setFrom] = useState(monthAgo);
  const [to, setTo] = useState(today);

  /* ───── API 호출 ───── */
  const { data, isLoading, error } = useIpoCalendar({
    from,
    to,
    enabled: true,
  });

  /* ───── 렌더링 ───── */
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 className="text-3xl font-bold mb-4">IPO Tracker</h1>

      {/* 날짜 선택 */}
      <div className="mb-6 flex justify-center gap-4">
        <div>
          <label className="block text-sm">From</label>
          <input
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block text-sm">To</label>
          <input
            type="date"
            value={to}
            onChange={e => setTo(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        <button
          onClick={() => null /* 이미 useIpoCalendar 가 알아서 refetch */}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Fetch IPOs
        </button>
      </div>

      {/* 표 */}
      <table className="mx-auto w-[720px] text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Date</th>
            <th className="p-2">Symbol</th>
            <th className="p-2">Company</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                Loading…
              </td>
            </tr>
          )}

          {error && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-red-600">
                Error: {error.message}
              </td>
            </tr>
          )}

          {data?.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                No data
              </td>
            </tr>
          )}

          {data?.map(item => (
            <tr key={item.symbol} className="border-b last:border-0">
              <td className="p-2">{item.date}</td>
              <td className="p-2 text-blue-600 underline">
                <Link href={`/company/${item.symbol}`}>{item.symbol}</Link>
              </td>
              <td className="p-2">{item.company ?? 'N/A'}</td>
              <td
                className={clsx('p-2 capitalize', {
                  'text-orange-600': item.status === 'expected',
                  'text-green-700': item.status === 'priced',
                  'text-blue-700': item.status === 'filed',
                  'text-red-600': item.status === 'withdrawn',
                })}
              >
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
