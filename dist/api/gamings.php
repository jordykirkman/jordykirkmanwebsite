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

function get_sc2() {

    // OK cool - let's create a new cURL resource handle
    $ch = curl_init();
    // Set URL to download
    curl_setopt($ch, CURLOPT_URL, 'http://us.battle.net/api/sc2/profile/348276/1/JordyBot/');
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

function get_hero($id) {

    // OK cool - let's create a new cURL resource handle
    $ch = curl_init();
    // Set URL to download
    curl_setopt($ch, CURLOPT_URL, 'https://us.api.battle.net/d3/profile/Jordy-1730/hero/' . $id . '?locale=en_US&apikey=9zyu225weur73jwvz2ebn6ufvfj9w785');
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

function get_d3() {

    // OK cool - let's create a new cURL resource handle
    $ch = curl_init();
    // Set URL to download
    curl_setopt($ch, CURLOPT_URL, 'https://us.api.battle.net/d3/profile/Jordy-1730/?locale=en_US&apikey=9zyu225weur73jwvz2ebn6ufvfj9w785');
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

// $heroes = get_heroes()->result->heroes;
// $matches = get_matches()->result->matches;
// $feed = get_instagram()->data;
$sc2 = get_sc2();
$d3 = get_d3();
$hero = get_hero($d3->lastHeroPlayed);

// add our decoded objects together
$response = array(
    'gaming' => array(
        'id' => 1,
        'heroes' => array($hero),
        // 'matches' => $matches,
        // 'starcraft' => $sc2,
        'diablo' => $d3
    )
);

// encode them and return it
echo json_encode($response);


?>