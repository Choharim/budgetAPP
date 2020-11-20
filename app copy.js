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

function removeAllList(){
  const str_Expense = localStorage.getItem(EXPENSE_LS);
  const pars_Expense = JSON.parse(str_Expense);
  const leng = pars_Expense.length +1;

  for(i=1; i <= leng; i++){
    const a = document.getElementsByClassName(i);
    while(a.length > 0){
      a[0].parentNode.removeChild(a[0]);
    }
  }
}

function modi(event){
  const targetModi = event.target;
  const modiClassName = targetModi.parentNode.className; //img가 button안에 있으니까
  const ele = document.getElementsByClassName(modiClassName);

  while(ele.length > 0){
    ele[0].parentNode.removeChild(ele[0]);
 }

 const cloneArray = JSON.parse(JSON.stringify(expenseStorage));

 const update = expenseStorage.filter(function(element){
  return element.class != modiClassName;
}); 
  expenseStorage = update;
  saveList();
  removeAllList();
  const select = cloneArray.find(function(element){
    return element.class == modiClassName;
  });
  expenseInput.value = select.list;
  expenseAmountInput.value = select.cost;
}

function del(event){
  const targetBtn = event.target;
  const className = targetBtn.parentNode.className; //img가 button안에 있으니까
  const elements = document.getElementsByClassName(className);

    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
 
  const updateArray = expenseStorage.filter(function(element){
    return element.class != className;
  });
  expenseStorage = updateArray
  saveList();
  showExpense ();

  removeAllList();
  refreshShowList();
  if(localStorage.getItem(BUDGET_LS) !==null ){
    showBalance();
  }
}

function showExpense () {
  const string_expenseST = localStorage.getItem(EXPENSE_LS);
  const parsed_expenseST = JSON.parse(string_expenseST);

  const totalExpense = parsed_expenseST.reduce(function (result,exp){
    exp.cost *= 1;
    return result + exp.cost;
  },0);
  expenseAmount.innerText = `-${totalExpense}원`;
  return totalExpense;
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
  modiBtn.addEventListener("click",modi);

  if(localStorage.getItem(BUDGET_LS) !==null ){
    showBalance();
  }
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
  const budgetST = localStorage.getItem(BUDGET_LS);

  budgetAmount.innerText = `${budgetST}원`;
  return budgetST;
}

function savebudget(budget) {
  localStorage.setItem(BUDGET_LS,budget);
}

function submitBudget (){
  const userBudget = budgetInput.value;
  
  if(userBudget !== ""){
    warning.classList.remove ("showing");
   
    savebudget(userBudget);
    showBudget();

    if(localStorage.getItem(EXPENSE_LS) !==null ){
      showBalance();
    }
  }else{
    warning.classList.add ("showing");
  }

  budgetInput.value = "";
}

function showBalance(){
  const budget = showBudget();
  const expense = showExpense();

  const balance = budget - expense;
  valanceAmount.innerText = `${balance}원`;
}

function refreshShowList () {
  const strLoadedExpense = localStorage.getItem(EXPENSE_LS);
  const parsLoadedExpense = JSON.parse(strLoadedExpense);

  parsLoadedExpense.forEach(function(exp){
    showList(exp.list,exp.cost);
  });
}

function init(){
  budgetBtn.addEventListener("click",submitBudget);
  expenseBtn.addEventListener("click",submitExpense);
  if( localStorage.getItem(EXPENSE_LS) !== null ){
    refreshShowList();
  }
  if( localStorage.getItem(BUDGET_LS) !== null){
    showBudget();
  } 
  if( localStorage.getItem(EXPENSE_LS) !== null && localStorage.getItem(BUDGET_LS) !== null){
    showBalance();
  } 
}
init();
//del이나 modi 버튼 눌러서 삭제하거나 수정할 때 class다시 순차적으로 바뀌는거 안되어있음