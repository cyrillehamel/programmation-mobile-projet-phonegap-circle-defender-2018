<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 04/12/2018
 * Time: 08:44
 */

require_once "../modele/Personnage.php";
require_once "Connexion.php";

class PersonnageDAO
{
    // Connexion à la base de données
    private $connexion_bdd;

    // Définition du nom de la table des personnages
    private $nom_table = "personnage";

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
    function lire()
    {
        $requete = "SELECT
                p.id, p.taille_bouclier
            FROM
                " . $this->nom_table . " p";

        $stmt = $this->connexion_bdd->prepare($requete);

        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $personnages = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $personnages;
    }

    /**
     * Lire les données d'un personnage
     * @return Personnage
     */
    function lireUnId($id)
    {
        // requete pour lire un seul personnage
        $requete = "SELECT
                p.id, p.taille_bouclier
            FROM
                " . $this->nom_table . " p
            WHERE
                p.id = ?
            LIMIT
                1";

        // préparation de la requete
        $stmt = $this->connexion_bdd->prepare($requete);

        // liaison de l'id du personnage à récupérer
        $stmt->bindParam(1, $id);

        // exécution de la requete
        $stmt->execute();

        // récupérer l'enregistrement renvoyé
        $enregistrement = $stmt->fetch(\PDO::FETCH_ASSOC);

        // définir les valeurs comme propriétés de l'objet
        $personnage = new Personnage();
        $personnage->setId($enregistrement['id']);
        $personnage->setTailleBouclier($enregistrement['taille_bouclier']);

        return $personnage;
    }
}