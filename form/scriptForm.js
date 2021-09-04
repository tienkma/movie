const btnIn = document.querySelector(".blueBg .signIn button");
const btnUp = document.querySelector(".blueBg .signUp button");
const form = document.querySelector(".form")
const lengthEls = document.querySelectorAll(".checkLength");
const bkimg = document.querySelector(".bkimg")

btnUp.addEventListener("click", function(){
    form.classList.add("active")
    if(lengthEls[1].value.length == 0){
        bkimg.style.filter = `blur(20px)`
    }
    else{
        const blur = 20 - lengthEls[1].value.length * 2;
        bkimg.style.filter = `blur(${blur}px)`
        if(blur < 0){
            bkimg.style.filter = `blur(0px)`
        }    
    }
})
btnIn.addEventListener("click", function(){
    form.classList.remove("active");
    if(lengthEls[0].value.length == 0){
        bkimg.style.filter = `blur(20px)`
    }
    else{
        const blur = 20 - lengthEls[0].value.length * 2;
        bkimg.style.filter = `blur(${blur}px)`
        if(blur < 0){
            bkimg.style.filter = `blur(0px)`
        }
    }
})

lengthEls.forEach(function(lengthEl){
    lengthEl.addEventListener("input", function(event){
        const length = event.target.value.length;
        const blur = 20 - length * 2;
        bkimg.style.filter = `blur(${blur}px)`
        if(blur < 0){
            bkimg.style.filter = `blur(0px)`
        }
    })
})





