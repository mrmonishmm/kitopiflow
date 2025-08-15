import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchAndFilters = ({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFilterChange,
  onClearFilters 
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'delayed', label: 'Delayed' }
  ];

  const timeRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'last-hour', label: 'Last Hour' },
    { value: 'last-4-hours', label: 'Last 4 Hours' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' }
  ];

  const sortOptions = [
    { value: 'promisedTime-asc', label: 'Promised Time (Earliest)' },
    { value: 'promisedTime-desc', label: 'Promised Time (Latest)' },
    { value: 'orderTime-desc', label: 'Order Time (Newest)' },
    { value: 'orderTime-asc', label: 'Order Time (Oldest)' },
    { value: 'priority', label: 'Priority Orders First' }
  ];

  const hasActiveFilters = filters?.status || filters?.timeRange || filters?.sortBy !== 'promisedTime-asc';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search by order ID, customer name, or items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
            Filters
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconSize={16}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => onFilterChange('status', value)}
              placeholder="All Statuses"
            />
            
            <Select
              label="Time Range"
              options={timeRangeOptions}
              value={filters?.timeRange}
              onChange={(value) => onFilterChange('timeRange', value)}
              placeholder="All Time"
            />
            
            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy}
              onChange={(value) => onFilterChange('sortBy', value)}
            />

            <div className="flex items-end">
              <div className="flex items-center gap-2 w-full">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters?.priorityOnly}
                    onChange={(e) => onFilterChange('priorityOnly', e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Priority Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onFilterChange('status', 'new')}
              className={filters?.status === 'new' ? 'bg-primary/10 text-primary' : ''}
            >
              New Orders
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onFilterChange('status', 'delayed')}
              className={filters?.status === 'delayed' ? 'bg-error/10 text-error' : ''}
            >
              Delayed
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onFilterChange('priorityOnly', true)}
              className={filters?.priorityOnly ? 'bg-warning/10 text-warning' : ''}
            >
              Priority
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onFilterChange('timeRange', 'last-hour')}
              className={filters?.timeRange === 'last-hour' ? 'bg-success/10 text-success' : ''}
            >
              Last Hour
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;