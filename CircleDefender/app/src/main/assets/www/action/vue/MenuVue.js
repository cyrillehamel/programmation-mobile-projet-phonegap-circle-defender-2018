var MenuVue = (function()
{
    var pageMenuVue = document.getElementById("page-menu").innerHTML;

    const utilisateurAppelerAPI = new UtilisateurAppelerAPI();
    console.log(utilisateurAppelerAPI.ajouterUtilisateur("test@test", "mdpmdpmdp", "testcallapi"))

    return function()
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageMenuVue;
        }
    };

})();

