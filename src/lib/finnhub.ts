
import axios from "axios";

/*───────────────────────────────*
 *  타입 정의                      *
 *───────────────────────────────*/
export interface IpoItem {
  symbol: string;
  company?: string;
  exchange: string;
  date: string;
  numberOfShares: number;
  price: string;
  status: string;
}

/*───────────────────────────────*
 *  Axios 인스턴스                *
 *───────────────────────────────*/
const apiBase =
  process.env.NEXT_PUBLIC_API_BASE || "https://finnhub.io/api/v1";

const api = axios.create({
  baseURL: apiBase,
});

/*───────────────────────────────*
 *  API 키 처리                   *
 *───────────────────────────────*/
const token = process.env.NEXT_PUBLIC_FINNHUB_API_KEY as string;

if (!token) {
  console.warn(
    "⚠️  Finnhub API 키가 설정되지 않았습니다. .env.local 파일을 확인하세요."
  );
}

// 모든 요청에 token 파라미터 자동 추가
api.interceptors.request.use((config) => {
  config.params = { ...(config.params ?? {}), token };
  return config;
});

/*───────────────────────────────*
 *  Finnhub API 함수              *
 *───────────────────────────────*/

/** IPO 캘린더 */
export async function getIpoCalendar(
  from: string,
  to: string
): Promise<IpoItem[]> {
  const res = await api.get("/calendar/ipo", { params: { from, to } });
  const { ipoCalendar } = res.data as { ipoCalendar: IpoItem[] };
  return ipoCalendar;
}

/** 회사 프로필 */
export async function getCompanyProfile(symbol: string) {
  const res = await api.get("/stock/profile2", { params: { symbol } });
  return res.data;
}

export default api;
