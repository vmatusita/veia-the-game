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

    handleSquareClick(event) {
        if (this.gameOver) {
            this.squares.forEach(square => square.classList.remove('cursor-pointer'));
            this.squares.forEach(square => square.classList.add('cursor-not-allowed'));
            return;
        }

        const square = event.target;
        const index = square.getAttribute('data-index');

        if (this.board[index] !== null) {
            return;
        }

        this.board[index] = this.currentPlayer;
        square.textContent = this.currentPlayer;

        const img = document.createElement('img');
        img.src = this.currentPlayer === 'X' ? 'assets/x-selected.png' : 'assets/o-selected.png';
        img.classList.add('scale-0', 'transition-transform', 'duration-300', 'ease-in-out');
        square.innerHTML = '';
        square.appendChild(img);

        setTimeout(() => {
            img.classList.remove('scale-0');
        }, 0);

        const winningPattern = this.checkWin();

        if (winningPattern) {
            this.gameOver = true;
            winningPattern.forEach(index => {
                this.squares[index].classList.remove('bg-[#22353f]');

                const winColor = this.currentPlayer === 'X' ? 'bg-[#5bc8bc]' : 'bg-[#e6b650]';
                this.squares[index].classList.add(winColor);

                const img = this.squares[index].querySelector('img');
                img.src = this.currentPlayer === 'X' ? 'assets/x-win.png' : 'assets/o-win.png';
            });

            if (this.currentPlayer === 'X') {
                this.playerXDialog.showModal();
                this.backdrop.classList.add('block');
                this.objPlayerX.vitorias += 1;
                this.objPlayerO.derrotas += 1;
                this.xWins++;
                document.getElementById('x-wins').innerHTML = `<span class="text-gray-700">PLAYER X</span> <br>${this.xWins}`;
                localStorage.setItem('players', JSON.stringify(this.listaPlayers));
            } else if (this.currentPlayer === 'O') {
                this.playerODialog.showModal();
                this.backdrop.classList.add('block');
                this.objPlayerO.vitorias += 1;
                this.objPlayerX.derrotas += 1;
                this.oWins++;
                document.getElementById('o-wins').innerHTML = `<span class="text-gray-700">PLAYER O</span> <br>${this.oWins}`;
                localStorage.setItem('players', JSON.stringify(this.listaPlayers));
            }
        } else if (this.board.every(cell => cell !== null)) {
            this.gameOver = true;
            this.empateDialog.showModal();
            this.backdrop.classList.add('block');
            this.empates++;
            document.getElementById('empates').innerHTML = `<span class="text-gray-700">EMPATES</span> <br>${this.empates}`;
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.turnos.innerHTML = `VEZ DE <span class="text-${this.currentPlayer === 'X' ? '[#5bc8bc]' : '[#e6b650]'}">${this.currentPlayer}</span>`;
        }
    }
}