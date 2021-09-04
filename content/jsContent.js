
const navCategorys = document.querySelectorAll(".nav_category");
const contentMovie = document.querySelector("#content .content_movie ul")


const btnNav = document.querySelector(".btnHeader button");
const headerForm = document.querySelectorAll(".nav-transform");
const cricleNav = document.querySelector(".header_form .cricle_nav")

const form = document.querySelector(".header_search")
const search = document.querySelector("#search")

const goUp = document.querySelector(".goUp");

const content = document.querySelector("#content")


const container = document.querySelector(".container")



const API = "https://api.apify.com/v2/key-value-stores/QubTry45OOCkTyohU/records/LATEST?fbclid=IwAR2CQrkSmpdayjUmuQDm2BmuZtaSBm0ol5PoNNEvzxo5UI8AwacyymiJ3B8"
fetch(API)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        presentlyEl(response.phim.phimle);

        movieEls(response.phim.phimle,"tien");

        // showMovie(response.phim.phimle)

        events(response.phim.phimle)

        move();

        setInterval(heightImg,100)


    });

// Element cho nav 
function presentlyEl (datas){
    const categorys = datas.reduce(function (value,key){
        if(!value.includes(key.category)){
            value.push(key.category);
        }
        return value
    },["Tất cả"])

    const navEL = categorys.map(function (category) {
        return `<li data-title="${category}"><a href="">${category}</a></li>`
    })
    navCategorys.forEach(navCategory => {
        navCategory.innerHTML = navEL.join("");
    })
    
}



// Element cho content all
function movieEls (datas,all){
    let tiendk = 1;
    let html ="";
    let quantity = 0;
    let movieEl
    datas.forEach(data => {
        movieEl = `
        <li>
            <a href="${data.url}">
                <div class="imgMovie">
                    <img src="${data.imageUrl}" alt="">
                </div>
                <div class="movie_information">                            
                    <span>${data.title}</span>
                    <div class="section">
                        <span>${data.category}</span>
                    </div>
                </div>
            </a>
        </li>
        `


        

        if(all){
            quantity++;
            if(quantity > 36){
                return ""
            }
        }
        html = html + movieEl;
        
    })

    contentMovie.innerHTML = html


    const showLists = document.querySelectorAll(".content_movie ul li");
    showMovie(showLists)
       
    const tiennnn = setInterval(function(){
        scrollNav()

        tiendk ++;
        if(tiendk > 2){
            clearInterval(tiennnn)
        }

    },300)    


 
    const footer = document.querySelectorAll("#footer a")
    const aEls = document.querySelectorAll("#content a");
    const headerList = document.querySelectorAll("header .nav_category")
    aEl(headerList)
    aEl(footer)
    aEl(aEls)
    function aEl(aEls){
        aEls.forEach(function(aEl){
            aEl.addEventListener("click", function(e){
                e.preventDefault();
            })
        })
    }


}


function showMovie(showLists){

    showLists.forEach((showList) => {
        showList.addEventListener("click",() => {
            container.classList.add("contentActive")
            window.scrollTo(0,0);


            const listEl = document.querySelector(".movie")
            listEl.innerHTML = `
            <div class="movieContainer">
            <div class="movieBk">        
                <div class="movieContent">
                    <div class="movieImg" style="background: url(${showList.querySelector(".imgMovie img").src}) no-repeat center center / cover"></div>
                    <div class="movieInformation">
                        <h1 class="movieInformation__title">
                            ${showList.querySelector(".movie_information span").innerText}
                        </h1>
                        <ul class="movieInformation__evaluate">
                            <li><img src="./content/sao.png" alt=""></li>
                            <li><img src="./content/title.svg" alt=""><a href="">${showList.querySelector(".section span").innerText}</a></li>
                            <li><img src="./content/clock.svg" alt=""><a href="">3/9/2021</a></li>
                        </ul>
                        <div class="movieInformation__btn">
                            <a href="${showList.querySelector("a").href}">Xem Phim</a>
                        </div>
                        <ul class="movieInformation__review">
                            <li>Quốc gia: Trung Quốc</li>
                            <li>Năm xuất bản: 2021</li>
                            <li>Ngày công chiếu: 10/8/2021</li>
                            <li>Thể loại: ${showList.querySelector(".section span").innerText}</li>
                            <li>Đạo diễn: Trương Tiếu Yên</li>
                            <li>Diễn viên: Trần Triết Viễn, Từ Mộng Khiết, Vương Trạch Hiên, Phàn Trị Hân, Vương Nhất Lam, Lưu Chỉ Vy,..</li>
                        </ul>
                    </div>
                </div>
        
            </div>
            </div>
            <div class="movieContentbottom">
                <h1>Nội dung phim</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci magnam, quo optio saepe exercitationem, nam quos cumque maxime veritatis, libero sapiente beatae enim nihil ex quibusdam ducimus earum animi. Cum!
                At libero, cum aperiam repudiandae voluptates nisi maiores laboriosam eius voluptatem expedita iure repellat. Illo minus delectus quidem laudantium at totam placeat facilis quia vel blanditiis atque explicabo, aliquid molestias!
                Quaerat dolorem doloribus, quam, ad eos maiores illum, reprehenderit quisquam cupiditate dolores fuga cumque molestiae beatae quidem expedita! Consequatur commodi ipsa laudantium libero. Porro, ratione quia! Optio impedit nam repudiandae!</p>
            </div>
            <div class="home"><i class="fas fa-home"></i></div>
            `

            if(container.matches(".contentActive")){            
                document.querySelector(".home").addEventListener("click",() => {
                    container.classList.remove("contentActive");
                    window.scrollTo(0,0);
                })
            }
        })

       
    })

}





