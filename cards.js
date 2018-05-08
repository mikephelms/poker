const suits = [ 'h', 'c', 'd', 's' ];
const cutVariance = 20;  // max number of cards a center cut can be off center while riffle shuffling
const riffleCutVariance = 2;  // max number of cards a center cut can be off center while riffle shuffling
const overhandMinCut = 1;  // min number of cards dropped while overhand shuffling
const overhandMaxCut = 11;  // min number of cards dropped while overhand shuffling
let maxRiffleDrop = 3; // max number of cards dropped, per hand, when riffle shuffling

var dealerLeftHand = [];
var dealerRightHand = [];

// returns a random number in the range specified (inclusive of lower and upper)
function getRandomNum( lower, upper ) {
	let range = ( upper - lower ) + 1;
	return Math.floor( Math.random() * range) + lower;
}


function getNewDeck(jokers) {
	var newDeck = [];
	// builds the first two suits in ascending order, starting with 14(Ace), 2, 3...
	for ( var i = 0; i < suits.length/2; i += 1 ) {
		newDeck.push( [ 14, suits[i] ] );  // add Ace out of rank order
		for ( var j = 2; j < 14; j += 1 ) {
			newDeck.push( [ j, suits[i] ] );
		}
	}
	// builds the second two suits in descending order, starting with 13(King), 12(Queen), 11(Jack)...
	for ( var i = 2; i < suits.length; i += 1 ) {
		for ( var j = 13; j > 1; j -= 1 ) {
			newDeck.push( [ j, suits[i] ] );
		}
		newDeck.push( [ 14, suits[i] ] ); // add Ace out of rank order
	}
	if ( jokers ) {
		newDeck.push( [ 0, 'j' ] ); // add Joker
		newDeck.push( [ 0, 'j' ] ); // add Joker
	}
	return newDeck;
}

function riffleShuffle( deck ) {
	let myLeftHand = [];
	let myRightHand = [];
	let shuffledDeck = [];

	var cutLocation = getRandomNum( (deck.length / 2 ) - riffleCutVariance, (deck.length / 2 ) + riffleCutVariance );  // randomly split the deck somewhere near the middle
	myLeftHand = deck.slice( cutLocation, deck.length +1);
	myRightHand = deck.slice( 0, cutLocation );

	// only used when visualizing the cut
	dealerLeftHand = [];
	dealerRightHand = [];
	dealerLeftHand = dealerLeftHand.concat(myLeftHand);
	dealerRightHand = dealerRightHand.concat(myRightHand);

	var startingHand = getRandomNum( 1, 2 );

	if ( startingHand === 1 ) {   // drop right hand first
		while ( myLeftHand.length != 0 || myRightHand.length != 0 ) {
			var rightHandDrop = getRandomNum( 1, maxRiffleDrop );
			while ( rightHandDrop > 0 && myRightHand.length != 0 ) {
				shuffledDeck.unshift( myRightHand.pop());
				rightHandDrop -= 1;
			}

			var leftHandDrop = getRandomNum( 1, maxRiffleDrop );
			while ( leftHandDrop > 0 && myLeftHand.length != 0 ) {
				shuffledDeck.unshift( myLeftHand.pop());
				leftHandDrop -= 1;
			}
		}

	} else {   // drop left hand first
		while ( myLeftHand.length != 0 || myRightHand.length != 0 ) {
			var leftHandDrop = getRandomNum( 1, maxRiffleDrop );
			while ( leftHandDrop > 0 && myLeftHand.length != 0 ) {
				shuffledDeck.unshift( myLeftHand.pop());
				leftHandDrop -= 1;
			}

			var rightHandDrop = getRandomNum( 1, maxRiffleDrop );
			while ( rightHandDrop > 0 && myRightHand.length != 0 ) {
				shuffledDeck.unshift( myRightHand.pop());
				rightHandDrop -= 1;
			}
		}
	}
	return shuffledDeck;
}


const overhandShuffle = ( deck ) => {
	let droppingHand = deck;
	let catchingHand = [];
	let shuffledDeck = [];
	while (droppingHand.length > 0) {
		let randomNum = getRandomNum( overhandMinCut, overhandMaxCut);
		if (randomNum > droppingHand.length) {
			randomNum = droppingHand.length;
		}
		for ( let i = randomNum - 1; i >= 0; i -= 1) {
			catchingHand.unshift(droppingHand.splice(i, 1));
		}
	}
	for ( j in catchingHand ) {
		shuffledDeck[j] = catchingHand[j][0];
	}
	return shuffledDeck;
}


