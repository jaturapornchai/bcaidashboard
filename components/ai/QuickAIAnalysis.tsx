'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TTSPlayer } from './ElevenLabsTTS';
import { Loader2 } from 'lucide-react';
import { salesData, channelData, productData, regionData } from '@/data/mockData';

interface QuickAIAnalysisProps {
  analysisType: string;
}

export function QuickAIAnalysis({ analysisType }: QuickAIAnalysisProps) {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runAnalysis = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      // สร้างข้อมูลธุรกิจตามประเภทการวิเคราะห์
      const getBusinessDataByType = (type: string) => {
        switch (type) {
          case 'sales':
            return {
              salesData: salesData,
              summary: {
                totalSales: salesData.reduce((sum, month) => sum + month.ยอดขาย, 0),
                avgSales: Math.round(salesData.reduce((sum, month) => sum + month.ยอดขาย, 0) / salesData.length),
                bestMonth: salesData.reduce((best, month) => month.ยอดขาย > best.ยอดขาย ? month : best),
                growth: ((salesData[salesData.length - 1].ยอดขาย - salesData[0].ยอดขาย) / salesData[0].ยอดขาย * 100).toFixed(1)
              }
            };
          case 'revenue':
            return {
              salesData: salesData,
              summary: {
                totalRevenue: salesData.reduce((sum, month) => sum + month.รายได้, 0),
                avgRevenue: Math.round(salesData.reduce((sum, month) => sum + month.รายได้, 0) / salesData.length),
                bestRevenueMonth: salesData.reduce((best, month) => month.รายได้ > best.รายได้ ? month : best)
              }
            };
          case 'customers':
            return {
              salesData: salesData,
              channelData: channelData,
              summary: {
                totalCustomers: salesData.reduce((sum, month) => sum + month.ลูกค้า, 0),
                avgCustomers: Math.round(salesData.reduce((sum, month) => sum + month.ลูกค้า, 0) / salesData.length)
              }
            };
          case 'products':
            return {
              productData: productData,
              summary: {
                totalProducts: productData.reduce((sum, product) => sum + product.จำนวนที่ขาย, 0),
                topProduct: productData[0],
                avgProfit: Math.round(productData.reduce((sum, product) => sum + product.กำไร, 0) / productData.length)
              }
            };
          case 'regions':
            return {
              regionData: regionData,
              summary: {
                totalRevenue: regionData.reduce((sum, region) => sum + region.ยอดขาย, 0),
                totalTarget: regionData.reduce((sum, region) => sum + region.เป้าหมาย, 0),
                bestRegion: regionData.reduce((best, region) => (region.ยอดขาย / region.เป้าหมาย) > (best.ยอดขาย / best.เป้าหมาย) ? region : best)
              }
            };
          default:
            return { salesData, channelData, productData, regionData };
        }
      };

      const businessData = getBusinessDataByType(analysisType);
      
      console.log(`Running ${analysisType} analysis with data:`, businessData);

      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisType,
          businessData,
          message: `วิเคราะห์${getAnalysisTitle(analysisType)}`
        })
      });

      console.log('API Response status:', response.status);
      
      const data = await response.json();
      console.log('API Response data:', data);

      if (data.success) {
        setResult({
          content: data.response,
          timestamp: data.timestamp,
          isError: false
        });
      } else {
        setResult({
          content: data.error || 'เกิดข้อผิดพลาดในการวิเคราะห์',
          timestamp: new Date().toISOString(),
          isError: true
        });
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setResult({
        content: `ไม่สามารถเชื่อมต่อกับ AI ได้: ${error instanceof Error ? error.message : 'Unknown error'} กรุณาลองใหม่อีกครั้ง`,
        timestamp: new Date().toISOString(),
        isError: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAnalysisTitle = (type: string): string => {
    const titles: Record<string, string> = {
      'sales': 'ยอดขาย',
      'revenue': 'รายได้',
      'customers': 'ลูกค้า',
      'products': 'สินค้า',
      'regions': 'ตามภาค'
    };
    return titles[type] || type;
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={runAnalysis}
        disabled={isLoading}
        className="w-full"
        size="sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            กำลังวิเคราะห์...
          </>
        ) : (
          `วิเคราะห์${getAnalysisTitle(analysisType)}`
        )}
      </Button>

      {result && (
        <div className={`p-3 rounded-lg text-sm ${result.isError ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
          {result.isError ? (
            <div className="text-red-600">{result.content}</div>
          ) : (
            <div className="text-gray-700">
              <div
                dangerouslySetInnerHTML={{
                  __html: result.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                }}
              />
              <div className="mt-3 border-t pt-2">
                <TTSPlayer text={result.content} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}