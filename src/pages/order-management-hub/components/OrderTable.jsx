import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderTable = ({ 
  orders, 
  onOrderSelect, 
  onStatusUpdate, 
  onPriorityToggle,
  onAssignStation,
  selectedOrders,
  onOrderToggle 
}) => {
  const [sortBy, setSortBy] = useState('promisedTime');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedOrders = [...orders]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'promisedTime' || sortBy === 'orderTime') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'confirmed': 'bg-green-100 text-green-800',
      'preparing': 'bg-yellow-100 text-yellow-800',
      'ready': 'bg-purple-100 text-purple-800',
      'picked-up': 'bg-gray-100 text-gray-800',
      'delayed': 'bg-red-100 text-red-800'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'ubereats': 'Car',
      'doordash': 'Truck',
      'grubhub': 'ShoppingBag'
    };
    return icons?.[platform] || 'ShoppingCart';
  };

  const formatTime = (time) => {
    return new Date(time)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilPromised = (promisedTime) => {
    const now = new Date();
    const promised = new Date(promisedTime);
    const diffMinutes = Math.floor((promised - now) / (1000 * 60));
    
    if (diffMinutes < 0) {
      return { text: `${Math.abs(diffMinutes)}m late`, color: 'text-error' };
    } else if (diffMinutes < 15) {
      return { text: `${diffMinutes}m left`, color: 'text-warning' };
    } else {
      return { text: `${diffMinutes}m left`, color: 'text-success' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-3">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      orders?.forEach(order => onOrderToggle(order?.id, true));
                    } else {
                      orders?.forEach(order => onOrderToggle(order?.id, false));
                    }
                  }}
                />
              </th>
              <th 
                className="text-left p-3 cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => handleSort('orderId')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Order ID</span>
                  <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />
                </div>
              </th>
              <th className="text-left p-3">
                <span className="text-sm font-medium text-foreground">Platform</span>
              </th>
              <th className="text-left p-3">
                <span className="text-sm font-medium text-foreground">Items</span>
              </th>
              <th className="text-left p-3">
                <span className="text-sm font-medium text-foreground">Customer</span>
              </th>
              <th 
                className="text-left p-3 cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => handleSort('promisedTime')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Promised Time</span>
                  <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />
                </div>
              </th>
              <th className="text-left p-3">
                <span className="text-sm font-medium text-foreground">Status</span>
              </th>
              <th className="text-left p-3">
                <span className="text-sm font-medium text-foreground">Est. Completion</span>
              </th>
              <th className="text-center p-3">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders?.map((order) => {
              const timeInfo = getTimeUntilPromised(order?.promisedTime);
              
              return (
                <tr 
                  key={order?.id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    order?.isNew ? 'bg-blue-50 animate-pulse-soft' : ''
                  } ${order?.isPriority ? 'border-l-4 border-l-error' : ''}`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={selectedOrders?.includes(order?.id)}
                      onChange={(e) => onOrderToggle(order?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">#{order?.orderId}</span>
                      {order?.isPriority && (
                        <Icon name="AlertTriangle" size={14} className="text-error" />
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Icon name={getPlatformIcon(order?.platform)} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground capitalize">{order?.platform}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order?.items?.length} items</p>
                      <p className="text-xs text-muted-foreground">
                        {order?.items?.slice(0, 2)?.map(item => item?.name)?.join(', ')}
                        {order?.items?.length > 2 && ` +${order?.items?.length - 2} more`}
                      </p>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order?.customer?.name}</p>
                      <p className="text-xs text-muted-foreground">{order?.customer?.phone}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{formatTime(order?.promisedTime)}</p>
                      <p className={`text-xs ${timeInfo?.color}`}>{timeInfo?.text}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                      {order?.status?.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="p-3">
                    <p className="text-sm text-foreground">{formatTime(order?.estimatedCompletion)}</p>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Eye"
                        iconSize={14}
                        onClick={() => onOrderSelect(order)}
                        className="h-8 w-8"
                      >
                        <span className="sr-only">View details</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Clock"
                        iconSize={14}
                        className="h-8 w-8"
                      >
                        <span className="sr-only">Modify timing</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Users"
                        iconSize={14}
                        onClick={() => onAssignStation(order?.id)}
                        className="h-8 w-8"
                      >
                        <span className="sr-only">Assign station</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName={order?.isPriority ? "Star" : "StarOff"}
                        iconSize={14}
                        onClick={() => onPriorityToggle(order?.id)}
                        className={`h-8 w-8 ${order?.isPriority ? 'text-warning' : ''}`}
                      >
                        <span className="sr-only">Toggle priority</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {orders?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
          <p className="text-muted-foreground">Orders will appear here when they come in from delivery platforms.</p>
        </div>
      )}
    </div>
  );
};

export default OrderTable;