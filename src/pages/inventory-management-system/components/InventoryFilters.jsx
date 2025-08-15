import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InventoryFilters = ({ onFiltersChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(activeFilters?.search || '');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'proteins', label: 'Proteins' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'grains', label: 'Grains & Starches' },
    { value: 'spices', label: 'Spices & Seasonings' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'packaging', label: 'Packaging Materials' }
  ];

  const supplierOptions = [
    { value: 'all', label: 'All Suppliers' },
    { value: 'fresh-foods', label: 'Fresh Foods Co.' },
    { value: 'meat-masters', label: 'Meat Masters' },
    { value: 'dairy-direct', label: 'Dairy Direct' },
    { value: 'spice-world', label: 'Spice World' },
    { value: 'packaging-plus', label: 'Packaging Plus' }
  ];

  const brandOptions = [
    { value: 'all', label: 'All Brands' },
    { value: 'pizza-palace', label: 'Pizza Palace' },
    { value: 'burger-barn', label: 'Burger Barn' },
    { value: 'taco-time', label: 'Taco Time' },
    { value: 'sushi-spot', label: 'Sushi Spot' }
  ];

  const stockLevelOptions = [
    { value: 'all', label: 'All Stock Levels' },
    { value: 'critical', label: 'Critical (0-25%)' },
    { value: 'low', label: 'Low (26-50%)' },
    { value: 'medium', label: 'Medium (51-75%)' },
    { value: 'good', label: 'Good (76-100%)' },
    { value: 'overstocked', label: 'Overstocked (100%+)' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'stock-low', label: 'Stock (Low to High)' },
    { value: 'stock-high', label: 'Stock (High to Low)' },
    { value: 'cost-low', label: 'Cost (Low to High)' },
    { value: 'cost-high', label: 'Cost (High to Low)' },
    { value: 'updated-recent', label: 'Recently Updated' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onFiltersChange({ ...activeFilters, search: value });
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...activeFilters, [key]: value });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    onFiltersChange({
      search: '',
      category: 'all',
      supplier: 'all',
      brand: 'all',
      stockLevel: 'all',
      sortBy: 'name-asc'
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters?.search) count++;
    if (activeFilters?.category && activeFilters?.category !== 'all') count++;
    if (activeFilters?.supplier && activeFilters?.supplier !== 'all') count++;
    if (activeFilters?.brand && activeFilters?.brand !== 'all') count++;
    if (activeFilters?.stockLevel && activeFilters?.stockLevel !== 'all') count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Search and Quick Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search ingredients, suppliers, or categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              iconPosition="left"
              iconSize={16}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export
            </Button>
            
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add Item
            </Button>
          </div>
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="p-4 bg-muted/20 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select
              label="Category"
              options={categoryOptions}
              value={activeFilters?.category || 'all'}
              onChange={(value) => handleFilterChange('category', value)}
            />
            
            <Select
              label="Supplier"
              options={supplierOptions}
              value={activeFilters?.supplier || 'all'}
              onChange={(value) => handleFilterChange('supplier', value)}
            />
            
            <Select
              label="Brand Usage"
              options={brandOptions}
              value={activeFilters?.brand || 'all'}
              onChange={(value) => handleFilterChange('brand', value)}
            />
            
            <Select
              label="Stock Level"
              options={stockLevelOptions}
              value={activeFilters?.stockLevel || 'all'}
              onChange={(value) => handleFilterChange('stockLevel', value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <Select
                label="Sort By"
                options={sortOptions}
                value={activeFilters?.sortBy || 'name-asc'}
                onChange={(value) => handleFilterChange('sortBy', value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                disabled={getActiveFilterCount() === 0}
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronUp"
                iconSize={16}
                onClick={() => setIsExpanded(false)}
              >
                Collapse
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Active Filter Tags */}
      {getActiveFilterCount() > 0 && (
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
            
            {activeFilters?.search && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                <Icon name="Search" size={14} />
                <span>"{activeFilters?.search}"</span>
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {activeFilters?.category && activeFilters?.category !== 'all' && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                <Icon name="Tag" size={14} />
                <span>{categoryOptions?.find(c => c?.value === activeFilters?.category)?.label}</span>
                <button
                  onClick={() => handleFilterChange('category', 'all')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {activeFilters?.supplier && activeFilters?.supplier !== 'all' && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                <Icon name="Truck" size={14} />
                <span>{supplierOptions?.find(s => s?.value === activeFilters?.supplier)?.label}</span>
                <button
                  onClick={() => handleFilterChange('supplier', 'all')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {activeFilters?.stockLevel && activeFilters?.stockLevel !== 'all' && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                <Icon name="BarChart3" size={14} />
                <span>{stockLevelOptions?.find(s => s?.value === activeFilters?.stockLevel)?.label}</span>
                <button
                  onClick={() => handleFilterChange('stockLevel', 'all')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryFilters;