import "@/styles/globals.css";

import { Roboto } from "next/font/google";
import { Header } from "@/components/header";
import { Providers } from "./providers";
import { getSession } from "./_data/session";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "Диплом",
  description: "Клиентская часть дипломного приложения",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${roboto.className}`}>
      <body>
        <main className="grid h-screen grid-rows-[auto,1fr]">
          <Providers>
            <Header />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
