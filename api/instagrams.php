<?php

// check if the min image id is set, if so put it on the endpoint
if($_GET['minid']){
    define('MINID', "&min_id=" + $_GET['minid']);
}

function get_instagram() {

    // OK cool - let's create a new cURL resource handle
    $ch = curl_init();
    // Set URL to download
    curl_setopt($ch, CURLOPT_URL, 'https://api.instagram.com/v1/users/346897065/media/recent/?client_id=04923db14a2a4a70b84c2dc23cd9096c&count=4' + MINID);
    // Include header in result? (0 = yes, 1 = no)
    curl_setopt($ch, CURLOPT_HEADER, 0);
    // Should cURL return or print out the data? (true = return, false = print)
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // Timeout in seconds
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    // Download the given URL, and return output
    $output = curl_exec($ch);
    // Close the cURL resource, and free system resources
    curl_close($ch);
    return json_decode($output);
}

$feed = get_instagram()->data;

// add our decoded objects together
$response = array(
    'instagrams' => $feed
);

// encode them and return it
echo json_encode($response);


?>