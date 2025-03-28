import Navbar from "./components/Navbar";
import HerbicideGuide from "./pages/HerbicideGuide";
import HerbicideInfo from "./pages/HerbicideInfo";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeedInfo from "./pages/WeedInfo";
// import LivePrices from "./pages/Liveprices";
// import Notification from "./pages/Notification";
import WeedCard from "./components/WeedCard";
import { useEffect } from "react";
import Hardware from "./pages/Hardware";
// import Monitoring from "./pages/Monitoring";
import Schemes from "./pages/Schemes";
import Footer from "./components/Footer";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/weed-herbicide-guide" element={<HerbicideGuide />} />
        <Route path="/weed-herbicide-guide/herbicide-info" element={<HerbicideInfo />} />
        <Route path="/weed-herbicide-guide/weed-info" element={<WeedInfo />} />
        {/* <Route path="/liveprices" element={<LivePrices />} /> */}
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/govt-schemes-updates" element={<Schemes/>} />
        <Route path="/crop/:cropName" element={<WeedCard />} />
        {/* <Route path="/Monitoring" element={<Monitoring />} />
        <Route path="/home/Monitoring" element={<Monitoring />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
