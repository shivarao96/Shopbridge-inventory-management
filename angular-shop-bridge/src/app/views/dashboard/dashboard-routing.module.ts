import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ROUTE_PATHS } from "@app/common/constants/routing.constant";
import { InventoryDetailsComponent } from "./components/inventory-details/inventory-details.component";
import { InventoryComponent } from "./components/inventory/inventory.component";
import { MetricsComponent } from "./components/metrics/metrics.component";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
    {
        path: ROUTE_PATHS.EMPTY,
        component: DashboardComponent,
        children: [
            {
                path: ROUTE_PATHS.DASHBOARD_METRICS,
                component: MetricsComponent
            },
            {
                path: ROUTE_PATHS.DASHBOARD_INVENTORY,
                component: InventoryComponent
            },
            {
                path: `${ROUTE_PATHS.DASHBOARD_INVENTORY}/:inventoryId`,
                component: InventoryDetailsComponent
            }
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}