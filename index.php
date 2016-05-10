<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <div class="summoner-form-frame">
          <form id="summonerForm" class="summoner-form" action="">
            <img class="hexdeck-icon" src="/img/hexdeck-icon.svg" alt="" />
            <h1 class="form-title text-gradient">Hexdeck Collection</h1>
            <p>Master Champions in League and earn their cards! If you manage. Once you've reached mastery level 4 youll earn thier 'base' card. If you manage to hit mastery 5 and earn an S on them you'll earn a <strong>rare</strong> version of the card. Start collecting!</p>
            <div>
              <label for="region">Region</label>
              <select class="" name="summonerRegion">
                <option value="na">NA</option>
                <option value="euw">EUW</option>
                <option value="eune">EUNE</option>
                <option value="br">BR</option>
                <option value="oce">OCE</option>
                <option value="lan">LAN</option>
                <option value="las">LAS</option>
                <option value="kr">KR</option>
                <option value="ru">RU</option>
                <option value="tr">TR</option>
                <option value="jp">JP</option>
              </select>
            </div>
            <div>
              <label for="summonerName">Summoner Name</label>
              <input type="text" name="summonerName" id="" placeholder="Summoner name">
            </div>
            <div>
              <div class="summoner-submit-frame">
                <input class="summoner-submit" type="submit" value="Submit">
              </div>

            </div>
          </form>
        </div>


        <div class="cards"></div>

        <div class="sidepanel-frame">
          <div class="sidepanel">
            <div class="summoner-icon-frame">
              <div class="summoner-icon">
                <img id="icon" alt="" />
              </div>
                <svg class="summoner-icon-shape" x="0px" y="0px" viewBox="0 0 144 73.3" style="enable-background:new 0 0 144 73.3;" xml:space="preserve">
              	<path class="inner" d="M10.6,72.3C4.3,61.5,1,49.2,1,36.6C1,24.1,4.3,11.8,10.6,1h122.8c6.3,10.8,9.6,23.1,9.6,35.6 c0,12.5-3.3,24.9-9.6,35.6H10.6z"/>
              	<path class="outer" d="M132.8,2c6,10.5,9.2,22.5,9.2,34.6c0,12.2-3.2,24.1-9.2,34.7H11.2C5.2,60.8,2,48.8,2,36.6 	C2,24.5,5.2,12.5,11.2,2H132.8 M134,0H10C3.7,10.7,0,23.3,0,36.6C0,50,3.7,62.6,10,73.3H134c6.4-10.7,10-23.3,10-36.7 C144,23.3,140.3,10.7,134,0L134,0z"/>
              </svg>
            </div>
            <h2 class="summoner-name text-gradient"></h2>
            <div class="card-count">
              <div class="count-all">
                <div class="count-title">Cards you've collected</div>
                <div class="value text-gradient"></div>
              </div>
              <div class="count-rares">
                <div class="count-title">Rares you've collected</div>
                <div class="value text-gradient"></div>
              </div>
            </div>
          </div>
        </div>


        <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.12.0.min.js"><\/script>')</script>
        <script src="js/min/main-min.js"></script>

        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-46301793-5','auto');ga('send','pageview');
        </script>
    </body>
</html>
