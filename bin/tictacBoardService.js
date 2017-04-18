System.register(["./model.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_js_1, empty, boardService;
    return {
        setters: [
            function (model_js_1_1) {
                model_js_1 = model_js_1_1;
            }
        ],
        execute: function () {
            empty = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            boardService = (function () {
                function boardService(boardGameState) {
                    if (boardGameState === void 0) { boardGameState = empty; }
                    this.boardGameState = boardGameState;
                    this.currentPlayers = [];
                }
                boardService.prototype.loadPlayer = function (player) {
                    if (this.currentPlayers.length < 2) {
                        player.currentlyPlaying = true;
                        this.currentPlayers.push(player);
                    }
                };
                boardService.prototype.declarePlayers = function () {
                    if (this.currentPlayers.length === 1) {
                        this.playerX = this.currentPlayers[0];
                        this.playerO = null;
                    }
                    else if (this.currentPlayers.length === 2) {
                        this.playerX = this.currentPlayers[0];
                        this.playerO = this.currentPlayers[1];
                    }
                };
                boardService.prototype.removeLoadedPlayer = function (id) {
                    this.currentPlayers = this.currentPlayers.filter(function (player) {
                        if (player.id !== id) {
                            return true;
                        }
                        player.currentlyPlaying = false;
                        return false;
                    });
                    this.declarePlayers();
                };
                boardService.prototype.validGame = function () {
                    return (this.currentPlayers.length === 2);
                };
                boardService.prototype.startGame = function () {
                    this.phase = model_js_1.gamePhase.xTurn;
                };
                boardService.prototype.validMove = function (move) {
                    if (this.boardGameState[move] === 0) {
                        return true;
                    }
                };
                boardService.prototype.makeMove = function (move) {
                    if (this.phase === model_js_1.gamePhase.xTurn) {
                        this.boardGameState[move] = 1;
                    }
                    else if (this.phase === model_js_1.gamePhase.oTurn) {
                        this.boardGameState[move] = 2;
                    }
                };
                boardService.prototype.nextPlayer = function () {
                    this.checkForWinner();
                    var currentPlayer;
                    if (this.phase === model_js_1.gamePhase.xTurn) {
                        this.phase = model_js_1.gamePhase.oTurn;
                        currentPlayer = this.currentPlayers[model_js_1.player.O - 1];
                    }
                    else if (this.phase === model_js_1.gamePhase.oTurn) {
                        this.phase = model_js_1.gamePhase.xTurn;
                        currentPlayer = this.currentPlayers[model_js_1.player.X - 1];
                    }
                    return currentPlayer;
                };
                boardService.prototype.checkForWinner = function () {
                };
                return boardService;
            }());
            exports_1("default", boardService);
        }
    };
});
//# sourceMappingURL=tictacBoardService.js.map