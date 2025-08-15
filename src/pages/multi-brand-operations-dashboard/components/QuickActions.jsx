import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isShiftHandoverOpen, setIsShiftHandoverOpen] = useState(false);

  const quickActions = [
    {
      id: 'emergency',
      label: 'Emergency Stop',
      description: 'Stop all kitchen operations immediately',
      icon: 'AlertTriangle',
      variant: 'destructive',
      action: () => setIsEmergencyModalOpen(true)
    },
    {
      id: 'shift-handover',
      label: 'Shift Handover',
      description: 'Transfer operations to next shift',
      icon: 'Users',
      variant: 'outline',
      action: () => setIsShiftHandoverOpen(true)
    },
    {
      id: 'system-status',
      label: 'System Status',
      description: 'View detailed system health',
      icon: 'Activity',
      variant: 'ghost',
      action: () => console.log('System status clicked')
    },
    {
      id: 'broadcast',
      label: 'Broadcast Message',
      description: 'Send message to all staff',
      icon: 'MessageSquare',
      variant: 'outline',
      action: () => console.log('Broadcast clicked')
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Fryer #1 requires maintenance check',
      timestamp: '2 min ago',
      action: 'Schedule Maintenance'
    },
    {
      id: 2,
      type: 'info',
      message: 'Peak hour approaching - prepare additional staff',
      timestamp: '5 min ago',
      action: 'View Schedule'
    },
    {
      id: 3,
      type: 'success',
      message: 'Daily inventory sync completed successfully',
      timestamp: '10 min ago',
      action: 'View Report'
    }
  ];

  const getAlertColor = (type) => {
    const colors = {
      warning: 'border-warning/20 bg-warning/5',
      error: 'border-error/20 bg-error/5',
      info: 'border-primary/20 bg-primary/5',
      success: 'border-success/20 bg-success/5'
    };
    return colors?.[type] || colors?.info;
  };

  const getAlertIcon = (type) => {
    const icons = {
      warning: 'AlertTriangle',
      error: 'XCircle',
      info: 'Info',
      success: 'CheckCircle'
    };
    return icons?.[type] || 'Info';
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              size="sm"
              iconName={action?.icon}
              iconPosition="left"
              iconSize={16}
              onClick={action?.action}
              className="h-auto p-4 flex-col items-start text-left"
            >
              <span className="font-medium mb-1">{action?.label}</span>
              <span className="text-xs opacity-80 font-normal">{action?.description}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* System Alerts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
          </div>
          <Button variant="ghost" size="sm" iconName="Settings" iconSize={16}>
            Settings
          </Button>
        </div>

        <div className="space-y-3">
          {systemAlerts?.map((alert) => (
            <div key={alert?.id} className={`border rounded-lg p-4 ${getAlertColor(alert?.type)}`}>
              <div className="flex items-start gap-3">
                <Icon 
                  name={getAlertIcon(alert?.type)} 
                  size={18} 
                  className={`mt-0.5 ${
                    alert?.type === 'warning' ? 'text-warning' :
                    alert?.type === 'error' ? 'text-error' :
                    alert?.type === 'success'? 'text-success' : 'text-primary'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground mb-1">{alert?.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{alert?.timestamp}</span>
                    <Button variant="ghost" size="xs" className="text-xs">
                      {alert?.action}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full" iconName="Eye" iconPosition="left">
            View All Alerts
          </Button>
        </div>
      </div>
      {/* Emergency Modal */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1100">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-error" />
              <h3 className="text-lg font-semibold text-foreground">Emergency Stop</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              This will immediately stop all kitchen operations and notify all staff. 
              Are you sure you want to proceed?
            </p>
            <div className="flex gap-3">
              <Button 
                variant="destructive" 
                onClick={() => setIsEmergencyModalOpen(false)}
                className="flex-1"
              >
                Confirm Emergency Stop
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEmergencyModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Shift Handover Modal */}
      {isShiftHandoverOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1100">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Users" size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Shift Handover</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Prepare handover notes for the incoming shift manager.
            </p>
            <textarea 
              className="w-full p-3 border border-border rounded-md text-sm mb-4 resize-none"
              rows="4"
              placeholder="Enter handover notes, current status, and any important information..."
            />
            <div className="flex gap-3">
              <Button 
                variant="default" 
                onClick={() => setIsShiftHandoverOpen(false)}
                className="flex-1"
              >
                Complete Handover
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsShiftHandoverOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;