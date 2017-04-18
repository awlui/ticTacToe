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
                        this.player1 = this.currentPlayers[0];
                        this.player2 = null;
                    }
                    else if (this.currentPlayers.length === 2) {
                        this.player1 = this.currentPlayers[0];
                        this.player2 = this.currentPlayers[1];
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
                boardService.prototype.nextPlayer = function () {
                    var currentPlayer;
                    if (this.phase === model_js_1.gamePhase.xTurn) {
                        this.phase = model_js_1.gamePhase.oTurn;
                        currentPlayer = this.currentPlayers[model_js_1.player.O];
                    }
                    else if (this.phase === model_js_1.gamePhase.oTurn) {
                        this.phase = model_js_1.gamePhase.xTurn;
                        currentPlayer = this.currentPlayers[model_js_1.player.X];
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