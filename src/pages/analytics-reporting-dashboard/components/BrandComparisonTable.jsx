import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BrandComparisonTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'revenue', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data]?.sort((a, b) => {
    if (sortConfig?.direction === 'asc') {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return 'ArrowUpDown';
    }
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-success';
    if (performance >= 70) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceIcon = (performance) => {
    if (performance >= 90) return 'TrendingUp';
    if (performance >= 70) return 'Minus';
    return 'TrendingDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Brand Performance Comparison</h3>
        </div>
        <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
          Export
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('brand')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Brand
                  <Icon name={getSortIcon('brand')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4">
                <button
                  onClick={() => handleSort('revenue')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-auto"
                >
                  Revenue
                  <Icon name={getSortIcon('revenue')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4">
                <button
                  onClick={() => handleSort('orders')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-auto"
                >
                  Orders
                  <Icon name={getSortIcon('orders')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4">
                <button
                  onClick={() => handleSort('avgOrderValue')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-auto"
                >
                  Avg Order
                  <Icon name={getSortIcon('avgOrderValue')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4">
                <button
                  onClick={() => handleSort('performance')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-auto"
                >
                  Performance
                  <Icon name={getSortIcon('performance')} size={14} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((brand, index) => (
              <tr key={brand?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: brand?.color }}
                    >
                      {brand?.brand?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{brand?.brand}</p>
                      <p className="text-xs text-muted-foreground">{brand?.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="font-medium text-foreground">${brand?.revenue?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {brand?.revenueChange > 0 ? '+' : ''}{brand?.revenueChange}%
                  </p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="font-medium text-foreground">{brand?.orders?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {brand?.ordersChange > 0 ? '+' : ''}{brand?.ordersChange}%
                  </p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="font-medium text-foreground">${brand?.avgOrderValue}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Icon 
                      name={getPerformanceIcon(brand?.performance)} 
                      size={16} 
                      className={getPerformanceColor(brand?.performance)}
                    />
                    <span className={`font-medium ${getPerformanceColor(brand?.performance)}`}>
                      {brand?.performance}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandComparisonTable;