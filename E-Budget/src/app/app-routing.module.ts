import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetCategoryComponent } from './components/budget-category/budget-category.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AppConstant } from './constants/app.constants';

const routes: Routes = [
   {path:'',redirectTo:AppConstant.LANDINGPAGE,pathMatch:'full'},  
   {path:AppConstant.LANDINGPAGE,component:LandingPageComponent},
   {path:AppConstant.BUDGETCATEGORY,component:BudgetCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
