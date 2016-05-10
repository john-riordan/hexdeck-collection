var summonerData = {};
var requestData = {};
var w = window.innerWidth;
var h = window.innerHeight;
var wInner = w - 260;
var hInner = h - 370;

$('input[name="summonerName"]').keyup(function(){
    if ($(this).val().length > 2) {
      $('.summoner-submit-frame').addClass('show');
    } else {
      $('.summoner-submit-frame').removeClass('show');
    }
});

$('#summonerForm').submit(function(event) {

      console.log("Summoner form submitted!");

      event.preventDefault();

      userSummonerRegion = $('select[name=summonerRegion]').val();
      userSummonerName = $('input[name=summonerName]').val();
      userSummonerRole = $('select[name=summonerPosition]').val();

      summonerData = {
          'summonerRegion' : userSummonerRegion,
          'summonerName' : userSummonerName,
          'summonerRole' : userSummonerRole,
      };

      $.ajax({
          type        : 'POST',
          url         : 'getData.php',
          data        : summonerData,
          dataType    : 'json',
          encode      : true
      }).done(function(masteryData) {
          $('body').addClass('cards-loaded');
          requestData = masteryData;
          console.log(requestData);

          var goldCardCount = 0;
          var standardCardCount = 0;
          var cardCount = 0;

          if (requestData.masteryDeck.gold) {
            goldCardCount = requestData.masteryDeck.gold.length;
          }
          if (requestData.masteryDeck.standard) {
            standardCardCount = requestData.masteryDeck.standard.length;
          }
          cardCount = goldCardCount + standardCardCount;
          var count = 0;
          var cardHeight = 0;

          $.each(requestData.masteryDeck.gold, function (i, ob) {
            var ad = ob.info.attack;
            var ap = ob.info.magic;
            var def = ob.info.defense;

            cardHeight = cardCount - count;

            $('.cards').append('\
              <div class="card card-gold" data-cdiff="'+ob.info.difficulty+'" style="z-index: '+cardHeight+'">\
                <div class="card-wrap card-image">\
                  <div class="card-main">\
                    <div class="card-main-gold">\
                      <div class="card-main-wrap">\
                        <div class="card-text">\
                          <div class="card-name text-gradient" data-text="'+ob.text.championName+'">'+ob.text.championName+'</div>\
                          <div class="card-title">'+ob.text.championTitle+'</div>\
                          <div class="card-blurb" title="'+ob.text.blurb+'">'+ob.text.blurb+'</div>\
                        </div>\
                        <div class="card-artwork" style="background-image: url(img/champions/'+ob.championKey+'_Splash_Centered_0.jpg);"></div>\
                      </div>\
                    </div>\
                  </div>\
                  <div class="card-stats">\
                    <div class="stats-left">\
                      '+(ad > 0 ? '<div class="stat stat-ad" title="Attack Damage Value"><div class="stat-value text-gradient">'+ad+'</div></div>': '')+'\
                      '+(ap > 0 ? '<div class="stat stat-ap" title="Ability Power Value"><div class="stat-value text-gradient">'+ap+'</div></div>': '')+'\
                    </div>\
                    <div class="stats-right">\
                      '+(def > 0 ? '<div class="stat stat-def" title="Defense Value"><div class="stat-value text-gradient">'+def+'</div></div>': '')+'\
                    </div>\
                  </div>\
                  <div class="card-difficulty">\
                    <div class="card-difficulty-frame">\
                      <div class="difficulty-value">'+ob.info.difficulty+'</div>\
                    </div>\
                  </div>\
                  <div class="card-mastery">\
                    <div class="mastery-icon mastery-5"></div>\
                    <div class="mastery-ribbon"></div>\
                  </div>\
                  <svg class="card-outer-frame" x="0px" y="0px"\ viewBox="0 0 270 380" style="enable-background:new 0 0 270 380;">\
                  	<path d="M230.9,1c0.5,20.8,17.3,37.6,38.1,38.1v302.3c-20.8,0.5-37.6,17.3-38.1,38.1H39.1c-0.5-20.8-17.3-37.6-38.1-38.1V39.1 C21.8,38.6,38.6,21.8,39.1,1H230.9\ M231.9,0H38.1c0,21.1-17.1,38.1-38.1,38.1v304.3c21.1,0,38.1,17.1,38.1,38.1h193.8 c0-21.1,17.1-38.1,38.1-38.1V38.1C248.9,38.1,231.9,21.1,231.9,0L231.9,0z"/>\
                  </svg>\
                </div>\
              </div>\
            ');

            count++;
          });

          $.each(requestData.masteryDeck.standard, function (i, ob) {
            var ad = ob.info.attack;
            var ap = ob.info.magic;
            var def = ob.info.defense;

            cardHeight = cardCount - count;

            $('.cards').append('\
              <div class="card card-standard" data-cdiff="'+ob.info.difficulty+'" style="z-index: '+cardHeight+'">\
                <div class="card-wrap card-image">\
                  <div class="card-main">\
                    <div class="card-main-wrap">\
                      <div class="card-text">\
                        <div class="card-name text-gradient" data-text="'+ob.text.championName+'">'+ob.text.championName+'</div>\
                        <div class="card-title">'+ob.text.championTitle+'</div>\
                        <div class="card-blurb" title="'+ob.text.blurb+'">'+ob.text.blurb+'</div>\
                      </div>\
                      <div class="card-artwork" style="background-image: url(img/champions/'+ob.championKey+'_Splash_Centered_0.jpg);"></div>\
                    </div>\
                  </div>\
                  <div class="card-stats">\
                    <div class="stats-left">\
                      '+(ad > 0 ? '<div class="stat stat-ad" title="Attack Damage Value"><div class="stat-value text-gradient">'+ad+'</div></div>': '')+'\
                      '+(ap > 0 ? '<div class="stat stat-ap" title="Ability Power Value"><div class="stat-value text-gradient">'+ap+'</div></div>': '')+'\
                    </div>\
                    <div class="stats-right">\
                      '+(def > 0 ? '<div class="stat stat-def" title="Defense Value"><div class="stat-value text-gradient">'+def+'</div></div>': '')+'\
                    </div>\
                  </div>\
                  <div class="card-difficulty">\
                    <div class="card-difficulty-frame">\
                      <div class="difficulty-value">'+ob.info.difficulty+'</div>\
                    </div>\
                  </div>\
                  <div class="card-mastery">\
                    <div class="mastery-icon mastery-4"></div>\
                    <div class="mastery-ribbon"></div>\
                  </div>\
                  <svg class="card-outer-frame" x="0px" y="0px"\ viewBox="0 0 270 380" style="enable-background:new 0 0 270 380;">\
                  	<path d="M230.9,1c0.5,20.8,17.3,37.6,38.1,38.1v302.3c-20.8,0.5-37.6,17.3-38.1,38.1H39.1c-0.5-20.8-17.3-37.6-38.1-38.1V39.1 C21.8,38.6,38.6,21.8,39.1,1H230.9\ M231.9,0H38.1c0,21.1-17.1,38.1-38.1,38.1v304.3c21.1,0,38.1,17.1,38.1,38.1h193.8 c0-21.1,17.1-38.1,38.1-38.1V38.1C248.9,38.1,231.9,21.1,231.9,0L231.9,0z"/>\
                  </svg>\
                </div>\
              </div>\
            ');

            count++;
          });

          Deck.init();
          if (count == 0) {
            $('.cards').append('<div class="no-cards"></div>');
          }

          $('.count-all .value').text(count);
          $('.count-rares .value').text(goldCardCount);

          $('#icon').attr('src', 'http://ddragon.leagueoflegends.com/cdn/'+requestData.version+'/img/profileicon/'+requestData.summonerInfo.summonerIcon+'.png');
          $('.summoner-name').text(requestData.summonerInfo.summonerNameFull);

      });
  });


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
    aCard.card.style['z-index'] = cardCount + grabCount;
    aCard.md = true;
    aCard.mx = e.pageX;
    aCard.my = e.pageY;
    aCard.pinx = aCard.cardw / 2;
    aCard.piny = aCard.cardh / 2;
    aCard.pinxperc = 100 - ( aCard.pinx / aCard.cardw ) * 100;
    aCard.pinyperc = 100 - ( aCard.piny / aCard.cardh ) * 100;
}

Card.prototype.onmouseup = function() {
    this.md = false;
}

Card.prototype.onmousemove = function(e) {
    if ( this.md ) {
        this.mx = e.pageX;
        this.my = e.pageY;
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
	aCard.majestyvoltarget = aCard.md ? 0.00 : 0;
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
    this.whoosh.src = '../img/sound-whoosh.ogg';
    this.whoosh.volume = 0;
    this.whoosh.loop = true;

    this.majestyvol = 0;
    this.majestyvoltarget = 0;
    this.majesty = new Audio();
    this.majesty.addEventListener( 'canplaythrough', function() {
        self.audioload(self);
    });
    this.majesty.src = '../img/sound-sprinkle.ogg';
    this.majesty.volume = 0;
    this.majesty.loop = true;
}


var Deck = {
	cardObjects: [],

	init: function() {
    cards = [].slice.call(document.querySelectorAll('.card'));
		cardCount = cards.length;
		if (Array.isArray(cards)) {
			for (var i = 0, j = cards.length; i < j; i++) {
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


