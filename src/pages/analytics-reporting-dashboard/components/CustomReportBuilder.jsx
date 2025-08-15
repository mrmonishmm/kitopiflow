import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomReportBuilder = ({ onSaveReport }) => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    name: '',
    widgets: [],
    schedule: 'manual',
    recipients: []
  });

  const availableWidgets = [
    { id: 'sales-chart', name: 'Sales Performance Chart', category: 'Sales', icon: 'TrendingUp' },
    { id: 'order-volume', name: 'Order Volume Metrics', category: 'Operations', icon: 'BarChart3' },
    { id: 'brand-comparison', name: 'Brand Comparison Table', category: 'Analysis', icon: 'GitCompare' },
    { id: 'cost-analysis', name: 'Cost Analysis', category: 'Finance', icon: 'DollarSign' },
    { id: 'inventory-levels', name: 'Inventory Levels', category: 'Inventory', icon: 'Package' },
    { id: 'staff-performance', name: 'Staff Performance', category: 'HR', icon: 'Users' },
    { id: 'customer-satisfaction', name: 'Customer Satisfaction', category: 'Quality', icon: 'Heart' },
    { id: 'delivery-metrics', name: 'Delivery Metrics', category: 'Logistics', icon: 'Truck' }
  ];

  const scheduleOptions = [
    { value: 'manual', label: 'Manual' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const savedReports = [
    { id: 1, name: 'Executive Summary', widgets: 6, schedule: 'weekly', lastRun: '2025-08-14' },
    { id: 2, name: 'Operations Daily', widgets: 4, schedule: 'daily', lastRun: '2025-08-15' },
    { id: 3, name: 'Financial Monthly', widgets: 8, schedule: 'monthly', lastRun: '2025-08-01' }
  ];

  const handleWidgetToggle = (widgetId) => {
    setReportConfig(prev => ({
      ...prev,
      widgets: prev?.widgets?.includes(widgetId)
        ? prev?.widgets?.filter(id => id !== widgetId)
        : [...prev?.widgets, widgetId]
    }));
  };

  const handleSaveReport = () => {
    if (reportConfig?.name && reportConfig?.widgets?.length > 0) {
      onSaveReport(reportConfig);
      setReportConfig({ name: '', widgets: [], schedule: 'manual', recipients: [] });
      setIsBuilderOpen(false);
    }
  };

  const groupedWidgets = availableWidgets?.reduce((acc, widget) => {
    if (!acc?.[widget?.category]) {
      acc[widget.category] = [];
    }
    acc?.[widget?.category]?.push(widget);
    return acc;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Custom Report Builder</h3>
        </div>
        
        <Button
          variant="default"
          onClick={() => setIsBuilderOpen(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Create Report
        </Button>
      </div>
      {/* Saved Reports */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium text-foreground">Saved Reports</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedReports?.map((report) => (
            <div key={report?.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-foreground">{report?.name}</h5>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" iconName="Play">
                    <span className="sr-only">Run report</span>
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Edit">
                    <span className="sr-only">Edit report</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="BarChart3" size={14} />
                  <span>{report?.widgets} widgets</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={14} />
                  <span className="capitalize">{report?.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={14} />
                  <span>Last run: {report?.lastRun}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Report Builder Modal */}
      {isBuilderOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1100">
          <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Create Custom Report</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBuilderOpen(false)}
                iconName="X"
              >
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Report Configuration */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Report Name
                    </label>
                    <input
                      type="text"
                      value={reportConfig?.name}
                      onChange={(e) => setReportConfig(prev => ({ ...prev, name: e?.target?.value }))}
                      placeholder="Enter report name"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Schedule
                    </label>
                    <select
                      value={reportConfig?.schedule}
                      onChange={(e) => setReportConfig(prev => ({ ...prev, schedule: e?.target?.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {scheduleOptions?.map((option) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Selected Widgets ({reportConfig?.widgets?.length})
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-border rounded-md p-3">
                      {reportConfig?.widgets?.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No widgets selected</p>
                      ) : (
                        reportConfig?.widgets?.map((widgetId) => {
                          const widget = availableWidgets?.find(w => w?.id === widgetId);
                          return (
                            <div key={widgetId} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <div className="flex items-center gap-2">
                                <Icon name={widget?.icon} size={16} />
                                <span className="text-sm">{widget?.name}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleWidgetToggle(widgetId)}
                                iconName="X"
                              >
                                <span className="sr-only">Remove widget</span>
                              </Button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* Available Widgets */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Available Widgets</h4>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {Object.entries(groupedWidgets)?.map(([category, widgets]) => (
                      <div key={category}>
                        <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                          {category}
                        </h5>
                        <div className="space-y-2">
                          {widgets?.map((widget) => (
                            <div
                              key={widget?.id}
                              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                reportConfig?.widgets?.includes(widget?.id)
                                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                              }`}
                              onClick={() => handleWidgetToggle(widget?.id)}
                            >
                              <div className="flex items-center gap-3">
                                <Icon name={widget?.icon} size={18} className="text-primary" />
                                <div>
                                  <p className="text-sm font-medium text-foreground">{widget?.name}</p>
                                  <p className="text-xs text-muted-foreground">{category}</p>
                                </div>
                                {reportConfig?.widgets?.includes(widget?.id) && (
                                  <Icon name="Check" size={16} className="text-primary ml-auto" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setIsBuilderOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSaveReport}
                disabled={!reportConfig?.name || reportConfig?.widgets?.length === 0}
              >
                Save Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomReportBuilder;