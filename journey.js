/*=========================================
        MEMORY DATA (28 PHOTOS)
=========================================*/

const memories = [
{
    image: "1.png",
    title: "The little boy",
    caption: "I love this cute little boy even if he is 18 years old."
},
{
    image: "2.png",
    title: "Your innocence",
    caption: "Its the main thing I love about this picture and I looked at this more than 100 times."
},
{
    image: "3.png",
    title: "The cute moment",
    caption: "I am waiting to celebrate a birthday like this with you and I will recreate this same pic."
},
{
    image: "4.png",
    title: "Junior Handsome",
    caption: "You look handsome even in uniform. I wish I met you sooner."
},
{
    image: "5.png",
    title: "My favourite pic",
    caption: "I want a cute boy like this in future of my own cause he is really cute."
},
{
    image: "6.png",
    title: "You Being You",
    caption: "I love when you be just yourself and happy."
},
{
    image: "7.png",
    title: "My sleeping handsome",
    caption: "I was literally admiring you when you were sleeping in the call. I loved it so much."
},
{
    image: "8.png",
    title: "Those eyes",
    caption: "God you look soo good in white and those eyes..."
},
{
    image: "9.png",
    title: "A pic that just made me forget my anger",
    caption: "When you sent me this pic I just forgot why I was mad I just dont like you being sad.. So, smile da you look really beautiful."
},
{
    image: "10.png",
    title: "Smile that makes me forget everything",
    caption: "You really look breath-taking when you smile da. Aiyoo I love you."
},
{
    image: "11.png",
    title: "Comfort Person",
    caption: "This picture reminds me that my comfort is not a place—it is a person, and that person is you."
},
{
    image: "12.png",
    title: "Unexpected favourite",
    caption: "I never thought you would look this good in traditional dress."
},
{
    image: "13.png",
    title: "Golden hour",
    caption: "The sun had competition cause you are glowing."
},
{
     image: "14.png",
    title: "Puzzle piece that fits me perfectly",
    caption: "You understand me like no one and I am lucky to have you."
},
    
{
    image: "15.png",
    title: "A Memory I Visit Often",
    caption: "If memories were places, this would be the one I visit the most."
},
{
    image: "16.png",
    title: "Unexpected Favorite",
    caption: "I did not know this would become one of my favorite pictures until I found myself staring at it for minutes."
},
{
    image: "17.png",
    title: "The Way You Looked",
    caption: "There was something about the way you looked in this moment that made time feel slower."
},
{
    image: "18.png",
    title: "Effortless Handsome",
    caption: "My dp is a reflection of this pic cause I loved this very much."
},
{
    image: "19.png",
    title: "Eyes That Speak",
    caption: "Your eyes always seem to say a thousand things that words never manage to explain."
},
   
{
    image: "20.png",
    title: "Moonlight Memory",
    caption: "This memory has the same feeling as moonlight—calm, magical, and impossible to forget."
    
},
{
    image: "21.png",
    title: "The Smile That Wins",
    caption: "No matter how difficult the day gets, this smile somehow wins every argument my sadness tries to make."
},
{
    image: "22.png",
    title: "The Little Details",
    caption: "I love this picture because of the little detail that you kept the pen I gave safe and I was impressed."
},
{
    image: "23.png",
    title: "A Beautiful Angel",
    caption: "Meeting you felt like the kind of the most beautiful phase that changed the entire story of my life."
    
},
{
    image: "24.png",
    title: "My Safe Place",
    caption: "This picture feels like home, even when I am nowhere near you."
},
{
    image: "25.jpg",
    title: "My Favorite Chapter",
    caption: "Out of all the chapters my life has written so far, the ones with you are the pages I reread the most."
},
{
    image: "26.png",
    title: "Still Gives Me Butterflies",
    caption: "I have seen this photo many times, yet it still gives me the same butterflies every single time."

    
},
{
    image: "27.jpg",
    title: "The Warmest Frame",
    caption: "Some pictures are beautiful. This one is warm, and that means even more to me."
    
},
{
    image: "28.png",
    title: "Forever Memory",
    caption: "If I could keep only one thing from all of time, I would keep the feeling this picture gives me."
}
];

/*=========================================
        DOM ELEMENTS
=========================================*/

