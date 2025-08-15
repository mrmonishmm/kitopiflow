import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopPerformingItems = () => {
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState('revenue');
  const [timeRange, setTimeRange] = useState('today');

  useEffect(() => {
    // Mock top performing items data
    const mockItems = [
      {
        id: 1,
        name: 'Margherita Pizza',
        brand: 'Pizza Palace',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop',
        revenue: 2400,
        orders: 32,
        avgOrderValue: 75,
        profitMargin: 68,
        trend: 'up',
        trendValue: 12,
        category: 'Pizza'
      },
      {
        id: 2,
        name: 'Classic Burger',
        brand: 'Burger Barn',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop',
        revenue: 1800,
        orders: 45,
        avgOrderValue: 40,
        profitMargin: 72,
        trend: 'up',
        trendValue: 8,
        category: 'Burger'
      },
      {
        id: 3,
        name: 'Chicken Tacos',
        brand: 'Taco Time',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop',
        revenue: 1200,
        orders: 38,
        avgOrderValue: 32,
        profitMargin: 65,
        trend: 'up',
        trendValue: 15,
        category: 'Mexican'
      },
      {
        id: 4,
        name: 'California Roll',
        brand: 'Sushi Spot',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop',
        revenue: 960,
        orders: 24,
        avgOrderValue: 40,
        profitMargin: 58,
        trend: 'down',
        trendValue: 5,
        category: 'Sushi'
      },
      {
        id: 5,
        name: 'Pepperoni Pizza',
        brand: 'Pizza Palace',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=100&h=100&fit=crop',
        revenue: 1680,
        orders: 28,
        avgOrderValue: 60,
        profitMargin: 70,
        trend: 'up',
        trendValue: 6,
        category: 'Pizza'
      },
      {
        id: 6,
        name: 'BBQ Burger',
        brand: 'Burger Barn',
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=100&h=100&fit=crop',
        revenue: 1440,
        orders: 32,
        avgOrderValue: 45,
        profitMargin: 68,
        trend: 'stable',
        trendValue: 2,
        category: 'Burger'
      },
      {
        id: 7,
        name: 'Beef Tacos',
        brand: 'Taco Time',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=100&h=100&fit=crop',
        revenue: 840,
        orders: 28,
        avgOrderValue: 30,
        profitMargin: 62,
        trend: 'up',
        trendValue: 10,
        category: 'Mexican'
      },
      {
        id: 8,
        name: 'Salmon Sashimi',
        brand: 'Sushi Spot',
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=100&h=100&fit=crop',
        revenue: 720,
        orders: 18,
        avgOrderValue: 40,
        profitMargin: 55,
        trend: 'up',
        trendValue: 8,
        category: 'Sushi'
      }
    ];

    // Sort items based on selected criteria
    const sortedItems = [...mockItems]?.sort((a, b) => {
      if (sortBy === 'revenue') return b?.revenue - a?.revenue;
      if (sortBy === 'orders') return b?.orders - a?.orders;
      if (sortBy === 'profit') return b?.profitMargin - a?.profitMargin;
      return 0;
    });

    setItems(sortedItems);
  }, [sortBy, timeRange]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(value);
  };

  const getTrendIcon = (trend) => {
    const icons = {
      up: 'TrendingUp',
      down: 'TrendingDown',
      stable: 'Minus'
    };
    return icons?.[trend] || 'Minus';
  };

  const getTrendColor = (trend) => {
    const colors = {
      up: 'text-success',
      down: 'text-error',
      stable: 'text-muted-foreground'
    };
    return colors?.[trend] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Icon name="Award" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Top Performing Items</h3>
          </div>
          <Button variant="outline" size="sm" iconName="Download" iconSize={16}>
            Export
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <Button
              variant={sortBy === 'revenue' ? 'default' : 'outline'}
              size="xs"
              onClick={() => setSortBy('revenue')}
            >
              Revenue
            </Button>
            <Button
              variant={sortBy === 'orders' ? 'default' : 'outline'}
              size="xs"
              onClick={() => setSortBy('orders')}
            >
              Orders
            </Button>
            <Button
              variant={sortBy === 'profit' ? 'default' : 'outline'}
              size="xs"
              onClick={() => setSortBy('profit')}
            >
              Profit
            </Button>
          </div>
          
          <div className="flex gap-1">
            <Button
              variant={timeRange === 'today' ? 'default' : 'outline'}
              size="xs"
              onClick={() => setTimeRange('today')}
            >
              Today
            </Button>
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              size="xs"
              onClick={() => setTimeRange('week')}
            >
              Week
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {items?.map((item, index) => (
            <div key={item?.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              {/* Rank */}
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">#{index + 1}</span>
              </div>

              {/* Item Image */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                <img 
                  src={item?.image} 
                  alt={item?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground truncate">{item?.name}</h4>
                  <span className="text-xs bg-muted px-2 py-1 rounded">{item?.category}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item?.brand}</p>
              </div>

              {/* Metrics */}
              <div className="flex-shrink-0 text-right space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {sortBy === 'revenue' ? formatCurrency(item?.revenue) :
                     sortBy === 'orders' ? `${item?.orders} orders` :
                     `${item?.profitMargin}% profit`}
                  </span>
                  <div className={`flex items-center gap-1 ${getTrendColor(item?.trend)}`}>
                    <Icon name={getTrendIcon(item?.trend)} size={14} />
                    <span className="text-xs">{item?.trendValue}%</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  AOV: {formatCurrency(item?.avgOrderValue)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0">
                <Button variant="ghost" size="xs" iconName="MoreHorizontal" iconSize={16}>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(items?.reduce((sum, item) => sum + item?.revenue, 0))}
              </p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                {items?.reduce((sum, item) => sum + item?.orders, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                {Math.round(items?.reduce((sum, item) => sum + item?.profitMargin, 0) / items?.length)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Profit Margin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformingItems;