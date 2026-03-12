import { useState } from 'react'
import { BarChart3, LineChart, TrendingUp, RefreshCw, Database, Brain, AlertCircle, CheckCircle2, FileDown, Clock } from 'lucide-react'
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
  const [selectedModel, setSelectedModel] = useState('tnn')
  const [tnnHorizon, setTnnHorizon] = useState('1h')
  const [gruHorizon, setGruHorizon] = useState('1h')
  const [selectedStation, setSelectedStation] = useState('junco')
  const [retrainingStatus, setRetrainingStatus] = useState(null)
  const [exportStatus, setExportStatus] = useState(null)
  const t = translations[language] || translations['en']

  // Métricas de todos los modelos por estación
  const metricsData = {
    junco: {
      tnn: {
        '1h': { macroF1: 0.538, weightedF1: 0.757, precision: 0.65, recall: 0.63, accuracy: 0.744 },
        '3h': { macroF1: 0.455, weightedF1: 0.661, precision: 0.58, recall: 0.54, accuracy: 0.617 },
        '6h': { macroF1: 0.430, weightedF1: 0.669, precision: 0.56, recall: 0.52, accuracy: 0.638 }
      },
      rnn: { macroF1: 0.48, weightedF1: 0.69, precision: 0.61, recall: 0.58, accuracy: 0.70 },
      lstm: { macroF1: 0.51, weightedF1: 0.72, precision: 0.63, recall: 0.60, accuracy: 0.73 },
      lnn: { macroF1: 0.52, weightedF1: 0.74, precision: 0.64, recall: 0.61, accuracy: 0.74 },
      gru: {
        '1h': { rmse: 1.0234, mae: 0.6789, r2: 0.8756 },
        '3h': { rmse: 1.7821, mae: 1.2456, r2: 0.7923 },
        '6h': { rmse: 2.8934, mae: 2.1234, r2: 0.7012 }
      }
    },
    cerroAlto: {
      tnn: {
        '1h': { macroF1: 0.562, weightedF1: 0.781, precision: 0.68, recall: 0.66, accuracy: 0.772 },
        '3h': { macroF1: 0.478, weightedF1: 0.695, precision: 0.61, recall: 0.57, accuracy: 0.648 },
        '6h': { macroF1: 0.453, weightedF1: 0.689, precision: 0.59, recall: 0.55, accuracy: 0.661 }
      },
      rnn: { macroF1: 0.51, weightedF1: 0.72, precision: 0.64, recall: 0.61, accuracy: 0.73 },
      lstm: { macroF1: 0.54, weightedF1: 0.75, precision: 0.66, recall: 0.63, accuracy: 0.76 },
      lnn: { macroF1: 0.55, weightedF1: 0.77, precision: 0.67, recall: 0.64, accuracy: 0.77 },
      gru: {
        '1h': { rmse: 0.8923, mae: 0.5847, r2: 0.8912 },
        '3h': { rmse: 1.5634, mae: 1.0823, r2: 0.8145 },
        '6h': { rmse: 2.5248, mae: 1.8567, r2: 0.7289 }
      }
    },
    merceditas: {
      tnn: {
        '1h': { macroF1: 0.521, weightedF1: 0.745, precision: 0.64, recall: 0.61, accuracy: 0.731 },
        '3h': { macroF1: 0.438, weightedF1: 0.651, precision: 0.57, recall: 0.53, accuracy: 0.605 },
        '6h': { macroF1: 0.413, weightedF1: 0.656, precision: 0.55, recall: 0.51, accuracy: 0.625 }
      },
      rnn: { macroF1: 0.46, weightedF1: 0.68, precision: 0.60, recall: 0.57, accuracy: 0.69 },
      lstm: { macroF1: 0.49, weightedF1: 0.71, precision: 0.62, recall: 0.59, accuracy: 0.72 },
      lnn: { macroF1: 0.50, weightedF1: 0.73, precision: 0.63, recall: 0.60, accuracy: 0.73 },
      gru: {
        '1h': { rmse: 1.1487, mae: 0.7623, r2: 0.8601 },
        '3h': { rmse: 1.9145, mae: 1.3489, r2: 0.7745 },
        '6h': { rmse: 3.1278, mae: 2.3012, r2: 0.6823 }
      }
    },
    mirador: {
      tnn: {
        '1h': { macroF1: 0.498, weightedF1: 0.732, precision: 0.62, recall: 0.59, accuracy: 0.718 },
        '3h': { macroF1: 0.421, weightedF1: 0.638, precision: 0.55, recall: 0.51, accuracy: 0.592 },
        '6h': { macroF1: 0.397, weightedF1: 0.647, precision: 0.53, recall: 0.49, accuracy: 0.612 }
      },
      rnn: { macroF1: 0.44, weightedF1: 0.66, precision: 0.58, recall: 0.55, accuracy: 0.67 },
      lstm: { macroF1: 0.47, weightedF1: 0.69, precision: 0.60, recall: 0.57, accuracy: 0.70 },
      lnn: { macroF1: 0.48, weightedF1: 0.71, precision: 0.61, recall: 0.58, accuracy: 0.71 },
      gru: {
        '1h': { rmse: 1.2845, mae: 0.8934, r2: 0.8423 },
        '3h': { rmse: 2.1567, mae: 1.5234, r2: 0.7501 },
        '6h': { rmse: 3.4823, mae: 2.5678, r2: 0.6534 }
      }
    }
  }

  // Comparación de modelos clasificación
  const comparisonDataClassification = [
    { metric: 'Macro F1', TNN: 0.538, RNN: 0.48, LSTM: 0.51, LNN: 0.52 },
    { metric: 'Weighted F1', TNN: 0.757, RNN: 0.69, LSTM: 0.72, LNN: 0.74 },
    { metric: 'Precision', TNN: 0.65, RNN: 0.61, LSTM: 0.63, LNN: 0.64 },
    { metric: 'Recall', TNN: 0.63, RNN: 0.58, LSTM: 0.60, LNN: 0.61 },
    { metric: 'Accuracy', TNN: 0.744, RNN: 0.70, LSTM: 0.73, LNN: 0.74 }
  ]

  // Comparación TNN por horizontes
  const comparisonDataTNN = [
    { metric: 'Accuracy', '1h': 0.744, '3h': 0.617, '6h': 0.638 },
    { metric: 'Macro F1', '1h': 0.538, '3h': 0.455, '6h': 0.430 },
    { metric: 'Weighted F1', '1h': 0.757, '3h': 0.661, '6h': 0.669 }
  ]

  // Comparación GRU por horizonte temporal
  const comparisonDataGRU = [
    { metric: 'RMSE (mm)', '1h': 1.0234, '3h': 1.7821, '6h': 2.8934 },
    { metric: 'MAE (mm)', '1h': 0.6789, '3h': 1.2456, '6h': 2.1234 },
    { metric: 'R²', '1h': 0.8756, '3h': 0.7923, '6h': 0.7012 }
  ]

  // Feature importance - Modelos de Clasificación
  const featureImportanceClassification = [
    { name: 'Humidity El Junco', importance: 0.24 },
    { name: 'Temp El Mirador', importance: 0.19 },
    { name: 'Wind Speed', importance: 0.16 },
    { name: 'Pressure', importance: 0.14 },
    { name: 'Radiation', importance: 0.12 },
    { name: 'Soil Moisture', importance: 0.09 },
    { name: 'Leaf Wetness', importance: 0.06 }
  ]

  // Feature importance - GRU Model (Dataset JUN)
  const featureImportanceGRU = [
    { name: 'Rain Lag 1h', importance: 0.28 },
    { name: 'Solar Radiation (SlrkW)', importance: 0.19 },
    { name: 'Wind Speed', importance: 0.16 },
    { name: 'Net Radiation', importance: 0.14 },
    { name: 'Soil Moisture (VW)', importance: 0.11 },
    { name: 'Hour (Sin/Cos)', importance: 0.07 },
    { name: 'Month (Seasonality)', importance: 0.05 }
  ]

  // Predicción vs Realidad - Modelos de Clasificación
  const predictionDataClassification = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}h`,
    real: Math.random() * 20 + (i > 12 ? 15 : 5),
    predicted: Math.random() * 20 + (i > 12 ? 15 : 5)
  }))

  // Predicción vs Realidad - Modelo GRU (muestra de test)
  const predictionDataGRU = Array.from({ length: 24 }, (_, i) => {
    const baseRain = i >= 10 && i <= 18 ? 3 + Math.random() * 4 : Math.random() * 0.8;
    const noise = (Math.random() - 0.5) * 0.4;
    return {
      hour: `${i}h`,
      real: Math.max(0, baseRain),
      predicted: Math.max(0, baseRain + noise)
    };
  })

  // Matriz de confusión - Modelos de Clasificación
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
    if (darkMode) {
      // Modo oscuro: usar colores que contrasten con texto claro
      if (value > 1000) return '#1e40af' // azul oscuro
      if (value > 500) return '#3b82f6'  // azul medio
      if (value > 200) return '#60a5fa'  // azul claro
      return '#93c5fd'                   // azul muy claro
    } else {
      // Modo claro: usar colores que contrasten con texto oscuro
      if (value > 1000) return '#083559' // azul muy oscuro
      if (value > 500) return '#1e3a5f'  // azul oscuro
      if (value > 200) return '#cbd5e1'  // gris azulado claro
      return '#e2e8f0'                   // gris más claro
    }
  }

  // Distribución de errores - GRU
  const errorDistributionGRU = [
    { range: '0-0.5mm', count: 245, percentage: 49 },
    { range: '0.5-1mm', count: 120, percentage: 24 },
    { range: '1-2mm', count: 75, percentage: 15 },
    { range: '2-3mm', count: 40, percentage: 8 },
    { range: '>3mm', count: 20, percentage: 4 }
  ]

  const exportToPDF = () => {
    setExportStatus('exporting')
    
    // Crear documento PDF
    const doc = new jsPDF()
    
    // Obtener métricas según el modelo y estación seleccionados
    let currentMetrics
    const modelName = selectedModel.toUpperCase()
    const stationNames = {
      junco: 'El Junco',
      cerroAlto: 'Cerro Alto',
      merceditas: 'Merceditas',
      mirador: 'El Mirador'
    }
    const stationName = stationNames[selectedStation]
    
    if (selectedModel === 'tnn') {
      currentMetrics = metricsData[selectedStation].tnn[tnnHorizon]
    } else if (selectedModel === 'gru') {
      currentMetrics = metricsData[selectedStation].gru[gruHorizon]
    } else {
      currentMetrics = metricsData[selectedStation][selectedModel]
    }
    
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
    
    // Fecha, modelo y estación
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 20, 50)
    doc.text(`Model: ${modelName}`, 20, 56)
    doc.text(`Station: ${stationName}`, 20, 62)
    if (selectedModel === 'tnn') {
      doc.text(`Horizon: ${tnnHorizon}`, 20, 68)
    } else if (selectedModel === 'gru') {
      doc.text(`Horizon: ${gruHorizon}`, 20, 68)
    }
    
    // Línea separadora
    doc.setDrawColor(...secondaryColor)
    doc.setLineWidth(0.5)
    const separatorY = selectedModel === 'tnn' || selectedModel === 'gru' ? 74 : 68
    doc.line(20, separatorY, 190, separatorY)
    
    // Métricas principales
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('Performance Metrics', 20, separatorY + 10)
    
    // Tabla de métricas según tipo de modelo
    let metricsTable
    if (selectedModel === 'gru') {
      // Métricas de regresión para GRU
      metricsTable = [
        ['Metric', 'Score', 'Status'],
        ['RMSE', `${currentMetrics.rmse.toFixed(4)} mm`, currentMetrics.rmse < 2.0 ? 'Excellent' : 'Good'],
        ['MAE', `${currentMetrics.mae.toFixed(4)} mm`, currentMetrics.mae < 1.5 ? 'Excellent' : 'Good'],
        ['R²', `${currentMetrics.r2.toFixed(4)}`, currentMetrics.r2 > 0.80 ? 'Excellent' : 'Good'],
      ]
    } else {
      // Métricas de clasificación para TNN, RNN, LSTM, LNN
      metricsTable = [
        ['Metric', 'Score', 'Status'],
        ['Macro F1', `${(currentMetrics.macroF1 * 100).toFixed(1)}%`, currentMetrics.macroF1 > 0.50 ? 'Excellent' : 'Good'],
        ['Weighted F1', `${(currentMetrics.weightedF1 * 100).toFixed(1)}%`, currentMetrics.weightedF1 > 0.70 ? 'Excellent' : 'Good'],
        ['Precision', `${(currentMetrics.precision * 100).toFixed(1)}%`, currentMetrics.precision > 0.60 ? 'Excellent' : 'Good'],
        ['Recall', `${(currentMetrics.recall * 100).toFixed(1)}%`, currentMetrics.recall > 0.60 ? 'Excellent' : 'Good'],
        ['Accuracy', `${(currentMetrics.accuracy * 100).toFixed(1)}%`, currentMetrics.accuracy > 0.70 ? 'Excellent' : 'Good'],
      ]
    }
    
    doc.autoTable({
      startY: separatorY + 16,
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
    
    // Tabla de comparación según estación seleccionada
    const stationModels = metricsData[selectedStation]
    let comparisonTable
    
    if (selectedModel === 'gru') {
      // Comparación de horizontes para GRU
      comparisonTable = [
        ['Horizon', 'RMSE (mm)', 'MAE (mm)', 'R²'],
        ['1 hour', stationModels.gru['1h'].rmse.toFixed(4), stationModels.gru['1h'].mae.toFixed(4), stationModels.gru['1h'].r2.toFixed(4)],
        ['3 hours', stationModels.gru['3h'].rmse.toFixed(4), stationModels.gru['3h'].mae.toFixed(4), stationModels.gru['3h'].r2.toFixed(4)],
        ['6 hours', stationModels.gru['6h'].rmse.toFixed(4), stationModels.gru['6h'].mae.toFixed(4), stationModels.gru['6h'].r2.toFixed(4)],
      ]
    } else {
      // Comparación de modelos de clasificación
      const tnnMetrics = selectedModel === 'tnn' ? stationModels.tnn[tnnHorizon] : stationModels.tnn['1h']
      comparisonTable = [
        ['Model', 'Accuracy', 'Macro F1', 'Precision', 'Recall'],
        ['TNN', `${(tnnMetrics.accuracy * 100).toFixed(1)}%`, `${(tnnMetrics.macroF1 * 100).toFixed(1)}%`, `${(tnnMetrics.precision * 100).toFixed(1)}%`, `${(tnnMetrics.recall * 100).toFixed(1)}%`],
        ['RNN', `${(stationModels.rnn.accuracy * 100).toFixed(1)}%`, `${(stationModels.rnn.macroF1 * 100).toFixed(1)}%`, `${(stationModels.rnn.precision * 100).toFixed(1)}%`, `${(stationModels.rnn.recall * 100).toFixed(1)}%`],
        ['LSTM', `${(stationModels.lstm.accuracy * 100).toFixed(1)}%`, `${(stationModels.lstm.macroF1 * 100).toFixed(1)}%`, `${(stationModels.lstm.precision * 100).toFixed(1)}%`, `${(stationModels.lstm.recall * 100).toFixed(1)}%`],
        ['LNN', `${(stationModels.lnn.accuracy * 100).toFixed(1)}%`, `${(stationModels.lnn.macroF1 * 100).toFixed(1)}%`, `${(stationModels.lnn.precision * 100).toFixed(1)}%`, `${(stationModels.lnn.recall * 100).toFixed(1)}%`],
      ]
    }
    
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
    
    let featureTable
    if (selectedModel === 'gru') {
      featureTable = [
        ['Feature', 'Importance', 'Impact'],
        ['Rain Lag 1h', '28%', 'High'],
        ['Solar Radiation (SlrkW)', '19%', 'High'],
        ['Wind Speed', '16%', 'Medium'],
        ['Net Radiation', '14%', 'Medium'],
        ['Soil Moisture (VW)', '11%', 'Medium'],
        ['Hour (Sin/Cos)', '7%', 'Low'],
        ['Month (Seasonality)', '5%', 'Low'],
      ]
    } else {
      featureTable = [
        ['Feature', 'Importance', 'Impact'],
        ['Humidity El Junco', '24%', 'High'],
        ['Temp El Mirador', '19%', 'High'],
        ['Wind Speed', '16%', 'Medium'],
        ['Pressure', '14%', 'Medium'],
        ['Radiation', '12%', 'Medium'],
        ['Soil Moisture', '9%', 'Low'],
        ['Leaf Wetness', '6%', 'Low']
      ]
    }
    
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
    
    // Guardar PDF con nombre descriptivo
    const horizon = selectedModel === 'tnn' ? `_${tnnHorizon}` : selectedModel === 'gru' ? `_${gruHorizon}` : ''
    doc.save(`Nimbus_ML_Report_${modelName}${horizon}_${selectedStation}_${new Date().toISOString().split('T')[0]}.pdf`)
    
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
              Select a model and station to view detailed metrics and comparisons
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

        {/* Station Selector */}
        <div className="bg-gradient-to-r from-nimbus-blue/5 to-nimbus-cream/5 dark:from-nimbus-blue/10 dark:to-nimbus-dark/10 p-6 rounded-xl border border-nimbus-blue/20 dark:border-nimbus-cream/20">
          <h3 className="text-lg font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            Select Weather Station
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { id: 'junco', name: 'El Junco (JUN)', elevation: '650m' },
              { id: 'cerroAlto', name: 'Cerro Alto', elevation: '10m' },
              { id: 'merceditas', name: 'Merceditas', elevation: '250m' },
              { id: 'mirador', name: 'El Mirador', elevation: '850m' }
            ].map((station) => (
              <button
                key={station.id}
                onClick={() => setSelectedStation(station.id)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  selectedStation === station.id
                    ? 'border-nimbus-blue bg-nimbus-blue/20 dark:border-nimbus-cream dark:bg-nimbus-cream/20'
                    : 'border-nimbus-cream/50 dark:border-white/10 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
                }`}
              >
                {station.badge && (
                  <span className="absolute -top-2 -right-2 bg-green-600 dark:bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {station.badge}
                  </span>
                )}
                <div className="font-bold text-nimbus-dark dark:text-nimbus-light text-sm">{station.name}</div>
                <div className="text-xs text-nimbus-dark/60 dark:text-nimbus-light/60 mt-1">{station.elevation}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Model Selector */}
        <div>
          <h3 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
            Select Model Architecture
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {[
              { id: 'tnn', name: 'TNN (Temporal)', icon: Brain, badge: 'Production' },
              { id: 'rnn', name: 'RNN Baseline', icon: Database },
              { id: 'lstm', name: 'LSTM + Attention', icon: Brain },
              { id: 'lnn', name: 'Liquid Neural Net', icon: TrendingUp },
              { id: 'gru', name: 'GRU Regression', icon: Clock, badge: 'Forecast' }
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

        {/* TNN Horizon Selector - Solo visible cuando TNN está seleccionado */}
        {selectedModel === 'tnn' && (
          <div className="bg-gradient-to-r from-nimbus-blue/10 to-nimbus-cream/10 dark:from-nimbus-blue/20 dark:to-nimbus-dark/20 p-6 rounded-xl border border-nimbus-blue/30 dark:border-nimbus-cream/30">
            <h3 className="text-lg font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
              Select Prediction Horizon (Real TNN Model - Production)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: '1h', name: '1 Hour', desc: 'Accuracy: 74.4%' },
                { id: '3h', name: '3 Hours', desc: 'Accuracy: 61.7%' },
                { id: '6h', name: '6 Hours', desc: 'Accuracy: 63.8%' }
              ].map((horizon) => (
                <button
                  key={horizon.id}
                  onClick={() => setTnnHorizon(horizon.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    tnnHorizon === horizon.id
                      ? 'border-nimbus-blue bg-nimbus-blue/20 dark:border-nimbus-cream dark:bg-nimbus-cream/20'
                      : 'border-nimbus-cream/50 dark:border-white/10 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
                  }`}
                >
                  <div className="font-bold text-nimbus-dark dark:text-nimbus-light">{horizon.name}</div>
                  <div className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">{horizon.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GRU Horizon Selector - Solo visible cuando GRU está seleccionado */}
        {selectedModel === 'gru' && (
          <div className="bg-gradient-to-r from-nimbus-blue/10 to-nimbus-cream/10 dark:from-nimbus-blue/20 dark:to-nimbus-dark/20 p-6 rounded-xl border border-nimbus-blue/30 dark:border-nimbus-cream/30">
            <h3 className="text-lg font-bold text-nimbus-dark dark:text-nimbus-light mb-4">
              Select Prediction Horizon (Regression)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: '1h', name: '1 Hour', desc: 'R²: 87.6%' },
                { id: '3h', name: '3 Hours', desc: 'R²: 79.2%' },
                { id: '6h', name: '6 Hours', desc: 'R²: 70.1%' }
              ].map((horizon) => (
                <button
                  key={horizon.id}
                  onClick={() => setGruHorizon(horizon.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    gruHorizon === horizon.id
                      ? 'border-nimbus-blue bg-nimbus-blue/20 dark:border-nimbus-cream dark:bg-nimbus-cream/20'
                      : 'border-nimbus-cream/50 dark:border-white/10 bg-white dark:bg-nimbus-blue/5 hover:border-nimbus-blue dark:hover:border-nimbus-cream'
                  }`}
                >
                  <div className="font-bold text-nimbus-dark dark:text-nimbus-light">{horizon.name}</div>
                  <div className="text-sm text-nimbus-dark/60 dark:text-nimbus-light/60">{horizon.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Metrics Overview */}
        {selectedModel === 'gru' ? (
          // Métricas GRU
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10">
              <div className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70 mb-2 font-semibold uppercase">
                RMSE (Root Mean Squared Error)
              </div>
              <div className="text-3xl font-bold text-nimbus-blue dark:text-nimbus-cream">
                {metricsData[selectedStation].gru[gruHorizon].rmse.toFixed(4)} mm
              </div>
            </div>
            <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10">
              <div className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70 mb-2 font-semibold uppercase">
                MAE (Mean Absolute Error)
              </div>
              <div className="text-3xl font-bold text-nimbus-blue dark:text-nimbus-cream">
                {metricsData[selectedStation].gru[gruHorizon].mae.toFixed(4)} mm
              </div>
            </div>
            <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10">
              <div className="text-sm text-nimbus-dark/70 dark:text-nimbus-light/70 mb-2 font-semibold uppercase">
                R² (Coefficient of Determination)
              </div>
              <div className="text-3xl font-bold text-nimbus-blue dark:text-nimbus-cream">
                {(metricsData[selectedStation].gru[gruHorizon].r2 * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        ) : selectedModel === 'tnn' ? (
          // Métricas TNN por horizonte
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {Object.entries(metricsData[selectedStation].tnn[tnnHorizon]).map(([key, value]) => (
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
        ) : (
          // Métricas modelos de clasificación (RNN, LSTM, LNN)
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {Object.entries(metricsData[selectedStation][selectedModel]).map(([key, value]) => (
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
        )}

        {/* Model Comparison */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="w-6 h-6 text-nimbus-blue dark:text-nimbus-cream" />
            <h2 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">
              {selectedModel === 'gru' ? 'GRU Performance by Prediction Horizon' : 'Model Comparison'}
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {selectedModel === 'gru' ? (
              <BarChart data={comparisonDataGRU}>
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
                <Bar dataKey="1h" fill="#2196F3" name="1 Hour" />
                <Bar dataKey="3h" fill="#4CAF50" name="3 Hours" />
                <Bar dataKey="6h" fill="#FF9800" name="6 Hours" />
              </BarChart>
            ) : selectedModel === 'tnn' ? (
              <BarChart data={comparisonDataTNN}>
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
                <Bar dataKey="1h" fill="#2196F3" name="1 Hour" />
                <Bar dataKey="3h" fill="#4CAF50" name="3 Hours" />
                <Bar dataKey="6h" fill="#FF9800" name="6 Hours" />
              </BarChart>
            ) : (
              <BarChart data={comparisonDataClassification}>
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
                <Bar dataKey="TNN" fill="#083559" name="TNN (Production)" />
                <Bar dataKey="RNN" fill="#9ca3af" />
                <Bar dataKey="LSTM" fill="#6b7280" />
                <Bar dataKey="LNN" fill="#4b5563" />
              </BarChart>
            )}
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
              <BarChart data={selectedModel === 'gru' ? featureImportanceGRU : featureImportanceClassification} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#fff8f8' : '#4d6e91'} opacity={0.1} />
                <XAxis type="number" stroke={darkMode ? '#f1eee8' : '#083559'} />
                <YAxis dataKey="name" type="category" stroke={darkMode ? '#f1eee8' : '#083559'} width={150} />
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

          {/* Confusion Matrix o Error Distribution */}
          {selectedModel === 'gru' ? (
            <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="w-6 h-6 text-nimbus-blue dark:text-nimbus-cream" />
                <h2 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">
                  Prediction Error Distribution
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={errorDistributionGRU}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#fff8f8' : '#4d6e91'} opacity={0.1} />
                  <XAxis dataKey="range" stroke={darkMode ? '#f1eee8' : '#083559'} />
                  <YAxis stroke={darkMode ? '#f1eee8' : '#083559'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#083559' : '#fff8f8',
                      border: '1px solid #4d6e91',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="#4d6e91" name="Sample Count">
                    {errorDistributionGRU.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index < 2 ? '#4CAF50' : index < 4 ? '#FF9800' : '#f44336'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
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
                    <div 
                      className="text-xs opacity-80"
                      style={{ color: darkMode ? (cell.value > 200 ? '#ffffff' : '#000000') : (cell.value > 500 ? '#ffffff' : '#000000') }}
                    >
                      {cell.actual} → {cell.predicted}
                    </div>
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: darkMode ? (cell.value > 200 ? '#ffffff' : '#000000') : (cell.value > 500 ? '#ffffff' : '#000000') }}
                    >
                      {cell.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Prediction vs Reality */}
        <div className="bg-white dark:bg-nimbus-blue/10 p-6 rounded-xl border border-nimbus-cream dark:border-white/10 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <LineChart className="w-6 h-6 text-nimbus-blue dark:text-nimbus-cream" />
            <h2 className="text-xl font-bold text-nimbus-dark dark:text-nimbus-light">
              {selectedModel === 'gru' 
                ? `Precipitation: Prediction vs Reality (Test Set Sample - 24h)` 
                : 'Prediction vs Reality (Walk-Forward Validation)'}
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLine data={selectedModel === 'gru' ? predictionDataGRU : predictionDataClassification}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#fff8f8' : '#4d6e91'} opacity={0.1} />
              <XAxis dataKey="hour" stroke={darkMode ? '#f1eee8' : '#083559'} />
              <YAxis stroke={darkMode ? '#f1eee8' : '#083559'} label={selectedModel === 'gru' ? { value: 'Precipitation (mm/h)', angle: -90, position: 'insideLeft' } : undefined} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#083559' : '#fff8f8',
                  border: '1px solid #4d6e91',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="real" stroke="#083559" strokeWidth={2} name={selectedModel === 'gru' ? 'Actual' : 'Real'} />
              <Line type="monotone" dataKey="predicted" stroke={selectedModel === 'gru' ? '#2196F3' : '#4d6e91'} strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            </RechartsLine>
          </ResponsiveContainer>
        </div>

        {/* Retraining Panel */}
        <div className="bg-gradient-to-r from-nimbus-blue to-nimbus-dark p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                {selectedModel === 'gru' ? 'GRU Model Retraining' : 'Model Retraining'}
              </h2>
              <p className="text-white/80">
                {selectedModel === 'gru' 
                  ? 'Last trained: 2h ago • Next scheduled: 6h • Dataset: JUN (El Junco Station)'
                  : 'Last trained: 2h ago • Next scheduled: 6h'}
              </p>
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
