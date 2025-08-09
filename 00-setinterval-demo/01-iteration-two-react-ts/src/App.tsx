import React from "react";
import Header from "./components/Header";
import CountersSection from "./components/CountersSection";
import InfoSection from "./components/InfoSection";
import ResourcesSection from "./components/ResourcesSection";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <CountersSection />
        <InfoSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
