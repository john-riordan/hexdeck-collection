var Deck = {
	cardObjects: [],

	init: function() {
    cards = [].slice.call(document.querySelectorAll('.card'));
		cardCount = cards.length;
		console.log(cardCount);
		if (Array.isArray(cards)) {
			for (var i = 0, j = cards.length; i < j; i++) {
        console.log(cards[i]);
				var aCard = new Card(cards[i]);
				this.cardObjects.push(aCard);
			}

			window.addEventListener('mouseup', Deck.onmouseup);
			window.addEventListener('mousemove', Deck.onmousemove);
			window.addEventListener('resize', Deck.onresize);
		}
	},

	onresize: function() {
		for (var i = 0, j = Deck.cardObjects.length; i < j; i++) {
			Deck.cardObjects[i].onresize();
		}
	},

	onmouseup: function() {
		for (var i = 0, j = Deck.cardObjects.length; i < j; i++) {
			Deck.cardObjects[i].onmouseup();
		}
	},

	onmousemove: function(event) {
		for (var i = 0, j = Deck.cardObjects.length; i < j; i++) {
			Deck.cardObjects[i].onmousemove(event);
		}
	}
};
