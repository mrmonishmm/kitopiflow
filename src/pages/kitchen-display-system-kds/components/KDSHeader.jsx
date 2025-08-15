import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const KDSHeader = ({ 
  selectedStation, 
  onStationChange, 
  selectedBrand, 
  onBrandChange,
  onEmergencyStop,
  onRefresh 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stationOptions = [
    { value: 'all', label: 'All Stations' },
    { value: 'grill', label: 'Grill Station' },
    { value: 'fryer', label: 'Fryer Station' },
    { value: 'salad', label: 'Salad Station' },
    { value: 'pizza', label: 'Pizza Station' },
    { value: 'dessert', label: 'Dessert Station' }
  ];

  const brandOptions = [
    { value: 'all', label: 'All Brands' },
    { value: 'pizza-palace', label: 'Pizza Palace' },
    { value: 'burger-barn', label: 'Burger Barn' },
    { value: 'taco-time', label: 'Taco Time' },
    { value: 'sushi-spot', label: 'Sushi Spot' }
  ];

  const handleEmergencyStop = () => {
    setIsEmergencyMode(!isEmergencyMode);
    onEmergencyStop(!isEmergencyMode);
  };

  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Time & Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <p className="text-lg font-semibold text-foreground">
                {currentTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentTime?.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isEmergencyMode ? 'bg-error animate-pulse' : 'bg-success'}`}></div>
            <span className="text-sm font-medium text-foreground">
              {isEmergencyMode ? 'EMERGENCY MODE' : 'System Online'}
            </span>
          </div>
        </div>

        {/* Center Section - Filters */}
        <div className="flex items-center gap-4">
          <Select
            options={brandOptions}
            value={selectedBrand}
            onChange={onBrandChange}
            placeholder="Select Brand"
            className="w-40"
          />
          
          <Select
            options={stationOptions}
            value={selectedStation}
            onChange={onStationChange}
            placeholder="Select Station"
            className="w-40"
          />
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRefresh}
          >
            Refresh
          </Button>

          {/* Sound Toggle */}
          <Button
            variant="ghost"
            size="icon"
            iconName="Volume2"
            iconSize={18}
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">Toggle sound</span>
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="icon"
            iconName="Maximize"
            iconSize={18}
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">Toggle fullscreen</span>
          </Button>

          {/* Emergency Stop */}
          <Button
            variant={isEmergencyMode ? "default" : "destructive"}
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
            onClick={handleEmergencyStop}
            className={isEmergencyMode ? "animate-pulse" : ""}
          >
            {isEmergencyMode ? 'Resume' : 'Emergency Stop'}
          </Button>
        </div>
      </div>
      {/* Emergency Banner */}
      {isEmergencyMode && (
        <div className="mt-4 bg-error text-error-foreground px-4 py-3 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="AlertTriangle" size={20} />
            <div>
              <p className="font-semibold">EMERGENCY MODE ACTIVATED</p>
              <p className="text-sm opacity-90">All new orders are paused. Complete current orders and contact management.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KDSHeader;