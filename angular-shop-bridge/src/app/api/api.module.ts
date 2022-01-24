import { NgModule } from "@angular/core";
import { InventoryService } from "./inventory.service";
import { UserService } from "./user.service";

@NgModule({
    providers: [
        UserService,
        InventoryService
    ]
})
export class ApiModule {}