const ring = document.getElementById("memoryRing");
const pics = document.querySelectorAll(".memoryPic");
const mainImage = document.getElementById("mainImage");
const memoryTitle = document.getElementById("memoryTitle");
const memoryCaption = document.getElementById("memoryCaption");
const counter = document.getElementById("counter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const cameraSound = document.getElementById("cameraSound");
const whooshSound = document.getElementById("whooshSound");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

/*=========================================
        GLOBAL VARIABLES
=========================================*/

let currentIndex = 0;
let autoPlay;
let isPaused = false;

/*=========================================
        PLACE PHOTOS IN PERFECT CIRCLE
=========================================*/

function positionPhotos() {

    const total = pics.length;
    const radius = 525;

    pics.forEach((pic, index) => {

        const angle = (index / total) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        pic.style.left = `calc(50% + ${x}px - 55px)`;
        pic.style.top = `calc(50% + ${y}px - 55px)`;

    });

}

/*=========================================
        UPDATE MAIN MEMORY
=========================================*/

function showMemory(index) {

    currentIndex = index;

    // Camera flash effect
    document.body.style.transition = "background 0.2s";
    document.body.style.background = "white";

    setTimeout(() => {
        document.body.style.background = "";
    }, 120);

    // Sound effects
    if (cameraSound) {
        cameraSound.currentTime = 0;
        cameraSound.play().catch(() => {});
    }

    // Fade out caption
    memoryCaption.style.opacity = "0";
    memoryTitle.style.opacity = "0";

    // Change content after small delay
    setTimeout(() => {

        const memory = memories[index];

        mainImage.src = memory.image;
        memoryTitle.textContent = memory.title;
        memoryCaption.textContent = memory.caption;

        memoryTitle.style.opacity = "1";
        memoryCaption.style.opacity = "1";

    }, 250);

    // Update counter
    const displayIndex = String(index + 1).padStart(2, "0");
    counter.textContent = `${displayIndex} / ${memories.length}`;

    // Highlight active photo
    pics.forEach(pic => {
        pic.style.border = "3px solid rgba(255,255,255,.35)";
        pic.style.transform = "scale(1)";
    });

    pics[index].style.border = "4px solid #ff8fb3";
    pics[index].style.transform = "scale(1.25)";

}

/*=========================================
        NEXT / PREVIOUS
=========================================*/

function nextMemory() {

    // If we're already on the last memory,
    // show the ending instead of looping.
    if (currentIndex >= memories.length - 1) {

        stopAutoPlay();

        showEnding();

        return;
    }

    currentIndex++;

    showMemory(currentIndex);

}
function prevMemory() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = memories.length - 1;
    }

    showMemory(currentIndex);

}

/*=========================================
        AUTO PLAY
=========================================*/

function startAutoPlay() {

    autoPlay = setInterval(() => {

        if (!isPaused) {
            nextMemory();
        }

    }, 6000); // Change every 6 seconds

}

function stopAutoPlay() {

    clearInterval(autoPlay);

}

/*=========================================
        BUTTON EVENTS
=========================================*/

nextBtn.addEventListener("click", () => {

    nextMemory();

});

prevBtn.addEventListener("click", () => {

    prevMemory();

});

/*=========================================
        CLICK SMALL PHOTO
=========================================*/

pics.forEach((pic, index) => {

    pic.addEventListener("click", () => {

        showMemory(index);

    });

});

/*=========================================
        PAUSE ON HOVER
=========================================*/

ring.addEventListener("mouseenter", () => {

    isPaused = true;

});

ring.addEventListener("mouseleave", () => {

    isPaused = false;

});

document.querySelector(".centerMemory").addEventListener("mouseenter", () => {

    isPaused = true;

});

document.querySelector(".centerMemory").addEventListener("mouseleave", () => {

    isPaused = false;

});

/*=========================================
        MUSIC CONTROL
=========================================*/

let musicPlaying = false;

musicBtn.addEventListener("click", async () => {

    try {

        if (!musicPlaying) {

            await bgMusic.play();
            musicBtn.textContent = "⏸ Pause";
            musicPlaying = true;

        } else {

            bgMusic.pause();
            musicBtn.textContent = "🎵 Music";
            musicPlaying = false;

        }

    } catch (error) {

        console.log("Autoplay blocked by browser");

    }

});

/*=========================================
        AUTO START MUSIC AFTER INTRO
=========================================*/

setTimeout(async () => {

    try {

        bgMusic.volume = 0.5;
        await bgMusic.play();

        musicBtn.textContent = "⏸ Pause";
        musicPlaying = true;

    } catch (e) {

        // Browser may block autoplay until user interacts

    }

}, 5200);

/*=========================================
        KEYBOARD CONTROLS
=========================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        nextMemory();

    } else if (e.key === "ArrowLeft") {

        prevMemory();

    }

});

/*=========================================
        TOUCH SWIPE (MOBILE)
=========================================*/

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});

document.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (difference > 50) {

        nextMemory();

    } else if (difference < -50) {

        prevMemory();

    }

});

/*=========================================
        PRELOAD IMAGES
=========================================*/

function preloadImages() {

    memories.forEach(memory => {

        const img = new Image();
        img.src = memory.image;

    });

}

/*=========================================
        INITIALIZE
=========================================*/

