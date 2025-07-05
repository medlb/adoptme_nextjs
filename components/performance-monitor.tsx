'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  cls: number
  lcp: number
  fid: number
  ttfb: number
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p') {
        setIsVisible(!isVisible)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    // Monitor CLS
    let clsValue = 0
    let clsEntries: any[] = []

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'layout-shift') {
          const layoutShiftEntry = entry as any
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value
            clsEntries.push(layoutShiftEntry)
          }
        }
      }
    })

    observer.observe({ entryTypes: ['layout-shift'] })

    // Monitor LCP
    let lcpValue = 0
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      lcpValue = (lastEntry as any).startTime
    })

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // Monitor FID
    let fidValue = 0
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      fidValue = (entries[0] as any).processingStart - (entries[0] as any).startTime
    })

    fidObserver.observe({ entryTypes: ['first-input'] })

    // Monitor TTFB
    const navigationEntry = performance.getEntriesByType('navigation')[0] as any
    const ttfbValue = navigationEntry?.responseStart - navigationEntry?.requestStart || 0

    // Update metrics every second
    const interval = setInterval(() => {
      setMetrics({
        cls: Math.round(clsValue * 1000) / 1000,
        lcp: Math.round(lcpValue),
        fid: Math.round(fidValue),
        ttfb: Math.round(ttfbValue),
      })
    }, 1000)

    return () => {
      observer.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clearInterval(interval)
    }
  }, [isVisible])

  if (!isVisible || !metrics) return null

  const getClsStatus = (cls: number) => {
    if (cls < 0.1) return 'text-green-600'
    if (cls < 0.25) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getLcpStatus = (lcp: number) => {
    if (lcp < 2500) return 'text-green-600'
    if (lcp < 4000) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getFidStatus = (fid: number) => {
    if (fid < 100) return 'text-green-600'
    if (fid < 300) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg z-50 min-w-[200px]">
      <div className="text-sm font-semibold text-gray-800 mb-2">Performance Monitor (Ctrl+P)</div>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getClsStatus(metrics.cls)}>{metrics.cls}</span>
        </div>
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getLcpStatus(metrics.lcp)}>{metrics.lcp}ms</span>
        </div>
        <div className="flex justify-between">
          <span>FID:</span>
          <span className={getFidStatus(metrics.fid)}>{metrics.fid}ms</span>
        </div>
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span>{metrics.ttfb}ms</span>
        </div>
      </div>
    </div>
  )
} 