  // Função de teste para addToTransactionsArray
  function testAddToTransactionsArray() {
    const initialTransactions = [];
    const initialCategories = {};
  
    addToTransactionsArray('Compras', 'Supermercado', 50);
    addToTransactionsArray('Salário', 'Recebimento mensal', 1000);

    if (transactions.length === 2 &&
      transactions[0].name === 'Compras' &&
      transactions[1].name === 'Salário'
    ) {
      console.log('Teste passou: addToTransactionsArray adicionou transações corretamente.');
    } else {
      console.error('Teste falhou: addToTransactionsArray não adicionou transações corretamente.');
    }
  }
  
  // Função de teste para removeTransaction
  function testRemoveTransaction() {
    const initialTransactions = [
      { id: 1, name: 'Compras', description: 'Supermercado', amount: -50 },
      { id: 2, name: 'Salário', description: 'Recebimento mensal', amount: 1000 },
    ];
  
    transactions = initialTransactions;
  
    removeTransaction(1);
  
    if (transactions.length === 1 && transactions[0].name === 'Salário') {
      console.log('Teste passou: removeTransaction removeu a transação corretamente.');
    } else {
      console.error('Teste falhou: removeTransaction não removeu a transação corretamente.');
    }
  }
  
  // Função de teste para transformarEmNumero
  function testTransformarEmNumero() {
    const inputString = '1.000,50';
    const expectedResult = 1000.5;
  
    const result = transformarEmNumero(inputString);
  
    if (result === expectedResult) {
      console.log('Teste passou: transformarEmNumero converteu corretamente.');
    } else {
      console.error('Teste falhou: transformarEmNumero não converteu corretamente.');
    }
  }

  // Função que dispara todos os testes
  function initTests() {
    try {
      console.info('Executando testes utilizando funções assertivas.');
      console.time('tempo');
      testAddToTransactionsArray();
      testRemoveTransaction();
      testTransformarEmNumero();
      console.timeEnd('tempo');
      console.info('Finalizando testes... ');
    } catch (error) {
      console.error('Erro nos testes:', error);
    }
  }  