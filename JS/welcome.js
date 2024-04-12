//  welcome page
const welcome=document.querySelector("#welcome span")
function welcomePage() {
    
    welcome.innerHTML=`${localStorage.getItem("gameUserName")[0].toUpperCase() + localStorage.getItem("gameUserName").slice(1)}`
}
welcomePage()


function logOut() {
  localStorage.removeItem("gameUserName")
  location.href="index.html"
}

document.getElementById("logOut").addEventListener("click",logOut)

// chosen category
const allCategories=document.querySelectorAll(".categories .dropdown-menu li")
const selectedText=document.querySelector(".selectedText span")

var chosenCategory="pixel"
var chosenSort="alphabetical"
var chosenPlatform="pc"



allCategories.forEach(el=>
  el.addEventListener("click",function (e) {
    chosenCategory=e.target.innerHTML
    getAllGames(chosenPlatform,chosenCategory,chosenSort)

  })  
)

// chosen platform
const allplatforms=document.querySelectorAll(".platform li")
allplatforms.forEach(el=>
  el.addEventListener("click",function (e) {
    chosenPlatform=e.target.innerHTML
    getAllGames(chosenPlatform,chosenCategory,chosenSort)

  })  
)

// chosen sort
const allSorts=document.querySelectorAll(".Sort li")
allSorts.forEach(el=>
  el.addEventListener("click",function (e) {
    chosenSort=e.target.innerHTML
    getAllGames(chosenPlatform,chosenCategory,chosenSort)

  })  
)

// get all games
var loading=document.querySelector(".loading")
var finalData
async function getAllGames(platformParamter,categoryParamter,sortParamter) {
    loading.classList.remove("d-none")
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '11c8587924mshe3bf68c89100cffp1ae2d2jsn9cdc9c732b42',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let apiData=await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?
    platform=${platformParamter}&
    category=${categoryParamter}&
    sort-by=${sortParamter}`,options)

    finalData=await apiData.json()

    displayGames()
    loading.classList.add("d-none")

}

getAllGames(chosenPlatform,chosenCategory,chosenSort)



const rowData=document.querySelector(".rowData")
// 
function displayGames()
{
    var videoPath=''

    var cartoona=''
    for (let i = 0; i < finalData.length; i++) {
       
        videoPath=finalData[i].thumbnail.replace("thumbnail.jpg","videoplayback.webm")
        
        cartoona+=`
        
              
       <div class="col-md-6 col-lg-4 col-xl-3">
        
       <div  class="card h-100 bg-transparent" onmouseenter="playVideo(event)" onmouseleave="pauseVideo(event)" >
          <div class="card-body" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getDetails(${finalData[i].id})">
 
             <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${finalData[i].thumbnail?finalData[i].thumbnail:"../imgs/Ag1_09.jpg"}"  />
 
              <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
               <source src="${videoPath}">
               </video>
 
             </figure>
 
             <figcaption>
 
                <div class="hstack justify-content-center ">
                   <h3 class="h4">${finalData[i].title.slice(0,18)}</h3>
                </div>
 
                <p class="card-text small text-center opacity-75 text-secondary">
                 ${finalData[i].short_description.slice(0,115)}
                </p>
 
             </figcaption>
          </div>
 
          <footer class="card-footer small hstack justify-content-between">
 
             <span class="badge badge-color ">${finalData[i].genre}</span>
             <span class="badge badge-color ">${finalData[i].platform}</span>
 
          </footer>
       </div>
    </div> 
        
        `
        
    }
    
    selectedText.innerHTML=chosenCategory[0].toUpperCase() + chosenCategory.slice(1)
    document.querySelector(".platSpan").innerHTML=chosenPlatform[0].toUpperCase() + chosenPlatform.slice(1)
    document.querySelector(".SortSpan").innerHTML=chosenSort[0].toUpperCase() + chosenSort.slice(1)

    rowData.innerHTML=cartoona
}




function playVideo(event) {
    let selectedVideo=event.target.querySelector("video")
    selectedVideo.classList.remove("d-none")
    selectedVideo.muted=true
    selectedVideo.play()
}


function pauseVideo(event) {
    let selectedVideo=event.target.querySelector("video")
    selectedVideo.classList.add("d-none")
    selectedVideo.muted=true
    selectedVideo.pause()
}



var finalDetails
async function getDetails(myId) {
    document.querySelector(".loadingDetails").classList.remove("d-none")
    console.log(myId)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '11c8587924mshe3bf68c89100cffp1ae2d2jsn9cdc9c732b42',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let apiData=await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${myId}`,options)

    finalDetails=await apiData.json()

    displayDetails()
    document.querySelector(".loadingDetails").classList.add("d-none")

}

