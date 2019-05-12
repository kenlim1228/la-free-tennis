<?php
require 'vendor/autoload.php';
ini_set('max_execution_time', 300);

use Google\Cloud\Firestore\FirestoreClient;
use Google\Cloud\Core\GeoPoint;
use Sunra\PhpSimple\HtmlDomParser;

$firestore = new FirestoreClient([
    'keyFilePath' => '~/LAFreeTennis-9ae6b6289479.json'
]);

$locationsRef = $firestore->collection('locations');

// get HTML
$html = HtmlDomParser::file_get_html('https://www.laparks.org/sports/tennis/free', false, null, 0);
// get table with list of free courts locations
$table = $html->find('table.table.table-condensed')[0];
// get all rows of table
$trArray = $table->find('tr');
// remove first three rows since they are just header rows
array_shift($trArray);
array_shift($trArray);
array_shift($trArray);
// loop through remaining table rows
foreach($trArray as $tr) {
    // get address
    $address = str_replace('&nbsp;', '', $tr->find('td', 1)->innertext);
    // find firestore document that has the same address
    $query = $locationsRef->where('address', '=', $address);
    $documents = $query->documents();
    $count = 0;
    foreach ($documents as $document) {
        if($document->exists()) {
            $count++;
        }
    }
    // if no document was found, then we geocode
    if($count == 0) {
        $a = $tr->find('td', 0)->find('a')[0];
        $obj = array(
            'name' => $a->innertext,
            'url' => 'https://www.laparks.org' . $a->href,
            'address' => $address
        );
        // returns either GeoPoint or null
        $geopoint = geocode($obj['address']);
        if($geopoint != null) {
            $obj['position'] = $geopoint;
            echo 'Adding ' . print_r($obj) . '<br />';
        } else {
            echo 'No position found for ' . print_r($obj) . '<br />';
        }
        $locationsRef->add($obj);
        sleep(1);
    }
}

function geocode($address){
    $address = urlencode($address);
    $url = "https://maps.googleapis.com/maps/api/geocode/json?address={$address}&key=AIzaSyBPIM_YYYV45GMnsnTGmydyGUGBFAwWPyc";
    // do request to get position
    $resp_json = file_get_contents($url);
    $resp = json_decode($resp_json, true);
    if($resp['status'] == 'OK') {
        $latitude = isset($resp['results'][0]['geometry']['location']['lat']) ? $resp['results'][0]['geometry']['location']['lat'] : null;
        $longitude = isset($resp['results'][0]['geometry']['location']['lng']) ? $resp['results'][0]['geometry']['location']['lng'] : null;
        // if both latitude and longitude is set, we return new geopoint
        if($latitude && $longitude){
            return new GeoPoint($latitude, $longitude);
        } else {
            return null;
        }
    } else {
        return null;
    }
}
?>