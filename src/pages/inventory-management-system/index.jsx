import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import InventoryTable from './components/InventoryTable';
import InventorySummary from './components/InventorySummary';
import InventoryFilters from './components/InventoryFilters';
import WasteTracker from './components/WasteTracker';

const InventoryManagementSystem = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    search: '',
    category: 'all',
    supplier: 'all',
    brand: 'all',
    stockLevel: 'all',
    sortBy: 'name-asc'
  });

  // Mock inventory data
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: 'Pizza Dough',
      category: 'Grains & Starches',
      currentStock: 15,
      reorderLevel: 50,
      unit: 'lbs',
      unitCost: 2.50,
      supplier: 'Fresh Foods Co.',
      lastUpdated: new Date(Date.now() - 3600000),
      weeklyUsage: 120,
      brands: ['Pizza Palace']
    },
    {
      id: 2,
      name: 'Mozzarella Cheese',
      category: 'Dairy Products',
      currentStock: 8,
      reorderLevel: 25,
      unit: 'lbs',
      unitCost: 4.75,
      supplier: 'Dairy Direct',
      lastUpdated: new Date(Date.now() - 7200000),
      weeklyUsage: 85,
      brands: ['Pizza Palace', 'Burger Barn']
    },
    {
      id: 3,
      name: 'Ground Beef',
      category: 'Proteins',
      currentStock: 45,
      reorderLevel: 30,
      unit: 'lbs',
      unitCost: 6.25,
      supplier: 'Meat Masters',
      lastUpdated: new Date(Date.now() - 1800000),
      weeklyUsage: 75,
      brands: ['Burger Barn', 'Taco Time']
    },
    {
      id: 4,
      name: 'Tomato Sauce',
      category: 'Vegetables',
      currentStock: 12,
      reorderLevel: 30,
      unit: 'cans',
      unitCost: 1.85,
      supplier: 'Fresh Foods Co.',
      lastUpdated: new Date(Date.now() - 5400000),
      weeklyUsage: 40,
      brands: ['Pizza Palace']
    },
    {
      id: 5,
      name: 'Chicken Breast',
      category: 'Proteins',
      currentStock: 35,
      reorderLevel: 20,
      unit: 'lbs',
      unitCost: 5.50,
      supplier: 'Meat Masters',
      lastUpdated: new Date(Date.now() - 900000),
      weeklyUsage: 60,
      brands: ['Burger Barn', 'Sushi Spot']
    },
    {
      id: 6,
      name: 'Bell Peppers',
      category: 'Vegetables',
      currentStock: 18,
      reorderLevel: 15,
      unit: 'lbs',
      unitCost: 3.25,
      supplier: 'Fresh Foods Co.',
      lastUpdated: new Date(Date.now() - 2700000),
      weeklyUsage: 25,
      brands: ['Pizza Palace', 'Taco Time']
    },
    {
      id: 7,
      name: 'Sushi Rice',
      category: 'Grains & Starches',
      currentStock: 22,
      reorderLevel: 20,
      unit: 'lbs',
      unitCost: 2.95,
      supplier: 'Spice World',
      lastUpdated: new Date(Date.now() - 4500000),
      weeklyUsage: 30,
      brands: ['Sushi Spot']
    },
    {
      id: 8,
      name: 'Cheddar Cheese',
      category: 'Dairy Products',
      currentStock: 28,
      reorderLevel: 20,
      unit: 'lbs',
      unitCost: 4.25,
      supplier: 'Dairy Direct',
      lastUpdated: new Date(Date.now() - 3300000),
      weeklyUsage: 45,
      brands: ['Burger Barn', 'Taco Time']
    }
  ]);

  // Mock summary data
  const summaryData = {
    totalValue: 125750.50,
    reorderItems: 15,
    recentDeliveries: 8,
    activeSuppliers: 12
  };

  // Mock waste data
  const [wasteData, setWasteData] = useState([
    {
      id: 1,
      itemName: 'Lettuce',
      quantity: 5,
      unit: 'lbs',
      reason: 'expired',
      cost: 12.50,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      itemName: 'Tomatoes',
      quantity: 3,
      unit: 'lbs',
      reason: 'spoiled',
      cost: 8.75,
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      itemName: 'Milk',
      quantity: 2,
      unit: 'gallons',
      reason: 'expired',
      cost: 6.50,
      timestamp: new Date(Date.now() - 10800000)
    }
  ]);

  // Filter inventory items based on active filters
  const filteredItems = inventoryItems?.filter(item => {
    if (activeFilters?.search && !item?.name?.toLowerCase()?.includes(activeFilters?.search?.toLowerCase()) &&
        !item?.category?.toLowerCase()?.includes(activeFilters?.search?.toLowerCase()) &&
        !item?.supplier?.toLowerCase()?.includes(activeFilters?.search?.toLowerCase())) {
      return false;
    }
    
    if (activeFilters?.category !== 'all' && item?.category?.toLowerCase()?.replace(/\s+/g, '-') !== activeFilters?.category) {
      return false;
    }
    
    if (activeFilters?.supplier !== 'all' && item?.supplier?.toLowerCase()?.replace(/\s+/g, '-') !== activeFilters?.supplier) {
      return false;
    }
    
    if (activeFilters?.stockLevel !== 'all') {
      const percentage = (item?.currentStock / item?.reorderLevel) * 100;
      switch (activeFilters?.stockLevel) {
        case 'critical':
          if (percentage > 25) return false;
          break;
        case 'low':
          if (percentage <= 25 || percentage > 50) return false;
          break;
        case 'medium':
          if (percentage <= 50 || percentage > 75) return false;
          break;
        case 'good':
          if (percentage <= 75 || percentage > 100) return false;
          break;
        case 'overstocked':
          if (percentage <= 100) return false;
          break;
      }
    }
    
    return true;
  });

  // Sort filtered items
  const sortedItems = [...filteredItems]?.sort((a, b) => {
    switch (activeFilters?.sortBy) {
      case 'name-asc':
        return a?.name?.localeCompare(b?.name);
      case 'name-desc':
        return b?.name?.localeCompare(a?.name);
      case 'stock-low':
        return a?.currentStock - b?.currentStock;
      case 'stock-high':
        return b?.currentStock - a?.currentStock;
      case 'cost-low':
        return a?.unitCost - b?.unitCost;
      case 'cost-high':
        return b?.unitCost - a?.unitCost;
      case 'updated-recent':
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      default:
        return 0;
    }
  });

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleStockUpdate = (itemId, newStock) => {
    setInventoryItems(items =>
      items?.map(item =>
        item?.id === itemId
          ? { ...item, currentStock: newStock, lastUpdated: new Date() }
          : item
      )
    );
  };

  const handleReorder = (itemId) => {
    const item = inventoryItems?.find(i => i?.id === itemId);
    if (item) {
      // In a real app, this would trigger a purchase order
      console.log(`Reordering ${item?.name} from ${item?.supplier}`);
    }
  };

  const handleItemSelect = (itemId, isSelected) => {
    if (isSelected) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems?.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedItems(sortedItems?.map(item => item?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setActiveFilters(newFilters);
    setSelectedItems([]); // Clear selection when filters change
  };

  const handleAddWaste = (wasteItem) => {
    setWasteData([wasteItem, ...wasteData]);
  };

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />

      {/* Main Content */}
      <main className={`transition-layout ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'} pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Inventory Management System
                </h1>
                <p className="text-muted-foreground">
                  Track stock levels, manage suppliers, and optimize inventory across all kitchen brands
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
                  <span>Real-time sync active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <InventoryFilters
              onFiltersChange={handleFiltersChange}
              activeFilters={activeFilters}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Inventory Table */}
            <div className="xl:col-span-8">
              <InventoryTable
                items={sortedItems}
                onStockUpdate={handleStockUpdate}
                onReorder={handleReorder}
                selectedItems={selectedItems}
                onItemSelect={handleItemSelect}
                onSelectAll={handleSelectAll}
              />
            </div>

            {/* Right Panel */}
            <div className="xl:col-span-4 space-y-6">
              {/* Summary Cards */}
              <InventorySummary summaryData={summaryData} />
              
              {/* Waste Tracker */}
              <WasteTracker
                wasteData={wasteData}
                onAddWaste={handleAddWaste}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InventoryManagementSystem;