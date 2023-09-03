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

$(document).ready(function (e) {
 
  setTimeout(()=>{

    let url = 'http://localhost:8000/#/'
    let homeUrl = url
    let newUrl 

    let id = 0
    let projectArr = []  

    let winWidth = $('#img-header').width()
    let winHeight = $('#img-header').height()

    alert("Please click on the map to indicate location")

    let taskPoint = []
    let percentWidth
    let percentHeight
    let screenLocked = false

    if (window.performance) {
        console.info("window.performance works fine on this browser");
    }

    //if browser reset  
    console.info(performance.navigation.type);
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      setTimeout(()=>{
        window.location.replace(url); 
      }, 100) 
    } else {
      console.info( "This page is not reloaded");
    } 
 
  /* Here */
    $.getJSON("/json", (result)=>{ 
      
        $.each(result, (index, data)=>{  
          console.log(data.type)
          let thisClass
          if(data.type == "Repair"){
            thisClass = 'task-repair'
          }
          else if(data.type == "Removal"){
            thisClass = 'task-removal'
          }
          else if(data.type == "Design"){
            thisClass = 'task-design'
          }
          else if(data.type == "Not Specified"){
            thisClass = 'task-other'
          }

          id++
          projectArr.push(data)  

          $('#header-container').append('<a class="task-point-a"><div id="' + data.id + '" class="'+ thisClass + '" style="left:' + data.xPt*winWidth+ 'px; top:' + data.yPt*winHeight + 'px;"></div></a>')
      })  
    })  

  //On Clicks ======>   
  $("#home").on('click', (e)=>{

    clearBoxes();

    screenLocked = false 
    window.location.reload();
    newUrl = ''

  })
  //***************************Sept 3, 2023 */
  //On click, selects id of target element selected
  $(document).on('click', 'a.task-point-a', (e)=>{
     alert(e.target.id)
     //remember to subtract 1 from id 
     //access projectArr[id-1]
  })

  $(document).on('click', 'input.contact-radio-text', (e)=>{
    alert(e.target.name)
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
            alert("Scroll down and enter details in the fields below.")
        },1000)
        
        newUrl = ''
        newUrl = url + 'add' 
        window.location.replace(newUrl); 
    
        percentWidth = e.pageX/winWidth
        percentHeight = e.pageY/winHeight
    
        //append task-point marker
        taskPoint.push((percentWidth)*winWidth)
        taskPoint.push((((percentHeight*100))/100)*winHeight)
        $('#header-container').append('<div id="' + (id+1) + '" class="' + 'task-point'+ '" style="left:' + taskPoint[0] + 'px; top:' + taskPoint[1] + 'px;"></div>')
    
        //reset variables and lock screen until form submit complete
        setTimeout(()=>{
            $('#contact-f').append('<input id="inputX" value="' + percentWidth + '" class="contact-input-text-invisible" name="xPt" type="text" maxlength="30"  />')
            $('#contact-f').append('<input id="inputY" value="' + percentHeight + '" class="contact-input-text-invisible" name="yPt" type="text" maxlength="30"  />')
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

 
 