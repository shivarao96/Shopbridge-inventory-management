import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ROUTE_PATHS } from "@app/common/constants/routing.constant";
import { PageNotFoundComponent } from "@app/views/page-not-found/page-not-found.component";
import { AuthPageBlockGuard } from "./common/guard/auth-page-block.guard";
import { AuthGuard } from "./common/guard/auth.guard";


const routes: Routes = [
    {
        path: ROUTE_PATHS.DASHBOARD,
        loadChildren: () => import('@app/views/dashboard/dashboard.module').then((e) => e.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: ROUTE_PATHS.EMPTY,
        loadChildren: () => import('@app/views/admin/admin.module').then((e) => e.AdminModule),
        canActivate: [AuthPageBlockGuard]
    },
    {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', initialNavigation: 'enabled'})],
    exports: [RouterModule]
})

export class AppRoutingModule {}