import localFont from "next/font/local";
import "./globals.css";
import { Fugaz_One } from 'next/font/google'
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "@/components/Logout";



const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' })



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



export const metadata = {
  title: "Calendario dos Sentimentos",
  description: "Regista e vê os teus sentimentos ao longo do ano",
};

export default function RootLayout({ children }) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
      
    <h1 className={fugaz.className +" text-base textGradient"}>Calendario de sentimentos</h1>
      </Link>
    <Logout></Logout>
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
    
    <p className={'text-indigo-600 '+fugaz.className} >Created with ❤️</p>
    </footer>
  )

  return (
    <html lang="en">
      <Head/>
      <AuthProvider>


      <body
        className={'w-full max-w-1000 mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 ' +`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        
        {header}
        {children}
        {footer}
      </body>
        </AuthProvider>
    </html>
  );
}
