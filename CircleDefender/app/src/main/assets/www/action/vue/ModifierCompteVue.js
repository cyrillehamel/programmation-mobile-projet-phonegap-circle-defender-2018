var ModifierCompteVue = (function()
{
    var pageModifierCompteVue = document.getElementById("page-modifier-compte").innerHTML;

    return function(utilisateur, actionModifierCompte)
     {
        var comptePseudonyme;
        var compteMail;
   
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageModifierCompteVue;
            
            var formulaireModifier = document.getElementById("formulaire-modifier-compte");
            
            comptePseudonyme = document.getElementById("pseudonyme");
            comptePseudonyme.value = utilisateur.pseudonyme;

            compteMail = document.getElementById("mail");
            compteMail.value = utilisateur.mail;

            formulaireModifier.addEventListener("submit", enregistrerUtilisateur);
        }

        var enregistrerUtilisateur = function(evenement)
        {
            //alert("enregistrerUtilisateur");
            evenement.preventDefault();

            var pseudonyme = document.getElementById("pseudonyme").value;
            var mail = document.getElementById("mail").value;
            var motDePasse = document.getElementById("mot_de_passe").value;
            var confirmationMotdepasse = document.getElementById("confirmer_mot_de_passe").value;
            
            if(confirmationMotdepasse ==  motDePasse) {
            
            var tableauDeBits = sjcl.hash.sha512.hash(motDePasse);
            var motDePasse = sjcl.codec.hex.fromBits(tableauDeBits);
            var UtilsateurModifier = new Utilisateur(utilisateur.id, mail, motDePasse, pseudonyme, null);
            actionModifierCompte(UtilsateurModifier);   
            }

        }

    };
})();