'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Users, Package } from 'lucide-react';
import {
  SalesEChart,
  RevenueEChart,
  ChannelEChart,
  ProductEChart,
  RegionEChart
} from '@/components/charts/EChartsComponents';
import { AIAnalysis } from '@/components/ai/AIAnalysis';
import {
  salesData,
  channelData,
  productData,
  regionData,
  newCustomerData,
  calculateGrowth,
  calculateTargetAchievement
} from '@/data/mockData';

export default function Dashboard() {
  // คำนวณสถิติหลัก
  const currentMonthData = salesData[salesData.length - 1];
  const previousMonthData = salesData[salesData.length - 2];
  const monthlyGrowth = calculateGrowth(currentMonthData.ยอดขาย, previousMonthData.ยอดขาย);
  const totalRevenue = salesData.reduce((sum, month) => sum + month.รายได้, 0);
  const totalCustomers = salesData.reduce((sum, month) => sum + month.ลูกค้า, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ดธุรกิจ SMEs</h1>
          <p className="text-gray-600">ติดตามผลการดำเนินงานธุรกิจของคุณ</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">ยอดขายเดือนนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{currentMonthData.ยอดขาย.toLocaleString()} ชิ้น</div>
            <p className="text-xs text-blue-600">
              เพิ่มขึ้น {monthlyGrowth.toFixed(1)}% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">รายได้ทั้งปี</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{(totalRevenue / 1000000).toFixed(1)}M บาท</div>
            <p className="text-xs text-green-600">
              เฉลี่ย {(totalRevenue / 12 / 1000).toFixed(0)}K บาท/เดือน
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">ลูกค้าทั้งปี</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{totalCustomers.toLocaleString()} คน</div>
            <p className="text-xs text-purple-600">
              เฉลี่ย {Math.round(totalCustomers / 12)} คน/เดือน
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">สินค้าขายดี</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{productData[0].สินค้า}</div>
            <p className="text-xs text-orange-600">
              ขายได้ {productData[0].จำนวนที่ขาย.toLocaleString()} ชิ้น
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-blue-800">แนวโน้มการขาย</CardTitle>
            <CardDescription className="text-blue-600">ยอดขายและจำนวนลูกค้ารายเดือน</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesEChart data={salesData} />
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-green-800">รายได้รายเดือน</CardTitle>
            <CardDescription className="text-green-600">รายได้แยกตามเดือน</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueEChart data={salesData} />
          </CardContent>
        </Card>

        {/* Channel Distribution */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-purple-800">ช่องทางการขาย</CardTitle>
            <CardDescription className="text-purple-600">การกระจายยอดขายตามช่องทาง</CardDescription>
          </CardHeader>
          <CardContent>
            <ChannelEChart data={channelData} />
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-800">สินค้าขายดี</CardTitle>
            <CardDescription className="text-orange-600">จำนวนที่ขายแยกตามประเภทสินค้า</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductEChart data={productData} />
          </CardContent>
        </Card>

        {/* Regional Performance */}
        <Card className="lg:col-span-2 shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-red-800">ยอดขายตามภาค</CardTitle>
            <CardDescription className="text-red-600">เปรียบเทียบยอดขายกับเป้าหมายแต่ละภาค</CardDescription>
          </CardHeader>
          <CardContent>
            <RegionEChart data={regionData} />
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>สรุปผลการดำเนินงาน</CardTitle>
          <CardDescription>ข้อมูลสำคัญแยกตามภาค</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ภาค</th>
                  <th className="text-right p-2">ยอดขาย (บาท)</th>
                  <th className="text-right p-2">เป้าหมาย (บาท)</th>
                  <th className="text-right p-2">% บรรลุเป้า</th>
                  <th className="text-right p-2">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {regionData.map((region, index) => {
                  const achievement = calculateTargetAchievement(region.ยอดขาย, region.เป้าหมาย);
                  return (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{region.ภาค}</td>
                      <td className="text-right p-2">{region.ยอดขาย.toLocaleString()}</td>
                      <td className="text-right p-2">{region.เป้าหมาย.toLocaleString()}</td>
                      <td className="text-right p-2">{achievement.toFixed(1)}%</td>
                      <td className="text-right p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          achievement >= 100 ? 'bg-green-100 text-green-800' :
                          achievement >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {achievement >= 100 ? 'บรรลุเป้า' :
                           achievement >= 80 ? 'ใกล้เป้า' : 'ต้องปรับปรุง'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Section */}
      <AIAnalysis
        businessData={{
          sales: salesData,
          channels: channelData,
          products: productData,
          regions: regionData,
          newCustomers: newCustomerData,
          stats: {
            totalRevenue,
            totalCustomers,
            monthlyGrowth,
            currentMonthData
          }
        }}
      />
    </div>
  );
}