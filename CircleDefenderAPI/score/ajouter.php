<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 13/12/2018
 * Time: 17:14
 */

// headers requis
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../donnee/ScoreDAO.php';

//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

// Création du DAO
$scoreDAO = new ScoreDAO();

// récupération des données transmises en POST
$donnee = json_decode(file_get_contents("php://input"));

// définition des propriétés du score à ajouter
$score_data = isset($donnee->score) ? $donnee->score : die();
$id_utilisateur = isset($donnee->id_utilisateur) ? $donnee->id_utilisateur : die();
$id_mode_de_jeu = isset($donnee->id_mode_de_jeu) ? $donnee->id_mode_de_jeu : die();
$id_personnage = isset($donnee->id_personnage) ? $donnee->id_personnage : die();
$frag = isset($donnee->frag) ? $donnee->frag : die();

// lecture des détails de l'utilisateur à ajouter
$score = $scoreDAO->ajouter($score_data, $id_utilisateur, $id_mode_de_jeu, $id_personnage, $frag);

$item_score = array();

if($score->getId() !== null)
{
    $item_score['id'] = $score->getId();
    $item_score['score'] = $score->getScore();
    $item_score['id_utilisateur'] = $score->getUtilisateur()->getId();
    $item_score['id_mode_de_jeu'] = $score->getModeDeJeu()->getId();
    $item_score['id_personnage'] = $score->getPersonnage()->getId();
    $item_score['frag'] = $score->getFrag();
}

echo json_encode($item_score);