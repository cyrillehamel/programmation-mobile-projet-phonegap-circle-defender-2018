var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    return function()
    {
        var canvas;
        var stagePrincipal;
        var arcDeCercle;
        var cercleJoueur;

        var debutBouclier, finBouclier;

        var debutInterval = 0;
        var testInterval;

        var dureeTrajetEnnmi;

        var positionJoueurX, positionJoueurY;

        var positionJoueurXPourCible, positionJoueurYPourCible;

        var arcDeCercleEstEnHaut = true;
        var cercleEnnemis = new createjs.Shape();
        var circleEnnemiAutres = new createjs.Shape();


        var initialiser = function(){

            cercleEnnemis.graphics.beginFill("Crimson").drawCircle(0, 0, 10);

            canvas = document.createElement('canvas');
            canvas.id = "demo-canvas";
            canvas.width = window.screen.availWidth;
            canvas.height = window.screen.availHeight;
            /*canvas.style.zIndex = 8;
            canvas.style.position = "center";
            canvas.style.border = "1px solid";*/

            positionJoueurX = Math.round(canvas.width / 2);
            positionJoueurY = Math.round(canvas.height / 2);

            document.getElementsByTagName("body")[0].innerHTML = pageJeuVue;
            document.body.appendChild(canvas);
            demoCanvas = document.getElementById("demo-canvas");

            //var ctx = canvas.getContext("2d");    Peut être utile !! NE PAS SUPPRIMER !!

            rendreGesturePourArcDeCercleDisponible();

            stagePrincipal = new createjs.Stage("demo-canvas");
            createjs.Ticker.setFPS(60);

            createjs.Ticker.addEventListener("tick", rafraichirScene);
        };


        this.afficher = function()
        {

            afficherCercleJoueur();
            afficherCarreBouclier();
            //afficherArcDeCercle(arcDeCercleEstEnHaut);
        };

        function rafraichirScene(evenement){
            //carreBouclier.rotation++;

            var isNouvelEnnemi = false;

            if (debutInterval == 0){
                debutInterval = new Date().getTime();
                isNouvelEnnemi = true;
                //console.log("rafraichir scene : début interval");

            }
            else {
                testInterval = new Date().getTime();

                if (testInterval - debutInterval >= dureeTrajetEnnmi){
                    isNouvelEnnemi = true;
                    // console.log("rafraichir scene : test interval");
                }

                if (testerCollisionAvecBouclier()){
                    detruireEnnemis();
                    isNouvelEnnemi = true;
                    //console.log("collision avec bouclier : true  ");
                }
                else if (testerCollision()) {
                    //  createjs.Ticker.removeEventListener("tick", rafraichirScene);
                    detruireEnnemis();
                    isNouvelEnnemi = true;
                    //console.log("collision avec joueur : true  ");
                }

            }
            if(isNouvelEnnemi) {
                demarrerEnnemis();
                debutInterval = testInterval;
                //console.log("condition isNouvelEnnmi ");
            }

            stagePrincipal.update(evenement); // pour que le framerate soit pris en compte

        };

        function rendreGesturePourArcDeCercleDisponible(){

            var myElement = document.getElementById('demo-canvas');
            var mc = new Hammer(myElement);

            // let the pan gesture support all directions.
            // this will block the vertical scrolling on a touch-device while on the element
            mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

            mc.on("panleft panright panup pandown tap press", function(ev) {
                console.log("Gesture Arc de Cercle détectée");
                stagePrincipal.removeChild(arcDeCercle);
                arcDeCercleEstEnHaut = !arcDeCercleEstEnHaut;
                //afficherArcDeCercle(arcDeCercleEstEnHaut);
            });
        }

        function testerIntersection(rect1,  rect2){
                if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
                return true;
        };

        function testerCollision(){

            var rectangleEnnemi = {
                x : cercleEnnemis.x,
                y : cercleEnnemis.y,
                width : cercleEnnemis.getBounds().width,
                height : cercleEnnemis.getBounds().height
            };

            var rectangleJoueur = cercleJoueur.getBounds();

            if (testerIntersection(rectangleJoueur, rectangleEnnemi)){
                var centreJoueurX = (rectangleJoueur.width - rectangleJoueur.x) / 2;
                var centreJoueurY = (rectangleJoueur.height - rectangleJoueur.y) / 2;

                var centreEnnemiX = (rectangleEnnemi.width - rectangleEnnemi.x) / 2;
                var centreEnnemiY = (rectangleEnnemi.height - rectangleEnnemi.y) / 2;

                var distanceReelle = Math.sqrt(Math.pow(centreEnnemiX - centreJoueurX, 2) + Math.pow(centreEnnemiY - centreJoueurY, 2));

                var distanceCollision = rectangleJoueur.width / 2  + rectangleEnnemi.width / 2;

                if (distanceReelle < distanceCollision ){
                    console.log("testerCollision : intersection détectée");
                    //alert("Intersection détectée");
                    //cercleJoueur.alpha = .2;
                    return true;

                }
            }
            return false;
        }

        function calculerDistancePourEnnemis(){
            var centreJoueurX = cercleJoueur.x  + 18;
            var centreJoueurY = cercleJoueur.y + 18;

            var centreEnnemiX = cercleEnnemis.x + 10;
            var centreEnnemiY = cercleEnnemis.y + 10;

            return Math.sqrt(Math.pow(centreEnnemiX - centreJoueurX, 2) + Math.pow(centreEnnemiY - centreJoueurY, 2));
        };

        function calculerDureeTrajetEnnemis(distance){
            var tempsObjectif = 500; //pour 200px, en ms
            var distanceObjective = 200; //px

            return Math.floor((tempsObjectif * distance) / distanceObjective);
        };

        function testerCollisionAvecBouclier(){

            var R = 10;
            var pointA = carreBouclier.localToGlobal(65, 0);
            var pointB = carreBouclier.localToGlobal(65, 65);

            // compute the euclidean distance between A and B
            var Ax = pointA.x; var Ay = pointA.y;
            var Bx = pointB.x; var By = pointB.y;

            var LAB = Math.sqrt( Math.pow((Bx - Ax), 2) + Math.pow((By - Ay),2) );

            // compute the direction vector D from A to B
            var Dx = (Bx - Ax) / LAB;
            var Dy = (By - Ay) / LAB;

            // the equation of the line AB is x = Dx*t + Ax, y = Dy*t + Ay with 0 <= t <= LAB.

            // compute the distance between the points A and E, where
            // E is the point of AB closest the circle center (Cx, Cy)
            var Cx = cercleEnnemis.x + 10; var Cy = cercleEnnemis.y + 10;

            var t = Dx*(Cx-Ax) + Dy*(Cy-Ay);

            // compute the coordinates of the point E
            var Ex = t*Dx+Ax;
            var Ey = t*Dy+Ay;

            // compute the euclidean distance between E and C
            var LEC = Math.sqrt(Math.pow((Ex-Cx),2) + Math.pow((Ey-Cy),2));

            // test if the line intersects the circle
            if( LEC < R ) {
                /*// compute distance from t to circle intersection point
                var dt = Math.sqrt( R * R - LEC * LEC);

                // compute first intersection point
                var Fx = (t-dt)*Dx + Ax;
                var Fy = (t-dt)*Dy + Ay;

                // compute second intersection point
               var  Gx = (t+dt)*Dx + Ax;
               var Gy = (t+dt)*Dy + Ay;*/
               // console.log("Bouclier : pointA " + pointA.x + ", " + pointA.y + "; pointB " + pointB.x + ", " + pointB.y);
                //console.log("Point central ennemi : " + cercleEnnemis.x + ", " +cercleEnnemis.y + " " + cercleEnnemis.radius);

                //console.log("Intersection avec bouclier detectee!");
               return true;
            }

            return false;
        }

        
        function afficherCercleJoueur(){

            cercleJoueur = new createjs.Shape();
            //cercleJoueur.graphics.beginFill("red").drawRect(0, 0, 36, 36);
            cercleJoueur.setBounds(positionJoueurX, positionJoueurY, 36, 36);

            //cercleJoueur.regX = cercleJoueur.regY = 9;

            cercleJoueur.graphics.beginFill("Black").drawCircle(0, 0, 18);
            cercleJoueur.x = positionJoueurX;
            cercleJoueur.y = positionJoueurY;

            stagePrincipal.addChild(cercleJoueur);
            //stagePrincipal.update();
        };

        function afficherCarreBouclier(){
            carreBouclier = new createjs.Container();

            var bouclier = new createjs.Shape();

            //bouclier.graphics.beginFill("Red").drawRect(0, 0, 65, 65);

            bouclier.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)");
            bouclier.graphics.moveTo(50, 0);
            bouclier.graphics.lineTo(50, 50);

            carreBouclier.x = positionJoueurX;
            carreBouclier.y = positionJoueurY;

            carreBouclier.regX = carreBouclier.regY = 25;
            //carreBouclier.rotation += 45;

            carreBouclier.addChild(bouclier);

            /*debutBouclier  = new createjs.Shape();
            //debutBouclier.graphics.beginFill("Yellow").drawRect(0, 0, 1, 1);
            debutBouclier.x = 65;
            debutBouclier.y = 0;

            finBouclier  = new createjs.Shape();
            //finBouclier.graphics.beginFill("Yellow").drawRect(0, 0, 1, 1);
            finBouclier.x = 65;
            finBouclier.y = 65;

            carreBouclier.addChild(debutBouclier, finBouclier);*/

            stagePrincipal.addChild(carreBouclier);

            console.log("debut bouclier : " + carreBouclier.localToGlobal(65, 0));

        };

        /*function afficherArcDeCercle(booleen){
            arcDeCercle = new createjs.Shape();
            //arcDeCercle.graphics.beginFill("yellow").drawRect(0, 0, 25, 25);

            arcDeCercle.regX = arcDeCercle.regY = 15;

            arcDeCercle.x = positionJoueurX;
            arcDeCercle.y = positionJoueurY;

            arcDeCercle.graphics.beginStroke("teal").arc(25, 25, 25, 0, Math.PI, booleen);
            //refactor radius

            stagePrincipal.addChild(arcDeCercle);
        };*/
        
        function afficherEnnemis() {

            afficherEnnemi1();

            var chanceSpawnNouveau = Math.floor(Math.random() * 10);
            if (chanceSpawnNouveau >= 8){
                //afficherEnnemiAutres();
            }
        };

        function afficherEnnemi1(){
            var isGauche = false;
            var isDroite = false;
            var isHaut = false;
            var isBas = false;

            if (Math.floor(Math.random()*2)){
                isDroite = true;
            }else{
                isGauche = true;
            }
            if (Math.floor(Math.random()*2)){
                isBas = true;
            }else{
                isHaut = true;
            }


            // quart haut gauche
            if(isHaut && isGauche){
                cercleEnnemis.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                cercleEnnemis.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);

            }
            // Quart haut droite
            else if (isHaut && isDroite){
                cercleEnnemis.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 50)+1)+(positionJoueurX - 50));
                cercleEnnemis.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);


            }
            // Quart bas gauche
            else if (isBas && isGauche){
                cercleEnnemis.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                cercleEnnemis.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

            }
            // Quart bas droite
            else {
                cercleEnnemis.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 70)+1)+(positionJoueurX - 70));
                cercleEnnemis.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

            }

            cercleEnnemis.setBounds(cercleEnnemis.x, cercleEnnemis.y, 20, 20);


            stagePrincipal.addChild(cercleEnnemis);

            dureeTrajetEnnmi = calculerDureeTrajetEnnemis(calculerDistancePourEnnemis());

            createjs.Tween.get(cercleEnnemis, {loop: false})
                .to({x:positionJoueurX, y: positionJoueurY}, dureeTrajetEnnmi, createjs.Ease.linear)
                .call(handleComplete);
                //.addEventListener("change", testerCollisionAvecBouclier);


            function handleComplete() {
                //throw new Error();

            }

        };

        function detruireEnnemis(){
            createjs.Tween.removeTweens(cercleEnnemis);
            stagePrincipal.removeChild(cercleEnnemis);
        };



        function afficherEnnemiAutres(){
            circleEnnemiAutres.graphics.beginFill("Green").drawCircle(0, 0, 10);

            positionJoueurXPourCible = positionJoueurX;
            positionJoueurYPourCible = positionJoueurY;

            var randomGaucheDroite = Math.floor(Math.random()*2);
            var randomBasHaut = Math.floor(Math.random()*2);

            // Quart haut gauche
            if((randomGaucheDroite===0) && (randomBasHaut===0)){
                circleEnnemiAutres.x = Math.floor(Math.random()*(positionJoueurX - 70)+1);
                circleEnnemiAutres.y = Math.floor(Math.random()*(positionJoueurY - 70)+1);

                positionJoueurXPourCible -= 23;
                positionJoueurYPourCible -= 23;
            }
            // Quart haut droite
            else if ((randomGaucheDroite===1) && (randomBasHaut===0)){
                circleEnnemiAutres.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 70)+1)+(positionJoueurX - 70));
                circleEnnemiAutres.y = Math.floor(Math.random()*(positionJoueurY - 70)+1);

                positionJoueurXPourCible += 23;
                positionJoueurYPourCible -= 23;
            }
            // Quart bas gauche
            else if ((randomGaucheDroite===0) && (randomBasHaut===1)){
                circleEnnemiAutres.x = Math.floor(Math.random()*(positionJoueurX - 70)+1);
                circleEnnemiAutres.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

                positionJoueurXPourCible -= 23;
                positionJoueurYPourCible += 23;
            }
            // Quart bas droite
            else {
                circleEnnemiAutres.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 70)+1)+(positionJoueurX - 70));
                circleEnnemiAutres.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

                positionJoueurXPourCible += 23;
                positionJoueurYPourCible += 23;
            }

            stagePrincipal.addChild(circleEnnemiAutres);

            createjs.Tween.get(circleEnnemiAutres, {loop: true})
                .to({x:positionJoueurXPourCible, y: positionJoueurYPourCible}, 500, createjs.Ease.linear);

        };


        function demarrerEnnemis(){
            stagePrincipal.removeChild(circleEnnemiAutres);
            afficherEnnemis();

        };


    
        initialiser();

    };

})();

