const headlines = document.getElementById("headlines")
const stockMarket = document.getElementById("stock-market")
const stories = document.getElementById("stories")
const weather = document.getElementById('weather')
const mode = document.getElementById('mode')
var lightMode = false

window.onload = ()=>{
    getHeadlines();
    getSstockMarket();
    getTopStories("light");
    getWeather();
    toggleMode();
}

function getHeadlines(){
    const reqHeadlines = new XMLHttpRequest();

    reqHeadlines.open("GET", "https://feeds.intoday.in/tts/it_headlines_v2.json")

    reqHeadlines.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.playlist;
            let str = "";
            let newshtml = "";
            articles.forEach(function (element) {
                
                str=`<div class="carousel-item">
                        <img src="${element.image}" class="w-100" alt="...">
                            <div class="carousel-caption d-inline" style="background-image: linear-gradient(90deg, transparent, black, transparent);">
                                <a class="fw-bolder link-light link-underline link-underline-opacity-0" href="${element.cont_url}" >${element.title}</a>
                            </div>
                    </div>`;
                newshtml = newshtml + str;
            });
            headlines.innerHTML = newshtml
            headlines.firstChild.classList.add("active")
        }
    }
    reqHeadlines.send();
}
function getSstockMarket(){
    
    const market = new XMLHttpRequest();

    market.open("GET", "https://marketapi.intoday.in/widget/indicesticker/view?exchange=nse")
    
    market.onload = function(){
        if(this.status == 200){
            let market = JSON.parse(this.responseText)
            let stocks = market.data
            list = ""
            stocks.forEach((stock)=>{
                let color = "success"
                if(stock.price > stock.open_price){
                    color = "success"
                }  else {
                    color = "danger"
                }
                percent_difference = Math.round((stock.pricediff/stock.open_price)*100)/100
                list = list + `<li class="list-group-item bg-dark text-light">
                                    <div class="row">
                                        <div class="col-7">
                                            
                                            <h5>${stock.co_name}</h5>
                                            <h6 class="fw-bolder">${stock.price}</h6>
                                        </div>
                                        <div class="col-5">
                                            <h5 class="text-${color}">${Math.round(stock.pricediff*100)/100} (${percent_difference}%)</h5>
                                        </div>
                                    </div>
                                </li>`
            })
            stockMarket.innerHTML = list
        }
    }
    market.send()
}

getTopStories = function(mode){
    const topStories = new XMLHttpRequest()
    
    topStories.open("GET", "https://rec.izooto.com/rec/v2/cb8f7e8cdf016fda78397b236386b9e815332249/0.json")

    topStories.onload = function(){
        let json = JSON.parse(this.response)
        let text = ""   
        let txtcolor = ""
        let bgcolor = ""
        let border = ""
        if(mode == "dark"){
            txtcolor = "text-light"
            bgcolor = "bg-dark"
            border = "border-0"
        }
        json.forEach((story)=>{
            text += `<ul class="d-block list-group list-group-horizontal my-1">
                        <a class="list-group-item row ${bgcolor} ${border}"  href=${story.l}>
                            <div class="row">
                                <div class="col-9 ${txtcolor} ${bgcolor}">
                                    <h5 class="fw-bold">${story.t}</h5>
                                    <p>${story.m}</p>
                                </div>
                                <div class="col-3 ${bgcolor}">
                                    <img src=${story.mi} class="img-fluid rounded float-end">
                                </div>
                            </div>
                        </a>
                    </ul>`
        })
        stories.innerHTML = text
    }
    topStories.send()
}

getWeather = function(){
    const reqWeather = new XMLHttpRequest()

    reqWeather.open("GET", "https://www.hindustantimes.com/static-content/5m/air-quality-v3/delhi.json")

    reqWeather.onload = function(){
        let json = JSON.parse(this.response)
        main = json.data.weather
        weather.innerHTML = `${main.name} <div class="vr"></div> ${main.main.temp}<sup>o</sup>C`
    }

    reqWeather.send()
}

const toggleMode = function(){
    if(lightMode == true){
        // dark mode
        lightMode = false
        document.getElementsByTagName('body')[0].classList.add('bg-black')
        document.getElementsByClassName('navbar')[0].classList.remove("navbar-primary","bg-primary")
        document.getElementsByClassName('navbar')[0].classList.add("navbar-dark","bg-dark")
        document.getElementsByClassName('container')[0].classList.add('bg-black')
        document.getElementsByClassName('card')[1].classList.add('bg-dark')
        getTopStories("dark")
        mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"> <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/> </svg>`
    } else {
        // light mode
        lightMode = true
        document.getElementsByTagName('body')[0].classList.remove('bg-black')
        document.getElementsByClassName('navbar')[0].classList.add("navbar-primary","bg-primary")
        document.getElementsByClassName('navbar')[0].classList.remove("navbar-dark","bg-dark")
        document.querySelectorAll('div.a')
        document.getElementsByClassName('container')[0].classList.remove('bg-black')
        document.getElementsByClassName('card')[1].classList.remove('bg-dark')
        getTopStories("light")
        mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16"> <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/> </svg>`
    }
    console.log("light mode : ", lightMode)
}

stockMarket.style.scrollbarWidth = "none"
setInterval(()=>{ stockMarket.scrollBy(0, 1) },10)
setInterval(()=>{ next = document.getElementsByClassName("carousel-control-next")[0].click() },3000)