import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveOrderQueue = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock real-time order data
    const mockOrders = [
      {
        id: 'ORD-2024-001',
        brand: 'Pizza Palace',
        customer: 'John Smith',
        items: ['Margherita Pizza', 'Caesar Salad'],
        priority: 'high',
        prepTime: '12 min',
        timeRemaining: '8 min',
        status: 'preparing',
        platform: 'UberEats',
        orderTime: '6:45 PM'
      },
      {
        id: 'ORD-2024-002',
        brand: 'Burger Barn',
        customer: 'Sarah Johnson',
        items: ['Classic Burger', 'Fries', 'Coke'],
        priority: 'medium',
        prepTime: '8 min',
        timeRemaining: '3 min',
        status: 'ready',
        platform: 'DoorDash',
        orderTime: '6:42 PM'
      },
      {
        id: 'ORD-2024-003',
        brand: 'Taco Time',
        customer: 'Mike Davis',
        items: ['Chicken Tacos x3', 'Guacamole'],
        priority: 'low',
        prepTime: '6 min',
        timeRemaining: '15 min',
        status: 'pending',
        platform: 'Grubhub',
        orderTime: '6:48 PM'
      },
      {
        id: 'ORD-2024-004',
        brand: 'Sushi Spot',
        customer: 'Lisa Chen',
        items: ['California Roll', 'Salmon Sashimi'],
        priority: 'high',
        prepTime: '18 min',
        timeRemaining: '5 min',
        status: 'preparing',
        platform: 'UberEats',
        orderTime: '6:35 PM'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-muted text-muted-foreground'
    };
    return colors?.[priority] || colors?.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-muted-foreground',
      preparing: 'text-warning',
      ready: 'text-success'
    };
    return colors?.[status] || colors?.pending;
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'UberEats': 'Truck',
      'DoorDash': 'Car',
      'Grubhub': 'Bike'
    };
    return icons?.[platform] || 'Package';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Live Order Queue</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
            <span className="text-sm text-muted-foreground">Live Updates</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {orders?.map((order) => (
            <div key={order?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(order?.priority)}`}>
                    {order?.priority?.toUpperCase()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name={getPlatformIcon(order?.platform)} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{order?.platform}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{order?.id}</p>
                  <p className="text-xs text-muted-foreground">{order?.orderTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{order?.brand}</p>
                  <p className="text-xs text-muted-foreground">{order?.customer}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${getStatusColor(order?.status)}`}>
                    {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order?.timeRemaining} remaining
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-foreground mb-1">Items:</p>
                <div className="flex flex-wrap gap-1">
                  {order?.items?.map((item, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Timer" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Prep: {order?.prepTime}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="xs" iconName="Eye" iconSize={14}>
                    View
                  </Button>
                  <Button variant="ghost" size="xs" iconName="MoreHorizontal" iconSize={14}>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveOrderQueue;