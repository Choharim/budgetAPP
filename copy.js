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

function modi(event){
  const targetModi = event.target;
  const modiClassName = targetModi.parentNode.className;
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

  const select = cloneArray.find(function(element){
    return element.class == modiClassName;
  });
  expenseInput.value = select.list;
  expenseAmountInput.value = select.cost;
}

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
  /* updateArray.forEach(function(element){
    element.class = updateArray.length + 1;
  })*/
  expenseStorage = updateArray
  saveList();
  showExpense ();

  if(localStorage.getItem(BUDGET_LS) !==null ){
    showBalance();
  }
}

function paintList(){
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

  const strExpense = localStorage.getItem(EXPENSE_LS);
  const parsExpense = JSON.parse(strExpense);

  li_thing.classList.add(parsExpense.length);
  li_value.classList.add(parsExpense.length);
  delBtn.classList.add(parsExpense.length);
  modiBtn.classList.add(parsExpense.length);

  const index = parsExpense.length-1;
  li_thing.innerText = parsExpense[index].list;
  li_value.innerText = `-${parsExpense[index].cost}원`;
  
  delBtn.addEventListener("click",del);
  modiBtn.addEventListener("click",modi);
}

function showExpense () {
  const string_expenseST = localStorage.getItem(EXPENSE_LS);
  const parsed_expenseST = JSON.parse(string_expenseST);

  let totalExpense = parsed_expenseST.reduce(function (result,exp){
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
  const expenseObj = {
    list: userExpense,
    cost: userExpenseAmount,
    class: expenseStorage.length + 1
  };
  expenseStorage.push(expenseObj);
  saveList();
  showExpense();
  paintList();

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
  const string_budgetST = localStorage.getItem(BUDGET_LS);
  const parsed_budgetST = JSON.parse(string_budgetST);

  budgetAmount.innerText = `${parsed_budgetST[0].budget}원`;
  return parsed_budgetST[0].budget *= 1;
}

function savebudget() {
  localStorage.setItem(BUDGET_LS,JSON.stringify(budgetStorage));
}

function submitBudget (){
  const userBudget = budgetInput.value;
  
  if(userBudget !== ""){
    if(localStorage.getItem(BUDGET_LS) !== null){
      budgetStorage = [];
    }
    
    warning.classList.remove ("showing");
    const budgetObj = {
      budget : userBudget
    };
    budgetStorage.push(budgetObj);
    savebudget();
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
  let budget = showBudget();
  let expense = showExpense();

  const balance = budget - expense;
  valanceAmount.innerText = `${balance}원`;
}

function init(){
  budgetBtn.addEventListener("click",submitBudget);
  expenseBtn.addEventListener("click",submitExpense);
  if( localStorage.getItem(EXPENSE_LS) !== null ){
    paintList();
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