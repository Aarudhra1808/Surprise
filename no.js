// ---------- Stars ----------

const stars = document.getElementById("stars");

for(let i=0;i<350;i++){

    const star=document.createElement("div");

    star.className="star";

    star.style.left=Math.random()*100+"vw";
    star.style.top=Math.random()*100+"vh";

    const size=Math.random()*2+1;

    star.style.width=size+"px";
    star.style.height=size+"px";

    star.style.opacity=Math.random()*0.4;

    star.style.animationDelay=Math.random()*5+"s";

    stars.appendChild(star);
}


// ---------- Typing ----------

const line1=document.getElementById("line1");
const line2=document.getElementById("line2");
const line3=document.getElementById("line3");
const line4=document.getElementById("line4");
const line5=document.getElementById("line5");

const texts=[

"You actually clicked No... 😔",

"Even after the button ran away seven times? 😭",

"I spent soooo much time making this...",


"Will you please reconsider? 🥺"

];

function type(element,text,speed,callback){

    let i=0;

    function write(){

        if(i<text.length){

            element.innerHTML+=text.charAt(i);

            i++;

            setTimeout(write,speed);

        }

        else if(callback){

            callback();

        }

    }

    write();

}


type(line1,texts[0],40,()=>{

type(line2,texts[1],35,()=>{

type(line3,texts[2],35,()=>{

type(line4,texts[3],40,()=>{

document.querySelector(".buttons").style.opacity=1;

});

});

});

});


// ---------- Buttons ----------

const yes=document.getElementById("yesBtn");
const no=document.getElementById("noBtn");

yes.onclick=()=>{

    moon.classList.add("bright");

    setTimeout(() => {

        moon.classList.add("zoom");

    }, 800);

    setTimeout(() => {

        window.location.href = "unlock.html";

    }, 2600);

};


no.onclick=()=>{

    line5.innerHTML="That's it 😤 No more choices.";

    no.classList.add("fadeAway");

    setTimeout(()=>{

        no.style.display="none";

    },600);

};