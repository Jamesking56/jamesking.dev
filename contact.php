<?php

// Was it a post request?
if($_SERVER['REQUEST_METHOD'] == "POST") {
    // Does it have the correct submission data?
    $name = filter_input(INPUT_POST, "name");
    $email = filter_input(INPUT_POST, "email");
    $message = filter_input(INPUT_POST, "message");

    if (!empty($name) && !empty($email) && !empty($message)) {
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