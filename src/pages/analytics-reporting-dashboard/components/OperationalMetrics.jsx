import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const OperationalMetrics = ({ data, title }) => {
  const COLORS = ['#2563EB', '#059669', '#F59E0B', '#DC2626', '#8B5CF6'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            {data?.value} ({((data?.value / data?.payload?.total) * 100)?.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const totalValue = data?.reduce((sum, item) => sum + item?.value, 0);
  const dataWithTotal = data?.map(item => ({ ...item, total: totalValue }));

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Activity" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithTotal}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {dataWithTotal?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Details */}
        <div className="space-y-4">
          {data?.map((item, index) => (
            <div key={item?.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                />
                <span className="text-sm font-medium text-foreground">{item?.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{item?.value}</p>
                <p className="text-xs text-muted-foreground">
                  {((item?.value / totalValue) * 100)?.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Total</span>
              <span className="text-sm font-bold text-foreground">{totalValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalMetrics;