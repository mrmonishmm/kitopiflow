import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalesTrendsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('today');

  useEffect(() => {
    // Mock sales data based on time range
    const generateMockData = () => {
      if (timeRange === 'today') {
        return [
          { time: '6:00', revenue: 1200, orders: 15, pizzaPalace: 600, burgerBarn: 400, tacoTime: 200 },
          { time: '7:00', revenue: 2800, orders: 32, pizzaPalace: 1400, burgerBarn: 900, tacoTime: 500 },
          { time: '8:00', revenue: 3200, orders: 38, pizzaPalace: 1600, burgerBarn: 1000, tacoTime: 600 },
          { time: '9:00', revenue: 2400, orders: 28, pizzaPalace: 1200, burgerBarn: 800, tacoTime: 400 },
          { time: '10:00', revenue: 1800, orders: 22, pizzaPalace: 900, burgerBarn: 600, tacoTime: 300 },
          { time: '11:00', revenue: 2200, orders: 26, pizzaPalace: 1100, burgerBarn: 700, tacoTime: 400 },
          { time: '12:00', revenue: 4200, orders: 48, pizzaPalace: 2100, burgerBarn: 1400, tacoTime: 700 },
          { time: '1:00', revenue: 4800, orders: 55, pizzaPalace: 2400, burgerBarn: 1600, tacoTime: 800 },
          { time: '2:00', revenue: 3600, orders: 42, pizzaPalace: 1800, burgerBarn: 1200, tacoTime: 600 },
          { time: '3:00', revenue: 2800, orders: 32, pizzaPalace: 1400, burgerBarn: 900, tacoTime: 500 },
          { time: '4:00', revenue: 3400, orders: 38, pizzaPalace: 1700, burgerBarn: 1100, tacoTime: 600 },
          { time: '5:00', revenue: 4600, orders: 52, pizzaPalace: 2300, burgerBarn: 1500, tacoTime: 800 },
          { time: '6:00', revenue: 5200, orders: 58, pizzaPalace: 2600, burgerBarn: 1700, tacoTime: 900 }
        ];
      } else if (timeRange === 'week') {
        return [
          { time: 'Mon', revenue: 28000, orders: 320, pizzaPalace: 14000, burgerBarn: 9000, tacoTime: 5000 },
          { time: 'Tue', revenue: 32000, orders: 380, pizzaPalace: 16000, burgerBarn: 10000, tacoTime: 6000 },
          { time: 'Wed', revenue: 35000, orders: 420, pizzaPalace: 17500, burgerBarn: 11000, tacoTime: 6500 },
          { time: 'Thu', revenue: 38000, orders: 450, pizzaPalace: 19000, burgerBarn: 12000, tacoTime: 7000 },
          { time: 'Fri', revenue: 45000, orders: 520, pizzaPalace: 22500, burgerBarn: 14000, tacoTime: 8500 },
          { time: 'Sat', revenue: 52000, orders: 580, pizzaPalace: 26000, burgerBarn: 16000, tacoTime: 10000 },
          { time: 'Sun', revenue: 48000, orders: 540, pizzaPalace: 24000, burgerBarn: 15000, tacoTime: 9000 }
        ];
      } else {
        return [
          { time: 'Week 1', revenue: 245000, orders: 2800, pizzaPalace: 122500, burgerBarn: 78000, tacoTime: 44500 },
          { time: 'Week 2', revenue: 268000, orders: 3100, pizzaPalace: 134000, burgerBarn: 85000, tacoTime: 49000 },
          { time: 'Week 3', revenue: 285000, orders: 3300, pizzaPalace: 142500, burgerBarn: 91000, tacoTime: 51500 },
          { time: 'Week 4', revenue: 295000, orders: 3400, pizzaPalace: 147500, burgerBarn: 94000, tacoTime: 53500 }
        ];
      }
    };

    setChartData(generateMockData());
  }, [timeRange]);

  const formatValue = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000)?.toFixed(1)}k`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">
                {entry?.name === 'Orders' ? entry?.value : formatValue(entry?.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Sales Trends</h3>
          </div>
          <div className="flex items-center gap-2">
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
              <Button
                variant={timeRange === 'month' ? 'default' : 'outline'}
                size="xs"
                onClick={() => setTimeRange('month')}
              >
                Month
              </Button>
            </div>
            <div className="flex gap-1 ml-2">
              <Button
                variant={chartType === 'line' ? 'default' : 'outline'}
                size="xs"
                iconName="TrendingUp"
                iconSize={14}
                onClick={() => setChartType('line')}
              >
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'outline'}
                size="xs"
                iconName="BarChart3"
                iconSize={14}
                onClick={() => setChartType('bar')}
              >
              </Button>
            </div>
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Total Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Orders</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={formatValue}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 3 }}
                  name="Orders"
                  yAxisId="right"
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={formatValue}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="var(--color-primary)" name="Revenue" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {formatValue(chartData?.length ? chartData?.reduce((sum, item) => sum + (item?.revenue || 0), 0) : 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {chartData?.length ? chartData?.reduce((sum, item) => sum + (item?.orders || 0), 0) : 0}
            </p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {(() => {
                if (!chartData?.length) return formatValue(0);
                const totalRevenue = chartData?.reduce((sum, item) => sum + (item?.revenue || 0), 0);
                const totalOrders = chartData?.reduce((sum, item) => sum + (item?.orders || 0), 0);
                return formatValue(totalOrders > 0 ? totalRevenue / totalOrders : 0);
              })()}
            </p>
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTrendsChart;