'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductEChart } from '@/components/charts/EChartsComponents';
import { productData, regionData } from '@/data/mockData';
import { Package, PackagePlus, AlertTriangle, TrendingDown } from 'lucide-react';

export default function InventoryPage() {
  const totalProducts = productData.reduce((sum, product) => sum + product.จำนวนที่ขาย, 0);
  const lowStockItems = productData.filter(product => product.จำนวนที่ขาย < 500).length;
  const topProduct = productData[0];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <Package className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            สินค้าและคลัง
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          จัดการคลังสินค้าและติดตามสินค้าขายดี
        </p>
      </div>

      {/* Inventory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">สินค้าทั้งหมด</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{productData.length} ประเภท</div>
            <p className="text-xs text-orange-600">
              จำนวนรวม: {totalProducts.toLocaleString()} ชิ้น
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">ขายดีที่สุด</CardTitle>
            <PackagePlus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-blue-900">{topProduct.สินค้า}</div>
            <p className="text-xs text-blue-600">
              {topProduct.จำนวนที่ขาย.toLocaleString()} ชิ้น
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">สินค้าใกล้หมด</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{lowStockItems}</div>
            <p className="text-xs text-yellow-600">
              ต้องสั่งเพิ่ม
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">ขายไม่ดี</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">2</div>
            <p className="text-xs text-red-600">
              สินค้าที่ขายต่ำกว่า 300 ชิ้น
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Product Sales Chart */}
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">สินค้าขายดี</CardTitle>
          <CardDescription className="text-orange-600">
            จำนวนสินค้าที่ขายได้แยกตามประเภท
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductEChart data={productData} />
        </CardContent>
      </Card>

      {/* Product List */}
      <Card className="bg-gradient-to-br from-gray-50 to-orange-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">รายละเอียดสินค้า</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">สินค้า</th>
                  <th className="text-right p-3 font-semibold text-gray-700">จำนวนขาย</th>
                  <th className="text-right p-3 font-semibold text-gray-700">ราคาขาย</th>
                  <th className="text-right p-3 font-semibold text-gray-700">กำไร</th>
                  <th className="text-right p-3 font-semibold text-gray-700">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-orange-50/50">
                    <td className="p-3 font-medium">{product.สินค้า}</td>
                    <td className="text-right p-3">{product.จำนวนที่ขาย.toLocaleString()}</td>
                    <td className="text-right p-3">{product.ราคาขาย.toLocaleString()}</td>
                    <td className="text-right p-3">{product.กำไร.toLocaleString()}</td>
                    <td className="text-right p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.จำนวนที่ขาย >= 800 ? 'bg-green-100 text-green-800' :
                        product.จำนวนที่ขาย >= 500 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.จำนวนที่ขาย >= 800 ? 'ขายดี' :
                         product.จำนวนที่ขาย >= 500 ? 'ปกติ' :
                         'ขายไม่ดี'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">คำแนะนำการจัดการคลัง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-emerald-800">📦 สั่งสินค้าเพิ่ม</h4>
              <p className="text-sm text-gray-600 mt-1">เพิ่มสต็อกสินค้าที่ขายดี</p>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-semibold text-emerald-800">🛍️ โปรโมชั่นสินค้า</h4>
              <p className="text-sm text-gray-600 mt-1">ลดราคาสินค้าที่ขายไม่ดี</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">การจัดซื้อต่อไป</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">เสื้อผ้า</span>
              <span className="font-bold text-blue-900">+500 ชิ้น</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">กระเป๋า</span>
              <span className="font-bold text-blue-900">+300 ชิ้น</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
              <span className="font-medium">รองเท้า</span>
              <span className="font-bold text-blue-900">+200 ชิ้น</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}