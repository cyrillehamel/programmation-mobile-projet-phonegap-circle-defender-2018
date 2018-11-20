<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 20/11/2018
 * Time: 08:18
 */

class Utilisateur
{
    // Propriétés de l'objet
    private $id;
    private $mail;
    private $mdp_hash;
    private $pseudonyme;
    private $creation;

    /**
     * Constructeur d'Utilisateur.
     */
    public function __construct()
    {}

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
    public function getMail()
    {
        return $this->mail;
    }

    /**
     * @param mixed $mail
     */
    public function setMail($mail)
    {
        $this->mail = $mail;
    }

    /**
     * @return mixed
     */
    public function getMdpHash()
    {
        return $this->mdp_hash;
    }

    /**
     * @param mixed $mdp_hash
     */
    public function setMdpHash($mdp_hash)
    {
        $this->mdp_hash = $mdp_hash;
    }

    /**
     * @return mixed
     */
    public function getPseudonyme()
    {
        return $this->pseudonyme;
    }

    /**
     * @param mixed $pseudonyme
     */
    public function setPseudonyme($pseudonyme)
    {
        $this->pseudonyme = $pseudonyme;
    }

    /**
     * @return mixed
     */
    public function getCreation()
    {
        return $this->creation;
    }

    /**
     * @param mixed $creation
     */
    public function setCreation($creation)
    {
        $this->creation = $creation;
    }
}