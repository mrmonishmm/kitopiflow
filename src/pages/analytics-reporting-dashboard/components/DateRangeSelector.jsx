import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DateRangeSelector = ({ selectedRange, onRangeChange, onCustomDateChange }) => {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customDates, setCustomDates] = useState({
    startDate: '',
    endDate: ''
  });

  const presetRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleRangeSelect = (range) => {
    if (range === 'custom') {
      setIsCustomOpen(true);
    } else {
      setIsCustomOpen(false);
      onRangeChange(range);
    }
  };

  const handleCustomApply = () => {
    if (customDates?.startDate && customDates?.endDate) {
      onCustomDateChange(customDates);
      setIsCustomOpen(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
        <h3 className="text-sm font-medium text-foreground">Date Range</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
        {presetRanges?.map((range) => (
          <Button
            key={range?.value}
            variant={selectedRange === range?.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleRangeSelect(range?.value)}
            className="text-xs"
          >
            {range?.label}
          </Button>
        ))}
      </div>
      {isCustomOpen && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={customDates?.startDate}
                onChange={(e) => setCustomDates(prev => ({ ...prev, startDate: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">
                End Date
              </label>
              <input
                type="date"
                value={customDates?.endDate}
                onChange={(e) => setCustomDates(prev => ({ ...prev, endDate: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleCustomApply}
              disabled={!customDates?.startDate || !customDates?.endDate}
            >
              Apply
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;