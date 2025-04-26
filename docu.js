const usertab=document.querySelector('#my-weather-tab'); //takes string values
const searchtab=document.querySelector('#search-tab');


const grantlocont=document.querySelector(".grant-locationcontainer");
const formweacon=document.querySelector(".form-Weathercontainer");
const loadcon=document.querySelector(".loadingclasscontainer");

const showwea=document.querySelector(".show-weather");

let currtab=usertab;    //by default i am on usertab
currtab.classList.add("current-tab");
    
getfromSessionStor();//if latitude and longitude are already in session storage

function switchtab(clickedtab)
{
    //if i clicked on the tab on which i am do nothing
    
   if(clickedtab!=currtab)
   {
      currtab.classList.remove("current-tab");
      currtab=clickedtab;
      currtab.classList.add("current-tab");
   

   //any element if visible, means in that element "active" class is been added
   //active is just a name associated with some css properties to tell that particular element is visible
   
   //if search form not visible ,make it visible
   if(!formweacon.classList.contains("active"))
   {
    grantlocont.classList.remove("active");
    showwea.classList.remove("active");
    formweacon.classList.add("active");
    
   }

   //want to see "my location weather"
   else
   {
    
   
     formweacon.classList.remove("active");
     showwea.classList.remove("active");

    //now i have come to "your weather tab"
    //so check for coordinates if we have saved them in "sessionstorage" 
    
      getfromSessionStor();
    // grantlocont.classList.add("active");

   }
 }

}

//The sessionStorage is a predefined object let you store key/value pairs in the browser.
//key	: The name of a key
//value: The value of the key

// The localStorage object stores data with no expiration date.
// The data is not deleted when the browser is closed, and are available for future sessions.
// The sessionStorage Object which stores data for one session.
// The data is deleted when the browser window is closed

// In JavaScript, sessionStorage only stores data as strings. If you want to store an object, 
// you must first convert it into a string using JSON.stringify().

// Convert string back to an object 
// JSON.parse();


function   getfromSessionStor()
{

    const localcoord=sessionStorage.getItem("usercoord"); // i received string type of value from "key" usercoord

    if(!localcoord)//local coordinates nahi mile
    {
        grantlocont.classList.add("active");
    }
    else
    {
        //Parse the data with JSON.parse(), and the data becomes a JavaScript object.
        const coord=JSON.parse(localcoord);
        fetchuserinfo(coord);
    }
}




