const ExpName=document.querySelector('#ExName');
const ExpAmount=document.querySelector('#ExAmount');
const ExpDate=document.querySelector('#ExDate');
const subButton=document.querySelector('#submitButton');
const totalAmountNo=document.querySelector('#totalAmountNumber')

let expenseArray=[];
let totalAmount=0;
subButton.addEventListener('click',(e)=>{
e.preventDefault();

if (ExpName.value.length===0||ExpAmount.value.length===0||ExpDate.value.length===0){
    alert('Please fill all the fields');
}
else if (ExpAmount.value<=0){
    alert('Expense amount must be greater than 0');
}

else{

const ExpenseObject={
    name:ExName.value,
    amount:ExAmount.value,
    date:ExpDate.value
};
for (let i=0;i<expenseArray.length;i++){
 if (expenseArray[i].name===ExpenseObject.name){
    alert('This item already exists');
    return;
 }
}


expenseArray.push(ExpenseObject);

ExpName.value='';
ExpAmount.value='';
ExpDate.value='';


const newRow=document.createElement('tr');
newRow.classList.add('row-enter');
const nameCell=document.createElement('td');
const amountCell=document.createElement('td');
const dateCell=document.createElement('td');
const modifyCell=document.createElement('td');

nameCell.classList.add('has-text-centered');
amountCell.classList.add('has-text-centered');
dateCell.classList.add('has-text-centered');
modifyCell.classList.add('has-text-centered');

const editButton=document.createElement('button');
editButton.classList.add("button","is-warning","is-small");
const deleteButton=document.createElement('button');
deleteButton.classList.add("button","is-danger","is-small");

editButton.textContent='Edit';
const iconElement = document.createElement('i');
iconElement.classList.add('fas', 'fa-trash-alt');
deleteButton.appendChild(iconElement);

deleteButton.addEventListener('click',(e)=>{
e.preventDefault();
const index=expenseArray.indexOf(ExpenseObject);
expenseArray.splice(index,1);
newRow.remove();

totalAmount-=parseFloat(ExpenseObject.amount);
totalAmountNo.textContent=parseFloat(totalAmount.toFixed(3));    
});

editButton.addEventListener('click',(e)=>{
e.preventDefault();
if (editButton.textContent==='Edit'){
const newName=document.createElement('input');
newName.type='text';
newName.placeholder=ExpenseObject.name;
const newAmount=document.createElement('input');
newAmount.type='text';
newAmount.placeholder=ExpenseObject.amount;
const newDate=document.createElement('input');
newDate.type='date';
newDate.placeholder=ExpenseObject.date;
nameCell.textContent='';
amountCell.textContent='';
dateCell.textContent='';
nameCell.appendChild(newName);
amountCell.appendChild(newAmount);
dateCell.appendChild(newDate);
editButton.textContent='Save';
}
else{
const newName=nameCell.querySelector('input').value;
const newAmount=parseFloat(amountCell.querySelector('input').value);
const newDate=dateCell.querySelector('input').value;
if (!newName || !newAmount || !newDate){
    alert('Please fill all the fields');
}
else{
    if (newName!==ExpenseObject.name){
    for (let i=0;i<expenseArray.length;i++){
        if (expenseArray[i].name===newName){
           alert('This item already exists');
           return;
        }
       }
    }
const index= expenseArray.indexOf(ExpenseObject);
ExpenseObject.name=newName;
nameCell.textContent=newName;
totalAmount-=parseFloat(ExpenseObject.amount);
ExpenseObject.amount=newAmount;
totalAmount+=newAmount;
amountCell.textContent=newAmount;
totalAmountNo.textContent=parseFloat(totalAmount.toFixed(3));
ExpenseObject.date=newDate;
dateCell.textContent=newDate;
expenseArray[index].name=newName;
expenseArray[index].amount=newAmount;
expenseArray[index].date=newDate;




editButton.textContent='Edit';
}
}

});



nameCell.textContent=ExpenseObject.name;
amountCell.textContent=ExpenseObject.amount;
dateCell.textContent=ExpenseObject.date;
newRow.appendChild(nameCell);
newRow.appendChild(amountCell);
newRow.appendChild(dateCell);
modifyCell.appendChild(editButton);
modifyCell.appendChild(deleteButton);
newRow.appendChild(modifyCell);
expenseTable.appendChild(newRow);

totalAmount+=parseFloat(ExpenseObject.amount);

totalAmountNo.textContent=parseFloat(totalAmount.toFixed(3));


}
});


