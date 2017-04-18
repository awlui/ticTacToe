import {IplayerService, IboardService, gamePhase} from "./model.js";
import playerService from "./tictacPlayerService.js";
import boardService from "./tictacBoardService.js";
import gameboardComponent from "./tictacComponent.js";
import scoreboardComponent from "./scoreboardComponent.js";
import currentPlayersComponent from "./currentPlayersComponent.js";
export class tictacApp {
    public gameboard;
    public scoreboard;
    public gameboardcomponent;
    public scoreboardcomponent;
    public currentplayerscomponent;
    constructor() {
        this.initialize();
    }
    renderGameBoard() {
        let gameboard = this.gameboard.boardGameState;
        this.gameboardcomponent.render(gameboard);
    }
    renderScoreBoard() {
        let playerList = playerService.allPlayers;
        this.scoreboardcomponent.render(playerList);
    }
    rendercurrentPlayersList() {
        let currentPlayerList = this.gameboard.currentPlayers;
        this.currentplayerscomponent.render(currentPlayerList);
    }
    nextTurn() {

    }
    createPlayer(name: string) {
        let newPlayer;
        if (name === "") {
            newPlayer = new playerService();
        } else {
            newPlayer = new playerService(name);
        }
        playerService.allPlayers.push(newPlayer);
        //render scoreboard
        return newPlayer;
    }
    initialize() {

        //SERVICES
        this.gameboard = new boardService();
        this.scoreboard = new playerService();
        //Element initalization
        let _this = this; 
        let boardEl = document.getElementsByClassName('app')[0],
            playerFormEl = document.getElementById('newPlayerForm'),
            playerNameInputEl = playerFormEl.getElementsByTagName('input')[0],
            gameBoardEl = document.getElementById('gameboard'),
            scoreboardEl = document.getElementById('scoreboard'),
            currentPlayersEl = document.getElementById('currentPlayers'),
            gameboardInfoEl = document.getElementById('gameboardInfo'),
            startButtonEl = gameboardInfoEl.getElementsByTagName('button')[0];
        
        //Event listeners
        playerFormEl.addEventListener('submit', function(evt: Event) {
            document.querySelector('#flash_msg').className='';
            evt.preventDefault();
            let allPlayerNames: string[]=[];
            for (let player of playerService.allPlayers) {
                allPlayerNames.push(player.name);
            }
            if (typeof playerNameInputEl.value === 'string') {
                if (!~allPlayerNames.indexOf(playerNameInputEl.value)) {
                    try {
                        _this.createPlayer(playerNameInputEl.value);
                    }
                    catch(err) {
                        console.log(err.message);
                    }
                } else {
                    document.querySelector('#flash_msg').className = 'activated';
                }
            }
            _this.renderScoreBoard();
        });
        scoreboardEl.addEventListener('choosePlayer', function(evt: CustomEvent) {
            if (_this.gameboard.currentPlayers.length < 2) {
                if (_this.gameboard.currentPlayers.length === 0 || _this.gameboard.currentPlayers[0].id !== evt.detail.id) {
                    let chosenPlayer = playerService.allPlayers.filter(function(player) {
                        if (player.id === evt.detail.id) {
                            return true;
                        }
                    })[0];
                    _this.gameboard.loadPlayer(chosenPlayer);
                    _this.rendercurrentPlayersList();
                    _this.renderScoreBoard();
                }
            }
        });
        currentPlayersEl.addEventListener('removePlayer', function(evt: CustomEvent) {
            _this.gameboard.removeLoadedPlayer(evt.detail.id);
            _this.renderScoreBoard();
            _this.rendercurrentPlayersList();
        });
        startButtonEl.addEventListener('click', function(evt) {
            let event = document.createEvent('CustomEvent');
            event.initCustomEvent('startGame', true, true, {});
            this.dispatchEvent(event);
        });
        gameBoardEl.addEventListener('playerMove', function(evt: CustomEvent) {
            if (_this.gameboard.phase === gamePhase.xTurn || _this.gameboard.phase === gamePhase.oTurn) {
                let move = evt.detail.value;
                if (_this.gameboard.validMove(move)) {
                    _this.gameboard.makeMove(move);
                    console.log(_this.gameboard.boardGameState);
                    _this.renderGameBoard();
                    _this.gameboard.nextPlayer();
                }
            }
        });
        //Component Initialization
        _this.gameboardcomponent = new gameboardComponent(gameBoardEl);
        _this.scoreboardcomponent = new scoreboardComponent(scoreboardEl);
        _this.currentplayerscomponent = new currentPlayersComponent(currentPlayersEl);
        //initial rendering;
        this.renderScoreBoard();

        this.renderGameBoard();

        this.rendercurrentPlayersList();
        gameboardInfoEl.addEventListener('startGame', function(evt) {
            if (_this.gameboard.validGame()) {
                _this.currentplayerscomponent.freezePlayerChange();
                _this.gameboard.startGame();
            }
        })
    }
}