<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 04/12/2018
 * Time: 09:00
 */

// headers requis
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json; charset=UTF-8');

require_once '../donnee/PersonnageDAO.php';

//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

// Création du DAO
$PersonnageDAO = new PersonnageDAO();

// définition de l'id du personnage à récupérer
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // lecture des détails du personnage à récupérer
    $personnage = $PersonnageDAO->lireUnId($id);
} else die();

$itemPersonnage = array();

if($personnage->getId() !== null)
{
    $itemPersonnage['id'] = $personnage->getId();
    $itemPersonnage['taille_bouclier'] = $personnage->getTailleBouclier();
}

echo json_encode($itemPersonnage);