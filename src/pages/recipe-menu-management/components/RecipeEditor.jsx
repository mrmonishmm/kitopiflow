import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RecipeEditor = ({ recipe, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: recipe?.name || '',
    description: recipe?.description || '',
    brand: recipe?.brand || 'pizza-palace',
    category: recipe?.category || 'mains',
    servings: recipe?.servings || 4,
    prepTime: recipe?.prepTime || 30,
    cookTime: recipe?.cookTime || 45,
    difficulty: recipe?.difficulty || 'medium',
    tags: recipe?.tags || [],
    ingredients: recipe?.ingredients || [],
    instructions: recipe?.instructions || [],
    images: recipe?.images || []
  });

  const [activeTab, setActiveTab] = useState('details');
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: 'cups',
    cost: ''
  });
  const [newInstruction, setNewInstruction] = useState('');

  const brandOptions = [
    { value: 'pizza-palace', label: 'Pizza Palace' },
    { value: 'burger-barn', label: 'Burger Barn' },
    { value: 'taco-time', label: 'Taco Time' },
    { value: 'sushi-spot', label: 'Sushi Spot' }
  ];

  const categoryOptions = [
    { value: 'appetizers', label: 'Appetizers' },
    { value: 'mains', label: 'Main Courses' },
    { value: 'sides', label: 'Sides' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'beverages', label: 'Beverages' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const unitOptions = [
    { value: 'cups', label: 'Cups' },
    { value: 'tbsp', label: 'Tablespoons' },
    { value: 'tsp', label: 'Teaspoons' },
    { value: 'oz', label: 'Ounces' },
    { value: 'lbs', label: 'Pounds' },
    { value: 'grams', label: 'Grams' },
    { value: 'ml', label: 'Milliliters' },
    { value: 'pieces', label: 'Pieces' }
  ];

  const availableTags = [
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free',
    'spicy', 'quick-prep', 'popular', 'seasonal', 'signature'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev?.tags?.includes(tag)
        ? prev?.tags?.filter(t => t !== tag)
        : [...prev?.tags, tag]
    }));
  };

  const addIngredient = () => {
    if (newIngredient?.name && newIngredient?.quantity) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev?.ingredients, {
          id: Date.now(),
          ...newIngredient,
          cost: parseFloat(newIngredient?.cost) || 0
        }]
      }));
      setNewIngredient({ name: '', quantity: '', unit: 'cups', cost: '' });
    }
  };

  const removeIngredient = (id) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev?.ingredients?.filter(ing => ing?.id !== id)
    }));
  };

  const addInstruction = () => {
    if (newInstruction?.trim()) {
      setFormData(prev => ({
        ...prev,
        instructions: [...prev?.instructions, {
          id: Date.now(),
          step: prev?.instructions?.length + 1,
          text: newInstruction?.trim()
        }]
      }));
      setNewInstruction('');
    }
  };

  const removeInstruction = (id) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev?.instructions?.filter(inst => inst?.id !== id)?.map((inst, index) => ({ ...inst, step: index + 1 }))
    }));
  };

  const calculateTotalCost = () => {
    return formData?.ingredients?.reduce((total, ing) => total + (ing?.cost || 0), 0);
  };

  const calculateCostPerServing = () => {
    const totalCost = calculateTotalCost();
    return formData?.servings > 0 ? totalCost / formData?.servings : 0;
  };

  const tabs = [
    { id: 'details', label: 'Recipe Details', icon: 'FileText' },
    { id: 'ingredients', label: 'Ingredients', icon: 'ShoppingCart' },
    { id: 'instructions', label: 'Instructions', icon: 'List' },
    { id: 'costing', label: 'Cost Analysis', icon: 'DollarSign' },
    { id: 'images', label: 'Images', icon: 'Image' }
  ];

  if (!recipe && !formData?.name) {
    return (
      <div className="bg-card border border-border rounded-lg h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="ChefHat" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Recipe</h3>
          <p className="text-sm text-muted-foreground">
            Choose a recipe from the library to edit or create a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            {recipe ? 'Edit Recipe' : 'New Recipe'}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              iconSize={16}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Save"
              iconPosition="left"
              iconSize={16}
              onClick={() => onSave(formData)}
            >
              Save Recipe
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-micro
                ${activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Recipe Name"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                placeholder="Enter recipe name"
                required
              />
              
              <Select
                label="Brand"
                options={brandOptions}
                value={formData?.brand}
                onChange={(value) => handleInputChange('brand', value)}
              />
            </div>

            <Input
              label="Description"
              type="text"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Brief description of the recipe"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
              />
              
              <Select
                label="Difficulty"
                options={difficultyOptions}
                value={formData?.difficulty}
                onChange={(value) => handleInputChange('difficulty', value)}
              />
              
              <Input
                label="Servings"
                type="number"
                value={formData?.servings}
                onChange={(e) => handleInputChange('servings', parseInt(e?.target?.value))}
                min="1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Prep Time (minutes)"
                type="number"
                value={formData?.prepTime}
                onChange={(e) => handleInputChange('prepTime', parseInt(e?.target?.value))}
                min="0"
              />
              
              <Input
                label="Cook Time (minutes)"
                type="number"
                value={formData?.cookTime}
                onChange={(e) => handleInputChange('cookTime', parseInt(e?.target?.value))}
                min="0"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Recipe Tags
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {availableTags?.map((tag) => (
                  <Checkbox
                    key={tag}
                    label={tag?.charAt(0)?.toUpperCase() + tag?.slice(1)}
                    checked={formData?.tags?.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="space-y-4">
            {/* Add Ingredient Form */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-3">Add Ingredient</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Ingredient name"
                    value={newIngredient?.name}
                    onChange={(e) => setNewIngredient(prev => ({ ...prev, name: e?.target?.value }))}
                  />
                </div>
                <Input
                  placeholder="Quantity"
                  value={newIngredient?.quantity}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, quantity: e?.target?.value }))}
                />
                <Select
                  options={unitOptions}
                  value={newIngredient?.unit}
                  onChange={(value) => setNewIngredient(prev => ({ ...prev, unit: value }))}
                  placeholder="Unit"
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Cost ($)"
                    type="number"
                    step="0.01"
                    value={newIngredient?.cost}
                    onChange={(e) => setNewIngredient(prev => ({ ...prev, cost: e?.target?.value }))}
                  />
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Plus"
                    onClick={addIngredient}
                  />
                </div>
              </div>
            </div>

            {/* Ingredients List */}
            <div className="space-y-2">
              {formData?.ingredients?.map((ingredient) => (
                <div
                  key={ingredient?.id}
                  className="flex items-center justify-between p-3 bg-background border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-foreground">
                        {ingredient?.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {ingredient?.quantity} {ingredient?.unit}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        ${ingredient?.cost?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => removeIngredient(ingredient?.id)}
                    className="text-error hover:text-error"
                  />
                </div>
              ))}
            </div>

            {formData?.ingredients?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="ShoppingCart" size={48} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No ingredients added yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'instructions' && (
          <div className="space-y-4">
            {/* Add Instruction Form */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-3">Add Instruction</h3>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter cooking instruction..."
                  value={newInstruction}
                  onChange={(e) => setNewInstruction(e?.target?.value)}
                  className="flex-1"
                />
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  onClick={addInstruction}
                />
              </div>
            </div>

            {/* Instructions List */}
            <div className="space-y-3">
              {formData?.instructions?.map((instruction) => (
                <div
                  key={instruction?.id}
                  className="flex gap-4 p-4 bg-background border border-border rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {instruction?.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{instruction?.text}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => removeInstruction(instruction?.id)}
                    className="text-error hover:text-error flex-shrink-0"
                  />
                </div>
              ))}
            </div>

            {formData?.instructions?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="List" size={48} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No instructions added yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'costing' && (
          <div className="space-y-6">
            {/* Cost Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="DollarSign" size={20} className="text-primary" />
                  <h3 className="font-medium text-foreground">Total Cost</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ${calculateTotalCost()?.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  For {formData?.servings} servings
                </p>
              </div>

              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Calculator" size={20} className="text-accent" />
                  <h3 className="font-medium text-foreground">Cost Per Serving</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ${calculateCostPerServing()?.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Individual portion cost
                </p>
              </div>

              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                  <h3 className="font-medium text-foreground">Suggested Price</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ${(calculateCostPerServing() * 3.5)?.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  250% markup (industry standard)
                </p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-4">Cost Breakdown</h3>
              <div className="space-y-2">
                {formData?.ingredients?.map((ingredient) => (
                  <div
                    key={ingredient?.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-foreground">{ingredient?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {ingredient?.quantity} {ingredient?.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-foreground">
                        ${ingredient?.cost?.toFixed(2)}
                      </span>
                      <div className="w-16 text-right">
                        <span className="text-xs text-muted-foreground">
                          {((ingredient?.cost / calculateTotalCost()) * 100)?.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profit Analysis */}
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-4">Profit Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Labor Cost (per serving)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    defaultValue="2.50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Overhead Cost (per serving)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    defaultValue="1.25"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Upload Recipe Images</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop images here, or click to browse
              </p>
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
            </div>

            {/* Image Gallery */}
            {formData?.images?.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData?.images?.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={image}
                        alt={`Recipe image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      iconName="Trash2"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeEditor;