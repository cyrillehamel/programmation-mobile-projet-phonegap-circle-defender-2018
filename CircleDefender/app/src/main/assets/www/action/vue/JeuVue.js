var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    console.log("jeuVue -> debut classe");


    return function()
    {
        var stagePrincipal;


        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageJeuVue;
            stagePrincipal = new createjs.Stage("demo-canvas");
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", stagePrincipal);

            console.log("JeuVue -> afficher");

            afficherCercleJoueur();
            afficherEnnemis();
        };

        function afficherCercleJoueur(){

            console.log("JeuVue -> afficherCercleJoueur");

            var circle = new createjs.Shape();
            circle.graphics.beginFill("Black").drawCircle(0, 0, 18);
            circle.x = 188;
            circle.y = 400;
            stagePrincipal.addChild(circle);
            stagePrincipal.update();
        };


        function afficherEnnemis() {

            var circle = new createjs.Shape();

            circle.graphics.beginFill("Crimson").drawCircle(0, 0, 10);
            circle.x = 100;
            circle.y = 100;

            stagePrincipal.addChild(circle);

            createjs.Tween.get(circle, {loop: true})
                .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
                .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
                .to({alpha: 0, y: 125}, 100)
                .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
                .to({x: 100}, 800, createjs.Ease.getPowInOut(2));

        };





    };



})();

