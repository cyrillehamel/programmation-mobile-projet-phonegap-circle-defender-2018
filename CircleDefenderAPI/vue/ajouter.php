<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 22/11/2018
 * Time: 16:51
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

// définition de l'id de l'utilisateur à récupérer
$mail = isset($donnee->mail) ? $donnee->mail : die();
$mdp = isset($donnee->mdp) ? $donnee->mdp : die();
$pseudonyme = isset($donnee->pseudonyme) ? $donnee->pseudonyme : die();

// lecture des détails de l'utilisateur à récupérer
$utilisateur = $utilisateurDAO->ajouter($mail, $mdp, $pseudonyme);

$item_utilisateur = array();

if($utilisateur->getId() !== null)
{
    $item_utilisateur['id'] = $utilisateur->getId();
    $item_utilisateur['mail'] = $utilisateur->getMail();
    $item_utilisateur['pseudonyme'] = $utilisateur->getPseudonyme();
    $item_utilisateur['creation'] = $utilisateur->getCreation();
}

echo json_encode($item_utilisateur);