import HeroSection from "@/components/custom/Landing/HeroSection";
import NavBar from "@/components/custom/Navigation/NavBar";
import Testimonials from "@/components/custom/Landing/Testimonials";
import Footer from "@/components/custom/Navigation/Footer";
import ChatBotWrapper from "@/components/custom/Chatbot/ChatBotWrapper";
import ATSFor from "@/components/custom/Landing/ATSFor";
import Pills from "@/components/custom/Landing/Pills";
import Companies from "@/components/custom/Landing/Companies";
import About from "@/components/custom/Landing/About";
import FAQ from "@/components/custom/Landing/FAQ";
import VideoPlayer from "@/components/custom/Landing/videoplayer";
import CareerNetwork from "@/components/custom/Landing/CareerNetwork";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <HeroSection />
      {/* <Companies /> */}
      <CareerNetwork />
      <ATSFor />
      {/* <Pills /> */}
      <About />
      {/* <FAQ /> */}
      {/* <Testimonials /> */}
      <Footer />
      <ChatBotWrapper />
    </main>
  );
}
