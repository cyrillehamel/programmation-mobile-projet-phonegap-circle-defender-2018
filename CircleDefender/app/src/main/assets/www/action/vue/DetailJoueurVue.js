var DetailJoueurVue = (function()
{
    var pageDetailJoueurVue = document.getElementById("page-detail-joueur").innerHTML;

    return function(utilisateurDetail)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageDetailJoueurVue;

            // Changement du Pseudonyme (h1)
            var pseudonyme = document.getElementById("pseudo-joueur");
            pseudonyme.innerHTML = utilisateur.pseudonyme;

            // Changement du classement
            var classement = document.getElementById("classement-joueur");
            classement.innerHTML = "Classement : #" + utilisateur.classement;

            // Changement du meilleur score
            var meilleurScore = document.getElementById("meilleur-score-joueur");
            meilleurScore.innerHTML = "Meilleur Score : " + utilisateur.meilleurScore;

            // Changement du score total
            var scoreTotal = document.getElementById("score-total-joueur");
            scoreTotal.innerHTML = "Score total : " + utilisateur.scoreTotal;

            // Changement du nombre 
            var nombreParties = document.getElementById("nombre-parties-joueur");
            nombreParties.innerHTML = "Parties : " + utilisateur.nombreParties;

            // Changement du nombre de frags
            var nombreFrags = document.getElementById("nombre-frags-joueur");
            nombreFrags.innerHTML = "Frags : " + utilisateur.nombreFrags;
        }
        
    };
})();

