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
        this.dayTipText = this.$('#dayTipText');
        this.dayTipImg = this.$('#dayTipImg');
        //TODO: REMOVE THESE LINES WHEN CSS IS WORKING
        this.dayTipImg.css({ 'width' : '100px', 'height': '100px'}); 
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
            //Get Tips Service
            App.server.makeRequest('Tip', { }, _.bind(this.onGetTips, this));
            
            //Get Galleries Service
            App.server.makeRequest('Galeria', { IDUsuario : App.idUser }, _.bind(this.onGetGalleries, this));
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
    
    onGetTips : function(response){
        util.log(this.prefix + ' GET TIPS RESPONSE: ' + JSON.stringify(response));
        App.tipsArray = response.tip;
        var responseObject = response.tip[0];
        this.dayTipText.text(util.stripHtmlTags(responseObject.Cuerpo));
        this.dayTipImg.css( {'background-image' : 'url('+ responseObject.Foto + ')'});
    },
    
    onGetGalleries : function(response){
        util.log(this.prefix + ' GET GALLERIES RESPONSE: ' + JSON.stringify(response));
        var responseObject = response.galeria[0];
        if(responseObject.Mensaje == 'Successfully'){
             App.galleriesObject = responseObject;
             this.$('#babyGalleryImg').css( {'background-image' : 'url('+ responseObject.fotogaleria[0].Foto + ')', 'width' : '100px', 'height': '100px'});
             this.$('#babyGalleryDate').text(responseObject.Fecha);
             this.$('#babyGalleryTitle').text(responseObject.Nombre);
        }
        else{
            App.alert(responseObject.Repuesta);
        }
    },
    
    loadGalleries: function(){
        this.containerGalleries.empty();
        var html='';
        
        for(var i = 0; i < App.galleriesObject.length; i++){
            var idEvent=App.galleriesObject[i].idGaleria;
            var dayEvent=this.events[i].eventStartDate.substring(8,10);
            var monthEvent=this.events[i].eventStartDate.substring(5,7);
            var nameEvent=this.events[i].eventName;
            var descEvent=this.events[i].eventDescription;
            var rowEvent = new RowEventView({idEvent:idEvent,dayEvent:dayEvent,monthEvent:monthEvent,
                nameEvent:nameEvent,descEvent:descEvent});
            html+=$(rowEvent.el).html();
        }
        this.containerEvents.html(html);
        this.eventsScroll.refresh();
    },
    
    
    onStageDevelopment : function(){
      //TODO:  
        this.parent.setView('stages');
    },
    
    onShowAllTips : function(){
        //TODO: 
        this.parent.setView('tips');
    },
    
    onShowAllGalleries : function(){
        //TODO:  
        this.parent.setView('gallery');
   },
      
   onShowAllEvents : function(){
          //TODO: 
       this.parent.setView('calendar');
   },
});
