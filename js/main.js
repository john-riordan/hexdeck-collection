var summonerData = {};
var requestData = {};
var w = window.innerWidth;
var h = window.innerHeight;
var wInner = w - 260;
var hInner = h - 370;

$('.click-try').on('click', function() {
  $('input[name="summonerName"]').val($('.try-value').text());
  $('#summonerForm').submit();
});

$('input[name="summonerName"]').keyup(function(){
    if ($(this).val().length > 2) {
      $('.summoner-submit-frame').addClass('show');
    } else {
      $('.summoner-submit-frame').removeClass('show');
    }
});

$('#summonerForm').submit(function(event) {

      $("body").addClass('cards-loading');

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
      })
      .done(function(masteryData) {
          $('body').removeClass('cards-loading');
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
                  <div class="card-difficulty" title="Cost/Difficulty Value">\
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
                  <div class="card-difficulty" title="Cost/Difficulty Value">\
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
