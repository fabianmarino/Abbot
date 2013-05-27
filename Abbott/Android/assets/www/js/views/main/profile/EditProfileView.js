EditProfileView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'EditProfileView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#EditProfileTemplate', App.templates).html());

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
