var CreationCompteVue = (function()
{
    var pageCreationCompteVue = document.getElementById("page-creation-compte").innerHTML;

    return function()
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageCreationCompteVue;            
        }
    };

})();