function displayDetails() {
    var temp=''
     temp=
    `
    <div class="col-md-4 cardImg">
    <img src="${finalDetails.thumbnail}" class="img-fluid"  alt="">
  </div>
  <div class="col-md-8">
    <h2>${finalDetails.title?finalDetails.title:"unkown"}</h2>
    <p>
    ${finalDetails.description?finalDetails.description:"unkown"}
    </p>

    <p>genre : ${finalDetails.genre?finalDetails.genre:"unkown"}</p>
    <p>platform : ${finalDetails.platform?finalDetails.platform:"unkown"}</p>
    <p>publisher : ${finalDetails.publisher?finalDetails.publisher:"unkown"}</p>
    <p>developer : ${finalDetails.developer?finalDetails.developer:"unkown"} Ward</p>
    <p>release_date : 2020-${finalDetails.release_date?finalDetails.release_date:"unkown"}-10</p>
    <a href="${finalDetails.game_url?finalDetails.game_url:"https://www.freetogame.com"}" target="_blank" class="btn btn-success">Source</a>
    ${finalDetails.minimum_system_requirements?`
    <h4 class="text-warning mt-3">minimum system requirements</h4>
    <ul>
      <li>os : ${finalDetails.minimum_system_requirements.os?finalDetails.minimum_system_requirements.os:"not specified !!"}</li>
      <li>processor : ${finalDetails.minimum_system_requirements.processor?finalDetails.minimum_system_requirements.processor:"not specified !!"}</li>
      <li>memory : ${finalDetails.minimum_system_requirements.memory?finalDetails.minimum_system_requirements.memory:"not specified !!"}</li>
      <li>graphics : ${finalDetails.minimum_system_requirements.graphics?finalDetails.minimum_system_requirements.graphics:"not specified !!"}</li>
      <li>storage : ${finalDetails.minimum_system_requirements.storage?finalDetails.minimum_system_requirements.storage:"not specified !!"}</li>
    </ul>
    `
    :""}
    ${finalDetails.screenshots.length!=0?finalDetails.screenshots.length==4?
    `
    <h3>screen shots from Game</h3>
    <div class="row gy-4">
    ${finalDetails.screenshots[0].image?`<div class="col-sm-6">
    <img src="${finalDetails.screenshots[0].image}" class="w-100" alt="">
  </div>`:""}

  ${finalDetails.screenshots[1].image?`<div class="col-sm-6">
  <img src="${finalDetails.screenshots[1].image}" class="w-100" alt="">
</div>`:""}
${finalDetails.screenshots[2].image?`<div class="col-sm-6">
<img src="${finalDetails.screenshots[2].image}" class="w-100" alt="">
</div>`:""}
${finalDetails.screenshots[3].image?`<div class="col-sm-6">
<img src="${finalDetails.screenshots[2].image}" class="w-100" alt="">
</div>`:""}
    </div> 
    `:
    `
    <h3>screenshots from Game</h3>
    <div class="row gy-4">
    ${finalDetails.screenshots[0].image?`<div class="col-sm-6">
    <img src="${finalDetails.screenshots[0].image}" class="w-100" alt="">
  </div>`:""}

  ${finalDetails.screenshots[1].image?`<div class="col-sm-6">
  <img src="${finalDetails.screenshots[1].image}" class="w-100" alt="">
</div>`:""}
${finalDetails.screenshots[2].image?`<div class="col-sm-6">
<img src="${finalDetails.screenshots[2].image}" class="w-100" alt="">
</div>`:""}


    </div> 
    `:
    
    ""}
    </div>
    


    `

    document.querySelector(".modal-body").style.background  = `linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.7)),url(${finalDetails.thumbnail.replace("thumbnail","background")?finalDetails.thumbnail.replace("thumbnail","background"):"https://www.freetogame.com/g/100/background.jpg"})`; 

    document.querySelector(".rowDetails").innerHTML=temp
    console.log(finalDetails.thumbnail.replace("thumbnail","background")?finalDetails.thumbnail.replace("thumbnail","background"):"https://www.freetogame.com/g/100/background.jpg")
    
}







// call of owl plugin
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      items:4,
      loop:true,
      margin:20,
      slideBy:1,
      autoplay:true,
      responsive : {
// breakpoint from 0 up
0 : {
  items:1,
  

    
},
// breakpoint from 768 up
600: {
  items:2,
  

    
},
    // breakpoint from 768 up
920 : {
  items:3,
  

    
},
1300 : {
  items:4,
  

    
}
}
    });
  });

// dark mode
var app = document.getElementsByTagName("body")[0];
if (localStorage.lightMode == "darks") {
    app.setAttribute("light-mode", "dark");
}

function toggle_light_mode() {
    var app = document.getElementsByTagName("body")[0];
    if (localStorage.lightMode == "darks") {
        localStorage.lightMode = "lights";
        app.setAttribute("light-mode", "light");

    } else {
        localStorage.lightMode = "darks";
        app.setAttribute("light-mode", "dark");

    }
}

window.addEventListener(
    "storage",
    function () {
        if (localStorage.lightMode == "darks") {
            app.setAttribute("light-mode", "dark");
        } else {
            app.setAttribute("light-mode", "light");
        }
    },
    false
);

// for arrow up
$(document).ready(function () {
  
    let secTop=$("nav").offset().top
    $(window).scroll(function(){
    
    let windowTop=$(window).scrollTop()
    if(windowTop>secTop)
    {
        $(".arrow-up").fadeIn(1000)
    }
    else
    {
        $(".arrow-up").fadeOut(1000)
    }
    
    
    });



  });

