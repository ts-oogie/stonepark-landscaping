//Sets and resets variables when window is resized and scrolled
function setVars() {
    //Window Scroll top location
     windowTop = $(window).scrollTop();

     //Window width
     windowWidth = $(window).width();

     //Height of the img header in pixels
     windowRatio = (windowWidth / 3.25) + 9;

     //Height of the img header plus offset adjustment for spacing discrepancy in the nav bar
     windowRatioPlus = (windowWidth / 3.25) + 15;

     //Height of the small img header 
     windowSmallRatio = (windowWidth / 3.25);

     //Location of the top of the nav bar relative to the img header
     navMargin = windowWidth / 10.5; 

     //Neg value of the above
     negMargin = navMargin * -1;


     //Img header minus height of the nav bar location
     numToNeg = ((windowRatio * -1) - navMargin) + 6;
     numToNegSmall = (windowSmallRatio * -1) - 53;
     winSmallNeg = ((windowSmallRatio * -1) + navMargin) + 20;
}
setVars();

 

function adjustNav() { 
    if ((windowWidth <= 550) && (windowTop <= windowRatio)) {
        $('#app').css({"margin-top" : "20px"});
    }
}

//The background imagerfader
function imageSlide() {
    slides = [];
    //Make sure that the IMG SRC height is set to headheight
    //$('#img-header').css("height" : headHeight);
    $('.header-container').css({"height" : headHeight});
    //Grab all the img elements with the id of image-loader
    slides = $('#image-loader img');
    //Get the number of elements pulled and save as variable
    var slideCount = slides.length; 
    //Create an empty array container
    var slideSrc = []; 
    
} 

function clearBoxes(){
  const boxes = document.querySelectorAll('.task-point'); 
    boxes.forEach(box => {
      box.remove();
    }); 
} 

