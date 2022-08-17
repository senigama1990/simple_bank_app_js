'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2022-08-12T11:42:26.371Z',
    '2022-08-15T07:43:59.331Z',
    '2022-08-16T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'UZS',
  locale: 'uz-UZ',
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



function formatTransactionDate(date, locale) {

  const getDateBetween2Dates = (date1, date2) => {
    return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)))
  }
  const daysPassed = getDateBetween2Dates(new Date(), date)

  if (daysPassed === 0) return "Сегодня"
  if (daysPassed === 1) return "Вчера"
  if (daysPassed <= 7) return `${daysPassed} дней назад`

  else {
    // const day = `${date.getDate()}`.padStart(2, "0")
    // const month = `${date.getMonth() + 1}`.padStart(2, "0")
    // const year = date.getFullYear()
    // return `${day}/${month}/${year}`
    return new Intl.DateTimeFormat(locale).format(date)
  }
}

function formatCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(value)
}

function displayTransactions(account, sort = false) {
  containerTransactions.innerHTML = ''
  const transacs = sort ? account.transactions.slice().sort((x, y) => x - y) : account.transactions
  transacs.forEach((trans, index) => {
    let transtype = trans > 0 ? "deposit" : "withdrawal"

    const date = new Date(account.transactionsDates[index])

    const transDate = formatTransactionDate(date, account.locale)

    const formattedTrans = formatCurrency(trans, account.locale, account.currency)

    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transtype}">
        ${index + 1} ${transtype}
      </div>
      <div class="transactions__date">${transDate}</div>
      <div class="transactions__value">${formattedTrans}</div>
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
  labelBalance.textContent = formatCurrency(balance, account.locale, account.currency)
}





function displayTotal(account) {
  const transactionsTotal = account.transactions.filter(trans => trans > 0).reduce((acc, trans) => acc + trans, 0)
  labelSumIn.textContent = formatCurrency(transactionsTotal, account.locale, account.currency)

  const withdrawalTotal = account.transactions.filter(trans => trans < 0).reduce((acc, trans) => acc + trans, 0)
  labelSumOut.textContent = formatCurrency(withdrawalTotal, account.locale, account.currency)

  const intersetTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter((interes) => {
      return interes >= 5
    }).reduce((acc, interest) => acc + interest, 0)
  labelSumInterest.textContent = formatCurrency(intersetTotal, account.locale, account.currency)
}

function updateUi(account) {
  displayTransactions(account)

  displayBalance(account)

  displayTotal(account)
}


let currentAccount


// currentAccount = account2
// updateUi(currentAccount)
// containerApp.style.opacity = 1
// labelDate.textContent = `Ha ${day}/${month}/${year}`
// const now = new Date()
// const options = {
//   hour: '2-digit',
//   minute: '2-digit',
//   day: '2-digit',
//   month: '2-digit',
//   year: 'numeric',
//   weekday: 'long',
// }
// const locale = navigator.language
// labelDate.textContent = `Ha ${new Intl.DateTimeFormat(locale, options).format(now)}`


function startLogOutTimer() {
  let time = 300
  setInterval(function () {
    const minutes = time / 60
    const seconds = time % 60
    labelTimer.textContent = time
    time--

  }, 1000)

}


btnLogin.addEventListener("click", function (e) {
  e.preventDefault()
  currentAccount = accounts.find(account => account.nickName === inputLoginUsername.value)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 1
    labelWelcome.textContent = `Рады, что вы снова с нами, ${currentAccount.userName.split(' ')[0]}`

    // const now = new Date()
    // const day = `${now.getDate()}`.padStart(2, "0")
    // const month = `${now.getMonth() + 1}`.padStart(2, "0")
    // const year = now.getFullYear()

    const now = new Date()
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      weekday: 'long',
    }
    // const locale = navigator.language
    labelDate.textContent = `Ha ${new Intl.DateTimeFormat(currentAccount.locale, options).format(now)}`


    inputLoginUsername.value = ''
    inputLoginPin.value = ''
    inputLoginPin.blur()

    startLogOutTimer()
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

    currentAccount.transactionsDates.push(new Date().toISOString())
    recipientAccount.transactionsDates.push(new Date().toISOString())

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
  const loanAmount = Math.floor(inputLoanAmount.value)
  if (loanAmount > 0 && currentAccount.transactions.some(trans => trans >= loanAmount / 10)) {
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount)
      currentAccount.transactionsDates.push(new Date().toISOString())

      updateUi(currentAccount)
    }, 3000)
  }
  inputLoanAmount.value = ''
})


let transactionsSorted = false
btnSort.addEventListener("click", function (e) {
  e.preventDefault()
  displayTransactions(currentAccount, !transactionsSorted)
  transactionsSorted = !transactionsSorted
})

const logoImg = document.querySelector(".logo")

logoImg.addEventListener("click", function () {
  // e.preventDefault()
  [...document.querySelectorAll(".transactions__row")].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = "grey"
    }
  })
})


