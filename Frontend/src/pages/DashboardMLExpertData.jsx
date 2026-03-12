import { useState } from 'react'
import { Database, Upload, Download, RefreshCw, AlertCircle, CheckCircle2, XCircle, Clock, Filter, Search } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

const DashboardMLExpertData = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [uploadStatus, setUploadStatus] = useState(null)
  const [selectedDataset, setSelectedDataset] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Datasets disponibles
  const datasets = [
    {
      id: 1,
      name: 'JUN_consolid_f15.csv',
      station: 'El Junco',
      records: 4850,
      dateRange: '2015-2026',
      size: '52.3 MB',
      status: 'active',
      lastUpdate: '2h ago',
      quality: 98.5,
    },
    {
      id: 2,
      name: 'CER_consolid_f15.csv',
      station: 'Cerro Alto',
      records: 4620,
      dateRange: '2015-2026',
      size: '49.7 MB',
      status: 'active',
      lastUpdate: '2h ago',
      quality: 97.2,
    },
    {
      id: 3,
      name: 'MERC_consolid_f15.csv',
      station: 'Merceditas',
      records: 4380,
      dateRange: '2015-2026',
      size: '47.1 MB',
      status: 'active',
      lastUpdate: '2h ago',
      quality: 96.8,
    },
    {
      id: 4,
      name: 'MIRA_consolid_f15.csv',
      station: 'El Mirador',
      records: 4150,
      dateRange: '2015-2026',
      size: '44.6 MB',
      status: 'active',
      lastUpdate: '2h ago',
      quality: 95.4,
    },
  ]

  // Data pipeline status
  const pipelineSteps = [
    { name: 'Data Ingestion', status: 'completed', progress: 100, time: '2m ago' },
    { name: 'Preprocessing', status: 'completed', progress: 100, time: '1m ago' },
    { name: 'Feature Engineering', status: 'running', progress: 67, time: 'now' },
    { name: 'Validation', status: 'pending', progress: 0, time: 'waiting' },
    { name: 'Model Training', status: 'pending', progress: 0, time: 'waiting' },
  ]

  // Data quality metrics
  const qualityMetrics = [
    { metric: 'Completeness', value: 97.8, status: 'good', description: 'Missing values handled' },
    { metric: 'Accuracy', value: 96.5, status: 'good', description: 'Data validation passed' },
    { metric: 'Consistency', value: 98.2, status: 'excellent', description: 'No conflicts detected' },
    { metric: 'Timeliness', value: 94.1, status: 'good', description: 'Recent data available' },
  ]

  const handleUpload = () => {
    setUploadStatus('uploading')
    setTimeout(() => {
      setUploadStatus('success')
      setTimeout(() => setUploadStatus(null), 3000)
    }, 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'processing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'running': return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getQualityColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600'
      case 'good': return 'text-blue-600'
      case 'warning': return 'text-yellow-600'
      default: return 'text-red-600'
    }
  }

  const filteredDatasets = datasets.filter(dataset => 
    (selectedDataset === 'all' || dataset.station === selectedDataset) &&
    (searchQuery === '' || dataset.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

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
            Data Management
          </h2>
          <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
            Manage datasets, monitor data quality, and control the data pipeline
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={handleUpload}
            disabled={uploadStatus === 'uploading'}
            className="flex items-center justify-center space-x-3 bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-6 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {uploadStatus === 'uploading' ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : uploadStatus === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Upload Complete!</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Upload New Data</span>
              </>
            )}
          </button>
          <button className="flex items-center justify-center space-x-3 bg-white dark:bg-nimbus-blue/10 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 text-nimbus-dark dark:text-nimbus-light px-6 py-4 rounded-xl font-bold border-2 border-nimbus-cream dark:border-nimbus-blue/20 transition-all">
            <Download className="w-5 h-5" />
            <span>Export Dataset</span>
          </button>
          <button className="flex items-center justify-center space-x-3 bg-white dark:bg-nimbus-blue/10 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/20 text-nimbus-dark dark:text-nimbus-light px-6 py-4 rounded-xl font-bold border-2 border-nimbus-cream dark:border-nimbus-blue/20 transition-all">
            <RefreshCw className="w-5 h-5" />
            <span>Sync Data Sources</span>
          </button>
        </div>

        {/* Data Quality Overview */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6 flex items-center space-x-2">
            <Database className="w-6 h-6" />
            <span>Data Quality Metrics</span>
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {qualityMetrics.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{item.metric}</span>
                  <span className={`text-2xl font-bold ${getQualityColor(item.status)}`}>
                    {item.value}%
                  </span>
                </div>
                <div className="w-full bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-2">
                  <div 
                    className="bg-nimbus-blue h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <p className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Pipeline Status */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6 flex items-center space-x-2">
            <RefreshCw className="w-6 h-6" />
            <span>Data Pipeline Status</span>
          </h3>
          <div className="space-y-4">
            {pipelineSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{step.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">{step.time}</span>
                      <span className="text-sm font-bold text-nimbus-dark dark:text-nimbus-light">{step.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-nimbus-cream dark:bg-nimbus-dark/30 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        step.status === 'completed' ? 'bg-green-600' :
                        step.status === 'running' ? 'bg-blue-600' :
                        step.status === 'error' ? 'bg-red-600' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${step.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Datasets Table */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light flex items-center space-x-2">
              <Database className="w-6 h-6" />
              <span>Available Datasets</span>
            </h3>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-nimbus-dark/40 dark:text-nimbus-light/40" />
              <input
                type="text"
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
            >
              <option value="all">All Stations</option>
              <option value="El Junco">El Junco (JUN)</option>
              <option value="Cerro Alto">Cerro Alto (CER)</option>
              <option value="Merceditas">Merceditas (MERC)</option>
              <option value="El Mirador">El Mirador (MIRA)</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-nimbus-cream dark:border-nimbus-blue/20">
                <tr>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Dataset</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Station</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Records</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Date Range</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Size</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Quality</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-nimbus-dark dark:text-nimbus-light">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {filteredDatasets.map((dataset) => (
                  <tr key={dataset.id} className="border-b border-nimbus-cream dark:border-nimbus-blue/20 hover:bg-nimbus-cream dark:hover:bg-nimbus-blue/5 transition-colors">
                    <td className="py-4 px-4 font-semibold text-nimbus-dark dark:text-nimbus-light">{dataset.name}</td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{dataset.station}</td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{dataset.records.toLocaleString()}</td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{dataset.dateRange}</td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{dataset.size}</td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-nimbus-dark dark:text-nimbus-light">{dataset.quality}%</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(dataset.status)}`}>
                        {dataset.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-nimbus-dark/70 dark:text-nimbus-light/70">{dataset.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Sync Alert */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-lg">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-nimbus-dark dark:text-nimbus-light mb-2">Automatic Data Sync Enabled</h4>
              <p className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70">
                New meteorological data is automatically synchronized every 3 hours from Galapagos Science Center stations. 
                Last sync: 2 hours ago • Next sync: in 1 hour
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardMLExpertData
