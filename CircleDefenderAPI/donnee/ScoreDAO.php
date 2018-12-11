<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 04/12/2018
 * Time: 09:17
 */

require_once "../modele/Score.php";
require_once "Connexion.php";

class ScoreDAO
{
    // Connexion à la base de données
    private $connexion_bdd;

    // Définition du nom de la table des modes de jeu
    private $nom_table = "score";

    /**
     * Constructeur du DAO
     */
    public function __construct()
    {
        $this->connexion_bdd = Connexion::get()->connect();
    }

    /**
     * Lire l'ensemble des personnages
     * @return mixed
     */
    function meilleursScores()
    {
        $requete = "SELECT u.id, u.pseudonyme, MAX(s.score) as score
            FROM score s
              LEFT JOIN utilisateur u on s.id_utilisateur = u.id
            GROUP BY u.id, u.pseudonyme, s.score
            ORDER BY s.score DESC
            LIMIT 50";

        $stmt = $this->connexion_bdd->prepare($requete);

        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $meilleursScores = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $meilleursScores;
    }

    /**
     * Lire les scores d'un utilisateur à partir de son id
     * @return Utilisateur
     */
    function lireUnId($id)
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

        // liaison de l'id de l'utilisateur dont on doit récupérer les scores
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
}