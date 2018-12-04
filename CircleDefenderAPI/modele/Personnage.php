<?php
/**
 * Created by PhpStorm.
 * User: Marc-Antoine
 * Date: 04/12/2018
 * Time: 08:40
 */

class Personnage
{
    // Propriétés de l'objet
    private $id;
    private $tailleBouclier;

    /**
     * Personnage constructor.
     * @param $id
     */
    public function __construct()
    {
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
    public function getTailleBouclier()
    {
        return $this->tailleBouclier;
    }

    /**
     * @param mixed $tailleBouclier
     */
    public function setTailleBouclier($tailleBouclier)
    {
        $this->tailleBouclier = $tailleBouclier;
    }
}