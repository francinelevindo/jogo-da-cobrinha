/*comentário com várias linhas 
let nome_variavel_let = 15 //  apenas dentro da função 
var nome_variavel_var //    apenas dentro da função 
const nome_variavel // const: variável fixa . Ex: Pi , n permite alteração

//Var
if(true){ 
    var x = 10 
}
console.log(x) // tipo um escreval * peço a informação

//let

if(true){
    let y = 20
    console.log(y)
}
console.log(y)*/

let canvas = document.getElementById("snake");
let contexto = canvas.getContext("2d");
let caixa = 32;
let snake = []; //vetor : atribui vários valores  dentro, diferente dasvariaveis

snake[0] = {
    x: 8 * caixa,
    y: 8 * caixa
}

direcao = "direita";

let comida = {
    x: Math.floor(Math.random() * 15 + 1 ) *caixa, // n° aleatórios e arredondando, pegar um n° entre 1 e quase 16
    y: Math.floor(Math.random() * 15 + 1) * caixa
}
function criarFundo( ){
    contexto.fillStyle = "lightblue";
    contexto.fillRect(0, 0, 16 * caixa, 16 * caixa);
}


function criarCobrinha() {
    for (i=0; i < snake.length; i++){
        contexto.fillStyle = "green";
        contexto.fillRect(snake[i].x, snake[i].y, caixa, caixa);
        // .contextofillReact = desenha o retângulo ´preenchido no canvas
        //contexto.fillReact(cordenada x, cooordenaday, largura, altura)
    
    contexto.beginPath();
        contexto.strokeStyle = "black";
        contexto.lineWidth = 4;
        contexto.roundRect(snake[i].x, snake[i].y, caixa, caixa, 6);
        contexto.fill();
        contexto.stroke();

        contexto.beginPath();
        contexto.roundRect(snake[i].x, snake[i].y, caixa, caixa, 8);
        contexto.fill();
}
}




function desenharComida(){
    contexto.fillStyle = "red";
    contexto.beginPath();
        contexto.strokeStyle = "black";
        contexto.lineWidth = 5;
        contexto.roundRect(comida.x, comida.y, caixa, caixa, 15);
        contexto.fill();
        contexto.stroke();

        contexto.beginPath();
        contexto.roundRect(comida.x, comida.y, caixa, caixa, 15);
        contexto.fill();

        //cabinho marrom
        let cabinhoLargura = 4;
        let cabinhoAltura = 10;
        let cabinhoX = comida.x + caixa / 2 -cabinhoLargura / 2;
        let cabinhoY = comida.y - cabinhoAltura + 2;

        contexto.fillStyle = "#5C3317"
        contexto.fillRect(cabinhoX, cabinhoY, cabinhoLargura, cabinhoAltura);
} 



document.addEventListener("keydown", atualizarDirecao);

function atualizarDirecao(evento){
    if(evento.keyCode == 37 && direcao != 'direita') direcao = 'esquerda';
    if(evento.keyCode == 38 && direcao != 'baixo') direcao = 'cima';
    if(evento.keyCode == 39 && direcao != 'esquerda') direcao = 'direita';
    if(evento.keyCode == 40 && direcao != 'cima') direcao = 'baixo';
}

function iniciarJogo() {
// teletransportar a cobra ao ultrapassar as bordas
    if(snake[0].x > 15 * caixa && direcao == 'direita') snake[0].x=0;
    if(snake[0].x < 0  && direcao == 'esquerda') snake[0].x=16 * caixa;
    if(snake[0].y > 15 * caixa && direcao == 'baixo') snake[0].y=0;
    if(snake[0].y < 0  && direcao == 'cima') snake[0].y=16 * caixa;

    // verificar a colisão da cabeça com o corpo
    for (let i = 1; i< snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Fim de jogo');
        }
    }
    criarFundo();
    criarCobrinha();
    desenharComida();
    
    let cobraX = snake[0].x;
    let cobraY = snake[0].y;

    if(direcao == 'direita') cobraX +=caixa;
    if(direcao == 'esquerda') cobraX -=caixa;
    if(direcao == 'cima') cobraY -=caixa;
    if(direcao == 'baixo') cobraY +=caixa;

    //verificar se comeu a comida 
    if(cobraX != comida.x || cobraY != comida.y){
        snake.pop();
    } else {
        comida.x = Math.floor(Math.random()* 15 + 1) *caixa;
        comida.y = Math.floor(Math.random()* 15 + 1) *caixa;
    }
    let novaCabeca = {

        x: cobraX,
        y: cobraY
    }
    snake.unshift(novaCabeca);
}
//document.getElementById("reiniciar").addEventListener("click", function () {
   // clearInterval(jogo);
  //  location.reload();
// });



let jogo = setInterval(iniciarJogo, 100);
