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

// lecture et renvoi des détails de l'utilisateur à récupérer
echo json_encode($modeDeJeuDAO->lire());