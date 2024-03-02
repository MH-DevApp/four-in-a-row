import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/utils/fonts";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { ThemeProvider } from "@/hook/ThemeProvider";

export const metadata: Metadata = {
  title: "Four In A Row",
  description: "A simple game of Four In A Row",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.className}`} lang="en">
      <body>
        <ThemeProvider>
          <HeaderComponent />
          {children}
          <FooterComponent />
        </ThemeProvider>
      </body>
    </html>
  );
}
