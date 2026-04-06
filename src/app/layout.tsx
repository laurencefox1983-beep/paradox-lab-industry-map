import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: '【Paradox Lab】產業智慧地圖',
  description: '【Paradox Lab】產業智慧地圖：提供互動式供應鏈視覺化與分析，協助您掌握產業動態與投資機會。',
  keywords: ['AI', '產業地圖', '供應鏈', '台股', '投資分析', '產業分析', '股票'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