$(document).ready(function(e) { 

    let url = 'https://stonepark-beautification-committee.onrender.com/'
    let homeUrl = url
    let newUrl 

    let id = 0 
    let historyId = 0
    let historyArr = []
    let projectArr = []  

    let taskPoint = []
    let percentWidth
    let percentHeight
    let screenLocked = false  

     
     

    const today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formattedToday = dd + '/' + mm + '/' + yyyy; 
    let time = today.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})


    setInterval(()=>{
      $.getJSON(url + "json", (result)=>{   
        console.log("++++++++++++++++++++")
        console.log(formattedToday + " Time: " + time )
        console.log(result) 
      })  
    }, 3600000) 
    //Sept 7, 2023 : post
    
 
  setTimeout(()=>{
    
    let calibrationX = 8
    let calibrationY = 8

    let winWidth = $('#img-header').width()
    let winHeight = $('#img-header').height() 

    

    if (window.sessionStorage.getItem("pageLoaded") == null){
          window.sessionStorage.setItem("pageLoaded", true)
          alert("Please click on the map to create new project location")
    }  

    if (window.performance) {
        console.info("window.performance works fine on this browser");
    }

    //if browser reset  
    console.info(performance.navigation.type);
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {

      $('#overlaycontainer').css('width', '85%')
      $('#overlay-app').empty()
      $('#overlaycontainer').css('visibility', 'hidden' );

      $('#overlaycontainer2').css('width', '85%')
      $('#overlay-form').empty()
      $('#overlaycontainer2').css('visibility', 'hidden' );

      setTimeout(()=>{ 
        window.location.replace(url + '#/'); 
      }, 100) 

    } 
    else {
      console.info( "This page is not reloaded");
    } 
 
   
    $.getJSON("/json", (result)=>{ 
      
        $.each(result, (index, data)=>{  
          console.log(data.type)
          let thisClass
          if(data.type == "Repair" || data.type == "Not Specified"){
            thisClass = 'task-repair'
          }
          else if(data.type == "Removal"){
            thisClass = 'task-removal'
          }
          else if(data.type == "Design"){
            thisClass = 'task-design'
          } 

          id++
          projectArr.push(data)  

          $('#header-container').append('<a class="task-point-a"><div id="' + data.id + '" class="'+ thisClass + '" style="left:' + ((data.xPt*winWidth)-calibrationX) + 'px; top:' + ((data.yPt*winHeight)-calibrationY) + 'px;"></div></a>')
     
        })  
    })  

     

    $('#overlaycontainer').on('click',  function(e){  
      $('#overlaycontainer').css('width', '85%')
      $('#overlay-app').empty()
      $('#overlaycontainer').css('visibility', 'hidden' ); 
      $('#overlaycontainer').scrollTop(0)
      screenLocked = false
      window.location.replace(url + '#/');  
    });

    $("#home").on('click', (e)=>{

    clearBoxes();

    screenLocked = false 
    window.location.reload();
    newUrl = ''

    })

    //***************************Sept 3, 2023 */
    //On click, selects id of target element selected
    $(document).on('click', 'a.task-point-a', (e)=>{ 
 
    $('#overlaycontainer').css('visibility', 'visible' );
      
    $('#overlay-app').html(  
        '<div class="overlayBG">' + 
            '<h1>' + projectArr[e.target.id-1].title + '</h1>' +
        '</div>' +
        '<h2>Closest Building : ' + projectArr[e.target.id-1].building + '</h2>' +
        '<h2>Type : ' + projectArr[e.target.id-1].type + '</h2>' +
        '<h2>' + projectArr[e.target.id-1].summary + '</h2>' +
        '<div id="more">' +  
              '<h3 id="moreLink">Close</h3>' +  
        '</div>'  +
        '<img class="overlayImg" src="' + projectArr[e.target.id-1].imgUrl + '" />' 
    );

    })

    $(document).on('click', 'button#cancel', ()=>{
      alert

      let thisEl = id+1
      let thisStr = thisEl.toString()
      
      $('#overlaycontainer2').css('width', '500px')
      $('#overlay-form').empty()
      $('#overlaycontainer2').css('visibility', 'hidden' ); 
      
      $('#overlaycontainer').css('width', '85%')
      $('#overlay-app').empty()
      $('#overlaycontainer').css('visibility', 'hidden' );
      document.getElementById(thisStr).remove()
      screenLocked = false
      window.location.replace(url + '#/');  
    }) 

    $('#team').on('click', (e)=>{

      $('#overlaycontainer').css('visibility', 'visible');
      $('#overlaycontainer').css('width', '50%')

      $('#overlay-app').html( 
        '<div class="cast-view">' +
            '<div id="more">' +  
                   '<h3 id="moreLink">Close</h3>' +  
            '</div>'  +
            '<h2>MEMBERS</h2>' + 
                '<div id="crew-center">' + 
                          '<p>President : Patrick J.</p>' + 
                          '<p>HMS Manager : Rachel</p>' + 
                          '<p>SYA Contractor : Evan</p>' +
                          '<p>Volunteer : Skipper</p>' +
                          '<p>Volunteer : Mary</p>' + 
                          '<p>Volunteer : Lynn</p>' +
                          '<p>Volunteer : Gregory</p>' + 
                          '<p>Volunteer : Melissa</p>' +  
                '</div>'  
      );

    })

  

    $(document).on('click', 'input.contact-radio-text', (e)=>{
      
      if(e.target.name == 'repair'){
        $("#design").prop('checked', false)
        $("#removal").prop('checked', false)
      }
      else if (e.target.name == 'design'){
        $('#repair').prop('checked', false)
        $('#removal').prop('checked', false) 
      }
      else if(e.target.name == 'removal'){
        $('#repair').prop('checked', false)
        $('#design').prop('checked', false) 
      }

    })

    $('#img-header').on('click', (e)=>{    

      if (screenLocked == false){ 

        setTimeout(()=>{

          if (window.sessionStorage.getItem("pageClicked") == null){
              window.sessionStorage.setItem("pageClicked", true) 
          } 
            
        },1000)
        
        newUrl = ''
        newUrl = url + '#/add' 
        window.location.replace(newUrl);  

        winWidth
    
        percentWidth = e.pageX/winWidth
        percentHeight = e.pageY/winHeight
    
        //append task-point marker
        taskPoint.push(percentWidth)
        taskPoint.push(percentHeight)
        $('#header-container').append('<div id="' + (id+1) + '" class="' + 'task-point'+ '" style="left:' + ((taskPoint[0]*winWidth)-calibrationX) + 'px; top:' + ((taskPoint[1]*winHeight)-calibrationY) + 'px;"></div>')
    
        //reset variables and lock screen until form submit complete
        setTimeout(()=>{
            $('#contact-f').append('<input id="inputX" value="' + (taskPoint[0]) + '" class="contact-input-text-invisible" name="xPt" type="text" maxlength="30"  />')
            $('#contact-f').append('<input id="inputY" value="' + (taskPoint[1]) + '" class="contact-input-text-invisible" name="yPt" type="text" maxlength="30"  />')
            $('#contact-f').append('<input id="inputI" value="' + (id+1) + '" class="contact-input-text-invisible" name="index" type="text" maxlength="30"  />')
        }, 1000)  

        setTimeout(()=>{
            taskPoint = []
            percentWidth = ""
            percentHeight = ""
            screenLocked = true  
        }, 1500)    

      } 

    })

  }, 1000)
  
});

 
 