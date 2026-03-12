import { useState, useEffect } from 'react'
import { Activity, Thermometer, Droplets, Wind, CloudRain, Eye, RefreshCw } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const DashboardMeteorologistLiveData = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date())
      }, 30000) // Update every 30 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  // Real-time data streams
  const stations = [
    { id: 1, name: 'El Junco (JUN)', elevation: '650m' },
    { id: 2, name: 'Cerro Alto', elevation: '10m' },
    { id: 3, name: 'Merceditas', elevation: '250m' },
    { id: 4, name: 'El Mirador', elevation: '850m' },
  ]

  // Generate real-time data for last 2 hours (120 points = every minute)
  const generateRealtimeData = () => {
    return Array.from({ length: 120 }, (_, i) => {
      const minutesAgo = 120 - i
      const hour = new Date(Date.now() - minutesAgo * 60000)
      return {
        time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        junco_temp: 18 + Math.sin(i / 10) * 1.5 + Math.random() * 0.5,
        cerroAlto_temp: 24 + Math.sin(i / 10) * 2 + Math.random() * 0.5,
        merceditas_temp: 21 + Math.sin(i / 10) * 1.5 + Math.random() * 0.5,
        mirador_temp: 14 + Math.sin(i / 10) * 1 + Math.random() * 0.5,
        junco_rain: Math.max(0, Math.sin(i / 20) * 8 + Math.random() * 3),
        cerroAlto_rain: Math.max(0, Math.sin(i / 20) * 5 + Math.random() * 2),
        merceditas_rain: Math.max(0, Math.sin(i / 20) * 8 + Math.random() * 3),
        mirador_rain: Math.max(0, Math.sin(i / 20) * 15 + Math.random() * 5),
      }
    })
  }

  const [realtimeData, setRealtimeData] = useState(generateRealtimeData())

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setRealtimeData(generateRealtimeData())
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  // Current readings
  const currentReadings = [
    {
      station: 'El Junco (JUN)',
      metrics: [
        { icon: Thermometer, label: 'Temperature', value: '18.2°C', color: 'text-red-500' },
        { icon: Droplets, label: 'Humidity', value: '85%', color: 'text-blue-500' },
        { icon: Wind, label: 'Wind Speed', value: '14 km/h', color: 'text-green-500' },
        { icon: CloudRain, label: 'Rainfall', value: '0.5 mm/h', color: 'text-purple-500' },
        { icon: Eye, label: 'Visibility', value: '8 km', color: 'text-orange-500' },
        { icon: Activity, label: 'Pressure', value: '1008 hPa', color: 'text-pink-500' },
      ],
    },
    {
      station: 'Cerro Alto',
      metrics: [
        { icon: Thermometer, label: 'Temperature', value: '24.5°C', color: 'text-red-500' },
        { icon: Droplets, label: 'Humidity', value: '78%', color: 'text-blue-500' },
        { icon: Wind, label: 'Wind Speed', value: '12 km/h', color: 'text-green-500' },
        { icon: CloudRain, label: 'Rainfall', value: '0 mm/h', color: 'text-purple-500' },
        { icon: Eye, label: 'Visibility', value: '10 km', color: 'text-orange-500' },
        { icon: Activity, label: 'Pressure', value: '1013 hPa', color: 'text-pink-500' },
      ],
    },
    {
      station: 'Merceditas',
      metrics: [
        { icon: Thermometer, label: 'Temperature', value: '21.3°C', color: 'text-red-500' },
        { icon: Droplets, label: 'Humidity', value: '82%', color: 'text-blue-500' },
        { icon: Wind, label: 'Wind Speed', value: '15 km/h', color: 'text-green-500' },
        { icon: CloudRain, label: 'Rainfall', value: '0.2 mm/h', color: 'text-purple-500' },
        { icon: Eye, label: 'Visibility', value: '8 km', color: 'text-orange-500' },
        { icon: Activity, label: 'Pressure', value: '1010 hPa', color: 'text-pink-500' },
      ],
    },
    {
      station: 'El Mirador',
      metrics: [
        { icon: Thermometer, label: 'Temperature', value: '14.2°C', color: 'text-red-500' },
        { icon: Droplets, label: 'Humidity', value: '92%', color: 'text-blue-500' },
        { icon: Wind, label: 'Wind Speed', value: '18 km/h', color: 'text-green-500' },
        { icon: CloudRain, label: 'Rainfall', value: '1.8 mm/h', color: 'text-purple-500' },
        { icon: Eye, label: 'Visibility', value: '5 km', color: 'text-orange-500' },
        { icon: Activity, label: 'Pressure', value: '1002 hPa', color: 'text-pink-500' },
      ],
    },
  ]

  return (
    <DashboardLayout 
      userRole="Meteorologist"
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      language={language}
      toggleLanguage={toggleLanguage}
    >
      <div className="space-y-8">
        {/* Header with Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-1">
              Live Weather Data
            </h2>
            <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
              Real-time streaming data from all stations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">Auto-refresh</span>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  autoRefresh ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    autoRefresh ? 'translate-x-6' : ''
                  }`}
                ></span>
              </button>
            </div>
            <button
              onClick={() => {
                setRealtimeData(generateRealtimeData())
                setLastUpdate(new Date())
              }}
              className="flex items-center space-x-2 bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-4 py-2 rounded-lg font-bold transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Last Update Time */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Last updated:</strong> {lastUpdate.toLocaleString()}
            {autoRefresh && ' • Updates every 30 seconds'}
          </p>
        </div>

        {/* Real-time Temperature Chart */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
            <Thermometer className="w-6 h-6" />
            <span>Real-Time Temperature Stream</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={realtimeData.slice(-60)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1eee8" />
              <XAxis dataKey="time" stroke="#083559" interval={9} />
              <YAxis stroke="#083559" label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="junco_temp" stroke="#2196F3" name="El Junco (TNN)" dot={false} strokeWidth={3} />
              <Line type="monotone" dataKey="cerroAlto_temp" stroke="#083559" name="Cerro Alto" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="merceditas_temp" stroke="#4d6e91" name="Merceditas" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="mirador_temp" stroke="#f59e0b" name="El Mirador" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Real-time Precipitation Chart */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
            <CloudRain className="w-6 h-6" />
            <span>Real-Time Precipitation Stream</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={realtimeData.slice(-60)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1eee8" />
              <XAxis dataKey="time" stroke="#083559" interval={9} />
              <YAxis stroke="#083559" label={{ value: 'mm/h', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="junco_rain" stackId="1" stroke="#2196F3" fill="#2196F3" fillOpacity={0.6} name="El Junco" />
              <Area type="monotone" dataKey="cerroAlto_rain" stackId="1" stroke="#083559" fill="#083559" fillOpacity={0.6} name="Cerro Alto" />
              <Area type="monotone" dataKey="merceditas_rain" stackId="1" stroke="#4d6e91" fill="#4d6e91" fillOpacity={0.6} name="Merceditas" />
              <Area type="monotone" dataKey="mirador_rain" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="El Mirador" />
              <Area type="monotone" dataKey="cumbre_rain" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Cumbre" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Current Readings Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">Current Readings</h3>
          {currentReadings.map((station, stationIdx) => (
            <div
              key={stationIdx}
              className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20"
            >
              <h4 className="text-lg font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
                {station.station}
              </h4>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {station.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-lg"
                  >
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    <div>
                      <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                        {metric.label}
                      </p>
                      <p className="font-bold text-nimbus-dark dark:text-nimbus-light">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardMeteorologistLiveData
