import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onMoveOrder, onViewDetails }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const prepTime = new Date(order.estimatedCompletionTime);
      const diff = prepTime?.getTime() - now?.getTime();
      
      setTimeRemaining(Math.max(0, Math.floor(diff / 1000)));
      setIsOverdue(diff < 0);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [order?.estimatedCompletionTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getPriorityColor = () => {
    if (isOverdue) return 'border-l-error bg-error/5';
    if (order?.priority === 'high') return 'border-l-warning bg-warning/5';
    if (timeRemaining < 300) return 'border-l-warning bg-warning/5'; // Less than 5 minutes
    return 'border-l-success bg-success/5';
  };

  const getTimeColor = () => {
    if (isOverdue) return 'text-error';
    if (timeRemaining < 300) return 'text-warning';
    return 'text-success';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'uber-eats': 'Truck',
      'doordash': 'Car',
      'grubhub': 'Bike',
      'direct': 'Store'
    };
    return icons?.[platform] || 'Package';
  };

  const handleDragStart = (e) => {
    e?.dataTransfer?.setData('text/plain', JSON.stringify({
      orderId: order?.id,
      currentStage: order?.stage
    }));
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-4 cursor-move hover-scale transition-micro ${getPriorityColor()} border-l-4`}
      draggable
      onDragStart={handleDragStart}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">#{order?.orderNumber}</span>
          <div className="flex items-center gap-1">
            <Icon name={getPlatformIcon(order?.platform)} size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground capitalize">{order?.platform?.replace('-', ' ')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {order?.isRush && (
            <div className="bg-error text-error-foreground px-2 py-1 rounded text-xs font-medium">
              RUSH
            </div>
          )}
          <Button
            variant="ghost"
            size="xs"
            iconName="Eye"
            iconSize={14}
            onClick={() => onViewDetails(order)}
          >
            <span className="sr-only">View details</span>
          </Button>
        </div>
      </div>
      {/* Timer */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className={getTimeColor()} />
          <span className={`font-mono text-sm font-medium ${getTimeColor()}`}>
            {isOverdue ? `+${formatTime(Math.abs(timeRemaining))}` : formatTime(timeRemaining)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Est: {new Date(order.estimatedCompletionTime)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {/* Items */}
      <div className="space-y-2 mb-3">
        {order?.items?.slice(0, 3)?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-medium min-w-[24px] text-center">
                {item?.quantity}
              </span>
              <span className="text-sm text-foreground">{item?.name}</span>
            </div>
            {item?.modifications && item?.modifications?.length > 0 && (
              <Icon name="AlertCircle" size={14} className="text-warning" />
            )}
          </div>
        ))}
        {order?.items?.length > 3 && (
          <div className="text-xs text-muted-foreground text-center py-1">
            +{order?.items?.length - 3} more items
          </div>
        )}
      </div>
      {/* Special Instructions */}
      {order?.specialInstructions && (
        <div className="bg-muted rounded p-2 mb-3">
          <div className="flex items-start gap-2">
            <Icon name="MessageSquare" size={14} className="text-muted-foreground mt-0.5" />
            <p className="text-xs text-foreground">{order?.specialInstructions}</p>
          </div>
        </div>
      )}
      {/* Allergen Warnings */}
      {order?.allergens && order?.allergens?.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <Icon name="AlertTriangle" size={14} className="text-warning" />
          <div className="flex flex-wrap gap-1">
            {order?.allergens?.map((allergen, index) => (
              <span key={index} className="bg-warning/20 text-warning px-2 py-1 rounded text-xs">
                {allergen}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Station Assignment */}
      {order?.assignedStation && (
        <div className="flex items-center gap-2 mb-3">
          <Icon name="MapPin" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Station: {order?.assignedStation}</span>
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <Icon name="User" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{order?.customerName}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(order.orderTime)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;