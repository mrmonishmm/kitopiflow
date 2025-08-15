import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import KitchenDisplaySystem from './pages/kitchen-display-system-kds';
import InventoryManagementSystem from './pages/inventory-management-system';
import OrderManagementHub from './pages/order-management-hub';
import MultiBrandOperationsDashboard from './pages/multi-brand-operations-dashboard';
import RecipeMenuManagement from './pages/recipe-menu-management';
import AnalyticsReportingDashboard from './pages/analytics-reporting-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AnalyticsReportingDashboard />} />
        <Route path="/kitchen-display-system-kds" element={<KitchenDisplaySystem />} />
        <Route path="/inventory-management-system" element={<InventoryManagementSystem />} />
        <Route path="/order-management-hub" element={<OrderManagementHub />} />
        <Route path="/multi-brand-operations-dashboard" element={<MultiBrandOperationsDashboard />} />
        <Route path="/recipe-menu-management" element={<RecipeMenuManagement />} />
        <Route path="/analytics-reporting-dashboard" element={<AnalyticsReportingDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
