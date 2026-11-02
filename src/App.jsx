import Header from "./components/Header";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import Comparison from "./components/Comparison";
import Branches from "./components/Branches";
import FAQ from "./components/FAQ";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import StickyBar from "./components/StickyBar";
import InquiryForm from "./components/InquiryForm";

const App = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Plans />
      <Comparison />
      <InquiryForm />
      <Gallery />
      <Branches />
      <FAQ />
    </main>
    <Footer />
    <StickyBar />
  </>
);

export default App;
