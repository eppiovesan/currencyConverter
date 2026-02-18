//obtendo formularios
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const currency = document.querySelector("#currency")
const description = document.querySelector("#description")
const result = document.querySelector("#result")
const footer = document.querySelector("footer")

//expressões regulares - regex
const hasCharactersRegex = /\D+/g
const hasCharacterPoint = /\./g

//cotação de moeda do dia
const USD = 5.21
const EUR = 6.19
const GBP = 7.10



//manipulando o valor do input amount para pertir apenas números
amount.addEventListener("input", (event) => {
    //não permitindo a digitação de letras 
    amount.value = amount.value.replace(hasCharactersRegex, "")
})


// capturando o evento de submit do formulário
form.addEventListener("submit", (event) => {
    event.preventDefault()
    //pegando a opção selecionada no combobx moeda
    currencyValue = currency.value

    switch(currencyValue){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break            
    }
    
})

// função para converter a moeda
function convertCurrency (amount, price, symbol){
    try{
        let convertValue = (amount * price).toFixed(2)

        convertValue = String(formatCurrencyBRL(convertValue)).replace("R$", "")

        //atualizando as informações do footer
        description.textContent = `${symbol}1 = ${formatCurrencyBRL(price)}`
        result.textContent = `${convertValue} Reais`

        //exibindo footer
        footerVisible(true)   

    }catch(error){
        alert(`Não foi possível converter. Erro ${error}`)
        footerVisible(false) 
    }


}
 // função para add/remover classe que exibe footer
function footerVisible(visible){
    if (visible){
        footer.classList.add("show-result")
    }
    else{
        footer.classList.remove("show-result")
    }
}

// função para formatar o valor (substituindo o ponto por virgula)
function formatValue(value){
    let formattedValue = value.toString().replace(hasCharacterPoint,",")
    return formattedValue 
}
// função apra formatar o valor para real
function formatCurrencyBRL(value){
    let formattedValueBRL = Number(value).toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL",
    })
    return formattedValueBRL 
}





