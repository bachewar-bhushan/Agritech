import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import backgroundImageMobile from "/bg-hero2.png"; // Mobile image (612x408)
import backgroundImageDesktop from "/bg-hero.png"; // Desktop image (original size)
import "@fontsource/dm-sans"; // Default 400 weight
import "@fontsource/dm-sans/700.css"; // Import specific weights

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const features = [
    {
      img: "img1.jpg",
      title: "AI-Powered Weed Detection Bot",
      desc: "Find crop-specific weeds",
      link: "/hardware",
    },
    {
      img: "weedicide.jpg",
      title: "Herbicide Guide",
      desc: "Get herbicide recommendations",
      link: "/weed-herbicide-guide",
    },
    {
      img: "update.png",
      title: "Government Updates",
      desc: "Stay informed on guidelines",
      link: "/govt-notification",
    },
    {
      img: "monitoring.png",
      title: "Specific Farm Monitoring",
      desc: "Monitor your farm",
      link: "Monitoring",
    },
    {
      img: "farm-comm.png",
      title: "Farmer Community",
      desc: "Connect & share knowledge",
      link: "https://example.com/farmer-community",
      external: true,
    },
  ];

  return (
    <div className="bg-white pt-[7vh] pb-9">
      {/* Hero Section */}
      <div
        className="relative flex flex-col justify-center items-center bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${isMobile ? backgroundImageMobile : backgroundImageDesktop})`,
          minHeight: "300px",
          maxHeight: "500px",
          height: "50vh",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl pb-3 text-white font-[DM Sans]">
            Empowering Indian Farmers with Smart Weed Management
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide italic text-white">
            <Typewriter
              words={["Throw Away Weeds, Protect Our Fields"]}
              loop={0}
              cursor={false}
              typeSpeed={90}
              deleteSpeed={50}
              delaySpeed={3000}
            />
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="m-6 sm:m-9 bg-white p-6 sm:p-9 text-justify rounded-2xl shadow-xl">
        <p className="text-green-800 text-sm sm:text-base">
          India’s farmers face significant challenges in managing weeds, which
          reduce crop yields and increase labor costs. Many farmers lack accurate
          information on which weeds affect their crops, the right herbicides to
          use, and why insecticides are ineffective against weeds.
        </p>
        <br />
        <p className="text-green-800 text-sm sm:text-base">
          Weeds are causing ₹92,000 crore ($11 billion) worth of loss in crop
          productivity each year, according to a study commissioned by the
          Federation of Seed Industry of India (FSII), carried out by experts
          N.T. Yaduraju, M.R. Hegde, and A.R. Sadananda. The collaborative study
          recommended deploying new, technology-led weed control strategies to
          address the menace. FSII in its report said, weeds are responsible for
          approximately 25-26% of yield losses in kharif crops and 18-25% in rabi
          across India.
        </p>
      </div>

      {/* Features Section */}
      <div className="m-6 sm:m-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            item.external ? (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <div className="w-full h-48 sm:h-64">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center bg-[#123524]">
                  <h1 className="font-semibold text-lg sm:text-xl text-white">{item.title}</h1>
                  <p className="text-stone-100 text-sm sm:text-base">{item.desc}</p>
                </div>
              </a>
            ) : (
              <Link
                key={index}
                to={item.link}
                className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <div className="w-full h-48 sm:h-64">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center bg-[#123524]">
                  <h1 className="font-semibold text-lg sm:text-xl text-white">{item.title}</h1>
                  <p className="text-stone-100 text-sm sm:text-base">{item.desc}</p>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
