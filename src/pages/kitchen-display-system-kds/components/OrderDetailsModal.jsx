import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderDetailsModal = ({ order, isOpen, onClose, onMoveOrder }) => {
  if (!isOpen || !order) return null;

  const getPlatformIcon = (platform) => {
    const icons = {
      'uber-eats': 'Truck',
      'doordash': 'Car',
      'grubhub': 'Bike',
      'direct': 'Store'
    };
    return icons?.[platform] || 'Package';
  };

  const getStageActions = () => {
    const actions = {
      'new': [
        { label: 'Start Preparation', stage: 'prep', variant: 'default', icon: 'Play' },
        { label: 'Mark as Rush', action: 'rush', variant: 'warning', icon: 'Zap' }
      ],
      'prep': [
        { label: 'Ready for QC', stage: 'quality', variant: 'default', icon: 'CheckCircle' },
        { label: 'Need Help', action: 'help', variant: 'outline', icon: 'HelpCircle' }
      ],
      'quality': [
        { label: 'Complete Order', stage: 'completed', variant: 'success', icon: 'Check' },
        { label: 'Return to Prep', stage: 'prep', variant: 'outline', icon: 'ArrowLeft' }
      ],
      'completed': [
        { label: 'Reopen Order', stage: 'quality', variant: 'outline', icon: 'RotateCcw' }
      ]
    };
    return actions?.[order?.stage] || [];
  };

  const handleAction = (action) => {
    if (action?.stage) {
      onMoveOrder(order?.id, order?.stage, action?.stage);
      onClose();
    } else if (action?.action === 'rush') {
      // Handle rush order logic
      console.log('Mark as rush order');
    } else if (action?.action === 'help') {
      // Handle help request logic
      console.log('Request help for order');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1100 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name={getPlatformIcon(order?.platform)} size={24} className="text-primary" />
              <div>
                <h2 className="text-xl font-semibold text-foreground">Order #{order?.orderNumber}</h2>
                <p className="text-sm text-muted-foreground capitalize">
                  {order?.platform?.replace('-', ' ')} • {order?.customerName}
                </p>
              </div>
            </div>
            {order?.isRush && (
              <div className="bg-error text-error-foreground px-3 py-1 rounded font-medium">
                RUSH ORDER
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            iconSize={20}
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Order Info */}
        <div className="p-6 space-y-6">
          {/* Timing Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Order Time</span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {new Date(order.orderTime)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Target" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Est. Completion</span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {new Date(order.estimatedCompletionTime)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Station</span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {order?.assignedStation || 'Not Assigned'}
              </p>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Order Items</h3>
            <div className="space-y-3">
              {order?.items?.map((item, index) => (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded font-medium">
                        {item?.quantity}
                      </span>
                      <div>
                        <h4 className="font-medium text-foreground">{item?.name}</h4>
                        {item?.size && (
                          <p className="text-sm text-muted-foreground">Size: {item?.size}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-foreground">${item?.price}</span>
                  </div>
                  
                  {item?.modifications && item?.modifications?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-foreground mb-2">Modifications:</p>
                      <div className="flex flex-wrap gap-2">
                        {item?.modifications?.map((mod, modIndex) => (
                          <span key={modIndex} className="bg-warning/20 text-warning px-2 py-1 rounded text-sm">
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {item?.cookingInstructions && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-foreground mb-1">Cooking Instructions:</p>
                      <p className="text-sm text-muted-foreground">{item?.cookingInstructions}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          {order?.specialInstructions && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Special Instructions</h3>
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Icon name="MessageSquare" size={20} className="text-warning mt-0.5" />
                  <p className="text-foreground">{order?.specialInstructions}</p>
                </div>
              </div>
            </div>
          )}

          {/* Allergen Information */}
          {order?.allergens && order?.allergens?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Allergen Warnings</h3>
              <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium mb-2">Contains allergens:</p>
                    <div className="flex flex-wrap gap-2">
                      {order?.allergens?.map((allergen, index) => (
                        <span key={index} className="bg-error text-error-foreground px-3 py-1 rounded font-medium">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Customer Information</h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-medium text-foreground">{order?.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium text-foreground">{order?.customerPhone || 'Not provided'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                  <p className="font-medium text-foreground">{order?.deliveryAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Current Stage:</span>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded font-medium capitalize">
              {order?.stage?.replace('-', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {getStageActions()?.map((action, index) => (
              <Button
                key={index}
                variant={action?.variant}
                iconName={action?.icon}
                iconPosition="left"
                onClick={() => handleAction(action)}
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;