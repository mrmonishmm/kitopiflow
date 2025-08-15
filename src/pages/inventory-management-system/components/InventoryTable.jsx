import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InventoryTable = ({ 
  items, 
  onStockUpdate, 
  onReorder, 
  selectedItems, 
  onItemSelect, 
  onSelectAll 
}) => {
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditStart = (item) => {
    setEditingItem(item?.id);
    setEditValue(item?.currentStock?.toString());
  };

  const handleEditSave = (item) => {
    const newStock = parseInt(editValue);
    if (!isNaN(newStock) && newStock >= 0) {
      onStockUpdate(item?.id, newStock);
    }
    setEditingItem(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingItem(null);
    setEditValue('');
  };

  const getStockStatus = (item) => {
    const percentage = (item?.currentStock / item?.reorderLevel) * 100;
    if (percentage <= 50) return { status: 'critical', color: 'text-error', bg: 'bg-error/10' };
    if (percentage <= 100) return { status: 'low', color: 'text-warning', bg: 'bg-warning/10' };
    return { status: 'good', color: 'text-success', bg: 'bg-success/10' };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-muted/50 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedItems?.length === items?.length && items?.length > 0}
              onChange={(e) => onSelectAll(e?.target?.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm font-medium text-foreground">
              {selectedItems?.length > 0 ? `${selectedItems?.length} selected` : 'Select all'}
            </span>
          </div>
          
          {selectedItems?.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="ShoppingCart"
                iconPosition="left"
                iconSize={16}
              >
                Bulk Reorder
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span>Ingredient</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span>Current Stock</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span>Unit Cost</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Supplier
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Updated
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Usage Forecast
              </th>
              <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items?.map((item) => {
              const stockStatus = getStockStatus(item);
              const isEditing = editingItem === item?.id;
              
              return (
                <tr key={item?.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedItems?.includes(item?.id)}
                        onChange={(e) => onItemSelect(item?.id, e?.target?.checked)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-ring"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Icon name="Package" size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item?.name}</p>
                          <p className="text-sm text-muted-foreground">{item?.category}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e?.target?.value)}
                          className="w-20"
                          min="0"
                        />
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Check"
                          iconSize={14}
                          onClick={() => handleEditSave(item)}
                        />
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="X"
                          iconSize={14}
                          onClick={handleEditCancel}
                        />
                      </div>
                    ) : (
                      <div 
                        className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-2 py-1"
                        onClick={() => handleEditStart(item)}
                      >
                        <span className="font-medium text-foreground">
                          {item?.currentStock} {item?.unit}
                        </span>
                        <Icon name="Edit2" size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100" />
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground">
                      {formatCurrency(item?.unitCost)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {item?.supplier?.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-foreground">{item?.supplier}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(item?.lastUpdated)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${stockStatus?.bg} ${stockStatus?.color}`}>
                      <div className={`w-2 h-2 rounded-full ${stockStatus?.color?.replace('text-', 'bg-')}`}></div>
                      {stockStatus?.status === 'critical' ? 'Critical' : 
                       stockStatus?.status === 'low' ? 'Low Stock' : 'In Stock'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <span className="text-foreground font-medium">{item?.weeklyUsage}</span>
                      <span className="text-muted-foreground"> {item?.unit}/week</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Eye"
                        iconSize={14}
                        title="View Details"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="ShoppingCart"
                        iconSize={14}
                        onClick={() => onReorder(item?.id)}
                        title="Reorder"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="MoreHorizontal"
                        iconSize={14}
                        title="More Actions"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {items?.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Package" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No inventory items found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or add new inventory items.
          </p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Add Inventory Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;