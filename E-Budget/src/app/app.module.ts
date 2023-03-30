import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BudgetCreationComponent } from './components/budget-creation/budget-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PoGenerateComponent } from './components/po-generate/po-generate.component';
import { InvoiceGenerateComponent } from './components/invoice-generate/invoice-generate.component';
import { BudgetCategoryMasterComponent } from './components/master-fields/budget-category-master/budget-category-master.component';
import { BudgetSubCategoryMasterComponent } from './components/master-fields/budget-sub-category-master/budget-sub-category-master.component';
import { VendorMasterComponent } from './components/master-fields/vendor-master/vendor-master.component';
import { HttpClientModule } from '@angular/common/http';
import { BudgetCodeMasterComponent } from './components/master-fields/budget-code-master/budget-code-master.component';
import { BudgetCodeCategoryMappingComponent } from './components/master-fields/budget-code-category-mapping/budget-code-category-mapping.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    BudgetCreationComponent,
    NavbarComponent,
    HomeComponent,
    PoGenerateComponent,
    InvoiceGenerateComponent,
    BudgetCategoryMasterComponent,
    BudgetSubCategoryMasterComponent,
    VendorMasterComponent,
    BudgetCodeMasterComponent,
    BudgetCodeCategoryMappingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
