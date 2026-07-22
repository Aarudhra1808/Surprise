/*==================================================
            BIRTHDAY CELEBRATION
                PART 1
==================================================*/

"use strict";

/*=========================================
            ELEMENTS
=========================================*/
const blowBtn = document.getElementById("blow-candles-btn");
const giftBtn = document.getElementById("gift-button");
const countdownScreen = document.getElementById("countdown-screen");
const countdownNumber = document.getElementById("countdown-number");

const birthdayScreen = document.getElementById("birthday-screen");

const birthdayTitle = document.getElementById("birthday-title");

const cakePlate = document.getElementById("cake-plate");

const layer1 = document.querySelector(".layer1");
const layer2 = document.querySelector(".layer2");
const layer3 = document.querySelector(".layer3");

const candles = document.getElementById("candles");

const giftButton = document.getElementById("gift-button");

const music = document.getElementById("birthday-music");

const musicBtn = document.getElementById("music-btn");


/*=========================================
            INITIAL STATE
=========================================*/

giftButton.style.opacity = "0";
giftButton.style.pointerEvents = "none";
    giftBtn.addEventListener("click", () => {

    // start fade out
    document.body.classList.add("page-exit");

    // wait for animation then redirect
    setTimeout(() => {
        window.location.href = "gift.html";
    }, 800);

});

birthdayTitle.style.opacity = "0";

cakePlate.style.opacity = "0";

layer1.style.opacity = "0";
layer2.style.opacity = "0";
layer3.style.opacity = "0";

candles.style.opacity = "0";


/*=========================================
        WAIT HELPER
=========================================*/

function wait(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}


/*=========================================
        COUNTDOWN
=========================================*/

async function runCountdown(){

    const numbers = ["3","2","1"];

    for(const number of numbers){

        countdownNumber.textContent = number;

        countdownNumber.classList.remove("countdown-pop");

        void countdownNumber.offsetWidth;

        countdownNumber.classList.add("countdown-pop");

        await wait(1000);

    }

}


/*=========================================
        SHOW BIRTHDAY PAGE
=========================================*/

async function showBirthdayPage(){

    countdownScreen.classList.add("fade-out");

    await wait(800);

    countdownScreen.style.display = "none";

    birthdayScreen.classList.remove("hidden");

}


/*=========================================
        START MUSIC
=========================================*/

function startMusic(){

    music.volume = 0.5;

    music.play().catch(() => {

        console.log("Music autoplay blocked.");

    });

}


/*=========================================
        CAKE BUILD
=========================================*/

async function buildCake(){

    /* Plate */

    cakePlate.classList.add("drop-piece");

    cakePlate.style.opacity = "1";

    await wait(700);


    /* Bottom */

    layer1.classList.add("drop-piece");

    layer1.style.opacity = "1";

    await wait(700);


    /* Middle */

    layer2.classList.add("drop-piece");

    layer2.style.opacity = "1";

    await wait(700);


    /* Top */

    layer3.classList.add("drop-piece");

    layer3.style.opacity = "1";

    await wait(700);


    /* Candles */

    candles.classList.add("show-candles");

    candles.style.opacity = "1";

}


/*=========================================
        TITLE
=========================================*/

async function showTitle(){

    await wait(500);

    birthdayTitle.classList.add("show-title");

}


/*=========================================
        GIFT BUTTON
=========================================*/

async function showGiftButton(){

    await wait(1000);

    giftButton.style.opacity = "1";

    giftButton.style.pointerEvents = "auto";

    giftButton.classList.add("pop");

}


/*=========================================
        MUSIC BUTTON
=========================================*/

musicBtn.addEventListener("click",()=>{

    if(music.paused){

        music.play();

        musicBtn.textContent="🎵";

    }

    else{

        music.pause();

        musicBtn.textContent="🔇";

    }

});
blowBtn.style.opacity = "0";
blowBtn.style.pointerEvents = "none";
let cakeReady = false;
let candlesBlown = false;

