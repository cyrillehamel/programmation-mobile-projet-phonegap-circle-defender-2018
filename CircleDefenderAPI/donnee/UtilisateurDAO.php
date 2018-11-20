<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 20/11/2018
 * Time: 08:35
 */

require_once "../modele/Utilisateur.php";
require_once "Connexion.php";

class UtilisateurDAO
{
    // Connexion à la base de données
    private $connexion_bdd;

    // Définition du nom de la table des utilisateurs
    private $nom_table = "utilisateur";

    /**
     * Constructeur du DAO
     */
    public function __construct()
    {
        $this->connexion_bdd = Connexion::get()->connect();
    }

//    /**
//     * Lire l'ensemble des utilisateurs
//     * @return mixed
//     */
//    function lire()
//    {
//        $requete = "SELECT
//                u.id, u.mail, u.pseudonyme, u.creation
//            FROM
//                " . $this->nom_table . " u
//            ORDER BY
//                u.creation DESC";
//
//        $stmt = $this->connexion_bdd->prepare($requete);
//
//        $stmt->execute();
//
//        return $stmt;
//    }
//
//    /**
//     * créer un utilisateur
//     * @return bool indiquant l'état d'exécution de la requete
//     */
//    function creer()
//    {
//        // requete pour insérer un enregistrement
//        $requete = "INSERT INTO
//                " . $this->nom_table . "(nom, pseudonyme, url_image, mdp_hash)
//            VALUES
//                (:nom, :pseudonyme, :url_image, :mdp_hash)";
//
//        // préparation de la requete
//        $stmt = $this->connexion_bdd->prepare($requete);
//
//        // sanitize
//        $this->nom = htmlspecialchars(strip_tags($this->nom));
//        $this->pseudonyme = htmlspecialchars(strip_tags($this->pseudonyme));
//        $this->url_image = htmlspecialchars(strip_tags($this->url_image));
//        $this->mdp_hash = htmlspecialchars(strip_tags($this->mdp_hash));
//
//        // liaison des variables
//        $stmt->bindParam(":nom", $this->nom);
//        $stmt->bindParam(":pseudonyme", $this->pseudonyme);
//        $stmt->bindParam(":url_image", $this->url_image);
//        $stmt->bindParam(":mdp_hash", $this->mdp_hash);
//
//        // exécution de la requete
//        if ($stmt->execute()) {
//            return true;
//        }
//
//        return false;
//    }

    /**
     * Lire les données d'un utilisateur
     */
    function lireUn($id)
    {
        // requete pour lire un seul enregistrement
        $requete = "SELECT
                u.id, u.mail, u.pseudonyme, u.creation
            FROM
                " . $this->nom_table . " u
            WHERE
                u.id = ?
            LIMIT
                1";

        // préparation de la requete
        $stmt = $this->connexion_bdd->prepare($requete);

        // liaison de l'id de l'utilisateur à modifier
        $stmt->bindParam(1, $id);

        // exécution de la requete
        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $enregistrement = $stmt->fetch(\PDO::FETCH_ASSOC);

        // définir les valeurs comme propriétés de l'objet
        $utilisateur = new Utilisateur();
        $utilisateur->setId($enregistrement['id']);
        $utilisateur->setMail($enregistrement['mail']);
        $utilisateur->setPseudonyme($enregistrement['pseudonyme']);
        $utilisateur->setCreation($enregistrement['creation']);

        return $utilisateur;
    }

//    /**
//     * modifier un utilisateur
//     * @return bool indiquant l'état d'exécution de la requete
//     */
//    function modifier()
//    {
//        // requete de modification
//        $requete = "UPDATE
//                " . $this->nom_table . "
//            SET
//                nom = :nom,
//                mdp_hash = :mdp_hash
//            WHERE
//                id_utilisateur = :id_utilisateur";
//
//        // préparation de la requete
//        $stmt = $this->connexion_bdd->prepare($requete);
//
//        // sanitize
//        $this->id_utilisateur = htmlspecialchars(strip_tags($this->id_utilisateur));
//        $this->nom = htmlspecialchars(strip_tags($this->nom));
//        $this->mdp_hash = htmlspecialchars(strip_tags($this->mdp_hash));
//
//        // liaison des variables
//        $stmt->bindParam(':nom', $this->nom);
//        $stmt->bindParam(':mdp_hash', $this->mdp_hash);
//        $stmt->bindParam(':id_utilisateur', $this->id_utilisateur);
//
//        // exécution de la requete
//        if ($stmt->execute()) {
//            return true;
//        }
//
//        return false;
//    }
//
//    /**
//     * supprimer un utilisateur
//     * @return bool indiquant l'état d'exécution de la requete
//     */
//    function supprimer()
//    {
//        // requete de suppression
//        $query = "DELETE FROM " . $this->nom_table . " WHERE id_utilisateur = ?";
//
//        // préparation de la requete
//        $stmt = $this->connexion_bdd->prepare($query);
//
//        // sanitize
//        $this->id_utilisateur = htmlspecialchars(strip_tags($this->id_utilisateur));
//
//        // liaison de l'id de l'utilisateur à supprimer
//        $stmt->bindParam(1, $this->id_utilisateur);
//
//        // exécution de la requete
//        if ($stmt->execute()) {
//            return true;
//        }
//
//        return false;
//    }
}