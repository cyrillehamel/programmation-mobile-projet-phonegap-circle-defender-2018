var CreationCompteVue = (function()
{
    var pageCreationCompteVue = document.getElementById("page-creation-compte").innerHTML;

    return function(actionCreationCompte)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageCreationCompteVue;
            var formulaireCreer = document.getElementById("formulaire-creation-compte");

            formulaireCreer.addEventListener("submit", enregistrerUtilisateur);
        }
        var enregistrerUtilisateur = function(evenement)
        {
            //alert("enregistrerUtilisateur");
            evenement.preventDefault();

            var pseudonyme = document.getElementById("pseudonyme").value;
            var mail = document.getElementById("email").value;
            var tableauDeBits = sjcl.hash.sha512.hash(document.getElementById("mot_de_passe").value);
            var motDePasse = sjcl.codec.hex.fromBits(tableauDeBits);
           
            var utilisateurCree = new Utilisateur(0, mail, motDePasse, pseudonyme,null);
            actionCreationCompte(utilisateurCree);   
        }
        
    };

})();

