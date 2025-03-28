import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const changeLanguage = (langCode) => {
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = langCode;
      selectField.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setLanguageDropdownOpen(false);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <nav className="bg-[#123524] w-full fixed top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/home" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-[50px] h-[50px]" />
            <span className="text-white font-bold ml-2 text-sm md:text-lg">
              Agritech
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <Link to="/home"><li className="hover:text-yellow-300 transition">Home</li></Link>
          <Link to="/hardware"><li className="hover:text-yellow-300 transition">AgriTech WeedOBot</li></Link>
          {/* <Link to="/Monitoring"><li className="hover:text-yellow-300 transition">Farm Monitoring</li></Link> */}
          <Link to="/weed-herbicide-guide"><li className="hover:text-yellow-300 transition">Herbicide Guide</li></Link>
          <Link to="/govt-schemes-updates"><li className="hover:text-yellow-300 transition">Govt Schemes & Updates</li></Link>
        </ul>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Globe size={20} /> Language
          </button>
          {languageDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-md z-50">
              {[
                { name: "English", code: "en" },
                { name: "Hindi (हिन्दी)", code: "hi" },
                { name: "Marathi (मराठी)", code: "mr" },
                { name: "Tamil (தமிழ்)", code: "ta" },
                { name: "Telugu (తెలుగు)", code: "te" },
                { name: "Bengali (বাংলা)", code: "bn" },
                { name: "Gujarati (ગુજરાતી)", code: "gu" },
                { name: "Punjabi (ਪੰਜਾਬੀ)", code: "pa" },
                { name: "Kannada (ಕನ್ನಡ)", code: "kn" },
                { name: "Malayalam (മലയാളം)", code: "ml" },
              ].map((lang) => (
                <li
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 text-white text-center py-3 space-y-2">
          <ul className="space-y-2">
            <Link to="/home" onClick={() => setMenuOpen(false)}><li className="py-2 hover:bg-green-600">Home</li></Link>
            <Link to="/hardware" onClick={() => setMenuOpen(false)}><li className="py-2 hover:bg-green-600">Components</li></Link>
            <Link to="/Monitoring" onClick={() => setMenuOpen(false)}><li className="py-2 hover:bg-green-600">My Farm & Bot</li></Link>
            <Link to="/weed-herbicide-guide" onClick={() => setMenuOpen(false)}><li className="py-2 hover:bg-green-600">Herbicide Guide</li></Link>
            <Link to="/govt-schemes-updates" onClick={() => setMenuOpen(false)}><li className="py-2 hover:bg-green-600">Govt Notification</li></Link>
          </ul>
        </div>
      )}

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </nav>
  );
}

export default Navbar;
