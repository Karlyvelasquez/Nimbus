import { useState } from 'react'
import { TrendingUp, MapPin, Clock, AlertTriangle, Activity, BarChart2 } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts'

const DashboardMLExpertAnalytics = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [selectedHorizon, setSelectedHorizon] = useState('all')
  const [selectedStation, setSelectedStation] = useState('all')

  // Datos de series temporales
  const timeSeriesData = [
    { time: '00:00', actual: 5.2, predicted: 4.8, station: 'Costa' },
    { time: '03:00', actual: 8.1, predicted: 8.5, station: 'Costa' },
    { time: '06:00', actual: 12.4, predicted: 11.8, station: 'Costa' },
    { time: '09:00', actual: 15.3, predicted: 15.9, station: 'Costa' },
    { time: '12:00', actual: 18.7, predicted: 18.2, station: 'Costa' },
    { time: '15:00', actual: 22.1, predicted: 21.8, station: 'Costa' },
    { time: '18:00', actual: 19.5, predicted: 20.1, station: 'Costa' },
    { time: '21:00', actual: 14.2, predicted: 13.8, station: 'Costa' },
  ]

  // Performance por horizonte temporal
  const horizonPerformance = [
    { horizon: '+1h', accuracy: 0.94, f1: 0.93, mae: 1.2 },
    { horizon: '+3h', accuracy: 0.89, f1: 0.88, mae: 2.8 },
    { horizon: '+6h', accuracy: 0.81, f1: 0.80, mae: 4.5 },
  ]

  // Distribución de errores
  const errorDistribution = [
    { range: '0-2mm', count: 450, percentage: 45 },
    { range: '2-5mm', count: 280, percentage: 28 },
    { range: '5-10mm', count: 150, percentage: 15 },
    { range: '10-20mm', count: 80, percentage: 8 },
    { range: '>20mm', count: 40, percentage: 4 },
  ]

  // Performance por estación
  const stationPerformance = [
    { station: 'Costa', accuracy: 0.92, f1: 0.91, samples: 2800 },
    { station: 'Medio', accuracy: 0.89, f1: 0.88, samples: 2650 },
    { station: 'Alto', accuracy: 0.87, f1: 0.86, samples: 2450 },
    { station: 'Cumbre', accuracy: 0.84, f1: 0.83, samples: 2200 },
  ]

  // Feature importance temporal
  const featureImportance = [
    { feature: 'Temperatura', importance: 0.28, trend: '+5%' },
    { feature: 'Humedad', importance: 0.24, trend: '+2%' },
    { feature: 'Presión', importance: 0.21, trend: '-1%' },
    { feature: 'Viento', importance: 0.15, trend: '+3%' },
    { feature: 'Estacionalidad', importance: 0.12, trend: '0%' },
  ]

  // Datos de scatter para error analysis
  const errorScatter = [
    { actual: 5, predicted: 4.5, error: 0.5 },
    { actual: 10, predicted: 11, error: 1 },
    { actual: 15, predicted: 14.8, error: 0.2 },
    { actual: 20, predicted: 21.5, error: 1.5 },
    { actual: 25, predicted: 24, error: 1 },
    { actual: 30, predicted: 31, error: 1 },
    { actual: 35, predicted: 34.5, error: 0.5 },
    { actual: 40, predicted: 39, error: 1 },
  ]

  const getErrorColor = (value) => {
    if (value > 40) return '#dc2626'
    if (value > 30) return '#ea580c'
    if (value > 20) return '#f59e0b'
    if (value > 10) return '#10b981'
    return '#083559'
  }

  return (
    <DashboardLayout 
      userRole="ML Expert"
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      language={language}
      toggleLanguage={toggleLanguage}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
            Advanced Analytics
          </h2>
          <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
            Deep dive into model performance and prediction patterns
          </p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
              Prediction Horizon
            </label>
            <select
              value={selectedHorizon}
              onChange={(e) => setSelectedHorizon(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
            >
              <option value="all">All Horizons</option>
              <option value="1h">+1 Hour</option>
              <option value="3h">+3 Hours</option>
              <option value="6h">+6 Hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
              Weather Station
            </label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
            >
              <option value="all">All Stations</option>
              <option value="costa">Costa</option>
              <option value="medio">Nivel Medio</option>
              <option value="alto">Nivel Alto</option>
              <option value="cumbre">Cumbre</option>
            </select>
          </div>
        </div>

        {/* Time Series Analysis */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light flex items-center space-x-2">
                <Activity className="w-6 h-6" />
                <span>Prediction vs Reality Timeline</span>
              </h3>
              <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60 mt-1">
                Last 24 hours - Costa Station
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#083559" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#083559" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4d6e91" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4d6e91" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1eee8" />
              <XAxis dataKey="time" stroke="#083559" />
              <YAxis stroke="#083559" label={{ value: 'Precipitation (mm)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="actual" stroke="#083559" fillOpacity={1} fill="url(#colorActual)" name="Actual" />
              <Area type="monotone" dataKey="predicted" stroke="#4d6e91" fillOpacity={1} fill="url(#colorPredicted)" name="Predicted" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Horizon Performance Grid */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
            <Clock className="w-6 h-6" />
            <span>Performance by Prediction Horizon</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {horizonPerformance.map((horizon, index) => (
              <div key={index} className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
                <h4 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">{horizon.horizon}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Accuracy</span>
                    <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-2">
                    <div className="bg-nimbus-blue h-2 rounded-full" style={{ width: `${horizon.accuracy * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">F1 Score</span>
                    <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.f1 * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">MAE</span>
                    <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{horizon.mae}mm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Distribution & Station Performance */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Error Distribution */}
          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6" />
              <span>Error Distribution</span>
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={errorDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1eee8" />
                <XAxis dataKey="range" stroke="#083559" />
                <YAxis stroke="#083559" />
                <Tooltip />
                <Bar dataKey="count" name="Predictions">
                  {errorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getErrorColor(entry.count)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Station Performance */}
          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
              <MapPin className="w-6 h-6" />
              <span>Performance by Station</span>
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stationPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1eee8" />
                <XAxis type="number" domain={[0, 1]} stroke="#083559" />
                <YAxis type="category" dataKey="station" stroke="#083559" />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" fill="#083559" name="Accuracy" />
                <Bar dataKey="f1" fill="#4d6e91" name="F1 Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance Trend */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
            <BarChart2 className="w-6 h-6" />
            <span>Feature Importance Evolution</span>
          </h3>
          <div className="space-y-4">
            {featureImportance.map((feature, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{feature.feature}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">{(feature.importance * 100).toFixed(0)}%</span>
                    <span className={`text-sm font-bold ${feature.trend.startsWith('+') ? 'text-green-600' : feature.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                      {feature.trend}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-nimbus-blue to-nimbus-dark h-3 rounded-full transition-all duration-500"
                    style={{ width: `${feature.importance * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction Error Scatter */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6" />
            <span>Actual vs Predicted Correlation</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1eee8" />
              <XAxis 
                type="number" 
                dataKey="actual" 
                name="Actual" 
                stroke="#083559"
                label={{ value: 'Actual Precipitation (mm)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                type="number" 
                dataKey="predicted" 
                name="Predicted" 
                stroke="#083559"
                label={{ value: 'Predicted Precipitation (mm)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Predictions" data={errorScatter} fill="#083559" />
              <Line type="linear" dataKey="predicted" stroke="#4d6e91" strokeWidth={2} dot={false} />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60 text-center mt-4">
            Points closer to the diagonal line indicate better prediction accuracy
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardMLExpertAnalytics
