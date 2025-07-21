/* ------------------------------------------------------------
   React‑Query v5 hook : 회사 프로필 조회
   사용 예)
   const { data, isLoading, error } = useCompanyProfile({ symbol });
-------------------------------------------------------------*/

import { useQuery } from "@tanstack/react-query";
import { getCompanyProfile } from "@/lib/finnhub";

export interface UseCompanyProfileProps {
  /** 조회할 종목 심볼 — 없으면 API 호출하지 않음 */
  symbol: string | null;
}

export function useCompanyProfile({ symbol }: UseCompanyProfileProps) {
  return useQuery({
    queryKey: ["companyProfile", symbol],
    queryFn: () => getCompanyProfile(symbol as string),
    enabled: !!symbol,          // symbol 이 있을 때만 호출
    staleTime: 30 * 60 * 1000,  // 30분 동안 캐시
  });
}
