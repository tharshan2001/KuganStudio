import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import IntroManager from "../components/intro/IntroManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${playfair.variable}
          antialiased
        `}
      >
        <IntroManager>{children}</IntroManager>
      </body>
    </html>
  );
}
