import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/providers";       // ← 추가

export const metadata: Metadata = {
  title: "IPO Tracker",
  description: "Track upcoming and recent IPOs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Providers = client 컴포넌트, 여기서 감싸면 모든 페이지에서 useQuery 사용 가능 */}
      <body className="bg-gray-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
