import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import DateRangeSelector from './components/DateRangeSelector';
import SalesChart from './components/SalesChart';
import BrandComparisonTable from './components/BrandComparisonTable';
import OperationalMetrics from './components/OperationalMetrics';
import CostAnalysis from './components/CostAnalysis';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import CustomReportBuilder from './components/CustomReportBuilder';

const AnalyticsReportingDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('last7days');
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Mock KPI data
  const kpiData = [
    {
      title: "Daily Revenue",
      value: "$24,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Order Volume",
      value: "1,247",
      change: "+8.3%",
      changeType: "positive",
      icon: "ShoppingCart",
      color: "primary"
    },
    {
      title: "Avg Prep Time",
      value: "12.4 min",
      change: "-2.1%",
      changeType: "positive",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5.0",
      change: "+0.2",
      changeType: "positive",
      icon: "Star",
      color: "success"
    }
  ];

  // Mock sales chart data
  const salesData = [
    { name: 'Mon', revenue: 18500, orders: 245 },
    { name: 'Tue', revenue: 22300, orders: 298 },
    { name: 'Wed', revenue: 19800, orders: 267 },
    { name: 'Thu', revenue: 25600, orders: 342 },
    { name: 'Fri', revenue: 31200, orders: 418 },
    { name: 'Sat', revenue: 28900, orders: 387 },
    { name: 'Sun', revenue: 24700, orders: 331 }
  ];

  // Mock brand comparison data
  const brandData = [
    {
      id: 1,
      brand: "Pizza Palace",
      category: "Italian",
      revenue: 45600,
      revenueChange: 12.5,
      orders: 1247,
      ordersChange: 8.3,
      avgOrderValue: 36.58,
      performance: 94,
      color: "#2563EB"
    },
    {
      id: 2,
      brand: "Burger Barn",
      category: "American",
      revenue: 38200,
      revenueChange: -3.2,
      orders: 1089,
      ordersChange: -1.8,
      avgOrderValue: 35.08,
      performance: 87,
      color: "#059669"
    },
    {
      id: 3,
      brand: "Taco Time",
      category: "Mexican",
      revenue: 29800,
      revenueChange: 18.7,
      orders: 892,
      ordersChange: 22.1,
      avgOrderValue: 33.41,
      performance: 91,
      color: "#F59E0B"
    },
    {
      id: 4,
      brand: "Sushi Spot",
      category: "Japanese",
      revenue: 52100,
      revenueChange: 7.9,
      orders: 743,
      ordersChange: 5.2,
      avgOrderValue: 70.12,
      performance: 96,
      color: "#8B5CF6"
    }
  ];

  // Mock operational metrics data
  const operationalData = [
    { name: 'On-time Delivery', value: 847 },
    { name: 'Late Delivery', value: 123 },
    { name: 'Cancelled Orders', value: 45 },
    { name: 'Refunded Orders', value: 32 }
  ];

  // Mock cost analysis data
  const costData = {
    dish: [
      {
        id: 1,
        name: "Margherita Pizza",
        revenue: 1250.00,
        totalCost: 425.50,
        profit: 824.50,
        profitMargin: 65.96
      },
      {
        id: 2,
        name: "Classic Burger",
        revenue: 980.00,
        totalCost: 412.30,
        profit: 567.70,
        profitMargin: 57.93
      },
      {
        id: 3,
        name: "Chicken Tacos",
        revenue: 750.00,
        totalCost: 285.75,
        profit: 464.25,
        profitMargin: 61.90
      },
      {
        id: 4,
        name: "Salmon Roll",
        revenue: 1680.00,
        totalCost: 672.00,
        profit: 1008.00,
        profitMargin: 60.00
      }
    ],
    brand: [
      {
        id: 1,
        name: "Pizza Palace",
        revenue: 45600.00,
        totalCost: 18240.00,
        profit: 27360.00,
        profitMargin: 60.00
      },
      {
        id: 2,
        name: "Burger Barn",
        revenue: 38200.00,
        totalCost: 17199.00,
        profit: 21001.00,
        profitMargin: 54.98
      }
    ]
  };

  // Mock predictive analytics data
  const predictiveData = {
    inventory: {
      '7days': [
        { date: 'Aug 9', value: 245, type: 'actual' },
        { date: 'Aug 10', value: 267, type: 'actual' },
        { date: 'Aug 11', value: 289, type: 'actual' },
        { date: 'Aug 12', value: 312, type: 'actual' },
        { date: 'Aug 13', value: 298, type: 'actual' },
        { date: 'Aug 14', value: 334, type: 'actual' },
        { date: 'Today', value: 356, type: 'actual' },
        { date: 'Aug 16', value: 378, type: 'predicted', confidence: 87 },
        { date: 'Aug 17', value: 392, type: 'predicted', confidence: 84 },
        { date: 'Aug 18', value: 405, type: 'predicted', confidence: 81 },
        { date: 'Aug 19', value: 418, type: 'predicted', confidence: 78 },
        { date: 'Aug 20', value: 432, type: 'predicted', confidence: 75 },
        { date: 'Aug 21', value: 445, type: 'predicted', confidence: 72 },
        { date: 'Aug 22', value: 458, type: 'predicted', confidence: 69 }
      ],
      '14days': [],
      '30days': []
    },
    staffing: {
      '7days': [
        { date: 'Aug 9', value: 12, type: 'actual' },
        { date: 'Aug 10', value: 14, type: 'actual' },
        { date: 'Aug 11', value: 13, type: 'actual' },
        { date: 'Aug 12', value: 16, type: 'actual' },
        { date: 'Aug 13', value: 15, type: 'actual' },
        { date: 'Aug 14', value: 18, type: 'actual' },
        { date: 'Today', value: 17, type: 'actual' },
        { date: 'Aug 16', value: 19, type: 'predicted', confidence: 92 },
        { date: 'Aug 17', value: 20, type: 'predicted', confidence: 89 },
        { date: 'Aug 18', value: 18, type: 'predicted', confidence: 86 },
        { date: 'Aug 19', value: 16, type: 'predicted', confidence: 83 },
        { date: 'Aug 20', value: 17, type: 'predicted', confidence: 80 },
        { date: 'Aug 21', value: 19, type: 'predicted', confidence: 77 },
        { date: 'Aug 22', value: 21, type: 'predicted', confidence: 74 }
      ],
      '14days': [],
      '30days': []
    },
    demand: {
      '7days': [
        { date: 'Aug 9', value: 1247, type: 'actual' },
        { date: 'Aug 10', value: 1298, type: 'actual' },
        { date: 'Aug 11', value: 1189, type: 'actual' },
        { date: 'Aug 12', value: 1356, type: 'actual' },
        { date: 'Aug 13', value: 1423, type: 'actual' },
        { date: 'Aug 14', value: 1512, type: 'actual' },
        { date: 'Today', value: 1387, type: 'actual' },
        { date: 'Aug 16', value: 1445, type: 'predicted', confidence: 91 },
        { date: 'Aug 17', value: 1523, type: 'predicted', confidence: 88 },
        { date: 'Aug 18', value: 1467, type: 'predicted', confidence: 85 },
        { date: 'Aug 19', value: 1398, type: 'predicted', confidence: 82 },
        { date: 'Aug 20', value: 1456, type: 'predicted', confidence: 79 },
        { date: 'Aug 21', value: 1534, type: 'predicted', confidence: 76 },
        { date: 'Aug 22', value: 1612, type: 'predicted', confidence: 73 }
      ],
      '14days': [],
      '30days': []
    }
  };

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
  };

  const handleCustomDateChange = (dates) => {
    console.log('Custom date range:', dates);
  };

  const handleExportData = (format) => {
    console.log(`Exporting data in ${format} format`);
  };

  const handleSaveReport = (reportConfig) => {
    console.log('Saving custom report:', reportConfig);
  };

  const handleRefreshData = () => {
    setLastUpdated(new Date());
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMenuOpen={isMobileSidebarOpen}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <main className={`pt-16 transition-layout ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics & Reporting Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive operational insights and performance metrics for data-driven decisions
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshData}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
              
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportData('pdf')}
                  iconName="FileText"
                  className="text-xs"
                >
                  PDF
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportData('csv')}
                  iconName="Download"
                  className="text-xs"
                >
                  CSV
                </Button>
              </div>
            </div>
          </div>

          {/* Date Range Selector */}
          <DateRangeSelector
            selectedRange={selectedDateRange}
            onRangeChange={handleDateRangeChange}
            onCustomDateChange={handleCustomDateChange}
          />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Sales Performance Chart - 6 cols */}
            <div className="xl:col-span-6">
              <SalesChart
                data={salesData}
                chartType="line"
                title="Sales Performance Trends"
                height={400}
              />
            </div>

            {/* Operational Metrics - 3 cols */}
            <div className="xl:col-span-3">
              <OperationalMetrics
                data={operationalData}
                title="Delivery Performance"
              />
            </div>

            {/* Brand Comparison - 3 cols */}
            <div className="xl:col-span-3">
              <div className="h-full">
                <BrandComparisonTable data={brandData} />
              </div>
            </div>
          </div>

          {/* Cost Analysis Section */}
          <CostAnalysis data={costData} />

          {/* Predictive Analytics */}
          <PredictiveAnalytics data={predictiveData} />

          {/* Custom Report Builder */}
          <CustomReportBuilder onSaveReport={handleSaveReport} />

          {/* Auto-refresh Settings */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Settings" size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Auto-refresh Settings</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Refresh every:</span>
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e?.target?.value))}
                  className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={300}>5 minutes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsReportingDashboard;