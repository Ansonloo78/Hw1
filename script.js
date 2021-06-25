// (c) Anuflora Systems 
const balance = document.getElementById('balance');
const money_plus = document.getElementById('deposit');
const money_minus = document.getElementById('loan');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');

const reco = document.getElementById('reco');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');


const TransactionDataAll = [
   { id: 1, customername: 'Flora', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 2, customername: 'Flora', bank: 'OCBC', deposit: 4000, loan: 2000 },
   { id: 3, customername: 'Mikhil', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 4, customername: 'Sashil', bank: 'UOB', deposit: 6000, loan: 1000 },
   { id: 5, customername: 'Jack', bank: 'UOB', deposit: 6000, loan: 8000 },
   { id: 6, customername: 'Jill', bank: 'UOB', deposit: 7000, loan: 4000 },

  ];

 var TransactionData = null;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const deposit_item = document.createElement('li');

  deposit_item.classList.add('plus');
  deposit_item.innerHTML = `
  ${transaction.customername}-${transaction.bank}  <span> $ ${Math.abs(
    transaction.deposit  -transaction.loan
  )}</span> 
  `;

  list.appendChild(deposit_item);



  
  
}

// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit);
  const loans = TransactionData.map(transaction => transaction.loan);
  const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const bal = total_deposit - total_loan;
  balance.innerText = `$${bal}`;
  money_plus.innerText = `$${total_deposit}`;
  money_minus.innerText = `$${total_loan}`;
  reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";
}

window.onload = function() {
    const deposits = TransactionData.map(transaction => transaction.deposit);
    const loans = TransactionData.map(transaction => transaction.loan);
    const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const bal = total_deposit - total_loan;
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Pie Chart"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                {y: total_deposit , label: "deposit"},
                {y: total_loan, label: "loan"},

            ]
        }]
    });
    chart.render();
    }
function init() {
  
  list.innerHTML = '';
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = [...TransactionDataAll];
  TransactionData.forEach(addTransactionDOM);
  updateValues();
  
}




function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = TransactionDataAll.filter(tran => tran.customername.toUpperCase() == custname.value.toUpperCase());  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 

}

/* if ((custname = "Jack") && (pwd = "123")) {

  filterTransaction();
} */

init();
//form.addEventListener('submit', filterTransaction);
b1.addEventListener('click',filterTransaction);
b2.addEventListener('click',init);  //no need to call init. when no event handler it will reload/referesh the page


