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
warning = document.querySelector (".warning"),
warning2 = document.querySelector (".warning2");

const EXPENSE_LS= "expenseList";
const BUDGET_LS = "budget";
let expenseStorage = [];
let budgetStorage = [];

function del(event){
  const targetBtn = event.target;
  const className = targetBtn.parentNode.className;
  const elements = document.getElementsByClassName(className);

    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
 
  const updateArray = expenseStorage.filter(function(element){
    return element.class != className;
  });
  expenseStorage = updateArray;
  saveList();
  showExpense();
}

function showExpense () {
  const string_expenseST = localStorage.getItem(EXPENSE_LS);
  const parsed_expenseST = JSON.parse(string_expenseST);

  let totalExpense = parsed_expenseST.reduce(function (result,exp){
    exp.cost *= 1;
    return result + exp.cost;
  },0);
  expenseAmount.innerText = `-${totalExpense}원`;
  showBalance(totalExpense);
}

function saveList() {
  localStorage.setItem(EXPENSE_LS,JSON.stringify(expenseStorage));
}

function showList(userExpense,userExpenseAmount) {
  const li_thing = document.createElement ("li");
  const li_value = document.createElement ("li");
  const delBtn= document.createElement ("button");
  const modiBtn = document.createElement ("button");

  expenseThing.appendChild(li_thing);
  expenseValue.appendChild(li_value);
  expenseValue.appendChild(delBtn);
  expenseValue.appendChild(modiBtn);

  delBtn.innerHTML = "<img src=\"trashbin.png\">";
  modiBtn.innerHTML = "<img src=\"modify.png\">";

  li_thing.classList.add(expenseStorage.length + 1);
  li_value.classList.add(expenseStorage.length + 1);
  delBtn.classList.add(expenseStorage.length + 1);
  modiBtn.classList.add(expenseStorage.length + 1);

  li_thing.innerText = userExpense;
  li_value.innerText = `-${userExpenseAmount}원`;

  const expenseObj = {
    list: userExpense,
    cost: userExpenseAmount,
    class: expenseStorage.length + 1
  };
  expenseStorage.push(expenseObj);
  saveList();
  showExpense();
  delBtn.addEventListener("click",del);
}

function submitExpense(){
  const userExpense = expenseInput.value;
  const userExpenseAmount = expenseAmountInput.value;

  if(userExpense !== "" && userExpenseAmount !== "" ){
    warning2.classList.remove ("showing");
    showList(userExpense,userExpenseAmount);
  }
  else{
    warning2.classList.add ("showing");
  }
  
  expenseInput.value = "";
  expenseAmountInput.value = "";
}

function digit_check(evt){
  var code = evt.which?evt.which:event.keyCode;
  if(code < 48 || code > 57){
    return false;
  }
}

function showBudget() {
  const string_budgetST = localStorage.getItem(BUDGET_LS);
  const parsed_budgetST = JSON.parse(string_budgetST);

  budgetAmount.innerText = `${parsed_budgetST[0].budget}원`;
}

function savebudget() {
  localStorage.setItem(BUDGET_LS,JSON.stringify(budgetStorage));
}

function submitBudget (){
  const userBudget = budgetInput.value;
  
  if(userBudget !== ""){
    warning.classList.remove ("showing");
    const budgetObj = {
      budget : userBudget
    };
    budgetStorage.push(budgetObj);
    savebudget();
    showBudget();
  }else{
    warning.classList.add ("showing");
  }

  budgetInput.value = "";
}

function showBalance(totalExpense){
  const str_budget = localStorage.getItem(BUDGET_LS);
  const pars_budget = JSON.parse(str_budget);
  let budget = pars_budget[0].budget;
  budget *= 1;
  const balance = budget - totalExpense;

  valanceAmount.innerText = `${balance}원`;
}

function init(){
  budgetBtn.addEventListener("click",submitBudget);
  expenseBtn.addEventListener("click",submitExpense);

  if( localStorage.getItem(EXPENSE_LS) !== null || localStorage.getItem(BUDGET_LS) !== null){
    showBudget();
    showExpense();
  } 
}
init();