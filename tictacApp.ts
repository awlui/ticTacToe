import {IplayerService, IboardService, gamePhase, player as playerEnum} from "./model.js";
import playerService from "./tictacPlayerService.js";
import boardService from "./tictacBoardService.js";
import gameboardComponent from "./tictacComponent.js";
import scoreboardComponent from "./scoreboardComponent.js";
import currentPlayersComponent from "./currentPlayersComponent.js";
import phaseComponent from "./phaseComponent.js";
import gameOptionsComponent from "./gameOptionsComponent.js";

function renderBundle(self) {
        self.renderGameOptions();
        self.renderGamePhase();
        self.renderScoreBoard();
        self.renderGameBoard();
}
export class tictacApp {
    public gameboard;
    public scoreboard;
    public gameboardcomponent;
    public scoreboardcomponent;
    public currentplayerscomponent;
    public gamephasecomponent;
    public gameoptionscomponent;
    constructor() {
        this.initialize();
    }
    renderGameBoard() {
        let gameboard = this.gameboard.boardGameState;
        let phase = this.gameboard.phase;
        this.gameboardcomponent.render(gameboard, phase);
    }
    renderScoreBoard() {
        let playerList = playerService.allPlayers;
        this.scoreboardcomponent.render(playerList);
    }
    rendercurrentPlayersList() {
        let currentPlayerList = this.gameboard.currentPlayers;
        this.currentplayerscomponent.render(currentPlayerList);
    }
    renderGamePhase() {
        let phase = this.gameboard.phase;
        let players = this.gameboard.currentPlayers;
        this.gamephasecomponent.render(phase, players);
    }
    renderGameOptions() {
        let phase = this.gameboard.phase;
        let validGame = this.gameboard.validGame();
        this.gameoptionscomponent.render(phase, validGame);

    }
    createPlayer(name: string) {
        let newPlayer;
        if (name === "") {
            newPlayer = new playerService();
        } else {
            newPlayer = new playerService(name);
        }
        playerService.allPlayers.push(newPlayer);
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
            gamePhaseEl = document.getElementById('gamePhase'),
            currentPlayersEl = document.getElementById('currentPlayers'),
            gameboardInfoEl = document.getElementById('gameboardInfo'),
            gameOptionsEl = document.getElementById('gameOptions');
        
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
            playerNameInputEl.value = "";
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
                    _this.renderGamePhase();
                    _this.renderGameOptions();
                }
            }
        });
        scoreboardEl.addEventListener('removePlayer', function(evt: CustomEvent) {
            if (_this.gameboard.phase === gamePhase.Inactive) {
                _this.gameboard.removeLoadedPlayer(evt.detail.id);
                _this.renderScoreBoard();
                _this.rendercurrentPlayersList();
                _this.renderGamePhase();
                _this.renderGameOptions();
            }
        });

        gameBoardEl.addEventListener('playerMove', function(evt: CustomEvent) {
            if (_this.gameboard.phase === gamePhase.xTurn || _this.gameboard.phase === gamePhase.oTurn) {
                let move = evt.detail.place;
                let points = evt.detail.value;
                let player;
                if (_this.gameboard.validMove(move)) {
                    _this.gameboard.makeMove(move);
                    let result = _this.gameboard.checkForWinner(_this.gameboard.boardGameState);
                    if (result === gamePhase.xWinner) {
                        player = _this.gameboard.currentPlayers[playerEnum.X];
                        _this.renderGamePhase();
                        player.score += 1;
                    } else if (result === gamePhase.oWinner) {
                        player = _this.gameboard.currentPlayers[playerEnum.O];
                        _this.renderGamePhase();
                        player.score += 1;
                    } else if (result === gamePhase.Draw) {
                        //Game finished/outcome/restart
                        _this.renderGamePhase();
                    } else if (result === gamePhase.Active) {
                        if (_this.gameboard.phase === gamePhase.xTurn) {
                            _this.gameboard.nextPlayer();
                            _this.renderGamePhase();
                        } else {
                            _this.gameboard.nextPlayer();
                            _this.renderGamePhase();
                        }
                    }
                    _this.renderScoreBoard();
                    _this.renderGameBoard();
                    _this.renderGameOptions();
                }
            }
        });
        gameOptionsEl.addEventListener('restartGame', function(evt) {
            _this.gameboard.boardGameState = [0,0,0,0,0,0,0,0,0];
            _this.gameboard.phase = gamePhase.xTurn;
            _this.scoreboardcomponent.activateGame();

            renderBundle(_this);
            return false;
        });

        gameOptionsEl.addEventListener('loadNewPlayers', function(evt) {

            _this.gameboard.boardGameState = [0,0,0,0,0,0,0,0,0];
            _this.gameboard.phase = gamePhase.Inactive;
            _this.scoreboardcomponent.inactivateGame();
            renderBundle(_this);
            return false;
        });
        gameOptionsEl.addEventListener('startGame', function(evt) {
            if (_this.gameboard.validGame()) {
                _this.scoreboardcomponent.activateGame();
                _this.gameboard.startGame();

                _this.renderGamePhase();
                _this.renderGameBoard();
                _this.renderScoreBoard();
                _this.renderGameOptions();
            }
            return false;
        });


        //Component Initialization
        this.gameboardcomponent = new gameboardComponent(gameBoardEl);
        this.scoreboardcomponent = new scoreboardComponent(scoreboardEl);
        this.currentplayerscomponent = new currentPlayersComponent(currentPlayersEl);
        this.gamephasecomponent = new phaseComponent(gamePhaseEl);
        this.gameoptionscomponent = new gameOptionsComponent(gameOptionsEl);

        //initial rendering;
        this.renderScoreBoard();

        this.renderGameBoard();

        this.rendercurrentPlayersList();

        this.renderGamePhase();

        this.renderGameOptions();

    }
}