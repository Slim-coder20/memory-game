
const cards = [
    'https://picsum.photos/id/237/100/100', 
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
  ];

const gameBoard = document.getElementById('game-board'); 
let selectedCards = []; 

function createCard(cardUrl){
    const card = document.createElement('div'); 
    card.classList.add('card'); 
    card.dataset.value = cardUrl; 

    const cardContent = document.createElement('img'); 
    cardContent.classList.add('card-content');
    cardContent.src = cardUrl; 

    card.appendChild(cardContent);
    card.addEventListener('click', onCardClick);
    return card; 

}

function duplicateArray(arraySimple){
    let arrayDouble = [];
    arrayDouble.push(...arraySimple); 
    arrayDouble.push(...arraySimple); 

    return arrayDouble; 

}


function shuffleArray(arraytoshuffle){
    const arrayShuffled = arraytoshuffle.sort(()=> 0.5 - Math.random()); 
    return arrayShuffled; 

}


let  allCards = duplicateArray(cards); 
// Mélanger le tableau // 
allCards = shuffleArray(allCards); 
allCards.forEach(card => {
    const cardHtml = createCard(card);
    gameBoard.appendChild(cardHtml); 

})

// On créé une fonction qui nous permettra de retourner les cartes et on ajoute l'écoute avec addeventlistner dans la fonction createCrad// 

function onCardClick(e){

    const card = e.target.parentElement;

    card.classList.add("flip");
    selectedCards.push(card);
    if(selectedCards.length == 2){

        setTimeout(() => {
            // Le code à exécuté après le timeout 
            if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
            // On a trouvé une paire 
            selectedCards[0].classList.add("matched");
            selectedCards[1].classList.add("matched");
            selectedCards[0].removeEventListener('click', onCardClick);
            selectedCards[1].removeEventListener('click', onCardClick);
            checkEndGame(); // Vérifie si la partie est terminée 
           


        }else{
            // on s'est trompé 
            selectedCards[0].classList.remove("flip");
            selectedCards[1].classList.remove("flip");
            
            
        }
        selectedCards = [];

            
        }, 1000);
         
    }

}

// Ajouter la gestion d'un chrnometre // 

let timerInterval;
let timeElapsed = 0;
let matchedPairs = 0;
 allCards = []; // Stocke les cartes actuelles
 selectedCards = [];

// Chronomètre
function startTimer() {
    timeElapsed = 0;
    document.getElementById('timer').innerText = `Temps : 0s`;
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById('timer').innerText = `Temps : ${timeElapsed}s`;
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = `Temps : 0s`;
}

// Fin de partie
function checkEndGame() {
    if (document.querySelectorAll('.matched').length === allCards.length) {
        clearInterval(timerInterval); // Arrête le chronomètre
        alert(`Bravo ! Vous avez complété le jeu en ${timeElapsed} secondes.`);
        document.getElementById('recommencer-button').style.display = 'block'; // Affiche recommencer
    }
}

// Gérer le clic sur les cartes
function onCardClick(e) {
    const card = e.target.parentElement;
    if (card.classList.contains('flip') || selectedCards.length === 2) return;

    card.classList.add('flip');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        setTimeout(() => {
            if (selectedCards[0].dataset.value === selectedCards[1].dataset.value) {
                selectedCards[0].classList.add("matched");
                selectedCards[1].classList.add("matched");
                matchedPairs++;
                checkEndGame();
            } else {
                selectedCards.forEach(c => c.classList.remove('flip'));
            }
            selectedCards = [];
        }, 1000);
    }
}

// Fonction pour créer les cartes
function createCard(cardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = cardUrl;

    card.appendChild(cardContent);
    card.addEventListener('click', onCardClick);
    return card;
}

// Mélanger les cartes
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function duplicateArray(array) {
    return [...array, ...array];
}

// Initialisation du jeu
function startGame() {
    resetTimer();
    matchedPairs = 0;
    selectedCards = []; // Réinitialise les cartes sélectionnées

    allCards = shuffleArray(duplicateArray([
        "https://picsum.photos/id/237/100/100",
        "https://picsum.photos/id/238/100/100",
        "https://picsum.photos/id/239/100/100",
        "https://picsum.photos/id/240/100/100",
        "https://picsum.photos/id/241/100/100",
        "https://picsum.photos/id/242/100/100"
    ]));

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Vide le plateau

    allCards.forEach(cardUrl => {
        const card = createCard(cardUrl);
        gameBoard.appendChild(card);
    });

    startTimer(); // Démarre le chronomètre
    document.getElementById('start-button').style.display = 'none'; // Cache lancer
    document.getElementById('recommencer-button').style.display = 'none'; // Cache recommencer
}

// Boutons
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('recommencer-button').addEventListener('click', startGame);
