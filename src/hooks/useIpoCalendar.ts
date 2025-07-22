// src/hooks/useIpoCalendar.ts
import { useQuery } from '@tanstack/react-query';
import { getIpoCalendar, IpoItem } from '@/lib/finnhub';

/** 컴포넌트에서 전달받을 파라미터 */
export interface UseIpoCalendarParams {
  from: string;        // YYYY‑MM‑DD
  to: string;          // YYYY‑MM‑DD
  enabled: boolean;    // Fetch 버튼을 눌렀을 때 true
}

/** react‑query 래퍼 – default export */
export default function useIpoCalendar(
  { from, to, enabled }: UseIpoCalendarParams,
) {
  return useQuery<IpoItem[], Error>({
    /** 캐시 키: 날짜가 바뀌면 새로 가져옴 */
    queryKey: ['ipoCalendar', from, to],

    /** Finnhub API 호출 */
    queryFn: () => getIpoCalendar(from, to),

    /** 버튼 누를 때만 실행 */
    enabled,

    /** 30 분 동안 캐시 유지 */
    staleTime: 1_800_000,
  });
}
