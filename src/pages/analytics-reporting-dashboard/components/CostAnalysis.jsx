import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostAnalysis = ({ data }) => {
  const [viewType, setViewType] = useState('dish'); // 'dish' or 'brand'
  const [sortBy, setSortBy] = useState('profit');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-sm text-muted-foreground">{entry?.dataKey}:</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                ${entry?.value?.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const sortedData = [...data?.[viewType]]?.sort((a, b) => {
    if (sortBy === 'profit') {
      return b?.profit - a?.profit;
    }
    if (sortBy === 'cost') {
      return b?.totalCost - a?.totalCost;
    }
    return b?.revenue - a?.revenue;
  });

  const getProfitMarginColor = (margin) => {
    if (margin >= 30) return 'text-success';
    if (margin >= 15) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="DollarSign" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Cost Analysis</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'dish' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('dish')}
              className="text-xs"
            >
              By Dish
            </Button>
            <Button
              variant={viewType === 'brand' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('brand')}
              className="text-xs"
            >
              By Brand
            </Button>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="profit">Sort by Profit</option>
            <option value="cost">Sort by Cost</option>
            <option value="revenue">Sort by Revenue</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData?.slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="var(--color-primary)" name="Revenue" />
                <Bar dataKey="totalCost" fill="var(--color-error)" name="Total Cost" />
                <Bar dataKey="profit" fill="var(--color-success)" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers List */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Top Performers</h4>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {sortedData?.slice(0, 6)?.map((item, index) => (
              <div key={item?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Margin: <span className={getProfitMarginColor(item?.profitMargin)}>
                        {item?.profitMargin}%
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-success">${item?.profit?.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">${item?.totalCost?.toFixed(2)} cost</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            ${sortedData?.reduce((sum, item) => sum + item?.profit, 0)?.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">Total Profit</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-error">
            ${sortedData?.reduce((sum, item) => sum + item?.totalCost, 0)?.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">Total Costs</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {(sortedData?.reduce((sum, item) => sum + item?.profitMargin, 0) / sortedData?.length)?.toFixed(1)}%
          </p>
          <p className="text-sm text-muted-foreground">Avg Margin</p>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;