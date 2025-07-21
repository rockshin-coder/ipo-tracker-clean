"use client";
import { useState } from "react";
import {
  getIpoCalendar,
  getCompanyProfile,
  IpoItem,
} from "@/lib/finnhub";

/**
 * IPO 캘린더를 가져오고 상태로 저장하는 커스텀 훅
 */
export function useIpoCalendar() {
  const [ipos, setIpos] = useState<IpoItem[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * @param from  시작 날짜 (YYYY-MM-DD)
   * @param to    종료 날짜 (YYYY-MM-DD)
   */
  async function fetchIpos(from: string, to: string) {
    setLoading(true);
    try {
      // Next.js API 라우트 호출 (CORS 문제 없음)
      const res = await fetch(`/api/ipo?from=${from}&to=${to}`);
      const { ipoCalendar } = (await res.json()) as { ipoCalendar: IpoItem[] };
  
      // 회사명 채우기
      const withNames = await Promise.all(
        ipoCalendar.map(async (item) => {
          if (item.company) return item;
          const profile = await fetch(`/api/profile?symbol=${item.symbol}`).then(
            (r) => r.json()
          );
          return { ...item, company: profile.name ?? "N/A" };
        })
      );
  
      setIpos(withNames);
    } finally {
      setLoading(false);
    }
  }
  

  return { ipos, loading, fetchIpos };
}
