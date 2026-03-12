import { useState } from 'react'
import { MapPin, Thermometer, Droplets, Wind, CloudRain, Activity, Calendar, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts'

const DashboardMeteorologistStations = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [selectedStation, setSelectedStation] = useState(0)

  // Station details
  const stations = [
    {
      id: 1,
      name: 'Cerro Alto',
      location: 'San Cristóbal Coastal Area',
      elevation: '10m',
      coordinates: '0.8971°S, 89.6079°W',
      status: 'active',
      uptime: '99.8%',
      installDate: 'January 2015',
      lastMaintenance: 'February 2026',
      sensors: [
        { name: 'Temperature Sensor', status: 'active', accuracy: '±0.2°C' },
        { name: 'Humidity Sensor', status: 'active', accuracy: '±2%' },
        { name: 'Wind Anemometer', status: 'active', accuracy: '±0.5 km/h' },
        { name: 'Rain Gauge', status: 'active', accuracy: '±0.1mm' },
        { name: 'Barometer', status: 'active', accuracy: '±0.5 hPa' },
        { name: 'Pyranometer', status: 'warning', accuracy: '±5%' },
      ],
      currentData: {
        temp: 24.5,
        humidity: 78,
        windSpeed: 12,
        rainfall: 0,
        pressure: 1013.2,
        solar: 850,
      },
      historicalAvg: {
        temp: 23.8,
        humidity: 75,
        windSpeed: 10,
        rainfall: 2.5,
        pressure: 1012.8,
        solar: 800,
      },
    },
    {
      id: 2,
      name: 'Merceditas',
      location: 'Mid-Elevation Forest Zone',
      elevation: '250m',
      coordinates: '0.8856°S, 89.5947°W',
      status: 'active',
      uptime: '98.5%',
      installDate: 'March 2015',
      lastMaintenance: 'January 2026',
      sensors: [
        { name: 'Temperature Sensor', status: 'active', accuracy: '±0.2°C' },
        { name: 'Humidity Sensor', status: 'active', accuracy: '±2%' },
        { name: 'Wind Anemometer', status: 'active', accuracy: '±0.5 km/h' },
        { name: 'Rain Gauge', status: 'active', accuracy: '±0.1mm' },
        { name: 'Barometer', status: 'active', accuracy: '±0.5 hPa' },
        { name: 'Pyranometer', status: 'active', accuracy: '±5%' },
      ],
      currentData: {
        temp: 21.3,
        humidity: 82,
        windSpeed: 15,
        rainfall: 2.3,
        pressure: 1010.5,
        solar: 720,
      },
      historicalAvg: {
        temp: 20.8,
        humidity: 80,
        windSpeed: 14,
        rainfall: 5.8,
        pressure: 1010.2,
        solar: 700,
      },
    },
    {
      id: 3,
      name: 'El Junco (JUN)',
      location: 'Highland Plateau',
      elevation: '650m',
      coordinates: '0.8734°S, 89.5823°W',
      status: 'active',
      uptime: '99.2%',
      installDate: 'June 2015',
      lastMaintenance: 'March 2026',
      sensors: [
        { name: 'Temperature Sensor', status: 'active', accuracy: '±0.2°C' },
        { name: 'Humidity Sensor', status: 'active', accuracy: '±2%' },
        { name: 'Wind Anemometer', status: 'active', accuracy: '±0.5 km/h' },
        { name: 'Rain Gauge', status: 'active', accuracy: '±0.1mm' },
        { name: 'Barometer', status: 'active', accuracy: '±0.5 hPa' },
        { name: 'Pyranometer', status: 'error', accuracy: '±5%' },
      ],
      currentData: {
        temp: 18.7,
        humidity: 88,
        windSpeed: 18,
        rainfall: 5.1,
        pressure: 1007.8,
        solar: 450,
      },
      historicalAvg: {
        temp: 18.2,
        humidity: 85,
        windSpeed: 16,
        rainfall: 8.2,
        pressure: 1007.5,
        solar: 600,
      },
    },
    {
      id: 4,
      name: 'El Mirador',
      location: 'Summit Peak',
      elevation: '850m',
      coordinates: '0.8612°S, 89.5701°W',
      status: 'warning',
      uptime: '94.8%',
      installDate: 'September 2015',
      lastMaintenance: 'December 2025',
      sensors: [
        { name: 'Temperature Sensor', status: 'active', accuracy: '±0.2°C' },
        { name: 'Humidity Sensor', status: 'active', accuracy: '±2%' },
        { name: 'Wind Anemometer', status: 'warning', accuracy: '±0.5 km/h' },
        { name: 'Rain Gauge', status: 'active', accuracy: '±0.1mm' },
        { name: 'Barometer', status: 'active', accuracy: '±0.5 hPa' },
        { name: 'Pyranometer', status: 'error', accuracy: '±5%' },
      ],
      currentData: {
        temp: 14.2,
        humidity: 95,
        windSpeed: 24,
        rainfall: 12.4,
        pressure: 1002.1,
        solar: 300,
      },
      historicalAvg: {
        temp: 13.8,
        humidity: 92,
        windSpeed: 22,
        rainfall: 15.5,
        pressure: 1002.0,
        solar: 450,
      },
    },
  ]

  const station = stations[selectedStation]

  // Radar chart data comparing current vs historical average
  const comparisonData = [
    {
      metric: 'Temperature',
      current: (station.currentData.temp / 30) * 100,
      average: (station.historicalAvg.temp / 30) * 100,
    },
    {
      metric: 'Humidity',
      current: station.currentData.humidity,
      average: station.historicalAvg.humidity,
    },
    {
      metric: 'Wind',
      current: (station.currentData.windSpeed / 30) * 100,
      average: (station.historicalAvg.windSpeed / 30) * 100,
    },
    {
      metric: 'Rainfall',
      current: (station.currentData.rainfall / 20) * 100,
      average: (station.historicalAvg.rainfall / 20) * 100,
    },
    {
      metric: 'Pressure',
      current: ((station.currentData.pressure - 980) / 50) * 100,
      average: ((station.historicalAvg.pressure - 980) / 50) * 100,
    },
  ]

  // 7-day data history
  const weekData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    temp: station.historicalAvg.temp + (Math.random() - 0.5) * 4,
    rainfall: station.historicalAvg.rainfall + (Math.random() - 0.5) * 3,
  }))

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 dark:text-green-400'
      case 'warning': return 'text-yellow-600 dark:text-yellow-400'
      case 'error': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      case 'warning': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'error': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'error': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <DashboardLayout 
      userRole="Meteorologist"
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      language={language}
      toggleLanguage={toggleLanguage}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-1">
            Weather Stations
          </h2>
          <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
            Detailed information and sensor status for all monitoring stations
          </p>
        </div>

        {/* Station Selector */}
        <div className="grid md:grid-cols-4 gap-4">
          {stations.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSelectedStation(idx)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedStation === idx
                  ? 'border-nimbus-blue bg-nimbus-blue/10 dark:bg-nimbus-blue/20'
                  : 'border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/10 hover:border-nimbus-blue/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <MapPin className="w-5 h-5 text-nimbus-blue" />
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusBadge(s.status)}`}>
                  {s.status}
                </span>
              </div>
              <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">{s.name}</h3>
              <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60 mt-1">{s.elevation}</p>
            </button>
          ))}
        </div>

        {/* Station Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Info Card */}
          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
              Station Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-nimbus-cream dark:border-nimbus-blue/20">
                <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Location:</span>
                <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{station.location}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-nimbus-cream dark:border-nimbus-blue/20">
                <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Elevation:</span>
                <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{station.elevation}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-nimbus-cream dark:border-nimbus-blue/20">
                <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Coordinates:</span>
                <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{station.coordinates}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-nimbus-cream dark:border-nimbus-blue/20">
                <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Uptime:</span>
                <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{station.uptime}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-nimbus-cream dark:border-nimbus-blue/20">
                <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Installed:</span>
                <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{station.installDate}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Last Maintenance:</span>
                <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{station.lastMaintenance}</span>
              </div>
            </div>
          </div>

          {/* Current vs Average Comparison */}
          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
              Current vs Historical Average
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={comparisonData}>
                <PolarGrid stroke="#f1eee8" />
                <PolarAngleAxis dataKey="metric" stroke="#083559" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#083559" />
                <Radar name="Current" dataKey="current" stroke="#083559" fill="#083559" fillOpacity={0.6} />
                <Radar name="Average" dataKey="average" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sensor Status */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            Sensor Status
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {station.sensors.map((sensor, idx) => (
              <div
                key={idx}
                className="p-4 bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-nimbus-dark dark:text-nimbus-light">{sensor.name}</h4>
                  <span className={getStatusColor(sensor.status)}>
                    {getStatusIcon(sensor.status)}
                  </span>
                </div>
                <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">
                  Accuracy: {sensor.accuracy}
                </p>
                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-bold ${getStatusBadge(sensor.status)}`}>
                  {sensor.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Trend */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
            <Calendar className="w-6 h-6" />
            <span>7-Day Trend</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1eee8" />
              <XAxis dataKey="day" stroke="#083559" />
              <YAxis yAxisId="left" stroke="#083559" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#083559" label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#083559" strokeWidth={2} name="Temperature (°C)" />
              <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#4d6e91" strokeWidth={2} name="Rainfall (mm)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardMeteorologistStations
