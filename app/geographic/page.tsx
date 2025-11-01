'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RegionEChart } from '@/components/charts/EChartsComponents';
import { regionData } from '@/data/mockData';
import { MapPin, TrendingUp, Target, Award } from 'lucide-react';

export default function GeographicPage() {
  const totalRevenue = regionData.reduce((sum, region) => sum + region.ยอดขาย, 0);
  const totalTarget = regionData.reduce((sum, region) => sum + region.เป้าหมาย, 0);
  const overallAchievement = (totalRevenue / totalTarget) * 100;
  const bestRegion = regionData.reduce((best, region) => 
    (region.ยอดขาย / region.เป้าหมาย) > (best.ยอดขาย / best.เป้าหมาย) ? region : best
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            วิเคราะห์ภูมิศาสตร์
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          ติดตามผลการดำเนินงานและศักยภาพตามภาคต่างๆ
        </p>
      </div>

      {/* Geographic Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">ภาคที่ดีที่สุด</CardTitle>
            <Award className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-red-900">{bestRegion.ภาค}</div>
            <p className="text-xs text-red-600">
              {((bestRegion.ยอดขาย / bestRegion.เป้าหมาย) * 100).toFixed(1)}% บรรลุเป้า
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">รายได้รวม</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-green-600">
              ยอดขายทั้งประเทศ
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">เป้าหมายรวม</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {(totalTarget / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-blue-600">
              เป้าหมายตั้งไว้
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">บรรลุเป้า</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{overallAchievement.toFixed(1)}%</div>
            <p className="text-xs text-purple-600">
              เฉลี่ยทุกภาค
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Chart */}
      <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800">ยอดขายตามภาค</CardTitle>
          <CardDescription className="text-red-600">
            เปรียบเทียบยอดขายจริงกับเป้าหมายในแต่ละภาค
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegionEChart data={regionData} />
        </CardContent>
      </Card>

      {/* Regional Breakdown */}
      <Card className="bg-gradient-to-br from-gray-50 to-red-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">รายละเอียดตามภาค</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">ภาค</th>
                  <th className="text-right p-3 font-semibold text-gray-700">ยอดขาย (บาท)</th>
                  <th className="text-right p-3 font-semibold text-gray-700">เป้าหมาย (บาท)</th>
                  <th className="text-right p-3 font-semibold text-gray-700">% บรรลุเป้า</th>
                  <th className="text-right p-3 font-semibold text-gray-700">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {regionData.map((region, index) => {
                  const achievement = (region.ยอดขาย / region.เป้าหมาย) * 100;
                  return (
                    <tr key={index} className="border-b hover:bg-red-50/50">
                      <td className="p-3 font-medium">{region.ภาค}</td>
                      <td className="text-right p-3">{region.ยอดขาย.toLocaleString()}</td>
                      <td className="text-right p-3">{region.เป้าหมาย.toLocaleString()}</td>
                      <td className="text-right p-3">{achievement.toFixed(1)}%</td>
                      <td className="text-right p-3">
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

      {/* Regional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">คำแนะนำการขยายตลาด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-emerald-800">🎯 เน้นภาคเหนือ</h4>
              <p className="text-sm text-gray-600 mt-1">ศักยภาพสูง ควรเพิ่มการลงทุน</p>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-emerald-800">📍 พัฒนาภาคตะวันออก</h4>
              <p className="text-sm text-gray-600 mt-1">มีโอกาสเติบโตดี เหมาะสำหรับขยายสาขา</p>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-emerald-800">🚀 เพิ่มการตลาดภาคใต้</h4>
              <p className="text-sm text-gray-600 mt-1">ต้องการกลยุทธ์เฉพาะที่เหมาะกับพื้นที่</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">แผนการพัฒนา</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">เปิดสาขาใหม่</span>
              <span className="font-bold text-orange-900">2 สาขา</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">เพิ่มทีมขาย</span>
              <span className="font-bold text-orange-900">+15 คน</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">งบการตลาด</span>
              <span className="font-bold text-orange-900">+30%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}