

export default function Hardware() {
    const components = [
        { name: "Microcontroller Raspberry Pi 5", img: "/raspbery.png" },
        { name: "ESP 32", img: "/esp32.png" },
        { name: "LoRa", img: "/lora.png" },
        { name: "GPS Sensor", img: "/gps.png" },
        { name: "Hub Motor", img: "/hub-motor.png" },
        { name: "Magnetometer", img: "/magnetometer.png" },
        { name: "IMU Module", img: "/imu-module.png" },
        { name: "Spray Component", img: "/spray-component.png" },
        { name: "Li-ion Battery", img: "/lion-battery.png" },
    ];

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white pt-[12vh] font-[\'Shadow Into Light\']">
            {/* Top Section with Two Partitions */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-8 md:py-12 px-4 md:px-6 space-y-6 md:space-y-0">
                {/* Left Section - Heading */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4 order-2 md:order-1">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Hardware Components
                    </h1>
                    <p className="text-base md:text-lg lg:text-2xl mt-2 md:mt-4 text-gray-300 leading-relaxed">
                        Explore the key parts that power our bot
                    </p>
                </div>
                {/* Right Section - Hero Image */}
                <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 mb-6 md:mb-0">
                    <img
                        src="/bot-hero.jpg"
                        alt="Bot Hero Image"
                        className="w-full md:w-auto h-auto max-w-full md:max-w-md lg:max-w-lg object-contain rounded-lg shadow-xl"
                    />
                </div>
            </div>

            {/* Hardware Components Grid */}
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {components.map((component, index) => (
                        <div key={index} className="flex justify-center transform hover:scale-105 transition duration-300">
                            <div className="bg-gray-800 shadow-lg rounded-xl overflow-hidden w-80">
                                <img
                                    src={component.img}
                                    alt={component.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 text-center">
                                    <h3 className="text-xl font-semibold">{component.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}