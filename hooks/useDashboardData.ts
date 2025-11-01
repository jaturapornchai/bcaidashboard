'use client';

import { useState, useEffect, useCallback } from 'react';

interface DashboardData {
  sales: any[];
  channels: any[];
  products: any[];
  regions: any[];
  newCustomers: any[];
  stats: {
    totalRevenue: number;
    totalCustomers: number;
    monthlyGrowth: number;
    topProduct: string;
  };
  lastUpdated: string;
}

interface UseDashboardDataReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  lastUpdated: Date | null;
}

export function useDashboardData(): UseDashboardDataReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: { revalidate: 60 }, // Cache for 60 seconds
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการดึงข้อมูล');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    lastUpdated,
  };
}

// Hook สำหรับการติดตามการเปลี่ยนแปลงข้อมูล
export function useDataStreaming() {
  const [isStreaming, setIsStreaming] = useState(false);

  const startStreaming = useCallback(() => {
    setIsStreaming(true);
    // จำลองการ stream ข้อมูลใหม่ทุก 5 วินาที
    const interval = setInterval(() => {
      // ส่ง custom event เพื่อให้หน้าเว็บอัปเดต
      window.dispatchEvent(new CustomEvent('dashboardUpdate'));
    }, 5000);

    return () => {
      clearInterval(interval);
      setIsStreaming(false);
    };
  }, []);

  return { isStreaming, startStreaming };
}

// Hook สำหรับการจัดการ cache
export function useDashboardCache() {
  const [cache, setCache] = useState<Map<string, { data: any; timestamp: number }>>(new Map());

  const setCachedData = useCallback((key: string, data: any, ttl: number = 300000) => { // 5 minutes default
    const timestamp = Date.now();
    setCache(prev => new Map(prev.set(key, { data, timestamp })));
  }, []);

  const getCachedData = useCallback((key: string, ttl: number = 300000) => {
    const cached = cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > ttl;
    if (isExpired) {
      setCache(prev => {
        const newCache = new Map(prev);
        newCache.delete(key);
        return newCache;
      });
      return null;
    }

    return cached.data;
  }, [cache]);

  const clearCache = useCallback(() => {
    setCache(new Map());
  }, []);

  return {
    setCachedData,
    getCachedData,
    clearCache,
    cacheSize: cache.size,
  };
}