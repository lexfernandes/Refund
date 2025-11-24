//Capturando os dados do HTML.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//seleciona os elementos da lista

const expenseList = document.querySelector("ul");

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
  console.log(newExpense);
};

function expenseAdd(newExpense) {
  try {
    //Cria o elemento de li para adicionar o item (li) a lista (ul)
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //cria o icopne da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //adiciona as informações no item li
    expenseItem.append(expenseIcon);

    //adiciona o item na lista ul
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}
