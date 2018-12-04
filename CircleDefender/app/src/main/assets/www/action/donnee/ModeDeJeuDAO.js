var ModeDeJeuDAO = function ()
{
    /**
     * Lit la liste complète des modes de jeu
     * @return {Object} un tableau associatif
     */
    this.lireListeModesDeJeu = async () => {
        var listeModesDeJeu = [];

        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/mode_de_jeu/lire.php');
        const listeModesDeJeuJson = await reponse.json();

        localStorage['modeDeJeu'] = JSON.stringify(listeModesDeJeu);

        return JSON.parse(listeModesDeJeuJson);
    }

    /**
     * Lit un mode de jeu en fonction d'un id donné
     * @param {Number} id l'id du mode de jeu à lire
     * @return {null} si le nombre en paramètre n'est pas un entier
     * ou si l'enregistrement associé n'existe pas en base de données
     * @return {ModeDeJeu} le mode de jeu associé à l'id
     */
    this.lireModeDeJeuParId = async (id) => {
        if (!Number.isInteger(id)) {
            window.alert("Vous devez entrer un nombre entier pour lire un mode de jeu. ID : " + id);
            return null;
        }

        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/mode_de_jeu/lireUn.php?id=' + id);
        var modeDeJeu = await reponse.json();

        return (modeDeJeu.id === undefined ? null : new modeDeJeu(modeDeJeu.id, modeDeJeu.nom));
    }
}