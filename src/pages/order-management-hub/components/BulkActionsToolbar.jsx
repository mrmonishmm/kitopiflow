import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsToolbar = ({ 
  selectedCount, 
  onBulkStatusUpdate, 
  onBulkStationAssign,
  onClearSelection 
}) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedStation, setSelectedStation] = useState('');

  const statusOptions = [
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready for Pickup' },
    { value: 'delayed', label: 'Delayed' }
  ];

  const stationOptions = [
    { value: 'grill', label: 'Grill Station' },
    { value: 'salad', label: 'Salad Station' },
    { value: 'fryer', label: 'Fryer Station' },
    { value: 'prep', label: 'Prep Station' },
    { value: 'packaging', label: 'Packaging Station' }
  ];

  const handleStatusUpdate = () => {
    if (selectedStatus) {
      onBulkStatusUpdate(selectedStatus);
      setSelectedStatus('');
    }
  };

  const handleStationAssign = () => {
    if (selectedStation) {
      onBulkStationAssign(selectedStation);
      setSelectedStation('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        {/* Selection Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {selectedCount} order{selectedCount !== 1 ? 's' : ''} selected
            </p>
            <p className="text-xs text-muted-foreground">
              Choose an action to apply to all selected orders
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 ml-auto">
          {/* Status Update */}
          <div className="flex items-center gap-2">
            <Select
              placeholder="Update status"
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              className="w-40"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleStatusUpdate}
              disabled={!selectedStatus}
              iconName="RefreshCw"
              iconSize={14}
            >
              Update
            </Button>
          </div>

          {/* Station Assignment */}
          <div className="flex items-center gap-2">
            <Select
              placeholder="Assign station"
              options={stationOptions}
              value={selectedStation}
              onChange={setSelectedStation}
              className="w-40"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleStationAssign}
              disabled={!selectedStation}
              iconName="Users"
              iconSize={14}
            >
              Assign
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 border-l border-border pl-3">
            <Button
              variant="outline"
              size="sm"
              iconName="AlertTriangle"
              iconSize={14}
            >
              Mark Priority
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Printer"
              iconSize={14}
            >
              Print Labels
            </Button>
          </div>

          {/* Clear Selection */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconSize={14}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;