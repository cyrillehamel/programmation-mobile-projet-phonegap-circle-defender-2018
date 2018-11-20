(function()
{
    var instance = this;

    var initialiser = function()
    {
        

         window.addEventListener("hashchange",naviguer);

        naviguer();

    }

    var naviguer = function()
    {
     var hash = window.location.hash;
       
        if(!hash)
        {
            var authentifierVue = new AuthentifierVue();
            authentifierVue.afficher();
             
        }
        else if(hash.match(/^#menu/))
        {
            var menuVue = new MenuVue();
            menuVue.afficher();
        }
        else if(hash.match(/^#jeu/))
        {
            
            var jeuVue = new JeuVue();
            console.log("application -> afficher BEFORE");
            jeuVue.afficher();

            console.log("application -> afficher AFTER");


        }
        else if(hash.match(/^#modifier-compte\/([0-9]+)/))
        {
            var modifierCompteVue = new ModifierCompteVue();
            modifierCompteVue.afficher();
        }
        else if(hash.match(/^#detail-joueur\/([0-9]+)/))
        {
            var detailJoueurVue = new DetailJoueurVue();
            detailJoueurVue.afficher();
        }
        else
        {
            if(hash.match(/^#leaderboard/)){
             
            
            var leaderboardVue = new LeaderboardVue();
            leaderboardVue.afficher();  
            }
            
        }  

    }
    
    initialiser();

})();