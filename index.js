const boardRegions = document.querySelectorAll('#gameBoard span');
let vBoard = [];
let turnPlayer = '';

function updateTitle(){
    const playerInput= document.getElementById(turnPlayer);
    document.getElementById('turnPlayer').innerText=playerInput.value;
}

function initializeGame() {
    // Inicializa as variáveis globais 
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'
    // Ajusta o título da página (caso seja necessário)
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    // Limpa o tabuleiro (caso seja necessário) e adiciona os eventos de clique
    boardRegions.forEach(function (element) {
      element.classList.remove('win')
      element.innerText = ''
      element.classList.add('cursor-pointer')
      element.addEventListener('click', hendleBoardClick)
    })
  }
// Verifica se existem três regiões iguais em sequência e devolve as regiões
function getWinRegions() {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
      winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
      winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
      winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
      winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
      winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
      winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
      winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
      winRegions.push("0.2", "1.1", "2.0")
    return winRegions
  }

// Desabilita uma região do tabuleiro para que não seja mais clicável
function disableRegion(element) {
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', hendleBoardClick)
  }

function handleWin(regions){
    regions.forEach(function(region){
        document.querySelector('[data-region="' + region + '"]').classList.add('win')
    })
    const playername = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML=playername + ' Venceu!'
}
function hendleBoardClick(ev){
  const valor =document.querySelector('h2').innerText
  if(!valor.includes(' Venceu!'))
  {
    const span = ev.currentTarget //N.N
    const region=span.dataset.region //N.N
    const rowColumnPair=region.split('.') //["N","N"]
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if (turnPlayer==='player1')
    {
        span.innerText='X'
        vBoard[row][column]='X'
    }
    else
    {
        span.innerText='O'
        vBoard[row][column]='O'

    }
    console.clear();
    console.table(vBoard);
    disableRegion(span);

    const winRegion = getWinRegions();
    if(winRegion.length >0)
    {
        console.log('Venceu!')
        handleWin(winRegion);
        const game = document.getElementById('gameBoard');
       

    }
    else if (vBoard.flat().includes(''))
    {
        turnPlayer= turnPlayer==='player1' ? 'player2' : 'player1'
        updateTitle()
    }
    else 
    {
        document.querySelector('h2').innerHTML='Empate!'
    }
  }
}

document.getElementById('start').addEventListener('click', initializeGame)