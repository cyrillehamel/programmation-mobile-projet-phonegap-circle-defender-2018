var AuthentifierVue = (function()
{
    var pageAuthentifierVue = document.getElementById("page-authentification").innerHTML;

    return function()
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = AuthentifierVue;

            
        }
    };

})();

