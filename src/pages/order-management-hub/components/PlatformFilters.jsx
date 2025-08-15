import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformFilters = ({ 
  selectedPlatforms, 
  onPlatformToggle, 
  platformStats,
  connectionStatus 
}) => {
  const platforms = [
    {
      id: 'all',
      name: 'All Platforms',
      icon: 'Grid3X3',
      color: 'bg-slate-500',
      count: platformStats?.total
    },
    {
      id: 'ubereats',
      name: 'Uber Eats',
      icon: 'Car',
      color: 'bg-green-500',
      count: platformStats?.ubereats,
      status: connectionStatus?.ubereats
    },
    {
      id: 'doordash',
      name: 'DoorDash',
      icon: 'Truck',
      color: 'bg-red-500',
      count: platformStats?.doordash,
      status: connectionStatus?.doordash
    },
    {
      id: 'grubhub',
      name: 'Grubhub',
      icon: 'ShoppingBag',
      color: 'bg-orange-500',
      count: platformStats?.grubhub,
      status: connectionStatus?.grubhub
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Platform Filters</h3>
        <Icon name="Filter" size={18} className="text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {platforms?.map((platform) => (
          <div
            key={platform?.id}
            onClick={() => onPlatformToggle(platform?.id)}
            className={`
              flex items-center justify-between p-3 rounded-lg cursor-pointer transition-micro hover-scale
              ${selectedPlatforms?.includes(platform?.id) 
                ? 'bg-primary/10 border-2 border-primary' :'bg-muted hover:bg-muted/80 border-2 border-transparent'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${platform?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={platform?.icon} size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{platform?.name}</p>
                {platform?.status && (
                  <div className="flex items-center gap-1 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      platform?.status === 'connected' ? 'bg-success' : 'bg-error'
                    }`}></div>
                    <span className="text-xs text-muted-foreground">
                      {platform?.status === 'connected' ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">{platform?.count}</span>
              {selectedPlatforms?.includes(platform?.id) && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Today's Summary</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-lg font-bold text-success">247</p>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-lg font-bold text-warning">{platformStats?.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformFilters;