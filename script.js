//Capturando os dados do HTML.
const amount = document.getElementById("amount");

amount.oninput = () => {
  // Filtrando letras de números
  let value = amount.value.replace(/\D/g, "");

  // recebe o valor formatado no modo real.
  amount.value = formattedCurrencyBRL(value);
  console.log(amount.value);
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
