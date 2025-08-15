import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KitchenCapacityMeter = () => {
  const [capacityData, setCapacityData] = useState({});
  const [equipmentStatus, setEquipmentStatus] = useState([]);

  useEffect(() => {
    // Mock capacity and equipment data
    setCapacityData({
      currentCapacity: 78,
      maxCapacity: 100,
      activeStations: 8,
      totalStations: 10,
      avgWaitTime: '4.2 min',
      peakHours: '7:00 PM - 9:00 PM'
    });

    setEquipmentStatus([
      { id: 1, name: 'Oven #1', status: 'operational', temperature: '425°F', utilization: 85 },
      { id: 2, name: 'Oven #2', status: 'operational', temperature: '400°F', utilization: 72 },
      { id: 3, name: 'Fryer #1', status: 'maintenance', temperature: 'N/A', utilization: 0 },
      { id: 4, name: 'Grill Station', status: 'operational', temperature: '450°F', utilization: 90 },
      { id: 5, name: 'Prep Station #1', status: 'operational', temperature: '38°F', utilization: 65 },
      { id: 6, name: 'Prep Station #2', status: 'warning', temperature: '42°F', utilization: 45 }
    ]);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      operational: 'text-success',
      warning: 'text-warning',
      maintenance: 'text-error',
      offline: 'text-muted-foreground'
    };
    return colors?.[status] || colors?.offline;
  };

  const getStatusIcon = (status) => {
    const icons = {
      operational: 'CheckCircle',
      warning: 'AlertTriangle',
      maintenance: 'Tool',
      offline: 'XCircle'
    };
    return icons?.[status] || 'XCircle';
  };

  const getCapacityColor = (percentage) => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-6">
      {/* Capacity Meter */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Kitchen Capacity</h3>
        </div>

        <div className="space-y-6">
          {/* Capacity Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Load</span>
              <span className={`text-lg font-bold ${getCapacityColor(capacityData?.currentCapacity)}`}>
                {capacityData?.currentCapacity}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  capacityData?.currentCapacity >= 90 ? 'bg-error' :
                  capacityData?.currentCapacity >= 75 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${capacityData?.currentCapacity}%` }}
              ></div>
            </div>
          </div>

          {/* Capacity Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Active Stations</p>
              <p className="text-lg font-semibold text-foreground">
                {capacityData?.activeStations}/{capacityData?.totalStations}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg Wait Time</p>
              <p className="text-lg font-semibold text-foreground">{capacityData?.avgWaitTime}</p>
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Peak Hours</span>
            </div>
            <p className="text-sm text-muted-foreground">{capacityData?.peakHours}</p>
          </div>
        </div>
      </div>
      {/* Equipment Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Icon name="Settings" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Equipment Status</h3>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconSize={16}>
            Refresh
          </Button>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {equipmentStatus?.map((equipment) => (
            <div key={equipment?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Icon 
                  name={getStatusIcon(equipment?.status)} 
                  size={18} 
                  className={getStatusColor(equipment?.status)}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{equipment?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {equipment?.temperature} • {equipment?.utilization}% utilization
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  equipment?.status === 'operational' ? 'bg-success/10 text-success' :
                  equipment?.status === 'warning' ? 'bg-warning/10 text-warning' :
                  equipment?.status === 'maintenance'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                }`}>
                  {equipment?.status?.charAt(0)?.toUpperCase() + equipment?.status?.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitchenCapacityMeter;