<?php require_once "twitter.php" ?>
<?php

	//PROPERTIES
	//vegaasen.com is defined @ dev.twitter.com / api.twitter.com

	$twitterConsumerKey = '8aUw1zY7zHijo4oosjuAA';
	$twitterConsumerSecret = 'y6iKgFTgA991nLY3eM6lMvL7VpfbRjO20GZA0jm6n8';
	$twitteroAuthToken = '46416547-kUB8HDQyDZUKeioNmQauI2LZDQYYGQRCJ4XierSS6';
	$twitteroAuthSecret = '11VBuPhGXSIAMRblMQlDyB0QWRDgjspgaQfyJ9Mg';
	$twitterOAuthCallBackURL = 'http://www.vegaasen.com/_trial';
	
	
	$twitter = new Twitter($twitterConsumerKey, $twitterConsumerSecret);
	
	$twitter->setOAuthToken($twitteroAuthToken);
	
	$twitter->setOAuthTokenSecret($twitteroAuthSecret);
	$response = $twitter->statusesUserTimeline();
	echo implode('', $response);
?>