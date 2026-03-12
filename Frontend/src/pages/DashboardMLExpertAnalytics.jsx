import { useState } from 'react'
import { TrendingUp, MapPin, Clock, AlertTriangle, Activity, BarChart2 } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts'

const DashboardMLExpertAnalytics = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [selectedHorizon, setSelectedHorizon] = useState('1h')
  const [selectedStation, setSelectedStation] = useState('JUN')
  const [selectedModel, setSelectedModel] = useState('tnn')

  // Datos de series temporales - TNN (Clasificación)
  const timeSeriesDataTNN = [
    { time: '00:00', actual: 0, predicted: 0 },
    { time: '03:00', actual: 0, predicted: 0 },
    { time: '06:00', actual: 1, predicted: 0 },
    { time: '09:00', actual: 1, predicted: 1 },
    { time: '12:00', actual: 2, predicted: 2 },
    { time: '15:00', actual: 2, predicted: 2 },
    { time: '18:00', actual: 1, predicted: 2 },
    { time: '21:00', actual: 1, predicted: 1 },
  ]

  // Datos de series temporales - GRU (Regresión)
  const timeSeriesDataGRU = [
    { time: '00:00', actual: 0.2, predicted: 0.1 },
    { time: '03:00', actual: 0.3, predicted: 0.4 },
    { time: '06:00', actual: 0.5, predicted: 0.6 },
    { time: '09:00', actual: 1.2, predicted: 1.0 },
    { time: '12:00', actual: 3.5, predicted: 3.2 },
    { time: '15:00', actual: 5.8, predicted: 5.5 },
    { time: '18:00', actual: 4.2, predicted: 4.5 },
    { time: '21:00', actual: 1.8, predicted: 1.6 },
  ]

  // Performance por horizonte temporal - RNN
  const horizonPerformanceRNN = [
    { horizon: '+1h', accuracy: 0.700, f1_macro: 0.480, f1_weighted: 0.690 },
    { horizon: '+3h', accuracy: 0.581, f1_macro: 0.412, f1_weighted: 0.625 },
    { horizon: '+6h', accuracy: 0.603, f1_macro: 0.395, f1_weighted: 0.642 },
  ]

  // Performance por horizonte temporal - LSTM
  const horizonPerformanceLSTM = [
    { horizon: '+1h', accuracy: 0.730, f1_macro: 0.510, f1_weighted: 0.720 },
    { horizon: '+3h', accuracy: 0.598, f1_macro: 0.433, f1_weighted: 0.647 },
    { horizon: '+6h', accuracy: 0.621, f1_macro: 0.411, f1_weighted: 0.655 },
  ]

  // Performance por horizonte temporal - LNN
  const horizonPerformanceLNN = [
    { horizon: '+1h', accuracy: 0.740, f1_macro: 0.520, f1_weighted: 0.740 },
    { horizon: '+3h', accuracy: 0.605, f1_macro: 0.442, f1_weighted: 0.652 },
    { horizon: '+6h', accuracy: 0.628, f1_macro: 0.418, f1_weighted: 0.661 },
  ]

  // Performance por horizonte temporal - TNN
  const horizonPerformanceTNN = [
    { horizon: '+1h', accuracy: 0.744, f1_macro: 0.538, f1_weighted: 0.757 },
    { horizon: '+3h', accuracy: 0.617, f1_macro: 0.455, f1_weighted: 0.661 },
    { horizon: '+6h', accuracy: 0.638, f1_macro: 0.430, f1_weighted: 0.669 },
  ]

  // Performance por horizonte temporal - GRU
  const horizonPerformanceGRU = [
    { horizon: '+1h', rmse: 1.0234, mae: 0.6789, r2: 0.8756 },
    { horizon: '+3h', rmse: 1.7821, mae: 1.2456, r2: 0.7923 },
    { horizon: '+6h', rmse: 2.8934, mae: 2.1234, r2: 0.7012 },
  ]

  // Distribución de errores - GRU
  const errorDistribution = [
    { range: '0-0.5mm', count: 245, percentage: 49 },
    { range: '0.5-1mm', count: 120, percentage: 24 },
    { range: '1-2mm', count: 75, percentage: 15 },
    { range: '2-3mm', count: 40, percentage: 8 },
    { range: '>3mm', count: 20, percentage: 4 },
  ]

  // Performance por estación
  const stationPerformance = [
    { station: 'El Junco (JUN)', rmse: 1.02, mae: 0.68, r2: 0.88, samples: 4850 },
    { station: 'El Mirador (MIR)', rmse: 1.15, mae: 0.75, r2: 0.85, samples: 4620 },
    { station: 'San Cristóbal (SC)', rmse: 1.28, mae: 0.82, r2: 0.82, samples: 4380 },
  ]

  // Feature importance temporal - GRU
  const featureImportance = [
    { feature: 'Rain Lag 1h', importance: 0.28, trend: '+5%' },
    { feature: 'Solar Radiation', importance: 0.19, trend: '+2%' },
    { feature: 'Wind Speed', importance: 0.16, trend: '-1%' },
    { feature: 'Soil Moisture', importance: 0.11, trend: '+3%' },
    { feature: 'Hour (Sin/Cos)', importance: 0.07, trend: '0%' },
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
            {selectedModel === 'tnn' ? 'TNN Model - Advanced Analytics (Production)' : 
             selectedModel === 'rnn' ? 'RNN Model - Advanced Analytics (Baseline)' :
             selectedModel === 'lstm' ? 'LSTM Model - Advanced Analytics (Attention)' :
             selectedModel === 'lnn' ? 'LNN Model - Advanced Analytics (Liquid)' :
             'GRU Model - Advanced Analytics (Regression)'}
          </h2>
          <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
            {selectedModel === 'gru' 
              ? 'Deep dive into GRU precipitation forecasting performance and patterns'
              : 'Deep dive into precipitation classification performance and patterns'}
          </p>
        </div>

        {/* Model Selector */}
        <div className="grid md:grid-cols-5 gap-4">
          <button
            onClick={() => setSelectedModel('tnn')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedModel === 'tnn'
                ? 'border-nimbus-blue bg-nimbus-blue/20 dark:border-nimbus-cream dark:bg-nimbus-cream/20'
                : 'border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
            }`}
          >
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
              TNN
            </h3>
            <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">
              Production • 3 Classes
            </p>
          </button>
          <button
            onClick={() => setSelectedModel('rnn')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedModel === 'rnn'
                ? 'border-nimbus-blue bg-nimbus-blue/20 dark:border-nimbus-cream dark:bg-nimbus-cream/20'
                : 'border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
            }`}
          >
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
              RNN
            </h3>
            <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">
              Baseline • 3 Classes
            </p>
          </button>
          <button
            onClick={() => setSelectedModel('lstm')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedModel === 'lstm'
                ? 'border-nimbus-blue bg-nimbus-blue/20 dark:border-nimbus-cream dark:bg-nimbus-cream/20'
                : 'border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
            }`}
          >
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
              LSTM
            </h3>
            <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">
              Attention • 3 Classes
            </p>
          </button>
          <button
            onClick={() => setSelectedModel('lnn')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedModel === 'lnn'
                ? 'border-nimbus-blue bg-nimbus-blue/20 dark:border-nimbus-cream dark:bg-nimbus-cream/20'
                : 'border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
            }`}
          >
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
              LNN
            </h3>
            <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">
              Liquid • 3 Classes
            </p>
          </button>
          <button
            onClick={() => setSelectedModel('gru')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedModel === 'gru'
                ? 'border-nimbus-blue bg-nimbus-blue/20 dark:border-nimbus-cream dark:bg-nimbus-cream/20'
                : 'border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
            }`}
          >
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
              GRU
            </h3>
            <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">
              Regression • mm/h
            </p>
          </button>
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
              <option value="JUN">El Junco (JUN)</option>
              <option value="MIR">El Mirador (MIR)</option>
              <option value="SC">San Cristóbal (SC)</option>
            </select>
          </div>
        </div>

        {/* Time Series Analysis */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light flex items-center space-x-2">
                <Activity className="w-6 h-6" />
                <span>{selectedModel === 'tnn' ? 'Classification Timeline' : 'Prediction vs Reality Timeline'}</span>
              </h3>
              <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60 mt-1">
                Last 24 hours - El Junco Station (JUN)
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {selectedModel === 'gru' ? (
              <AreaChart data={timeSeriesDataGRU}>
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
            ) : (
              <LineChart data={timeSeriesDataTNN}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1eee8" />
                <XAxis dataKey="time" stroke="#083559" />
                <YAxis stroke="#083559" label={{ value: 'Class (0: No Rain, 1: Light, 2: Heavy)', angle: -90, position: 'insideLeft' }} domain={[0, 2]} />
                <Tooltip />
                <Legend />
                <Line type="stepAfter" dataKey="actual" stroke="#083559" strokeWidth={2} name="Actual Class" />
                <Line type="stepAfter" dataKey="predicted" stroke="#4d6e91" strokeWidth={2} strokeDasharray="5 5" name="Predicted Class" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Horizon Performance Grid */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
            <Clock className="w-6 h-6" />
            <span>Performance by Prediction Horizon</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {selectedModel === 'tnn' ? (
              horizonPerformanceTNN.map((horizon, index) => (
                <div key={index} className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
                  <h4 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">{horizon.horizon}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Accuracy</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">F1 Macro</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.f1_macro * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">F1 Weighted</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.f1_weighted * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-2">
                      <div className="bg-nimbus-blue h-2 rounded-full" style={{ width: `${horizon.accuracy * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : selectedModel === 'rnn' ? (
              horizonPerformanceRNN.map((horizon, index) => (
                <div key={index} className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
                  <h4 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">{horizon.horizon}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Accuracy</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">F1 Macro</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.f1_macro * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">F1 Weighted</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.f1_weighted * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: `${horizon.accuracy * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : selectedModel === 'lstm' ? (
              horizonPerformanceLSTM.map((horizon, index) => (
                <div key={index} className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
                  <h4 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">{horizon.horizon}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Accuracy</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">F1 Macro</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.f1_macro * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">F1 Weighted</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.f1_weighted * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-2">
                      <div className="bg-gray-600 h-2 rounded-full" style={{ width: `${horizon.accuracy * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : selectedModel === 'lnn' ? (
              horizonPerformanceLNN.map((horizon, index) => (
                <div key={index} className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
                  <h4 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">{horizon.horizon}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">Accuracy</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">F1 Macro</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.f1_macro * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">F1 Weighted</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.f1_weighted * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-2">
                      <div className="bg-gray-700 h-2 rounded-full" style={{ width: `${horizon.accuracy * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              horizonPerformanceGRU.map((horizon, index) => (
                <div key={index} className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
                  <h4 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">{horizon.horizon}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">RMSE</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{horizon.rmse.toFixed(4)} mm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">MAE</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{horizon.mae.toFixed(4)} mm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nimbus-dark/70 dark:text-nimbus-light/70">R² Score</span>
                      <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{(horizon.r2 * 100).toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-2">
                      <div className="bg-nimbus-blue h-2 rounded-full" style={{ width: `${horizon.r2 * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))
            )}
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
                <XAxis type="number" stroke="#083559" />
                <YAxis type="category" dataKey="station" stroke="#083559" />
                <Tooltip />
                <Legend />
                <Bar dataKey="rmse" fill="#FF9800" name="RMSE (mm)" />
                <Bar dataKey="mae" fill="#4CAF50" name="MAE (mm)" />
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
