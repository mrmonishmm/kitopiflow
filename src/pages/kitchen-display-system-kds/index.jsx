import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import KDSHeader from './components/KDSHeader';
import KanbanColumn from './components/KanbanColumn';
import OrderDetailsModal from './components/OrderDetailsModal';
import AudioNotifications from './components/AudioNotifications';

const KitchenDisplaySystem = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [orders, setOrders] = useState([]);

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-001',
      orderNumber: '1247',
      platform: 'uber-eats',
      customerName: 'Sarah Johnson',
      customerPhone: '+1-555-0123',
      deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
      orderTime: new Date(Date.now() - 900000), // 15 minutes ago
      estimatedCompletionTime: new Date(Date.now() + 300000), // 5 minutes from now
      stage: 'new',
      priority: 'normal',
      isRush: false,
      assignedStation: 'grill',
      specialInstructions: 'Extra crispy fries, no pickles on burger',
      allergens: ['Gluten', 'Dairy'],
      items: [
        {
          name: 'Classic Cheeseburger',
          quantity: 2,
          size: 'Regular',
          price: 12.99,
          modifications: ['No pickles', 'Extra cheese'],
          cookingInstructions: 'Medium-well, extra crispy'
        },
        {
          name: 'French Fries',
          quantity: 1,
          size: 'Large',
          price: 4.99,
          modifications: ['Extra crispy'],
          cookingInstructions: 'Cook until golden brown'
        },
        {
          name: 'Chocolate Milkshake',
          quantity: 1,
          size: 'Regular',
          price: 5.99,
          modifications: [],
          cookingInstructions: 'Extra thick'
        }
      ]
    },
    {
      id: 'ORD-002',
      orderNumber: '1248',
      platform: 'doordash',
      customerName: 'Mike Chen',
      customerPhone: '+1-555-0124',
      deliveryAddress: '456 Oak Ave, Suite 12, Brooklyn, NY 11201',
      orderTime: new Date(Date.now() - 1200000), // 20 minutes ago
      estimatedCompletionTime: new Date(Date.now() - 300000), // 5 minutes overdue
      stage: 'prep',
      priority: 'high',
      isRush: true,
      assignedStation: 'pizza',
      specialInstructions: 'Customer has severe nut allergy - please use separate prep area',
      allergens: ['Nuts'],
      items: [
        {
          name: 'Margherita Pizza',
          quantity: 1,
          size: 'Large',
          price: 18.99,
          modifications: ['Extra basil', 'Light cheese'],
          cookingInstructions: 'Well done crust'
        },
        {
          name: 'Caesar Salad',
          quantity: 1,
          size: 'Regular',
          price: 8.99,
          modifications: ['No croutons', 'Dressing on side'],
          cookingInstructions: 'Fresh romaine only'
        }
      ]
    },
    {
      id: 'ORD-003',
      orderNumber: '1249',
      platform: 'grubhub',
      customerName: 'Emily Rodriguez',
      customerPhone: '+1-555-0125',
      deliveryAddress: '789 Pine St, Floor 3, Manhattan, NY 10002',
      orderTime: new Date(Date.now() - 600000), // 10 minutes ago
      estimatedCompletionTime: new Date(Date.now() + 600000), // 10 minutes from now
      stage: 'quality',
      priority: 'normal',
      isRush: false,
      assignedStation: 'sushi',
      specialInstructions: '',
      allergens: ['Fish', 'Soy'],
      items: [
        {
          name: 'California Roll',
          quantity: 2,
          size: '8 pieces',
          price: 12.99,
          modifications: ['No avocado'],
          cookingInstructions: 'Fresh wasabi on side'
        },
        {
          name: 'Miso Soup',
          quantity: 1,
          size: 'Regular',
          price: 3.99,
          modifications: [],
          cookingInstructions: 'Extra hot'
        },
        {
          name: 'Edamame',
          quantity: 1,
          size: 'Regular',
          price: 4.99,
          modifications: ['Extra salt'],
          cookingInstructions: 'Steam until tender'
        }
      ]
    },
    {
      id: 'ORD-004',
      orderNumber: '1250',
      platform: 'direct',
      customerName: 'David Kim',
      customerPhone: '+1-555-0126',
      deliveryAddress: '321 Elm St, Apt 7A, Queens, NY 11375',
      orderTime: new Date(Date.now() - 300000), // 5 minutes ago
      estimatedCompletionTime: new Date(Date.now() + 900000), // 15 minutes from now
      stage: 'completed',
      priority: 'normal',
      isRush: false,
      assignedStation: 'dessert',
      specialInstructions: 'Birthday order - please add candles',
      allergens: ['Eggs', 'Dairy'],
      items: [
        {
          name: 'Chocolate Birthday Cake',
          quantity: 1,
          size: '9 inch',
          price: 24.99,
          modifications: ['Happy Birthday message', 'Extra frosting'],
          cookingInstructions: 'Add birthday candles'
        },
        {
          name: 'Vanilla Ice Cream',
          quantity: 2,
          size: 'Pint',
          price: 6.99,
          modifications: [],
          cookingInstructions: 'Keep frozen until pickup'
        }
      ]
    },
    {
      id: 'ORD-005',
      orderNumber: '1251',
      platform: 'uber-eats',
      customerName: 'Lisa Thompson',
      customerPhone: '+1-555-0127',
      deliveryAddress: '654 Maple Dr, Unit 5, Bronx, NY 10451',
      orderTime: new Date(Date.now() - 180000), // 3 minutes ago
      estimatedCompletionTime: new Date(Date.now() + 1200000), // 20 minutes from now
      stage: 'new',
      priority: 'normal',
      isRush: false,
      assignedStation: 'salad',
      specialInstructions: 'Vegan order - no animal products',
      allergens: [],
      items: [
        {
          name: 'Quinoa Power Bowl',
          quantity: 1,
          size: 'Large',
          price: 14.99,
          modifications: ['Extra quinoa', 'No cheese', 'Vegan dressing'],
          cookingInstructions: 'Use vegan prep area'
        },
        {
          name: 'Green Smoothie',
          quantity: 1,
          size: 'Large',
          price: 7.99,
          modifications: ['Almond milk', 'Extra spinach'],
          cookingInstructions: 'Blend until smooth'
        }
      ]
    },
    {
      id: 'ORD-006',
      orderNumber: '1252',
      platform: 'doordash',
      customerName: 'James Wilson',
      customerPhone: '+1-555-0128',
      deliveryAddress: '987 Cedar Ln, Apt 2C, Staten Island, NY 10301',
      orderTime: new Date(Date.now() - 450000), // 7.5 minutes ago
      estimatedCompletionTime: new Date(Date.now() + 450000), // 7.5 minutes from now
      stage: 'prep',
      priority: 'high',
      isRush: false,
      assignedStation: 'fryer',
      specialInstructions: 'Customer requested extra sauce packets',
      allergens: ['Gluten'],
      items: [
        {
          name: 'Buffalo Wings',
          quantity: 12,
          size: 'Regular',
          price: 16.99,
          modifications: ['Extra hot sauce', 'Ranch dressing'],
          cookingInstructions: 'Crispy wings, toss in buffalo sauce'
        },
        {
          name: 'Onion Rings',
          quantity: 1,
          size: 'Large',
          price: 6.99,
          modifications: ['Extra crispy'],
          cookingInstructions: 'Golden brown, drain well'
        }
      ]
    }
  ];

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMoveOrder = (orderId, fromStage, toStage) => {
    setOrders(prevOrders => 
      prevOrders?.map(order => 
        order?.id === orderId 
          ? { ...order, stage: toStage }
          : order
      )
    );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleRefresh = () => {
    // Simulate data refresh
    console.log('Refreshing order data...');
  };

  const handleEmergencyStop = (isEmergency) => {
    setIsEmergencyMode(isEmergency);
  };

  const filterOrders = (orders, stage) => {
    let filtered = orders?.filter(order => order?.stage === stage);
    
    if (selectedStation !== 'all') {
      filtered = filtered?.filter(order => order?.assignedStation === selectedStation);
    }
    
    if (selectedBrand !== 'all') {
      // Filter by brand based on platform or other criteria
      filtered = filtered?.filter(order => {
        // Mock brand filtering logic
        return true;
      });
    }
    
    return filtered;
  };

  const columns = [
    {
      title: 'New Orders',
      stage: 'new',
      icon: 'Plus',
      color: 'primary',
      orders: filterOrders(orders, 'new')
    },
    {
      title: 'In Preparation',
      stage: 'prep',
      icon: 'ChefHat',
      color: 'warning',
      orders: filterOrders(orders, 'prep')
    },
    {
      title: 'Quality Check',
      stage: 'quality',
      icon: 'CheckCircle',
      color: 'secondary',
      orders: filterOrders(orders, 'quality')
    },
    {
      title: 'Completed',
      stage: 'completed',
      icon: 'Check',
      color: 'success',
      orders: filterOrders(orders, 'completed')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={handleSidebarToggle}
        isMenuOpen={isSidebarOpen}
      />
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {/* Main Content */}
      <div className="lg:ml-60 pt-16">
        {/* KDS Header */}
        <KDSHeader
          selectedStation={selectedStation}
          onStationChange={setSelectedStation}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          onEmergencyStop={handleEmergencyStop}
          onRefresh={handleRefresh}
        />

        {/* Kanban Board */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {columns?.map((column) => (
              <KanbanColumn
                key={column?.stage}
                title={column?.title}
                stage={column?.stage}
                icon={column?.icon}
                color={column?.color}
                orders={column?.orders}
                onMoveOrder={handleMoveOrder}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>

        {/* Order Details Modal */}
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onMoveOrder={handleMoveOrder}
        />

        {/* Audio Notifications */}
        <AudioNotifications
          orders={orders}
          isEnabled={!isEmergencyMode}
        />
      </div>
    </div>
  );
};

export default KitchenDisplaySystem;