window.addEventListener("load", () => {

    preloadImages();
    positionPhotos();

    // Show first memory immediately
    currentIndex = 0;
    showMemory(currentIndex);

    // Wait before starting autoplay
    setTimeout(() => {

        startAutoPlay();

    }, 6000); // same duration as one memory

});

/*=========================================
        RESPONSIVE REPOSITION
=========================================*/

window.addEventListener("resize", () => {

    positionPhotos();

});

/*=========================================
        CINEMATIC ENHANCEMENTS
=========================================*/

/*
    Append this below Part 3A
*/

/*=========================================
        EXTRA VARIABLES
=========================================*/

let currentRotation = 0;

const centerMemory = document.querySelector(".centerMemory");

/*=========================================
        CAMERA FLASH
=========================================*/

const flash = document.createElement("div");

flash.id = "cameraFlash";

flash.style.position = "fixed";
flash.style.inset = "0";
flash.style.background = "#fff";
flash.style.opacity = "0";
flash.style.pointerEvents = "none";
flash.style.zIndex = "99999";
flash.style.transition = "opacity .35s ease";

document.body.appendChild(flash);

function triggerFlash(){

    flash.style.opacity = ".95";

    setTimeout(()=>{

        flash.style.opacity="0";

    },120);

}

/*=========================================
        RING ROTATION
=========================================*/

function rotateRingTo(index){

    const angle = 360 / memories.length;

    currentRotation = -(index * angle);

    ring.style.transition = "transform 1.3s cubic-bezier(.22,.61,.36,1)";

    ring.style.transform =
    `translate(-50%,-50%) rotate(${currentRotation}deg)`;

}

/*=========================================
        KEEP PHOTOS UPRIGHT
=========================================*/

function straightenPhotos(){

    pics.forEach((pic)=>{

        pic.style.transform =
        `rotate(${-currentRotation}deg)`;

    });

}

/*=========================================
        ACTIVE MEMORY GLOW
=========================================*/

function highlightActiveMemory(){

    pics.forEach((pic)=>{

        pic.classList.remove("activeMemory");

        pic.style.boxShadow =
        "0 0 12px rgba(255,255,255,.2)";

        pic.style.filter="brightness(.75)";

        pic.style.zIndex="5";

    });

    const active = pics[currentIndex];

    active.classList.add("activeMemory");

    active.style.filter="brightness(1)";

    active.style.zIndex="50";

    active.style.boxShadow=
    `
    0 0 25px #ff9ec7,
    0 0 60px hotpink,
    0 0 120px deeppink
    `;

}

/*=========================================
        CINEMATIC IMAGE TRANSITION
=========================================*/

function animateCenterImage(){

    centerMemory.animate([

        {

            transform:
            "translate(-50%,-50%) scale(.88)",

            opacity:.2

        },

        {

            transform:
            "translate(-50%,-50%) scale(1.08)",

            opacity:1

        },

        {

            transform:
            "translate(-50%,-50%) scale(1)",

            opacity:1

        }

    ],{

        duration:900,

        easing:"ease"

    });

}

/*=========================================
        CAPTION ANIMATION
=========================================*/

function animateCaption(){

    memoryTitle.animate([

        {

            opacity:0,

            transform:"translateY(25px)"

        },

        {

            opacity:1,

            transform:"translateY(0)"

        }

    ],{

        duration:700

    });

    memoryCaption.animate([

        {

            opacity:0,

            transform:"translateY(30px)"

        },

        {

            opacity:1,

            transform:"translateY(0)"

        }

    ],{

        duration:850

    });

}

/*=========================================
        SPARKLE BURST
=========================================*/
/*=========================================
        MAGIC SPARKLE BURST
=========================================*/

function sparkleBurst() {

    const rect = centerMemory.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 45; i++) {

        const sparkle = document.createElement("div");

        sparkle.style.position = "fixed";

        const size = Math.random() * 6 + 3;

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        sparkle.style.borderRadius = "50%";

        const colors = [
            "#ffffff",
            "#ffd7f0",
            "#ffc0cb",
            "#ffe9fa",
            "#fff7c2"
        ];

        sparkle.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        sparkle.style.boxShadow =
            `0 0 ${size * 4}px ${sparkle.style.background}`;

        sparkle.style.left = centerX + "px";
        sparkle.style.top = centerY + "px";

        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "9999";

        document.body.appendChild(sparkle);

        const angle = Math.random() * Math.PI * 2;

        const distance = 120 + Math.random() * 180;

        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        sparkle.animate(

            [

                {
                    transform: "translate(0,0) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${dx}px, ${dy}px) scale(0)`,
                    opacity: 0
                }

            ],

            {

                duration: 1200 + Math.random() * 700,

                easing: "cubic-bezier(.2,.8,.2,1)",

                fill: "forwards"

            }

        );

        setTimeout(() => {

            sparkle.remove();

        }, 2200);

    }

}

/*=========================================
        PETAL BURST
=========================================*/

