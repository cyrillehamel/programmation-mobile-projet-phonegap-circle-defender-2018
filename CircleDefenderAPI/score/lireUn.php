<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 11/12/2018
 * Time: 08:21
 */

// headers requis
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json; charset=UTF-8');

require_once '../donnee/ScoreDAO.php';

//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

// Création du DAO
$ScoreDAO = new ScoreDAO();

// définition de l'id de l'utilisateur dont le score est à récupérer
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // lecture des détails de l'utilisateur dont le score est à récupérer
    $score = $ScoreDAO->lireUnId($id);
} else die();

$itemScore = array();

if($score->getId() !== null)
{
    $itemScore['id'] = $score->getId();
    //$itemScore['taille_bouclier'] = $score->;
}

echo json_encode($itemScore);