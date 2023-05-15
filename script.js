//main 
//didnt know any other way to this

var cardImages = {
    "2♠": "2_of_spades.png",
    "3♠": "3_of_spades.png",
    "4♠": "4_of_spades.png",
    "5♠": "5_of_spades.png",
    "6♠": "6_of_spades.png",
    "7♠": "7_of_spades.png",
    "8♠": "8_of_spades.png",
    "9♠": "9_of_spades.png",
    "10♠": "10_of_spades.png",
    "J♠": "jack_of_spades.png",
    "Q♠": "queen_of_spades.png",
    "K♠": "king_of_spades.png",
    "A♠": "ace_of_spades.png",
    "2♥": "2_of_hearts.png",
    "3♥": "3_of_hearts.png",
    "4♥": "4_of_hearts.png",
    "5♥": "5_of_hearts.png",
    "6♥": "6_of_hearts.png",
    "7♥": "7_of_hearts.png",
    "8♥": "8_of_hearts.png",
    "9♥": "9_of_hearts.png",
    "10♥": "10_of_hearts.png",
    "J♥": "jack_of_hearts.png",
    "Q♥": "queen_of_hearts.png",
    "K♥": "king_of_hearts.png",
    "A♥": "ace_of_hearts.png",
    "2♦": "2_of_diamonds.png",
    "3♦": "3_of_diamonds.png",
    "4♦": "4_of_diamonds.png",
    "5♦": "5_of_diamonds.png",
    "6♦": "6_of_diamonds.png",
    "7♦": "7_of_diamonds.png",
    "8♦": "8_of_diamonds.png",
    "9♦": "9_of_diamonds.png",
    "10♦": "10_of_diamonds.png",
    "J♦": "jack_of_diamonds.png",
    "Q♦": "queen_of_diamonds.png",
    "K♦": "king_of_diamonds.png",
    "A♦": "ace_of_diamonds.png",
    "2♣": "2_of_clubs.png",
    "3♣": "3_of_clubs.png",
    "4♣": "4_of_clubs.png",
    "5♣": "5_of_clubs.png",
    "6♣": "6_of_clubs.png",
    "7♣": "7_of_clubs.png",
    "8♣": "8_of_clubs.png",
    "9♣": "9_of_clubs.png",
    "10♣": "10_of_clubs.png",
    "J♣": "jack_of_clubs.png",
    "Q♣": "queen_of_clubs.png",
    "K♣": "king_of_clubs.png",
    "A♣": "ace_of_clubs.png"
  };

//get the value of the card
function getCardValue(rank, suit) {
    switch (rank) {
      case "J":
      case "Q":
      case "K":
        return 10;
      case "A":
        return "Ace";
      default:
        return parseInt(rank);
    }
  }

    //generate a hand for player
var playerHand = 
    generateHand(2)
  ;

    //generate a hand for dealer
var dealerHand = 
    generateHand(2)
  ;
  
  function getHandValue(hand) {
    var total = 0;
    var numAces = 0;
  
    // Loop through each card in the hand
    for (var i = 0; i < hand.length; i++) {
      var card = hand[i];
      var value = getCardValue(card.rank, card.suit);
  
      if (value === "Ace") {
        numAces++;
      } else {
        total += value;
      }
    }
  
    // Add up the value of the aces
    for (var i = 0; i < numAces; i++) {
      if (total + 11 <= 21) {
        total += 11;
      } else {
        total += 1;
      }
    }
  
    return total;
  }
  
  function generateHand(num) {
    var hand = [];
    var suits = ["♠", "♣", "♥", "♦"];
    var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J","Q", "K", "A"];
  
    // Loop through 5 times
    for (var i = 0; i < num; i++) {
      // Pick a random suit
      var suit = suits[Math.floor(Math.random() * suits.length)];
      // Pick a random rank
      var rank = ranks[Math.floor(Math.random() * ranks.length)];
  
      // Add the card to the hand
      hand.push({ rank: rank, suit: suit });
    }
  
    return hand;
  }

  function showHand(hand, container) {
    container.innerHTML = ""; // clear existing cards in container
    for (var i = 0; i < hand.length; i++) {
      var card = hand[i];
      var cardCode = card.rank + card.suit;
      var imagePath = "PNG-cards-1.3/" + cardImages[cardCode];
      var imageElement = document.createElement("img");
      imageElement.style.width = "50px"; // set image width
      imageElement.style.height = "70px"; // set image height
      imageElement.src = imagePath;
      container.appendChild(imageElement);
    }
  }

//debug

  console.log("The value of the Player hand is " + getHandValue(playerHand));
 
  console.log("The value of the Dealer hand is " + getHandValue(dealerHand));
  
  //show points
  var pPoints = document.getElementById("player-points");
  var dPoints = document.getElementById("dealer-points");
  pPoints.innerHTML = getHandValue(playerHand);
  dPoints.innerHTML = getHandValue(dealerHand);

  //show cards for player 
  var playerContainer = document.getElementById("player-hand");
  showHand(playerHand, playerContainer, true);
  
  //show cards for dealer
  var dealerContainer = document.getElementById("dealer-hand");
  showHand(dealerHand, dealerContainer, false);
  

  function hit() {
    var newCard = generateHand(1);
    playerHand.push(newCard[0]);
    showHand(playerHand, playerContainer, true);
   pPoints.innerHTML = getHandValue(playerHand);
    if (getHandValue(playerHand) > 21) {
      showMessage("You busted!");
      setTimeout(function() { location.reload(); }, 2000);
    }
    else if (getHandValue(playerHand) === 21) {
      showMessage("Blackjack!");
      setTimeout(function() { location.reload(); }, 2000);
    }
    else {
      //do nothing
      console.log("The value of the Player hand is " + getHandValue(playerHand));
    }
  }
  
  function stand() {
    var newCard = generateHand(1);
    
    // ...
    while (getHandValue(dealerHand) < 17) {
      dealerHand.push(newCard[0]);
      showHand(dealerHand, dealerContainer, false);
      dPoints.innerHTML = getHandValue(dealerHand);
    }
    if (getHandValue(dealerHand) > getHandValue(playerHand) && getHandValue(dealerHand) < 21) {
      showMessage("Dealer wins!");
      setTimeout(function() { location.reload(); }, 2000);
    }
    else if (getHandValue(dealerHand) === getHandValue(playerHand)) {
      showMessage("It's a tie!");
      setTimeout(function() { location.reload(); }, 2000);
    }
    else {
      showMessage("You win!");
      setTimeout(function() { location.reload(); }, 2000);
    }
  }
  
  function showMessage(msg) {
    var messageElem = document.getElementById("message");
    messageElem.innerHTML = msg;
    messageElem.style.display = "block";
    messageElem.style.opacity = 1;
    setTimeout(function() {
      messageElem.style.opacity = 0;
      setTimeout(function() {
        messageElem.style.display = "none";
      }, 500);
    }, 3000);
  }
  
