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
        this.containerGalleries = this.$('#scrollGallery');
        
        //TODO: REMOVE THESE LINES WHEN CSS IS COMPLETE
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
        
        //Get Tips Service
        App.server.makeRequest('Tip', { }, _.bind(this.onGetTips, this));
        
    },
    
    onGetTips : function(response){
        util.log(this.prefix + ' GET TIPS RESPONSE: ' + JSON.stringify(response));
        App.tipsArray = response.tip;
        var responseObject = response.tip[0];
        this.dayTipText.text(util.stripHtmlTags(responseObject.Cuerpo));
        this.dayTipImg.css( {'background-image' : 'url('+ responseObject.Foto + ')'});
        //Get Galleries Service
        App.server.makeRequest('Galeria', { IDUsuario : App.idUser }, _.bind(this.onGetGalleries, this));
    },
    
    onGetGalleries : function(response){
        util.log(this.prefix + ' GET GALLERIES RESPONSE: ' + JSON.stringify(response));
        var responseObject = response.galeria[0];
        if(responseObject.Mensaje == 'Successfully'){
             App.galleriesObject = responseObject;
             /*this.$('#babyGalleryImg').css( {'background-image' : 'url('+ responseObject.fotogaleria[0].Foto + ')', 'width' : '100px', 'height': '100px'});
             this.$('#babyGalleryDate').text(responseObject.Fecha);
             this.$('#babyGalleryTitle').text(responseObject.Nombre);*/
             this.loadGalleries();
        }
        else{
            App.alert(responseObject.Repuesta);
        }
    },
    
    loadGalleries: function(){
        this.containerGalleries.empty();
        var html='';
        /*$.each(App.galleriesObject, function(i, item) {
            App.alert(item.IDGaleria);
        });*/​
        for(var i = 0; i < App.galleriesObject.length; i++){
            var gallery = App.galleriesObject[i];
            var idGallery=gallery.IDGaleria;
            var nameGallery= gallery.Nombre;
            var dateGallery=gallery.Fecha;
            var photoGallery=gallery.fotogaleria[0].Foto;
            var rowGallery = new RowBabyGalleryView({ idGallery : idGallery, nameGallery: nameGallery, dateGallery: dateGallery, photoGallery: photoGallery});
            html+=$(rowGallery.el).html();
        }
        this.containerGalleries.html(html);
        //this.galleryScroll.refresh();
    },
    
    /* Called when a row is clicked in the scrolling list
     * @param event
     */
    nextView: function(id) {
        util.log(this.prefix, ' nextView: id: ' + id);
        this.selectRow(id);
        /* We don't want to do anything if the list is being scrolled
        var moving = this.scrollerMoving();
        util.log(this.prefix, ' nextView: moving: ' + moving);
        if (!moving) {
            this.selectRow(id);
        }*/
    },
    
    
    /**
     * Selects a row programatically
     * @param row
     */
    selectRow: function(id) {
        util.log(this.prefix, ' selectRow: id: ' + id);
        var galleryId = (id) ? id : null;
        util.log(this.prefix, ' galleryId: ' + galleryId);
        if(galleryId){
            this.parent.setView('photodetail', { galleryId: galleryId, editMode : false});
        }
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
   }
});
