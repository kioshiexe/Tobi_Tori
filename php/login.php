<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit('Method Not Allowed');
}

$usernameInput = $_POST['username'] ?? null;
$passwordInput = $_POST['password'] ?? null;

if (!is_string($usernameInput) || !is_string($passwordInput)) {
    header('Location: /html/login.html?error=invalid');
    exit;
}

$username = trim($usernameInput);
$password = $passwordInput;
if ($username === '' || $password === '') {
    header('Location: /html/login.html?error=invalid');
    exit;
}

try {
    $pdo = database_connection();
    $statement = $pdo->prepare(
        'SELECT user_id, username, password FROM `user` WHERE username = :username LIMIT 1'
    );
    $statement->execute(['username' => $username]);
    $user = $statement->fetch();
} catch (PDOException $error) {
    error_log('Login database error: ' . $error->getMessage());
    header('Location: /html/login.html?error=unavailable');
    exit;
}

if (!$user) {
    header('Location: /html/login.html?error=invalid');
    exit;
}

$storedPassword = (string) $user['password'];
$passwordMatches = password_verify($password, $storedPassword);
$needsPasswordUpgrade = !$passwordMatches && hash_equals($storedPassword, $password);

if (!$passwordMatches && !$needsPasswordUpgrade) {
    header('Location: /html/login.html?error=invalid');
    exit;
}

if ($needsPasswordUpgrade) {
    try {
        $upgrade = $pdo->prepare(
            'UPDATE `user` SET password = :password WHERE user_id = :user_id AND password = :old_password'
        );
        $upgrade->execute([
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'user_id' => $user['user_id'],
            'old_password' => $storedPassword
        ]);
    } catch (PDOException $error) {
        error_log('Password hash upgrade failed for user ID ' . $user['user_id'] . ': ' . $error->getMessage());
        header('Location: /html/login.html?error=unavailable');
        exit;
    }
}

start_app_session();
session_regenerate_id(true);
$_SESSION['user_id'] = (int) $user['user_id'];
$_SESSION['username'] = $user['username'];

header('Location: /php/dashboard.php');
exit;