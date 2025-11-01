'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  MapPin, 
  Brain,
  FileText,
  LogIn,
  User,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function TopNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      title: 'แดชบอร์ด',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'รายงานยอดขาย',
      href: '/sales-report',
      icon: BarChart3,
    },
    {
      title: 'วิเคราะห์รายได้',
      href: '/revenue-analysis',
      icon: TrendingUp,
    },
    {
      title: 'รายงานลูกค้า',
      href: '/customer-report',
      icon: Users,
    },
    {
      title: 'สินค้าและคลัง',
      href: '/inventory',
      icon: Package,
    },
    {
      title: 'ภูมิศาสตร์',
      href: '/geographic',
      icon: MapPin,
    },
    {
      title: 'AI ที่ปรึกษา',
      href: '/ai-advisor',
      icon: Brain,
    },
  ];

  const handleGoogleLogin = () => {
    // Mock Google login - ในการใช้งานจริงให้เชื่อมต่อ Google OAuth
    alert('ฟีเจอร์ Google Login จะพร้อมใช้งานเร็วๆ นี้!\n\nสำหรับตอนนี้สามารถใช้งานได้โดยไม่ต้อง login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-white text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  BC AI Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-blue-700 text-white shadow-md border border-blue-600'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white hover:shadow-sm'
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span className="hidden xl:block">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side - Login and User */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-blue-900 transition-all duration-200 flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Login with Google</span>
              </Button>
              
              <button className="text-blue-100 hover:text-white p-2 rounded-md hover:bg-blue-700 transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-100 hover:text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-blue-800 border-t border-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors',
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.title}
                </Link>
              );
            })}
            
            {/* Mobile Login Button */}
            <div className="pt-4 pb-2">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                size="sm"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-blue-900 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Login with Google</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}