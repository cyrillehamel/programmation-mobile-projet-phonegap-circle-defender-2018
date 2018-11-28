var AuthentifierVue = (function()
{
    var pageAuthentifierVue = document.getElementById("page-menu").innerHTML;

    return function()
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageAuthentifierVue;
 
        }
    };

})();
