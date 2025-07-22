import { notFound } from 'next/navigation';
import { getCompanyProfile } from '@/lib/finnhub';

/* ───────── 타입 ───────── */
interface Props {
  params: { symbol: string };
}

/* ───────── 페이지 메타 (탭 제목) ───────── */
export async function generateMetadata({ params }: Props) {
  return { title: `${params.symbol} | IPO Tracker` };
}

/* ───────── 회사 프로필 페이지 ───────── */
export default async function CompanyPage({ params }: Props) {
  /* ① 동적 파라미터 정리 */
  const symbol = decodeURIComponent(params.symbol ?? '').toUpperCase();
  if (!symbol) notFound();

  /* ② Finnhub API 호출 */
  const profile = await getCompanyProfile(symbol);

  /* ③ 데이터 없으면 placeholder */
  if (!profile || Object.keys(profile).length === 0) {
    return (
      <main className="company-container">
        <h1>{symbol}</h1>
        <p>No profile information found.</p>
      </main>
    );
  }

  /* ④ 정상 렌더 */
  return (
    <main className="company-container">
      <h1>{profile.name ?? symbol}</h1>

      <table className="company-table">
        <tbody>
          <tr>
            <th>Symbol</th>
            <td>{symbol}</td>
          </tr>
          <tr>
            <th>Company</th>
            <td>{profile.name ?? '—'}</td>
          </tr>
          <tr>
            <th>Exchange</th>
            <td>{profile.exchange ?? '—'}</td>
          </tr>
          <tr>
            <th>Industry</th>
            <td>{profile.finnhubIndustry ?? '—'}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              {profile.weburl ? (
                <a href={profile.weburl} target="_blank" rel="noopener noreferrer">
                  {profile.weburl}
                </a>
              ) : (
                '—'
              )}
            </td>
          </tr>
          <tr>
            <th>IPO Date</th>
            <td>{profile.ipo ?? '—'}</td>
          </tr>
          <tr>
            <th>Market Cap</th>
            <td>
              {profile.marketCapitalization
                ? `${profile.marketCapitalization.toLocaleString()} M`
                : '—'}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
