<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>LA Free Tennis Map</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
		<link rel="stylesheet" href="style.css"/>
	</head>
	<body>
		<div class="container h-100">
			<div class="row align-items-center h-100">
				<div class="col text-center">
					<div class="card">
						<div class="card-body">
							<div id="map">
							</div>
							Locations taken from : <a href="https://www.laparks.org/sports/tennis/free" target="_blank">LA Parks</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script>
<?php
require 'vendor/autoload.php';

use Google\Cloud\Firestore\FirestoreClient;

$firestore = new FirestoreClient([
    'keyFilePath' => '~/LAFreeTennis-9ae6b6289479.json'
]);

$locationsRef = $firestore->collection('locations');
$documents = $locationsRef->documents();
$locations = array();
foreach ($documents as $document) {
    $documentData = $document->data();
    $obj = array(
        'name' => $documentData['name'],
        'url' => $documentData['url'],
        'address' => $documentData['address'],
        'position' => array(
            'lat' => $documentData['position']->latitude(),
            'lng' => $documentData['position']->longitude()
        )
    );
    $locations[] = $obj;
}
echo 'var locations = ' . json_encode($locations) . ';';
?>
		</script>
		<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha384-vk5WoKIaW/vJyUAd9n/wmopsmNhiy+L2Z+SBxGYnUkunIxVxAv/UtMOhba/xskxh" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPIM_YYYV45GMnsnTGmydyGUGBFAwWPyc"></script>
		<script src="index.js"></script>
	</body>
</html>