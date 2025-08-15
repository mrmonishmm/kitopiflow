import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderDetailsModal = ({ order, isOpen, onClose, onStatusUpdate }) => {
  if (!isOpen || !order) return null;

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'confirmed': 'bg-green-100 text-green-800',
      'preparing': 'bg-yellow-100 text-yellow-800',
      'ready': 'bg-purple-100 text-purple-800',
      'picked-up': 'bg-gray-100 text-gray-800',
      'delayed': 'bg-red-100 text-red-800'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'ubereats': 'Car',
      'doordash': 'Truck',
      'grubhub': 'ShoppingBag'
    };
    return icons?.[platform] || 'ShoppingCart';
  };

  const formatTime = (time) => {
    return new Date(time)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotal = () => {
    return order?.items?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-1100 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Icon name={getPlatformIcon(order?.platform)} size={24} className="text-muted-foreground" />
              <div>
                <h2 className="text-xl font-semibold text-foreground">Order #{order?.orderId}</h2>
                <p className="text-sm text-muted-foreground capitalize">{order?.platform} • {formatTime(order?.orderTime)}</p>
              </div>
            </div>
            {order?.isPriority && (
              <div className="flex items-center gap-2 px-3 py-1 bg-error/10 rounded-full">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <span className="text-sm font-medium text-error">Priority</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          >
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Items */}
              <div className="lg:col-span-2">
                <div className="bg-muted rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {order?.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-foreground">{item?.quantity}x</span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item?.name}</p>
                              {item?.modifications && item?.modifications?.length > 0 && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item?.modifications?.join(', ')}
                                </p>
                              )}
                              {item?.notes && (
                                <p className="text-xs text-warning mt-1">Note: {item?.notes}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">${(item?.price * item?.quantity)?.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">${item?.price?.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Total */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-lg font-bold text-foreground">${calculateTotal()?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Preparation Instructions */}
                {order?.preparationInstructions && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Icon name="AlertCircle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Preparation Instructions</h4>
                        <p className="text-sm text-foreground">{order?.preparationInstructions}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Customer Notes */}
                {order?.customerNotes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Icon name="MessageSquare" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Customer Notes</h4>
                        <p className="text-sm text-foreground">{order?.customerNotes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Details Sidebar */}
              <div className="space-y-6">
                {/* Status & Timing */}
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Status & Timing</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Status</span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                        {order?.status?.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Promised Time</span>
                      <span className="text-sm font-medium text-foreground">{formatTime(order?.promisedTime)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Est. Completion</span>
                      <span className="text-sm font-medium text-foreground">{formatTime(order?.estimatedCompletion)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Prep Time</span>
                      <span className="text-sm font-medium text-foreground">{order?.estimatedPrepTime} min</span>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="text-sm font-medium text-foreground">{order?.customer?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium text-foreground">{order?.customer?.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Delivery Address</p>
                      <p className="text-sm font-medium text-foreground">{order?.customer?.address}</p>
                    </div>
                  </div>
                </div>

                {/* Station Assignment */}
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Station Assignment</h3>
                  <div className="space-y-2">
                    {order?.stationAssignments ? (
                      order?.stationAssignments?.map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-card rounded">
                          <span className="text-sm text-foreground">{assignment?.station}</span>
                          <span className="text-xs text-muted-foreground">{assignment?.staff}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No stations assigned</p>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="CheckCircle"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full"
                    onClick={() => onStatusUpdate(order?.id, 'confirmed')}
                  >
                    Mark as Confirmed
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Clock"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full"
                  >
                    Update Timing
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Printer"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full"
                  >
                    Print Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;