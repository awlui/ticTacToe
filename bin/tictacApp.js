System.register(["./model.js", "./tictacPlayerService.js", "./tictacBoardService.js", "./tictacComponent.js", "./scoreboardComponent.js", "./currentPlayersComponent.js", "./phaseComponent.js", "./gameOptionsComponent.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function renderBundle(self) {
        self.renderGameOptions();
        self.renderGamePhase();
        self.renderScoreBoard();
        self.renderGameBoard();
    }
    var model_js_1, tictacPlayerService_js_1, tictacBoardService_js_1, tictacComponent_js_1, scoreboardComponent_js_1, currentPlayersComponent_js_1, phaseComponent_js_1, gameOptionsComponent_js_1, tictacApp;
    return {
        setters: [
            function (model_js_1_1) {
                model_js_1 = model_js_1_1;
            },
            function (tictacPlayerService_js_1_1) {
                tictacPlayerService_js_1 = tictacPlayerService_js_1_1;
            },
            function (tictacBoardService_js_1_1) {
                tictacBoardService_js_1 = tictacBoardService_js_1_1;
            },
            function (tictacComponent_js_1_1) {
                tictacComponent_js_1 = tictacComponent_js_1_1;
            },
            function (scoreboardComponent_js_1_1) {
                scoreboardComponent_js_1 = scoreboardComponent_js_1_1;
            },
            function (currentPlayersComponent_js_1_1) {
                currentPlayersComponent_js_1 = currentPlayersComponent_js_1_1;
            },
            function (phaseComponent_js_1_1) {
                phaseComponent_js_1 = phaseComponent_js_1_1;
            },
            function (gameOptionsComponent_js_1_1) {
                gameOptionsComponent_js_1 = gameOptionsComponent_js_1_1;
            }
        ],
        execute: function () {
            tictacApp = (function () {
                function tictacApp() {
                    this.initialize();
                }
                tictacApp.prototype.renderGameBoard = function () {
                    var gameboard = this.gameboard.boardGameState;
                    var phase = this.gameboard.phase;
                    this.gameboardcomponent.render(gameboard, phase);
                };
                tictacApp.prototype.renderScoreBoard = function () {
                    var playerList = tictacPlayerService_js_1.default.allPlayers;
                    this.scoreboardcomponent.render(playerList);
                };
                tictacApp.prototype.rendercurrentPlayersList = function () {
                    var currentPlayerList = this.gameboard.currentPlayers;
                    this.currentplayerscomponent.render(currentPlayerList);
                };
                tictacApp.prototype.renderGamePhase = function () {
                    var phase = this.gameboard.phase;
                    var players = this.gameboard.currentPlayers;
                    this.gamephasecomponent.render(phase, players);
                };
                tictacApp.prototype.renderGameOptions = function () {
                    var phase = this.gameboard.phase;
                    var validGame = this.gameboard.validGame();
                    this.gameoptionscomponent.render(phase, validGame);
                };
                tictacApp.prototype.createPlayer = function (name) {
                    var newPlayer;
                    if (name === "") {
                        newPlayer = new tictacPlayerService_js_1.default();
                    }
                    else {
                        newPlayer = new tictacPlayerService_js_1.default(name);
                    }
                    tictacPlayerService_js_1.default.allPlayers.push(newPlayer);
                    return newPlayer;
                };
                tictacApp.prototype.initialize = function () {
                    //SERVICES
                    this.gameboard = new tictacBoardService_js_1.default();
                    this.scoreboard = new tictacPlayerService_js_1.default();
                    //Element initalization
                    var _this = this;
                    var boardEl = document.getElementsByClassName('app')[0], playerFormEl = document.getElementById('newPlayerForm'), playerNameInputEl = playerFormEl.getElementsByTagName('input')[0], gameBoardEl = document.getElementById('gameboard'), scoreboardEl = document.getElementById('scoreboard'), gamePhaseEl = document.getElementById('gamePhase'), currentPlayersEl = document.getElementById('currentPlayers'), gameboardInfoEl = document.getElementById('gameboardInfo'), gameOptionsEl = document.getElementById('gameOptions');
                    //Event listeners
                    playerFormEl.addEventListener('submit', function (evt) {
                        document.querySelector('#flash_msg').className = '';
                        evt.preventDefault();
                        var allPlayerNames = [];
                        for (var _i = 0, _a = tictacPlayerService_js_1.default.allPlayers; _i < _a.length; _i++) {
                            var player = _a[_i];
                            allPlayerNames.push(player.name);
                        }
                        if (typeof playerNameInputEl.value === 'string') {
                            if (!~allPlayerNames.indexOf(playerNameInputEl.value)) {
                                try {
                                    _this.createPlayer(playerNameInputEl.value);
                                }
                                catch (err) {
                                    console.log(err.message);
                                }
                            }
                            else {
                                document.querySelector('#flash_msg').className = 'activated';
                            }
                        }
                        playerNameInputEl.value = "";
                        _this.renderScoreBoard();
                    });
                    scoreboardEl.addEventListener('choosePlayer', function (evt) {
                        if (_this.gameboard.currentPlayers.length < 2) {
                            if (_this.gameboard.currentPlayers.length === 0 || _this.gameboard.currentPlayers[0].id !== evt.detail.id) {
                                var chosenPlayer = tictacPlayerService_js_1.default.allPlayers.filter(function (player) {
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
                    scoreboardEl.addEventListener('removePlayer', function (evt) {
                        if (_this.gameboard.phase === model_js_1.gamePhase.Inactive) {
                            _this.gameboard.removeLoadedPlayer(evt.detail.id);
                            _this.renderScoreBoard();
                            _this.rendercurrentPlayersList();
                            _this.renderGamePhase();
                            _this.renderGameOptions();
                        }
                    });
                    gameBoardEl.addEventListener('playerMove', function (evt) {
                        if (_this.gameboard.phase === model_js_1.gamePhase.xTurn || _this.gameboard.phase === model_js_1.gamePhase.oTurn) {
                            var move = evt.detail.place;
                            var points = evt.detail.value;
                            var player = void 0;
                            if (_this.gameboard.validMove(move)) {
                                _this.gameboard.makeMove(move);
                                var result = _this.gameboard.checkForWinner(_this.gameboard.boardGameState);
                                if (result === model_js_1.gamePhase.xWinner) {
                                    player = _this.gameboard.currentPlayers[model_js_1.player.X];
                                    _this.renderGamePhase();
                                    player.score += 1;
                                }
                                else if (result === model_js_1.gamePhase.oWinner) {
                                    player = _this.gameboard.currentPlayers[model_js_1.player.O];
                                    _this.renderGamePhase();
                                    player.score += 1;
                                }
                                else if (result === model_js_1.gamePhase.Draw) {
                                    //Game finished/outcome/restart
                                    _this.renderGamePhase();
                                }
                                else if (result === model_js_1.gamePhase.Active) {
                                    if (_this.gameboard.phase === model_js_1.gamePhase.xTurn) {
                                        _this.gameboard.nextPlayer();
                                        _this.renderGamePhase();
                                    }
                                    else {
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
                    gameOptionsEl.addEventListener('restartGame', function (evt) {
                        _this.gameboard.boardGameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                        _this.gameboard.phase = model_js_1.gamePhase.xTurn;
                        _this.scoreboardcomponent.activateGame();
                        renderBundle(_this);
                        return false;
                    });
                    gameOptionsEl.addEventListener('loadNewPlayers', function (evt) {
                        _this.gameboard.boardGameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                        _this.gameboard.phase = model_js_1.gamePhase.Inactive;
                        _this.scoreboardcomponent.inactivateGame();
                        renderBundle(_this);
                        return false;
                    });
                    gameOptionsEl.addEventListener('startGame', function (evt) {
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
                    this.gameboardcomponent = new tictacComponent_js_1.default(gameBoardEl);
                    this.scoreboardcomponent = new scoreboardComponent_js_1.default(scoreboardEl);
                    this.currentplayerscomponent = new currentPlayersComponent_js_1.default(currentPlayersEl);
                    this.gamephasecomponent = new phaseComponent_js_1.default(gamePhaseEl);
                    this.gameoptionscomponent = new gameOptionsComponent_js_1.default(gameOptionsEl);
                    //initial rendering;
                    this.renderScoreBoard();
                    this.renderGameBoard();
                    this.rendercurrentPlayersList();
                    this.renderGamePhase();
                    this.renderGameOptions();
                };
                return tictacApp;
            }());
            exports_1("tictacApp", tictacApp);
        }
    };
});
//# sourceMappingURL=tictacApp.js.map