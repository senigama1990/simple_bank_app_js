'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



function displayTransactions(transactions) {
  containerTransactions.innerHTML = ''
  transactions.forEach((trans, index) => {
    let transtype = trans > 0 ? "deposit" : "withdrawal"
    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transtype}">
        ${index + 1} ${transtype}
      </div>
      <div class="transactions__value">${Math.abs(trans)}</div>
    </div>
    `
    containerTransactions.insertAdjacentHTML("afterbegin", transactionRow)
  });
}



function createNickNames(accs) {
  accs.forEach((acc) => {
    acc.nickName = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('')
  })
}
createNickNames(accounts)



function displayBalance(account) {
  const balance = account.transactions.reduce((acc, item) => acc + item, 0)
  account.balance = balance
  labelBalance.textContent = `${balance}$`
}





function displayTotal(account) {
  const transactionsTotal = account.transactions.filter(trans => trans > 0).reduce((acc, trans) => acc + trans, 0)
  labelSumIn.textContent = `${transactionsTotal}$`

  const withdrawalTotal = account.transactions.filter(trans => trans < 0).reduce((acc, trans) => acc + trans, 0)
  labelSumOut.textContent = `${withdrawalTotal}$`

  const intersetTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter((interes) => {
      return interes >= 5
    }).reduce((acc, interest) => acc + interest, 0)
  labelSumInterest.textContent = `${intersetTotal}$`
}

function updateUi(account) {
  displayTransactions(account.transactions)

  displayBalance(account)

  displayTotal(account)
}


let currentAccount


btnLogin.addEventListener("click", function (e) {
  e.preventDefault()
  currentAccount = accounts.find(account => account.nickName === inputLoginUsername.value)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 1
    labelWelcome.textContent = `Рады, что вы снова с нами, ${currentAccount.userName.split(' ')[0]}`

    inputLoginUsername.value = ''
    inputLoginPin.value = ''
    inputLoginPin.blur()
    updateUi(currentAccount)

  }
})

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault()
  const transferAmount = Number(inputTransferAmount.value)
  const recipientNickname = inputTransferTo.value
  const recipientAccount = accounts.find(account => account.nickName === recipientNickname)

  inputTransferAmount.value = ''
  inputTransferTo.value = ''

  if (recipientAccount && transferAmount > 0 && currentAccount.balance >= transferAmount && currentAccount.nickName !== recipientAccount.nickName) {
    currentAccount.transactions.push(-transferAmount)
    recipientAccount.transactions.push(transferAmount)

    updateUi(currentAccount)
  }
})



btnClose.addEventListener("click", function (e) {
  e.preventDefault()
  if (inputCloseNickname.value === currentAccount.nickName && Number(inputClosePin.value) === currentAccount.pin) {
    const currentAccountIndex = accounts.findIndex(account => account.nickName === currentAccount.nickName)
    accounts.splice(currentAccountIndex, 1)
    containerApp.style.opacity = 0
    labelWelcome.textContent = 'Войдите в свой аккаунт'
  }
  inputCloseNickname.value = ''
  inputClosePin.value = ''
})


btnLoan.addEventListener("click", function (e) {
  e.preventDefault()
  const loanAmount = Number(inputLoanAmount.value)
  if (loanAmount > 0 && currentAccount.transactions.some(trans => trans >= loanAmount / 10)) {
    currentAccount.transactions.push(loanAmount)
    updateUi(currentAccount)
  }
  inputLoanAmount.value = ''
})