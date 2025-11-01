import { NextRequest, NextResponse } from 'next/server';
import { 
  salesData, 
  channelData, 
  productData, 
  regionData, 
  newCustomerData,
  calculateGrowth,
  calculateTargetAchievement
} from '@/data/mockData';

// จำลองการดึงข้อมูลจากฐานข้อมูลจริง
async function fetchDataWithDelay(data: any, delay: number = 1000) {
  // จำลองการโหลดข้อมูลช้าๆ เหมือนจริง
  await new Promise(resolve => setTimeout(resolve, delay));
  return data;
}

// ตั้งค่า cache (60 วินาที)
export async function GET() {
  try {
    // จำลองการดึงข้อมูลจากหลายแหล่ง
    const [sales, channels, products, regions, newCustomers] = await Promise.all([
      fetchDataWithDelay(salesData, 800),
      fetchDataWithDelay(channelData, 600),
      fetchDataWithDelay(productData, 500),
      fetchDataWithDelay(regionData, 700),
      fetchDataWithDelay(newCustomerData, 400),
    ]);

    // คำนวณสถิติเพิ่มเติม
    const stats = {
      totalRevenue: sales.reduce((sum: number, month: any) => sum + month.รายได้, 0),
      totalCustomers: sales.reduce((sum: number, month: any) => sum + month.ลูกค้า, 0),
      monthlyGrowth: calculateGrowth(sales[sales.length - 1].ยอดขาย, sales[sales.length - 2].ยอดขาย),
      topProduct: products[0].สินค้า,
    };

    const dashboardData = {
      sales,
      channels,
      products,
      regions,
      newCustomers,
      stats,
      lastUpdated: new Date().toISOString(),
    };

    // ตั้งค่า cache headers
    const response = NextResponse.json(dashboardData);
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    response.headers.set('ETag', `"dashboard-${Date.now()}"`);
    
    return response;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'ไม่สามารถดึงข้อมูลได้' },
      { status: 500 }
    );
  }
}