<?php

function get_heroes() {

    // OK cool - let's create a new cURL resource handle
    $ch = curl_init();
    // Set URL to download
    curl_setopt($ch, CURLOPT_URL, 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001?language=en&key=E6E56C758A6519F6B70ED041CDC6FF4F');
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

function get_matches() {

    // OK cool - let's create a new cURL resource handle
    $ch = curl_init();
    // Set URL to download
    curl_setopt($ch, CURLOPT_URL, 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?matches_requested=14&account_id=139716592&key=E6E56C758A6519F6B70ED041CDC6FF4F');
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

$heroes = get_heroes()->result->heroes;
$matches = get_matches()->result->matches;

$response = array(
    'heroes' => $heroes,
    'matches' => $matches,
);

// encode them and return it
echo json_encode($response);


?>