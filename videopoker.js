let score = 100;
// let game = 'jacks';
let game = 'joker';
// let game = 'deuces';
let myDeck = [];
let myHand = [];
let myPokerResult = {};

let jacksPayout = [
  ['nothing',0,0,0,0,0],
  ['high card',0,0,0,0,0],
  ['pair',1,2,3,4,5],
  ['two pair',2,4,6,8,10],
  ['three of a kind',3,6,9,12,15],
  ['straight',4,8,12,16,20],
  ['flush',6,12,18,24,30],
  ['full house',9,18,27,36,45],
  ['four of a kind',25,50,75,100,125],
  ['straight flush',50,100,150,200,250],
  ['royal flush wild',0,0,0,0,0],
  ['five of a kind',0,0,0,0,0],
  ['royal flush',250,500,750,1000,4000],
];
let jokerPayout = [
  ['nothing',0,0,0,0,0],
  ['high card',0,0,0,0,0],
  ['pair',1,2,3,4,5],
  ['two pair',1,2,3,4,5],
  ['three of a kind',2,4,6,8,10],
  ['straight',3,6,9,12,15],
  ['flush',5,10,15,20,25],
  ['full house',7,14,21,28,35],
  ['four of a kind',17,34,51,68,85],
  ['straight flush',50,100,150,200,250],
  ['royal flush wild',100,200,300,400,500],
  ['five of a kind',200,400,600,800,1000],
  ['royal flush',750,1500,2250,3000,5000],
];

document.addEventListener("keydown",function(e){
  console.log('Key Code (e.which): ' + e.which);
  console.log('Key Name (e.key): ' + e.key);
  if (e.which == 68 || e.which == 48) { // d, D, or 0
    dealHand();
  }
});

const dealHand = () => {
  if (game == 'jacks') {
    myDeck = getNewDeck(false);
  } else if (game == 'joker') {
    myDeck = getNewDeck(true);
  } else if (game == 'deuces') {
    myDeck = getNewDeck(false);
  }

  myDeck = completeShuffle(myDeck, 10, 5);
  console.log(myDeck);

  for (var i = 0; i < 5; i++) {
    myHand.push(myDeck[i]);
  }
  console.log(myHand);
  myPokerResult = evaluateHand(myHand);
  console.log(myPokerResult);
}
