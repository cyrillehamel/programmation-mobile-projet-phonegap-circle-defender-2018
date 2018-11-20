var ModeDeJeuAppelerAPI = function ()
{
    const lireListeModesDeJeu = async () => {
        var listeModesDeJeu = [];

        const reponse = await fetch('http://URL_DE_L_API');
        const monJson = await reponse.json();

        // TODO : prendre le JSON et ajouter à la liste tous les modes de jeu récupérés
        localStorage['modeDeJeu'] = JSON.stringify(listeModesDeJeu);

        // return ??
    }
}