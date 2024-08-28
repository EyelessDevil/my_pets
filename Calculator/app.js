const resultElement = document.getElementById('result')
const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')
const submitBtn = document.getElementById('submit')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const divideBtn = document.getElementById('divide')
const multiplyBtn = document.getElementById('multiply')

let action = '+'

plusBtn.onclick = function(){
    action = '+'
}

minusBtn.onclick = function(){
    action = '-'
}

divideBtn.onclick = function(){
    action = '/'
}

multiplyBtn.onclick = function(){
    action = '*'
}

function printResult(result) {
    resultElement.style.color = result < 0 ? 'red' : 'green'
    resultElement.textContent = result
}

function computeNumbersWithAction(inp1, inp2, actionSymbol) {
    const num1 = Number(inp1.value)
    const num2 = Number(inp2.value)

    if(actionSymbol == '+') {
        return num1 + num2
    } else if(actionSymbol == '-') {
        return num1 - num2
    } else if(actionSymbol == '*') {
        return num1 * num2
    } else if(actionSymbol == '/') {
        return num1 / num2
    }
}

submitBtn.onclick = function () {
    const result = computeNumbersWithAction(input1, input2, action)
    printResult(result)
}