/*=========================================
        WHOOSH SOUND
=========================================*/

function playWhoosh(){

    if(!whooshSound) return;

    whooshSound.currentTime=0;

    whooshSound.play().catch(()=>{});

}

/*=========================================
        MASTER CINEMATIC UPDATE
=========================================*/

function cinematicUpdate(){

    triggerFlash();

    playWhoosh();

    rotateRingTo(currentIndex);

    straightenPhotos();

    highlightActiveMemory();

    animateCenterImage();

    animateCaption();

    sparkleBurst();


}

/*=========================================
        OVERRIDE showMemory()
=========================================*/

const oldShowMemory = showMemory;

showMemory = function(index){

    oldShowMemory(index);

    cinematicUpdate();

};

/*=========================================
        PART 3B-2
        FINAL SEQUENCE
=========================================*/

/*=========================================
        PROGRESS RING
=========================================*/

const progressRing = document.createElement("div");

progressRing.id = "progressRing";

progressRing.style.position = "absolute";
progressRing.style.left = "50%";
progressRing.style.top = "48%";
progressRing.style.width = "470px";
progressRing.style.height = "580px";
progressRing.style.borderRadius = "35px";
progressRing.style.transform = "translate(-50%,-50%)";
progressRing.style.pointerEvents = "none";
progressRing.style.zIndex = "9";

progressRing.style.background =
"conic-gradient(#ff8fb3 0deg,#ff8fb3 0deg,transparent 0deg)";

document.getElementById("memorySection").appendChild(progressRing);

/*=========================================
        PROGRESS ANIMATION
=========================================*/

let progressValue = 0;

setInterval(() => {

    progressValue += 1;

    if(progressValue > 360){

        progressValue = 0;

    }

    progressRing.style.background =
    `conic-gradient(
        #ff8fb3 ${progressValue}deg,
        rgba(255,255,255,.08) ${progressValue}deg
    )`;

},16);

/*=========================================
        RESET PROGRESS
=========================================*/

const oldNextMemory = nextMemory;

nextMemory = function(){

    progressValue = 0;

    oldNextMemory();

};

/*=========================================
        FLOATING EFFECT
=========================================*/

setInterval(()=>{

    centerMemory.animate([

        {

            transform:
            "translate(-50%,-50%)"

        },

        {

            transform:
            "translate(-50%,-55%)"

        },

        {

            transform:
            "translate(-50%,-50%)"

        }

    ],{

        duration:4000,

        easing:"ease-in-out"

    });

},4000);

/*=========================================
        MASSIVE SPARKLE EXPLOSION
=========================================*/

function grandFinale(){

    for(let i=0;i<250;i++){

        const star=document.createElement("div");

        star.className="sparkle";

        star.style.left=(window.innerWidth/2)+"px";

        star.style.top=(window.innerHeight/2)+"px";

        star.style.animationDuration=
        (.8+Math.random()*2)+"s";

        star.style.transform=
        `translate(
        ${(Math.random()-.5)*1200}px,
        ${(Math.random()-.5)*800}px
        )`;

        document.body.appendChild(star);

        setTimeout(()=>{

            star.remove();

        },3000);

    }

}

/*=========================================
        END SCREEN
=========================================*/

function showEnding(){

    stopAutoPlay();

    grandFinale();

    const ending=document.createElement("div");

    ending.id="endingScreen";

    ending.style.position="fixed";
    ending.style.inset="0";
    ending.style.background=
    "rgba(5,8,20,.95)";
    ending.style.display="flex";
    ending.style.flexDirection="column";
    ending.style.justifyContent="center";
    ending.style.alignItems="center";
    ending.style.zIndex="999999";
    ending.style.opacity="0";
    ending.style.transition="2s";

    ending.innerHTML=`

<h1 style="
font-size:55px;
font-family:Caveat,cursive;
margin-bottom:30px;
color:white;">

Every memory led me to you ❤️

</h1>

<p style="
width:70%;
text-align:center;
font-size:22px;
line-height:2;">

Every smile.....

Every laugh.....

Every tiny moment.....

Every picture.....

became another reason for me to love you even more.

Thank you for becoming my favourite memory and I am so lucky to have you.

Happy 18th Birthday my dear hubby❤️

</p>

`;

    document.body.appendChild(ending);

    requestAnimationFrame(()=>{

        ending.style.opacity="1";

    });


}

/*=========================================
        DETECT LAST MEMORY
=========================================*/

const originalShowMemory = showMemory;

showMemory = function(index){

    originalShowMemory(index);

    if(index === memories.length-1){

        setTimeout(()=>{

            showEnding();

        },7000);

    }

};

/*=========================================
        OPTIONAL DOUBLE CLICK TO END
=========================================*/

mainImage.addEventListener("dblclick",()=>{

    showEnding();

});