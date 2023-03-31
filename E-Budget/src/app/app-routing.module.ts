import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetCreationComponent } from './components/budget-creation/budget-creation.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AppConstant } from './constants/app.constants';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceGenerateComponent } from './components/invoice-generate/invoice-generate.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { PoGenerateComponent } from './components/po-generate/po-generate.component';
import { BudgetCategoryMasterComponent } from './components/master-fields/budget-category-master/budget-category-master.component';
import { BudgetSubCategoryMasterComponent } from './components/master-fields/budget-sub-category-master/budget-sub-category-master.component';
import { VendorMasterComponent } from './components/master-fields/vendor-master/vendor-master.component';
import { BudgetCategoryViewComponent } from './components/master-fields-view/budget-category-view/budget-category-view.component';


const routes: Routes = [
  { path: '', redirectTo: AppConstant.LANDINGPAGE, pathMatch: 'full' },
  { path: AppConstant.LANDINGPAGE, component: LandingPageComponent },
  { path: AppConstant.NAVBAR, component: NavbarComponent },
  { path: AppConstant.BUDGETCREATION, component: BudgetCreationComponent },
  { path: AppConstant.HOME, component: HomeComponent },
  { path: AppConstant.GENERATEINVOICE, component: InvoiceGenerateComponent },
  { path: AppConstant.GENERATEPO, component: PoGenerateComponent },
  { path: AppConstant.BUDGETCATEGORYMASTER, component: BudgetCategoryMasterComponent },
  { path: AppConstant.BUDGETSUBCATEGORYMASTER, component: BudgetSubCategoryMasterComponent },
  { path: AppConstant.VENDORMASTER, component: VendorMasterComponent },
  { path: AppConstant.BUDGETCATEGORYVIEW, component: BudgetCategoryViewComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
