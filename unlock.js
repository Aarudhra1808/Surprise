/*=====================================================
    SPRING AUTHENTICATION
    PART 1
=====================================================*/

/*========================
    ELEMENTS
========================*/

const hintBtn = document.getElementById("hintBtn");
const closeBtn = document.getElementById("closePopup");
const popup = document.getElementById("hintPopup");

const lock = document.getElementById("lock");

const petalContainer =
document.getElementById("petal-container");

/*========================
      HINT POPUP
========================*/

hintBtn.addEventListener("click",()=>{

    popup.classList.add("show");

});

closeBtn.addEventListener("click",()=>{

    popup.classList.remove("show");

});

popup.addEventListener("click",(e)=>{

    if(e.target===popup){

        popup.classList.remove("show");

    }

});

/*========================
      PETAL SETTINGS
========================*/

const PETAL_COUNT = 312;

/*========================
 CREATE ONE PETAL
========================*/

function createPetal(){

    const petal =
    document.createElement("div");

    petal.classList.add("petal");

    /* Random Size */

    const size = Math.random();

    if(size<0.3){

        petal.classList.add("small");

    }

    else if(size>0.7){

        petal.classList.add("large");

    }

    /* Random X Position */

    petal.style.left =
    Math.random()*100+"vw";

    /* Random Duration */

    const duration =
    8+Math.random()*8;

    petal.style.animationDuration=

    `${duration}s,
     ${3+Math.random()*3}s`;

    /* Random Delay */

    petal.style.animationDelay=

    `${Math.random()*10}s,
     0s`;

    /* Random Rotation */

    petal.style.rotate=

    Math.random()*360+"deg";

    /* Random Opacity */

    petal.style.opacity=

    0.6+Math.random()*0.4;

    petalContainer.appendChild(petal);

}

/*========================
 INITIAL PETALS
========================*/

for(let i=0;

i<PETAL_COUNT;

i++){

    createPetal();

}

/*========================
 CONTINUOUS PETALS
========================*/

setInterval(()=>{

    const petal =
    document.createElement("div");

    petal.className="petal";

    if(Math.random()<0.4){

        petal.classList.add("small");

    }

    if(Math.random()>0.75){

        petal.classList.add("large");

    }

    petal.style.left=
    Math.random()*100+"vw";

    petal.style.animationDuration=

    `${18+Math.random()*10}s,
    ${2+Math.random()*2}s`;

    petal.style.rotate=

    Math.random()*360+"deg";

    petalContainer.appendChild(petal);

    /* Remove Old Petals */

    setTimeout(()=>{

        petal.remove();

    },32000);

},80);

/*========================
 LOCK FLOAT
========================*/

let t = 0;

setInterval(()=>{

    t += 0.03;

    lock.style.transform =

    `translateY(${Math.sin(t)*3}px)`;

},16);

/*========================
 PLACEHOLDER
 PART 2 WILL START HERE
========================*/

/*=====================================================
    PART 2A
    PASSWORD + LOCK OPEN
=====================================================*/

/*========================
    PASSWORD SETTINGS
========================*/

const PASSWORD = "fully seen";      // Change this

const passwordInput =
document.getElementById("password");

const unlockBtn =
document.getElementById("unlockBtn");

const status =
document.getElementById("status");

/*========================
    UNLOCK
========================*/

unlockBtn.addEventListener("click", unlock);

passwordInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        unlock();

    }

});

/*========================
    MAIN FUNCTION
========================*/

function unlock(){

    const entered =
    passwordInput.value
    .trim()
    .toLowerCase();

    if(entered===PASSWORD){

        authenticationSuccess();

    }

    else{

        authenticationFail();

    }

}

/*========================
    SUCCESS
========================*/

function authenticationSuccess(){

    status.innerHTML =
    "✓ Identity Verified";

    status.classList.add("success");

    unlockBtn.disabled=true;

    hintBtn.disabled=true;

    passwordInput.disabled=true;

    /* Stop breathing */

    lock.style.animation="none";

    /* Open Lock */

    lock.classList.add("unlocking");

    /* Faster petals */

    document.body.classList.add("transitioning");

    /* Give Part 2B time */

    setTimeout(()=>{

        particleBurst();

    },900);

}

/*========================
    FAILURE
========================*/

function authenticationFail(){

    status.innerHTML=
    "Incorrect Password";

    status.style.color="#d84b4b";

    /* Shake input */

    passwordInput.animate(

    [

        {transform:"translateX(0)"},

        {transform:"translateX(-10px)"},

        {transform:"translateX(10px)"},

        {transform:"translateX(-8px)"},

        {transform:"translateX(8px)"},

        {transform:"translateX(0)"}

    ],

    {

        duration:450

    });

}

/*========================
    PLACEHOLDER
========================*/

