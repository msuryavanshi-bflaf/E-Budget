export interface BudgetCategoryData {
  id:String;
  budgetCategoryName: String;
  remark: String;
  status:boolean;
}

export interface BudgetCategoryDetails{
  id:String;
  budgetCategoryName: String;
  remark:String;
  createdBy:String;
  createdDate:Date;
  status:boolean;
  activation_date:String;
  
}