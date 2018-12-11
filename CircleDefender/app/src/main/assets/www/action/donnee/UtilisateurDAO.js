var UtilisateurDAO = function ()
{
    /**
     * Lit la liste des meilleurs joueurs
     * @return {Object} un tableau associatif
     */
    this.lireListeMeilleursJoueurs = async () => {
        var listeMeilleursJoueurs = [];

        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/score/meilleursScores.php');
        const listeMeilleursJoueursJson = await reponse.json();
        listeMeilleursJoueurs = listeMeilleursJoueursJson;

        localStorage['listeMeilleursJoueurs'] = JSON.stringify(listeMeilleursJoueurs);

        return JSON.parse(listeMeilleursJoueursJson);
    }

    /**
     * Lit des détails d'un joueur en fonction de son id
     * @param {Number} id l'id de l'utilisateur à lire
     * @return {null} si l 'id en paramètre n'est pas un nombre entier
     * ou si l 'enregistrement associé n'existe pas en base de données
     * @return {Utilisateur} l 'utilisateur associé à l'id
    */
    this.lireDetailJoueur = async(id) => {
        if (!Number.isInteger(id)) {
            window.alert("Vous devez entrer un nombre entier pour voir un profil. ID : " + id);
            return null;
        }

        const reponse = await fetch('http://URL');
        const utilisateur = await reponse.json();

        return (utilisateur.id === undefined ? null : new UtilisateurDetail());
    }

    /**
     * Lit un utilisateur en fonction de l'id en paramètre
     * @param {Number} id l'id de l'utilisateur à lire
     * @return {null} si l'id en paramètre n'est pas un nombre entier
     * ou si l 'enregistrement associé n'existe pas en base de données
     * @return {Utilisateur} l'utilisateur associé à l'id
     */
    this.lireUtilisateurParId = async(id) => {
        if (!Number.isInteger(id)) {
            window.alert("Vous devez entrer un nombre entier pour voir un profil. ID : " + id);
            return null;
        }

        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/lireUn.php?id=' + id);
        const utilisateur = await reponse.json();

        return (utilisateur.id === undefined ? null : new Utilisateur(utilisateur.id, utilisateur.mail, null, utilisateur.pseudonyme, utilisateur.creation));
    }

    /**
     * Lit un utilisateur en fonction de son mail
     * @param {String} mail l'adresse mail de l'utilisateur à lire
     * @return {null} si l'utilisateur demandé n'existe pas
     * @return {Utilisateur} l'utilisateur associé à l'adresse mail
     */
    this.lireUtilisateurParMail = async(mail) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/lireUn.php?mail=' + mail);
        const utilisateur = await reponse.json();

        return (utilisateur.id === undefined ? null : new Utilisateur(utilisateur.id, utilisateur.mail, null, utilisateur.pseudonyme, utilisateur.creation));
    }

    /**
     * Vérifie si la combinaison mail / mot de passe existe en base de données
     * @param {String} mail le mail de l'utilisateur
     * @param {String} motDePasse le mot de passe hashé de l'utilisateur
     * @return {boolean} true si la combinaison est valide
     * @return {boolean} false si la combinaison n'est pas valide
     */
    this.lireUtilisateurPourAuthentification = async(mail, motDePasse) => {
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

        const rep = await reponse.json();
        
        return (rep.id === undefined ? false : true);
    }

    /**
     * Ajoute en base de données en nouvel utilisateur
     * @param {String} mail l'adresse mail de l'utilisateur
     * @param {String} motDePasse le mot de passe hashé de l'utilisateur
     * @param {String} pseudonyme le pseudonyme de l'utilisateur
     * @return {Utilisateur} l'utilisateur venant d'être créé
     */
    this.ajouterUtilisateur = async(mail, motDePasse, pseudonyme) => {
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

        if (reponse.ok)
        {
            window.alert("L'utilisateur a bien été créé. Bon jeu !");
        }

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
    this.modifierUtilisateur = async(utilisateur) => {
        if (!(utilisateur instanceof Utilisateur))
        {
            window.alert("Tentative de modification d'un utilisateur qui n'est pas de type Utilisateur.");
        }

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

        if (reponse.ok)
        {
            window.alert("L'utilisateur a été correctement modifié.");
        }
    }

    /**
     * Supprimer un utilisateur avec un id donné
     * @param {number} id l'id de l'utilisateur
     */
    this.supprimerUtilisateur = async(id) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/utilisateur/supprimer.php', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (reponse.ok)
        {
            window.alert("L'utilisateur a été correctement supprimé.");
        }
    }

}