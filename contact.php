<?php

// Was it a post request?
if($_SERVER['REQUEST_METHOD'] == "POST") {
    // Does it have the correct submission data?
    $name = filter_input(INPUT_POST, "name");
    $email = filter_input(INPUT_POST, "email");
    $message = filter_input(INPUT_POST, "message");

    // Captcha validation
    $postData = [
        'secret' => '6Ld7wBEUAAAAAL25Db70AENf7a8hGnH5XqB9cIEJ',
        'response' => filter_input(INPUT_POST, "g-recaptcha-response"),
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify',
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($postData),
        CURLOPT_RETURNTRANSFER => 1
    ]);
    $response = json_decode(curl_exec($curl), true);

    if (!empty($name) && !empty($email) && !empty($message) && $response['success']) {
        $newMessage = "There has been a contact form submission made on " . date("d/m/Y") . " from " . filter_input(INPUT_SERVER, "REMOTE_ADDR") . ":\n";
        $newMessage .= "\n";
        $newMessage .= "Name: " . $name;
        $newMessage .= "\n";
        $newMessage .= "Email: " . $email;
        $newMessage .= "\n";
        $newMessage .= "Message: " . $message;
        $message = $newMessage;

        mail(
            "contact@jamesking56.uk",
            "Contact form submission",
            $message,
            implode("\n", array(
                "From: noreply@jamesking56.uk",
                "Reply-To: " . $email
            ))
        );
    }

    echo json_encode(array("success" => true));
    exit;
}

header('Location: index.html');