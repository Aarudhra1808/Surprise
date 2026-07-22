const typing = document.getElementById("typing");

const yesBtn = document.getElementById("enterBtn");
const noBtn = document.getElementById("noBtn");

let i = 0;


const stars = document.getElementById("stars");

for(let i = 0; i < 400; i++){

    const star = document.createElement("div");

    star.classList.add("star");

    // Position
    star.style.left = Math.random()*100 + "vw";
    star.style.top = Math.random()*100 + "vh";

    // ⭐ Random size
    const size = Math.random()*3 + 1;

    star.style.width = size + "px";
    star.style.height = size + "px";

    // ⭐ Random brightness
    star.style.opacity = Math.random();

    // ⭐ Random animation
    star.style.animationDelay = Math.random()*5 + "s";
    star.style.animationDuration = (2 + Math.random()*5) + "s";

    stars.appendChild(star);

    const colors = [

        "#ffffff",
        
        "#fff8dc",
        
        "#dbe9ff",
        
        "#f8f8ff"
        
        ];
        
        star.style.background =
        
        colors[Math.floor(Math.random()*colors.length)];

}

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");

const texts = [

"For the one who means the world to me...",

"I have made something... just for you.",

"Will you continue?"

];

function typeLine(element,text,speed,callback){

let i=0;

element.style.opacity=1;

function type(){

if(i<text.length){

element.innerHTML+=text.charAt(i);

i++;

setTimeout(type,speed);

}else{

if(callback) callback();

}

}

type();

}

setTimeout(()=>{

typeLine(line1,texts[0],45,()=>{

typeLine(line2,texts[1],40,()=>{

typeLine(line3,texts[2],35,()=>{

document.querySelector(".choice-buttons").style.opacity = 1;

});

});

});

},2000);

yesBtn.onclick = () => {

    document.getElementById("moon").classList.add("zoom");

    setTimeout(()=>{
        window.location.href="unlock.html";
    },1500);

};

const buttonBox = document.querySelector(".choice-buttons");

let attempts = 0;

let currentX = 0;
let currentY = 0;

let canMove = true;
let escaped = false;

const messages = [

    "Nice try 😂",
    "Nope 😜",
    "Catch me 😎",
    "Really 💀",
    "Almost 😭",
    "Try again 😏"

];

function moveButton(){

    if(!canMove || escaped) return;

    escaped = true;
    canMove = false;

    attempts++;

    // Show messages one by one
    noBtn.innerHTML =
        attempts <= 6
        ? messages[attempts-1]
        : "Fine 🥺";

    // After the 7th escape
    if(attempts >= 7){

        noBtn.style.transform = "translate(0,0)";

        noBtn.onclick = ()=>{

            document.body.classList.add("sad");

                setTimeout(()=>{
                location.href="no.html";
                },1000);


        };

        return;
    }

    // Current button position
const rect = noBtn.getBoundingClientRect();

const margin = 20;

// Generate a safe position inside viewport
const targetLeft =
    margin +
    Math.random() *
    (window.innerWidth - rect.width - margin * 2);

const targetTop =
    margin +
    Math.random() *
    (window.innerHeight - rect.height - margin * 2);

// Calculate translation needed
currentX += targetLeft - rect.left;
currentY += targetTop - rect.top;

// Apply translation
noBtn.style.transform =
    `translate(${currentX}px, ${currentY}px)`;

    // Wait 1 second before it can move again
    setTimeout(()=>{

        canMove = true;

    },1000);

}

document.addEventListener("mousemove",(e)=>{

    if(attempts >= 7) return;

    const rect = noBtn.getBoundingClientRect();

    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;

    const dist = Math.hypot(

        e.clientX-cx,
        e.clientY-cy

    );

    // Escape only when cursor gets close
    if(dist < 120){

        moveButton();

    }

    // Reset only after cursor moves away
    if(dist > 250){

        escaped = false;

    }

});

const star = document.querySelector(".shooting-star");

function randomStar(){

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Random starting position
    const x = Math.random()*vw;
    const y = Math.random()*vh*0.6;

    // Random direction (0° - 360°)
    const angle = Math.random()*360;

    // Random distance
    const distance = 300 + Math.random()*400;

    // Random duration
    const duration = 800 + Math.random()*700;

    star.style.transition = "none";
    star.style.opacity = "1";

    star.style.left = x + "px";
    star.style.top = y + "px";

    star.style.transform =
        `translate(0px,0px) rotate(${angle}deg)`;

    requestAnimationFrame(()=>{

        star.style.transition =
        `transform ${duration}ms linear, opacity ${duration}ms`;

        const dx =
            Math.cos(angle*Math.PI/180)*distance;

        const dy =
            Math.sin(angle*Math.PI/180)*distance;

        star.style.transform =
            `translate(${dx}px,${dy}px) rotate(${angle}deg)`;

        star.style.opacity="0";
    });

    // Random delay before next star
    setTimeout(
        randomStar,
        2000 + Math.random()*5000
    );
}

randomStar();

