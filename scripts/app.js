const transactionUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionCategory = document.querySelector('#categoria');
const inputTransactionAmount = document.querySelector('#amount');
const inputTransactionDescription = document.querySelector('#description');

const localStoregeTransaction = JSON.parse(localStorage.getItem('transactions')) || [];
const localStoregeCategories = JSON.parse(localStorage.getItem('categories')) || {};

let transactions = localStoregeTransaction;
let categories = localStoregeCategories;

const removeTransaction = (ID) => {
  const removedTransaction = transactions.find((transaction) => transaction.id === ID);

  if (removedTransaction) {
    const { name, amount } = removedTransaction;

    transactions = transactions.filter((transaction) => transaction.id !== ID);

    if (categories[name]) {
      categories[name].transactions = categories[name].transactions.filter(
        (transaction) => transaction.id !== ID
      );
      categories[name].balance -= Math.abs(amount);
    }

    Toastify({
      text: "Transação excluída com sucesso!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "var(--success-color)",
      },
      onClick: function(){} // Callback after click
    }).showToast();

    updateLocalStorage();
    init();
  }
};

const addTransactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? '-' : '+';
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement('li');

  li.classList.add(CSSClass);
  li.innerHTML = `${transaction.name} <br> ${transaction.description}
    <span>${operator} ${amountWithoutOperator.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })} </span>
    <button class="delete-btn" data-id="${transaction.id}">x</button> `;

  transactionUl.appendChild(li);
};

const updateBalanceValues = () => {
  const total = transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0).toLocaleString(
    'pt-BR',
    { style: 'currency', currency: 'BRL' }
  );
  const income = transactions
    .filter((value) => value.amount > 0)
    .reduce((accumulator, value) => accumulator + value.amount, 0)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const expense = transactions
    .filter((value) => value.amount < 0)
    .reduce((accumulator, value) => accumulator + value.amount, 0)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  balanceDisplay.textContent = `${total}`;
  incomeDisplay.textContent = `${income}`;
  expenseDisplay.textContent = `${expense}`;
};

const init = () => {
  transactionUl.innerHTML = '';
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};

init();

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('categories', JSON.stringify(categories));
};

const generateID = () => Math.round(Math.random() * 1000);

const addToTransactionsArray = (transactionCategory, transactionDescription, transactionAmount) => {
  const transactionID = generateID();
  const transaction = {
    id: transactionID,
    name: transactionCategory,
    description: transactionDescription,
    amount: Number(transactionAmount),
  };

  transactions.push(transaction);

  if (!categories[transactionCategory]) {
    categories[transactionCategory] = {
      transactions: [],
      balance: 0,
    };
  }

  categories[transactionCategory].transactions.push(transaction);
  categories[transactionCategory].balance += Number(transactionAmount);

  updateLocalStorage();
  Toastify({
    text: "Transação inserida com sucesso!",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "var(--success-color)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
};

const clearInputs = () => {
  inputTransactionCategory.value = '';
  inputTransactionDescription.value = '';
  inputTransactionAmount.value = '';
};

const transformarEmNumero = (valorString) => {
    const valorNumerico = parseFloat(valorString.replace(/\./g, '').replace(',', '.'));
  
    if (isNaN(valorNumerico)) {
      return 0;
    }
  
    return valorNumerico;
};
  
if (inputTransactionAmount) {
  inputTransactionAmount.addEventListener('input', function (event) {
    const valorNaoFormatado = event.target.value;
    const valorNumerico = valorNaoFormatado.replace(/\D/g, '');
    if (valorNumerico === '') {
      event.target.value = '';
      return;
    }

    const valorFormatado = (parseInt(valorNumerico) / 100)
      .toFixed(2)
      .replace('.', ',');

    const parts = valorFormatado.split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    event.target.value = parts.join(',');
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const transactionCategory = inputTransactionCategory.value.trim();
    const transactionDescription = inputTransactionDescription.value.trim();
    const categoriaNomes = {
      '': '',
      '1': 'Outros',
      '2': 'Alimentação',
      '3': 'Casa',
      '4': 'Despesas pessoais',
      '5': 'Educação',
      '6': 'Faturas',
      '7': 'Investimentos',
      '8': 'Lazer',
      '9': 'Saúde',
      '10': 'Tarifas/impostos',
      '11': 'Transporte',
      '12': 'Pix',
      '13': 'Salário',
    };

    const nomeCorrespondente = categoriaNomes[transactionCategory];

    let transactionAmount = transformarEmNumero(inputTransactionAmount.value.trim());
    const isSomeInputEmpty = nomeCorrespondente == '' ||transactionAmount == '';

    if (isSomeInputEmpty) {
      // alert('Por favor, preencha tanto a categoria quanto o valor da transação');
      Toastify({
        text: "Por favor, preencha tanto a categoria quanto o valor da transação",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "var(--error-color)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      return;
    }

    if (event.submitter.classList.contains('btn-saida')) {
      transactionAmount = `-${transactionAmount}`;
    }

    addToTransactionsArray(nomeCorrespondente, transactionDescription, transactionAmount);
    init();
    updateLocalStorage();
    clearInputs();
  });
}

// Delegação de eventos para botões de exclusão
transactionUl.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const transactionId = parseInt(event.target.getAttribute('data-id'));
    removeTransaction(transactionId);
  }
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(error => {
      console.log('Erro ao registrar Service Worker:', error);
    });
}
