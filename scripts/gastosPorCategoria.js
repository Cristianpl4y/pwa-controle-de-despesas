// Função para calcular o total gasto por categoria (somente transações negativas)
const calculateCategoryTotal = category => {
  return transactions
    .filter(transaction => transaction.name === category && transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
};
  
// Função para exibir o resumo por categoria na lista
const displayCategorySummary = () => {
    const categorySummary = document.getElementById('category-summary');
  
    // Verifica se o elemento existe antes de tentar atualizá-lo
    if (categorySummary) {
      categorySummary.innerHTML = '';
  
      for (const category in categories) {
        const total = calculateCategoryTotal(category);
        if(total > 0){
          const listItem = document.createElement('li');
          listItem.innerHTML = `<span>${category}: </span><span>${total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>`;
          categorySummary.appendChild(listItem);
        }
      }
    } else {
      console.error("Elemento category-summary não encontrado.");
    }
};
  
// Função para exibir barras de progresso por categoria com nome e total
const displayCategoryProgress = () => {
  const categoryProgress = document.getElementById('category-progress');
  categoryProgress.innerHTML = '';

  const maxTotal = 1000; // Defina o máximo desejado para ajustar a porcentagem dinamicamente

  // cores para as categorias
  const colorMapping = {
      "Outros": "#3498db", 
      "Alimentação": "#e74c3c",
      "Casa": "#f39c12", 
      "Despesas pessoais": "#9b59b6",
      "Educação": "#2ecc71", 
      "Faturas": "#16a085", 
      "Investimentos": "#8e44ad", 
      "Lazer": "#e67e22", 
      "Saúde": "#c0392b", 
      "Tarifas/impostos": "#7f8c8d", 
      "Transporte": "#34495e", 
      "Pix": "#d35400", 
      "Salário": "#27ae60"
  };

  for (const category in categories) {
      const total = calculateCategoryTotal(category);
      if(total > 0){
        const progressContainer = document.createElement('div');
        progressContainer.classList.add('progress-container');
  
        const div = document.createElement('div');
        div.classList.add('category-name-amount');
  
        const categoryName = document.createElement('span');
        categoryName.classList.add('category-name');
        categoryName.innerHTML = `${category}`;
  
        const totalAmount = document.createElement('span');
        totalAmount.classList.add('total-amount');
        totalAmount.innerHTML = `${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  
        const progress = document.createElement('div');
        progress.classList.add('category-bar');
  
        const percentage = (total / maxTotal) * 100;
        progress.style.width = `${Math.min(percentage, 100)}%`; // Limita a porcentagem a 100%
  
        // Obtenha a cor da categoria ou uma cor padrão...
        const color = colorMapping[category] || '#999';
        progress.style.backgroundColor = color;
  
        div.appendChild(categoryName);
        div.appendChild(totalAmount);
        progressContainer.appendChild(div);
        progressContainer.appendChild(progress);
  
        categoryProgress.appendChild(progressContainer);
      }
  }
};

// Função principal para inicializar a página
const initGastosPorCategoria = () => {
    displayCategorySummary();
    displayCategoryProgress();
};
  
// Chama a função de inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', initGastosPorCategoria);
  