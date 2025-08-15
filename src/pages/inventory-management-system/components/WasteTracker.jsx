import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WasteTracker = ({ wasteData, onAddWaste }) => {
  const [isAddingWaste, setIsAddingWaste] = useState(false);
  const [newWaste, setNewWaste] = useState({
    itemName: '',
    quantity: '',
    unit: '',
    reason: '',
    cost: ''
  });

  const wasteReasons = [
    { value: 'expired', label: 'Expired' },
    { value: 'spoiled', label: 'Spoiled' },
    { value: 'damaged', label: 'Damaged in Transit' },
    { value: 'overproduction', label: 'Overproduction' },
    { value: 'contaminated', label: 'Contaminated' },
    { value: 'quality-issue', label: 'Quality Issue' },
    { value: 'equipment-failure', label: 'Equipment Failure' },
    { value: 'other', label: 'Other' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const handleAddWaste = () => {
    if (newWaste?.itemName && newWaste?.quantity && newWaste?.reason) {
      onAddWaste({
        ...newWaste,
        id: Date.now(),
        timestamp: new Date(),
        quantity: parseFloat(newWaste?.quantity),
        cost: parseFloat(newWaste?.cost) || 0
      });
      setNewWaste({
        itemName: '',
        quantity: '',
        unit: '',
        reason: '',
        cost: ''
      });
      setIsAddingWaste(false);
    }
  };

  const getReasonIcon = (reason) => {
    const iconMap = {
      'expired': 'Clock',
      'spoiled': 'AlertTriangle',
      'damaged': 'Package',
      'overproduction': 'TrendingUp',
      'contaminated': 'Shield',
      'quality-issue': 'X',
      'equipment-failure': 'Settings',
      'other': 'HelpCircle'
    };
    return iconMap?.[reason] || 'HelpCircle';
  };

  const getReasonColor = (reason) => {
    const colorMap = {
      'expired': 'text-warning',
      'spoiled': 'text-error',
      'damaged': 'text-warning',
      'overproduction': 'text-primary',
      'contaminated': 'text-error',
      'quality-issue': 'text-error',
      'equipment-failure': 'text-warning',
      'other': 'text-muted-foreground'
    };
    return colorMap?.[reason] || 'text-muted-foreground';
  };

  const totalWasteCost = wasteData?.reduce((sum, item) => sum + item?.cost, 0);
  const todayWaste = wasteData?.filter(item => {
    const today = new Date();
    const itemDate = new Date(item.timestamp);
    return itemDate?.toDateString() === today?.toDateString();
  });

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Trash2" size={20} className="text-error" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Waste Tracker</h3>
              <p className="text-sm text-muted-foreground">
                Monitor and reduce food waste
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            onClick={() => setIsAddingWaste(true)}
          >
            Log Waste
          </Button>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-error">{formatCurrency(totalWasteCost)}</p>
            <p className="text-xs text-muted-foreground">Total Cost This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{wasteData?.length}</p>
            <p className="text-xs text-muted-foreground">Waste Incidents</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{todayWaste?.length}</p>
            <p className="text-xs text-muted-foreground">Today's Waste</p>
          </div>
        </div>
      </div>
      {/* Add Waste Form */}
      {isAddingWaste && (
        <div className="p-4 border-b border-border bg-muted/20">
          <h4 className="font-medium text-foreground mb-4">Log New Waste</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Item Name"
              type="text"
              placeholder="e.g., Tomatoes"
              value={newWaste?.itemName}
              onChange={(e) => setNewWaste({ ...newWaste, itemName: e?.target?.value })}
              required
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Quantity"
                type="number"
                placeholder="0"
                value={newWaste?.quantity}
                onChange={(e) => setNewWaste({ ...newWaste, quantity: e?.target?.value })}
                required
              />
              <Input
                label="Unit"
                type="text"
                placeholder="lbs, kg, pcs"
                value={newWaste?.unit}
                onChange={(e) => setNewWaste({ ...newWaste, unit: e?.target?.value })}
              />
            </div>
            
            <Select
              label="Reason"
              options={wasteReasons}
              value={newWaste?.reason}
              onChange={(value) => setNewWaste({ ...newWaste, reason: value })}
              placeholder="Select reason"
              required
            />
            
            <Input
              label="Estimated Cost"
              type="number"
              placeholder="0.00"
              value={newWaste?.cost}
              onChange={(e) => setNewWaste({ ...newWaste, cost: e?.target?.value })}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleAddWaste}
            >
              Log Waste
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingWaste(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Waste Log */}
      <div className="p-4">
        {wasteData?.length > 0 ? (
          <div className="space-y-3">
            {wasteData?.slice(0, 10)?.map((item) => (
              <div key={item?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-error/10`}>
                    <Icon 
                      name={getReasonIcon(item?.reason)} 
                      size={16} 
                      className={getReasonColor(item?.reason)}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{item?.itemName}</p>
                    <p className="text-xs text-muted-foreground">
                      {item?.quantity} {item?.unit} • {wasteReasons?.find(r => r?.value === item?.reason)?.label}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-error text-sm">
                    {formatCurrency(item?.cost)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(item?.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {wasteData?.length > 10 && (
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm">
                  View All Waste Records ({wasteData?.length})
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h4 className="font-medium text-foreground mb-2">No Waste Recorded</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Great job! No food waste has been logged recently.
            </p>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsAddingWaste(true)}
            >
              Log First Waste Entry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteTracker;