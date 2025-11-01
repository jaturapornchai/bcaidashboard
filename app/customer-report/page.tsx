'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { salesData, channelData } from '@/data/mockData';
import { Users, UserPlus, UserCheck, UserX, TrendingUp } from 'lucide-react';

export default function CustomerReportPage() {
  const totalCustomers = salesData.reduce((sum, month) => sum + month.ลูกค้า, 0);
  const currentMonthCustomers = salesData[salesData.length - 1].ลูกค้า;
  const previousMonthCustomers = salesData[salesData.length - 2].ลูกค้า;
  const growthRate = ((currentMonthCustomers - previousMonthCustomers) / previousMonthCustomers * 100);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            รายงานลูกค้า
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          ติดตามการเติบโตของลูกค้าและกลยุทธ์การตลาด
        </p>
      </div>

      {/* Customer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">ลูกค้าทั้งหมด</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-purple-600">
              ลูกค้าสะสมทั้งปี
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">ลูกค้าใหม่</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{currentMonthCustomers.toLocaleString()}</div>
            <p className="text-xs text-green-600">
              +{growthRate.toFixed(1)}% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">ลูกค้ากลับมา</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">85%</div>
            <p className="text-xs text-blue-600">
              อัตราการกลับมาซื้อ
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">ลูกค้าหายไป</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">15%</div>
            <p className="text-xs text-red-600">
              อัตราการหายไป
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Growth Chart */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">การเติบโตของลูกค้า</CardTitle>
          <CardDescription className="text-purple-600">
            จำนวนลูกค้าใหม่ในแต่ละเดือน
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {salesData.slice(-6).map((month, index) => (
              <div key={index} className="text-center p-4 bg-white/60 rounded-lg">
                <div className="text-2xl font-bold text-purple-900">{month.ลูกค้า}</div>
                <div className="text-sm text-purple-600">{month.เดือน}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Analysis */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">การกระจายลูกค้าตามช่องทาง</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {channelData.map((channel, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{channel.ช่องทาง}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-900">{channel.ลูกค้า.toLocaleString()} คน</div>
                  <div className="text-sm text-blue-600">
                    {((channel.ลูกค้า / totalCustomers) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">คำแนะนำการตลาด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-emerald-800">🎯 เน้นลูกค้าเก่า</h4>
              <p className="text-sm text-gray-600 mt-1">โปรโมชั่นสำหรับลูกค้าที่ซื้อซ้ำ</p>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-emerald-800">📱 เพิ่มโซเชียล</h4>
              <p className="text-sm text-gray-600 mt-1">ใช้ Facebook และ LINE สร้างความสัมพันธ์</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">เป้าหมายเดือนหน้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">ลูกค้าใหม่</span>
              <span className="font-bold text-orange-900">+200 คน</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">อัตรากลับมาซื้อ</span>
              <span className="font-bold text-orange-900">90%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">ลูกค้าสำคัญ</span>
              <span className="font-bold text-orange-900">+15%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}