async function startCelebration(){

    await runCountdown();

    await showBirthdayPage();

    startMusic();

    // Balloons can already float in the background
    createBalloons();

    // Build the cake first
    await buildCake();

    // Show Happy Birthday text
    await showTitle();
    
    // Small dramatic pause
    await wait(400);

    // Celebration starts NOW
    startConfettiRain();
    startFireworks();
    startSparkles();
    cakeReady = true;

    // show blow button ONLY after HBD text
    blowBtn.style.opacity = "1";
    blowBtn.style.pointerEvents = "auto";
    blowBtn.classList.add("pop");

}


/*=========================================
            START
=========================================*/

window.addEventListener("load",()=>{

    startCelebration();

});

/*==================================================
                PART 2A
            BALLOON ENGINE
==================================================*/

const balloonContainer = document.querySelector(".balloon-container");

const balloonColors = [
    "red",
    "navy",
    "purple",
    "emerald",
    "maroon",
    "gold",
    "sapphire"
];

const balloonTypes = [
    "round",
    "round",
    "round",
    "round",
    "round",
    "round",
    "round",
    "round",
    "round",
    "round"
];


/*=========================================
        RANDOM NUMBER
=========================================*/

function random(min,max){

    return Math.random()*(max-min)+min;

}


/*=========================================
        CREATE BALLOON
=========================================*/

function createBalloon(){

    const balloon=document.createElement("div");

    balloon.classList.add("balloon");



    /* Random Type */

    const type=balloonTypes[
        Math.floor(Math.random()*balloonTypes.length)
    ];

    if(type!==""){

        balloon.classList.add(type);

    }



    /* Random Color */

    balloon.classList.add(

        balloonColors[
            Math.floor(Math.random()*balloonColors.length)
        ]

    );



    /* Random Size */

    const width=random(55,90);

    const height=width*1.25;

    balloon.style.width=width+"px";
    balloon.style.height=height+"px";



    /* Random Position */

    balloon.style.left=random(0,95)+"vw";



    /* Random Rotation */

    const rotation=random(-15,15);

    balloon.style.transform=
        `rotate(${rotation}deg)`;



    /* Balloon String */

    const string=document.createElement("div");

    string.classList.add("balloon-string");

    string.style.height=random(70,140)+"px";

    balloon.appendChild(string);



    /* Balloon Glow */

    const glow=document.createElement("div");

    glow.classList.add("balloon-glow");

    balloon.appendChild(glow);



    balloonContainer.appendChild(balloon);



    animateBalloon(balloon);

}


/*=========================================
        BALLOON ANIMATION
=========================================*/

function animateBalloon(balloon){

    const duration=random(5,8);
    const drift=random(60,180);

    const rotate=random(-12,12);



    balloon.animate(

    [

        {

            transform:

            `translate(0,0) rotate(${rotate}deg)`

        },

        {

            transform:

            `translate(${drift}px,-55vh) rotate(${-rotate}deg)`

        },

        {

            transform:

            `translate(${-drift}px,-130vh) rotate(${rotate}deg)`

        }

    ],

    {

        duration:duration*1000,

        easing:"linear",

        fill:"forwards"

    });



    setTimeout(()=>{

        balloon.remove();

    },duration*1000+100);

}



/*=========================================
        CONTINUOUS SPAWNER
=========================================*/

function createBalloons(){



    /* Initial Burst */

    for(let i=0;i<40;i++){

        setTimeout(()=>{

            createBalloon();

        },i*120);

    }



    /* Keep Creating */

    setInterval(()=>{

        createBalloon();

    },250);

}

/*==================================================
                PART 2B-1
              CONFETTI ENGINE
==================================================*/

const confettiContainer = document.querySelector(".confetti-container");

const confettiColors = [
    "#ff7eb6",
    "#ffd166",
    "#9be564",
    "#87cefa",
    "#d4a5ff",
    "#ffffff",
    "#ff9f68"
];

const confettiShapes = [
    "square",
    "circle",
    "long",
    "star"
];


