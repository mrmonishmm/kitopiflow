import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';

const MenuEngineering = ({ recipes }) => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [viewType, setViewType] = useState('matrix');

  const brandOptions = [
    { value: 'all', label: 'All Brands' },
    { value: 'pizza-palace', label: 'Pizza Palace' },
    { value: 'burger-barn', label: 'Burger Barn' },
    { value: 'taco-time', label: 'Taco Time' },
    { value: 'sushi-spot', label: 'Sushi Spot' }
  ];

  const periodOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'ytd', label: 'Year to Date' }
  ];

  // Mock menu engineering data
  const menuData = [
    {
      id: 1,
      name: 'Margherita Pizza',
      brand: 'pizza-palace',
      category: 'mains',
      popularity: 85,
      profitability: 72,
      sales: 245,
      revenue: 3675,
      cost: 1102.50,
      profit: 2572.50,
      classification: 'star'
    },
    {
      id: 2,
      name: 'Classic Burger',
      brand: 'burger-barn',
      category: 'mains',
      popularity: 92,
      profitability: 45,
      sales: 312,
      revenue: 4368,
      cost: 2401.20,
      profit: 1966.80,
      classification: 'plow-horse'
    },
    {
      id: 3,
      name: 'Truffle Pasta',
      brand: 'pizza-palace',
      category: 'mains',
      popularity: 23,
      profitability: 89,
      sales: 67,
      revenue: 2010,
      cost: 221.10,
      profit: 1788.90,
      classification: 'puzzle'
    },
    {
      id: 4,
      name: 'Fish Tacos',
      brand: 'taco-time',
      category: 'mains',
      popularity: 18,
      profitability: 31,
      sales: 45,
      revenue: 585,
      cost: 403.50,
      profit: 181.50,
      classification: 'dog'
    },
    {
      id: 5,
      name: 'Chicken Wings',
      brand: 'burger-barn',
      category: 'appetizers',
      popularity: 76,
      profitability: 68,
      sales: 189,
      revenue: 1701,
      cost: 544.32,
      profit: 1156.68,
      classification: 'star'
    },
    {
      id: 6,
      name: 'Salmon Roll',
      brand: 'sushi-spot',
      category: 'mains',
      popularity: 54,
      profitability: 82,
      sales: 123,
      revenue: 1845,
      cost: 331.10,
      profit: 1513.90,
      classification: 'star'
    }
  ];

  const filteredData = menuData?.filter(item => 
    selectedBrand === 'all' || item?.brand === selectedBrand
  );

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'star': return '#059669'; // success
      case 'plow-horse': return '#D97706'; // warning
      case 'puzzle': return '#2563EB'; // primary
      case 'dog': return '#DC2626'; // error
      default: return '#64748B'; // muted
    }
  };

  const getClassificationIcon = (classification) => {
    switch (classification) {
      case 'star': return 'Star';
      case 'plow-horse': return 'Truck';
      case 'puzzle': return 'HelpCircle';
      case 'dog': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getClassificationLabel = (classification) => {
    switch (classification) {
      case 'star': return 'Stars';
      case 'plow-horse': return 'Plow Horses';
      case 'puzzle': return 'Puzzles';
      case 'dog': return 'Dogs';
      default: return 'Unknown';
    }
  };

  const getRecommendation = (classification) => {
    switch (classification) {
      case 'star': return 'Maintain quality and promote heavily';
      case 'plow-horse': return 'Increase prices or reduce costs';
      case 'puzzle': return 'Reposition or redesign to increase popularity';
      case 'dog': return 'Consider removing from menu';
      default: return 'Monitor performance';
    }
  };

  const chartData = filteredData?.map(item => ({
    name: item?.name,
    popularity: item?.popularity,
    profitability: item?.profitability,
    sales: item?.sales,
    profit: item?.profit,
    classification: item?.classification
  }));

  const salesData = filteredData?.map(item => ({
    name: item?.name?.length > 15 ? item?.name?.substring(0, 15) + '...' : item?.name,
    sales: item?.sales,
    profit: item?.profit
  }));

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Menu Engineering</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewType === 'matrix' ? 'default' : 'outline'}
              size="sm"
              iconName="Grid3X3"
              iconPosition="left"
              iconSize={16}
              onClick={() => setViewType('matrix')}
            >
              Matrix
            </Button>
            <Button
              variant={viewType === 'charts' ? 'default' : 'outline'}
              size="sm"
              iconName="BarChart3"
              iconPosition="left"
              iconSize={16}
              onClick={() => setViewType('charts')}
            >
              Charts
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select
            options={brandOptions}
            value={selectedBrand}
            onChange={setSelectedBrand}
            placeholder="Select brand"
            className="w-48"
          />
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            placeholder="Select period"
            className="w-48"
          />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewType === 'matrix' && (
          <div className="space-y-6">
            {/* Menu Engineering Matrix */}
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-4">Performance Matrix</h3>
              <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="popularity" 
                      type="number" 
                      domain={[0, 100]}
                      name="Popularity"
                      stroke="var(--color-muted-foreground)"
                    />
                    <YAxis 
                      dataKey="profitability" 
                      type="number" 
                      domain={[0, 100]}
                      name="Profitability"
                      stroke="var(--color-muted-foreground)"
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload?.length) {
                          const data = payload?.[0]?.payload;
                          return (
                            <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-medium text-foreground">{data?.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Popularity: {data?.popularity}%
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Profitability: {data?.profitability}%
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Sales: {data?.sales} units
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter dataKey="profitability">
                      {chartData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getClassificationColor(entry?.classification)} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              
              {/* Matrix Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {['star', 'plow-horse', 'puzzle', 'dog']?.map((classification) => (
                  <div key={classification} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: getClassificationColor(classification) }}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {getClassificationLabel(classification)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu Items List */}
            <div className="space-y-3">
              {filteredData?.map((item) => (
                <div
                  key={item?.id}
                  className="bg-background border border-border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getClassificationColor(item?.classification) }}
                      />
                      <div>
                        <h4 className="font-medium text-foreground">{item?.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {item?.brand?.replace('-', ' ')} • {item?.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={getClassificationIcon(item?.classification)} 
                        size={16} 
                        style={{ color: getClassificationColor(item?.classification) }}
                      />
                      <span 
                        className="text-sm font-medium capitalize"
                        style={{ color: getClassificationColor(item?.classification) }}
                      >
                        {item?.classification}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Sales</p>
                      <p className="font-medium text-foreground">{item?.sales} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="font-medium text-foreground">${item?.revenue?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Profit</p>
                      <p className="font-medium text-success">${item?.profit?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Margin</p>
                      <p className="font-medium text-foreground">
                        {((item?.profit / item?.revenue) * 100)?.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Popularity:</span>
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item?.popularity}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground">
                          {item?.popularity}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Profitability:</span>
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success rounded-full"
                            style={{ width: `${item?.profitability}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground">
                          {item?.profitability}%
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>

                  <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-foreground">
                      <Icon name="Lightbulb" size={14} className="inline mr-2 text-accent" />
                      <strong>Recommendation:</strong> {getRecommendation(item?.classification)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewType === 'charts' && (
          <div className="space-y-6">
            {/* Sales Performance Chart */}
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-4">Sales Performance</h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="sales" fill="var(--color-primary)" name="Sales (units)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Profitability Chart */}
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-4">Profit Analysis</h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="profit" fill="var(--color-success)" name="Profit ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Star" size={20} className="text-success" />
                  <h3 className="font-medium text-foreground">Stars</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {filteredData?.filter(item => item?.classification === 'star')?.length}
                </p>
                <p className="text-xs text-muted-foreground">High profit & popularity</p>
              </div>

              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Truck" size={20} className="text-warning" />
                  <h3 className="font-medium text-foreground">Plow Horses</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {filteredData?.filter(item => item?.classification === 'plow-horse')?.length}
                </p>
                <p className="text-xs text-muted-foreground">High popularity, low profit</p>
              </div>

              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="HelpCircle" size={20} className="text-primary" />
                  <h3 className="font-medium text-foreground">Puzzles</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {filteredData?.filter(item => item?.classification === 'puzzle')?.length}
                </p>
                <p className="text-xs text-muted-foreground">High profit, low popularity</p>
              </div>

              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                  <h3 className="font-medium text-foreground">Dogs</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {filteredData?.filter(item => item?.classification === 'dog')?.length}
                </p>
                <p className="text-xs text-muted-foreground">Low profit & popularity</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuEngineering;