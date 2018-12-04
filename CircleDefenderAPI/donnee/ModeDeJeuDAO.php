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
        $modes_de_jeu = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $modes_de_jeu;
    }

    /**
     * Lire les données d'un mode de jeu
     * @return ModeDeJeu
     */
    function lireUnId($id)
    {
        // requete pour lire un seul enregistrement
        $requete = "SELECT
                mdj.id, mdj.nom
            FROM
                " . $this->nom_table . " mdj
            WHERE
                mdj.id = ?
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
        $modeDeJeu = new ModeDeJeu();
        $modeDeJeu->setId($enregistrement['id']);
        $modeDeJeu->setNom($enregistrement['nom']);

        return $modeDeJeu;
    }
}