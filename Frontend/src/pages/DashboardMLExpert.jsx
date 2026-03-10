import { useState } from 'react'
import { BarChart3, LineChart, TrendingUp, RefreshCw, Database, Brain, AlertCircle, CheckCircle2, FileDown } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { translations } from '../translations'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {
  BarChart, Bar, LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, ScatterChart, Scatter, Cell
} from 'recharts'

const DashboardMLExpert = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [selectedModel, setSelectedModel] = useState('lstm')
  const [retrainingStatus, setRetrainingStatus] = useState(null)
  const [exportStatus, setExportStatus] = useState(null)
  const t = translations[language] || translations['en']

  // Mock data para las métricas
  const metricsData = {
    rnn: {
      macroF1: 0.72,
      microF1: 0.75,
      weightedF1: 0.74,
      precision: 0.73,
      recall: 0.71,
      accuracy: 0.75
    },
    lstm: {
      macroF1: 0.87,
      microF1: 0.89,
      weightedF1: 0.88,
      precision: 0.88,
      recall: 0.86,
      accuracy: 0.89
    },
    lnn: {
      macroF1: 0.91,
      microF1: 0.92,
      weightedF1: 0.91,
      precision: 0.90,
      recall: 0.92,
      accuracy: 0.92
    }
  }

  // Comparación de modelos
  const comparisonData = [
    { metric: 'Macro F1', RNN: 0.72, LSTM: 0.87, LNN: 0.91 },
    { metric: 'Micro F1', RNN: 0.75, LSTM: 0.89, LNN: 0.92 },
    { metric: 'Weighted F1', RNN: 0.74, LSTM: 0.88, LNN: 0.91 },
    { metric: 'Precision', RNN: 0.73, LSTM: 0.88, LNN: 0.90 },
    { metric: 'Recall', RNN: 0.71, LSTM: 0.86, LNN: 0.92 },
    { metric: 'Accuracy', RNN: 0.75, LSTM: 0.89, LNN: 0.92 }
  ]

  // Feature importance
  const featureImportance = [
    { name: 'Humidity El Junco', importance: 0.24 },
    { name: 'Temp El Mirador', importance: 0.19 },
    { name: 'Wind Speed', importance: 0.16 },
    { name: 'Pressure', importance: 0.14 },
    { name: 'Radiation', importance: 0.12 },
    { name: 'Soil Moisture', importance: 0.09 },
    { name: 'Leaf Wetness', importance: 0.06 }
  ]

  // Predicción vs Realidad (últimas 24 horas)
  const predictionData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}h`,
    real: Math.random() * 20 + (i > 12 ? 15 : 5),
    predicted: Math.random() * 20 + (i > 12 ? 15 : 5)
  }))

  // Matriz de confusión
  const confusionMatrix = [
    { actual: 'No Rain', predicted: 'No Rain', value: 1850 },
    { actual: 'No Rain', predicted: 'Light', value: 120 },
    { actual: 'No Rain', predicted: 'Heavy', value: 30 },
    { actual: 'Light', predicted: 'No Rain', value: 95 },
    { actual: 'Light', predicted: 'Light', value: 780 },
    { actual: 'Light', predicted: 'Heavy', value: 125 },
    { actual: 'Heavy', predicted: 'No Rain', value: 15 },
    { actual: 'Heavy', predicted: 'Light', value: 85 },
    { actual: 'Heavy', predicted: 'Heavy', value: 400 }
  ]

  const getColor = (value) => {
    if (value > 1000) return '#083559'
    if (value > 500) return '#4d6e91'
    if (value > 200) return '#f1eee8'
    return '#fff8f8'
  }

  const exportToPDF = () => {
    setExportStatus('exporting')
    
    // Crear documento PDF
    const doc = new jsPDF()
    const currentMetrics = metricsData[selectedModel]
    const modelName = selectedModel.toUpperCase()
    
    // Configuración de colores
    const primaryColor = [8, 53, 89] // nimbus-dark
    const secondaryColor = [77, 110, 145] // nimbus-blue
    
    // Header
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('NIMBUS', 20, 20)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.text('ML Expert Dashboard - Model Performance Report', 20, 30)
    
    // Fecha y modelo
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 20, 50)
    doc.text(`Model: ${modelName} (Production)`, 20, 56)
    
    // Línea separadora
    doc.setDrawColor(...secondaryColor)
    doc.setLineWidth(0.5)
    doc.line(20, 62, 190, 62)
    
    // Métricas principales
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('Performance Metrics', 20, 72)
    
    // Tabla de métricas
    const metricsTable = [
      ['Metric', 'Score', 'Status'],
      ['Macro F1', `${(currentMetrics.macroF1 * 100).toFixed(1)}%`, currentMetrics.macroF1 > 0.85 ? 'Excellent' : 'Good'],
      ['Micro F1', `${(currentMetrics.microF1 * 100).toFixed(1)}%`, currentMetrics.microF1 > 0.85 ? 'Excellent' : 'Good'],
      ['Weighted F1', `${(currentMetrics.weightedF1 * 100).toFixed(1)}%`, currentMetrics.weightedF1 > 0.85 ? 'Excellent' : 'Good'],
      ['Precision', `${(currentMetrics.precision * 100).toFixed(1)}%`, currentMetrics.precision > 0.85 ? 'Excellent' : 'Good'],
      ['Recall', `${(currentMetrics.recall * 100).toFixed(1)}%`, currentMetrics.recall > 0.85 ? 'Excellent' : 'Good'],
      ['Accuracy', `${(currentMetrics.accuracy * 100).toFixed(1)}%`, currentMetrics.accuracy > 0.85 ? 'Excellent' : 'Good'],
    ]
    
    doc.autoTable({
      startY: 78,
      head: [metricsTable[0]],
      body: metricsTable.slice(1),
      theme: 'striped',
      headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 60 },
        1: { halign: 'center', cellWidth: 40 },
        2: { halign: 'center', cellWidth: 40 }
      }
    })
    
    // Comparación de modelos
    let finalY = doc.lastAutoTable.finalY + 15
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('Model Comparison', 20, finalY)
    
    const comparisonTable = [
      ['Model', 'Accuracy', 'F1 Score', 'Precision', 'Recall'],
      ['RNN Baseline', '75.0%', '72.0%', '73.0%', '71.0%'],
      ['LSTM + Attention', '89.0%', '87.0%', '88.0%', '86.0%'],
      ['Liquid Neural Net', '92.0%', '91.0%', '90.0%', '92.0%'],
    ]
    
    doc.autoTable({
      startY: finalY + 5,
      head: [comparisonTable[0]],
      body: comparisonTable.slice(1),
      theme: 'grid',
      headStyles: { fillColor: secondaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 4, halign: 'center' },
      columnStyles: {
        0: { fontStyle: 'bold', halign: 'left' }
      }
    })
    
    // Feature Importance
    finalY = doc.lastAutoTable.finalY + 15
    if (finalY > 250) {
      doc.addPage()
      finalY = 20
    }
    
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('Feature Importance', 20, finalY)
    
    const featureTable = [
      ['Feature', 'Importance', 'Impact'],
      ['Temperatura Actual', '28%', 'High'],
      ['Humedad Relativa', '24%', 'High'],
      ['Presión Atmosférica', '21%', 'Medium'],
      ['Velocidad del Viento', '15%', 'Medium'],
      ['Estación del Año', '12%', 'Low'],
    ]
    
    doc.autoTable({
      startY: finalY + 5,
      head: [featureTable[0]],
      body: featureTable.slice(1),
      theme: 'striped',
      headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 80 },
        1: { halign: 'center', cellWidth: 40 },
        2: { halign: 'center', cellWidth: 40 }
      }
    })
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text(`Nimbus © 2026 - Galapagos Science Center`, 20, 285)
      doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: 'right' })
    }
    
    // Guardar PDF
    doc.save(`Nimbus_ML_Report_${modelName}_${new Date().toISOString().split('T')[0]}.pdf`)
    
    setExportStatus('success')
    setTimeout(() => setExportStatus(null), 3000)
  }

  const handleRetraining = () => {
    setRetrainingStatus('started')
    setTimeout(() => {
      setRetrainingStatus(null)
    }, 5000)
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
        {/* Header with Export Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light mb-1">
              Model Performance Overview
            </h2>
            <p className="text-nimbus-dark/70 dark:text-nimbus-light/70">
              Select a model to view detailed metrics and comparisons
            </p>
          </div>
          <button
            onClick={exportToPDF}
            disabled={exportStatus === 'exporting'}
            className="flex items-center space-x-2 bg-nimbus-blue hover:bg-nimbus-dark dark:bg-nimbus-cream dark:hover:bg-nimbus-light text-white dark:text-nimbus-dark px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
          >
            {exportStatus === 'exporting' ? (
              <>
                <FileDown className="w-5 h-5 animate-bounce" />
                <span>{t.exporting}</span>
              </>
            ) : exportStatus === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>{t.exported}</span>
              </>
            ) : (
              <>
                <FileDown className="w-5 h-5" />
                <span>{t.exportToPDF}</span>
              </>
            )}
          </button>
        </div>

        {/* Model Selector */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            Select Model Architecture
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'rnn', name: 'RNN Baseline', icon: Database },
              { id: 'lstm', name: 'LSTM + Attention', icon: Brain, badge: 'Production' },
              { id: 'lnn', name: 'Liquid Neural Network', icon: TrendingUp, badge: 'Frontier' }
            ].map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`relative p-6 rounded-xl border-2 transition-all ${
                  selectedModel === model.id
                    ? 'border-nimbus-blue bg-nimbus-blue/10 dark:border-nimbus-cream dark:bg-nimbus-cream/10'
                    : 'border-nimbus-cream dark:border-white/10 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
                }`}
              >
                {model.badge && (
                  <span className="absolute -top-2 -right-2 bg-nimbus-blue dark:bg-nimbus-cream text-white dark:text-nimbus-dark text-xs px-2 py-1 rounded-full font-bold">
                    {model.badge}
                  </span>
                )}
                <model.icon className={`w-8 h-8 mb-2 ${selectedModel === model.id ? 'text-nimbus-blue dark:text-nimbus-cream' : 'text-nimbus-dark/50 dark:text-nimbus-light/50'}`} />
                <h3 className="font-bold text-nimbus-dark dark:text-nimbus-light">{model.name}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(metricsData[selectedModel]).map(([key, value]) => (
            <div key={key} className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10">
              <div className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70 mb-2 font-semibold uppercase">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-3xl font-bold text-nimbus-blue dark:text-nimbus-cream">
                {(value * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>

        {/* Model Comparison */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="w-6 h-6 text-nimbus-blue dark:text-nimbus-cream" />
            <h2 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">
              Model Comparison
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#fff8f8' : '#4d6e91'} opacity={0.1} />
              <XAxis dataKey="metric" stroke={darkMode ? '#f1eee8' : '#083559'} />
              <YAxis stroke={darkMode ? '#f1eee8' : '#083559'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#083559' : '#fff8f8',
                  border: '1px solid #4d6e91',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="RNN" fill="#9ca3af" />
              <Bar dataKey="LSTM" fill="#4d6e91" />
              <Bar dataKey="LNN" fill="#083559" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Feature Importance */}
          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6 text-nimbus-blue dark:text-nimbus-cream" />
              <h2 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">
                Feature Importance
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#fff8f8' : '#4d6e91'} opacity={0.1} />
                <XAxis type="number" stroke={darkMode ? '#f1eee8' : '#083559'} />
                <YAxis dataKey="name" type="category" stroke={darkMode ? '#f1eee8' : '#083559'} width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#083559' : '#fff8f8',
                    border: '1px solid #4d6e91',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="importance" fill="#4d6e91" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Confusion Matrix */}
          <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10">
            <div className="flex items-center space-x-2 mb-6">
              <AlertCircle className="w-6 h-6 text-nimbus-blue dark:text-nimbus-cream" />
              <h2 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">
                Confusion Matrix
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {confusionMatrix.map((cell, idx) => (
                <div
                  key={idx}
                  className="aspect-square flex flex-col items-center justify-center rounded-lg border border-nimbus-cream dark:border-white/10"
                  style={{ backgroundColor: getColor(cell.value) }}
                >
                  <div className="text-xs text-nimbus-dark dark:text-nimbus-light opacity-70">
                    {cell.actual} → {cell.predicted}
                  </div>
                  <div className="text-2xl font-bold text-nimbus-dark dark:text-nimbus-light">
                    {cell.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prediction vs Reality */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <LineChart className="w-6 h-6 text-nimbus-blue dark:text-nimbus-cream" />
            <h2 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">
              Prediction vs Reality (Walk-Forward Validation)
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLine data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#fff8f8' : '#4d6e91'} opacity={0.1} />
              <XAxis dataKey="hour" stroke={darkMode ? '#f1eee8' : '#083559'} />
              <YAxis stroke={darkMode ? '#f1eee8' : '#083559'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#083559' : '#fff8f8',
                  border: '1px solid #4d6e91',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="real" stroke="#083559" strokeWidth={2} name="Real" />
              <Line type="monotone" dataKey="predicted" stroke="#4d6e91" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            </RechartsLine>
          </ResponsiveContainer>
        </div>

        {/* Retraining Panel */}
        <div className="bg-gradient-to-r from-nimbus-blue to-nimbus-dark p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Model Retraining</h2>
              <p className="text-white/80">Last trained: 2h ago • Next scheduled: 6h</p>
            </div>
            <button 
              onClick={handleRetraining}
              className="flex items-center space-x-2 bg-white hover:bg-nimbus-cream text-nimbus-dark px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={retrainingStatus === 'started'}
            >
              {retrainingStatus === 'started' ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Retraining Started!</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  <span>Trigger Retraining</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardMLExpert
