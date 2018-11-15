var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    return function()
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageJeuVue;

            
        }
    };

})();

