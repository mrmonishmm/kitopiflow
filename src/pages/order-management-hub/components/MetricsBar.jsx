import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsBar = ({ metrics }) => {
  const metricItems = [
    {
      label: 'Avg Prep Time',
      value: `${metrics?.avgPrepTime} min`,
      icon: 'Clock',
      trend: metrics?.prepTimeTrend,
      color: 'text-primary'
    },
    {
      label: 'On-Time Rate',
      value: `${metrics?.onTimeRate}%`,
      icon: 'Target',
      trend: metrics?.onTimeRateTrend,
      color: metrics?.onTimeRate >= 90 ? 'text-success' : metrics?.onTimeRate >= 75 ? 'text-warning' : 'text-error'
    },
    {
      label: 'Kitchen Load',
      value: `${metrics?.kitchenLoad}%`,
      icon: 'Activity',
      trend: metrics?.kitchenLoadTrend,
      color: metrics?.kitchenLoad <= 70 ? 'text-success' : metrics?.kitchenLoad <= 85 ? 'text-warning' : 'text-error'
    },
    {
      label: 'Active Orders',
      value: metrics?.activeOrders,
      icon: 'ShoppingCart',
      trend: metrics?.activeOrdersTrend,
      color: 'text-foreground'
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricItems?.map((metric, index) => {
          const trendInfo = getTrendIcon(metric?.trend);
          
          return (
            <div key={index} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
              <div className={`w-10 h-10 ${metric?.color === 'text-success' ? 'bg-success/10' : 
                metric?.color === 'text-warning' ? 'bg-warning/10' : 
                metric?.color === 'text-error' ? 'bg-error/10' : 'bg-primary/10'} 
                rounded-lg flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{metric?.label}</span>
                  <Icon 
                    name={trendInfo?.icon} 
                    size={12} 
                    className={trendInfo?.color}
                  />
                </div>
                <p className={`text-lg font-bold ${metric?.color}`}>
                  {metric?.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsBar;