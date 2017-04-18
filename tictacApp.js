System.register(["./tictacPlayerService.js", "./tictacBoardService.js", "./tictacComponent.js", "./scoreboardComponent.js", "./currentPlayersComponent.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tictacPlayerService_js_1, tictacBoardService_js_1, tictacComponent_js_1, scoreboardComponent_js_1, currentPlayersComponent_js_1, tictacApp;
    return {
        setters: [
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
            }
        ],
        execute: function () {
            tictacApp = (function () {
                function tictacApp() {
                    this.initialize();
                }
                tictacApp.prototype.renderGameBoard = function () {
                    var gameboard = this.gameboard.boardGameState;
                    this.gameboardComponent.render(gameboard);
                };
                tictacApp.prototype.renderScoreBoard = function () {
                    var playerList = tictacPlayerService_js_1.default.allPlayers;
                    this.scoreboardComponent.render(playerList);
                };
                tictacApp.prototype.rendercurrentPlayersList = function () {
                    var currentPlayerList = this.gameboard.currentPlayers;
                    this.currentplayersComponent.render(currentPlayerList);
                };
                tictacApp.prototype.nextTurn = function () {
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
                    //render scoreboard
                    return newPlayer;
                };
                tictacApp.prototype.initialize = function () {
                    //SERVICES
                    this.gameboard = new tictacBoardService_js_1.default();
                    this.scoreboard = new tictacPlayerService_js_1.default();
                    //Element initalization
                    var _this = this;
                    var boardEl = document.getElementsByClassName('app')[0], playerFormEl = document.getElementById('newPlayerForm'), playerNameInputEl = playerFormEl.getElementsByTagName('input')[0], gameBoardEl = document.getElementById('gameboard'), scoreboardEl = document.getElementById('scoreboard'), currentPlayersEl = document.getElementById('currentPlayers');
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
                            }
                        }
                    });
                    currentPlayersEl.addEventListener('removePlayer', function (evt) {
                        _this.gameboard.removeLoadedPlayer(evt.detail.id);
                        _this.renderScoreBoard();
                        _this.rendercurrentPlayersList();
                    });
                    //Component Initialization
                    this.gameboardComponent = new tictacComponent_js_1.default(gameBoardEl);
                    this.scoreboardComponent = new scoreboardComponent_js_1.default(scoreboardEl);
                    this.currentplayersComponent = new currentPlayersComponent_js_1.default(currentPlayersEl);
                    //initial rendering;
                    this.renderScoreBoard();
                    this.renderGameBoard();
                    this.rendercurrentPlayersList();
                };
                return tictacApp;
            }());
            exports_1("tictacApp", tictacApp);
        }
    };
});
//# sourceMappingURL=tictacApp.js.map