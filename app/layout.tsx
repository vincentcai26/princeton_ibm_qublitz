import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { MyProvider } from "@/config/context";
import { Instrument_Sans } from 'next/font/google'
import Footer from "@/components/Footer";
import {eventName} from "./../content/content"
 
// If loading a variable font, you don't need to specify the font weight
const instrumentsans = Instrument_Sans({ subsets: ["latin"]})


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: `${eventName} 2025`,
  description: `Website for ${eventName}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const [isAuth,setIsAuth] = useState<boolean>(false)

  const newLocal = {}

  return (
    <MyProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.png" sizes="any" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${instrumentsans.className} antialiased`}
        >
          <Header></Header>
          <main>{children}</main>
          <Footer></Footer>
        </body>
      </html>
    </MyProvider>
  );
}
