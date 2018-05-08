const deckDiv = document.getElementById("deckList");
const leftDiv = document.getElementById("leftHand");
const rightDiv = document.getElementById("rightHand");
const deckContainerDiv = document.getElementById("deckListContainer");
const leftContainerDiv = document.getElementById("leftHandContainer");
const rightContainerDiv = document.getElementById("rightHandContainer");
const shuffle = document.getElementById("shuffle");
const stats = document.getElementById("stats");
const discardDiv = document.getElementById("discard");
const handDiv = document.getElementById("hand");
const shuffleHistory = document.getElementById("shuffleHistory");

var myDeck = [];
let myDiscard = [];
let player1 = {
	name: 'Mike',
	hand: [],

};

// const pokerHand = () => {
	// evaluatePokerHand(player1.hand);
	// console.log(player1.hand);
// }

const discard1 = () => {
	myDiscard.unshift( myDeck.shift() );
	printCardArr(myDeck, 'deckList');
	printCardArr(myDiscard, 'discard');
}

const deal1 = () => {
	player1.hand.unshift( myDeck.shift() );
	printCardArr(myDeck, 'deckList');
	printCardArr(player1.hand, 'hand');
	if (player1.hand.length >= 5) {
		evaluatePokerHand(player1.hand);
	}
}

const openNewDeck = () => {
	let useJokers = false;
	if ( document.getElementById('jokers').checked ) {
		useJokers = true;
	}
	myDeck = getNewDeck(useJokers);

	myDiscard = [];
	player1.hand = [];
	shuffleHistory.innerHTML = '';
	discardDiv.innerHTML = '';
	handDiv.innerHTML = '';
	printCardArr(myDeck, 'deckList');
	leftDiv.innerHTML = '';
	rightDiv.innerHTML = '';
	deckContainerDiv.style.display = 'block';
	shuffle.style.display = 'block';
	// stats.style.display = 'none';

	rightContainerDiv.style.display = 'none';
	leftContainerDiv.style.display = 'none';


}

const overhand = () => {
	myDeck = overhandShuffle( myDeck );
	printCardArr(myDeck, 'deckList');
	leftDiv.innerHTML = '';
	rightDiv.innerHTML = '';
	rightContainerDiv.style.display = 'none';
	leftContainerDiv.style.display = 'none';
	// stats.style.display = 'block';
}

const riffle = () => {
	leftDiv.innerHTML = '';
	rightDiv.innerHTML = '';
	myDeck = riffleShuffle( myDeck );
	rightContainerDiv.style.display = 'block';
	leftContainerDiv.style.display = 'block';
	printCardArr( dealerLeftHand, 'leftHand' );
	printCardArr( dealerRightHand, 'rightHand' );
	printCardArr( myDeck, 'deckList');
	// stats.style.display = 'block';
}

const cut = () => {
	// stats.style.display = 'block';
	leftDiv.innerHTML = '';
	rightDiv.innerHTML = '';
	myDeck = cutDeck( myDeck );
	rightContainerDiv.style.display = 'block';
	leftContainerDiv.style.display = 'block';
	printCardArr( dealerLeftHand, 'leftHand' );
	printCardArr( dealerRightHand, 'rightHand' );
	printCardArr( myDeck, 'deckList');

}

const complete = () => {
	leftDiv.innerHTML = '';
	rightDiv.innerHTML = '';
	myDeck = completeShuffle( myDeck, 7, 2 );
	printCardArr( myDeck, 'deckList');
	rightContainerDiv.style.display = 'none';
	leftContainerDiv.style.display = 'none';
	// stats.style.display = 'block';
}



function getCardHTML(deck) {
	//document.getElementById("deckList").innerHTML = ''; // clear the div
	var cardHTML = '';

	cardHTML += '<ol>';

	for ( var i = 0; i < deck.length; i += 1) {

		var cardColor = getSuitColor(deck[i][1]);
		var cardName = getFriendlyRank(deck[i][0]);
		var cardSuit = getSuitSymbol(deck[i][1]);
		cardHTML += '<li><span style="color: ';
		cardHTML += cardColor;
		cardHTML += ';">';
		if ( cardSuit === 'JOKER') {
			cardHTML += '<b>' + cardSuit + '</b>';
		} else {
			cardHTML += cardName + ' ' + cardSuit;
		}

		cardHTML += '</span></li>'

	}
	//document.getElementById("deckList").innerHTML += cardHTML;
	cardHTML += '</ol>';

	return cardHTML;
}


function printCardArr( arr, elementID ) {
	var cardHTML = getCardHTML( arr );
	document.getElementById( elementID ).innerHTML = cardHTML;

}

// functions that convert card values for printing *************
function getFriendlyRank(numRank) {
	// converts card number to friendly face card names if number is greater than 10
	if ( numRank === 11 ) {
		return 'Jack';
	} else if ( numRank === 12 ) {
		return 'Queen';
	} else if ( numRank === 13 ) {
		return 'King';
	} else if ( numRank === 14 ) {
		return 'Ace';
	} else {
		return numRank;
	}
}

function getSuitSymbol( suit ) {
	// converts card suit to html symbol
	/*
	let mySymbol = '';
	switch ( suite ) {
		case 'hearts':
			mySymbol = '&hearts;';
			break;
		case 'clubs':
			mySymbol = '&clubs;';
			break;
		case 'diamonds':
			mySymbol = '&diams;';
			break;
		case 'spades':
			mySymbol = '&spades;';
			break;
		case 'joker':
			mySymbol = 'Joker';
			break;
		default:
			mySymbol = 'ERROR';

	}

	return mySymbol;
	*/

	if ( suit === 'h' ) {
		return '&hearts;';
	} else if ( suit === 'c' ) {
		return '&clubs;';
	} else if ( suit === 'd' ) {
		return '&diams;';
	} else if ( suit === 's' ) {
		return '&spades;';
	} else if ( suit === 'j' ) {
		return 'JOKER';
	} else {
		return 'ERROR';
	}

}

function getSuitColor(suit) {
	if ( suit === 'h' || suit === 'd' ) {
		return 'red';
	} else if ( suit === 'c' || suit === 's' ){
		return 'black';
	} else {
		return 'orange';
	}
}
// *****************

document.getElementById("leftHandContainer").style.opacity = '0.4';
document.getElementById("rightHandContainer").style.opacity = '0.4';
