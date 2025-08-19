<?php
/**
 * Contact Form Handler
 * Alternative to FormSubmit.co for self-hosted solution
 */

// Configuration
$recipient_email = 'contact@ai-techart.com';
$site_name = 'AI-TechArt';
$thank_you_page = 'thank-you.html';

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact-form.html');
    exit;
}

// Sanitize and validate input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get and sanitize form data
$topic = sanitize_input($_POST['_subject'] ?? 'General Inquiry');
$first_name = sanitize_input($_POST['first_name'] ?? '');
$last_name = sanitize_input($_POST['last_name'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = sanitize_input($_POST['phone'] ?? 'Not provided');
$company = sanitize_input($_POST['company'] ?? 'Not provided');
$position = sanitize_input($_POST['position'] ?? 'Not provided');
$project_type = sanitize_input($_POST['project_type'] ?? 'Not specified');
$budget_range = sanitize_input($_POST['budget_range'] ?? 'Not specified');
$message = sanitize_input($_POST['message'] ?? '');
$services = isset($_POST['services']) ? implode(', ', array_map('sanitize_input', $_POST['services'])) : 'None selected';
$newsletter = isset($_POST['newsletter_signup']) ? 'Yes' : 'No';
$privacy_accepted = isset($_POST['privacy_accepted']) ? 'Yes' : 'No';

// Validate required fields
$errors = [];

if (empty($first_name)) {
    $errors[] = 'First name is required';
}

if (empty($last_name)) {
    $errors[] = 'Last name is required';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email address is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

if ($privacy_accepted !== 'Yes') {
    $errors[] = 'You must accept the privacy policy';
}

// If there are errors, redirect back with error message
if (!empty($errors)) {
    session_start();
    $_SESSION['form_errors'] = $errors;
    $_SESSION['form_data'] = $_POST;
    header('Location: contact-form.html?error=1');
    exit;
}

// Prepare email content
$email_subject = "[$site_name] New Contact Form Submission: $topic";

$email_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-left: 10px; }
        .message-box { background: white; padding: 15px; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
            <p>Topic: $topic</p>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Name:</span>
                <span class='value'>$first_name $last_name</span>
            </div>
            <div class='field'>
                <span class='label'>Email:</span>
                <span class='value'>$email</span>
            </div>
            <div class='field'>
                <span class='label'>Phone:</span>
                <span class='value'>$phone</span>
            </div>
            <div class='field'>
                <span class='label'>Company:</span>
                <span class='value'>$company</span>
            </div>
            <div class='field'>
                <span class='label'>Position:</span>
                <span class='value'>$position</span>
            </div>
            <div class='field'>
                <span class='label'>Project Type:</span>
                <span class='value'>$project_type</span>
            </div>
            <div class='field'>
                <span class='label'>Budget Range:</span>
                <span class='value'>$budget_range</span>
            </div>
            <div class='field'>
                <span class='label'>Services Interested In:</span>
                <span class='value'>$services</span>
            </div>
            <div class='field'>
                <span class='label'>Newsletter Signup:</span>
                <span class='value'>$newsletter</span>
            </div>
            <div class='message-box'>
                <h3>Message:</h3>
                <p>" . nl2br($message) . "</p>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the contact form at $site_name</p>
            <p>Submission date: " . date('Y-m-d H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $first_name $last_name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mail_sent = mail($recipient_email, $email_subject, $email_body, $headers);

// Auto-reply to sender
if ($mail_sent) {
    $auto_reply_subject = "Thank you for contacting $site_name";
    $auto_reply_body = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
        <h2>Thank you for your message!</h2>
        <p>Dear $first_name,</p>
        <p>I have received your message regarding <strong>$topic</strong> and will review it carefully.</p>
        <p>You can expect a response within 24-48 hours.</p>
        <p>If your matter is urgent, please feel free to send a follow-up email with 'URGENT' in the subject line.</p>
        <br>
        <p>Best regards,<br>
        Demian Lienert<br>
        IT Specialist & AI Expert<br>
        $site_name</p>
    </body>
    </html>
    ";
    
    $auto_reply_headers = "MIME-Version: 1.0" . "\r\n";
    $auto_reply_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $auto_reply_headers .= "From: $site_name <$recipient_email>" . "\r\n";
    
    mail($email, $auto_reply_subject, $auto_reply_body, $auto_reply_headers);
}

// Log submission (optional)
$log_entry = date('Y-m-d H:i:s') . " | $topic | $first_name $last_name | $email | $company\n";
file_put_contents('contact_submissions.log', $log_entry, FILE_APPEND | LOCK_EX);

// Redirect to thank you page
header("Location: $thank_you_page");
exit;
?>