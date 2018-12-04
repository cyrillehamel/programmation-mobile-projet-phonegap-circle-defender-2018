<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 04/12/2018
 * Time: 08:19
 */

// headers requis
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json; charset=UTF-8');

require_once '../donnee/ModeDeJeuDAO.php';

//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

// Création du DAO
$modeDeJeuDAO = new ModeDeJeuDAO();

// définition de l'id ou du mail de l'utilisateur à récupérer
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // lecture des détails de l'utilisateur à récupérer
    $modeDeJeu = $modeDeJeuDAO->lireUnId($id);
} else die();

$itemModeDeJeu = array();

if($modeDeJeu->getId() !== null)
{
    $itemModeDeJeu['id'] = $modeDeJeu->getId();
    $itemModeDeJeu['nom'] = $modeDeJeu->getNom();
}

echo json_encode($itemModeDeJeu);