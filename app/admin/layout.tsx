import GetMe from "@/components/featchers/home/GetMe";
import Sidebar from "./components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen">
      <Sidebar />
      <GetMe />
      <main className="min-h-screen md:mr-72">{children}</main>
    </div>
  );
}
