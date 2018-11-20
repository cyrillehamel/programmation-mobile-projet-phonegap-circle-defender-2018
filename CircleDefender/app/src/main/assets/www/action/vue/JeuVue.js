var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;


    return function()
    {
        var stagePrincipal;

        var initialiser = function(){
            document.getElementsByTagName("body")[0].innerHTML = pageJeuVue;
            stagePrincipal = new createjs.Stage("demo-canvas");
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", stagePrincipal);
        };


        this.afficher = function()
        {
            afficherCercleJoueur();
            afficherEnnemis();
        };


        function afficherCercleJoueur(){

            var circle = new createjs.Shape();
            circle.graphics.beginFill("Black").drawCircle(0, 0, 18);
            circle.x = 188;
            circle.y = 400;
            stagePrincipal.addChild(circle);
            //stagePrincipal.update();
        };


        function afficherEnnemis() {

            var circle = new createjs.Shape();

            circle.graphics.beginFill("Crimson").drawCircle(0, 0, 10);
            circle.x = 188;
            circle.y = 100;

            stagePrincipal.addChild(circle);

            createjs.Tween.get(circle, {loop: true})
                .to({y: 372}, 2000, createjs.Ease.getPowInOut(2));

        };

        initialiser();

    };

})();

