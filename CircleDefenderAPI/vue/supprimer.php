<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 26/11/2018
 * Time: 09:37
 */

// headers requis
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../donnee/UtilisateurDAO.php';

//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

// Création du DAO
$utilisateurDAO = new UtilisateurDAO();

// récupération des données transmises en POST
$donnee = json_decode(file_get_contents("php://input"));

// définition de l'id de l'utilisateur à supprimer
$id = isset($donnee->id) ? $donnee->id : die();

// lecture des détails de l'utilisateur à supprimer
$utilisateur = $utilisateurDAO->supprimer($id);

$item_utilisateur = array();

if($utilisateur->getId() !== null)
{
    $item_utilisateur['id'] = $utilisateur->getId();
}

echo json_encode($item_utilisateur);