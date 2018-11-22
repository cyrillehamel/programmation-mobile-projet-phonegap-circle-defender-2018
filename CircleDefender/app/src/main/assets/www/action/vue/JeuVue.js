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
            afficherArcDeCercle();
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
                .to({y: 400}, 2000, createjs.Ease.linear);

        };

        function afficherArcDeCercle(){
            var arcDeCercle = new createjs.Shape();

            arcDeCercle.graphics.beginStroke("teal").arc(88, 300, 25, 0, Math.PI, true);
            arcDeCercle.x = 100;
            arcDeCercle.y = 100;

            stagePrincipal.addChild(arcDeCercle);
        }

        initialiser();

    };

})();

