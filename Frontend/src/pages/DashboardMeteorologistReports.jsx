import { useState } from 'react'
import { FileText, Download, Calendar, Filter, Printer, Share2, TrendingUp, Cloud, Droplets, Wind } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

const DashboardMeteorologistReports = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [selectedReportType, setSelectedReportType] = useState('daily')
  const [selectedStation, setSelectedStation] = useState('all')
  const [dateRange, setDateRange] = useState('last7days')
  const [isGenerating, setIsGenerating] = useState(false)

  const reportTypes = [
    { id: 'daily', label: 'Daily Summary', icon: Calendar },
    { id: 'weekly', label: 'Weekly Report', icon: TrendingUp },
    { id: 'monthly', label: 'Monthly Analysis', icon: FileText },
    { id: 'custom', label: 'Custom Report', icon: Filter },
  ]

  const stations = [
    { id: 'all', name: 'All Stations' },
    { id: 'costa', name: 'Costa Station' },
    { id: 'medio', name: 'Nivel Medio' },
    { id: 'alto', name: 'Nivel Alto' },
    { id: 'cumbre', name: 'Cumbre' },
  ]

  const recentReports = [
    {
      id: 1,
      title: 'Daily Weather Summary - March 10, 2026',
      type: 'Daily',
      date: 'March 10, 2026',
      stations: 'All Stations',
      format: 'PDF',
      size: '2.4 MB',
      status: 'ready',
    },
    {
      id: 2,
      title: 'Weekly Weather Report - March 3-9, 2026',
      type: 'Weekly',
      date: 'March 9, 2026',
      stations: 'All Stations',
      format: 'PDF',
      size: '5.1 MB',
      status: 'ready',
    },
    {
      id: 3,
      title: 'Station Performance - Costa Station',
      type: 'Custom',
      date: 'March 8, 2026',
      stations: 'Costa Station',
      format: 'PDF',
      size: '1.8 MB',
      status: 'ready',
    },
    {
      id: 4,
      title: 'Monthly Summary - February 2026',
      type: 'Monthly',
      date: 'March 1, 2026',
      stations: 'All Stations',
      format: 'PDF',
      size: '8.7 MB',
      status: 'ready',
    },
    {
      id: 5,
      title: 'Precipitation Analysis - Highland Stations',
      type: 'Custom',
      date: 'February 28, 2026',
      stations: 'Nivel Alto, Cumbre',
      format: 'PDF',
      size: '3.2 MB',
      status: 'ready',
    },
  ]

  const reportTemplates = [
    {
      id: 1,
      name: 'Standard Weather Summary',
      description: 'Comprehensive overview of all meteorological data',
      includes: ['Temperature trends', 'Precipitation data', 'Wind analysis', 'Humidity levels', 'Pressure readings'],
      icon: Cloud,
    },
    {
      id: 2,
      name: 'Precipitation Focus',
      description: 'Detailed analysis of rainfall patterns and forecasts',
      includes: ['Rainfall totals', 'Distribution maps', 'Intensity analysis', 'Forecast accuracy', 'Alert triggers'],
      icon: Droplets,
    },
    {
      id: 3,
      name: 'Wind & Storm Report',
      description: 'Wind patterns and severe weather events',
      includes: ['Wind speed/direction', 'Gust analysis', 'Storm tracking', 'Safety alerts', 'Historical comparison'],
      icon: Wind,
    },
    {
      id: 4,
      name: 'Station Health Check',
      description: 'Technical report on sensor and station performance',
      includes: ['Sensor status', 'Data quality', 'Uptime metrics', 'Maintenance needs', 'Calibration history'],
      icon: TrendingUp,
    },
  ]

  const generateReport = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      alert('Report generated successfully!')
    }, 2000)
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
            Weather Reports
          </h2>
          <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
            Generate and download comprehensive weather reports
          </p>
        </div>

        {/* Report Generator */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6 flex items-center space-x-2">
            <FileText className="w-6 h-6" />
            <span>Generate New Report</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Report Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-3">
                Report Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReportType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedReportType === type.id
                        ? 'border-nimbus-blue bg-nimbus-blue/10 dark:bg-nimbus-blue/20'
                        : 'border-nimbus-cream dark:border-nimbus-blue/20 hover:border-nimbus-blue/50'
                    }`}
                  >
                    <type.icon className="w-5 h-5 text-nimbus-blue mb-2" />
                    <p className="font-semibold text-nimbus-dark dark:text-nimbus-light text-sm">{type.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div className="space-y-4">
              {/* Station Selection */}
              <div>
                <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                  Stations
                </label>
                <select
                  value={selectedStation}
                  onChange={(e) => setSelectedStation(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-nimbus-dark/30 border border-nimbus-cream dark:border-nimbus-blue/20 rounded-lg text-nimbus-dark dark:text-nimbus-light focus:outline-none focus:ring-2 focus:ring-nimbus-blue"
                >
                  {stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Selection */}
              <div>
                <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-nimbus-dark/30 border border-nimbus-cream dark:border-nimbus-blue/20 rounded-lg text-nimbus-dark dark:text-nimbus-light focus:outline-none focus:ring-2 focus:ring-nimbus-blue"
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                  Format
                </label>
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-nimbus-blue text-white rounded-lg font-semibold">
                    PDF
                  </button>
                  <button className="flex-1 px-4 py-2 border border-nimbus-cream dark:border-nimbus-blue/20 text-nimbus-dark dark:text-nimbus-light rounded-lg hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 transition-colors">
                    CSV
                  </button>
                  <button className="flex-1 px-4 py-2 border border-nimbus-cream dark:border-nimbus-blue/20 text-nimbus-dark dark:text-nimbus-light rounded-lg hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 transition-colors">
                    Excel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="flex items-center space-x-2 bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-nimbus-dark"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  <span>Generate Report</span>
                </>
              )}
            </button>
            <button className="flex items-center space-x-2 border border-nimbus-cream dark:border-nimbus-blue/20 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 text-nimbus-dark dark:text-nimbus-light px-6 py-3 rounded-lg font-bold transition-all">
              <Printer className="w-5 h-5" />
              <span>Print Preview</span>
            </button>
          </div>
        </div>

        {/* Report Templates */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            Report Templates
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-nimbus-blue/10 dark:bg-nimbus-blue/20 p-3 rounded-lg">
                    <template.icon className="w-6 h-6 text-nimbus-blue" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
                      {template.name}
                    </h4>
                    <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70 mb-3">
                      {template.description}
                    </p>
                    <div className="space-y-1 mb-4">
                      {template.includes.map((item, idx) => (
                        <p key={idx} className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">
                          • {item}
                        </p>
                      ))}
                    </div>
                    <button className="text-sm text-nimbus-blue hover:text-nimbus-dark dark:hover:text-nimbus-light font-semibold transition-colors">
                      Use Template →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            Recent Reports
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-nimbus-cream dark:border-nimbus-blue/20">
                <tr>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Report</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Type</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Date</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Stations</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Size</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b border-nimbus-cream dark:border-nimbus-blue/20 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-nimbus-blue flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-nimbus-dark dark:text-nimbus-light">{report.title}</p>
                          <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">{report.format}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-nimbus-blue/10 dark:bg-nimbus-blue/20 text-nimbus-blue rounded-full text-sm font-semibold">
                        {report.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{report.date}</td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{report.stations}</td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{report.size}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 rounded-lg transition-colors" title="Download">
                          <Download className="w-4 h-4 text-nimbus-dark dark:text-nimbus-light" />
                        </button>
                        <button className="p-2 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 rounded-lg transition-colors" title="Share">
                          <Share2 className="w-4 h-4 text-nimbus-dark dark:text-nimbus-light" />
                        </button>
                        <button className="p-2 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 rounded-lg transition-colors" title="Print">
                          <Printer className="w-4 h-4 text-nimbus-dark dark:text-nimbus-light" />
                        </button>
                      </div>
                    </td>
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

export default DashboardMeteorologistReports
