var UtilisateurDAO = function ()
{
    this.lireUtilisateurParId = async (idUtilisateur) => {
        if (!Number.isInteger(idUtilisateur)) {
            window.alert("Vous devez entrer un nombre entier pour voir un profil. ID : " + idUtilisateur);
            return null;
        }

        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/lireUn.php?id=' + idUtilisateur);
        var utilisateur = await reponse.json();

        return new Utilisateur(
            utilisateur.id,
            utilisateur.mail,
            utilisateur.pseudonyme,
            utilisateur.creation
            );
    }

    // TODO
    this.lireListeMeilleursJoueurs = async () => {
        var listeMeilleursJoueurs = [];

        const reponse = await fetch('http://URL_DE_L_API');
        const monJson = await reponse.json();

        // TODO : prendre le JSON et ajouter à la liste tous les joueurs récupérés
        
        //localStorage['meilleursJoueurs'] = JSON.stringify(listeMeilleursJoueurs);

        // return ??
    }

    this.ajouterUtilisateur = async (mail, motDePasse, pseudonyme) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/ajouter.php', {
            method: 'POST',
            body: JSON.stringify({
                mail: mail,
                mdp: motDePasse,
                pseudonyme: pseudonyme
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        );
        const utilisateur = await reponse.json();
        console.log(utilisateur);

        return new Utilisateur(
            utilisateur.id,
            utilisateur.mail,
            utilisateur.pseudonyme,
            utilisateur.creation
        );
    }

    this.modifierUtilisateur = async (utilisateur) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/modifier.php', {
            method: 'POST',
            body: JSON.stringify({
                id: utilisateur.id,
                mdp: utlisateur.motDePasse,
                pseudonyme: utlisateur.pseudonyme
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // TODO : message pour confirmer la modification
    }

    this.supprimerUtilisateur = async (idUtilisateur) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/supprimer.php', {
            method: 'POST',
            body: JSON.stringify({
                id: idUtilisateur
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // TODO : message pour confirmer la suppression
    }

}