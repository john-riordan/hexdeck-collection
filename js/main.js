var summonerData = {};
var requestData = {};
var w = window.innerWidth;
var h = window.innerHeight;
var wInner = w - 260;
var hInner = h - 370;

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

          var goldCardCount = requestData.masteryDeck.gold.length;
          var standardCardCount = requestData.masteryDeck.standard.length;
          var cardCount = goldCardCount + standardCardCount;
          var count = 0;
          var cardHeight = 0;

          $.each(requestData.masteryDeck.gold, function (i, ob) {
            var ad = ob.info.attack;
            var ap = ob.info.magic;
            var def = ob.info.defense;

            cardHeight = cardCount - count;

            $('.cards').append('\
              <div class="card card-gold" style="z-index: '+cardHeight+'">\
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
                      '+(ad > 0 ? '<div class="stat stat-ad"><div class="stat-value text-gradient">'+ad+'</div></div>': '')+'\
                      '+(ap > 0 ? '<div class="stat stat-ap"><div class="stat-value text-gradient">'+ap+'</div></div>': '')+'\
                    </div>\
                    <div class="stats-right">\
                      '+(def > 0 ? '<div class="stat stat-def"><div class="stat-value text-gradient">'+def+'</div></div>': '')+'\
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
                  <svg class="card-outer-frame" x="0px" y="0px" viewBox="0 0 270 380" style="enable-background:new 0 0 270 380;" xml:space="preserve">\
                  <g>\
                    <path class="st0" d="M238.7,2L268,31.3v317.3L238.7,378H31.3L2,348.7V31.3L31.3,2H238.7 M239.5,0h-209L0,30.5v319L30.5,380h209 l30.5-30.5v-319L239.5,0L239.5,0z"/>\
                  </g>\
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
              <div class="card card-standard" style="z-index: '+cardHeight+'">\
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
                      '+(ad > 0 ? '<div class="stat stat-ad"><div class="stat-value text-gradient">'+ad+'</div></div>': '')+'\
                      '+(ap > 0 ? '<div class="stat stat-ap"><div class="stat-value text-gradient">'+ap+'</div></div>': '')+'\
                    </div>\
                    <div class="stats-right">\
                      '+(def > 0 ? '<div class="stat stat-def"><div class="stat-value text-gradient">'+def+'</div></div>': '')+'\
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
                  <svg class="card-outer-frame" x="0px" y="0px" viewBox="0 0 270 380" style="enable-background:new 0 0 270 380;" xml:space="preserve">\
                  <g>\
                    <path class="st0" d="M238.7,2L268,31.3v317.3L238.7,378H31.3L2,348.7V31.3L31.3,2H238.7 M239.5,0h-209L0,30.5v319L30.5,380h209 l30.5-30.5v-319L239.5,0L239.5,0z"/>\
                  </g>\
                  </svg>\
                </div>\
              </div>\
            ');

            count++;
          });

          Deck.init();

          $('#icon').attr('src', 'http://ddragon.leagueoflegends.com/cdn/'+requestData.version+'/img/profileicon/'+requestData.summonerInfo.summonerIcon+'.png');
          $('.summoner-name').text(requestData.summonerInfo.summonerNameFull);

      });
  });
