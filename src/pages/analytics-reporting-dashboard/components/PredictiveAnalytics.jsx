import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictiveAnalytics = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState('inventory');
  const [timeframe, setTimeframe] = useState('7days');

  const metrics = {
    inventory: {
      title: 'Inventory Optimization',
      icon: 'Package',
      color: 'var(--color-primary)',
      unit: 'units'
    },
    staffing: {
      title: 'Staffing Requirements',
      icon: 'Users',
      color: 'var(--color-success)',
      unit: 'staff'
    },
    demand: {
      title: 'Demand Forecast',
      icon: 'TrendingUp',
      color: 'var(--color-warning)',
      unit: 'orders'
    }
  };

  const timeframes = [
    { value: '7days', label: '7 Days' },
    { value: '14days', label: '14 Days' },
    { value: '30days', label: '30 Days' }
  ];

  const currentData = data?.[selectedMetric]?.[timeframe];
  const currentMetric = metrics?.[selectedMetric];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const isActual = payload?.[0]?.payload?.type === 'actual';
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: payload?.[0]?.color }}
            />
            <span className="text-sm text-muted-foreground">
              {isActual ? 'Actual' : 'Predicted'}:
            </span>
            <span className="text-sm font-medium text-foreground">
              {payload?.[0]?.value} {currentMetric?.unit}
            </span>
          </div>
          {!isActual && (
            <p className="text-xs text-muted-foreground mt-1">
              Confidence: {payload?.[0]?.payload?.confidence}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const getRecommendations = () => {
    const recommendations = {
      inventory: [
        "Increase tomato stock by 25% for next week",
        "Reduce cheese orders by 15% - current overstock",
        "Monitor chicken breast levels - trending high demand"
      ],
      staffing: [
        "Schedule 2 additional prep cooks for Friday dinner rush",
        "Reduce morning shift by 1 person on Tuesdays",
        "Consider cross-training staff for peak hour flexibility"
      ],
      demand: [
        "Pizza orders expected to increase 18% next weekend",
        "Burger demand declining - consider promotional pricing",
        "New sushi menu items showing strong uptake"
      ]
    };
    return recommendations?.[selectedMetric];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Predictive Analytics</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {Object.entries(metrics)?.map(([key, metric]) => (
              <option key={key} value={key}>{metric?.title}</option>
            ))}
          </select>
          
          <div className="flex bg-muted rounded-lg p-1">
            {timeframes?.map((tf) => (
              <Button
                key={tf?.value}
                variant={timeframe === tf?.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeframe(tf?.value)}
                className="text-xs"
              >
                {tf?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Icon name={currentMetric?.icon} size={18} className="text-primary" />
            <h4 className="text-base font-medium text-foreground">{currentMetric?.title}</h4>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `${value} ${currentMetric?.unit}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  x="Today" 
                  stroke="var(--color-error)" 
                  strokeDasharray="2 2"
                  label={{ value: "Today", position: "top" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={currentMetric?.color}
                  strokeWidth={3}
                  dot={(props) => {
                    const { payload } = props;
                    return (
                      <circle
                        cx={props?.cx}
                        cy={props?.cy}
                        r={4}
                        fill={payload?.type === 'actual' ? currentMetric?.color : 'transparent'}
                        stroke={currentMetric?.color}
                        strokeWidth={2}
                        strokeDasharray={payload?.type === 'predicted' ? '4 4' : '0'}
                      />
                    );
                  }}
                  strokeDasharray={(entry) => entry?.type === 'predicted' ? '8 8' : '0'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-primary"></div>
              <span className="text-muted-foreground">Actual Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-primary" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 2px, var(--color-primary) 2px, var(--color-primary) 4px)' }}></div>
              <span className="text-muted-foreground">Predicted Data</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">AI Recommendations</h4>
          
          <div className="space-y-3">
            {getRecommendations()?.map((recommendation, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Lightbulb" size={14} className="text-primary" />
                  </div>
                  <p className="text-sm text-foreground">{recommendation}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Accuracy Metrics */}
          <div className="pt-4 border-t border-border">
            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Model Accuracy
            </h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Last 7 days</span>
                <span className="text-sm font-medium text-success">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Last 30 days</span>
                <span className="text-sm font-medium text-success">91.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Overall</span>
                <span className="text-sm font-medium text-success">89.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;