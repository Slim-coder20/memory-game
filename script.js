
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

}

