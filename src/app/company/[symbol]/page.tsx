/* src/app/company/[symbol]/page.tsx
   ✔ Next 15 타입 통과 (params/searchParams = Promise)
   ✔ 로고·웹사이트·산업 정보 카드
   ✔ 뒤로가기 시 날짜 범위 복원 */

   import { notFound } from "next/navigation";
   import Link from "next/link";
   import Image from "next/image";
   import { fetchCompanyProfile } from "@/lib/finnhub";
   
   /** 동적 세그먼트 타입 */
   type RouteParams = { symbol: string };
   
   /** 쿼리 파라미터 타입 */
   type Query = { [key: string]: string | undefined };
   
   export default async function CompanyPage({
     params,
     searchParams,
   }: {
     params: Promise<RouteParams>;   // ★ Promise!
     searchParams: Promise<Query>;  // ★ Promise!
   }) {
     const { symbol } = await params;
     const query = await searchParams;
   
     const profile = await fetchCompanyProfile(symbol);
     if (!profile) notFound();
   
     /* 뒤로가기 링크에 날짜 범위 유지 */
     const backQuery =
       query.from && query.to ? `?from=${query.from}&to=${query.to}` : "";
   
     return (
       <main className="min-h-screen flex flex-col items-center p-8">
         <Link
           href={"/" + backQuery}
           className="self-start mb-6 text-blue-600 hover:underline"
         >
           ← Back
         </Link>
   
         {profile.logo && (
           <Image
             src={profile.logo}
             alt={`${profile.name} logo`}
             width={80}
             height={80}
             className="mb-4 rounded"
           />
         )}
   
         <h1 className="text-3xl font-bold mb-6 text-center">
           {profile.name} ({profile.ticker})
         </h1>
   
         <div className="w-full max-w-lg bg-white rounded-lg shadow p-6 space-y-3">
           <Info label="Exchange" value={profile.exchange} />
           {profile.ipo && <Info label="IPO Date" value={profile.ipo} />}
           {profile.finnhubIndustry && (
             <Info label="Industry" value={profile.finnhubIndustry} />
           )}
           {profile.weburl && (
             <Info
               label="Website"
               value={
                 <a
                   href={profile.weburl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-600 hover:underline"
                 >
                   {profile.weburl.replace(/^https?:\/\//, "")}
                 </a>
               }
             />
           )}
         </div>
       </main>
     );
   }
   
   /* 정보 행 컴포넌트 */
   function Info({
     label,
     value,
   }: {
     label: string;
     value: React.ReactNode;
   }) {
     return (
       <p className="text-lg">
         <span className="font-semibold">{label}:</span> {value}
       </p>
     );
   }
   