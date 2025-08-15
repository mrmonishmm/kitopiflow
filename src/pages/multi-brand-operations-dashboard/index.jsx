import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

// Import all components
import KPICard from './components/KPICard';
import LiveOrderQueue from './components/LiveOrderQueue';
import KitchenCapacityMeter from './components/KitchenCapacityMeter';
import InventoryAlerts from './components/InventoryAlerts';
import SalesTrendsChart from './components/SalesTrendsChart';
import TopPerformingItems from './components/TopPerformingItems';
import QuickActions from './components/QuickActions';

const MultiBrandOperationsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all-brands');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  // Mock KPI data
  const kpiData = [
    {
      title: "Today\'s Orders",
      value: "247",
      change: "+12%",
      changeType: "positive",
      icon: "ShoppingBag",
      color: "primary"
    },
    {
      title: "Revenue",
      value: "$18,420",
      change: "+8%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Avg Prep Time",
      value: "12.4 min",
      change: "-2%",
      changeType: "positive",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Active Orders",
      value: "34",
      change: "+5",
      changeType: "positive",
      icon: "Activity",
      color: "error"
    }
  ];

  const navigationRoutes = [
    {
      path: '/kitchen-display-system-kds',
      label: 'Kitchen Display System',
      icon: 'Monitor',
      description: 'Real-time order tracking'
    },
    {
      path: '/order-management-hub',
      label: 'Order Management',
      icon: 'ClipboardList',
      description: 'Process incoming orders'
    },
    {
      path: '/inventory-management-system',
      label: 'Inventory Management',
      icon: 'Package',
      description: 'Track stock levels'
    },
    {
      path: '/recipe-menu-management',
      label: 'Recipe & Menu',
      icon: 'BookOpen',
      description: 'Manage recipes and menus'
    },
    {
      path: '/analytics-reporting-dashboard',
      label: 'Analytics & Reporting',
      icon: 'TrendingUp',
      description: 'Performance insights'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-layout ${isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'}`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Multi-Brand Operations Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time overview of all kitchen operations and performance metrics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last updated</p>
                <p className="text-sm font-medium text-foreground">
                  {lastUpdated?.toLocaleTimeString()}
                </p>
              </div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live Order Queue */}
            <div className="lg:col-span-4">
              <LiveOrderQueue />
            </div>

            {/* Kitchen Capacity & Equipment */}
            <div className="lg:col-span-4">
              <KitchenCapacityMeter />
            </div>

            {/* Inventory Alerts */}
            <div className="lg:col-span-4">
              <InventoryAlerts />
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sales Trends Chart */}
            <div className="lg:col-span-8">
              <SalesTrendsChart />
            </div>

            {/* Top Performing Items */}
            <div className="lg:col-span-4">
              <TopPerformingItems />
            </div>
          </div>

          {/* Quick Navigation & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Quick Navigation */}
            <div className="lg:col-span-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Icon name="Navigation" size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Quick Navigation</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {navigationRoutes?.map((route) => (
                    <Link
                      key={route?.path}
                      to={route?.path}
                      className="group p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors hover-scale"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon name={route?.icon} size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {route?.label}
                          </h4>
                          <p className="text-sm text-muted-foreground">{route?.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Click to access</span>
                        <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions & Alerts */}
            <div className="lg:col-span-4">
              <QuickActions />
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">All Systems Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">12 Staff Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Building2" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">5 Brands Active</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} KitopiFlow. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MultiBrandOperationsDashboard;