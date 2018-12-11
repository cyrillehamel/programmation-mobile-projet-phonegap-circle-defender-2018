var LeaderboardVue = (function()
{
    var pageLeaderboardVue = document.getElementById("page-leaderboard").innerHTML;

    return function(arrayleaderboard)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageLeaderboardVue;
            
            var listeScore = document.getElementById("liste-score");

            var li="";
            for(var numeroScore in arrayleaderboard)
            {   
                
                li += '<li class="list-group-item  justify-content-between lh-condensed " ><a class="nav-link" href="#detail-joueur\\';                
                li+= arrayleaderboard[numeroScore].id +'">'+arrayleaderboard[numeroScore].pseudonyme;
                   
                    li+=" "+arrayleaderboard[numeroScore].score+
                '</a> </li>';
                   
            }
            listeScore.innerHTML = li;
            
        }
    };

})();

