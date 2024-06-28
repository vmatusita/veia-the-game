class Player {
    constructor(nick, vitorias = 0, derrotas = 0) {
        this.nick = nick;
        this.vitorias = vitorias;
        this.derrotas = derrotas;
    }
}

class Ranking {
    constructor(tabelaCorpoId) {
        this.tabelaCorpo = document.getElementById(tabelaCorpoId);
        this.listaPlayers = [];
        this.recarregarPlayers();
        this.criarLinhasTabela();
    }

    recarregarPlayers() {
        const playersLocalStorage = localStorage.getItem('players');
        if (playersLocalStorage) {
            this.listaPlayers = JSON.parse(playersLocalStorage).map(playerData => new Player(playerData.nick, playerData.vitorias, playerData.derrotas));
        }
    }

    criarLinhasTabela() {
        this.listaPlayers.sort((a, b) => b.vitorias - a.vitorias);

        this.listaPlayers.forEach((player, index) => {
            const tr = document.createElement('tr');
            const tdPosicao = document.createElement('td');
            const tdNome = document.createElement('td');
            const tdVitorias = document.createElement('td');
            const tdDerrotas = document.createElement('td');

            tdPosicao.innerText = index + 1;
            tdNome.innerText = player.nick;
            tdVitorias.innerText = player.vitorias;
            tdDerrotas.innerText = player.derrotas;

            tr.setAttribute('class', 'text-[#abbec8]');
            tdPosicao.setAttribute('class', 'linha-tabela');
            tdNome.setAttribute('class', 'linha-tabela');
            tdVitorias.setAttribute('class', 'linha-tabela');
            tdDerrotas.setAttribute('class', 'linha-tabela');

            tr.appendChild(tdPosicao);
            tr.appendChild(tdNome);
            tr.appendChild(tdVitorias);
            tr.appendChild(tdDerrotas);
            this.tabelaCorpo.appendChild(tr);
        });
    }
}

const playerTable = new Ranking('tabelaCorpo');
