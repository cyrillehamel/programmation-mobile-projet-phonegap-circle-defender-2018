<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 29/11/2018
 * Time: 17:14
 */

// headers requis
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json; charset=UTF-8');

require_once '../donnee/ModeDeJeuDAO.php';

ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Création du DAO
$modeDeJeuDAO = new ModeDeJeuDAO();

// lecture des détails de l'utilisateur à récupérer
$modesDeJeu = $modeDeJeuDAO->lire();
print_r($modesDeJeu);

//$item_utilisateur = array();
//
//if(sizeof($modesDeJeu) > 0)
//{
//    $item_utilisateur['id'] = $modeDeJeu->getId();
//    $item_utilisateur['mail'] = $modeDeJeu->getMail();
//    $item_utilisateur['pseudonyme'] = $modeDeJeu->getPseudonyme();
//    $item_utilisateur['creation'] = $modeDeJeu->getCreation();
//}

echo json_encode($modesDeJeu);