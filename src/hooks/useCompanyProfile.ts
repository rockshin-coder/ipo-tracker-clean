"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface CompanyProfile {
  name: string;
  logo: string;
  weburl: string;
  finnhubIndustry: string;
}

export function useCompanyProfile(symbol: string) {
  return useQuery<CompanyProfile>(
    ["companyProfile", symbol],
    async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/stock/profile2`,
        { params: { symbol, token: process.env.NEXT_PUBLIC_FINNHUB_API_KEY } }
      );
      return data;
    },
    {
      enabled: !!symbol,           // symbol 이 있을 때만 호출
      staleTime: 1000 * 60 * 30,   // 30 분 캐시
    }
  );
}
