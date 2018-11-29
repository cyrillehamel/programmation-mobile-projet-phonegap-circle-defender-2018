var AuthentifierVue = (function()
{
    var pageAuthentifierVue = document.getElementById("page-authentification").innerHTML;

    return function(actionAuthentifierCompte)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageAuthentifierVue;
            var formulaireAuthentifier = document.getElementById("formulaire-authentification");
            formulaireAuthentifier.addEventListener("submit",AuthentifierUtilisateur);
 
        }
        var AuthentifierUtilisateur = function(evenement)
        {
            
           
            actionAuthentifierCompte(Utilsateur);   
            }
                

        

    };
})();