/*=========================================
            CREATE CONFETTI
=========================================*/

function createConfettiPiece(x = null){

    const piece = document.createElement("div");

    piece.classList.add("confetti");



    /* Shape */

    piece.classList.add(

        confettiShapes[
            Math.floor(Math.random()*confettiShapes.length)
        ]

    );



    /* Color */

    piece.style.background =
        confettiColors[
            Math.floor(Math.random()*confettiColors.length)
        ];



    /* Position */

    piece.style.left =
        (x ?? random(0,100)) + "vw";

    piece.style.top = "-20px";



    /* Size */

    const size = random(8,18);

    piece.style.width = size + "px";

    piece.style.height = size * 1.4 + "px";



    confettiContainer.appendChild(piece);

    animateConfetti(piece);

}



/*=========================================
        CONFETTI ANIMATION
=========================================*/

function animateConfetti(piece){

    const drift = random(-180,180);

    const rotation = random(540,1440);

    const duration = random(3500,6500);



    piece.animate(

    [

        {

            transform:
            "translate(0,0) rotate(0deg)",

            opacity:1

        },

        {

            transform:
            `translate(${drift}px,110vh) rotate(${rotation}deg)`,

            opacity:1

        }

    ],

    {

        duration,

        easing:"ease-in",

        fill:"forwards"

    });



    setTimeout(()=>{

        piece.remove();

    },duration);

}



/*=========================================
        CONFETTI BURST
=========================================*/

function confettiBurst(){

    for(let i=0;i<220;i++){

        setTimeout(()=>{

            createConfettiPiece();

        },i*12);

    }

}



/*=========================================
        SIDE CANNONS
=========================================*/

function confettiCannons(){

    /* Left Cannon */

    for(let i=0;i<120;i++){

        setTimeout(()=>{

            createConfettiPiece(random(0,15));

        },i*10);

    }



    /* Right Cannon */

    for(let i=0;i<120;i++){

        setTimeout(()=>{

            createConfettiPiece(random(85,100));

        },i*10);

    }

}

/*==================================================
                PART 2B-2A
              FIREWORK ENGINE
==================================================*/

const fireworksContainer = document.querySelector(".fireworks-container");

const fireworkColors = [
    "#ff7eb6",
    "#ffd166",
    "#9be564",
    "#87cefa",
    "#d4a5ff",
    "#ffffff",
    "#ff9f68",
    "#7cf5ff"
];


/*=========================================
            CREATE FIREWORK
=========================================*/

function createFirework(x = null, y = null){

    x = x ?? random(15,85);
    y = y ?? random(10,45);

    const particleCount = 40;

    for(let i = 0; i < particleCount; i++){

        const particle = document.createElement("div");

        particle.classList.add("firework");

        particle.style.left = x + "vw";
        particle.style.top = y + "vh";

        const size = random(5,10);

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.background =
            fireworkColors[
                Math.floor(Math.random()*fireworkColors.length)
            ];

        fireworksContainer.appendChild(particle);

        animateFireworkParticle(particle);

    }

}


/*=========================================
        PARTICLE ANIMATION
=========================================*/

function animateFireworkParticle(particle){

    const angle = random(0,Math.PI*2);

    const distance = random(80,180);

    const x = Math.cos(angle)*distance;

    const y = Math.sin(angle)*distance;

    const rotation = random(180,1080);

    const duration = random(1200,2200);

    particle.animate(

    [

        {

            transform:"translate(0,0) scale(.3)",

            opacity:1

        },

        {

            transform:
            `translate(${x}px,${y}px)
             rotate(${rotation}deg)
             scale(1)`,

            opacity:1,

            offset:.6

        },

        {

            transform:
            `translate(${x*1.2}px,${y*1.2}px)
             rotate(${rotation+180}deg)
             scale(.2)`,

            opacity:0

        }

    ],

    {

        duration,

        easing:"ease-out",

        fill:"forwards"

    });

    setTimeout(()=>{

        particle.remove();

    },duration);

}


