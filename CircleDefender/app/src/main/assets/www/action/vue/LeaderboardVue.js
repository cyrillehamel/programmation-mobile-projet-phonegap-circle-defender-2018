var LeaderboardVue = (function()
{
    var pageLeaderboardVue = document.getElementById("page-leaderboard").innerHTML;

    return function()
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageLeaderboardVue;

            
        }
    };

})();

