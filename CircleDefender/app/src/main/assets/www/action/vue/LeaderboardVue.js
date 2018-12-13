var LeaderboardVue = (function()
{
    var pageLeaderboardVue = document.getElementById("page-leaderboard").innerHTML;

    return function(tableauLeaderboard)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageLeaderboardVue;
            
            var listeScore = document.getElementById("liste-score");

            var li="";
            for (var numeroScore in tableauLeaderboard)
            {
                li += '<li class="list-group-item  justify-content-between lh-condensed " ><a class="nav-link" href="#detail-joueur\/';                
                li += tableauLeaderboard[numeroScore].id + '">' + tableauLeaderboard[numeroScore].pseudonyme;
                li += " " + tableauLeaderboard[numeroScore].score + '</a> </li>';
            }
            listeScore.innerHTML = li;
        }
    };

})();

