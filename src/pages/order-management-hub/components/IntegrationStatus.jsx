import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationStatus = ({ connectionStatus, onReconnect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const integrations = [
    {
      id: 'ubereats',
      name: 'Uber Eats',
      icon: 'Car',
      status: connectionStatus?.ubereats,
      lastSync: '2 minutes ago',
      apiVersion: 'v2.1',
      color: 'bg-green-500'
    },
    {
      id: 'doordash',
      name: 'DoorDash',
      icon: 'Truck',
      status: connectionStatus?.doordash,
      lastSync: '1 minute ago',
      apiVersion: 'v3.0',
      color: 'bg-red-500'
    },
    {
      id: 'grubhub',
      name: 'Grubhub',
      icon: 'ShoppingBag',
      status: connectionStatus?.grubhub,
      lastSync: '3 minutes ago',
      apiVersion: 'v1.8',
      color: 'bg-orange-500'
    },
    {
      id: 'pos',
      name: 'POS System',
      icon: 'CreditCard',
      status: connectionStatus?.pos || 'connected',
      lastSync: '30 seconds ago',
      apiVersion: 'v4.2',
      color: 'bg-blue-500'
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'CheckCircle',
          text: 'Connected'
        };
      case 'disconnected':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          icon: 'XCircle',
          text: 'Disconnected'
        };
      case 'reconnecting':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'RefreshCw',
          text: 'Reconnecting'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'AlertCircle',
          text: 'Unknown'
        };
    }
  };

  const connectedCount = integrations?.filter(i => i?.status === 'connected')?.length;
  const totalCount = integrations?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Wifi" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Integration Status</h3>
            <p className="text-sm text-muted-foreground">
              {connectedCount}/{totalCount} platforms connected
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconSize={16}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {/* Status Overview */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Connected</p>
          <p className="text-lg font-bold text-success">{connectedCount}</p>
        </div>
        <div className="text-center p-3 bg-error/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Issues</p>
          <p className="text-lg font-bold text-error">{totalCount - connectedCount}</p>
        </div>
      </div>
      {/* Detailed Status */}
      {isExpanded && (
        <div className="space-y-3 pt-4 border-t border-border">
          {integrations?.map((integration) => {
            const statusInfo = getStatusInfo(integration?.status);
            
            return (
              <div key={integration?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${integration?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={integration?.icon} size={16} color="white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{integration?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      API {integration?.apiVersion} • Last sync: {integration?.lastSync}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-2 py-1 rounded-full ${statusInfo?.bgColor}`}>
                    <Icon 
                      name={statusInfo?.icon} 
                      size={12} 
                      className={`${statusInfo?.color} ${integration?.status === 'reconnecting' ? 'animate-spin' : ''}`}
                    />
                    <span className={`text-xs font-medium ${statusInfo?.color}`}>
                      {statusInfo?.text}
                    </span>
                  </div>
                  
                  {integration?.status !== 'connected' && (
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onReconnect(integration?.id)}
                      iconName="RefreshCw"
                      iconSize={12}
                      className="h-6 w-6"
                    >
                      <span className="sr-only">Reconnect</span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* System Health */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">System Health</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
                <span className="text-success font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationStatus;