//**** ROUTERS ****
var Router = Backbone.Router.extend({
    routes: {
        "": 'Home',
        "team": 'Team',
        "report": 'Landscaping-Report',
        "add": 'Add' 
    }
});                     

var router = new Router();

//HOME
router.on('route:Home', function() {
    navReset(); 
    $('.index-container').css({"margin-top": "50px"});
    var indexView = new IndexView({model: indexModel});
    var iv = indexView.render().el;
    $('#app').html(iv);
});
 
 
router.on('route:Landscaping-Report', function() {
    navReset(); 
    //make ajax call to access diary.json
    var getJSON = $.getJSON("./news.json");
    getJSON.then(function(data) {
        $.each(data, function(index, obj) {
            //diaryJSON.push(obj);
        });
    }).then(function(){
         
        $('.diary-collection-container').css({"margin-top": "20px"});
        var diaryCollectionView = new DiaryCollectionView({collection: diaryCollectionList}); 
        var dcv = diaryCollectionView.render().el;
        $('#app').html(dcv);
    });
    
});

router.on('route:Team', function() {
    navReset();
    var teamView = new TeamView();
    var tv = teamView.render().el;
    $('#app').html(tv);

});

router.on('route:Add', function() {
    console.log("am I working?");
    navReset();
    var contactView = new ContactView();
    var cv = contactView.render().el;
    $('#app').html(cv);

});
/*

router.on('route:Admin-Login', function() {
    $('#overlaycontainer').css({"z-index":"500", "display": "block"});
    $('#main-container').css({"display": "none"});
    $('#side-nav-container').css({"display": "none"});
    var loginModelView = new LoginModelView();
    var lv = loginModelView.render().el;
    var loginNavView = new LoginNavView();
    var lnv = loginNavView.render().el;
    $('#overlay-nav').html(lnv);
    $('#overlay-app').html(lv); 
});
  */

Backbone.history.start();
urlReload();


