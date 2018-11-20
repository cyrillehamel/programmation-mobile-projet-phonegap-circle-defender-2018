var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    return function()
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageJeuVue;

            init();

        };


        function init() {
            var stage = new createjs.Stage("demo-canvas");
            var circle = new createjs.Shape();

            circle.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
            circle.x = 100;
            circle.y = 100;

            stage.addChild(circle);

            createjs.Tween.get(circle, {loop: true})
                .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
                .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
                .to({alpha: 0, y: 125}, 100)
                .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
                .to({x: 100}, 800, createjs.Ease.getPowInOut(2));

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", stage);
        };



    };



})();