/*=========================================
        SINGLE FIREWORK
=========================================*/

function launchFirework(){

    createFirework();

}


/*=========================================
        CONTINUOUS FIREWORKS
=========================================*/

function startFireworks(){

    /* Initial Celebration */

    setTimeout(()=>{

        launchFirework();

    },500);

    setTimeout(()=>{

        launchFirework();

    },1200);

    setTimeout(()=>{

        launchFirework();

    },1900);

    /* Keep Celebrating */

    setInterval(()=>{

        launchFirework();

    },3000);

}

/*==================================================
                PART 4A-1
        MUSIC + SPARKLE CREATION
==================================================*/

/*=========================================
            MUSIC FADE
=========================================*/

let musicVolume = 0.55;
let fadeInterval = null;

function fadeMusicIn(duration = 3000){

    clearInterval(fadeInterval);

    music.volume = 0;

    music.play().catch(()=>{});

    const step = musicVolume / (duration / 50);

    fadeInterval = setInterval(()=>{

        music.volume += step;

        if(music.volume >= musicVolume){

            music.volume = musicVolume;

            clearInterval(fadeInterval);

        }

    },50);

}


function fadeMusicOut(duration = 1500){

    clearInterval(fadeInterval);

    const step = music.volume / (duration / 50);

    fadeInterval = setInterval(()=>{

        music.volume -= step;

        if(music.volume <= 0){

            music.volume = 0;

            music.pause();

            clearInterval(fadeInterval);

        }

    },50);

}



/*=========================================
            SPARKLES
=========================================*/

const sparkleContainer = document.createElement("div");

sparkleContainer.className = "sparkle-container";

document.body.appendChild(sparkleContainer);

const sparkleColors=[

    "#ffffff",

    "#fff7b2",

    "#ffe4f2",

    "#dfffe8",

    "#fff0d0"

];



/*=========================================
        CREATE SPARKLE
=========================================*/

function createSparkle(){

    const sparkle=document.createElement("div");

    sparkle.className="sparkle";



    const size=random(4,10);

    sparkle.style.width=size+"px";

    sparkle.style.height=size+"px";



    sparkle.style.left=random(15,85)+"vw";

    sparkle.style.top=random(15,75)+"vh";



    sparkle.style.background=

        sparkleColors[

            Math.floor(

                Math.random()*sparkleColors.length

            )

        ];



    sparkle.style.opacity=random(.4,1);



    sparkleContainer.appendChild(sparkle);



    animateSparkle(sparkle);

}



/*=========================================
        CREATE MANY
=========================================*/

function startSparkles(){

    for(let i=0;i<35;i++){

        setTimeout(()=>{

            createSparkle();

        },i*120);

    }



    setInterval(()=>{

        createSparkle();

    },450);

}

/*==================================================
                PART 4A-2
        SPARKLE ANIMATION & CLEANUP
==================================================*/

/*=========================================
        ANIMATE SPARKLE
=========================================*/

function animateSparkle(sparkle){

    const duration = random(2500,5000);

    const xMove = random(-40,40);

    const yMove = random(-60,-120);

    const rotation = random(180,720);

    const scale = random(0.6,1.4);

    sparkle.animate(

    [

        {

            transform:
            "translate(0,0) scale(.2) rotate(0deg)",

            opacity:0

        },

        {

            transform:
            `translate(${xMove/2}px,${yMove/2}px)
             scale(${scale})
             rotate(${rotation/2}deg)`,

            opacity:1,

            offset:.35

        },

        {

            transform:
            `translate(${xMove}px,${yMove}px)
             scale(.2)
             rotate(${rotation}deg)`,

            opacity:0

        }

    ],

    {

        duration,

        easing:"ease-out",

        fill:"forwards"

    });



    setTimeout(()=>{

        sparkle.remove();

    },duration);

}



/*=========================================
        EXTRA TWINKLE
=========================================*/

