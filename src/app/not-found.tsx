import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="main-section overflow">
        <div className="w-layout-blockcontainer main-container w-container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "2vw" }}>
            <div style={{ fontSize: "var(--text-typography--404-size)", lineHeight: "var(--text-typography--404-height)", fontWeight: 300 }}>
              404
            </div>
            <div className="text-secondary">Page not found</div>
            <Link href="/" className="button-primary w-inline-block">
              <div className="wrapper-button-primary">
                <div className="wrapper-button-primary-text">
                  <div className="text-menu">Back Home</div>
                </div>
                <div className="wrapper-button-primary-bg">
                  <div className="bg-button-primary"></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
