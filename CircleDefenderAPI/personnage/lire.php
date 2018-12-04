<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 04/12/2018
 * Time: 08:59
 */

// headers requis
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json; charset=UTF-8');

require_once '../donnee/PersonnageDAO.php';

ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Création du DAO
$PersonnageDAO = new PersonnageDAO();

// lecture et renvoi des détails des personnages
echo json_encode($PersonnageDAO->lire());