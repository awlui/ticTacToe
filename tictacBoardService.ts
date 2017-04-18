import {IplayerService, IboardService, gamePhase, player} from "./model.js";
import playerService from "./tictacPlayerService.js";
let empty: number[] = [0,0,0,0,0,0,0,0,0];

export default class boardService implements IboardService {
    public player1: IplayerService;
    public player2: IplayerService;
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
            this.player1 = this.currentPlayers[0];
            this.player2 = null;
        } else if (this.currentPlayers.length === 2) {
            this.player1 = this.currentPlayers[0];
            this.player2 = this.currentPlayers[1];
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
    nextPlayer() {
        let currentPlayer;
        if (this.phase === gamePhase.xTurn) {
            this.phase = gamePhase.oTurn;
            currentPlayer = this.currentPlayers[player.O]
        } else if (this.phase === gamePhase.oTurn) {
            this.phase = gamePhase.xTurn;
            currentPlayer = this.currentPlayers[player.X];
        }
        return currentPlayer;
    }
    checkForWinner() {

    }
}