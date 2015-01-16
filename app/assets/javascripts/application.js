// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.ui.sortable
//= require jquery.serializejson.min
//= require underscore
//= require backbone
//= require bootstrap
//= require trello_clone
//= require_tree ../templates
//= require_tree ./utils
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .

$.GuestLogin = function(el) {
    this.$el = $(el);
    var that = this;
    this.$el.on('click', 'input.guest-login', function(event) {
        event.preventDefault();
        that.guest();
    })
};

$.fn.guestLogin = function() {
    return this.each(function() {
        new $.GuestLogin(this);
    });
};

$.GuestLogin.prototype.guest = function() {
    $('#user_email').val('guest@gmail.com');
    $('#user_password').val('kittens');
    setTimeout(function() {
        $("#log-in-submit-button").trigger("click");
    }, 500);
};