async function fetchuserinfo(coord)
{
    //console.log(coord);
    //const {lati,long}=coord;
    const lati=coord.lat;
    const long=coord.longi;
    // console.log(lati);
    // console.log(long);
    
    grantlocont.classList.remove("active");
    loadcon.classList.add("active");

    try
    {
     //const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=8561cb5a386f28b97d535d2776cec310`);//my API Key
    
     const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=d1845658f92b31c64bd94f06f7188c9c&units=metric`);
    

//      Most APIs send data in JSON format (JavaScript Object Notation), which is lightweight and widely used.
// JSON data cannot be used directly as a JavaScript object—it needs to be converted first.
// response.json() automatically converts JSON string → JavaScript object.


// the JavaScript engine does not halt when an async function is encountered. 
// Instead, it continues executing the rest of the code without blocking while the asynchronous operation runs in the background.

// How Does JavaScript Handle async function?
// JavaScript is single-threaded but can handle asynchronous tasks using the event loop and microtask queue. Here’s what happens:

// When JavaScript encounters an async function:

// It starts executing the function immediately like any other function.
// However, when it reaches an await statement inside, it pauses execution of that function only.
// Meanwhile, JavaScript continues running the rest of the synchronous code.
// When the awaited operation completes:

// The JavaScript engine resumes execution from where it left off inside the async function.
// The resolved value of the promise is returned.

// console.log("1: Start");

// async function fetchData() {
//     console.log("2: Fetching data...");
//     let response = await fetch("https://api.example.com/data"); // Async task starts
//     console.log("3: Data fetched!");
// }

// fetchData(); // Function is called but does not block execution

// console.log("4: End");


// 1: Start
// 2: Fetching data...
// 4: End  <-- This runs while fetch is happening
// 3: Data fetched!  <-- Runs after the fetch completes

     const data=await response.json();
     //data fetched so remove loader
     loadcon.classList.remove("active");
    
     showwea.classList.add("active");

     //extracted information would render onto the UI
     renderWeatherinfo(data);

    }

    catch(err)
    {
        loadcon.classList.remove("active");
    }

}


function   renderWeatherinfo(data)
{
    //firstly fetch elements onto which dynamic information has to be rendered to UI

    const cityname=document.querySelector('.city-name');
    const counticon=document.querySelector('.country-icon');
    const descr=document.querySelector('.data-wea-desc');
    const weaicon=document.querySelector('.wea-icon');
    const temp=document.querySelector('.temp');
    const windsp=document.querySelector('.data-wind-speed');
    const humid=document.querySelector('.data-humidity');
    const cloud=document.querySelector('.data-cloudy');

    // fetch values from data been send by an API

//     If you try to access a property on null or undefined, JavaScript normally throws an error:
//     If data exists, it returns data.name.
//    If data is null or undefined, it stops execution and returns undefined instead of throwing an error.

    cityname.innerText=data?.name;// "?" is used to extract properties of an object

    // You can dynamically construct strings with variables and expressions, 
    // making it very useful for things like URLs, messages, and HTML generation.

    counticon.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;    
    
    descr.innerText=data?.weather?.[0]?.description;
    weaicon.src=`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
     temp.innerText=`${data?.main?.temp} °C`;

    windsp.innerText=`${data?.wind?.speed} m/s`;
    humid.innerText=`${data?.main?.humidity} %`;
    cloud.innerText=`${data?.clouds?.all} %`;

}

function   renderWeatherinfo2(data)
{
    //firstly fetch elements onto which dynamic information has to be rendered to UI

    const cityname=document.querySelector('.city-name');
    const counticon=document.querySelector('.country-icon');
    const descr=document.querySelector('.data-wea-desc');
    const weaicon=document.querySelector('.wea-icon');
    const temp=document.querySelector('.temp');
    const windsp=document.querySelector('.data-wind-speed');
    const humid=document.querySelector('.data-humidity');
    const cloud=document.querySelector('.data-cloudy');

    // fetch values from data been send by an API
    cityname.innerText=data?.name;// "?" is used to extract properties of an object
    counticon.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;    
    descr.innerText=data?.weather?.[0]?.description;
    weaicon.src=`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    const num= `${data?.main?.temp}  `;
   
    temp.innerText= num/10 +`°C`;

    windsp.innerText=`${data?.wind?.speed} m/s`;
    humid.innerText=`${data?.main?.humidity} %`;
    cloud.innerText=`${data?.clouds?.all} %`;

}

usertab.addEventListener("click",()=>
{
    //since clicked on usertab which means i want to go to user tab
    switchtab(usertab);
});

searchtab.addEventListener("click",()=>
{
        switchtab(searchtab);
});


    
const grantbut=document.querySelector('#graccess');
grantbut.addEventListener("click",getLocation);

    function getLocation()
    {
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else
        {
            alert("No geolocation support available");
        }
    }
    
    function showPosition(position)
    {
        const usercoord={
             lat:position.coords.latitude,
             longi:position.coords.longitude,
        }

        //after retreiving the coordinates store them in session storage ,which accepts any data  in string format
        const usercoordtxt=JSON.stringify(usercoord);

        console.log(usercoordtxt);
        sessionStorage.setItem("usercoord",usercoordtxt);//converted to text
        fetchuserinfo(usercoord);
        
    }


 const searchform=document.querySelector('.form-Weathercontainer');   
 //	submit event----when a form is submitted "submit" event triggers so make a button ans set type="submit"
 
 searchform.addEventListener("submit",(e)=>
{
   e.preventDefault();
   let cityname=document.getElementById('searchbar').value;
   
   console.log(cityname);

   if(cityname==="")
   {
    return;
   }

   else
   {
    fetchSearchweatherinfo(cityname);
   }
})


 async function  fetchSearchweatherinfo(city)
{
    console.log(city);
    grantlocont.classList.remove("active");
    loadcon.classList.add("active");
    showwea.classList.remove("active");

    try
    {
          
           const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8561cb5a386f28b97d535d2776cec310`);
           const data=await response.json();
          
           loadcon.classList.remove("active");
           showwea.classList.add("active");
           renderWeatherinfo2(data);


    }

    catch(err)
    {
            
    }
}
