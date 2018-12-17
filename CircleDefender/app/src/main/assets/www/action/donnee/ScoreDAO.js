var ScoreDAO = function ()
{
    /**
     * Lit la liste des meilleurs joueurs
     * @return {Object} un tableau associatif Json
     */
    this.lireListeMeilleursJoueurs = async () => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/score/meilleursScores.php');
        const listeMeilleursJoueurs = await reponse.json();

        localStorage['listeMeilleursJoueurs'] = JSON.stringify(listeMeilleursJoueurs);

        return listeMeilleursJoueurs;
    }

    /**
     * Lit des détails d'un joueur en fonction de son id
     * @param {Number} id l'id de l'utilisateur à lire
     * @return {null} si l 'id en paramètre n'est pas un nombre entier
     * ou si l 'enregistrement associé n'existe pas en base de données
     * @return {Utilisateur} l 'utilisateur associé à l'id
     */
    this.lireDetailJoueur = async (id) => {
        if (!Number.isInteger(id)) {
            window.alert("Vous devez entrer un nombre entier pour consulter les détails d'un profil &. ID : " + id);
            return null;
        }

        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/score/lireUn.php?id=' + id);
        const utilisateur = await reponse.json();

        return (utilisateur.id_utilisateur === undefined ? null :
            new UtilisateurDetail(
                utilisateur.id_utilisateur,
                utilisateur.pseudonyme_utilisateur,
                utilisateur.meilleur_score,
                utilisateur.score_total,
                utilisateur.nombre_parties,
                utilisateur.classement
            )
        );
    }

    /**
     * Ajoute en base de données en nouveau score
     * @param {Number} score le score de l'utilisateur
     * @param {Number} idUtilisateur l'id de l'utilisateur
     * @param {Number} idModeDeJeu l'id du mode de jeu sur lequel a été réalisée la partie
     * @param {Number} frag le nombre d'ennemis tués
     */
    this.ajouterScore = async (score, idUtilisateur, idModeDeJeu,idPersonnage, frag) => {
        const reponse = await fetch('http://54.37.152.134/CircleDefenderAPI/score/ajouter.php', {
            method: 'POST',
            body: JSON.stringify({
                score: score,
                id_utilisateur: idUtilisateur,
                id_mode_de_jeu: idModeDeJeu,
                id_personnage: idPersonnage,
                frag: frag
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const scoreJson = await reponse.json();

        if (reponse.ok) {
            window.alert("Votre nouveau score a été correctement enregistré.");
        }
    }
}