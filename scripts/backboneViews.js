
//**** Index View ****
var IndexView = Backbone.View.extend({
    tagName: 'div',
    className: 'index-container',
    template: _.template('<section id="index-container">' +        
     '</section>'), 
    render: function(){
        view = this.model.toJSON();
        this.$el.html(this.template(view));
        return this;
    }
}); 

//**** Index View ****
var UploadView = Backbone.View.extend({
    tagName: 'div',
    className: 'index-container',
    template: _.template('<section id="index-container">' +        
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
            '<div id="contact-info">' +
                '<form method="POST" id="contact-f" enctype="multipart/form-data" action="http://localhost:8000/upload">' +
                '<p>' + 
                    '<label for="title" class="contact-input-label">Caption</label><br/>' +  
                    '<input class="contact-input-text" name="title" type="text" maxlength="30" autofocus required />' + 
                '</p>' + 
                '<p>' + 
                    '<label for="building" class="contact-input-label">Building Number</label> <br/>' + 
                    '<input class="contact-input-text" name="building" type="text" maxlength="40" required/>' +
                '<p class="contact-input-label">Project Type</p>' + 
                '<p>' +  //Input Button - repair
                    '<input type="radio" id="repair" class="contact-radio-text" name="repair" value="Repair"></input>' + 
                    '<label for="repair">Building Repair</label><br>' + 
                '<p>' + 
                '<p>' +  //Input Button - design
                    '<input type="radio" id="design" class="contact-radio-text" name="design" value="Design"></input>' + 
                    '<label for="design">Landscape Design</label><br>' + 
                '<p>' + 
                '<p>' +  //Input button - removal
                    '<input type="radio" id="removal" class="contact-radio-text" name="removal" value="Removal"></input>' + 
                    '<label for="removal">Landscape Removal</label><br>' + 
                '<p>' + 
                    '<label for="image" class="contact-input-label">Upload Image</label> <br/>' +  
                    '<input class="contact-input-text" name="image" type="file" maxlength="30" required/></p>' + 
                '</p>' + 
                '<p>' + 
                    '<label for="summary" class="contact-input-label">Summary</label> <br/>' + 
                    '<textarea class="contact-input-field" rows="4" cols="50" name="summary"></textarea>' + 
                '</p>' +   
                '<button type="submit" form="contact-f" value="Submit">Submit</button>' + 
                '</form>' + 
            '</div>' + 
         '</div>'
    ),

    events: {
        "click #contact-button": "postJSON"
    }, 
    render: function(){
        this.$el.html(this.template());
        return this;
    }
}); 
    
//**** LOGIN NAVIGATION BAR VIEW ****
/*
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
}); */

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