function cutDeck(deck) {
	let myLeftHand = [];
	let myRightHand = [];
	let shuffledDeck = [];
	var cutLocation = getRandomNum( (deck.length / 2 ) - cutVariance, (deck.length / 2 ) + cutVariance );  // randomly split the deck somewhere near the middle
	myLeftHand = deck.slice( cutLocation, deck.length +1);
	myRightHand = deck.slice( 0, cutLocation );

	// only used when visualizing the cut
	dealerLeftHand = [];
	dealerRightHand = [];
	dealerLeftHand = dealerLeftHand.concat(myLeftHand);
	dealerRightHand = dealerRightHand.concat(myRightHand);

	shuffledDeck = myLeftHand.concat( myRightHand );
	return shuffledDeck;
}

// performs at least 7 riffle shuffles and at least 2 overhand shuffles, then cuts the deck in a random spot
const completeShuffle = ( deck, minimumRiffles, minimumOverhands ) => {
	let numOfRiffles = 0;
	let numOfOverhands = 0;

	while ( numOfRiffles < minimumRiffles || numOfOverhands < minimumOverhands ) {
		if ( getRandomNum( 1, 3 ) === 1 ) {
			deck = overhandShuffle( deck );
			numOfOverhands += 1;
		} else {
			deck = riffleShuffle( deck );
			numOfRiffles += 1;
		}
	}
	deck = cutDeck( deck );
	return deck;
}

const getStringCardValue = (cardIntegerValue, isPlural) => {
	let returnString = '';
	console.log(cardIntegerValue);
	console.log(isPlural);
	switch (cardIntegerValue) {
		case 14:
			returnString = 'Ace';
			break;
		case 13:
			returnString = 'King';
			break;
		case 12:
			returnString = 'Queen';
			break;
		case 11:
			returnString = 'Jack';
			break;
		case 10:
			returnString = 'Ten';
			break;
		case 9:
			returnString = 'Nine';
			break;
		case 8:
			returnString = 'Eight';
			break;
		case 7:
			returnString = 'Seven';
			break;
		case 6:
			returnString = 'Six';
			break;
		case 5:
			returnString = 'Five';
			break;
		case 4:
			returnString = 'Four';
			break;
		case 3:
			returnString = 'Three';
			break;
		case 2:
			returnString = 'Two';
			break;
		case 1:
			returnString = 'One';
			break;
		case 0:
			returnString = 'Joker';
			break;
		default:
			returnString = 'error';
	}
	console.log(returnString);
	if (isPlural) {
		if (returnString.toLowerCase() == 'six') {
			returnString += 'es';
		} else {
			returnString += 's';
		}
	}
	return returnString;
}

const getFullSuitName = (suitAbbreviation) => {
	switch (suitAbbreviation) {
		case 'h':
			return 'Hearts';
		case 'c':
			return 'Clubs';
		case 'd':
			return 'Diamonds';
		case 's':
			return 'Spades';
		case 'j':
			return 'Joker';
		default:
			return 'error'
	}
}

// compare two card arrays then return the first that has a higher card at the lowest index
const compareCardValues = (cards1, cards2) => {
	for (var i = 0; i < 5; i++) {
		if (cards1[i][0] > cards2[i][0]) {
			return 1;
		} else if (cards1[i][0] < cards2[i][0]) {
			return 2;
		}
	}
	return 0;
}

