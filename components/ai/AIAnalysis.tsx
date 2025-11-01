'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TTSPlayer } from './ElevenLabsTTS';
import { Loader2, Brain, TrendingUp, Users, Package, MapPin } from 'lucide-react';

interface AIAnalysisProps {
  businessData: any;
}

export function AIAnalysis({ businessData }: AIAnalysisProps) {
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const analysisTypes = [
    {
      id: 'sales',
      title: 'วิเคราะห์ยอดขาย',
      description: 'AI วิเคราะห์แนวโน้มการขาย และให้คำแนะนำการปรับปรุง',
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      id: 'revenue',
      title: 'วิเคราะห์รายได้',
      description: 'AI วิเคราะห์รายได้ และกลยุทธ์การจัดการการเงิน',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      id: 'customers',
      title: 'วิเคราะห์ลูกค้า',
      description: 'AI วิเคราะห์พฤติกรรมลูกค้า และกลยุทธ์การตลาด',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      id: 'products',
      title: 'วิเคราะห์สินค้า',
      description: 'AI วิเคราะห์สินค้าขายดี และกลยุทธ์การจัดการสินค้า',
      icon: Package,
      color: 'bg-orange-500'
    },
    {
      id: 'regions',
      title: 'วิเคราะห์ตามภาค',
      description: 'AI วิเคราะห์ศักยภาพตามภาค และกลยุทธ์การขยายตลาด',
      icon: MapPin,
      color: 'bg-red-500'
    }
  ];

  const runAnalysis = async (analysisType: string) => {
    setActiveAnalysis(analysisType);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisType,
          businessData,
          message: `วิเคราะห์ข้อมูล ${analysisTypes.find(t => t.id === analysisType)?.title}`
        })
      });

      const result = await response.json();

      if (result.success) {
        setAnalysisResults(prev => ({
          ...prev,
          [analysisType]: {
            content: result.response,
            timestamp: result.timestamp
          }
        }));
      } else {
        setAnalysisResults(prev => ({
          ...prev,
          [analysisType]: {
            content: result.error || 'เกิดข้อผิดพลาดในการวิเคราะห์',
            timestamp: new Date().toISOString(),
            isError: true
          }
        }));
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisResults(prev => ({
        ...prev,
        [analysisType]: {
          content: 'ไม่สามารถเชื่อมต่อกับ AI ได้ กรุณาลองใหม่อีกครั้ง',
          timestamp: new Date().toISOString(),
          isError: true
        }
      }));
    } finally {
      setIsLoading(false);
      setActiveAnalysis(null);
    }
  };

  const hasResult = (analysisId: string) => {
    return analysisResults[analysisId] && !analysisResults[analysisId].isError;
  };

  const getAnalysisIcon = (analysisId: string) => {
    const type = analysisTypes.find(t => t.id === analysisId);
    return type ? type.icon : Brain;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="h-6 w-6 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold">AI ที่ปรึกษาธุรกิจ</h2>
          <p className="text-gray-600">ให้ AI วิเคราะห์ข้อมูลธุรกิจของคุณและให้คำแนะนำ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analysisTypes.map((type) => {
          const Icon = type.icon;
          const isCurrentlyLoading = activeAnalysis === type.id;
          const result = analysisResults[type.id];

          return (
            <Card key={type.id} className="cursor-pointer transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${type.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {hasResult(type.id) && (
                    <div className="text-xs text-green-600 font-medium">
                      ✓ วิเคราะห์แล้ว
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{type.title}</CardTitle>
                <CardDescription className="text-sm">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => runAnalysis(type.id)}
                  disabled={isLoading}
                  className="w-full"
                  variant={hasResult(type.id) ? "outline" : "default"}
                >
                  {isLoading && activeAnalysis === type.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      กำลังวิเคราะห์...
                    </>
                  ) : hasResult(type.id) ? (
                    'วิเคราะห์ใหม่'
                  ) : (
                    'เริ่มวิเคราะห์'
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* แสดงผลการวิเคราะห์ */}
      {Object.entries(analysisResults).map(([analysisId, result]) => {
        if (!result.content) return null;

        const type = analysisTypes.find(t => t.id === analysisId);
        if (!type) return null;

        const Icon = getAnalysisIcon(analysisId);

        return (
          <Card key={analysisId} className={`${result.isError ? 'border-red-200' : 'border-green-200'}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${type.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>
                    {result.timestamp && new Date(result.timestamp).toLocaleString('th-TH')}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg ${result.isError ? 'bg-red-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} border border-blue-200`}>
                {result.isError ? (
                  <div className="text-red-600 text-sm">
                    {result.content}
                  </div>
                ) : (
                  <div
                    className="prose prose-sm max-w-none text-gray-700 [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_p]:text-sm [&_ul]:text-sm [&_ol]:text-sm [&_li]:text-sm [&_strong]:text-gray-900 [&_em]:text-blue-600"
                    dangerouslySetInnerHTML={{
                      __html: result.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }}
                  />
                )}
                <div className="mt-4 border-t pt-4">
                  <TTSPlayer text={result.content} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}