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

        <form id="summonerForm" action="">
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
        </form>


        <div class="container">
          <ul class="cards">

          </ul>
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
            ga('create','UA-XXXXX-X','auto');ga('send','pageview');
        </script>
    </body>
</html>
