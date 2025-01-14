<?php
// Database Connection
$host = "localhost";
$username = "root"; // Your MySQL username
$password = "";     // Your MySQL password
$dbname = "waste2wealth";

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $location = trim($_POST['location']);
    $user_type = trim($_POST['user-type']);

    // Validate inputs
    if (empty($name) || empty($email) || empty($password) || empty($location) || empty($user_type)) {
        die("All fields are required.");
    }

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format.");
    }

    // Password hashing for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Determine table based on user type
    $table = "";
    if ($user_type === "buyer") {
        $table = "buyers";
    } elseif ($user_type === "seller") {
        $table = "sellers";
    } elseif ($user_type === "admin") {
        $table = "admins";
    } else {
        die("Invalid user type.");
    }

    // Insert user data into the corresponding table
    $stmt = $conn->prepare("INSERT INTO $table (name, email, password, location) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $hashed_password, $location);

    if ($stmt->execute()) {
        echo "<script>alert('Thank you for registering!'); window.location.href = 'index611.html';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
