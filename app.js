const budgetInput = document.querySelector ("#budget-input"),
budgetBtn = document.querySelector (".budget-button"),
expenseInput = document.querySelector("#expense-input"),
expenseAmountInput = document.querySelector("#expenseAmount-input"),
expenseBtn = document.querySelector (".expense-button"),
budgetAmount = document.querySelector(".list-budgetAmount"),
expenseAmount = document.querySelector (".list-expenseAmount"),
valanceAmount = document.querySelector(".list-balanceAmount"),
expenseThing = document.querySelector(".list-text"),
expenseValue = document.querySelector(".list-amount"),
warning = document.querySelector (".warning");

function showExpense(userExpenseAmount) {
  expenseAmount.innerText = `-${userExpenseAmount}원`;
}

function submitExpense(){
  const userExpense = expenseInput.value;
  const userExpenseAmount = expenseAmountInput.value;

  if(userExpense !== "" && userExpenseAmount !== "" ){
    showExpense(userExpenseAmount);
  }
}

function showBudget(userBudget) {
  budgetAmount.innerText = `${userBudget}원`;
}

function digit_check(evt){
  var code = evt.which?evt.which:event.keyCode;
  if(code < 48 || code > 57){
      return false;
  }
}

function submitBudget (){
  const userBudget = budgetInput.value;
  showBudget(userBudget);

  if(userBudget == ""){
    warning.classList.add ("showing");
  }
  else{
    warning.classList.remove ("showing");
  }
}

function init(){
  budgetBtn.addEventListener("click",submitBudget);
  expenseBtn.addEventListener("click",submitExpense);
}
init();