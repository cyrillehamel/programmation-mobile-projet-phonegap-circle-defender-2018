var DetailJoueurVue = (function()
{
    var pageDetailJoueurVue = document.getElementById("page-detail-joueur").innerHTML;

    return function(utilisateur)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageDetailJoueurVue;

            // Changement du Pseudonyme (h1)
            var pseudonyme = document.getElementById("pseudo-joueur");
            pseudonyme.innerHTML = utilisateur.pseudonyme;

            // Changement du classement
            var classement = document.getElementById("classement-joueur");
            if (utilisateur.classement !== undefined)
                classement.innerHTML = "Classement : #" + utilisateur.classement;
            else
                classement.innerHTML = "Classement : Non calculé";

            // Changement du meilleur score
            var meilleurScore = document.getElementById("meilleur-score-joueur");
            if (utilisateur.meilleurScore !== undefined)
                meilleurScore.innerHTML = "Meilleur Score : " + utilisateur.meilleurScore;
            else
                meilleurScore.innerHTML = "Meilleur Score : Non calculé";

            // Changement du score total
            var scoreTotal = document.getElementById("score-total-joueur");
            if (utilisateur.scoreTotal !== undefined)
                scoreTotal.innerHTML = "Score total : " + utilisateur.scoreTotal;
            else
                scoreTotal.innerHTML = "Score total : Non calculé";

            // Changement du nombre 
            var nombreParties = document.getElementById("nombre-parties-joueur");
            if (utilisateur.nombreParties !== undefined)
                nombreParties.innerHTML = "Parties : " + utilisateur.nombreParties;
            else
                nombreParties.innerHTML = "Parties : Non calculé";

            // Changement du nombre de frags
            var nombreFrags = document.getElementById("nombre-frags-joueur");
            if (utilisateur.nombreFrags !== undefined)
                nombreFrags.innerHTML = "Frags : " + utilisateur.nombreFrags;
            else
                nombreFrags.innerHTML = "Frags : Non calculé";
        }
        
    };
})();

