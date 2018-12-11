<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 04/12/2018
 * Time: 08:33
 */

require_once "Utilisateur.php";
require_once "ModeDeJeu.php";
require_once "Personnage.php";

class Score
{
    // Propriétés de l'objet
    private $id;
    private $score;
    private $meilleur_score;
    private $score_total;
    private $nombre_parties;
    private $classement;
    private $utilisateur;
    private $modeDeJeu;
    private $personnage;

    /**
     * Score constructor.
     */
    public function __construct()
    {
        $this->utilisateur = new Utilisateur();
        $this->modeDeJeu = new ModeDeJeu();
        $this->personnage = new Personnage();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * @param mixed $score
     */
    public function setScore($score)
    {
        $this->score = $score;
    }

    /**
     * @return mixed
     */
    public function getMeilleurScore()
    {
        return $this->meilleur_score;
    }

    /**
     * @param mixed $meilleur_score
     */
    public function setMeilleurScore($meilleur_score)
    {
        $this->meilleur_score = $meilleur_score;
    }

    /**
     * @return mixed
     */
    public function getScoreTotal()
    {
        return $this->score_total;
    }

    /**
     * @param mixed $score_total
     */
    public function setScoreTotal($score_total)
    {
        $this->score_total = $score_total;
    }

    /**
     * @return mixed
     */
    public function getNombreParties()
    {
        return $this->nombre_parties;
    }

    /**
     * @param mixed $nombre_parties
     */
    public function setNombreParties($nombre_parties)
    {
        $this->nombre_parties = $nombre_parties;
    }

    /**
     * @return mixed
     */
    public function getClassement()
    {
        return $this->classement;
    }

    /**
     * @param mixed $classement
     */
    public function setClassement($classement)
    {
        $this->classement = $classement;
    }

    /**
     * @return Utilisateur
     */
    public function getUtilisateur(): Utilisateur
    {
        return $this->utilisateur;
    }

    /**
     * @return mixed
     */
    public function getIdUtilisateur()
    {
        return $this->utilisateur->getId();
    }

    /**
     * @return mixed
     */
    public function getPseudonymeUtilisateur()
    {
        return $this->utilisateur->getPseudonyme();
    }

    /**
     * @param Utilisateur $utilisateur
     */
    public function setUtilisateur(Utilisateur $utilisateur)
    {
        $this->utilisateur = $utilisateur;
    }

    /**
     * @param mixed $id
     */
    public function setIdUtilisateur($id)
    {
        $this->utilisateur->setId($id);
    }

    /**
     * @param mixed $pseudonyme
     */
    public function setPseudonymeUtilisateur($pseudonyme)
    {
        $this->utilisateur->setPseudonyme($pseudonyme);
    }

    /**
     * @return ModeDeJeu
     */
    public function getModeDeJeu(): ModeDeJeu
    {
        return $this->modeDeJeu;
    }

    /**
     * @param ModeDeJeu $modeDeJeu
     */
    public function setModeDeJeu(ModeDeJeu $modeDeJeu)
    {
        $this->modeDeJeu = $modeDeJeu;
    }

    /**
     * @return Personnage
     */
    public function getPersonnage(): Personnage
    {
        return $this->personnage;
    }

    /**
     * @param Personnage $personnage
     */
    public function setPersonnage(Personnage $personnage)
    {
        $this->personnage = $personnage;
    }
}