//**** NAV BAR VIEW(s)****
var NavBarsView = Backbone.View.extend({
    tagName: 'div',
    className: 'nav-bars-container',
    template: _.template('<ul>' +
        '<li><a id="nav-bar-menu" href="#/">HOME</a></li>' + 
        '<li><a id="nav-bar-menu" href="#/team">TEAM</a></li>' +
        '<li><a id="nav-bar-menu" href="#/report">LANDSCAPING REPORT</a></li>' +
        '<li><a id="nav-bar-menu" href="#/contact">ADD</a></li>' +
        '</ul>'
        ),
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

var NavViewLarge = Backbone.View.extend({
    tagName: 'div',
    className: 'nav-menu-container',
    template: _.template('<ul><li><a id="nav-home" href="#/">HOME</a></li><li><a id="nav-bar-menu" href="#/team">TEAM</a></li><li><a id="nav-bar-menu" href="#/report">LANDSCAPING REPORT</a></li><li><a id="nav-bar-menu" href="#/add">ADD</a></li></ul>'),
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

var NavViewSmall = Backbone.View.extend({
    tagName: 'div',
    className: 'nav-menu-container',
    template: _.template('<a href=""><i id="nav-bars" class="fa fa-bars">&nbsp</i></a>'),
    events: {
        "click #nav-bars" : "showSidePanel"
    },
    showSidePanel: function(e) {
        e.preventDefault();
        //Empty the navMenu div 
        var $navMenu = $('.nav-container'); 
        $('#sidePanel').css({"display" : "block"}); 
        $('.nav-container li').css({"margin-top" : "-10px"});
    },
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

//**** Index View ****
var IndexView = Backbone.View.extend({
    tagName: 'div',
    className: 'index-container',
    template: _.template('<section id="index-container">' +        
            '<br/><iframe id="vimeo-frame" src="https://player.vimeo.com/video/132404733" width="100%" height="390" frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p id="index-center"><a href="https://vimeo.com/132404733">Leeches Teaser</a> from <a href="https://vimeo.com/user2912300">Payal Sethi</a> on <a href="https://vimeo.com">Vimeo</a>.</p><br/><br/><br/><br/><br/>' +
    '</section>'), 
    render: function(){
        view = this.model.toJSON();
        this.$el.html(this.template(view));
        return this;
    }
});
 

// **** CONTACT VIEW ****
//On Submit, run a function that serializes the JSON data and sends to the server
var ContactView = Backbone.View.extend({
    tagName: 'div',
    className: 'contact-container',
    template: _.template(
        '<div id="contact-view">' +
            '<div id="vruler1"></div>' +
            '<div id="contact-info">' +
                '<form method="post" id="contact-f" enctype="multipart/form-data" action="/upload">' + 
                '<p>' + 
                    '<label for="title" class="contact-input-label">Caption</label><br/>' +  
                    '<input class="contact-input-text" name="title" type="text" maxlength="30" autofocus required />' + 
                '</p>' + 
                '<p>' + 
                    '<label for="building" class="contact-input-label">Building Number</label> <br/>' + 
                    '<input class="contact-input-text" name="building" type="text" maxlength="40" required/>' +
                '<p>' + 
                    '<label for="image" class="contact-input-label">Upload Image</label> <br/>' +  
                    '<input class="contact-input-text" name="image" type="file" maxlength="30" required/></p>' + 
                '</p>' + 
                '<p>' + 
                    '<label for="summary" class="contact-input-label">Summary</label> <br/>' + 
                    '<textarea class="contact-input-field" rows="4" cols="50" name="summary"></textarea>' + 
                '</p>' + 
                '<div id="contact-button"><p>Submit</p></div></form>' +
            '</div>' +
            '<div id="vruler2"></div>' +
         '</div>'
    ),

    events: {
        "click #contact-button": "postJSON"
    },

    postJSON: function(){ 
        var permission = true;
            //$(this).find('[name]').each(function(i, data) {
            $(':input').each(function(i, data){
                //Get input fields and set key value variables
                var that = $(this); 
                var key = that.attr('name');
                var value = that.val();
                jsondata[key] = value;
                //Security measures
                var characters = ["/", "{", "}", "[", "]", "*", "&", "<", ">", "%", "$", "#", "(", ")", "=", "'", '"'];
                for (var i = 0; i < value.length; i++) {
                    for (var h = 0; h < characters.length; h++){
                        if (value.slice(i, i+1) === characters[h]) {    
                        permission = false;
                        }
                    } 
                }

            });
     
        if (permission === true){
            contactphp();
        }
        if (permission === false) {
            alert("For security reasons, please refrain from using the characters /, {}, [], *, &, %, $, #, (), =, and quotation marks.");
        }
        return false;
    },    
        render: function(){
            this.$el.html(this.template());
            return this;
        }
});
  


    
//**** LOGIN NAVIGATION BAR VIEW ****
var LoginNavView = Backbone.View.extend({
    tagName: 'div',
    className: 'login-nav-container',
    template: _.template('<ul><li><h2>ADMIN</h2></li><li id="overlay-float-right"><a href=""><h2>X</h2></a></li></ul>'),
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

//**** LOGIN INPUTS VIEW ****
var LoginModelView = Backbone.View.extend({
    tagName: 'div',
    className: 'login-model-container',
    template: _.template('<p>{Please Log In}</p><hr/><form method="post" id="login-admin"><p><br/><input id="login-username" name="username" type="text" maxlength="100"></input></p><div class="diary-add" id="add-title"><p>Username</p></div><p><br/><input id="login-password" name="password" type="password" maxlength="100"></input></p><div class="diary-add" id="add-img1"><p>Password</p></div><br/><br/><div id="login-error"></div>><div id="submit-login"><p id="login-submit">SUBMIT</p></div></form>'),
    events: {"click #login-submit" : "getLogin"},
    getLogin: function() {
        loginData = {};

        $(':input').each(function(i, data){
            var that = $(this); 
            var key = that.attr('name');
            var value = that.val();
            loginData[key] = value;
        });
        setAdmin();

        loginPermission();

    },
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});
 
  

var TeamView = Backbone.View.extend({
    tagName: 'div',
    className: 'team-model-container',
    template: _.template( 
        '<div class="cast-view">' +
            '<h2>MEMBERS</h2>' +
            '<div id="crew_1">' +
                '<div class="cast-view-col-1">' + 
                        '<p>President</p>' + 
                        '<p>HMS Manager</p>' + 
                        '<p>SYA Contractor</p>' +
                        '<p>Volunteer</p>' +
                        '<p>Volunteer</p>' +
                        '<p>Volunteer</p>' +
                        '<p>Volunteer</p>' + 
                        '<p>Volunteer</p>' + 
                '</div>' + 
                '<div class="cast-view-col-1">' + 
                        '<p>Patrick J.</p>' + 
                        '<p>Rachel S.</p>' + 
                        '<p>Evan</p>' +
                        '<p>Mary W.</p>' +
                        '<p>Skipper D.</p>' +
                        '<p>Melissa </p>' +
                        '<p>Gregory S.</p>' +
                        '<p>Lynn</p>' +
                         
                '</div>' + 
            '</div>'   
        ), 
    render: function(){  
        this.$el.html(this.template());
        return this;
    }
});