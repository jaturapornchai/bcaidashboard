'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

// ฟอนต์ไทยที่แนะนำ
const THAI_FONTS = ['Sarabun', 'Prompt', 'Noto Sans Thai', 'Leelawadee UI', 'sans-serif'];

// กราฟแสดงยอดขายด้วย ECharts (ปรับแต่งสำหรับภาษาไทย)
export function SalesEChart({ data }: { data: any[] }) {
  const option = {
    title: {
      text: 'ยอดขายรายเดือน',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: THAI_FONTS[0]
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      textStyle: {
        fontSize: 14,
        fontFamily: THAI_FONTS[0]
      }
    },
    legend: {
      data: ['ยอดขาย', 'ลูกค้า'],
      textStyle: {
        fontSize: 14,
        fontFamily: THAI_FONTS[0]
      }
    },
    xAxis: [
      {
        type: 'category',
        data: data.map(item => item.เดือน),
        axisLabel: {
          fontSize: 12,
          fontFamily: THAI_FONTS[0]
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'จำนวน',
        nameTextStyle: {
          fontSize: 14,
          fontFamily: THAI_FONTS[0]
        },
        axisLabel: {
          fontSize: 12,
          fontFamily: THAI_FONTS[0]
        }
      }
    ],
    series: [
      {
        name: 'ยอดขาย',
        type: 'line',
        smooth: true,
        data: data.map(item => item.ยอดขาย),
        itemStyle: {
          color: '#8884d8'
        },
        lineStyle: {
          width: 3
        },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: 'ลูกค้า',
        type: 'line',
        smooth: true,
        data: data.map(item => item.ลูกค้า),
        itemStyle: {
          color: '#82ca9d'
        },
        lineStyle: {
          width: 3
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
}

// กราฟแสดงรายได้ด้วย ECharts (ปรับแต่งสำหรับภาษาไทย)
export function RevenueEChart({ data }: { data: any[] }) {
  const option = {
    title: {
      text: 'รายได้รายเดือน',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: THAI_FONTS[0]
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {
        fontSize: 14,
        fontFamily: THAI_FONTS[0]
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.เดือน),
      axisLabel: {
        fontSize: 12,
        fontFamily: THAI_FONTS[0]
      }
    },
    yAxis: {
      type: 'value',
      name: 'รายได้ (บาท)',
      nameTextStyle: {
        fontSize: 14,
        fontFamily: THAI_FONTS[0]
      },
      axisLabel: {
        fontSize: 12,
        fontFamily: THAI_FONTS[0],
        formatter: (value: number) => {
          if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
          if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
          return value.toString();
        }
      }
    },
    series: [
      {
        name: 'รายได้',
        type: 'bar',
        data: data.map(item => item.รายได้),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#8884d8' },
              { offset: 1, color: '#82ca9d' }
            ]
          }
        },
        barWidth: '60%',
        label: {
          show: true,
          position: 'top',
          fontSize: 11,
          fontFamily: THAI_FONTS[0],
          formatter: (params: any) => {
            const value = params.value;
            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
            if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
            return value.toString();
          }
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
}

// กราฟวงกลมช่องทางการขาย (ปรับแต่งสำหรับภาษาไทย)
export function ChannelEChart({ data }: { data: any[] }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  const option = {
    title: {
      text: 'ยอดขายตามช่องทาง',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: THAI_FONTS[0]
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        return `${params.name}<br/>ยอดขาย: ${params.value.toLocaleString()} บาท<br/>สัดส่วน: ${params.percent}%`;
      },
      textStyle: {
        fontSize: 14,
        fontFamily: THAI_FONTS[0]
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        fontSize: 12,
        fontFamily: THAI_FONTS[0]
      }
    },
    series: [
      {
        name: 'ช่องทางขาย',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          fontSize: 12,
          fontFamily: THAI_FONTS[0],
          formatter: '{b}: {d}%'
        },
        labelLine: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            scale: true,
            scaleSize: 10
          }
        },
        data: data.map((item, index) => ({
          value: item.ยอดขาย,
          name: item.ช่องทาง,
          itemStyle: {
            color: COLORS[index % COLORS.length]
          }
        }))
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
}

// กราฟสินค้าขายดี (ปรับแต่งสำหรับภาษาไทย)
export function ProductEChart({ data }: { data: any[] }) {
  const option = {
    title: {
      text: 'สินค้าขายดี',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: THAI_FONTS[0]
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {
        fontSize: 14,
        fontFamily: THAI_FONTS[0]
      }
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 12,
        fontFamily: THAI_FONTS[0]
      }
    },
    yAxis: {
      type: 'category',
      data: data.map(item => item.สินค้า),
      axisLabel: {
        fontSize: 12,
        fontFamily: THAI_FONTS[0]
      }
    },
    series: [
      {
        name: 'จำนวนที่ขาย',
        type: 'bar',
        data: data.map(item => item.จำนวนที่ขาย),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#82ca9d' },
              { offset: 1, color: '#8884d8' }
            ]
          }
        },
        barWidth: '60%',
        label: {
          show: true,
          position: 'right',
          fontSize: 11,
          fontFamily: THAI_FONTS[0]
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
}

// กราฟภาค (ปรับแต่งสำหรับภาษาไทย)
export function RegionEChart({ data }: { data: any[] }) {
  const option = {
    title: {
      text: 'ยอดขายตามภาค',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: THAI_FONTS[0]
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {
        fontSize: 14,
        fontFamily: THAI_FONTS[0]
      },
      formatter: function(params: any) {
        let result = `${params[0].axisValue}<br/>`;
        params.forEach((param: any) => {
          result += `${param.seriesName}: ${param.value.toLocaleString()} บาท<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['ยอดขาย', 'เป้าหมาย'],
      textStyle: {
        fontSize: 14,
        fontFamily: THAI_FONTS[0]
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.ภาค),
      axisLabel: {
        fontSize: 12,
        fontFamily: THAI_FONTS[0]
      }
    },
    yAxis: {
      type: 'value',
      name: 'ยอดขาย (บาท)',
      nameTextStyle: {
        fontSize: 14,
        fontFamily: THAI_FONTS[0]
      },
      axisLabel: {
        fontSize: 12,
        fontFamily: THAI_FONTS[0],
        formatter: (value: number) => {
          if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
          if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
          return value.toString();
        }
      }
    },
    series: [
      {
        name: 'ยอดขาย',
        type: 'bar',
        data: data.map(item => item.ยอดขาย),
        itemStyle: {
          color: '#8884d8'
        },
        barWidth: '35%'
      },
      {
        name: 'เป้าหมาย',
        type: 'bar',
        data: data.map(item => item.เป้าหมาย),
        itemStyle: {
          color: '#82ca9d'
        },
        barWidth: '35%'
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
}