import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import OrderCard from './OrderCard';

const KanbanColumn = ({ 
  title, 
  stage, 
  orders, 
  onMoveOrder, 
  onViewDetails, 
  color = 'primary',
  icon 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    try {
      const data = JSON.parse(e?.dataTransfer?.getData('text/plain'));
      if (data?.currentStage !== stage) {
        onMoveOrder(data?.orderId, data?.currentStage, stage);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const getColumnColor = () => {
    const colors = {
      primary: 'border-primary bg-primary/5',
      warning: 'border-warning bg-warning/5',
      success: 'border-success bg-success/5',
      secondary: 'border-secondary bg-secondary/5'
    };
    return colors?.[color] || colors?.primary;
  };

  const getHeaderColor = () => {
    const colors = {
      primary: 'bg-primary text-primary-foreground',
      warning: 'bg-warning text-warning-foreground',
      success: 'bg-success text-success-foreground',
      secondary: 'bg-secondary text-secondary-foreground'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div 
      className={`flex flex-col h-full bg-card border-2 rounded-lg transition-micro ${
        isDragOver ? getColumnColor() : 'border-border'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className={`flex items-center justify-between p-4 rounded-t-lg ${getHeaderColor()}`}>
        <div className="flex items-center gap-3">
          <Icon name={icon} size={20} />
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <span className="text-sm opacity-90">{orders?.length} orders</span>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="xs"
            iconName="Filter"
            iconSize={16}
            className="text-current hover:bg-white/20"
          >
            <span className="sr-only">Filter orders</span>
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName="MoreVertical"
            iconSize={16}
            className="text-current hover:bg-white/20"
          >
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>
      {/* Orders List */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {orders?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Icon name="Package" size={32} className="mb-2 opacity-50" />
            <p className="text-sm">No orders in this stage</p>
          </div>
        ) : (
          orders?.map((order) => (
            <OrderCard
              key={order?.id}
              order={order}
              onMoveOrder={onMoveOrder}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>
      {/* Drop Zone Indicator */}
      {isDragOver && (
        <div className="absolute inset-0 border-2 border-dashed border-primary bg-primary/10 rounded-lg flex items-center justify-center pointer-events-none">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium">
            Drop order here
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;