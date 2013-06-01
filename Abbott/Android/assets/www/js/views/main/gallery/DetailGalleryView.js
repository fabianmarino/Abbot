<<<<<<< HEAD
DetailGalleryView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'DetailGalleryView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#DetailGalleryTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
    },
    
    events : {

    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
    }
});
=======
DetailGalleryView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'DetailGalleryView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#DetailGalleryTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
    },
    
    events : {

    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
    }
});
>>>>>>> a3d6ec2178452f51a85417da11e173d3ade4e94a
