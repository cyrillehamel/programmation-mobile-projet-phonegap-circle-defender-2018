(function()
{
    var soundWait = new Howl({
        src: ['data/musique/Waiting-Song.mp3'],
        loop: true,
        volume: 0.2
    });

    var soundReves = new Howl({
        src: ['data/musique/Reves-Du-Matin.mp3'],
        loop: true,
        volume: 0.2
    });

    if(localStorage['piste'] == null)
    {
        localStorage['piste']= '1';
	}

    if(localStorage['mute'] == null)
    {
        // Musique activée
      	localStorage['mute'] = false;
    }

    document.addEventListener("deviceready", function(){

        // attach events
        document.addEventListener("resume", onResume, false);
        document.addEventListener("pause", onPause, false);
    }, false);

    function onPause() {
        stopMusique();
    }

    function onResume() {
        playMusique();
    }

    var stopMusique = function()
    {
        soundWait.stop();
        soundReves.stop();
    }

    var playMusique = function(){

        stopMusique();

        // Musique activée
    	if(localStorage['mute'] == 'false')
        {
        	if(localStorage['piste']=='1')
    		{
        		soundWait.play();
    		}
	    	else
	    	{
	    		soundReves.play();
	    	}
        }
    }

    mute = function()
    {
        if(localStorage['mute'] == 'false')
        {
            localStorage['mute']= 'true';
            stopMusique();
        }
        else{
            localStorage['mute']= 'false';
            playMusique();
        }     
    }      
     
    var utilisateurDao= new UtilisateurDAO();
    var instance = this;

    if (localStorage['idUtilisateur'] != null)
    {
    	var idUtilisateur=Number(localStorage['idUtilisateur']);
    }
    else{
       var idUtilisateur= null;
    }

    var actionCreationCompte = async function(utilisateur)
    {
        
        var compteCreation = await utilisateurDao.ajouterUtilisateur(utilisateur.mail,utilisateur.motDePasse,utilisateur.pseudonyme);
        actionAuthentifierCompte(utilisateur);
    }
    
    var actionModifierCompte =async function(utilisateur)
    {
        await utilisateurDao.modifierUtilisateur(utilisateur);
        naviguerAccueil();
    }
    
    var actionAuthentifierCompte = async function(utilisateur)
    {
        //appel au DAO
        
        var testauthen= await utilisateurDao.lireUtilisateurPourAuthentification(utilisateur.mail,utilisateur.motDePasse);
        if(testauthen==true){
            utilisateurAutentifier= await utilisateurDao.lireUtilisateurParMail(utilisateur.mail);
            localStorage['idUtilisateur']=utilisateurAutentifier.id;
            idUtilisateur=Number(localStorage['idUtilisateur']);
             naviguerAccueil();
        }else{
             window.alert("Erreur d'authentification, login ou mot de passe incorect !!  ");
            naviguerAuthentification();
        }
    }    

    var naviguer = async function()
    {
    
     var hash = window.location.hash;
       
        
        if(!hash)
        {
            if(null!=idUtilisateur)
            {
               naviguerAccueil(); 
            }
            localStorage['piste']= '1';
            playMusique();
            var authentifierVue = new AuthentifierVue(actionAuthentifierCompte);
            authentifierVue.afficher();
        }
        else if(hash.match(/^#menu/))
        {
            if(null==idUtilisateur)
            {
               naviguerAuthentification(); 
            }
            localStorage['piste']= '1';
            playMusique();
            var menuVue = new MenuVue();
            menuVue.afficher();
        }
        else if(hash.match(/^#jeu/))
        {
            if(null==idUtilisateur)
            {
               naviguerAuthentification(); 
            }
            localStorage['piste']= '2';
            playMusique();
            var jeuVue = new JeuVue();
            jeuVue.afficher();
        }
        else if(hash.match(/^#creer-compte/))
        {
            var creerCompte = new CreationCompteVue(actionCreationCompte);
            creerCompte.afficher();
        }
        else if(hash.match(/^#modifier-compte/))
        {   
            if(null==idUtilisateur)
            {
               naviguerAuthentification(); 
            }
            var utilisateur =await  utilisateurDao.lireUtilisateurParId(idUtilisateur);
            var modifierCompteVue = new ModifierCompteVue(utilisateur,actionModifierCompte);
            modifierCompteVue.afficher();
        }
        else if(hash.match(/^#detail-joueur\/([0-9]+)/))
        {   
            if(null==localStorage['idUtilisateur'])
            {
               naviguerAuthentification(); 
            }
            var detailJoueurVue = new DetailJoueurVue();
            detailJoueurVue.afficher();
        }
        else if(hash.match(/^#leaderboard/))
        {   
            if(null==localStorage['idUtilisateur'])
            {
               naviguerAuthentification(); 
            }     
            var utilisateurTest1 = new Utilisateur(1,'toto@mail.fr', 'motDePasse', 'pseudonyme1');
            var utilisateurTest2 = new Utilisateur(2,'toto@mail.fr', 'motDePasse', 'pseudonyme2');
            var listeUtilisateurDonnee = [ utilisateurTest1 ,  utilisateurTest2 ];
            var scoreTest1 = new Score(1, 500, 1, 1, 1);
            var scoreTest2 = new Score(2, 250, 2, 1, 1);
            var listeScoreDonnee = [scoreTest1,scoreTest2];
            var leaderboardVue = new LeaderboardVue(listeScoreDonnee,listeUtilisateurDonnee);
            leaderboardVue.afficher();  
        }
        else if (hash.match(/^#quitter/))
        {
            navigator.app.exitApp();
        }
        else if (hash.match(/^#deconecter/))
        {
            actionDeconectionCompte();
        }
        else {
            localStorage['piste']= '1';
            stopMusique();
        }
    }

    var naviguerAccueil = function()
    {
        window.location.hash = "#menu";
    }
     var naviguerAuthentification = function()
    {
        window.location.hash = "#";
    }
     
     var actionDeconectionCompte = async function()
    {
         localStorage.removeItem('idUtilisateur');
        idUtilisateur=null;
    naviguerAccueil();
    }

    var initialiser = function()
    {
        window.addEventListener("hashchange",naviguer);
        naviguer();
    }
    
    initialiser();

})();