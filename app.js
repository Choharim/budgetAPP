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

let totalExpense = 0;
let expenseStorage = [];

function saveList() {
  localStorage.setItem("expenseList",JSON.stringify(expenseStorage));
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

  li_thing.id = expenseStorage.length + 1;
  li_value.id = expenseStorage.length + 1;

  const obj = {
    list: userExpense,
    cost: userExpenseAmount,
    id: expenseStorage.length + 1
  };
  expenseStorage.push(obj);
  li_thing.innerText = userExpense;
  li_value.innerText = userExpenseAmount;
  saveList();
}

function showExpense(totalExpense) {
  expenseAmount.innerText = `-${totalExpense}원`;
}

function submitExpense(){
  let userExpense = expenseInput.value;
  let userExpenseAmount = expenseAmountInput.value;

  if(userExpense !== "" && userExpenseAmount !== "" ){
    userExpenseAmount *= 1;
    totalExpense = totalExpense + userExpenseAmount;
    showExpense(totalExpense);
    showList(userExpense,userExpenseAmount);
    let budget = submitBudget();
    showBalance(budget,totalExpense);
    warning2.classList.remove ("showing");
  }
  else{
    warning2.classList.add ("showing");
  }
  
  expenseInput.value = "";
  expenseAmountInput.value = "";
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

  let userBudget = budgetInput.value;
  
  if(userBudget === ""){
    warning.classList.add ("showing");
  }
  else{
    userBudget *= 1;
    showBudget(userBudget);
    warning.classList.remove ("showing");
    return userBudget;
  }
  budgetInput.value = "";
}

function showBalance(budget,totalExpense){
  let balance = budget - totalExpense;
  valanceAmount.innerText = `${balance}원`;
}


function init(){
  budgetBtn.addEventListener("click",submitBudget);
  expenseBtn.addEventListener("click",submitExpense);
}
init();