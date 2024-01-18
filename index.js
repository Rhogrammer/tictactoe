const player = "X";
const computer = "O";
const result = document.getElementById("result");
const winningCombinations = [
        [1, 2, 3], //orizzontale
        [4, 5, 6], //orizzontale
        [7, 8, 9], //orizzontale
        [1, 4, 7], //verticale
        [2, 5, 8], //verticale
        [3, 6, 9], //verticale
        [1, 5, 9], //diagonale
        [3, 5, 7] //diagonale
    ];

let turn = 0;
let gameOver = false;
let board = { //qui prendiamo tutti gli elementi della griglia per poterli manipolare
    1: document.getElementById("1"),
    2: document.getElementById("2"),
    3: document.getElementById("3"),
    4: document.getElementById("4"),
    5: document.getElementById("5"),
    6: document.getElementById("6"),
    7: document.getElementById("7"),
    8: document.getElementById("8"),
    9: document.getElementById("9")
}
let boardState = { //qui simuleremo la griglia con i valori di X e O per controllare se c'è un vincitore
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: ""
}

/*
* la funzione play fa una giocata, controlla se c'è un vincitore e se non c'è fa giocare il computer
* la funzione prende in input l'id del bottone cliccato
*/
function play(id) {
    if (gameOver) { //se il gioco è finito non facciamo giocare
        return;
    }
    if (boardState[id] == "") { //se il bottone è vuoto, cioe non contiene X o O
        board[id].innerHTML = player; //inseriamo X
        boardState[id] = player; //inseriamo X nella griglia simulata
        turn++; //incrementiamo il turno
        if (turn >= 5) { //se il turno è maggiore o uguale a 5 controlliamo se c'è un vincitore
        /*
        il motivo è per semplice aritmetica, il giocatore gioca per primo, quindi il minimo di turni per vincere è 5
        */
            checkWinner();
        }
        if (!gameOver) { //se il gioco non è finito facciamo giocare il computer
            computerTurn();
        }
    }
}

/**
 * la funzione checkWinner controlla se c'è un vincitore
 */
function checkWinner(){
    //usiamo un array per controllare tutte le combinazioni possibili per vincere
    
    winningCombinations.forEach(combination => { //per ogni combinazione
        let x = 0; //contatore per X
        let o = 0; //contatore per O
        combination.forEach(number => { //per ogni numero della combinazione
            if (boardState[number] == player) { //se il numero è uguale a X
                x++; //incrementiamo il contatore di X
            } else if (boardState[number] == computer) { //se il numero è uguale a O
                o++; //incrementiamo il contatore di O
            }
        });
        if (x == 3) { //se il contatore di X è uguale a 3
            result.innerHTML = "Player Wins!"; //il giocatore ha vinto
            gameOver = true; //il gioco è finito
        } else if (o == 3) { //se il contatore di O è uguale a 3
            result.innerHTML = "Computer Wins!"; //il computer ha vinto
            gameOver = true; //il gioco è finito
        }
    });
    //se siamo all'ultimo turno e non c'è un vincitore, allora è un pareggio
    if (turn == 9 && !gameOver) {
        result.innerHTML = "It's a Tie!";
        gameOver = true;
    }
}

//questa funzione fa giocare il computer
//sceglie un numero a caso tra 1 e 9 e controlla se il bottone è vuoto
//se è vuoto inserisce O e incrementa il turno
//se non è vuoto sceglie un altro numero
function computerTurn(){
    let random = Math.floor(Math.random() * 9) + 1; //scegliamo un numero a caso tra 1 e 9
    while (boardState[random] != "") { //se il bottone non è vuoto
        random = Math.floor(Math.random() * 9) + 1; //scegliamo un altro numero
        //per evitare un loop infinito, se rimane solo un bottone vuoto, il computer lo sceglie
        if (turn == 9) {
            //trovia il bottone vuoto
            boardState.forEach(chiave, valore => {
                if (valore == "") { //iteriamo finchè non troviamo un bottone vuoto
                    random = chiave; //assegnamo il bottone vuoto a random
                }
            });
        }
    }
    board[random].innerHTML = computer;
    boardState[random] = computer;
    turn++;
    if (turn >= 5) {
        checkWinner();
    }
}

//la funzione reset resetta il gioco per poter giocare di nuovo
function reset(){
    boardState = { //resetta la griglia simulata
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: ""
    }
    turn = 0;
    gameOver = false;
    result.innerHTML = "";
    Object.keys(board).forEach(key => { //resetta la griglia
        //Object.keys(board) prende tutte le chiavi dell'oggetto board, cioè 1, 2, 3, 4, 5, 6, 7, 8, 9
        board[key].innerHTML = ""; //per ogni elemento dentro board, cioè ogni bottone, resettiamo il contenuto
    });
}