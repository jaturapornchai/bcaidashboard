'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickAIAnalysis } from '@/components/ai/QuickAIAnalysis';
import { Brain, TrendingUp, Users, Package, MapPin } from 'lucide-react';

export default function AIAdvisorPage() {
  const aiFeatures = [
    {
      title: '📈 วิเคราะห์ยอดขาย',
      description: 'AI วิเคราะห์แนวโน้มการขาย ค้นหาช่วงที่ขายดี/ขายไม่ดี และให้คำแนะนำกลยุทธ์',
      icon: TrendingUp,
      type: 'sales',
      color: 'from-blue-50 to-blue-100 border-blue-200'
    },
    {
      title: '💰 วิเคราะห์รายได้',
      description: 'วิเคราะห์การเติบโตของรายได้ การจัดการกระแสเงินสด และเสนอแนวทางเพิ่มรายได้',
      icon: TrendingUp,
      type: 'revenue',
      color: 'from-green-50 to-green-100 border-green-200'
    },
    {
      title: '👥 วิเคราะห์ลูกค้า',
      description: 'AI วิเคราะห์พฤติกรรมลูกค้า การรักษาลูกค้า และกลยุทธ์การตลาด',
      icon: Users,
      type: 'customers',
      color: 'from-purple-50 to-purple-100 border-purple-200'
    },
    {
      title: '📦 วิเคราะห์สินค้า',
      description: 'วิเคราะห์สินค้าขายดี ขายไม่ดี และให้คำแนะนำการจัดการสินค้า',
      icon: Package,
      type: 'products',
      color: 'from-orange-50 to-orange-100 border-orange-200'
    },
    {
      title: '🗺️ วิเคราะห์ภูมิศาสตร์',
      description: 'AI วิเคราะห์ยอดขายตามภาค หาภาคที่มีศักยภาพสูง และกลยุทธ์ขยายตลาด',
      icon: MapPin,
      type: 'regions',
      color: 'from-red-50 to-red-100 border-red-200'
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI ที่ปรึกษาธุรกิจ
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          ปรึกษากับ AI ที่เชี่ยวชาญด้านธุรกิจ SMEs ไทย วิเคราะห์ข้อมูลและให้คำแนะนำที่เป็นประโยชน์
        </p>
      </div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className={`bg-gradient-to-br ${feature.color} hover:shadow-lg transition-all duration-300 border-2`}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center shadow-sm">
                    <Icon className="h-5 w-5 text-gray-700" />
                  </div>
                  <CardTitle className="text-gray-800 text-lg">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-700 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuickAIAnalysis analysisType={feature.type} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}