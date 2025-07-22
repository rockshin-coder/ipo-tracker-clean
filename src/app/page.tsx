'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import useIpoCalendar from '@/hooks/useIpoCalendar';
import clsx from 'clsx';
import { IpoItem } from '@/lib/finnhub';

/* ────────── 상태별 색상 클래스 매핑 ────────── */
const statusColor = (status: string) =>
  ({
    expected:  'status-expected',
    priced:    'status-priced',
    filed:     'status-filed',
    withdrawn: 'status-withdrawn',
  }[status.toLowerCase()] ?? '');

export default function Home() {
  /* ───────── 날짜 상태 ───────── */
  const [from, setFrom] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [to,   setTo]   = useState(dayjs().endOf('month').format('YYYY-MM-DD'));

  /* ───────── IPO 데이터 ───────── */
  const { data: ipos = [], isLoading, refetch } = useIpoCalendar({
    from,
    to,
    enabled: false,              // 버튼 눌러야 실행
  });

  return (
    <main className="container">
      {/* ---------- 헤더 ---------- */}
      <h1 className="title">IPO Tracker</h1>

      {/* ---------- 날짜 & 버튼 ---------- */}
      <div className="controls">
        <div className="date-field">
          <label htmlFor="from">From</label>
          <input
            id="from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="date-field">
          <label htmlFor="to">To</label>
          <input
            id="to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <button
          className="fetch-btn"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          {isLoading ? 'Loading…' : 'Fetch IPOs'}
        </button>
      </div>

      {/* ---------- 표 ---------- */}
      <table className="ipo-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {ipos.length === 0 && (
            <tr>
              <td colSpan={4} className="no-data">
                No data
              </td>
            </tr>
          )}

          {ipos.map((ipo: IpoItem) => (
            <tr key={`${ipo.symbol}-${ipo.date}`}>
              <td>{ipo.date}</td>

              {/* 심볼 클릭 → /company/[symbol] 이동 */}
              <td>
                <Link href={`/company/${ipo.symbol}`} className="symbol-link">
                  {ipo.symbol}
                </Link>
              </td>

              <td>{ipo.company ?? 'N/A'}</td>
              <td className={clsx(statusColor(ipo.status))}>{ipo.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
