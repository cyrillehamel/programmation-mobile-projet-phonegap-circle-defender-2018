var AuthentifierVue = (function()
{
    var pageAuthentifierVue = document.getElementById("page-authentification").innerHTML;

    return function(actionAuthentifierCompte)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageAuthentifierVue;
            var formulaireAuthentifier = document.getElementById("formulaire-authentification");
            formulaireAuthentifier.addEventListener("submit", authentifierUtilisateur);
 
        }
        var authentifierUtilisateur = function(evenement)
        {
            evenement.preventDefault();

            // Vérif avec des alerts, à réactiver / modifier
            /*if (document.getElementById("identifiant").value == "") {
                window.alert("Vous devez entrer un identifiant.");
                return;
            }
            if (document.getElementsById("mot_de_passe").value == "") {
                window.alert("Vous devez entrer un mot de passe.");
                return;
            }*/

            var identifiant = document.getElementById("identifiant").value;
            // Hashage du mot de passe de l'utilisateur :
            var tableauDeBits = sjcl.hash.sha512.hash(document.getElementById("mot_de_passe").value;);
            var motDePasse = sjcl.codec.hex.fromBits(tableauDeBits);
            
            // création d'un utilisateur
            var utilisateur = new Utilisateur(null, identifiant, motDePasse, null, null);

            actionAuthentifierCompte(utilisateur);   
        }
    };
})();