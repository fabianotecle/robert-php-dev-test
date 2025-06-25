<?php

// Implement the RESTful API endpoints for translation units.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

require_once '../src/TranslationUnitManager.php';

$manager = new TranslationUnitManager();

// Capture the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Helper function to send JSON response with HTTP status code
function respond($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Parse JSON input for POST and PUT requests
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        // If ID is provided, return the specific translation unit
        if (isset($_GET['id'])) {
            $unit = $manager->getUnit((int) $_GET['id']);
            if ($unit) {
                respond($unit);
            } else {
                respond(['error' => 'Translation unit not found'], 404);
            }
        } else {
            // ID parameter missing
            respond(['error' => 'Missing id parameter'], 400);
        }
        break;

    case 'POST':
        // Check required parameters for creating a translation unit
        if (isset($input['source_text'], $input['translated_text'], $input['language_from'], $input['language_to'])) {
            $id = $manager->addUnit(
                $input['source_text'],
                $input['translated_text'],
                $input['language_from'],
                $input['language_to']
            );
            respond(['message' => 'Translation unit created', 'id' => $id], 201);
        } else {
            respond(['error' => 'Missing parameters for creation'], 400);
        }
        break;

    case 'PUT':
        // Check required parameters for updating a translation unit
        if (isset($input['id'], $input['translated_text'])) {
            $success = $manager->updateUnit((int) $input['id'], $input['translated_text']);
            if ($success) {
                respond(['message' => 'Translation unit updated']);
            } else {
                respond(['error' => 'Translation unit not found'], 404);
            }
        } else {
            respond(['error' => 'Missing parameters for update'], 400);
        }
        break;

    case 'DELETE':
        // Delete method not implemented yet
        respond(['error' => 'Delete method not implemented'], 501);
        break;

    default:
        // HTTP method not allowed
        respond(['error' => 'Method not allowed'], 405);
}
