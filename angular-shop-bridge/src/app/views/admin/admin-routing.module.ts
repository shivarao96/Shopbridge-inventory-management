import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ROUTE_PATHS } from "@app/common/constants/routing.constant";
import { AdminComponent } from "./admin.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const route: Routes = [
    {
        path: ROUTE_PATHS.EMPTY,
        component: AdminComponent,
        children: [
            {
                path: ROUTE_PATHS.LOGIN,
                component: LoginComponent
            },
            {
                path: ROUTE_PATHS.REGISTER,
                component: RegisterComponent
            }
        ]
    },
];

@NgModule({
 imports: [RouterModule.forChild(route)],
 exports: [RouterModule]    
})
export class AdminRoutingModule {}