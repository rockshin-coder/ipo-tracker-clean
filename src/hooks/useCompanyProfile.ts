// src/hooks/useCompanyProfile.ts
import { useQuery } from '@tanstack/react-query';
import { getCompanyProfile } from '@/lib/finnhub';

export interface UseCompanyProfileProps {
  symbol: string | null;
}

export default function useCompanyProfile({ symbol }: UseCompanyProfileProps) {
  return useQuery({
    queryKey: ['companyProfile', symbol],
    queryFn: () => getCompanyProfile(symbol as string),
    enabled: !!symbol,          // 심볼이 있을 때만 호출
    staleTime: 30 * 60 * 1_000, // 30 분 캐시
  });
}
