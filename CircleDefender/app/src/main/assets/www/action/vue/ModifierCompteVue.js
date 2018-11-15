var ModifierCompteVue = (function()
{
    var pageModifierCompteVue = document.getElementById("page-modifier-compte").innerHTML;

    return function()
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageModifierCompteVue;

            
        }
    };

})();
