'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SalesEChart } from '@/components/charts/EChartsComponents';
import { salesData } from '@/data/mockData';
import { TrendingUp, Target, DollarSign, Users } from 'lucide-react';

export default function SalesReportPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            รายงานยอดขาย
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          ติดตามแนวโน้มการขายและประสิทธิภาพการขายรายเดือน
        </p>
      </div>

      {/* Sales Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">ยอดขายเดือนนี้</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{salesData[salesData.length - 1].ยอดขาย.toLocaleString()}</div>
            <p className="text-xs text-blue-600">
              +12% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">รายได้ทั้งปี</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {(salesData.reduce((sum, month) => sum + month.รายได้, 0) / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-green-600">
              เฉลี่ย {(salesData.reduce((sum, month) => sum + month.รายได้, 0) / 12 / 1000).toFixed(0)}K/เดือน
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">ลูกค้าใหม่</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{salesData[salesData.length - 1].ลูกค้า.toLocaleString()}</div>
            <p className="text-xs text-purple-600">
              +8% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">เป้าหมาย</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">92%</div>
            <p className="text-xs text-orange-600">
              เป้าหมายที่บรรลุ
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">แนวโน้มการขายรายเดือน</CardTitle>
          <CardDescription className="text-blue-600">
            ยอดขายและจำนวนลูกค้าในแต่ละเดือน
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SalesEChart data={salesData} />
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">รายละเอียดยอดขายรายเดือน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">เดือน</th>
                  <th className="text-right p-3 font-semibold text-gray-700">ยอดขาย</th>
                  <th className="text-right p-3 font-semibold text-gray-700">รายได้ (บาท)</th>
                  <th className="text-right p-3 font-semibold text-gray-700">ลูกค้า</th>
                  <th className="text-right p-3 font-semibold text-gray-700">เฉลี่ย/ลูกค้า</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((month, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50/50">
                    <td className="p-3 font-medium">{month.เดือน}</td>
                    <td className="text-right p-3">{month.ยอดขาย.toLocaleString()}</td>
                    <td className="text-right p-3">{month.รายได้.toLocaleString()}</td>
                    <td className="text-right p-3">{month.ลูกค้า.toLocaleString()}</td>
                    <td className="text-right p-3">
                      {Math.round(month.รายได้ / month.ลูกค้า).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}