import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock inventory alerts data
    const mockAlerts = [
      {
        id: 1,
        item: 'Mozzarella Cheese',
        brand: 'Pizza Palace',
        currentStock: 2,
        minThreshold: 10,
        unit: 'lbs',
        severity: 'critical',
        lastUpdated: '2 min ago',
        supplier: 'Dairy Fresh Co.',
        estimatedRunOut: '4 hours'
      },
      {
        id: 2,
        item: 'Ground Beef',
        brand: 'Burger Barn',
        currentStock: 5,
        minThreshold: 15,
        unit: 'lbs',
        severity: 'high',
        lastUpdated: '15 min ago',
        supplier: 'Premium Meats',
        estimatedRunOut: '8 hours'
      },
      {
        id: 3,
        item: 'Avocados',
        brand: 'Taco Time',
        currentStock: 12,
        minThreshold: 25,
        unit: 'pieces',
        severity: 'medium',
        lastUpdated: '1 hour ago',
        supplier: 'Fresh Produce Ltd.',
        estimatedRunOut: '1 day'
      },
      {
        id: 4,
        item: 'Soy Sauce',
        brand: 'Sushi Spot',
        currentStock: 1,
        minThreshold: 5,
        unit: 'bottles',
        severity: 'critical',
        lastUpdated: '30 min ago',
        supplier: 'Asian Imports',
        estimatedRunOut: '6 hours'
      },
      {
        id: 5,
        item: 'Pizza Dough',
        brand: 'Pizza Palace',
        currentStock: 8,
        minThreshold: 20,
        unit: 'portions',
        severity: 'medium',
        lastUpdated: '45 min ago',
        supplier: 'Bakery Supply Co.',
        estimatedRunOut: '12 hours'
      }
    ];
    setAlerts(mockAlerts);
  }, []);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-error/10 text-error border-error/20',
      high: 'bg-warning/10 text-warning border-warning/20',
      medium: 'bg-accent/10 text-accent border-accent/20',
      low: 'bg-muted text-muted-foreground border-border'
    };
    return colors?.[severity] || colors?.low;
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      critical: 'AlertTriangle',
      high: 'AlertCircle',
      medium: 'Info',
      low: 'CheckCircle'
    };
    return icons?.[severity] || 'Info';
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts?.filter(alert => alert?.severity === filter);

  const alertCounts = {
    critical: alerts?.filter(a => a?.severity === 'critical')?.length,
    high: alerts?.filter(a => a?.severity === 'high')?.length,
    medium: alerts?.filter(a => a?.severity === 'medium')?.length
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Icon name="Package" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Inventory Alerts</h3>
          </div>
          <Button variant="outline" size="sm" iconName="Settings" iconSize={16}>
            Settings
          </Button>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-error/10 rounded-lg">
            <p className="text-lg font-bold text-error">{alertCounts?.critical}</p>
            <p className="text-xs text-error">Critical</p>
          </div>
          <div className="text-center p-2 bg-warning/10 rounded-lg">
            <p className="text-lg font-bold text-warning">{alertCounts?.high}</p>
            <p className="text-xs text-warning">High</p>
          </div>
          <div className="text-center p-2 bg-accent/10 rounded-lg">
            <p className="text-lg font-bold text-accent">{alertCounts?.medium}</p>
            <p className="text-xs text-accent">Medium</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {['all', 'critical', 'high', 'medium']?.map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="xs"
              onClick={() => setFilter(filterType)}
            >
              {filterType?.charAt(0)?.toUpperCase() + filterType?.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredAlerts?.map((alert) => (
            <div key={alert?.id} className={`border rounded-lg p-4 ${getSeverityColor(alert?.severity)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon name={getSeverityIcon(alert?.severity)} size={18} />
                  <div>
                    <p className="font-medium text-sm">{alert?.item}</p>
                    <p className="text-xs opacity-80">{alert?.brand}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">
                    {alert?.currentStock} {alert?.unit}
                  </p>
                  <p className="text-xs opacity-80">
                    Min: {alert?.minThreshold} {alert?.unit}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                <div>
                  <p className="opacity-80">Supplier:</p>
                  <p className="font-medium">{alert?.supplier}</p>
                </div>
                <div>
                  <p className="opacity-80">Est. Run Out:</p>
                  <p className="font-medium">{alert?.estimatedRunOut}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs opacity-80">
                  Updated {alert?.lastUpdated}
                </span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="xs" iconName="ShoppingCart" iconSize={14}>
                    Reorder
                  </Button>
                  <Button variant="ghost" size="xs" iconName="Eye" iconSize={14}>
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <p className="text-muted-foreground">No {filter === 'all' ? '' : filter} alerts at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryAlerts;