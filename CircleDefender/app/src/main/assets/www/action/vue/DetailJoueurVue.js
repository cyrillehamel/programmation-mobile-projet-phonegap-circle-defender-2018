var DetailJoueurVue = (function()
{
    var pageDetailJoueurVue = document.getElementById("page-detail-joueur").innerHTML;

    return function (utilisateur)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageDetailJoueurVue;

            var pseudonyme = document.getElementById("pseudo-joueur");

            pseudonyme.innerHTML = utilisateur.pseudonyme;
        }
        
    };
})();