function particleBurst(){

    /*

    Part 2B

    will completely replace
    this function.

    */

}

/*=====================================================
    PART 2B
    PARTICLE BURST
=====================================================*/

function particleBurst(){

    const canvas =
    document.getElementById("particleCanvas");

    const ctx =
    canvas.getContext("2d");

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    const rect=
    lock.getBoundingClientRect();

    const cx=
    rect.left+rect.width/2;

    const cy=
    rect.top+rect.height/2;

    const particles=[];

    /* Create Particles */

    for(let i=0;i<260;i++){

        particles.push({

            x:cx,

            y:cy,

            radius:2+Math.random()*5,

            dx:(Math.random()-0.5)*18,

            dy:(Math.random()-0.5)*18,

            alpha:1,

            color:

            Math.random()>0.5

            ?"#ffd5e5"

            :"#ffffff"

        });

    }

    /* Animation */

    function animate(){

        ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

        );

        particles.forEach(p=>{

            p.x+=p.dx;

            p.y+=p.dy;

            p.dx*=0.985;

            p.dy*=0.985;

            p.alpha-=0.008;

            ctx.globalAlpha=p.alpha;

            ctx.beginPath();

            ctx.arc(

            p.x,

            p.y,

            p.radius,

            0,

            Math.PI*2

            );

            ctx.fillStyle=p.color;

            ctx.fill();

        });

        ctx.globalAlpha=1;

        if(particles[0].alpha>0){

            requestAnimationFrame(

            animate

            );

        }

        else{

            startTransition();

        }

    }

    animate();

}

/*=====================================================
    SCREEN TRANSITION
=====================================================*/

function startTransition(){

    document.body.classList.add(

    "fadeOut"

    );

    /* little delay */

    setTimeout(()=>{

        window.location.href=

        "birthday.html";

    },1800);

}

/*=====================================================
    RESIZE
=====================================================*/

window.addEventListener(

"resize",

()=>{

const canvas=

document.getElementById(

"particleCanvas"

);

canvas.width=

window.innerWidth;

canvas.height=

window.innerHeight;

});

/*=====================================================
            PART 3A
        MAGIC PARTICLE ENGINE
=====================================================*/

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sparkles = [];

/*====================================
      CREATE SPARKLES
====================================*/

function createSparkles(x,y){

    for(let i=0;i<140;i++){

        sparkles.push({

            x:x,

            y:y,

            size:Math.random()*4+2,

            speedX:(Math.random()-0.5)*14,

            speedY:(Math.random()-0.5)*14,

            alpha:1,

            life:100,

            color:

            Math.random()>0.5 ?

            "#ffffff"

            :

            "#ffd5e8"

        });

    }

}

/*====================================
     UPDATE SPARKLES
====================================*/

function updateSparkles(){

    ctx.clearRect(

    0,

    0,

    canvas.width,

    canvas.height

    );

    sparkles.forEach((p,index)=>{

        p.x += p.speedX;

        p.y += p.speedY;

        p.life--;

        p.alpha -=0.01;

        p.speedX*=0.985;

        p.speedY*=0.985;

        ctx.globalAlpha=p.alpha;

        ctx.beginPath();

        ctx.arc(

            p.x,

            p.y,

            p.size,

            0,

            Math.PI*2

        );

        ctx.fillStyle=p.color;

        ctx.fill();

        if(p.life<=0){

            sparkles.splice(index,1);

        }

    });

    ctx.globalAlpha=1;

    requestAnimationFrame(updateSparkles);

}

updateSparkles();

/*====================================
      WIND EFFECT
====================================*/

let wind=0;

setInterval(()=>{

    wind=

    (Math.random()-0.5)*25;

},2500);

/*====================================
 PETAL SWIRL AFTER SUCCESS
====================================*/

function petalStorm(){

    const petals=

    document.querySelectorAll(".petal");

    petals.forEach((petal)=>{

        petal.style.animationDuration=

        "5s,1.5s";

        petal.style.left=

        parseFloat(petal.style.left)+

        wind+

        "vw";

        petal.style.scale="1.3";

    });

}

/*====================================
 LOCK GLOW
====================================*/

function lockGlow(){

    lock.animate([

        {

            transform:"scale(1)",

            filter:"drop-shadow(0 0 0px white)"

        },

        {

            transform:"scale(1.12)",

            filter:"drop-shadow(0 0 35px rgba(255,255,255,.8))"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:1200,

        easing:"ease-out"

    });

}

/*====================================
   MODIFY SUCCESS
====================================*/

const oldSuccess = authenticationSuccess;

authenticationSuccess = function(){

    oldSuccess();

    const rect =

    lock.getBoundingClientRect();

    createSparkles(

        rect.left+rect.width/2,

        rect.top+rect.height/2

    );

    lockGlow();

    petalStorm();

}

