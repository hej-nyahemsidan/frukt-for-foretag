import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and if browser supports Performance Observer
    if (process.env.NODE_ENV !== 'production' || !('PerformanceObserver' in window)) {
      return;
    }

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Track metrics for analytics
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
          // Send to analytics: analytics.track('performance_lcp', { value: entry.startTime });
        }
        
        if (entry.entryType === 'first-input') {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
          // Send to analytics: analytics.track('performance_fid', { value: (entry as any).processingStart - entry.startTime });
        }
        
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          console.log('CLS:', (entry as any).value);
          // Send to analytics: analytics.track('performance_cls', { value: (entry as any).value });
        }
      }
    });

    // Observe all Core Web Vitals
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      console.warn('Performance Observer not fully supported');
    }

    // Monitor navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          const loadTime = perfData.loadEventEnd - perfData.fetchStart;
          const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.fetchStart;
          
          console.log('Page Load Time:', loadTime);
          console.log('DOM Content Loaded:', domContentLoaded);
          
          // Send to analytics
          // analytics.track('performance_load', { loadTime, domContentLoaded });
        }
      }, 0);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;