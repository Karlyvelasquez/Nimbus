import { useState } from 'react'
import { CloudRain, Thermometer, Droplets, Wind, MapPin, TrendingUp, AlertTriangle, Download, Sparkles, X } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { translations } from '../translations'
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const DashboardMeteorologist = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [selectedStation, setSelectedStation] = useState('all')
  const [isExporting, setIsExporting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState('')
  const t = translations[language] || translations['en']

  // Datos en tiempo real de las estaciones
  const stationsData = [
    {
      id: 1,
      name: 'El Junco (JUN)',
      elevation: '650m',
      status: 'active',
      temp: 18.2,
      humidity: 85,
      pressure: 1008.5,
      windSpeed: 14,
      precipitation: 0.5,
      lastUpdate: '1 min ago'
    },
    {
      id: 2,
      name: 'Cerro Alto',
      elevation: '10m',
      status: 'active',
      temp: 24.5,
      humidity: 78,
      pressure: 1013.2,
      windSpeed: 12,
      precipitation: 0,
      lastUpdate: '2 min ago',
    },
    {
      id: 3,
      name: 'Merceditas',
      elevation: '250m',
      status: 'active',
      temp: 21.3,
      humidity: 82,
      pressure: 1010.5,
      windSpeed: 15,
      precipitation: 0.2,
      lastUpdate: '2 min ago',
    },
    {
      id: 4,
      name: 'El Mirador',
      elevation: '850m',
      status: 'active',
      temp: 14.2,
      humidity: 92,
      pressure: 1002.1,
      windSpeed: 18,
      precipitation: 1.8,
      lastUpdate: '3 min ago',
    },
  ]

  // Datos de temperatura en las últimas 24 horas
  const temperatureData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    junco: 16 + Math.sin(i / 3) * 3.5,
    cerroAlto: 22 + Math.sin(i / 3) * 4,
    merceditas: 19 + Math.sin(i / 3) * 3,
    mirador: 12 + Math.sin(i / 3) * 2,
  }))

  // Predicciones basadas en TNN (Temporal Neural Network)
  // Modelo de producción con 3 clases: 0=Sin lluvia (<0.1mm), 1=Lluvia leve (0.1-1.0mm), 2=Lluvia fuerte (>1.0mm)
  // Accuracy por horizonte: 1h=74.4%, 3h=61.7%, 6h=63.8%
  const forecasts = [
    {
      time: '+1h',
      station: 'El Junco (JUN)',
      precipitation: 'Light Rain',
      probability: 74,
      amount: '0.2-0.8mm',
      class: 1,
      model: 'TNN'
    },
    {
      time: '+1h',
      station: 'El Mirador',
      precipitation: 'Heavy Rain',
      probability: 74,
      amount: '1.5-3.2mm',
      class: 2,
      model: 'TNN'
    },
    {
      time: '+3h',
      station: 'El Junco (JUN)',
      precipitation: 'Light Rain',
      probability: 62,
      amount: '0.3-0.9mm',
      class: 1,
      model: 'TNN'
    },
    {
      time: '+3h',
      station: 'Merceditas',
      precipitation: 'No Rain',
      probability: 62,
      amount: '<0.1mm',
      class: 0,
      model: 'TNN'
    },
    {
      time: '+6h',
      station: 'Cerro Alto',
      precipitation: 'No Rain',
      probability: 64,
      amount: '<0.1mm',
      class: 0,
      model: 'TNN'
    },
    {
      time: '+6h',
      station: 'El Junco (JUN)',
      precipitation: 'Heavy Rain',
      probability: 64,
      amount: '1.2-2.8mm',
      class: 2,
      model: 'TNN'
    },
  ]

  // Alertas activas basadas en predicciones TNN
  const activeAlerts = [
    {
      id: 1,
      type: 'Heavy Rain Warning',
      station: 'El Junco (JUN)',
      severity: 'high',
      message: 'TNN model predicts heavy precipitation (>1.0mm/h) in next 6 hours with 64% confidence',
      time: '2 min ago',
      model: 'TNN',
      horizon: '+6h'
    },
    {
      id: 2,
      type: 'Light Rain Expected',
      station: 'El Junco (JUN)',
      severity: 'low',
      message: 'TNN model forecasts light rain (0.2-0.8mm) within next hour with 74% confidence',
      time: '5 min ago',
      model: 'TNN',
      horizon: '+1h'
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      case 'warning': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'error': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20'
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'low': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  // Export to PDF function
  const exportToPDF = () => {
    setIsExporting(true)
    
    setTimeout(() => {
      const doc = new jsPDF()
      
      // Header
      doc.setFillColor(8, 53, 89)
      doc.rect(0, 0, 210, 35, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.text('NIMBUS', 20, 15)
      doc.setFontSize(12)
      doc.text('Weather Monitoring Report', 20, 25)
      doc.setFontSize(10)
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 32)
      
      // Reset text color
      doc.setTextColor(0, 0, 0)
      
      let yPos = 45
      
      // Active Alerts Section
      if (activeAlerts.length > 0) {
        doc.setFontSize(16)
        doc.setTextColor(220, 38, 38)
        doc.text('Active Alerts', 20, yPos)
        yPos += 7
        
        const alertsData = activeAlerts.map(alert => [
          alert.type,
          alert.station,
          alert.severity.toUpperCase(),
          alert.message,
          alert.time
        ])
        
        doc.autoTable({
          startY: yPos,
          head: [['Type', 'Station', 'Severity', 'Message', 'Time']],
          body: alertsData,
          theme: 'grid',
          headStyles: { fillColor: [220, 38, 38], textColor: 255 },
          margin: { left: 20, right: 20 },
        })
        
        yPos = doc.lastAutoTable.finalY + 10
      }
      
      // Stations Overview
      doc.setFontSize(16)
      doc.setTextColor(8, 53, 89)
      doc.text('Weather Stations - Current Readings', 20, yPos)
      yPos += 7
      
      const stationsTableData = stationsData.map(station => [
        station.name,
        station.elevation,
        `${station.temp}°C`,
        `${station.humidity}%`,
        `${station.windSpeed} km/h`,
        `${station.precipitation} mm`,
        `${station.pressure} hPa`,
        station.status.toUpperCase()
      ])
      
      doc.autoTable({
        startY: yPos,
        head: [['Station', 'Elevation', 'Temp', 'Humidity', 'Wind', 'Rain', 'Pressure', 'Status']],
        body: stationsTableData,
        theme: 'striped',
        headStyles: { fillColor: [8, 53, 89] },
        margin: { left: 20, right: 20 },
      })
      
      yPos = doc.lastAutoTable.finalY + 10
      
      // Add new page if needed
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }
      
      // AI Predictions Section
      doc.setFontSize(16)
      doc.setTextColor(8, 53, 89)
      doc.text('AI Model Predictions', 20, yPos)
      yPos += 7
      
      const forecastsData = forecasts.map(forecast => [
        forecast.time,
        forecast.station,
        forecast.precipitation,
        `${forecast.probability}%`,
        forecast.amount
      ])
      
      doc.autoTable({
        startY: yPos,
        head: [['Horizon', 'Station', 'Forecast', 'Probability', 'Amount']],
        body: forecastsData,
        theme: 'striped',
        headStyles: { fillColor: [77, 110, 145] },
        margin: { left: 20, right: 20 },
      })
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(9)
        doc.setTextColor(128, 128, 128)
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        )
        doc.text(
          'Nimbus - San Cristóbal, Galápagos',
          20,
          doc.internal.pageSize.height - 10
        )
      }
      
      // Save the PDF
      doc.save(`nimbus-weather-report-${new Date().toISOString().split('T')[0]}.pdf`)
      setIsExporting(false)
    }, 500)
  }

  // AI Analysis function
  const analyzeWithAI = async () => {
    setIsAnalyzing(true)
    setShowAnalysis(true)
    setAiAnalysis('')

    try {
      // Prepare weather data for AI analysis
      const weatherContext = {
        stations: stationsData.map(s => ({
          name: s.name,
          elevation: s.elevation,
          temperature: s.temp,
          humidity: s.humidity,
          pressure: s.pressure,
          windSpeed: s.windSpeed,
          precipitation: s.precipitation,
          status: s.status
        })),
        alerts: activeAlerts.map(a => ({
          type: a.type,
          station: a.station,
          severity: a.severity,
          message: a.message
        })),
        forecasts: forecasts.map(f => ({
          time: f.time,
          station: f.station,
          precipitation: f.precipitation,
          probability: f.probability,
          amount: f.amount
        })),
        location: 'San Cristóbal, Galápagos Islands',
        timestamp: new Date().toLocaleString()
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPEN_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert meteorologist analyzing weather data from the Galápagos Islands. Provide a comprehensive analysis including: 1) Current weather patterns, 2) Risk assessment, 3) Short-term forecast insights, 4) Recommendations for local authorities and residents. Be specific, professional, and actionable.'
            },
            {
              role: 'user',
              content: `Please analyze this weather data from San Cristóbal, Galápagos:\n\n${JSON.stringify(weatherContext, null, 2)}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      const analysis = data.choices[0].message.content

      // Simulate streaming effect
      let currentText = ''
      const words = analysis.split(' ')
      for (let i = 0; i < words.length; i++) {
        currentText += words[i] + ' '
        setAiAnalysis(currentText)
        await new Promise(resolve => setTimeout(resolve, 50))
      }

      setIsAnalyzing(false)
    } catch (error) {
      console.error('AI Analysis error:', error)
      setAiAnalysis(`❌ Error analyzing data: ${error.message}\n\nPlease check:\n- API key is configured in .env as VITE_OPEN_API_KEY\n- You have sufficient OpenAI credits\n- Network connection is stable`)
      setIsAnalyzing(false)
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-1">
              Real-Time Weather Overview
            </h2>
            <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
              Live data from San Cristóbal meteorological stations
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={analyzeWithAI}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze with AI</span>
                </>
              )}
            </button>
            <button 
              onClick={exportToPDF}
              disabled={isExporting}
              className="flex items-center space-x-2 bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-nimbus-dark"></div>
                  <span>{t.exporting || 'Exporting...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>{t.exportToPDF || 'Export Report'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Analysis Modal */}
        {showAnalysis && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-nimbus-blue/10 rounded-xl border-2 border-purple-500 dark:border-purple-400 max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">AI Weather Analysis</h3>
                </div>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">Analyzing weather patterns with AI...</p>
                  </div>
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="text-nimbus-dark dark:text-nimbus-light whitespace-pre-wrap leading-relaxed">
                      {aiAnalysis}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 p-4 rounded-lg ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                      alert.severity === 'high' ? 'text-red-600' :
                      alert.severity === 'medium' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                    <div>
                      <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">
                        {alert.type} - {alert.station}
                      </h3>
                      <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70 mt-1">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-nimbus-dark/50 dark:text-nimbus-light/50">
                    {alert.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stations Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stationsData.map((station) => (
            <div
              key={station.id}
              className={`bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border ${station.model ? 'border-2 border-green-500 dark:border-green-400' : 'border-nimbus-cream dark:border-nimbus-blue/20'} hover:shadow-lg transition-shadow relative`}
            >
              {station.model && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                  TNN Model
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-nimbus-blue dark:text-nimbus-cream" />
                  <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">
                    {station.name}
                  </h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(station.status)}`}>
                  {station.status}
                </span>
              </div>
              
              <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60 mb-4">
                Elevation: {station.elevation}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">Temp</span>
                  </div>
                  <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{station.temp}°C</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">Humidity</span>
                  </div>
                  <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{station.humidity}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">Wind</span>
                  </div>
                  <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{station.windSpeed} km/h</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CloudRain className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">Rain</span>
                  </div>
                  <span className="font-bold text-nimbus-dark dark:text-nimbus-light">{station.precipitation} mm</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-nimbus-cream dark:border-nimbus-blue/20">
                <p className="text-xs text-nimbus-dark/50 dark:text-nimbus-light/50">
                  Updated {station.lastUpdate}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Temperature Trends */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4 flex items-center space-x-2">
            <Thermometer className="w-6 h-6" />
            <span>Temperature Trends - Last 24 Hours</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1eee8" />
              <XAxis dataKey="hour" stroke="#083559" />
              <YAxis stroke="#083559" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="junco" stroke="#2196F3" name="El Junco (TNN)" strokeWidth={3} />
              <Line type="monotone" dataKey="cerroAlto" stroke="#083559" name="Cerro Alto" strokeWidth={2} />
              <Line type="monotone" dataKey="merceditas" stroke="#4d6e91" name="Merceditas" strokeWidth={2} />
              <Line type="monotone" dataKey="mirador" stroke="#f59e0b" name="El Mirador" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Predictions */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light flex items-center space-x-2">
              <TrendingUp className="w-6 h-6" />
              <span>TNN Model Predictions (Production)</span>
            </h3>
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-green-700 dark:text-green-400">Live Model</span>
            </div>
          </div>
          <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60 mb-4">
            Temporal Neural Network classification • 3 classes (No Rain / Light / Heavy) • Dataset: El Junco Station
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-nimbus-cream dark:border-nimbus-blue/20">
                <tr>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Horizon</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Station</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Forecast</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Confidence</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Amount</th>
                </tr>
              </thead>
              <tbody>
                {forecasts.map((forecast, index) => (
                  <tr key={index} className="border-b border-nimbus-cream dark:border-nimbus-blue/20 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/5 transition-colors">
                    <td className="py-4 px-4 font-semibold text-nimbus-dark dark:text-nimbus-light">{forecast.time}</td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{forecast.station}</td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{forecast.precipitation}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-2">
                          <div 
                            className="bg-nimbus-blue h-2 rounded-full transition-all"
                            style={{ width: `${forecast.probability}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{forecast.probability}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-nimbus-dark dark:text-nimbus-light">{forecast.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardMeteorologist
