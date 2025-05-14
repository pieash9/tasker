import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TaskBoard from "./components/task/TaskBoard";

const App = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <HeroSection />
        <TaskBoard />
      </div>
      <Footer />
    </>
  );
};

export default App;
