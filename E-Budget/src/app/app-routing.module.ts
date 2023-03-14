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


const routes: Routes = [
  { path: '', redirectTo: AppConstant.LANDINGPAGE, pathMatch: 'full' },
  { path: AppConstant.LANDINGPAGE, component: LandingPageComponent },
  { path: AppConstant.NAVBAR, component: NavbarComponent },
  { path: AppConstant.BUDGETCREATION, component: BudgetCreationComponent },
  { path: AppConstant.HOME, component: HomeComponent },
  { path: AppConstant.GENERATEINVOICE, component: InvoiceGenerateComponent },
  { path: AppConstant.GENERATEPO, component: PoGenerateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
