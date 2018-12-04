var UtilisateurDAO = function ()
{
    // TODO
    this.lireListeMeilleursJoueurs = async () => {
        var listeMeilleursJoueurs = [];

        const reponse = await fetch('http://URL_DE_L_API');
        const monJson = await reponse.json();

        localStorage['meilleursJoueurs'] = JSON.stringify(listeMeilleursJoueurs);

        // return ??
    }

    /**
     * Lit un utilisateur en fonction de l'id en paramètre
     * @param {Number} id l'id de l'utilisateur à lire
     * @return {null} si l'id en paramètre n'est pas un nombre entier
     * ou si l 'enregistrement associé n'existe pas en base de données
     * @return {Utilisateur} l'utilisateur associé à l'id
     */
    this.lireUtilisateurParId = async (id) => {
        if (!Number.isInteger(id)) {
            window.alert("Vous devez entrer un nombre entier pour voir un profil. ID : " + id);
            return null;
        }

        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/lireUn.php?id=' + id);
        var utilisateur = await reponse.json();

        return (utilisateur.id === undefined ? null : new Utilisateur(utilisateur.id, utilisateur.mail, null, utilisateur.pseudonyme, utilisateur.creation));
    }

    /**
     * 
     */
    this.lireUtilisateurParMail = async (mail) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/lireUn.php?mail=' + mail);
        var utilisateur = await reponse.json();

        return new Utilisateur(
            utilisateur.id,
            utilisateur.mail,
            null,
            utilisateur.pseudonyme,
            utilisateur.creation
        );
    }

    /**
     * 
     */
    this.lireUtilisateurPourAuthentification = async (mail, motDePasse) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/auth.php', {
            method: 'POST',
            body: JSON.stringify({
                mail: mail,
                mdp: motDePasse
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        var rep = await reponse.json();
        
        return (rep.id === undefined ? false : true);
    }

    /**
     * 
     * @param {String} 
     * @param {String} 
     * @param {String} 
     */
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

        return new Utilisateur(
            utilisateur.id,
            utilisateur.mail,
            null,
            utilisateur.pseudonyme,
            utilisateur.creation
        );
    }

    /**
     * Modifie le mot de passe et le pseudonyme
     * @param {Utilisateur} utilisateur l'utilisateur contenant les nouveaux champs
     */
    this.modifierUtilisateur = async (utilisateur) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/modifier.php', {
            method: 'POST',
            body: JSON.stringify({
                id: utilisateur.id,
                mdp: utilisateur.motDePasse,
                pseudonyme: utilisateur.pseudonyme
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // TODO : message pour confirmer la modification
    }

    /**
     * Supprimer un utilisateur avec un id donné
     * @param {number} id l'id de l'utilisateur
     */
    this.supprimerUtilisateur = async (id) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/supprimer.php', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // TODO : message pour confirmer la suppression
    }

}