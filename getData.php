<?php
// $apiKeyRiot = 'a23d3d3f-d47d-4f8e-a9ce-ca2b0cef2cef';
include('config.php');

$errors         	 	 = array();      // array to hold validation errors
$summonerData   	 	 = array();      // array to pass back data
$availableChampions  = array();
$masteryDeck         = array();

$userSummonerRegion = $_POST['summonerRegion'];
$userSummonerName = $_POST['summonerName'];

$search_name = strtolower(str_replace(' ','',$userSummonerName));

$ch = curl_init();

// Get static data version
$static_base_url = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/versions';
$static_key_url = '?api_key='.$apiKeyRiot;
$url = $static_base_url.$static_key_url;
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);
$result = file_get_contents($url);
$result = json_decode($result, true);
$summonerData['version'] = $result[0];

// Get champion data from JSON file
$championList_url = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=blurb,info&api_key='.$apiKeyRiot;
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$championList_url);
$championDataList = file_get_contents($championList_url);
$championDataList = json_decode($championDataList, true);
$summonerData['championStaticData'] = $championDataList['data'];
// $file = file_get_contents('champion-data.json');
// $json = json_decode($file, true);
// $summonerData['championStaticData'] = $json['data'];


// Get summoner Info
$summonerBaseURL = 'https://'.$userSummonerRegion.'.api.pvp.net/api/lol/'.$userSummonerRegion.'/v1.4/summoner/by-name/';
$summonerInfoURL = $summonerBaseURL.$search_name.'?api_key='.$apiKeyRiot;
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$summonerInfoURL);
$result = file_get_contents($summonerInfoURL);
$result = json_decode($result, true);
$summonerData['summonerInfo']['summonerRegion'] = $userSummonerRegion;
$summonerData['summonerInfo']['summonerName'] = $search_name;
$summonerData['summonerInfo']['summonerNameFull'] = $result[$search_name]["name"];
$summonerData['summonerInfo']['summonerId'] = $result[$search_name]["id"];
$summonerData['summonerInfo']['summonerIcon'] = $result[$search_name]["profileIconId"];

// Get champion mastery data
$masteryURL = 'https://'.$userSummonerRegion.'.api.pvp.net/championmastery/location/'.$userSummonerRegion.'1/player/'.$summonerData['summonerInfo']['summonerId'].'/champions?api_key='.$apiKeyRiot;
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$masteryURL);
$result = file_get_contents($masteryURL);
$masteryData = json_decode($result, true);


// Build the mastery list
$goldCount = 0;
$silverCount = 0;
foreach ( $masteryData as $key => $championMastery ) {
  if ( $championMastery['championLevel'] > 4  && ($championMastery['highestGrade'] == "S" || $championMastery['highestGrade'] == "S+") ) {
    foreach ( $summonerData['championStaticData'] as $championStatic ) {
      if ( $championStatic['id'] == $championMastery['championId'] ) {
        $championMastery['championKey'] = $championStatic['key'];
        $championMastery['text']['championName'] = $championStatic['name'];
        $championMastery['text']['championTitle'] = $championStatic['title'];
        $championMastery['text']['blurb'] = $championStatic['blurb'];
        $championMastery['info'] = $championStatic['info'];
        $championMastery['info']['positions'] = $championStatic['positions'];
        $masteryDeck['gold'][$goldCount] = $championMastery;
      }
    }
    $goldCount++;
  } elseif ( $championMastery['championLevel'] > 3 ) {
    foreach ( $summonerData['championStaticData'] as $championStatic ) {
      if ( $championStatic['id'] == $championMastery['championId'] ) {
        $championMastery['championKey'] = $championStatic['key'];
        $championMastery['text']['championName'] = $championStatic['name'];
        $championMastery['text']['championTitle'] = $championStatic['title'];
        $championMastery['text']['blurb'] = $championStatic['blurb'];
        $championMastery['info'] = $championStatic['info'];
        $championMastery['info']['positions'] = $championStatic['positions'];
        $masteryDeck['standard'][$silverCount] = $championMastery;
      }
    }
    $silverCount++;
  }
}


$summonerData['masteryDeck'] = $masteryDeck;

echo json_encode($summonerData);
?>
