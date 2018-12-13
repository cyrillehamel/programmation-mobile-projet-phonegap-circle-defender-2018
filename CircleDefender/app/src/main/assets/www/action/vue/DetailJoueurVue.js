var DetailJoueurVue = (function()
{
    var pageDetailJoueurVue = document.getElementById("page-detail-joueur").innerHTML;

<<<<<<< HEAD
    return function(utilisateurDetail)
=======
    return function (utilisateur)
>>>>>>> 2058ab094210054a509aa5efcb1ffd165eae69f5
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageDetailJoueurVue;
<<<<<<< HEAD
            document.getElementById("pseudo_joueur").innerHTML = utilisateurDetail.pseudonyme;
            document.getElementById("meilleur_score_joueur").innerHTML = utilisateurDetail.meilleurScore;
            document.getElementById("Score_total_joueur").innerHTML = utilisateurDetail.scoreTotal;
            document.getElementById("nombre_parties_joueur").innerHTML = utilisateurDetail.nombreParties;
            document.getElementById("classement_joueur").innerHTML = utilisateurDetail.classement;
=======

            var pseudonyme = document.getElementById("pseudo-joueur");

            pseudonyme.innerHTML = utilisateur.pseudonyme;
>>>>>>> 2058ab094210054a509aa5efcb1ffd165eae69f5
        }
        
    };
})();

