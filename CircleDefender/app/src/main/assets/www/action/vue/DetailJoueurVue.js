var DetailJoueurVue = (function()
{
    var pageDetailJoueurVue = document.getElementById("page-detail-joueur").innerHTML;

    return function()
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = DetailJoueurVue;
        }
        
    };
})();

