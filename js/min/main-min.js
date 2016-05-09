var summonerData = {};
var requestData = {};

$(document).ready(function(){
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
              var td = ob.info.true;
              var armor = ob.info.armor;
              var mr = ob.info.mr;

              cardHeight = cardCount - count;

              $('.cards').append('\
                <div class="card card-gold" style="z-index: '+cardHeight+'">\
                  <div class="card-wrap card-image">\
                    <div class="card-main">\
                      <div class="card-main-wrap">\
                        <div class="card-text">\
                          <div class="card-name text-gradient" data-text="'+ob.text.championName+'">'+ob.text.championName+'</div>\
                          <div class="card-title">'+ob.text.championTitle+'</div>\
                          <div class="card-blurb" title="Twisted Fate is an infamous card sharp and swindler who has gambled and charmed his way across much of the known world, earning the enmity and admiration of the rich and foolish alike. He rarely takes things seriously, greeting each day with a mocking ..">Twisted Fate is an infamous card sharp and swindler who has gambled and charmed his way across much of the known world, earning the enmity and admiration of the rich and foolish alike. He rarely takes things seriously, greeting each day with a mocking ...</div>\
                        </div>\
                        <div class="card-artwork" style="background-image: url(img/champions/'+ob.championKey+'_Splash_Centered_0.jpg);"></div>\
                      </div>\
                    </div>\
                    <div class="card-stats">\
                      <div class="stats-left">\
                        '+(ad > 0 ? '<div class="stat"><div class="stat-value ad text-gradient">'+ad+'</div></div>': '')+'\
                        '+(ap > 0 ? '<div class="stat"><div class="stat-value ap text-gradient">'+ap+'</div></div>': '')+'\
                        '+(td > 0 ? '<div class="stat"><div class="stat-value td text-gradient">'+td+'</div></div>': '')+'\
                      </div>\
                      <div class="stats-right">\
                        '+(armor > 0 ? '<div class="stat"><div class="stat-value armor text-gradient">'+armor+'</div></div>': '')+'\
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
              var td = ob.info.true;
              var armor = ob.info.armor;
              var mr = ob.info.mr;

              cardHeight = cardCount - count;

              $('.cards').append('\
                <div class="card card-standard" style="z-index: '+cardHeight+'">\
                  <div class="card-wrap card-image">\
                    <div class="card-main">\
                      <div class="card-main-wrap">\
                        <div class="card-text">\
                          <div class="card-name text-gradient" data-text="'+ob.text.championName+'">'+ob.text.championName+'</div>\
                          <div class="card-title">'+ob.text.championTitle+'</div>\
                          <div class="card-blurb" title="Twisted Fate is an infamous card sharp and swindler who has gambled and charmed his way across much of the known world, earning the enmity and admiration of the rich and foolish alike. He rarely takes things seriously, greeting each day with a mocking ..">Twisted Fate is an infamous card sharp and swindler who has gambled and charmed his way across much of the known world, earning the enmity and admiration of the rich and foolish alike. He rarely takes things seriously, greeting each day with a mocking ...</div>\
                        </div>\
                        <div class="card-artwork" style="background-image: url(img/champions/'+ob.championKey+'_Splash_Centered_0.jpg);"></div>\
                      </div>\
                    </div>\
                    <div class="card-stats">\
                      <div class="stats-left">\
                        '+(ad > 0 ? '<div class="stat"><div class="stat-value ad text-gradient">'+ad+'</div></div>': '')+'\
                        '+(ap > 0 ? '<div class="stat"><div class="stat-value ap text-gradient">'+ap+'</div></div>': '')+'\
                        '+(td > 0 ? '<div class="stat"><div class="stat-value td text-gradient">'+td+'</div></div>': '')+'\
                      </div>\
                      <div class="stats-right">\
                        '+(armor > 0 ? '<div class="stat"><div class="stat-value armor text-gradient">'+armor+'</div></div>': '')+'\
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
        });
    });
});


