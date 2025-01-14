<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize form data
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Validation checks
    if (empty($name) || empty($email) || empty($message)) {
        echo "All fields are required.";
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    // Email details
    $to = "your-email@example.com"; // Replace with your email address
    $subject = "New Contact Form Submission from Waste2Wealth";
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    // Attempt to send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Error: Unable to send your message. Please try again later.";
    }
}
?>
