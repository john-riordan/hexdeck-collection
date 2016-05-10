var cardCount;
var grabCount = 0;

function Card(cardObject) {
    this.init(cardObject);
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

Card.prototype.audioload = function(aCard) {
    aCard.audioloaded++;
    if( aCard.audioloaded == 2 ) {
        document.body.classList.add( 'loaded' );
        aCard.majesty.play();
        aCard.whoosh.play();
        aCard.bindevents();
        aCard.loop(aCard);
    }
}

Card.prototype.bindevents = function() {
    var self = this;
	this.card.addEventListener( 'mousedown', function(event) {
        self.onmousedown(self, event)
    });
}

Card.prototype.onmousedown = function(aCard, e) {
    grabCount++;
    console.log(grabCount);
    aCard.card.style['z-index'] = cardCount + grabCount;
    aCard.md = true;
    aCard.mx = e.pageX;
    aCard.my = e.pageY;
    aCard.pinx = aCard.cardw / 2;
    aCard.piny = aCard.cardh / 2;
    //pinx = mx - cardx; // to pin to click point
    //piny = my - cardy; // to pin to click point
    aCard.pinxperc = 100 - ( aCard.pinx / aCard.cardw ) * 100;
    aCard.pinyperc = 100 - ( aCard.piny / aCard.cardh ) * 100;
}

Card.prototype.onmouseup = function() {
    // console.log('release');
    this.md = false;
    this.card.className = "";
    this.card.className = "card";
}

Card.prototype.onmousemove = function(e) {
    if ( this.md ) {
        // console.log('move');
        this.mx = e.pageX;
        this.my = e.pageY;
        this.card.className = "card dragging";
    }
}

Card.prototype.onresize = function() {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
}

Card.prototype.loop = function(aCard) {
  requestAnimationFrame(function() {
      aCard.loop(aCard);
  });

	aCard.targetx = aCard.mx - aCard.cardx - aCard.pinx;
	aCard.targety = aCard.my - aCard.cardy - aCard.piny;

	aCard.cardx += aCard.targetx * 0.25;
	aCard.cardy += aCard.targety * 0.25;

	if( aCard.cardx < -aCard.cardw / 2 ) {
		aCard.cardx = -aCard.cardw / 2;
	}
	if( aCard.cardx > aCard.ww - aCard.cardw / 2 ) {
		aCard.cardx = aCard.ww - aCard.cardw / 2;
	}
	if( aCard.cardy < -aCard.cardh / 2 ) {
		aCard.cardy = -aCard.cardh / 2;
	}
	if( aCard.cardy > aCard.wh - aCard.cardh / 2 ) {
		aCard.cardy = aCard.wh - aCard.cardh / 2;
	}

	aCard.targetrx = ( aCard.ocardy - aCard.cardy - aCard.rx ) * 3;
	aCard.targetry = ( aCard.cardx - aCard.ocardx - aCard.ry ) * 3;
	aCard.targetrx = Math.min( aCard.targetrx, 90 );
	aCard.targetrx = Math.max( aCard.targetrx, -90 );
	aCard.targetry = Math.min( aCard.targetry, 90 );
	aCard.targetry = Math.max( aCard.targetry, -90 );

	aCard.rx += aCard.targetrx * 0.1;
	aCard.ry += aCard.targetry * 0.1;

	aCard.targetscale = aCard.md ? 1.2 - aCard.scale : 1 - aCard.scale;
	aCard.scale += aCard.targetscale * 0.2;

	aCard.card.style[ 'transform' ] = 'translate3d(' + aCard.cardx + 'px, ' + aCard.cardy + 'px, 0) rotate(' + aCard.rot + 'deg)';
	aCard.image.style[ 'transform-origin' ] = aCard.pinxperc + '% ' + aCard.pinyperc + '%';
	aCard.image.style[ 'transform' ] = 'scale(' + aCard.scale + ') rotateY(' + aCard.ry + 'deg) rotateX(' + aCard.rx + 'deg)';

	// volume
	aCard.majestyvoltarget = aCard.md ? 0.0 : 0;
	aCard.majestyvol += ( aCard.majestyvoltarget - aCard.majestyvol ) * 0.1;
	aCard.majesty.volume = aCard.majestyvol;

	// volume
	aCard.whooshvoltarget = ( Math.abs( ( aCard.ocardy - aCard.cardy ) ) + Math.abs( ( aCard.ocardx - aCard.cardx ) ) ) * 0.001;
	aCard.whooshvol += ( aCard.whooshvoltarget - aCard.whooshvol ) * 0.1;
	aCard.whoosh.volume = Math.min( aCard.whooshvol, 0.1 );

	aCard.ocardx = aCard.cardx;
	aCard.ocardy = aCard.cardy;
}

Card.prototype.init = function(cardObject) {
    var self = this;

    this.onresize();
    this.card = cardObject;
    this.image = this.card.querySelector( '.card-wrap' );
    this.cardw = 260;
    this.cardh = 370;
    this.cardx = randomIntFromInterval(250,wInner);
    this.cardy = randomIntFromInterval(0,hInner);
    this.rot = randomIntFromInterval(-13,13);
    this.ocardx = this.cardx;
    this.ocardy = this.cardy;
    this.pinx = 0;
    this.piny = 0;
    this.pinxperc = 0;
    this.pinyperc = 0;
    this.targetx = this.cardx;
    this.targety = this.cardy;
    this.rx = 0;
    this.ry = 0;
    this.targetrx = 0;
    this.targetry = 0;
    this.scale = 1;
    this.targetscale = this.scale;
    this.md = false;
    this.mx = this.cardx;
    this.my = this.cardy;
    this.audioloaded = 0;

    this.whooshvol = 0;
    this.whooshvoltarget = 0;
    this.whoosh = new Audio();

    this.whoosh.addEventListener( 'canplaythrough', function() {
        self.audioload(self);
    });
    this.whoosh.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/hs-whoosh.ogg';
    this.whoosh.volume = 0;
    this.whoosh.loop = true;

    this.majestyvol = 0;
    this.majestyvoltarget = 0;
    this.majesty = new Audio();
    this.majesty.addEventListener( 'canplaythrough', function() {
        self.audioload(self);
    });
    this.majesty.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/hs-majesty.ogg';
    this.majesty.volume = 0;
    this.majesty.loop = true;
}
