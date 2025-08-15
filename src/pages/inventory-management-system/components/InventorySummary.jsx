import React from 'react';
import Icon from '../../../components/AppIcon';

const InventorySummary = ({ summaryData }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const summaryCards = [
    {
      title: 'Total Inventory Value',
      value: formatCurrency(summaryData?.totalValue),
      change: '+2.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'Across all brands'
    },
    {
      title: 'Items Requiring Reorder',
      value: summaryData?.reorderItems,
      change: '-12',
      changeType: 'negative',
      icon: 'AlertTriangle',
      description: 'Below threshold'
    },
    {
      title: 'Recent Deliveries',
      value: summaryData?.recentDeliveries,
      change: '+8',
      changeType: 'positive',
      icon: 'Truck',
      description: 'Last 24 hours'
    },
    {
      title: 'Active Suppliers',
      value: summaryData?.activeSuppliers,
      change: '+2',
      changeType: 'positive',
      icon: 'Users',
      description: 'This month'
    }
  ];

  const recentDeliveries = [
    {
      id: 1,
      supplier: 'Fresh Foods Co.',
      items: 'Tomatoes, Onions, Bell Peppers',
      value: 1250.00,
      status: 'delivered',
      time: '2 hours ago'
    },
    {
      id: 2,
      supplier: 'Meat Masters',
      items: 'Ground Beef, Chicken Breast',
      value: 890.50,
      status: 'in-transit',
      time: '4 hours ago'
    },
    {
      id: 3,
      supplier: 'Dairy Direct',
      items: 'Mozzarella, Cheddar, Milk',
      value: 675.25,
      status: 'delivered',
      time: '6 hours ago'
    }
  ];

  const lowStockAlerts = [
    {
      id: 1,
      name: 'Pizza Dough',
      currentStock: 15,
      unit: 'lbs',
      reorderLevel: 50,
      urgency: 'critical'
    },
    {
      id: 2,
      name: 'Mozzarella Cheese',
      currentStock: 8,
      unit: 'lbs',
      reorderLevel: 25,
      urgency: 'critical'
    },
    {
      id: 3,
      name: 'Tomato Sauce',
      currentStock: 12,
      unit: 'cans',
      reorderLevel: 30,
      urgency: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4">
        {summaryCards?.map((card, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                card?.changeType === 'positive' ? 'bg-success/10' : 
                card?.changeType === 'negative' ? 'bg-error/10' : 'bg-primary/10'
              }`}>
                <Icon 
                  name={card?.icon} 
                  size={20} 
                  className={
                    card?.changeType === 'positive' ? 'text-success' : 
                    card?.changeType === 'negative' ? 'text-error' : 'text-primary'
                  }
                />
              </div>
              <span className={`text-xs font-medium ${
                card?.changeType === 'positive' ? 'text-success' : 
                card?.changeType === 'negative' ? 'text-error' : 'text-muted-foreground'
              }`}>
                {card?.change}
              </span>
            </div>
            
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {card?.title}
            </h3>
            <p className="text-2xl font-bold text-foreground mb-1">
              {card?.value}
            </p>
            <p className="text-xs text-muted-foreground">
              {card?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Low Stock Alerts */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Icon name="AlertTriangle" size={18} className="text-warning" />
              Low Stock Alerts
            </h3>
            <span className="text-xs text-muted-foreground">
              {lowStockAlerts?.length} items
            </span>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {lowStockAlerts?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  item?.urgency === 'critical' ? 'bg-error' : 'bg-warning'
                }`}></div>
                <div>
                  <p className="font-medium text-foreground text-sm">{item?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item?.currentStock} {item?.unit} remaining
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Reorder at</p>
                <p className="text-sm font-medium text-foreground">
                  {item?.reorderLevel} {item?.unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Deliveries */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Icon name="Truck" size={18} className="text-primary" />
              Recent Deliveries
            </h3>
            <span className="text-xs text-muted-foreground">
              Last 24 hours
            </span>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {recentDeliveries?.map((delivery) => (
            <div key={delivery?.id} className="flex items-start justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                  <Icon name="Package" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{delivery?.supplier}</p>
                  <p className="text-xs text-muted-foreground mb-1">{delivery?.items}</p>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      delivery?.status === 'delivered' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        delivery?.status === 'delivered' ? 'bg-success' : 'bg-warning'
                      }`}></div>
                      {delivery?.status === 'delivered' ? 'Delivered' : 'In Transit'}
                    </span>
                    <span className="text-xs text-muted-foreground">{delivery?.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground text-sm">
                  {formatCurrency(delivery?.value)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Zap" size={18} className="text-accent" />
          Quick Actions
        </h3>
        
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/30 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Add New Item</p>
              <p className="text-xs text-muted-foreground">Create inventory entry</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/30 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Upload" size={16} className="text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Bulk Import</p>
              <p className="text-xs text-muted-foreground">Upload CSV file</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/30 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={16} className="text-warning" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Generate Report</p>
              <p className="text-xs text-muted-foreground">Inventory analysis</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;