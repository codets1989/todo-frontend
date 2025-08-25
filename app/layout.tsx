import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Inter } from 'next/font/google'
export const metadata: Metadata = {
  title: "Todo App",
  description: "Take-home: Todo List App (Frontend)",
};
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-dark1 text-white`}>
        <header className="bg-black text-white px-6 py-4">
          <div className="py-4 flex items-center justify-center bg-gradient-to-r from-sky-400 to-purple-500 text-transparent bg-clip-text">
            
            <Link href="/" className="text-3xl font-semibold">Todo App</Link>

          </div>
        </header> 
        <main className="container py-6">{children}</main>

      </body>
    </html>
  );
}
