<?php
// Database connection
$conn = new mysqli('localhost', 'root', '', 'waste2wealth');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$email = $_POST['email'];
$password = $_POST['password'];

// Check if email exists
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Verify password
    if (password_verify($password, $user['password'])) {
        echo "success"; // Login successful
    } else {
        echo "Invalid password!";
    }
} else {
    echo "Email not found!";
}

// Close connection
$stmt->close();
$conn->close();
?>
