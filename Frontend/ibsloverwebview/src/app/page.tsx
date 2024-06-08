import Sidebar from "@/components/leftsidebar/Sidebar";
import ListView from "@/components/ListView";
import MapView from "@/components/mapview/MapView";

export default function Home() {
  return (
    <main className="h-full w-full bg-gray-100 relative">
      <MapView />

      <div className="absolute top-0 left-0 z-10">
        <Sidebar />
      </div>

      <div className="absolute top-20 right-10 z-10">
        <ListView />
      </div>
    </main>
  );
}
