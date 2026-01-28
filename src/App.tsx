import { useState } from 'react';
import { motion, PanInfo } from 'motion/react';
import { Menu, Droplets, Sun, Thermometer, Wind, Settings, Camera, BarChart3, Layers, Power, Clock, Users, ShoppingCart, Upload, MessageSquare, Download, Play, Pause, Gauge, Fan, Bell, Wifi, Smartphone, Monitor, Shield, Database, Globe, Volume2 } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logo from 'figma:asset/2fbd7a9e8178240e32120e1140f89c566d547773.png';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Overview');
  const [lampOn, setLampOn] = useState(true);
  const [soilHumidity, setSoilHumidity] = useState(45);
  const [currentTemperature, setCurrentTemperature] = useState(24);
  const [selectedPreset, setSelectedPreset] = useState('Tomato');
  const [fanSpeed, setFanSpeed] = useState(65);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCommunityTab, setSelectedCommunityTab] = useState('posts');

  const menuItems = [
    { icon: BarChart3, label: 'Overview', color: 'text-blue-500' },
    { icon: Sun, label: 'Lighting', color: 'text-yellow-500' },
    { icon: Droplets, label: 'Watering', color: 'text-cyan-500' },
    { icon: Thermometer, label: 'Temperature', color: 'text-red-500' },
    { icon: Wind, label: 'Ventilation', color: 'text-green-500' },
    { icon: Camera, label: 'Camera', color: 'text-purple-500' },
    { icon: Users, label: 'Community', color: 'text-pink-500' },
    { icon: Layers, label: 'Presets', color: 'text-orange-500' },
    { icon: Settings, label: 'Settings', color: 'text-gray-500' },
  ];

  const presets = [
    { 
      name: 'Parsley', 
      light: '12-14h', 
      humidity: '50-60%', 
      temperature: '18-22°C',
      description: 'Easy-growing herb, moderate light needs'
    },
    { 
      name: 'Orchids', 
      light: '10-12h', 
      humidity: '60-80%', 
      temperature: '20-25°C',
      description: 'Tropical flowering plant, high humidity'
    },
    { 
      name: 'Chives', 
      light: '14-16h', 
      humidity: '40-50%', 
      temperature: '15-20°C',
      description: 'Hardy herb, tolerates cooler temps'
    },
    { 
      name: 'Basil', 
      light: '14-16h', 
      humidity: '50-70%', 
      temperature: '20-25°C',
      description: 'Popular herb, loves warmth and light'
    },
    { 
      name: 'Lettuce', 
      light: '12-14h', 
      humidity: '45-55%', 
      temperature: '15-18°C',
      description: 'Cool-season vegetable, fast growing'
    },
    { 
      name: 'Tomato', 
      light: '16-18h', 
      humidity: '60-70%', 
      temperature: '21-27°C',
      description: 'Fruiting plant, high light requirements'
    },
  ];

  const wavelengthMixture = [
    { wavelength: '450nm', color: 'Blue', wattage: 25, percentage: 35, bgColor: 'bg-blue-500' },
    { wavelength: '660nm', color: 'Red', wattage: 30, percentage: 45, bgColor: 'bg-red-500' },
    { wavelength: '5000K', color: 'White', wattage: 15, percentage: 20, bgColor: 'bg-gray-100' },
  ];

  const totalWattage = wavelengthMixture.reduce((sum, item) => sum + item.wattage, 0);

  const fertilizerTanks = [
    { name: 'NPK Base', level: 2.5, capacity: 5, color: 'bg-emerald-500', mlPerLiter: 12 },
    { name: 'Cal-Mag', level: 1.8, capacity: 3, color: 'bg-purple-500', mlPerLiter: 8 },
    { name: 'Bloom Boost', level: 3.2, capacity: 5, color: 'bg-pink-500', mlPerLiter: 5 },
  ];

  const waterTank = { level: 7.5, capacity: 10 }; // liters
  const waterPerCycle = 1.5; // liters
  const nextWateringIn = '6h 45m';

  const handleWaterNow = () => {
    setSoilHumidity(Math.min(soilHumidity + 30, 100));
    // In a real app, this would trigger the watering system
    alert('Watering cycle initiated!');
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      setMenuOpen(true);
    } else if (info.offset.x < -100) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-b from-black/20 to-transparent">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex-shrink-0"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        <img src={logo} alt="Cultivaro" className="h-10 sm:h-12" />
        <div className="w-12 flex-shrink-0" /> {/* Spacer for center alignment */}
      </div>

      {/* Main Content - Plant Display */}
      <div className="relative h-full flex items-center justify-center p-8">
        {selectedOption === 'Temperature' ? (
          /* Temperature Control Page */
          <div className="w-full max-w-2xl h-full flex flex-col pt-20 pb-8 px-4 sm:px-0">
            <div className="mb-6">
              <h2 className="text-white mb-2">Temperature Control</h2>
              <p className="text-gray-300 text-sm">Monitor and adjust growing temperature</p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Current Temperature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-red-500/20">
                    <Thermometer className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white">Current Temperature</h3>
                    <p className="text-sm text-gray-400">Adjust to optimal levels</p>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="text-center">
                      <span className="text-white text-7xl">{currentTemperature}</span>
                      <span className="text-gray-400 text-4xl">°C</span>
                    </div>
                  </div>
                </div>

                {/* Temperature Controls */}
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setCurrentTemperature(Math.max(currentTemperature - 1, 10))}
                    className="flex-1 p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl text-white transition-colors"
                  >
                    <span className="text-2xl">-</span>
                  </button>
                  <button
                    onClick={() => setCurrentTemperature(Math.min(currentTemperature + 1, 35))}
                    className="flex-1 p-4 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-white transition-colors"
                  >
                    <span className="text-2xl">+</span>
                  </button>
                </div>

                {/* Temperature Slider */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="10"
                    max="35"
                    value={currentTemperature}
                    onChange={(e) => setCurrentTemperature(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-red-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>10°C</span>
                    <span>35°C</span>
                  </div>
                </div>
              </motion.div>

              {/* Optimal Temperature for Preset */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4">Optimal Temperature</h3>
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Selected Preset:</span>
                    <span className="text-white">{selectedPreset}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Optimal Range:</span>
                    <span className="text-white">
                      {presets.find(p => p.name === selectedPreset)?.temperature || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Temperature Status Indicator */}
                {(() => {
                  const preset = presets.find(p => p.name === selectedPreset);
                  if (!preset) return null;
                  
                  const tempRange = preset.temperature.match(/(\d+)-(\d+)/);
                  if (!tempRange) return null;
                  
                  const minTemp = parseInt(tempRange[1]);
                  const maxTemp = parseInt(tempRange[2]);
                  const isOptimal = currentTemperature >= minTemp && currentTemperature <= maxTemp;
                  const isTooLow = currentTemperature < minTemp;
                  const isTooHigh = currentTemperature > maxTemp;

                  return (
                    <div className={`p-4 rounded-xl ${
                      isOptimal ? 'bg-green-500/20 border border-green-500/30' :
                      isTooLow ? 'bg-blue-500/20 border border-blue-500/30' :
                      'bg-red-500/20 border border-red-500/30'
                    }`}>
                      <p className={`text-center ${
                        isOptimal ? 'text-green-400' :
                        isTooLow ? 'text-blue-400' :
                        'text-red-400'
                      }`}>
                        {isOptimal ? '✓ Temperature is optimal' :
                         isTooLow ? '↓ Temperature is too low' :
                         '↑ Temperature is too high'}
                      </p>
                    </div>
                  );
                })()}
              </motion.div>

              {/* Change Preset */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4 text-base sm:text-lg">Select Preset</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setSelectedPreset(preset.name)}
                      className={`p-2 sm:p-3 rounded-xl transition-all ${
                        selectedPreset === preset.name
                          ? 'bg-white/20 border border-white/30'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <p className="text-white text-xs sm:text-sm leading-tight">{preset.name}</p>
                      <p className="text-gray-400 text-xs mt-1 leading-tight">{preset.temperature}</p>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Temperature Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4 text-base sm:text-lg">24-Hour Statistics</h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
                    <p className="text-gray-400 text-xs sm:text-sm mb-1 leading-tight">Average</p>
                    <p className="text-white text-lg sm:text-2xl">23°C</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
                    <p className="text-gray-400 text-xs sm:text-sm mb-1 leading-tight">Minimum</p>
                    <p className="text-white text-lg sm:text-2xl">20°C</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
                    <p className="text-gray-400 text-xs sm:text-sm mb-1 leading-tight">Maximum</p>
                    <p className="text-white text-lg sm:text-2xl">26°C</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : selectedOption === 'Watering' ? (
          /* Watering Control Page */
          <div className="w-full max-w-2xl h-full flex flex-col pt-20 pb-8 px-4 sm:px-0">
            <div className="mb-6">
              <h2 className="text-white mb-2">Watering System</h2>
              <p className="text-gray-300 text-sm">Monitor water, fertilizer levels, and soil moisture</p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Soil Humidity & Next Watering */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-3 rounded-full bg-cyan-500/20 flex-shrink-0">
                      <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white text-base sm:text-lg">Soil Moisture</h3>
                      <p className="text-xs sm:text-sm text-gray-400 leading-tight">Current humidity level</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white text-2xl sm:text-3xl">{soilHumidity}%</p>
                  </div>
                </div>

                <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${soilHumidity}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-400">Next watering in:</span>
                    <span className="text-xs sm:text-sm text-white">{nextWateringIn}</span>
                  </div>
                  <button
                    onClick={handleWaterNow}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white transition-colors flex items-center gap-2 text-sm"
                  >
                    <Droplets className="w-4 h-4" />
                    Water Now
                  </button>
                </div>
              </motion.div>

              {/* Water Tank */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4 text-base sm:text-lg">Water Tank</h3>
                <div className="flex items-end justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs sm:text-sm mb-1 leading-tight">Current Level</p>
                    <div className="flex items-end gap-2">
                      <span className="text-white text-3xl sm:text-4xl">{waterTank.level}</span>
                      <span className="text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">/ {waterTank.capacity}L</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-gray-400 text-xs sm:text-sm mb-1 leading-tight">Per Cycle</p>
                    <p className="text-white text-xl sm:text-2xl">{waterPerCycle}L</p>
                  </div>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                    style={{ width: `${(waterTank.level / waterTank.capacity) * 100}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {Math.floor(waterTank.level / waterPerCycle)} watering cycles remaining
                </p>
              </motion.div>

              {/* Fertilizer Tanks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4 text-base sm:text-lg">Fertilizer Tanks</h3>
                <div className="space-y-4">
                  {fertilizerTanks.map((tank, index) => (
                    <motion.div
                      key={tank.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white/5 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-white text-sm sm:text-base">{tank.name}</p>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {tank.level}L / {tank.capacity}L
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-white text-sm sm:text-base">{tank.mlPerLiter}ml</p>
                          <p className="text-xs sm:text-sm text-gray-400">per liter</p>
                        </div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${tank.color} transition-all`}
                          style={{ width: `${(tank.level / tank.capacity) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Fertilizer Mixture Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4 text-base sm:text-lg">Mixture per Watering Cycle</h3>
                <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-gray-400 text-xs sm:text-sm">Water Volume:</span>
                    <span className="text-white text-xs sm:text-sm">{waterPerCycle}L</span>
                  </div>
                  {fertilizerTanks.map((tank) => (
                    <div key={tank.name} className="flex items-center justify-between gap-3 py-2 border-t border-white/10">
                      <span className="text-gray-400 text-xs sm:text-sm truncate">{tank.name}:</span>
                      <span className="text-white text-xs sm:text-sm flex-shrink-0">{(tank.mlPerLiter * waterPerCycle).toFixed(1)}ml</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        ) : selectedOption === 'Lighting' ? (
          /* Lighting Control Page */
          <div className="w-full max-w-2xl h-full flex flex-col pt-20 pb-8 px-4 sm:px-0">
            <div className="mb-6">
              <h2 className="text-white mb-2">Lighting Control</h2>
              <p className="text-gray-300 text-sm">Monitor and control your grow light system</p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Current Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-3 rounded-full flex-shrink-0 ${lampOn ? 'bg-yellow-500/20' : 'bg-gray-500/20'}`}>
                      <Sun className={`w-5 h-5 sm:w-6 sm:h-6 ${lampOn ? 'text-yellow-400' : 'text-gray-400'}`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white text-base sm:text-lg">Lamp Status</h3>
                      <p className={`text-xs sm:text-sm leading-tight ${lampOn ? 'text-green-400' : 'text-gray-400'}`}>
                        {lampOn ? 'Currently ON' : 'Currently OFF'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setLampOn(!lampOn)}
                    className={`p-3 rounded-full transition-colors ${
                      lampOn ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <Power className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-400 leading-tight">Time in State</p>
                    </div>
                    <p className="text-white text-sm sm:text-base">8h 23m</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-400 leading-tight">Next Change</p>
                    </div>
                    <p className="text-white text-sm sm:text-base">{lampOn ? '9h 37m' : '6h 15m'}</p>
                  </div>
                </div>
              </motion.div>

              {/* Wattage & Power */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4 text-base sm:text-lg">Total Power Output</h3>
                <div className="flex items-end gap-2">
                  <span className="text-white text-4xl sm:text-5xl">{totalWattage}</span>
                  <span className="text-gray-400 text-xl sm:text-2xl mb-1 sm:mb-2">W</span>
                </div>
              </motion.div>

              {/* Wavelength Mixture */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4 text-base sm:text-lg">Wavelength Mixture</h3>
                
                {/* Spectrum Visualization */}
                <div className="mb-6 h-4 flex rounded-full overflow-hidden">
                  {wavelengthMixture.map((item) => (
                    <div
                      key={item.wavelength}
                      className={`${item.bgColor} transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  {wavelengthMixture.map((item, index) => (
                    <motion.div
                      key={item.wavelength}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white/5 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${item.bgColor} flex-shrink-0`} />
                          <div className="min-w-0">
                            <p className="text-white text-sm sm:text-base leading-tight">{item.color}</p>
                            <p className="text-xs sm:text-sm text-gray-400 leading-tight">{item.wavelength}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-white text-sm sm:text-base leading-tight">{item.wattage}W</p>
                          <p className="text-xs sm:text-sm text-gray-400 leading-tight">{item.percentage}%</p>
                        </div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.bgColor} transition-all`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        ) : selectedOption === 'Ventilation' ? (
          /* Ventilation Control Page */
          <div className="w-full max-w-2xl h-full flex flex-col pt-20 pb-8 px-4 sm:px-0">
            <div className="mb-6">
              <h2 className="text-white mb-2">Ventilation Control</h2>
              <p className="text-gray-300 text-sm">Monitor airflow and air exchange in your grow box</p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Fan Speed Control */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-green-500/20 flex-shrink-0">
                    <Fan className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white text-base sm:text-lg">Fan Speed</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-tight">Adjust ventilation intensity</p>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="text-center">
                      <span className="text-white text-7xl">{fanSpeed}</span>
                      <span className="text-gray-400 text-4xl">%</span>
                    </div>
                  </div>
                </div>

                {/* Fan Speed Slider */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fanSpeed}
                    onChange={(e) => setFanSpeed(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Off</span>
                    <span>Maximum</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <button
                    onClick={() => setFanSpeed(30)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm transition-colors"
                  >
                    Low (30%)
                  </button>
                  <button
                    onClick={() => setFanSpeed(65)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm transition-colors"
                  >
                    Medium (65%)
                  </button>
                  <button
                    onClick={() => setFanSpeed(100)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm transition-colors"
                  >
                    High (100%)
                  </button>
                </div>
              </motion.div>

              {/* Air Volume Movement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4">Air Volume Movement</h3>
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Gauge className="w-5 h-5 text-green-400" />
                      <span className="text-gray-400">Current Airflow</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-white text-5xl">{Math.round(fanSpeed * 1.2)}</span>
                    <span className="text-gray-400 text-2xl mb-2">m³/h</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Total air volume being circulated within the grow box
                  </p>
                </div>
              </motion.div>

              {/* Air Exchange Rate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4">Air Exchange</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-2">Exchange Rate</p>
                    <div className="flex items-end gap-2">
                      <span className="text-white text-3xl">{Math.round(fanSpeed * 0.45)}</span>
                      <span className="text-gray-400 mb-1">times/hour</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-2">Fresh Air Intake</p>
                    <div className="flex items-end gap-2">
                      <span className="text-white text-3xl">{Math.round(fanSpeed * 0.8)}</span>
                      <span className="text-gray-400 mb-1">m³/h</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Complete air replacement every {fanSpeed > 0 ? Math.round(60 / (fanSpeed * 0.45)) : '∞'} minutes
                </p>
              </motion.div>

              {/* Ventilation Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Intake Fan</span>
                    <span className={`${fanSpeed > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                      {fanSpeed > 0 ? 'Active' : 'Standby'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Exhaust Fan</span>
                    <span className={`${fanSpeed > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                      {fanSpeed > 0 ? 'Active' : 'Standby'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Carbon Filter</span>
                    <span className="text-green-400">Good (78%)</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : selectedOption === 'Camera' ? (
          /* Camera Page */
          <div className="w-full max-w-2xl h-full flex flex-col pt-20 pb-8 px-4 sm:px-0">
            <div className="mb-6">
              <h2 className="text-white mb-2">Live Camera Feed</h2>
              <p className="text-gray-300 text-sm">Monitor your plants in real-time</p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Live Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-video bg-black">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1655623454749-0a90b1f514fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm93JTIwYm94JTIwY2FtZXJhJTIwcGxhbnRzfGVufDF8fHx8MTc2NDc2NDA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Live camera feed"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Live indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-sm">LIVE</span>
                  </div>

                  {/* Recording indicator */}
                  {isRecording && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-white text-sm">REC</span>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-lg">
                    <span className="text-white text-sm">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Camera Controls */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => alert('Snapshot saved!')}
                      className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
                    >
                      <Camera className="w-5 h-5" />
                      Take Snapshot
                    </button>
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl text-white transition-colors ${
                        isRecording 
                          ? 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/30' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <Pause className="w-5 h-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Start Recording
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Camera Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4">Camera Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Resolution</span>
                    <span className="text-white">1920x1080</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Frame Rate</span>
                    <span className="text-white">30 FPS</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Night Vision</span>
                    <span className="text-green-400">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Motion Detection</span>
                    <span className="text-gray-400">Disabled</span>
                  </div>
                </div>
              </motion.div>

              {/* Recent Snapshots */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4">Recent Snapshots</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=200&h=150&fit=crop&auto=format`}
                        alt={`Snapshot ${i}`}
                        className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        ) : selectedOption === 'Community' ? (
          /* Community Page */
          <div className="w-full max-w-4xl h-full flex flex-col pt-20 pb-8 px-4 sm:px-0">
            <div className="mb-6">
              <h2 className="text-white mb-2">Community Hub</h2>
              <p className="text-gray-300 text-sm">Connect, share, and trade with other growers</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {['posts', 'presets', 'marketplace'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedCommunityTab(tab)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCommunityTab === tab
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {tab === 'posts' && 'Posts'}
                  {tab === 'presets' && 'Presets'}
                  {tab === 'marketplace' && 'Marketplace'}
                </button>
              ))}
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {selectedCommunityTab === 'posts' ? (
                /* Posts Tab */
                <div className="space-y-4">
                  {/* Create Post */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white">👤</span>
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Share your growing journey..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-white/20"
                          rows={3}
                        />
                        <div className="flex items-center gap-2 mt-3">
                          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors">
                            <Camera className="w-4 h-4" />
                            Photo
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm transition-colors ml-auto">
                            <MessageSquare className="w-4 h-4" />
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Sample Posts */}
                  {[
                    { user: 'GreenThumb87', time: '2h ago', content: 'My tomatoes are thriving! Just hit day 45 of vegetative growth. Using the optimal preset from this community - thank you all! 🍅', likes: 24 },
                    { user: 'HerbMaster', time: '5h ago', content: 'Pro tip: Increase humidity to 65% during early growth stages for better results with basil. Game changer!', likes: 18 },
                    { user: 'UrbanFarmer', time: '1d ago', content: 'Just harvested my first batch of lettuce from the grow box. The taste is incredible! Fresh salads every day now 🥗', likes: 42 },
                  ].map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.1 }}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white">👤</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-white text-sm sm:text-base">{post.user}</span>
                            <span className="text-gray-400 text-xs sm:text-sm">• {post.time}</span>
                          </div>
                          <p className="text-gray-300 text-sm sm:text-base mb-3 break-words">{post.content}</p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                              <span>❤️</span>
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-sm">Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : selectedCommunityTab === 'presets' ? (
                /* Presets Sharing Tab */
                <div className="space-y-4">
                  {/* Upload Preset */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                  >
                    <h3 className="text-white mb-4">Share Your Preset</h3>
                    <button className="w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">Click to upload your custom preset</p>
                    </button>
                  </motion.div>

                  {/* Community Presets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Super Chili Growth', creator: 'SpicyGrower', downloads: 156, rating: 4.8 },
                      { name: 'Hydroponic Lettuce', creator: 'AquaFarm', downloads: 203, rating: 4.9 },
                      { name: 'Perfect Basil', creator: 'ItalianHerbs', downloads: 128, rating: 4.7 },
                      { name: 'Cherry Tomato Pro', creator: 'TomatoKing', downloads: 189, rating: 4.9 },
                    ].map((preset, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.1 }}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-white mb-1 text-sm sm:text-base truncate">{preset.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-400 truncate">by {preset.creator}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-white text-xs sm:text-sm">{preset.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{preset.downloads}</span>
                          </div>
                          <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-xs sm:text-sm transition-colors">
                            Download
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Marketplace Tab */
                <div className="space-y-6">
                  {/* Buy Accessories */}
                  <div>
                    <h3 className="text-white mb-4">Buy Accessories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: 'Premium NPK Fertilizer', price: 24.99, seller: 'GrowSupplies', image: '1' },
                        { name: 'Organic Soil Mix (5L)', price: 15.99, seller: 'EarthyGoods', image: '2' },
                        { name: 'pH Test Kit', price: 12.99, seller: 'GrowSupplies', image: '3' },
                        { name: 'LED Grow Bulb Upgrade', price: 45.99, seller: 'LightTech', image: '4' },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all"
                        >
                          <div className="aspect-video bg-gradient-to-br from-green-900 to-emerald-800" />
                          <div className="p-4">
                            <h4 className="text-white mb-1 text-sm sm:text-base truncate">{item.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-400 mb-3">by {item.seller}</p>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-white text-lg sm:text-xl">${item.price}</span>
                              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-xs sm:text-sm transition-colors flex items-center gap-1 sm:gap-2">
                                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                                Buy
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Sell Produce */}
                  <div>
                    <h3 className="text-white mb-4">Sell Your Produce</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: 'Organic Cherry Tomatoes', price: 8.99, seller: 'You', quantity: '500g', available: true },
                        { name: 'Fresh Basil Bundle', price: 5.99, seller: 'LocalGrower', quantity: '50g', available: true },
                        { name: 'Habanero Peppers', price: 12.99, seller: 'ChiliMaster', quantity: '250g', available: false },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
                        >
                          <div className="flex items-start justify-between mb-3 gap-2">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-white mb-1 text-sm sm:text-base truncate">{item.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-400">by {item.seller}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{item.quantity}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-xs flex-shrink-0 ${
                              item.available 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {item.available ? 'Available' : 'Sold Out'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white text-lg sm:text-xl">${item.price}</span>
                            {item.seller === 'You' ? (
                              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-xs sm:text-sm transition-colors">
                                Edit Listing
                              </button>
                            ) : (
                              <button 
                                disabled={!item.available}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-white text-xs sm:text-sm transition-colors ${
                                  item.available 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-gray-600 cursor-not-allowed'
                                }`}
                              >
                                {item.available ? 'Buy Now' : 'Sold Out'}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Add New Listing Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="w-full mt-4 p-4 bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 rounded-2xl text-white transition-colors"
                    >
                      + Add New Listing
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : selectedOption === 'Settings' ? (
          /* Settings Page */
          <div className="w-full max-w-2xl h-full flex flex-col pt-20 pb-8 px-4 sm:px-0">
            <div className="mb-6">
              <h2 className="text-white mb-2">Settings</h2>
              <p className="text-gray-300 text-sm">Configure your app and grow box preferences</p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* App Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-blue-500/20 flex-shrink-0">
                    <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white text-base sm:text-lg">App Settings</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">Customize your experience</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base truncate">Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base truncate">Sound Alerts</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Monitor className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base truncate">Dark Mode</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-white text-sm sm:text-base truncate">Language</span>
                    </div>
                    <select className="bg-white/10 border border-white/20 rounded-lg px-2 sm:px-3 py-1 text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 flex-shrink-0">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Box Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-green-500/20 flex-shrink-0">
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white text-base sm:text-lg">Grow Box Settings</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">Hardware configuration</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base truncate">Connection Status</span>
                      </div>
                      <span className="text-green-400 text-xs sm:text-sm flex-shrink-0">Connected</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm ml-6 sm:ml-8 break-all">Box ID: CUL-GB-2024-4782</p>
                  </div>

                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <Database className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base">Firmware Version</span>
                      </div>
                      <span className="text-gray-400 text-xs sm:text-sm flex-shrink-0">v2.4.1</span>
                    </div>
                    <button className="ml-6 sm:ml-8 text-blue-400 text-xs sm:text-sm hover:text-blue-300 transition-colors">
                      Check for updates
                    </button>
                  </div>

                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base truncate">Auto-Backup Data</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Connected Devices */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-purple-500/20 flex-shrink-0">
                      <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white text-base sm:text-lg">Connected Devices</h3>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">Manage device access</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-xs sm:text-sm transition-colors flex-shrink-0">
                    + Add Device
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'iPhone 14 Pro', type: 'iOS', lastActive: 'Active now', isCurrentDevice: true },
                    { name: 'iPad Air', type: 'iOS', lastActive: '2 hours ago', isCurrentDevice: false },
                    { name: 'Samsung Galaxy S23', type: 'Android', lastActive: '1 day ago', isCurrentDevice: false },
                  ].map((device, index) => (
                    <div key={index} className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-white text-sm sm:text-base truncate">{device.name}</p>
                            {device.isCurrentDevice && (
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded flex-shrink-0 whitespace-nowrap">
                                This device
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">{device.lastActive}</p>
                        </div>
                      </div>
                      {!device.isCurrentDevice && (
                        <button className="text-red-400 hover:text-red-300 text-xs sm:text-sm flex-shrink-0 ml-2">
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Data & Privacy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-yellow-500/20 flex-shrink-0">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white text-base sm:text-lg">Data & Privacy</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">Manage your data</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full text-left p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                    <p className="text-white text-sm sm:text-base leading-relaxed">Export Growth Data</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">Download all your growing history</p>
                  </button>

                  <button className="w-full text-left p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                    <p className="text-white text-sm sm:text-base leading-relaxed">Clear Cache</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">Free up storage space</p>
                  </button>

                  <button className="w-full text-left p-3 sm:p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-colors">
                    <p className="text-red-400 text-sm sm:text-base leading-relaxed">Delete All Data</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">Permanently remove all information</p>
                  </button>
                </div>
              </motion.div>

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-4 text-base sm:text-lg">About</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400 text-xs sm:text-sm">App Version</span>
                    <span className="text-white text-xs sm:text-sm">1.2.0</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400 text-xs sm:text-sm">Build</span>
                    <span className="text-white text-xs sm:text-sm">2024.12.03</span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-gray-400 text-xs leading-relaxed">
                      © 2024 Cultivaro. All rights reserved.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : selectedOption === 'Presets' ? (
          /* Presets Page */
          <div className="w-full max-w-4xl h-full flex flex-col pt-20 pb-8 px-4 sm:px-0">
            <div className="mb-6">
              <h2 className="text-white mb-2">Plant Growing Presets</h2>
              <p className="text-gray-300 text-sm">Select a preset to automatically configure optimal growing conditions</p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presets.map((preset, index) => (
                  <motion.button
                    key={preset.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 text-left hover:bg-white/15 transition-all hover:scale-105"
                  >
                    <h3 className="text-white mb-2 text-base sm:text-lg">{preset.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed">{preset.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-300">Light:</span>
                        <span className="text-xs sm:text-sm text-white ml-auto">{preset.light}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-300">Humidity:</span>
                        <span className="text-xs sm:text-sm text-white ml-auto">{preset.humidity}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Thermometer className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-300">Temperature:</span>
                        <span className="text-xs sm:text-sm text-white ml-auto">{preset.temperature}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Original Plant Display */
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative w-full max-w-md aspect-square"
          >
            {/* Plant Container */}
            <div className="relative w-full h-full rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800"
                alt="Growing plant"
                className="w-full h-full object-cover"
              />
              
              {/* Status Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-3">
                  <div>
                    <p className="text-xs sm:text-sm opacity-80">Day 42</p>
                    <p className="text-sm sm:text-base">Vegetative Stage</p>
                  </div>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                      <span className="text-xs sm:text-sm">18h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      <span className="text-xs sm:text-sm">24°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      <span className="text-xs sm:text-sm">65%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Swipe Indicator */}
            {!menuOpen && (
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -left-2 top-1/2 -translate-y-1/2 text-white/40"
              >
                <div className="flex gap-1">
                  <div className="w-1 h-8 bg-white/40 rounded-full" />
                  <div className="w-1 h-8 bg-white/30 rounded-full" />
                  <div className="w-1 h-8 bg-white/20 rounded-full" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Drag-out Menu */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: menuOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="absolute top-0 left-0 bottom-0 w-72 sm:w-80 bg-gray-900/95 backdrop-blur-md border-r border-white/10 z-30 overflow-y-auto"
      >
        <div className="p-4 sm:p-6">
          <div className="mb-6 mt-16 sm:mt-16 sm:mb-8">
            <h2 className="text-white mb-1 text-lg sm:text-xl">Control Panel</h2>
            <p className="text-xs sm:text-sm text-gray-400">Manage your grow box</p>
          </div>

          <div className="space-y-2 pb-20">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setSelectedOption(item.label);
                  setMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-colors ${
                  selectedOption === item.label
                    ? 'bg-white/10 border border-white/20'
                    : 'hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color} flex-shrink-0`} />
                <span className="text-white text-sm sm:text-base">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Overlay to close menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-black/50 z-20"
        />
      )}
    </div>
  );
}