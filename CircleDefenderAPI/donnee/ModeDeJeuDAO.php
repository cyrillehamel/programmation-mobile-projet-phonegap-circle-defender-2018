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
//     * Ajouter un utilisateur
//     * @return Utilisateur Donnée complètes de l'utilisateur créé
//     */
//    function ajouter($mail, $mdp, $pseudonyme)
//    {
//        // requete pour insérer un enregistrement
//        $requete = "INSERT INTO
//                " . $this->nom_table . "(mail, mot_de_passe, pseudonyme)
//            VALUES
//                (:mail, :mdp, :pseudonyme)
//            RETURNING id, creation";
//
//        // préparation de la requete
//        $stmt = $this->connexion_bdd->prepare($requete);
//
//        // sanitize
//        $mail = htmlspecialchars(strip_tags($mail));
//        $mdp = htmlspecialchars(strip_tags($mdp));
//        $pseudonyme = htmlspecialchars(strip_tags($pseudonyme));
//
//        // liaison des variables
//        $stmt->bindParam(":mail", $mail);
//        $stmt->bindParam(":mdp", $mdp);
//        $stmt->bindParam(":pseudonyme", $pseudonyme);
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
//        $utilisateur->setMail($mail);
//        $utilisateur->setPseudonyme($pseudonyme);
//        $utilisateur->setCreation($enregistrement['creation']);
//
//        return $utilisateur;
//    }
//
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
//
//    /**
//     * Modifier un utilisateur
//     * @return Utilisateur Donnée complètes de l'utilisateur authentifié
//     */
//    function modifier($id, $mdp, $pseudonyme)
//    {
//        // requete de modification
//        $requete = "UPDATE
//                " . $this->nom_table . "
//            SET
//                pseudonyme = :pseudonyme,
//                mot_de_passe = :mdp
//            WHERE
//                id = :id
//            RETURNING
//                mail,
//                creation";
//
//        // préparation de la requete
//        $stmt = $this->connexion_bdd->prepare($requete);
//
//        // sanitize
//        $id = htmlspecialchars(strip_tags($id));
//        $mdp = htmlspecialchars(strip_tags($mdp));
//        $pseudonyme = htmlspecialchars(strip_tags($pseudonyme));
//
//        // liaison des variables
//        $stmt->bindParam(':id', $id);
//        $stmt->bindParam(':mdp', $mdp);
//        $stmt->bindParam(':pseudonyme', $pseudonyme);
//
//        // exécution de la requete
//        $stmt->execute();
//
//        // récupérer l'enregistrement renvoyé
//        $enregistrement = $stmt->fetch(\PDO::FETCH_ASSOC);
//
//        // définir les valeurs comme propriétés de l'objet
//        $utilisateur = new Utilisateur();
//        $utilisateur->setId($id);
//        $utilisateur->setMail($enregistrement['mail']);
//        $utilisateur->setPseudonyme($pseudonyme);
//        $utilisateur->setCreation($enregistrement['creation']);
//
//        return $utilisateur;
//    }
//
//    /**
//     * supprimer un utilisateur
//     * @return Utilisateur Id de l'utilisateur supprimé
//     */
//    function supprimer($id)
//    {
//        // requete de suppression
//        $query = "DELETE FROM " . $this->nom_table . " WHERE id = ? RETURNING id";
//
//        // préparation de la requete
//        $stmt = $this->connexion_bdd->prepare($query);
//
//        // sanitize
//        $id = htmlspecialchars(strip_tags($id));
//
//        // liaison de l'id de l'utilisateur à supprimer
//        $stmt->bindParam(1, $id);
//
//        // exécution de la requete
//        $stmt->execute();
//
//        // récupérer l'enregistrement renvoyé
//        $enregistrement = $stmt->fetch(\PDO::FETCH_ASSOC);
//
//        // définir l'id comme propriété de l'objet
//        $utilisateur = new Utilisateur();
//        $utilisateur->setId($enregistrement['id']);
//
//        return $utilisateur;
//    }
//
//    /**
//     * Authentifier un utilisateur
//     * @return Utilisateur Donnée complètes de l'utilisateur authentifié
//     */
//    function authentifier($mail, $mdp)
//    {
//        // requete pour chercher l'utilisateur
//        $requete = "SELECT
//                u.id, u.mail, u.pseudonyme, u.creation
//            FROM
//                " . $this->nom_table . " u
//            WHERE
//                u.mail = :mail AND
//                u.mot_de_passe = :mdp
//            GROUP BY
//                u.id, u.mail, u.pseudonyme, u.creation
//            LIMIT
//                1";
//
//        // préparation de la requete
//        $stmt = $this->connexion_bdd->prepare($requete);
//
//        // sanitize
//        $mail = htmlspecialchars(strip_tags($mail));
//        $mdp = htmlspecialchars(strip_tags($mdp));
//
//        // liaison des variables
//        $stmt->bindParam(":mail", $mail);
//        $stmt->bindParam(":mdp", $mdp);
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
//        $utilisateur->setMail($mail);
//        $utilisateur->setPseudonyme($enregistrement['pseudonyme']);
//        $utilisateur->setCreation($enregistrement['creation']);
//
//        return $utilisateur;
//    }
}