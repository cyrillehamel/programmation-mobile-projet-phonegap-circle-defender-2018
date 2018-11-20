var ModifierCompteVue = (function()
{
    var pageModifierCompteVue = document.getElementById("page-modifier-compte").innerHTML;

    return function(utilisateur,actionModifierCompte)
     {
        var comptePseudonyme;
        var compteMail;
        var compteMotDePasse;
        var confirmationComptemotDePasse;
   
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageModifierCompteVue;
           
               var formulaireModifier = document.getElementById("formulaire-modifier-compte");
            
            comptePseudonyme =document.getElementById("pseudonyme");
            comptePseudonyme.value  = utilisateur.pseudonyme;

            compteMail = document.getElementById("mail");
            compteMail.value  = utilisateur.mail;

            compteMotDePasse = document.getElementById("mot_de_passe");
            compteMotDePasse.value  = utilisateur.motDePasse;
            
            confirmationComptemotDePasse=document.getElementById("confirmer_mot_de_passe");
            confirmationComptemotDePasse.value = utilisateur.motDePasse;
           
             formulaireModifier.addEventListener("submit",enregistrerUtilisateur);
        }
        var enregistrerUtilisateur = function(evenement)
        {
            //alert("enregistrerUtilisateur");
            evenement.preventDefault();

            var pseudonyme = document.getElementById("pseudonyme").value;
            var mail = document.getElementById("mail").value;
            var motdePasse = document.getElementById("mot_de_passe").value;
            var confirmationMotdepasse = document.getElementById("confirmer_mot_de_passe").value;
            
            if(confirmationMotdepasse ==  motdePasse){
                
             var UtilsateurModifier = new Utilisateur(utilisateur.id, mail, motdePasse, pseudonyme);

            actionModifierCompte(UtilsateurModifier);   
            }
                

        }

    };
})();