<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 20/11/2018
 * Time: 09:40
 */

// headers requis
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json; charset=UTF-8');

require_once '../donnee/UtilisateurDAO.php';

//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

// Création du DAO
$utilisateurDAO = new UtilisateurDAO();

// définition de l'id ou du mail de l'utilisateur à récupérer
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // lecture des détails de l'utilisateur à récupérer
    $utilisateur = $utilisateurDAO->lireUnId($id);
} elseif (isset($_GET['mail'])) {
    $mail = $_GET['mail'];

    // lecture des détails de l'utilisateur à récupérer
    $utilisateur = $utilisateurDAO->lireUnMail($mail);
} else die();

$item_utilisateur = array();

if($utilisateur->getId() !== null)
{
    $item_utilisateur['id'] = $utilisateur->getId();
    $item_utilisateur['mail'] = $utilisateur->getMail();
    $item_utilisateur['pseudonyme'] = $utilisateur->getPseudonyme();
    $item_utilisateur['creation'] = $utilisateur->getCreation();
}

echo json_encode($item_utilisateur);