function sparkleTwinkle(){

    const sparkles=document.querySelectorAll(".sparkle");

    sparkles.forEach(s=>{

        s.animate(

        [

            {

                opacity:.5,

                transform:"scale(.9)"

            },

            {

                opacity:1,

                transform:"scale(1.2)"

            },

            {

                opacity:.5,

                transform:"scale(.9)"

            }

        ],

        {

            duration:random(900,1800),

            iterations:1,

            easing:"ease-in-out"

        });

    });

}



/*=========================================
        CONTINUOUS TWINKLE
=========================================*/

setInterval(()=>{

    sparkleTwinkle();

},1200);



/*=========================================
        CLEANUP
=========================================*/

setInterval(()=>{

    const sparkles=document.querySelectorAll(".sparkle");

    if(sparkles.length>120){

        for(let i=0;i<25;i++){

            if(sparkles[i]){

                sparkles[i].remove();

            }

        }

    }

},4000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let targetX = mouseX;
let targetY = mouseY;

document.addEventListener("mousemove",(e)=>{

    targetX = e.clientX;
    targetY = e.clientY;

});


/*=========================================
        SMOOTH FOLLOW
=========================================*/

function updateMouse(){

    mouseX += (targetX - mouseX) * 0.08;
    mouseY += (targetY - mouseY) * 0.08;

    requestAnimationFrame(updateMouse);

}

updateMouse();


/*=========================================
        PARALLAX LOOP
=========================================*/

function parallaxLoop(){

    const offsetX = (mouseX - window.innerWidth / 2) / 40;
    const offsetY = (mouseY - window.innerHeight / 2) / 40;



    /* Cake */

    const cakeArea = document.getElementById("cake-area");

    if(cakeArea){

        cakeArea.style.transform =

        `translate(${offsetX}px,${offsetY}px)
         rotateY(${offsetX * 0.8}deg)
         rotateX(${-offsetY * 0.8}deg)`;

    }



    /* Balloons */

    document.querySelectorAll(".balloon").forEach(balloon=>{

        const speed = random(0.15,0.35);

        balloon.style.marginLeft =
            `${offsetX * speed}px`;

        balloon.style.marginTop =
            `${offsetY * speed}px`;

    });



    /* Sparkles */

    document.querySelectorAll(".sparkle").forEach(sparkle=>{

        const speed = random(0.05,0.18);

        sparkle.style.marginLeft =
            `${offsetX * speed}px`;

        sparkle.style.marginTop =
            `${offsetY * speed}px`;

    });



    /* Fireworks */

    document.querySelectorAll(".firework").forEach(fire=>{

        fire.style.marginLeft =
            `${offsetX * .1}px`;

        fire.style.marginTop =
            `${offsetY * .1}px`;

    });



    requestAnimationFrame(parallaxLoop);

}

parallaxLoop();

function startConfettiRain() {

    // Big burst
confettiBurst();
confettiCannons();

// Small bursts every 5 seconds
setInterval(()=>{

    for(let i=0;i<80;i++){

        setTimeout(createConfettiPiece,i*8);

    }

},5000);

// Continuous light confetti
setInterval(()=>{

    for(let i=0;i<8;i++){

        createConfettiPiece();

    }

},500);

}



blowBtn.addEventListener("click", () => {

    if(!cakeReady || candlesBlown) return;

    candlesBlown = true;
    const flames = document.querySelectorAll(".flame");

    // blow flames
    flames.forEach((flame, i) => {
        setTimeout(() => {
            flame.classList.add("out");
        }, i * 200);
    });
    blowBtn.style.opacity = "0";
    blowBtn.style.pointerEvents = "none";
    blowBtn.style.transform = "translateY(50%) scale(0.9)";
    blowBtn.classList.remove("pop");

    // show gift button AFTER blow completes
    setTimeout(() => {

        giftBtn.style.opacity = "1";
        giftBtn.style.pointerEvents = "auto";
        giftBtn.classList.add("pop");

    }, 2000);

});

