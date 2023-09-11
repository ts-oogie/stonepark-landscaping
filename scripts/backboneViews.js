
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
                '<form method="POST" id="contact-f" enctype="multipart/form-data" action="https://stonepark-beautification-committee.onrender.com/upload">' +
                '<p>' + 
                    '<label for="title" class="contact-input-label">Caption :</label><br/>' +  
                    '<input class="contact-input-text" name="title" type="text" maxlength="30" autofocus required />' + 
                '</p>' + 
                '<p>' + 
                    '<label for="building" class="contact-input-label">Nearest Building : </label> <br/>' + 
                    '<input class="contact-input-text" name="building" type="text" maxlength="40" required/>' + 
                '<p>' +  //Input Button - design
                    '<input type="radio" id="design" class="contact-radio-text" name="design" value="Design"></input>' + 
                    '<label for="design">Design</label><br>' + 
                '<p>' + 
                '<p>' +  //Input button - removal
                    '<input type="radio" id="removal" class="contact-radio-text" name="removal" value="Removal"></input>' + 
                    '<label for="removal">Removal</label><br>' + 
                '<p>' + 
                '<p>' +  //Input button - removal
                    '<input type="radio" id="repair" class="contact-radio-text" name="repair" value="Repairl"></input>' + 
                    '<label for="repair">Repair</label><br>' + 
                '<p>' + 
                    '<label for="image" class="contact-input-label">Upload Image :</label> <br/>' +  
                    '<input class="contact-input-text" name="image" type="file" maxlength="30" required/></p>' + 
                '</p>' + 
                '<p>' + 
                    '<label for="summary" class="contact-input-label" maxlength="160">Summary : </label> <br/>' + 
                    '<textarea class="contact-input-field" rows="4" cols="50" name="summary" required></textarea>' + 
                '</p>' +   
                '<button id="submit" type="submit" form="contact-f" value="Submit">Submit</button>' + 
                '<button id="cancel" type="reset" value="Reset" form="contact-f">Cancel</button>' + 
                '</form>' + 
            '</div>' + 
         '</div>'
    ),
 
    render: function(){ 
        this.$el.html(this.template());
        return this;
    }
});  

var TeamView = Backbone.View.extend({
    tagName: 'div',
    className: 'team-model-container',
    template: _.template( 
        '<section id="index-container">' +        
    '</section>' 
        ), 
    render: function(){  
        this.$el.html(this.template());
        return this;
    }
});