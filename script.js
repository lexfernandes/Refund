//Capturando os dados do HTML.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");

amount.oninput = () => {
  // Filtrando letras de números
  let value = amount.value.replace(/\D/g, "");
  // recebe o valor formatado no modo real.
  amount.value = formattedCurrencyBRL(value);
};
//Formata no padrão brasileiro (Real)
function formattedCurrencyBRL(value) {
  //converte a string em número depois divide por 100
  let formatted = (Number(value) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // retornar o valor formatado.
  return formatted;
}

//captura o evento de submit do formulário para obter os valores
form.onsubmit = (e) => {
  //previne o comportamento padrão de recarregar a página.
  e.preventDefault();
  // cria uma objeto com os detalhes na nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  // chama a função que irá adicionar o item a lista.
  expenseAdd(newExpense);
};

// adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    //Cria o elemento de li para adicionar o item (li) a lista (ul)
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //cria o icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //Cria uma div com as informações
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //cria um strong para adicionar texto a categoria.
    const expenseStrong = document.createElement("strong");
    expenseStrong.textContent = newExpense.expense;

    //cria uma span para informar nome da despesa
    const expenseName = document.createElement("span");
    expenseName.textContent = newExpense.category_name;

    // Cria um span para mostrar o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", `img/remove.svg`);
    removeIcon.setAttribute("alt", "remover");

    //Adiciona o strong dentro da div
    expenseInfo.append(expenseStrong, expenseName);

    //adiciona as informações no item li
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount);
    expenseItem.append(removeIcon);

    //adiciona o item na lista ul
    expenseList.append(expenseItem);
    updateTotals();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}

//Atualiza os totais
function updateTotals() {
  //verifica quantas li tem na lista
  const items = expenseList.children;
  expenseQuantity.textContent = `${items.length} ${
    items.length > 1 ? "despesas" : "despesa"
  }`;
  //variavel para incrementar o total
  let total = 0;
  // Percorre cada item (li) da lista (ul)
  for (let item = 0; item < items.length; item++) {
    const itemAmount = items[item].querySelector(".expense-amount");
    //remover caracteres não númericos e substitui a virgula pelo ponto.
    let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".");
    //converte o valor para float
    value = parseFloat(value);

    //verifica se é um número válido
    if (isNaN(value)) {
      return alert(
        "Não foi possível calcular o total. O valor não parece ser um número."
      );
    }
    //incrementa o valor
    total += Number(value);
  }

  //cria um span para adicionar o R$ formatado
  const symbolBRL = document.createElement("small");
  symbolBRL.textContent = "R$";

  // formata o valor e remove o R$ que será exibido pelo small com estilo customizado
  total = formattedCurrencyBRL(total).toUpperCase().replace("R$", "");
  //limpa o conteúdo do elemento
  expenseTotal.innerHTML = "";

  // adiciona o simbolo da moeda e o valor total formatado.
  expenseTotal.append(symbolBRL, total);

  try {
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais.");
  }
}
//Evento que captura o clique nos intens da lista.
expenseList.addEventListener("click", function (event) {
  //Verifica se o elemento clicado é o ícone de remover.
  if (event.target.classList.contains("remove-icon")) {
    //Obtem a li pai do elemento clicado
    const item = event.target.closest(".expense");
    item.remove();
    updateTotals();
  }
});
