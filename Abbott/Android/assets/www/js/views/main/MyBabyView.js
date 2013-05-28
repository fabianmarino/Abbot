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
            this.activated = true;
        }
        
        this.babyName.text(App.userInfo.NombreBebe);
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
