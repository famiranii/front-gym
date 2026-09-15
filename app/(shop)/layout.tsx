import GetMe from "@/components/featchers/home/GetMe";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <GetMe />
      <div className="pb-20">{children}</div>
      <Footer />
    </>
  );
}
