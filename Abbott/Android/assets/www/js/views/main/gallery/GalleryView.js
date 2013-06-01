<<<<<<< HEAD
GalleryView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'GalleryView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#GalleryTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
    },
    
    events : {
        'touchend #createGallery' : 'onCreateGallery'
    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
    },
    
    onCreateGallery : function(){
        this.parent.setView('creategallery');
    }
});
=======
GalleryView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'GalleryView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#GalleryTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
    },
    
    events : {
        'touchend #createGallery' : 'onCreateGallery'
    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
    },
    
    onCreateGallery : function(){
        this.parent.setView('creategallery');
    }
});
>>>>>>> a3d6ec2178452f51a85417da11e173d3ade4e94a
