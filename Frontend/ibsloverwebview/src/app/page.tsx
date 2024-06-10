import MobileSideBar from "@/components/leftsidebar/MobileSideBar";
import Sidebar from "@/components/leftsidebar/Sidebar";
import ListView from "@/components/ListView";
import MapView from "@/components/mapview/MapView";
import PanicFooter from "@/components/PanicFooter";

export default function Home() {
  return (
    <main className="h-full w-full bg-gray-100 relative">
      <MapView />


      <div className="hidden md:block absolute top-0 left-0 z-10">
        <Sidebar />
      </div>
      <div className="block md:hidden absolute top-0 left-1/2 z-10">
        <MobileSideBar />
      </div>

      <div className="absolute top-20 right-10 z-10 hidden md:block">
        <ListView />
      </div>

      <div className="z-10 block md:hidden">
        <ListView />
      </div>

      <div className="block md:hidden w-full mt-auto">
        <PanicFooter />
      </div>
    </main>
  );
}
