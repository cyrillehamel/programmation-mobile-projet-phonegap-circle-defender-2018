var ModeDeJeuDAO = function ()
{
    const lireListeModesDeJeu = async () => {
        var listeModesDeJeu = [];

        const reponse = await fetch('http://URL_DE_L_API');
        const monJson = await reponse.json();

        // TODO : prendre le JSON et ajouter à la liste tous les modes de jeu récupérés
        localStorage['modeDeJeu'] = JSON.stringify(listeModesDeJeu);

        // return ??
    }

    const lireModeDeJeuParId = async (idModeDeJeu) => {
        const reponse = await fetch('http://URL_DE_L_API', {
            method: 'POST',
            body: JSON.stringify({
                id: idModeDeJeu
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const monJson = await reponse.json();
        // faire quelque chose avec le json

        return new modeDeJeu(); // passer en param les valeurs du json
    }
}