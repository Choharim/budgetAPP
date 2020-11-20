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
  expenseStorage = updateArray
  saveList();
  showExpense ();
  /*보이는 li와 del,modi 버튼 모두 삭제한 후 refreshShowListFn실행하면 될거같은데? 
  남아있는 li와 del,modi 버튼의 class이름 범위는 1~EXPLocalstorage배열길이+1(1개삭제했으니)까지 잡아서 이 값을 갖는 class를 갖는
  li와 del,modi 버튼 tag 모두삭제하면 되지 않을까... 

  const str = localStorage.getItem(EXPENSE_LS);
  const pars = JSON.pars(str);
  const length = pars.length + 1;
  for(i=1; i <=length; i++){
  const i = document.getElementByClassName(i);
  while(i.length > 0){
    i[0].parentNode.removeChild(i[0]);
  }
  }

  refreshShowListFn();
  */

  /*LOCALST에 ex먼저 저장 후 마지막 element의 list와 cost,class가져와서 보여주고 class지정하고.
  del,modi 할때는 localst ex배열을 forEach해서 class를 1~배열길이만큼 범위로 다시지정해서 set시킴*/ 
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
  const li = document.createElement ("li");
  const span = document.createElement ("span");
  const delBtn= document.createElement ("button");
  const modiBtn = document.createElement ("button");

  expenseThing.appendChild(li);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(modiBtn);

  delBtn.innerHTML = "<img src=\"trashbin.png\">";
  modiBtn.innerHTML = "<img src=\"modify.png\">";

  li.classList.add(expenseStorage.length + 1);

  span.innerText = `${userExpense}        -${userExpenseAmount}원`;

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
  const string_budgetST = localStorage.getItem(BUDGET_LS);
  console.log(string_budgetST);
  budgetAmount.innerText = `${string_budgetST}원`;
  return string_budgetST;
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
  }
  else{
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