import { useState } from 'react'
import { Settings as SettingsIcon, Bell, Shield, Database, Zap, Mail, Save, CheckCircle2 } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

const DashboardMLExpertSettings = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [saveStatus, setSaveStatus] = useState(null)
  
  // Model settings
  const [modelSettings, setModelSettings] = useState({
    autoRetrain: true,
    retrainInterval: '6',
    minAccuracy: '85',
    maxTrainingTime: '120',
    batchSize: '32',
    learningRate: '0.001',
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    trainingComplete: true,
    modelDrift: true,
    dataQuality: true,
    performanceDrop: true,
    systemErrors: true,
  })

  // API settings
  const [apiSettings, setApiSettings] = useState({
    apiKey: '••••••••••••••••••••••',
    rateLimit: '1000',
    timeout: '30',
    retryAttempts: '3',
  })

  // Data retention
  const [dataRetention, setDataRetention] = useState({
    rawData: '24',
    predictions: '12',
    logs: '6',
    models: '3',
  })

  const handleSave = () => {
    setSaveStatus('saving')
    setTimeout(() => {
      setSaveStatus('success')
      setTimeout(() => setSaveStatus(null), 3000)
    }, 1500)
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-nimbus-dark dark:text-nimbus-light mb-2">
              Settings
            </h2>
            <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
              Configure model parameters, notifications, and system preferences
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center space-x-2 bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
          >
            {saveStatus === 'saving' ? (
              <>
                <Save className="w-5 h-5 animate-pulse" />
                <span>Saving...</span>
              </>
            ) : saveStatus === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>

        {/* Model Training Settings */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6 flex items-center space-x-2">
            <Zap className="w-6 h-6" />
            <span>Model Training Configuration</span>
          </h3>
          
          <div className="space-y-6">
            {/* Auto Retrain Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-nimbus-dark dark:text-nimbus-light">Automatic Retraining</h4>
                <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">Enable automatic model retraining on schedule</p>
              </div>
              <button
                onClick={() => setModelSettings({...modelSettings, autoRetrain: !modelSettings.autoRetrain})}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  modelSettings.autoRetrain ? 'bg-nimbus-blue' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  modelSettings.autoRetrain ? 'transform translate-x-7' : ''
                }`}></div>
              </button>
            </div>

            {/* Training Parameters */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                  Retrain Interval (hours)
                </label>
                <input
                  type="number"
                  value={modelSettings.retrainInterval}
                  onChange={(e) => setModelSettings({...modelSettings, retrainInterval: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                  Minimum Accuracy Threshold (%)
                </label>
                <input
                  type="number"
                  value={modelSettings.minAccuracy}
                  onChange={(e) => setModelSettings({...modelSettings, minAccuracy: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                  Max Training Time (minutes)
                </label>
                <input
                  type="number"
                  value={modelSettings.maxTrainingTime}
                  onChange={(e) => setModelSettings({...modelSettings, maxTrainingTime: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                  Batch Size
                </label>
                <select
                  value={modelSettings.batchSize}
                  onChange={(e) => setModelSettings({...modelSettings, batchSize: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
                >
                  <option value="16">16</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                  <option value="128">128</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                  Learning Rate
                </label>
                <select
                  value={modelSettings.learningRate}
                  onChange={(e) => setModelSettings({...modelSettings, learningRate: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
                >
                  <option value="0.0001">0.0001</option>
                  <option value="0.001">0.001</option>
                  <option value="0.01">0.01</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6 flex items-center space-x-2">
            <Bell className="w-6 h-6" />
            <span>Notification Preferences</span>
          </h3>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-nimbus-cream dark:border-nimbus-blue/20 last:border-0">
                <div>
                  <h4 className="font-semibold text-nimbus-dark dark:text-nimbus-light capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">
                    {key === 'emailAlerts' && 'Receive notifications via email'}
                    {key === 'trainingComplete' && 'Alert when model training finishes'}
                    {key === 'modelDrift' && 'Notify when model performance degrades'}
                    {key === 'dataQuality' && 'Alert on data quality issues'}
                    {key === 'performanceDrop' && 'Notify when accuracy drops below threshold'}
                    {key === 'systemErrors' && 'Alert on system errors and failures'}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, [key]: !value})}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    value ? 'bg-nimbus-blue' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    value ? 'transform translate-x-7' : ''
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6 flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <span>API Configuration</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={apiSettings.apiKey}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-gray-50 dark:bg-nimbus-dark/30 text-nimbus-dark dark:text-nimbus-light outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-nimbus-blue hover:text-nimbus-dark dark:text-nimbus-cream dark:hover:text-nimbus-light font-semibold">
                  Regenerate
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                Rate Limit (requests/hour)
              </label>
              <input
                type="number"
                value={apiSettings.rateLimit}
                onChange={(e) => setApiSettings({...apiSettings, rateLimit: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                Request Timeout (seconds)
              </label>
              <input
                type="number"
                value={apiSettings.timeout}
                onChange={(e) => setApiSettings({...apiSettings, timeout: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                Retry Attempts
              </label>
              <input
                type="number"
                value={apiSettings.retryAttempts}
                onChange={(e) => setApiSettings({...apiSettings, retryAttempts: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6 flex items-center space-x-2">
            <Database className="w-6 h-6" />
            <span>Data Retention Policies</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                Raw Data (months)
              </label>
              <input
                type="number"
                value={dataRetention.rawData}
                onChange={(e) => setDataRetention({...dataRetention, rawData: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                Predictions Archive (months)
              </label>
              <input
                type="number"
                value={dataRetention.predictions}
                onChange={(e) => setDataRetention({...dataRetention, predictions: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                System Logs (months)
              </label>
              <input
                type="number"
                value={dataRetention.logs}
                onChange={(e) => setDataRetention({...dataRetention, logs: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                Model Versions (months)
              </label>
              <input
                type="number"
                value={dataRetention.models}
                onChange={(e) => setDataRetention({...dataRetention, models: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Email Configuration */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-nimbus-blue/20">
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-6 flex items-center space-x-2">
            <Mail className="w-6 h-6" />
            <span>Email Configuration</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                Primary Email
              </label>
              <input
                type="email"
                placeholder="demo@nimbus.ai"
                className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-nimbus-dark dark:text-nimbus-light mb-2">
                Additional Recipients (comma separated)
              </label>
              <input
                type="text"
                placeholder="team@nimbus.ai, alerts@galapagos.org"
                className="w-full px-4 py-3 rounded-lg border-2 border-nimbus-cream dark:border-nimbus-blue/20 bg-white dark:bg-nimbus-blue/5 text-nimbus-dark dark:text-nimbus-light focus:border-nimbus-blue dark:focus:border-nimbus-cream outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center space-x-2 bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
          >
            {saveStatus === 'saving' ? (
              <>
                <Save className="w-5 h-5 animate-pulse" />
                <span>Saving...</span>
              </>
            ) : saveStatus === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Changes Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardMLExpertSettings
