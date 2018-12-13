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
     * Ajouter un score
     * @return Score Données complètes du score créé
     */
    function ajouter($score_data, $id_utilisateur, $id_mode_de_jeu, $id_personnage, $frag)
    {
        // requete pour insérer un enregistrement
        $requete = "INSERT INTO
                " . $this->nom_table . "(score, id_utilisateur, id_mode_de_jeu, id_personnage, frag)
            VALUES
                (:score, :id_utilisateur, :id_mode_de_jeu, :id_personnage, :frag)
            RETURNING id";

        // préparation de la requete
        $stmt = $this->connexion_bdd->prepare($requete);

        // sanitize
        $score_data = htmlspecialchars(strip_tags($score_data));
        $id_utilisateur = htmlspecialchars(strip_tags($id_utilisateur));
        $id_mode_de_jeu = htmlspecialchars(strip_tags($id_mode_de_jeu));
        $id_personnage = htmlspecialchars(strip_tags($id_personnage));
        $frag = htmlspecialchars(strip_tags($frag));

        // liaison des variables
        $stmt->bindParam(":score", $score_data);
        $stmt->bindParam(":id_utilisateur", $id_utilisateur);
        $stmt->bindParam(":id_mode_de_jeu", $id_mode_de_jeu);
        $stmt->bindParam(":id_personnage", $id_personnage);
        $stmt->bindParam(":frag", $frag);

        // exécution de la requete
        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $enregistrement = $stmt->fetch(\PDO::FETCH_ASSOC);

        // définir les valeurs comme propriétés de l'objet
        $score = new Score();
        $score->setId($enregistrement['id']);
        $score->setScore($score_data);
        $score->getUtilisateur()->setId($id_utilisateur);
        $score->getModeDeJeu()->setId($id_mode_de_jeu);
        $score->getPersonnage()->setId($id_personnage);
        $score->setFrag($frag);

        return $score;
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
     * @return Score
     */
    function lireUnId($id)
    {
        // requete pour lire un seul enregistrement
        $requete = "SELECT
                   u.id,
                   u.pseudonyme,
                   (SELECT MAX(s.score) FROM score s WHERE s.id_utilisateur = ?) as meilleur_score,
                   (SELECT SUM(s.score) FROM score s WHERE s.id_utilisateur = ?) as score_total,
                   (SELECT COUNT(*) FROM score s WHERE s.id_utilisateur = ?) as nombre_parties,
                   -1 as classement,
                   (SELECT SUM(s.frag) FROM score s WHERE s.id_utilisateur = 288) as frag_total
            FROM " . $this->nom_table . " s
              LEFT JOIN utilisateur u on s.id_utilisateur = u.id
            WHERE u.id = ?
            GROUP BY u.id, u.pseudonyme, meilleur_score, score_total, nombre_parties, classement, frag_total";

        // préparation de la requete
        $stmt = $this->connexion_bdd->prepare($requete);

        // liaison de l'id de l'utilisateur dont on doit récupérer les scores
        $stmt->bindParam(1, $id);
        $stmt->bindParam(2, $id);
        $stmt->bindParam(3, $id);
        $stmt->bindParam(4, $id);

        // exécution de la requete
        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $enregistrement = $stmt->fetch(\PDO::FETCH_ASSOC);

        // définir les valeurs comme propriétés de l'objet
        $score = new Score();
        $score->getUtilisateur()->setId($enregistrement['id']);
        $score->getUtilisateur()->setPseudonyme($enregistrement['pseudonyme']);
        $score->setMeilleurScore($enregistrement['meilleur_score']);
        $score->setScoreTotal($enregistrement['score_total']);
        $score->setNombreParties($enregistrement['nombre_parties']);
        $score->setClassement($enregistrement['classement']);
        $score->setFragtotal($enregistrement['frag_total']);

        return $score;
    }
}