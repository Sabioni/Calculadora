//SELECIONANDO ELEMENTOS FAZER CONEXAO COM HTML
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

//calculadora
class Calculator{
    //constructor usado para inicializar novas propriedades
    //conectando com os elementos conectados via DOM do HTML
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""; //o valor para poder situar oq o user esta digitando no momento
    }
//add digit do calculator screen
    addDigit(digit){
        //checar se a opreaçao ja tem um ponto
        console.log(digit);
        if(digit === '.' && this.currentOperationText.innerText.includes('.')){
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

// processo de todas os calculos dos operadores
processOperation(operation){
    //checar se o valor é vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
        // troca de operaçao
        if (this.previousOperationText.innerText !== "") {
          this.changeOperation(operation);
        }
        return;
    }

// GET no atual e no anterior (valor)
let operationValue;
const previous = +this.previousOperationText.innerText.split(" ")[0];
const current = +this.currentOperationText.innerText;

//verificar minha operaçao
switch(operation){
    case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }

}



//mudar valores do tela de calculo
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ){
    if (operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation;
      } else {
        // Checar se o valor é 0
        if (previous === 0) {
          operationValue = current;
        }
        // adicionar atual para o valor anterior
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
      }

}

 // troda de operaçao
 changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Delete a digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Clear current operation
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Clear all operations
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }


}
//INSTANCIAR OBJ
//e posteriormente estaremos executando os metodos
const calc = new Calculator(previousOperationText, currentOperationText);


buttons.forEach((btn)=>{
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;
        
// o operador de mais vai tentar converter para um numero assim sabendo se é um numero ou é um ponto
        if(+value >= 0 || value === "."){
            calc.addDigit(value)
        }else{
            calc.processOperation(value)
        }
        
    })
})