// Returns object with best 5 card poker hand
const evaluateHand = ( hand, wilds ) => {
	let handWildCards = [];
	let numOfWilds = 0;
	let pokerResult = {   // object to be returned
		originalHand: hand,
		handWildCards: [],
		pokerTitle: '',
		titleInfo: '',
		titleRank: 0,
		winningCards: [[]],
		winningCardsValues: [],
		winningCardsIndexes: [],
		winningSuit: '',
		kickerCards: [],
		kickerCardsValues: [],
		kickerCardsIndexes: []
	};

	// populate return object elements
	const buildReturnObject = ( winningCards, pokerTitle, titleInfo, titleRank, winningSuit) => {
		pokerResult.handWildCards = handWildCards;
		pokerResult.winningCards = winningCards;
		pokerResult.pokerTitle = pokerTitle;
		pokerResult.titleInfo = titleInfo;
		pokerResult.titleRank = titleRank;
		pokerResult.winningSuit = winningSuit;

		for (var i in pokerResult.winningCards) {
			pokerResult.winningCardsValues.push(pokerResult.winningCards[i][0]);
		}

		let kickersNeeded = 0;
		switch (pokerResult.titleRank) {
			case 1:
				kickersNeeded = 4;
				break;
			case 2:
				kickersNeeded = 3;
				break;
			case 3:
				kickersNeeded = 1;
				break;
			case 4:
				kickersNeeded = 2;
				break;
			case 8:
				kickersNeeded = 1;
				break;
			default:
				break;
		}

		for (var i in hand) {
			let alreadyUsed = false;
			for (var j in pokerResult.winningCards) {
				if (pokerResult.winningCards[j] == hand[i]) {
					alreadyUsed = true;
				}
			}
			for (var j in pokerResult.handWildCards) {
				if (pokerResult.handWildCards[j] == hand[i]) {
					alreadyUsed = true;
				}
			}
			if (!alreadyUsed && kickersNeeded > 0) {
				pokerResult.kickerCards.push(hand[i]);
				kickersNeeded -= 1;
			}
		}

		for (var i in pokerResult.kickerCards) {
			pokerResult.kickerCardsValues.push(pokerResult.kickerCards[i][0]);
		}
	}

	// sort the hand in numerical order
	hand.sort(function(a, b) {
		var avalue = a[0],
			bvalue = b[0];
		if (avalue > bvalue) {
			return -1;
		}
		if (avalue < bvalue) {
			return 1;
		}
		return 0;
	});

	const evaluateStraight = (sortedHand)  => {
		for (var i = 14; i > 4; i--) {
			let straightCount = 0;
			let remainingWilds = numOfWilds;
			let returnResult = {
				isStraight: false,
				cards: [],
				straightToThe: 0
			};
			// checks the current i card and the next 5 to see if straight exists.  flills in the high end and gaps with wilds if possible
			for (var j = 0; j < 5; j++) {
				if ( sortedHand[Object.keys(sortedHand)[i-j]].length == 0 ) {
					if ( remainingWilds > 0 ) {
						straightCount += 1;
						remainingWilds -= 1;
						returnResult.cards.push([i-j, 'w']);
					}
				} else {
					straightCount += 1;
					returnResult.cards.push([i-j, sortedHand[Object.keys(sortedHand)[i-j]][0][1]]);
				}
			}

			if ( straightCount == 5 ) {  // returns highest card if straight
				returnResult.isStraight = true;
				returnResult.straightToThe = i;
				return returnResult;
			} else if ( i == 5 ) {  // returns 0 if no straight in the lowest sequence (5,4,3,2,1)
				returnResult.cards = [];
				return returnResult;
			}
		}
	}

	let handByValue = {
		zeros: [], ones: [], twos: [], threes: [], fours: [], fives: [], sixes: [], sevens:[], eights: [], nines: [], tens: [], elevens: [], twelves: [], thirteens: [], fourteens: []}; // zeros: not used.  added to make the indexing easy

	// used to check if a flush is also a straight
	let heartsByValue = {
		zeros: [], ones: [], twos: [], threes: [], fours: [], fives: [], sixes: [], sevens:[], eights: [], nines: [], tens: [], elevens: [], twelves: [], thirteens: [], fourteens: []}; // zeros: not used.  added to make the indexing easy
	let clubsByValue = {
		zeros: [], ones: [], twos: [], threes: [], fours: [], fives: [], sixes: [], sevens:[], eights: [], nines: [], tens: [], elevens: [], twelves: [], thirteens: [], fourteens: []}; // zeros: not used.  added to make the indexing easy
	let diamondsByValue = {
		zeros: [], ones: [], twos: [], threes: [], fours: [], fives: [], sixes: [], sevens:[], eights: [], nines: [], tens: [], elevens: [], twelves: [], thirteens: [], fourteens: []}; // zeros: not used.  added to make the indexing easy
	let spadesByValue = {
		zeros: [], ones: [], twos: [], threes: [], fours: [], fives: [], sixes: [], sevens:[], eights: [], nines: [], tens: [], elevens: [], twelves: [], thirteens: [], fourteens: []}; // zeros: not used.  added to make the indexing easy
	let handBySuit = {
		hearts: [],
		clubs: [],
		diamonds: [],
		spades: [],
	};
	// ***END declarations and functions***

	// add wilds and jokers to handWildCards. Sort remaining cards into 2 objects: by value and by suit
	for ( var i in hand ) {
		let isWild = false;
		for (var j in wilds ) {   // check card is one of the wilds and add to wild arr
			if ( wilds[j][0] == hand[i][0] && wilds[j][1] == hand[i][1] ) {
				handWildCards.push(hand[i]);
				isWild = true;
			}
		}
		if ( hand[i][0] == 0 ) {  // check if card is a Joker and add to wilds arr
			handWildCards.push(hand[i]);
		}

		//  file card into objects by suit and value IF not wild (so not double counted)
		if (!isWild) {
			// file cards by suit
			if ( hand[i][1] == 'h' ) {
				handBySuit.hearts.push(hand[i]);
			} else if ( hand[i][1] == 'c' ) {
				handBySuit.clubs.push(hand[i]);
			} else if ( hand[i][1] == 'd' ) {
				handBySuit.diamonds.push(hand[i]);
			} else if ( hand[i][1] == 's' ) {
				handBySuit.spades.push(hand[i]);
			}

			// file cards by value
			for (var j = 2; j < 14; j++) {
				if ( hand[i][0] == j ) {
					handByValue[Object.keys(handByValue)[j]].unshift(hand[i]);
				}
			}
			if ( hand[i][0] == 14 ) {   // account for an Ace being 14 AND 1 in a straight
				handByValue.fourteens.unshift(hand[i]);
				handByValue.ones.unshift(hand[i]);
			}
		}
	}

	numOfWilds = handWildCards.length;

	// BEGIN evalute each possible hand logic...

	// check for ***5 OF A KIND***
	let isFiveOfKind = false;
	let fiveOfKindValue = '';
	let fiveOfKindCards = [];

	for (var i = 14; i > 0; i--) {
		if ( handByValue[Object.keys(handByValue)[i]].length >= (5 - numOfWilds) ) {
			fiveOfKindCards = handByValue[Object.keys(handByValue)[i]];
			while (fiveOfKindCards.length < 5) {  // add available wild to the winning hand if needed
				fiveOfKindCards.push([i, 'w']);
			}
			isFiveOfKind = true;
			fiveOfKindValue = i;
			break;
		}
	}

	// check for ***4 OF A KIND***
	let isFourOfKind = false;
	let fourOfKindValue = '';
	let fourOfKindCards = [];

	for (var i = 14; i > 0; i--) {
		if ( handByValue[Object.keys(handByValue)[i]].length >= (4 - numOfWilds) ) {
			fourOfKindCards = handByValue[Object.keys(handByValue)[i]];
			while (fourOfKindCards.length < 4) {  // add available wild to the winning hand if needed
				fourOfKindCards.push([i, 'w']);
			}
			isFourOfKind = true;
			fourOfKindValue = i;
			break;
			}
	}

	// check for ***FLUSH / STRAIGHT FLUSH / ROYAL FLUSH (natual & wild)***
	// 1) sort the cards into arrays by suit
	// 2) check if the suit has five cards in it (use wilds if available/needed)
	// 3) send the cards to evaluateStraight() to check for a Straight FLUSH
	// 4) check if the Straight Flush is a Royal FLUSH
	// 5) compare the highest hand across suits
	// 6) identify Natural Royal Flushes
	let isFlush = false;
	let flushCards = [];
	let isStraightFlush = false;
	let straightFlushCards = [];
	let isRoyalFlushWild = false;
	let royalFlushWildCards = [];
	let isRoyalFlushNatural = false;
	let royalFlushNaturalCards = [];
	let winningSuit = '';

	let isSFHearts = 0;
	let sFCardsHearts = [[-1,'h'],[-1,'h'],[-1,'h'],[-1,'h'],[-1,'h']];
	let isSFClubs = 0;
	let sFCardsClubs = [[-1,'c'],[-1,'c'],[-1,'c'],[-1,'c'],[-1,'c']];
	let isSFDiamonds = 0;
	let sFCardsDiamonds = [[-1,'d'],[-1,'d'],[-1,'d'],[-1,'d'],[-1,'d']];
	let isSFSpades = 0;
	let sFCardsSpades = [[-1,'s'],[-1,'s'],[-1,'s'],[-1,'s'],[-1,'s']];

	let isFHearts = 0;
	let fCardsHearts = [[-1,'x'],[-1,'x'],[-1,'x'],[-1,'x'],[-1,'x']];
	let isFClubs = 0;
	let fCardsClubs = [[-1,'x'],[-1,'x'],[-1,'x'],[-1,'x'],[-1,'x']];
	let isFDiamonds = 0;
	let fCardsDiamonds = [[-1,'x'],[-1,'x'],[-1,'x'],[-1,'x'],[-1,'x']];
	let isFSpades = 0;
	let fCardsSpades = [[-1,'x'],[-1,'x'],[-1,'x'],[-1,'x'],[-1,'x']];

	// hearts
	if (handBySuit.hearts.length >= (5 - numOfWilds)) {
		winningSuit = 'h';
		for ( var i in handBySuit.hearts ) {
			// file cards by value
			for (var j = 2; j < 14; j++) {
				if ( handBySuit.hearts[i][0] == j ) {
					heartsByValue[Object.keys(handByValue)[j]].unshift(handBySuit.hearts[i]);
				}
			}
			if ( handBySuit.hearts[i][0] == 14 ) {   // account for an Ace being 14 AND 1 in a straight
				heartsByValue.fourteens.unshift(handBySuit.hearts[i]);
				heartsByValue.ones.unshift(handBySuit.hearts[i]);
			}
		}
		let heartsFlushHand  = evaluateStraight(heartsByValue);

		if (heartsFlushHand.isStraight && heartsFlushHand.cards[0][0] == 14 ) {  // Royal Flush
			let containsWilds = false;
			for (var j in heartsFlushHand.cards) {  // check if RF uses any wilds
				if (heartsFlushHand.cards[j][1] == 'w') {
					containsWilds = true;
				}
			}

			if (containsWilds) {  //RF with wilds
				isRoyalFlushWild = true;
				royalFlushWildCards = heartsFlushHand.cards;

			} else {  // Natural RF
				isRoyalFlushNatural = true;
				royalFlushNaturalCards = heartsFlushHand.cards;
			}

		} else if (heartsFlushHand.isStraight) {  // Straight Flush
			isStraightFlush = true;
			straightFlushCards = heartsFlushHand.cards;
			isSFHearts = 1;
			sFCardsHearts = heartsFlushHand.cards;

		} else {  // Flush
			isFlush = true;
			isFHearts = 1;
			fCardsHearts = [];
			for (var j = 0; j < numOfWilds; j++) { //use wilds first
				fCardsHearts.push([14,'w']);
			}
			let numCardsNeeded = 5 - fCardsHearts.length;
			for (var k = 0; k < numCardsNeeded; k++) {
				fCardsHearts.push(handBySuit.hearts[k]);
			}
			flushCards = fCardsHearts;
		}
	}

	//clubs
	if (handBySuit.clubs.length >= (5 - numOfWilds)) {
		winningSuit = 'c';
		for ( var i in handBySuit.clubs ) {
			// file cards by value
			for (var j = 2; j < 14; j++) {
				if ( handBySuit.clubs[i][0] == j ) {
					clubsByValue[Object.keys(handByValue)[j]].unshift(handBySuit.clubs[i]);
				}
			}
			if ( handBySuit.clubs[i][0] == 14 ) {   // account for an Ace being 14 AND 1 in a straight
				clubsByValue.fourteens.unshift(handBySuit.clubs[i]);
				clubsByValue.ones.unshift(handBySuit.clubs[i]);
			}
		}
		let clubsFlushHand  = evaluateStraight(clubsByValue);

		if (clubsFlushHand.isStraight && clubsFlushHand.cards[0][0] == 14 ) {  // Royal Flush
			let containsWilds = false;
			for (var j in clubsFlushHand.cards) {  // check if RF uses any wilds
				if (clubsFlushHand.cards[j][1] == 'w') {
					containsWilds = true;
				}
			}

			if (containsWilds) {  //RF with wilds
				isRoyalFlushWild = true;
				royalFlushWildCards = clubsFlushHand.cards;

			} else {  // Natural RF
				isRoyalFlushNatural = true;
				royalFlushNaturalCards = clubsFlushHand.cards;
			}

		} else if (clubsFlushHand.isStraight) {  // Straight Flush
			isStraightFlush = true;
			straightFlushCards = clubsFlushHand.cards;
			isSFClubs = 1;
			sFCardsClubs = clubsFlushHand.cards;

		} else {  // Flush
			isFlush = true;
			isFClubs = 1;
			fCardsClubs = [];
			for (var j = 0; j < numOfWilds; j++) { //use wilds first
				fCardsClubs.push([14,'w']);
			}
			let numCardsNeeded = 5 - fCardsClubs.length;
			for (var k = 0; k < numCardsNeeded; k++) {
				fCardsClubs.push(handBySuit.clubs[k]);
			}
			flushCards = fCardsClubs;
		}
	}

	//diamonds
	if (handBySuit.diamonds.length >= (5 - numOfWilds)) {
		winningSuit = 'd';
		for ( var i in handBySuit.diamonds ) {
			// file cards by value
			for (var j = 2; j < 14; j++) {
				if ( handBySuit.diamonds[i][0] == j ) {
					diamondsByValue[Object.keys(handByValue)[j]].unshift(handBySuit.diamonds[i]);
				}
			}
			if ( handBySuit.diamonds[i][0] == 14 ) {   // account for an Ace being 14 AND 1 in a straight
				diamondsByValue.fourteens.unshift(handBySuit.diamonds[i]);
				diamondsByValue.ones.unshift(handBySuit.diamonds[i]);
			}
		}
		let diamondsFlushHand  = evaluateStraight(diamondsByValue);

		if (diamondsFlushHand.isStraight && diamondsFlushHand.cards[0][0] == 14 ) {  // Royal Flush
			let containsWilds = false;
			for (var j in diamondsFlushHand.cards) {  // check if RF uses any wilds
				if (diamondsFlushHand.cards[j][1] == 'w') {
					containsWilds = true;
				}
			}

			if (containsWilds) {  //RF with wilds
				isRoyalFlushWild = true;
				royalFlushWildCards = diamondsFlushHand.cards;

			} else {  // Natural RF
				isRoyalFlushNatural = true;
				royalFlushNaturalCards = diamondsFlushHand.cards;
			}

		} else if (diamondsFlushHand.isStraight) {  // Straight Flush
			isStraightFlush = true;
			straightFlushCards = diamondsFlushHand.cards;
			isSFDiamonds = 1;
			sFCardsDiamonds = diamondsFlushHand.cards;

		} else {  // Flush
			isFlush = true;
			isFDiamonds = 1;
			fCardsDiamonds = [];
			for (var j = 0; j < numOfWilds; j++) { //use wilds first
				fCardsDiamonds.push([14,'w']);
			}
			let numCardsNeeded = 5 - fCardsDiamonds.length;
			for (var k = 0; k < numCardsNeeded; k++) {
				fCardsDiamonds.push(handBySuit.diamonds[k]);
			}
			flushCards = fCardsDiamonds;
		}
	}

	//spades
	if (handBySuit.spades.length >= (5 - numOfWilds)) {
		winningSuit = 's';
		for ( var i in handBySuit.spades ) {
			// file cards by value
			for (var j = 2; j < 14; j++) {
				if ( handBySuit.spades[i][0] == j ) {
					spadesByValue[Object.keys(handByValue)[j]].unshift(handBySuit.spades[i]);  //??
				}
			}
			if ( handBySuit.spades[i][0] == 14 ) {   // account for an Ace being 14 AND 1 in a straight
				spadesByValue.fourteens.unshift(handBySuit.spades[i]);
				spadesByValue.ones.unshift(handBySuit.spades[i]);
			}
		}
		let spadesFlushHand  = evaluateStraight(spadesByValue);

		if (spadesFlushHand.isStraight && spadesFlushHand.cards[0][0] == 14 ) {  // Royal Flush
			let containsWilds = false;
			for (var j in spadesFlushHand.cards) {  // check if RF uses any wilds
				if (spadesFlushHand.cards[j][1] == 'w') {
					containsWilds = true;
				}
			}

			if (containsWilds) {  //RF with wilds
				isRoyalFlushWild = true;
				royalFlushWildCards = spadesFlushHand.cards;

			} else {  // Natural RF
				isRoyalFlushNatural = true;
				royalFlushNaturalCards = spadesFlushHand.cards;
			}

		} else if (spadesFlushHand.isStraight) {  // Straight Flush
			isStraightFlush = true;
			straightFlushCards = spadesFlushHand.cards;
			isSFSpades = 1;
			sFCardsSpades = spadesFlushHand.cards;

		} else {  // Flush
			isFlush = true;
			isFSpades = 1;
			fCardsSpades = [];
			for (var j = 0; j < numOfWilds; j++) { //use wilds first
				fCardsSpades.push([14,'w']);
			}
			let numCardsNeeded = 5 - fCardsSpades.length;
			for (var k = 0; k < numCardsNeeded; k++) {
				fCardsSpades.push(handBySuit.spades[k]);
			}
			flushCards = fCardsSpades;
		}
	}

	// compare multiple Striaght Flush hands
	if (isSFClubs + isSFSpades + isSFHearts + isSFDiamonds > 1) {
		if (compareCardValues(sFCardsHearts, sFCardsClubs) == 1) {
			if (compareCardValues(sFCardsHearts, sFCardsDiamonds) == 1) {
				if (compareCardValues(sFCardsHearts, sFCardsSpades) == 1) {
					winningSuit = 'h';
					straightFlushCards = sFCardsHearts;
				} else {
					winningSuit = 's';
					straightFlushCards = sFCardsSpades;
				}
			} else {
				if (compareCardValues(sFCardsDiamonds, sFCardsSpades) == 1) {
					winningSuit = 'd';
					straightFlushCards = sFCardsDiamonds;
				} else {
					winningSuit = 's';
					straightFlushCards = sFCardsSpades;
				}
			}
		} else {
			if (compareCardValues(sFCardsClubs, sFCardsDiamonds) == 1) {
				if (compareCardValues(sFCardsClubs, sFCardsSpades) == 1) {
					winningSuit = 'c';
					straightFlushCards = sFCardsClubs;
				} else {
					winningSuit = 's';
					straightFlushCards = sFCardsSpades;
				}
			} else {
				if (compareCardValues(sFCardsDiamonds, sFCardsSpades) == 1) {
					winningSuit = 'd';
					straightFlushCards = sFCardsDiamonds;
				} else {
					winningSuit = 's';
					straightFlushCards = sFCardsSpades;
				}
			}
		}
	}

	// compare multiple Flush hands
	if (isFClubs + isFSpades + isFHearts + isFDiamonds > 1) {
		if (compareCardValues(fCardsHearts, fCardsClubs) == 1) {
			if (compareCardValues(fCardsHearts, fCardsDiamonds) == 1) {
				if (compareCardValues(fCardsHearts, fCardsSpades) == 1) {
					winningSuit = 'h';
					flushCards = fCardsHearts;
				} else {
					winningSuit = 's';
					flushCards = fCardsSpades;
				}
			} else {
				if (compareCardValues(fCardsDiamonds, fCardsSpades) == 1) {
					winningSuit = 'd';
					flushCards = fCardsDiamonds;
				} else {
					winningSuit = 's';
					flushCards = fCardsSpades;
				}
			}
		} else {
			if (compareCardValues(fCardsClubs, fCardsDiamonds) == 1) {
				if (compareCardValues(fCardsClubs, fCardsSpades) == 1) {
					winningSuit = 'c';
					flushCards = fCardsClubs;
				} else {
					winningSuit = 's';
					flushCards = fCardsSpades;
				}
			} else {
				if (compareCardValues(fCardsDiamonds, fCardsSpades) == 1) {
					winningSuit = 'd';
					flushCards = fCardsDiamonds;
				} else {
					winningSuit = 's';
					flushCards = fCardsSpades;
				}
			}
		}
	}

	// check for ***STRAIGHT***
	let isStraight = false;
	let straightToThe = 0;
	let straightCards = [];

	if (hand.length >= 5) {
		let straightResult = evaluateStraight(handByValue);
		if (straightResult.isStraight) {
			isStraight = true;
			straightToThe = straightResult.straightToThe;
			straightCards = straightResult.cards;
		}
	}

	// check for ***3 OF A KIND***
	let isThreeOfKind = false;
	let threeOfKindValue = '';
	let threeOfKindCards = [];
	let wildsForPairs = numOfWilds;  // don't reuse wilds when evaluating pairs later

	for (var i = 14; i > 0; i--) {
		if ( handByValue[Object.keys(handByValue)[i]].length >= (3 - numOfWilds) ) {
			threeOfKindCards = handByValue[Object.keys(handByValue)[i]];
			while (threeOfKindCards.length < 3) {  // add available wilds to the winning hand if needed
				threeOfKindCards.push([i, 'w']);
				wildsForPairs -= 1;
			}
			isThreeOfKind = true;
			threeOfKindValue = i;
			break;
		}
	}

	// check for ***PAIRS***
	let isPairHigh = false;
	let pairHighValue = '';
	let pairHighCards = [];
	let isPairLow = false;
	let pairLowValue = '';
	let pairLowCards = [];
	let isTwoPair = false;
	let twoPairCards = [];
	let numWildsUsedInPairHigh = 0;  // used so a hand of just 2 wilds does not get considered 2 pair

	for (var i = 14; i > 1; i--) {
		if ( i != threeOfKindValue ) {  // don't evaluate value already associated to a 3 of kind
			if ( isPairHigh && handByValue[Object.keys(handByValue)[i]].length == (2 - wildsForPairs + numWildsUsedInPairHigh) ) {
				isPairLow = true;
				pairLowValue = i;
				pairLowCards = handByValue[Object.keys(handByValue)[i]];
				while (pairLowCards.length < 2) {  // add available wild to the winning hand if needed
					pairLowCards.push([i, 'w']);
				}
				break;
			} else if ( !isPairHigh && handByValue[Object.keys(handByValue)[i]].length >= (2 - wildsForPairs) ) {
				isPairHigh = true;
				pairHighValue = i;
				if (handByValue[Object.keys(handByValue)[i]].length > 2) {
					for (var j = 0; j < 2; j++) {
						pairHighCards.push(handByValue[Object.keys(handByValue)[i]][j]);
					}
				} else {
					pairHighCards = handByValue[Object.keys(handByValue)[i]];
				}

				while (pairHighCards.length < 2) {  // add available wild to the winning hand if needed
					pairHighCards.push([i, 'w']);
					numWildsUsedInPairHigh += 1;
				}
			}
		}
	}

	if (isPairHigh && isPairLow) {
		isTwoPair = true;
		twoPairCards = twoPairCards.concat(pairHighCards, pairLowCards);
	}

	// check for ***FULL HOUSE***
	let isFullHouse = false;
	let fullHouseCards = [];

	if (isPairHigh && isThreeOfKind) {
		isFullHouse = true;
		fullHouseCards = fullHouseCards.concat(threeOfKindCards, pairHighCards);
	}

	// check for ***HIGH CARD***
	let highCardValue = 0;
	let highCardCard = [];

	if (numOfWilds != 0) {
		highCardValue = 14;
		highCardCard.push([14, 'w']);
	} else {
		highCardValue = hand[0][0];
		highCardCard.push(hand[0]);
	}

	// let mydebugger = [
	// 	['isRoyalFlushNatural: ',isRoyalFlushNatural],
	// 	['isFiveOfKind: ',isFiveOfKind],
	// 	['isRoyalFlushWild: ',isRoyalFlushWild],
	// 	['isStraightFlush: ',isStraightFlush],
	// 	['isFourOfKind: ',isFourOfKind],
	// 	['isFullHouse: ',isFullHouse],
	// 	['isFlush: ',isFlush],
	// 	['isStraight: ',isStraight],
	// 	['isThreeOfKind: ',isThreeOfKind],
	// 	['isTwoPair: ',isTwoPair],
	// 	['isPairHigh: ',isPairHigh],
	// 	['isPairLow: ',isPairLow]
	// ];
	// console.log('debug');
	// console.log(mydebugger);

	if (isRoyalFlushNatural) {
		buildReturnObject(royalFlushNaturalCards, 'Royal Flush', 'Natural', 12, getFullSuitName(winningSuit));
		return pokerResult;
	} else if (isFiveOfKind) {
		buildReturnObject(fiveOfKindCards, 'Five of a Kind', getStringCardValue(fiveOfKindValue, true), 11);
		return pokerResult;
	} else if (isRoyalFlushWild) {
		buildReturnObject(royalFlushWildCards, 'Royal Flush', 'Wild', 10, getFullSuitName(winningSuit));
		return pokerResult;
	} else if (isStraightFlush) {
		buildReturnObject(straightFlushCards, 'Straight Flush', 'to the ' + getStringCardValue(straightFlushCards[0][0]), 9, getFullSuitName(winningSuit));
		return pokerResult;
	} else if (isFourOfKind) {
		buildReturnObject(fourOfKindCards, 'Four of a Kind', getStringCardValue(fourOfKindValue, true), 8);
		return pokerResult;
	} else if (isFullHouse) {
		buildReturnObject(fullHouseCards, 'Full House', getStringCardValue(threeOfKindValue, true) + ' over ' + getStringCardValue(pairHighValue, true), 7);
		return pokerResult;
	} else if (isFlush) {
		buildReturnObject(flushCards, 'Flush', 'to the ' + getStringCardValue(flushCards[0][0]), 6, getFullSuitName(winningSuit));
		return pokerResult;
	} else if (isStraight) {
		buildReturnObject(straightCards, 'Straight', 'to the ' + getStringCardValue(straightToThe, false), 5);
		return pokerResult;
	} else if (isThreeOfKind) {
		buildReturnObject(threeOfKindCards, 'Three of a Kind', getStringCardValue(threeOfKindValue, true), 4);
		return pokerResult;
	} else if (isTwoPair) {
		buildReturnObject(twoPairCards, 'Two Pair', getStringCardValue(pairHighValue, true) + ' and ' + getStringCardValue(pairLowValue, true), 3);
		return pokerResult;
	} else if (isPairHigh) {
		buildReturnObject(pairHighCards, 'Pair', getStringCardValue(pairHighValue, true), 2);
		return pokerResult;
	} else {
		buildReturnObject(highCardCard, 'High Card', getStringCardValue(highCardValue), 1);
		return pokerResult;
	}
}
