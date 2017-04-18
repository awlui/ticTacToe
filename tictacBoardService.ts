import {IplayerService, IboardService, gamePhase, player} from "./model.js";
import playerService from "./tictacPlayerService.js";
let empty: number[] = [0,0,0,0,0,0,0,0,0];

export default class boardService implements IboardService {
    public playerX: IplayerService;
    public playerO: IplayerService;
    public phase: gamePhase;
    public currentPlayers: IplayerService[]=[];
    constructor(public boardGameState: number[]=empty) {
        
    }
    loadPlayer(player: IplayerService) {
        if (this.currentPlayers.length < 2) {
            player.currentlyPlaying = true;
            this.currentPlayers.push(player);
        }
    }
    declarePlayers() {
        if (this.currentPlayers.length === 1) {
            this.playerX = this.currentPlayers[0];
            this.playerO = null;
        } else if (this.currentPlayers.length === 2) {
            this.playerX = this.currentPlayers[0];
            this.playerO = this.currentPlayers[1];
        }
    }
    removeLoadedPlayer(id: number) {
        this.currentPlayers = this.currentPlayers.filter(function(player) {
            if (player.id !== id) {
                return true;
            }
            player.currentlyPlaying = false;
            return false;
        });
        this.declarePlayers();
    }
    validGame() {
        return (this.currentPlayers.length === 2)
    }
    startGame() {
        this.phase = gamePhase.xTurn;
    }
    validMove(move: number) {
        if (this.boardGameState[move] === 0) {
            return true;
        }
    }
    makeMove(move: number) {
        if (this.phase === gamePhase.xTurn) {
            this.boardGameState[move] = 1;
        } else if (this.phase === gamePhase.oTurn) {
            this.boardGameState[move] = 2;
        }
    }
    nextPlayer() {
        this.checkForWinner();
        let currentPlayer;
        if (this.phase === gamePhase.xTurn) {
            this.phase = gamePhase.oTurn;
            currentPlayer = this.currentPlayers[player.O - 1]
        } else if (this.phase === gamePhase.oTurn) {
            this.phase = gamePhase.xTurn;
            currentPlayer = this.currentPlayers[player.X - 1];
        }
        return currentPlayer;
    }
    checkForWinner() {

    }
}