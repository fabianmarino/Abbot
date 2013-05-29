MyBabyView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'MyBabyView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#MyBabyTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
        
        this.stageMonths = this.$('#stageMonths');
        this.babyName = this.$('#babyName');
    },
    
    events : {
        'touchend #stageDevelopment' : 'onStageDevelopment',
        'touchend #showAllTips' :   'onShowAllTips',
        'touchend #showAllGalleries' : 'onShowAllGalleries',
        'touchend #showAllEvents' : 'onShowAllEvents' 
    },

    activate : function() {
        if (this.activated == false) {
            //Get baby Stage Service
            App.server.makeRequest('Etapa', { IDUsuario : App.idUser, FechaNacimiento : App.userInfo.FechaNacimiento}, _.bind(this.onGetStage, this));
            this.activated = true;
        }
        
        this.babyName.text(App.userInfo.NombreBebe);
    },
    
    onGetStage : function(response){
        util.log(this.prefix + ' GET STAGE RESPONSE: ' + JSON.stringify(response));
        var responseObject = response.etapa[0];
        if(responseObject.Mensaje == 'Successfully'){
            App.userInfo.etapaId = responseObject.term_id;
            this.stageMonths.text(responseObject.name + ' meses');
        }
        else{
            App.alert(responseObject.Repuesta);
        }
    },
    
    onStageDevelopment : function(){
      //TODO:  
    },
    
    onShowAllTips : function(){
        //TODO:  
    },
    
    onShowAllGalleries : function(){
        //TODO:  
   },
      
   onShowAllEvents : function(){
          //TODO:  
   },
});
