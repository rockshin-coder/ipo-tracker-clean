"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface CompanyProfile {
  name: string;
  logo: string;
  weburl: string;
  finnhubIndustry: string;
}

// Create a centralized axios instance for Finnhub API calls
const finnhubApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

// Add request interceptor to include API key
finnhubApi.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
  if (!token) {
    throw new Error('NEXT_PUBLIC_FINNHUB_API_KEY is not defined in environment variables.');
  }
  config.params = {
    ...config.params,
    token,
  };
  return config;
});

export function useCompanyProfile(symbol: string) {
  return useQuery<CompanyProfile>({
    queryKey: ["companyProfile", symbol],
    queryFn: async () => {
      const { data } = await finnhubApi.get("/stock/profile2", {
        params: { symbol }
      });
      return data;
    },
    enabled: !!symbol,           // symbol 이 준비됐을 때만 호출
    staleTime: 1000 * 60 * 30,   // 30분 캐시
  });
} 