var DetailJoueurVue = (function()
{
    var pageDetailJoueurVue = document.getElementById("page-detail-joueur").innerHTML;

    return function(utilisateurDetail)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageDetailJoueurVue;
            document.getElementById("pseudo_joueur").innerHTML = utilisateurDetail.pseudonyme;
            document.getElementById("meilleur_score_joueur").innerHTML = utilisateurDetail.meilleurScore;
            document.getElementById("Score_total_joueur").innerHTML = utilisateurDetail.scoreTotal;
            document.getElementById("nombre_parties_joueur").innerHTML = utilisateurDetail.nombreParties;
            document.getElementById("classement_joueur").innerHTML = utilisateurDetail.classement;
        }
        
    };
})();

