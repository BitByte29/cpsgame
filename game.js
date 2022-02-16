clicks = 0;
time2 = 1;
const btn = document.querySelector(".btn");
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function closeD(){
    var item = document.getElementById("lastDisplay")
    item.style.display = "none"
    location.reload()
}
function display(val){
    var item = document.getElementById("lastDisplay")
    imgs = document.getElementById("dispimg")
    head = document.getElementById("disph")
    if (val>=11){
        imgs.src = "./imgs/cheetahM.jfif"
        head.innerHTML = `Your score is ${val} you are a Cheetah.`
    }
    else if(val <11 && val >= 8){
        imgs.src = "./imgs/rabbit.jfif";
        head.innerHTML = `Your score is ${val} you are a Rabbit.`
    }
    else if(val < 8 && val >= 6){
        imgs.src = "./imgs/elephant.jfif";
        head.innerHTML = `Your score is ${val} you are an Elephant.`
    }
    else{
        imgs.src = "./imgs/snail.jfif";
        head.innerHTML = `Your score is ${val} you are a Snail.`
        
    }
    item.style.display = "flex"
}


function cps() {

    clicks += 1
    time = document.getElementById('time').value;
    document.getElementById('clickarea').style.background = getRandomColor();

    if (time2 <= time) {
        val = clicks / time2
        val = val.toFixed(2)
        document.getElementById('score').innerHTML = val
        document.getElementById('clickcount').innerHTML = clicks
        document.getElementById('remt').innerHTML = parseInt(time - time2) + 's'
    }
    else {
        clearInterval(myInterval);
        display(val)
        d = new Date()
        text = d.toDateString();
        if (val > final) {
            postData(val);
        }
        else{
            
        }
    }

}
function timer() {
    time2 += 1
}

function start() {
    myInterval = setInterval(timer, 1000);
    document.getElementById('start').style.display = 'none';
    document.getElementById('clickarea').style.display = 'block';
}