var PersonnageDAO = function ()
{
    /**
     * Lit la liste complète des personnages
     * @return {Object} un tableau associatif
     */
    this.lireListePersonnages = async () => {
        var listePersonnages = [];

        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/personnage/lire.php');
        const listePersonnagesJson = await reponse.json();

        localStorage['personnages'] = JSON.stringify(listePersonnages);

        return JSON.parse(listePersonnagesJson);
    }

    /**
     * Lit un personnage en fonction d'un id donné
     * @param {Number} id l'id du personnage à lire
     * @return {null} si le nombre en paramètre n'est pas un entier
     * ou si l'enregistrement associé n'existe pas en base de données
     * @return {Personnage} le personnage associé à l'id
     */

    this.lirePersonnageParId = async (id) => {
        if (!Number.isInteger(id))
        {
            window.alert("Vous devez entrer un nombre entier pour lire un personnage. ID : " + id);
            return null;
        }

        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/personnage/lireUn.php?id=' + id);
        var personnage = await reponse.json();

        return (personnage.id === undefined ? null : new Personnage(personnage.id, personnage.taille_bouclier));
    }
}