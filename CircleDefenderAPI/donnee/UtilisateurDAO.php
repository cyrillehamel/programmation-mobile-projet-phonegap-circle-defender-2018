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

    /**
     * Ajouter un utilisateur
     * @return Utilisateur Donnée complètes de l'utilisateur créé
     */
    function ajouter($mail, $mdp, $pseudonyme)
    {
        // requete pour insérer un enregistrement
        $requete = "INSERT INTO
                " . $this->nom_table . "(mail, mot_de_passe, pseudonyme)
            VALUES
                (:mail, :mdp, :pseudonyme)
            RETURNING id, creation";

        // préparation de la requete
        $stmt = $this->connexion_bdd->prepare($requete);

        // sanitize
        $mail = htmlspecialchars(strip_tags($mail));
        $mdp = htmlspecialchars(strip_tags($mdp));
        $pseudonyme = htmlspecialchars(strip_tags($pseudonyme));

        // liaison des variables
        $stmt->bindParam(":mail", $mail);
        $stmt->bindParam(":mdp", $mdp);
        $stmt->bindParam(":pseudonyme", $pseudonyme);

        // exécution de la requete
        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $enregistrement = $stmt->fetch(\PDO::FETCH_ASSOC);

        // définir les valeurs comme propriétés de l'objet
        $utilisateur = new Utilisateur();
        $utilisateur->setId($enregistrement['id']);
        $utilisateur->setMail($mail);
        $utilisateur->setPseudonyme($pseudonyme);
        $utilisateur->setCreation($enregistrement['creation']);

        return $utilisateur;
    }

    /**
     * Lire les données d'un utilisateur
     * @return Utilisateur
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

    /**
     * Authentifier un utilisateur
     * @return Utilisateur Donnée complètes de l'utilisateur authentifié
     */
    function authentifier($mail, $mdp)
    {
        // requete pour chercher l'utilisateur
        $requete = "SELECT
                u.id, u.mail, u.pseudonyme, u.creation
            FROM
                " . $this->nom_table . " u
            WHERE
                u.mail = :mail AND
                u.mot_de_passe = :mdp
            GROUP BY
                u.id, u.mail, u.pseudonyme, u.creation
            LIMIT
                1";

        // préparation de la requete
        $stmt = $this->connexion_bdd->prepare($requete);

        // sanitize
        $mail = htmlspecialchars(strip_tags($mail));
        $mdp = htmlspecialchars(strip_tags($mdp));

        // liaison des variables
        $stmt->bindParam(":mail", $mail);
        $stmt->bindParam(":mdp", $mdp);

        // exécution de la requete
        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $enregistrement = $stmt->fetch(\PDO::FETCH_ASSOC);

        // définir les valeurs comme propriétés de l'objet
        $utilisateur = new Utilisateur();
        $utilisateur->setId($enregistrement['id']);
        $utilisateur->setMail($mail);
        $utilisateur->setPseudonyme($enregistrement['pseudonyme']);
        $utilisateur->setCreation($enregistrement['creation']);

        return $utilisateur;
    }
}