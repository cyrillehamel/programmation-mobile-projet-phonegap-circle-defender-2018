<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 29/11/2018
 * Time: 16:29
 */

require_once "../modele/ModeDeJeu.php";
require_once "Connexion.php";

class ModeDeJeuDAO
{
    // Connexion à la base de données
    private $connexion_bdd;

    // Définition du nom de la table des modes de jeu
    private $nom_table = "mode_de_jeu";

    /**
     * Constructeur du DAO
     */
    public function __construct()
    {
        $this->connexion_bdd = Connexion::get()->connect();
    }

    /**
     * Lire l'ensemble des modes de jeu
     * @return mixed
     */
    function lire()
    {
        $requete = "SELECT
                mdj.id, mdj.nom
            FROM
                " . $this->nom_table . " mdj";

        $stmt = $this->connexion_bdd->prepare($requete);

        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $enregistrements = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $enregistrements;
    }

//    /**
//     * Lire les données d'un utilisateur
//     * @return Utilisateur
//     */
//    function lireUn($id)
//    {
//        // requete pour lire un seul enregistrement
//        $requete = "SELECT
//                u.id, u.mail, u.pseudonyme, u.creation
//            FROM
//                " . $this->nom_table . " u
//            WHERE
//                u.id = ?
//            LIMIT
//                1";
//
//        // préparation de la requete
//        $stmt = $this->connexion_bdd->prepare($requete);
//
//        // liaison de l'id de l'utilisateur à modifier
//        $stmt->bindParam(1, $id);
//
//        // exécution de la requete
//        $stmt->execute();
//
//        // récupérer l'enregistrement renvoyé
//        $enregistrement = $stmt->fetch(\PDO::FETCH_ASSOC);
//
//        // définir les valeurs comme propriétés de l'objet
//        $utilisateur = new Utilisateur();
//        $utilisateur->setId($enregistrement['id']);
//        $utilisateur->setMail($enregistrement['mail']);
//        $utilisateur->setPseudonyme($enregistrement['pseudonyme']);
//        $utilisateur->setCreation($enregistrement['creation']);
//
//        return $utilisateur;
//    }
}