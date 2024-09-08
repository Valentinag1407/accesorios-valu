import { FloatingButton } from "../atoms/FloatButton";
import Footer from "../components/Footer";
import { NavBar } from "../components/NavBar";

export const LayoutNavFoo = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>

      <FloatingButton />
      <main className="flex-grow pt-20 md:pt-28 min-h-96">{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
