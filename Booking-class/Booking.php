<?php
$host = "localhost";
$username = "root";       // XAMPP default
$password = "";           // Leave empty unless you've set one
$database = "helarasa";   // your database name

// Connect to database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Form submitted?
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["stmt"])) {
    // Get and escape inputs
    $full_name = $conn->real_escape_string($_POST["full_name"]);
    $email = $conn->real_escape_string($_POST["email"]);
    $phone_number = $conn->real_escape_string($_POST["phone_number"]);
    $class_date_time = $conn->real_escape_string($_POST["class_date_time"]);
    $notes = $conn->real_escape_string($_POST["notes"]);

    // Insert query - matches your table "classbooking"
    $sql = "INSERT INTO classbooking (full_name, email, phone_number, class_date_time, notes)
            VALUES ('$full_name', '$email', '$phone_number', '$class_date_time', '$notes')";

    if ($conn->query($sql) === TRUE) {
        echo "<h2 style='color: green;'>Booking successful! Thank you, $full_name.</h2>";
    } else {
        echo "<h2 style='color: red;'>Error: " . $conn->error . "</h2>";
    }
}

$conn->close();
?>
