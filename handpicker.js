let dealNumOfCards = 7;
let dealNumOfWilds = 2;

let myWilds = [
  // [8, 's'],
  // [8, 'd'],
  // [8, 'h'],
  // [8, 'c']
  ];

var myHand = [];
var resetBtn = document.getElementById('resetBtn');
var handDiv = document.getElementById('handDiv');
var pokerDiv = document.getElementById('pokerDiv');
var randomHandDiv = document.getElementById('randomHand');

let write2dCardArr = (cardArr) => {
  let returnHTML = '';
  for (var i in cardArr) {
    let cardMarkup = '<div class="small-card ';
    if (cardArr[i][1] == 'h' || cardArr[i][1] == 'd') {
      cardMarkup += 'hearts">';
    } else if (cardArr[i][1] == 'c' || cardArr[i][1] == 's') {
      cardMarkup += 'spades">';
    } else if (cardArr[i][1] == 'j' || cardArr[i][1] == 'w') {
      cardMarkup += 'jokers">';
    }

    if (cardArr[i][0] == 0) {
      cardMarkup += 'j';
    } else if (cardArr[i][0] == 11) {
      cardMarkup += 'J';
    } else if (cardArr[i][0] == 12) {
      cardMarkup += 'Q';
    } else if (cardArr[i][0] == 13) {
      cardMarkup += 'K';
    } else if (cardArr[i][0] == 14 || cardArr[i][0] == 1) {
      cardMarkup += 'A';
    } else {
      cardMarkup += cardArr[i][0];
    }
    cardMarkup += '<br>';

    if (cardArr[i][1] == 'h') {
      cardMarkup += '&hearts;';
    } else if (cardArr[i][1] == 'c') {
      cardMarkup += '&clubs;';
    } else if (cardArr[i][1] == 'd') {
      cardMarkup += '&diams;';
    } else if (cardArr[i][1] == 's') {
      cardMarkup += '&spades;';
    } else if (cardArr[i][1] == 'j') {
      cardMarkup += '&cir;';
    } else if (cardArr[i][1] == 'w') {
      cardMarkup += 'W';
    }
    cardMarkup += '</div>';
    returnHTML += cardMarkup;
  }
  return returnHTML
}

function cardClick(clicked_id) {
    let clickedSuit = "";
    let clickedSuitSymbol = "";
    let parsedSuit = clicked_id.substring(2,3).toLowerCase();
    let clickedValue = parseInt(clicked_id.substring(0,2));

    resetBtn.style.display = 'block';

    if ( parsedSuit === 'h' ) {
      clickedSuit = 'h';
      clickedSuitSymbol = '&hearts;';
    } else if ( parsedSuit === 's' ) {
      clickedSuit = 's';
      clickedSuitSymbol = '&spades;';
    } else if ( parsedSuit === 'd' ) {
      clickedSuit = 'd';
      clickedSuitSymbol = '&diams;';
    } else if ( parsedSuit === 'c' ) {
      clickedSuit = 'c';
      clickedSuitSymbol = '&clubs;';
    } else if ( parsedSuit === 'j' ) {
      clickedSuit = 'j';
      clickedSuitSymbol = 'Jkr';
    }

    let clickedCard = [clickedValue, clickedSuit];
    myHand.push( clickedCard );
    let clickedCard2d = [clickedCard];
    handDiv.innerHTML += write2dCardArr(clickedCard2d);

    let evaluatedHand = evaluateHand( myHand, myWilds );
    console.log(evaluatedHand);

    pokerDiv.innerHTML = buildPokerHandHTML(evaluatedHand);
}

const buildPokerHandHTML = (evaluatedHand) => {
  let resultHTML = '<h3 class="win">' + evaluatedHand.pokerTitle + ': ';
  if (evaluatedHand.winningSuit != undefined) {
    resultHTML += evaluatedHand.winningSuit + ' ';
  }
  resultHTML += evaluatedHand.titleInfo + '</h3>';
  resultHTML += 'Winning Cards:<br>';
  resultHTML += write2dCardArr(evaluatedHand.winningCards) + '<br>';
  resultHTML += '<span class="subText">Winning Card Values: ' + evaluatedHand.winningCardsValues + '</span><br><br>';
  resultHTML += 'Kicker Cards:<br>';
  resultHTML += write2dCardArr(evaluatedHand.kickerCards) + '<br>';
  resultHTML += '<span class="subText">Kicker Card Values: ' + evaluatedHand.kickerCardsValues + '</span><br><br>';
  resultHTML += 'Hand Wild Cards:<br>';
  resultHTML += write2dCardArr(evaluatedHand.handWildCards) + '<br>';

  return resultHTML;
}

const discardHand = () => {
  myHand = [];
  resetBtn.style.display = 'none';
  handDiv.innerHTML = '';
  pokerDiv.innerHTML = '';
}

const getRandomWildCards = (numOfWildCards) => {
  let returnArr = [];
  for (var i = 0; i < numOfWildCards; i++) {
    let randomWildValue = getRandomNum(2,14);
    let randomWildSuit = '';
    let nRando = getRandomNum(1,4);
    switch (nRando) {
      case 1:
        randomWildSuit = 'h';
        break;
      case 2:
        randomWildSuit = 'c';
        break;
      case 3:
        randomWildSuit = 'd';
        break;
      case 4:
        randomWildSuit = 's';
        break;
      default:
        break;
    }
    returnArr.push([randomWildValue,randomWildSuit]);
  }
  return returnArr;
}

const dealRandomHand = () => {
  randomHandDiv.innerHTML = '';
  let myRandomHand = [];
  let myDeck = getNewDeck(true);
  let myRandomWilds = getRandomWildCards(dealNumOfWilds);
  myDeck = completeShuffle(myDeck,10,4);

  for (var i = 0; i < dealNumOfCards; i++) {
    myRandomHand.push(myDeck[i]);
  }
  // console.log(myDeck);
  // console.log(myRandomHand);
  randomHandDiv.innerHTML += '<hr>'
  randomHandDiv.innerHTML += 'Hand:<br>';
  randomHandDiv.innerHTML += write2dCardArr(myRandomHand) + '<br>';
  randomHandDiv.innerHTML += 'These are Wild:<br>';
  randomHandDiv.innerHTML += write2dCardArr(myRandomWilds);
  randomHandDiv.innerHTML += '<hr>'
  let myPokerHand = evaluateHand(myRandomHand, myRandomWilds);
  randomHandDiv.innerHTML += buildPokerHandHTML(myPokerHand);
  console.log(myPokerHand);
}
