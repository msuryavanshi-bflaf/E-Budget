export interface BudgetCategoryData {

  budgetCategoryName: String;
  budgetCategoryDescription: String;
}

export interface GetBudgetCategoryNameByBudgetCategoryResponse{

  budgetCategoryName: String;
  budgetCategoryDescription: String;
}

export interface BudgetCreation{
  amount: String;
  remark: String;
  budgetCategoryDescription:String;

  // budgetCode:String;

}