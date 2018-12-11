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
        $requete = "SELECT * FROM
              (SELECT DISTINCT ON (u.id) u.id, u.pseudonyme, s.score
                FROM " . $this->nom_table . " s
                LEFT JOIN utilisateur u on s.id_utilisateur = u.id
                ORDER BY u.id, s.score, u.pseudonyme DESC
                LIMIT 50) as resultat
            ORDER BY resultat.score DESC";

        $stmt = $this->connexion_bdd->prepare($requete);

        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $meilleursScores = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $meilleursScores;
    }
}