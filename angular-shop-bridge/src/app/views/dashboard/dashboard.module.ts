import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonAppModule } from '@app/common-app.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryDetailsComponent } from './components/inventory-details/inventory-details.component';
import { HeaderComponent } from '@app/common/components/header/header.component';
import { ViewGuiderComponent } from '@app/common/components/view-guider/view-guider.component';
import { SearchBarComponent } from '@app/common/components/search-bar/search-bar.component';
import { FilterComponent } from '@app/common/components/filter/filter.component';
import { InventoryAddItemComponent } from './components/inventory-add-item/inventory-add-item.component';


const IMPORT_EXPORT_COMPONENTS: any[] = [
    DashboardComponent,
    MetricsComponent,
    InventoryComponent,
    InventoryDetailsComponent,
    HeaderComponent,
    ViewGuiderComponent,
    SearchBarComponent,
    FilterComponent,
    InventoryAddItemComponent,
];

const IMPORT_EXPORT_DIRECIVES: any[] = [

];

const IMPORT_EXPORT_PIPES: any[] = [

];

const IMPORT_MODULES = [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    CommonAppModule
];

const PROVIDERS: any[] = [

]

@NgModule({
  declarations: [
      ...IMPORT_EXPORT_COMPONENTS,
      ...IMPORT_EXPORT_DIRECIVES,
      ...IMPORT_EXPORT_PIPES
  ],
  imports: [
    ...IMPORT_MODULES
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class DashboardModule { }
