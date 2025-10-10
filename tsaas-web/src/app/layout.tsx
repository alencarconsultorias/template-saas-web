import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SessionsProvider } from "@/contexts/SessionsContext";
import { CompanyProvider } from "@/contexts/CompanyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaS Platform",
  description: "Modern SaaS platform with analytics and management tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <SessionsProvider>
                <CompanyProvider>
                  {children}
                </CompanyProvider>
              </SessionsProvider>
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 