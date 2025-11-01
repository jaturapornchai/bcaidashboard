'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueEChart } from '@/components/charts/EChartsComponents';
import { salesData } from '@/data/mockData';
import { TrendingUp, DollarSign, PieChart, BarChart3 } from 'lucide-react';

export default function RevenueAnalysisPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <DollarSign className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            วิเคราะห์รายได้
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          ติดตามการเติบโตของรายได้และการจัดการกระแสเงินสด
        </p>
      </div>

      {/* Revenue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">รายได้เดือนนี้</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {(salesData[salesData.length - 1].รายได้ / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-green-600">
              +15% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">การเติบโต</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">18%</div>
            <p className="text-xs text-blue-600">
              เฉลี่ยต่อเดือน
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">กำไรเฉลี่ย</CardTitle>
            <PieChart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">28%</div>
            <p className="text-xs text-purple-600">
              อัตรากำไรสุทธิ
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">เป้าหมาย</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">95%</div>
            <p className="text-xs text-orange-600">
              บรรลุเป้าหมาย
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">รายได้รายเดือน</CardTitle>
          <CardDescription className="text-green-600">
            แนวโน้มการเติบโตของรายได้ในแต่ละเดือน
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueEChart data={salesData} />
        </CardContent>
      </Card>

      {/* Revenue Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">ปัจจัยการเติบโต</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">เพิ่มลูกค้าใหม่</span>
              <span className="text-green-600 font-bold">+25%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">เพิ่มยอดต่อคน</span>
              <span className="text-blue-600 font-bold">+12%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">ลดต้นทุน</span>
              <span className="text-purple-600 font-bold">-8%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">คำแนะนำการเงิน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-emerald-800">💡 เพิ่มรายได้</h4>
              <p className="text-sm text-gray-600 mt-1">เน้นขายสินค้ากำไรสูง และเพิ่มบริการเสริม</p>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-emerald-800">📊 จัดการเงินสด</h4>
              <p className="text-sm text-gray-600 mt-1">ติดตามกระแสเงินสดรายวันเพื่อความมั่นคง</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}