import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BudgetCreationComponent } from './components/budget-creation/budget-creation.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AppConstant } from './constants/app.constants';
import { InvoiceGenerateComponent } from './components/invoice-generate/invoice-generate.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PoGenerateComponent } from './components/po-generate/po-generate.component';
import { BudgetCategoryMasterComponent } from './components/master-fields/budget-category-master/budget-category-master.component';
import { BudgetSubCategoryMasterComponent } from './components/master-fields/budget-sub-category-master/budget-sub-category-master.component';
import { VendorMasterComponent } from './components/master-fields/vendor-master/vendor-master.component';
import { ExcelSheetComponent } from './components/excel-sheet/excel-sheet.component';
import { ProfileComponent } from './profile/profile.component';

const isIframe = window !== window.parent && !window.opener;

const routes: Routes = [
  
  { path: '', redirectTo: AppConstant.LANDINGPAGE, pathMatch:'full'},
  { path: AppConstant.LANDINGPAGE,component: LandingPageComponent},
  { path: AppConstant.HEADER,component: HeaderComponent},
  { path: AppConstant.NAVBAR, component: NavbarComponent },
  { path: AppConstant.HOME,component: HomeComponent},
  { path: 'profile',component: ProfileComponent,canActivate:[MsalGuard]},
  // { path: '',component: HomeComponent},
  { path: AppConstant.BUDGETCREATION, component: BudgetCreationComponent },
  { path: AppConstant.GENERATEINVOICE, component: InvoiceGenerateComponent },
  { path: AppConstant.GENERATEPO, component: PoGenerateComponent },
  { path: AppConstant.BUDGETCATEGORYMASTER, component: BudgetCategoryMasterComponent },
  { path: AppConstant.EDITCATEGORY, component: BudgetCategoryMasterComponent },
  { path: AppConstant.BUDGETSUBCATEGORYMASTER, component: BudgetSubCategoryMasterComponent },
  { path: AppConstant.VENDORMASTER, component: VendorMasterComponent },
  { path: AppConstant.EXCELSHEET, component: ExcelSheetComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
   initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
