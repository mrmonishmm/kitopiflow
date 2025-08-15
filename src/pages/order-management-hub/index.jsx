import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PlatformFilters from './components/PlatformFilters';
import MetricsBar from './components/MetricsBar';
import SearchAndFilters from './components/SearchAndFilters';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import OrderTable from './components/OrderTable';
import OrderDetailsModal from './components/OrderDetailsModal';
import IntegrationStatus from './components/IntegrationStatus';

const OrderManagementHub = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['all']);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    timeRange: '',
    sortBy: 'promisedTime-asc',
    priorityOnly: false
  });

  // Mock data for orders
  const [orders] = useState([
    {
      id: 'ord_001',
      orderId: '2024-0815-001',
      platform: 'ubereats',
      orderTime: new Date(Date.now() - 1800000), // 30 minutes ago
      promisedTime: new Date(Date.now() + 900000), // 15 minutes from now
      estimatedCompletion: new Date(Date.now() + 600000), // 10 minutes from now
      estimatedPrepTime: 25,
      status: 'new',
      isPriority: false,
      isNew: true,
      customer: {
        name: 'Sarah Johnson',
        phone: '(555) 123-4567',
        address: '123 Main St, Apt 4B, Downtown, NY 10001'
      },
      items: [
        {
          name: 'Margherita Pizza',
          quantity: 1,
          price: 18.99,
          modifications: ['Extra cheese', 'Thin crust'],
          notes: 'Please make it crispy'
        },
        {
          name: 'Caesar Salad',
          quantity: 1,
          price: 12.99,
          modifications: ['No croutons'],
          notes: null
        }
      ],
      customerNotes: 'Please ring doorbell twice. Leave at door if no answer.',
      preparationInstructions: 'Customer has nut allergy - use separate prep area',
      stationAssignments: [
        { station: 'Pizza Station', staff: 'Mike Rodriguez' },
        { station: 'Salad Station', staff: 'Anna Chen' }
      ]
    },
    {
      id: 'ord_002',
      orderId: '2024-0815-002',
      platform: 'doordash',
      orderTime: new Date(Date.now() - 2400000), // 40 minutes ago
      promisedTime: new Date(Date.now() - 300000), // 5 minutes ago (late)
      estimatedCompletion: new Date(Date.now() + 300000), // 5 minutes from now
      estimatedPrepTime: 30,
      status: 'delayed',
      isPriority: true,
      isNew: false,
      customer: {
        name: 'Michael Brown',
        phone: '(555) 987-6543',
        address: '456 Oak Avenue, Suite 12, Midtown, NY 10002'
      },
      items: [
        {
          name: 'Chicken Burger',
          quantity: 2,
          price: 15.99,
          modifications: ['No pickles', 'Extra sauce'],
          notes: null
        },
        {
          name: 'French Fries',
          quantity: 2,
          price: 6.99,
          modifications: ['Extra crispy'],
          notes: null
        },
        {
          name: 'Chocolate Shake',
          quantity: 1,
          price: 5.99,
          modifications: [],
          notes: 'Extra thick'
        }
      ],
      customerNotes: 'Contactless delivery preferred',
      preparationInstructions: null,
      stationAssignments: [
        { station: 'Grill Station', staff: 'David Wilson' },
        { station: 'Fryer Station', staff: 'Lisa Park' }
      ]
    },
    {
      id: 'ord_003',
      orderId: '2024-0815-003',
      platform: 'grubhub',
      orderTime: new Date(Date.now() - 1200000), // 20 minutes ago
      promisedTime: new Date(Date.now() + 1800000), // 30 minutes from now
      estimatedCompletion: new Date(Date.now() + 1200000), // 20 minutes from now
      estimatedPrepTime: 35,
      status: 'preparing',
      isPriority: false,
      isNew: false,
      customer: {
        name: 'Emily Davis',
        phone: '(555) 456-7890',
        address: '789 Pine Street, Floor 3, Uptown, NY 10003'
      },
      items: [
        {
          name: 'Sushi Combo',
          quantity: 1,
          price: 24.99,
          modifications: ['No wasabi', 'Extra ginger'],
          notes: null
        },
        {
          name: 'Miso Soup',
          quantity: 1,
          price: 4.99,
          modifications: [],
          notes: null
        }
      ],
      customerNotes: 'Please include chopsticks and soy sauce packets',
      preparationInstructions: 'Use fresh fish from today\'s delivery',
      stationAssignments: [
        { station: 'Sushi Station', staff: 'Kenji Tanaka' }
      ]
    },
    {
      id: 'ord_004',
      orderId: '2024-0815-004',
      platform: 'ubereats',
      orderTime: new Date(Date.now() - 600000), // 10 minutes ago
      promisedTime: new Date(Date.now() + 2100000), // 35 minutes from now
      estimatedCompletion: new Date(Date.now() + 1800000), // 30 minutes from now
      estimatedPrepTime: 40,
      status: 'confirmed',
      isPriority: false,
      isNew: false,
      customer: {
        name: 'Robert Taylor',
        phone: '(555) 321-0987',
        address: '321 Elm Drive, Building A, Westside, NY 10004'
      },
      items: [
        {
          name: 'Beef Tacos',
          quantity: 3,
          price: 4.99,
          modifications: ['Extra spicy', 'No onions'],
          notes: null
        },
        {
          name: 'Guacamole',
          quantity: 1,
          price: 3.99,
          modifications: [],
          notes: null
        },
        {
          name: 'Mexican Rice',
          quantity: 1,
          price: 2.99,
          modifications: [],
          notes: null
        }
      ],
      customerNotes: 'Please double-check spice level - customer is very sensitive',
      preparationInstructions: 'Use mild salsa instead of medium for spicy request',
      stationAssignments: null
    }
  ]);

  // Mock platform statistics
  const platformStats = {
    total: orders?.length,
    ubereats: orders?.filter(o => o?.platform === 'ubereats')?.length,
    doordash: orders?.filter(o => o?.platform === 'doordash')?.length,
    grubhub: orders?.filter(o => o?.platform === 'grubhub')?.length
  };

  // Mock connection status
  const [connectionStatus] = useState({
    ubereats: 'connected',
    doordash: 'connected',
    grubhub: 'connected',
    pos: 'connected'
  });

  // Mock metrics
  const metrics = {
    avgPrepTime: 28,
    prepTimeTrend: -2,
    onTimeRate: 87,
    onTimeRateTrend: 3,
    kitchenLoad: 73,
    kitchenLoadTrend: 5,
    activeOrders: orders?.length,
    activeOrdersTrend: 2
  };

  // Filter orders based on selected platforms and search
  const filteredOrders = orders?.filter(order => {
    // Platform filter
    if (!selectedPlatforms?.includes('all') && !selectedPlatforms?.includes(order?.platform)) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      const matchesOrderId = order?.orderId?.toLowerCase()?.includes(query);
      const matchesCustomer = order?.customer?.name?.toLowerCase()?.includes(query);
      const matchesItems = order?.items?.some(item => 
        item?.name?.toLowerCase()?.includes(query)
      );
      
      if (!matchesOrderId && !matchesCustomer && !matchesItems) {
        return false;
      }
    }

    // Status filter
    if (filters?.status && order?.status !== filters?.status) {
      return false;
    }

    // Priority filter
    if (filters?.priorityOnly && !order?.isPriority) {
      return false;
    }

    return true;
  });

  const handlePlatformToggle = (platformId) => {
    if (platformId === 'all') {
      setSelectedPlatforms(['all']);
    } else {
      setSelectedPlatforms(prev => {
        const newSelection = prev?.filter(p => p !== 'all');
        if (newSelection?.includes(platformId)) {
          const filtered = newSelection?.filter(p => p !== platformId);
          return filtered?.length === 0 ? ['all'] : filtered;
        } else {
          return [...newSelection, platformId];
        }
      });
    }
  };

  const handleOrderToggle = (orderId, checked) => {
    setSelectedOrders(prev => {
      if (checked) {
        return [...prev, orderId];
      } else {
        return prev?.filter(id => id !== orderId);
      }
    });
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // In a real app, this would update the order status
  };

  const handlePriorityToggle = (orderId) => {
    console.log(`Toggling priority for order: ${orderId}`);
    // In a real app, this would toggle the priority status
  };

  const handleAssignStation = (orderId) => {
    console.log(`Assigning station for order: ${orderId}`);
    // In a real app, this would open a station assignment modal
  };

  const handleBulkStatusUpdate = (status) => {
    console.log(`Bulk updating ${selectedOrders?.length} orders to status: ${status}`);
    setSelectedOrders([]);
  };

  const handleBulkStationAssign = (station) => {
    console.log(`Bulk assigning ${selectedOrders?.length} orders to station: ${station}`);
    setSelectedOrders([]);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      timeRange: '',
      sortBy: 'promisedTime-asc',
      priorityOnly: false
    });
    setSearchQuery('');
  };

  const handleReconnect = (integrationId) => {
    console.log(`Reconnecting to: ${integrationId}`);
    // In a real app, this would attempt to reconnect to the integration
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch new orders or updates
      console.log('Checking for order updates...');
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Order Management Hub - KitopiFlow</title>
        <meta name="description" content="Centralized order management system for multi-platform food delivery operations" />
      </Helmet>
      <Header 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Order Management Hub</h1>
            <p className="text-muted-foreground">
              Centralize and manage orders from all delivery platforms with intelligent prioritization
            </p>
          </div>

          {/* Metrics Bar */}
          <MetricsBar metrics={metrics} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Platform Filters & Integration Status */}
            <div className="lg:col-span-3 space-y-6">
              <PlatformFilters
                selectedPlatforms={selectedPlatforms}
                onPlatformToggle={handlePlatformToggle}
                platformStats={platformStats}
                connectionStatus={connectionStatus}
              />
              
              <IntegrationStatus
                connectionStatus={connectionStatus}
                onReconnect={handleReconnect}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              {/* Search and Filters */}
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />

              {/* Bulk Actions Toolbar */}
              <BulkActionsToolbar
                selectedCount={selectedOrders?.length}
                onBulkStatusUpdate={handleBulkStatusUpdate}
                onBulkStationAssign={handleBulkStationAssign}
                onClearSelection={() => setSelectedOrders([])}
              />

              {/* Orders Table */}
              <OrderTable
                orders={filteredOrders}
                onOrderSelect={handleOrderSelect}
                onStatusUpdate={handleStatusUpdate}
                onPriorityToggle={handlePriorityToggle}
                onAssignStation={handleAssignStation}
                selectedOrders={selectedOrders}
                onOrderToggle={handleOrderToggle}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedOrder(null);
        }}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default OrderManagementHub;