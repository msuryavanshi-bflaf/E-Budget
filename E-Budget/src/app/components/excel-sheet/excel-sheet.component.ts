import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategoryData } from 'src/app/Model/sub-category/sub-category.module';
import * as XLSX from 'xlsx';
import { BudgetCategoryService } from '../services/budget-category.service';
import { SubCategoryService } from '../services/sub-category.service';

@Component({
  selector: 'app-excel-sheet',
  templateUrl: './excel-sheet.component.html',
  styleUrls: ['./excel-sheet.component.scss']
})
export class ExcelSheetComponent {
  @ViewChild('TABLE')
  table!: ElementRef;
  tableHead = ['id', 'budgetCategoryName', 'originalCapital', 'originalRevenue', 'poToBeIssuedCaptial', 'poToBeIssuedRevenue', 'poIssuedCaptial', 'poIssuedRevenue', 'invoicesInHandCapital', 'invoicesInHandRevenue', 'invoicesPaidCapital', 'invoicesPaidRevenue', 'balanceCapital', 'balanceRevenue', 'team', 'remark'];
  tableHead2 = ['total', 'amount1', 'amount2', 'amount3', 'amount4', 'amount5', 'amount6', 'amount7', 'amount8', 'amount9', 'amount'];
  tableHead3 = ['total1', 'amount11', 'amount21', 'amount31', 'amount41', 'amount51', 'amount61', 'amount71', 'amount81', 'amount91', 'amount10'];
  budgetCategoryData: SubCategoryData[] = [];

  constructor(private router: Router, private http: HttpClient, private budgetSubCategoryService: SubCategoryService, private budgetCategoryService: BudgetCategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getActiveCategory();
    this.downloadBudget();
  }

  getActiveCategory() {
    this.budgetSubCategoryService.getActiveBudgetSubCategory().subscribe((data: any) => {
      this.budgetCategoryData = data;
    });
  }

  downloadBudget() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Budget');
    XLSX.writeFile(wb, 'Budget.xlsx');

  }

}