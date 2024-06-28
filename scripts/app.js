class Player {
    constructor(nick) {
        this.nick = nick;
        this.vitorias = 0;
        this.derrotas = 0;
    }
}

class VeiaTheGame {
    constructor() {
        this.squares = document.querySelectorAll('.square');
        this.currentPlayer = 'X';
        this.board = Array(9).fill(null);
        this.resetButton = document.querySelectorAll('.reset-game');
        this.playerXDialog = document.getElementById('dialog-x');
        this.playerODialog = document.getElementById('dialog-o');
        this.empateDialog = document.getElementById('dialog-empate');
        this.dialog = document.getElementById('dialog');
        this.leaveButton = document.querySelectorAll('.botao-sair');
        this.backdrop = document.getElementById('backdrop');
        this.turnos = document.getElementById('turnos');
        this.xWins = 0;
        this.empates = 0;
        this.oWins = 0;
        this.gameOver = false;

        this.mainDiv = document.getElementById('divMain');
        this.btnLogar = document.getElementById('btnLogar');
        this.formLogar = document.getElementById('formLogar');
        this.inputPlayerX = document.getElementById('nick-x');
        this.inputPlayerO = document.getElementById('nick-o');
        this.objPlayerX = null;
        this.objPlayerO = null;

        this.listaPlayers = [];

        this.init();
    }

    init() {
        this.recarregarPlayers();
        this.btnLogar.addEventListener('click', this.handleLogar.bind(this));
        this.squares.forEach(square => square.addEventListener('click', this.handleSquareClick.bind(this)));
        this.leaveButton.forEach(button => button.addEventListener('click', this.closeDialog.bind(this)));
        this.resetButton.forEach(button => button.addEventListener('click', this.resetGame.bind(this)));
    }

    handleLogar(event) {
        event.preventDefault();
        this.mainDiv.setAttribute('class', '');
        this.formLogar.setAttribute('class', 'hidden');

        const nickPlayerX = this.inputPlayerX.value;
        const nickPlayerO = this.inputPlayerO.value;

        this.objPlayerX = this.listaPlayers.find(player => player.nick === nickPlayerX);
        this.objPlayerO = this.listaPlayers.find(player => player.nick === nickPlayerO);

        if (!this.objPlayerX) {
            this.objPlayerX = new Player(nickPlayerX);
            this.listaPlayers.push(this.objPlayerX);
        }

        if (!this.objPlayerO) {
            this.objPlayerO = new Player(nickPlayerO);
            this.listaPlayers.push(this.objPlayerO);
        }

        localStorage.setItem('players', JSON.stringify(this.listaPlayers));
    }
}