var UtilisateurAppelerAPI = function ()
{
    const lireUtilisateurParId = async (idUtilisateur) => {
        const reponse = await fetch('http://URL_DE_L_API', {
            method: 'POST',
            body: JSON.stringify({
                id: idUtilisateur
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const monJson = await reponse.json();
        // faire quelque chose avec le json

        return new Utilisateur();
    }

    const lireListeMeilleursJoueurs = async () => {
        var listeMeilleursJoueurs = [];

        const reponse = await fetch('http://URL_DE_L_API');
        const monJson = await reponse.json();

        // TODO : prendre le JSON et ajouter à la liste tous les joueurs récupérés
        localStorage['meilleursJoueurs'] = JSON.stringify(listeMeilleursJoueurs);

        // return ??
    }

    const ajouterUtilisateur = async (utilisateur) => {
        const reponse = await fetch('http://URL_DE_L_API', {
            method: 'POST',
            body: JSON.stringify({
                id: utilisateur.id,
                mail: utilisateur.mail,
                mot_de_passe: utlisateur.motDePasse,
                pseudonyme: utlisateur.pseudonyme
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const monJson = await reponse.json();
        // faire quelque chose avec le json

        return "WIP";
    }

    const modifierUtilisateur = async (utilisateur) => {
        const reponse = await fetch('http://URL_DE_L_API', {
            method: 'POST',
            body: JSON.stringify({
                id: utilisateur.id,
                mail:utilisateur.mail,
                mot_de_passe: utlisateur.motDePasse,
                pseudonyme: utlisateur.pseudonyme
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const monJson = await reponse.json();
        // faire quelque chose avec le json

        return "WIP";
    }

    const supprimerUtilisateur = async (idUtilisateur) => {
        const reponse = await fetch('http://URL_DE_L_API', {
            method: 'POST',
            body: JSON.stringify({
                id: idUtilisateur
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const monJson = await reponse.json();
        // faire quelque chose avec le json

        return "WIP";
    }

}