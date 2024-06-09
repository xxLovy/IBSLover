import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "@/components/ui/toaster"


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <ReduxProvider>
          <header className="bg-gray-100 flex items-center h-[60px]">
            <Navbar />
          </header>

          <div>
            {children}
          </div>
          {/* <div className="absolute bottom-0 w-full">
            <Footer />
          </div> */}
        </ReduxProvider>
        <Toaster />
      </body>

    </html >
  )
}


export default Layout

