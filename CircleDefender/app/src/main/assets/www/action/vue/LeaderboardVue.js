var LeaderboardVue = (function()
{
    var pageLeaderboardVue = document.getElementById("page-leaderboard").innerHTML;

    return function(listeScoreDonnee,listeUtilisateurDonnee)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageLeaderboardVue;
            
            var listeCadeau = document.getElementById("liste-score");

            var li="";
            for(var numeroScore in listeScoreDonnee)
            {   
                if(listeScoreDonnee[numeroScore] !=null){
                li += '<li class="list-group-item  justify-content-between lh-condensed " ><a class="nav-link" href="#detail-joueur\\'; 
                for(var numeroUtilisateur in listeUtilisateurDonnee){
                    if(listeUtilisateurDonnee[numeroUtilisateur].id === listeScoreDonnee[numeroScore].idUtilisateur ){                   
                     li+= listeUtilisateurDonnee[numeroUtilisateur].id +'">'+listeUtilisateurDonnee[numeroUtilisateur].pseudonyme;
                    }
                }
                    li+=" "+listeScoreDonnee[numeroScore].score+
                '</a> </li>';
                    }
            }
            listeCadeau.innerHTML = li;
            
        }
    };

})();