// element cho các list navigation
function events(datas){
    const liNavs = document.querySelectorAll(".nav_category li");
    liNavs.forEach((liNav) => {
        liNav.addEventListener("click",function(e){
            const filterEl = datas.filter(function (data){
                return data.category === e.currentTarget.getAttribute("data-title")
            })
            if(e.currentTarget.getAttribute("data-title") == "Tất cả"){
                movieEls(datas,"tien");
                if(container.matches(".contentActive")){            
                        container.classList.remove("contentActive")
                }
        
            }
            else{
                movieEls(filterEl)
                if(container.matches(".contentActive")){            
                        container.classList.remove("contentActive")
                }
        
            }
            // nav đi vào 
            for(i=0;i<headerForm.length;i++){
                headerForm[i].classList.remove("active");
            }
            // cuộn chuột lên đầu trang
            //  window.scrollTo(x-coord, y-coord);
            window.scrollTo(0,0);

        })
    })

    // lúc goUp thì chuột cuộn lên 
    goUp.addEventListener("click", function(){
        window.scrollTo(0,0);
    })


    // search 
    let checkContainer = 1;
    form.addEventListener("keyup", function(){
        if(search.value != ""){
            const searchEl = [];
            datas.forEach(function(data){
                // .toLowerCase() : biến toàn bộ thành chữ thường
                if(data.title.toLowerCase().indexOf(search.value.toLowerCase()) != -1){
                    searchEl.push(data)
                }
            })
            movieEls(searchEl);
            window.scrollTo(0,0);


            if(container.matches(".contentActive")){            
                container.classList.remove("contentActive")
                checkContainer ++;
            }

        } 
        else{
            movieEls(datas,"tien");
            window.scrollTo(0,0);

            if(checkContainer != 1){

                // if(!container.matches(".contentActive")){            
                    container.classList.add("contentActive")
                // }
                checkContainer = 1;
            }
        }
    })
    form.addEventListener("submit", function(event){
        event.preventDefault();
        window.scrollTo(0,0);
    })

}



// các chuyển động
function move(){

    // chick ra nav 
    btnNav.addEventListener("click",function(){
        for(i=0;i<headerForm.length;i++){
            headerForm[i].classList.add("active");
        }
    })

    // click vào nav
    cricleNav.addEventListener("click", function(){
        for(i=0;i<headerForm.length;i++){
            headerForm[i].classList.remove("active");
        }
    })

    
    
}


// scroll navigation
function scrollNav(){  
        //https://qastack.vn/programming/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window
        const navContent = document.querySelector("#content .nav");
        const footer = document.querySelector("#footer")
        const body = document.body
        
        let check = 1;
        let last;
    
        const lap = setInterval(function() {
            // first = getOffset(navContent).top - 70;
            last = body.offsetHeight - footer.offsetHeight - navContent.offsetHeight - 220;
            check++
            if(check > 2){
                clearInterval(lap)
            }
        },100)
        
        window.addEventListener('scroll',function(){
            // console.log(window.innerHeight);
            // console.log(first , last , window.pageYOffset);
            if(window.pageYOffset >= 55 && window.pageYOffset <= last){            
                navContent.classList.add("scroll");
                   
            }
            if(window.pageYOffset < 55 || window.pageYOffset > last){
                navContent.classList.remove("scroll");
            }
        })
}


// hàm xử lý chiều cao và trái
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
}

// cho phần height ảnh  

function heightImg(){

    const lis = contentMovie.querySelectorAll("li")
    lis.forEach((li) => {
        li.querySelector(".imgMovie").style.height = `calc(calc(${lis[0].offsetWidth}px * 3) / 2 )`
    })
}



