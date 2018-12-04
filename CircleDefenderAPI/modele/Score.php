<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 04/12/2018
 * Time: 08:33
 */

class Score
{
    // Propriétés de l'objet
    private $id;
    private $score;
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
    public function getUtilisateur()
    {
        return $this->utilisateur;
    }

    /**
     * @param mixed $utilisateur
     */
    public function setUtilisateur($utilisateur)
    {
        $this->utilisateur = $utilisateur;
    }

    /**
     * @return mixed
     */
    public function getModeDeJeu()
    {
        return $this->modeDeJeu;
    }

    /**
     * @param mixed $modeDeJeu
     */
    public function setModeDeJeu($modeDeJeu)
    {
        $this->modeDeJeu = $modeDeJeu;
    }

    /**
     * @return mixed
     */
    public function getPersonnage()
    {
        return $this->personnage;
    }

    /**
     * @param mixed $personnage
     */
    public function setPersonnage($personnage)
    {
        $this->personnage = $personnage;
    }
}