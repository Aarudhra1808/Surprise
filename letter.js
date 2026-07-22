let blossomCount = 0;

const MAX_BLOSSOMS = 3500;
let branchCount = 0;

const MAX_BRANCHES = 70;
const envelope = document.getElementById("envelope");

const flap = document.querySelector(".flap");

const seal = document.querySelector(".seal");

const letter = document.getElementById("letter");

const continueBtn = document.getElementById("continueBtn");

const openAudio = document.getElementById("openAudio");

const magicAudio = document.getElementById("magicAudio");

const windAudio = document.getElementById("windAudio");

const magicLayer = document.getElementById("magicLayer");

const BLOOM_COLORS=[

"#ff2e88",
"#ff5fa7",
"#ff7dc1",
"#ffb5d8",
"#ffd6ea",

"#ffd36b",

"#f9ff9d",

"#7ef9ff",

"#8db5ff",

"#c89dff",

"#f08dff",

"#ffffff"

];


let opened = false;

let animationFinished = false;


envelope.addEventListener("click", () => {

    if(opened) return;

    opened = true;


    const clickText = document.querySelector(".click-text");

    if(clickText){
        clickText.style.opacity = "0";
    }


    startSequence();

});


function startSequence(){

    playOpenSound();

    glowSeal();

    setTimeout(() => {

        breakSeal();

    },500);

    setTimeout(() => {

        openFlap();

    },900);

    setTimeout(() => {

        slideLetter();

    },1450);

}

function playOpenSound(){

    if(openAudio){

        openAudio.currentTime = 0;

        openAudio.play().catch(()=>{});

    }

}


function glowSeal(){

    seal.animate(

        [

            {

                transform:"translateX(-50%) scale(1)",

                filter:"drop-shadow(0 0 0px gold)"

            },

            {

                transform:"translateX(-50%) scale(1.18)",

                filter:"drop-shadow(0 0 18px gold)"

            },

            {

                transform:"translateX(-50%) scale(1)"

            }

        ],

        {

            duration:500,

            easing:"ease-out"

        }

    );

}

function breakSeal(){

    seal.animate(

        [

            {

                transform:"translateX(-50%) scale(1)",

                opacity:1

            },

            {

                transform:"translateX(-50%) scale(0)",

                opacity:0

            }

        ],

        {

            duration:400,

            fill:"forwards",

            easing:"ease-in"

        }

    );

}


function openFlap(){

    envelope.classList.add("open");

}


function slideLetter() {
    envelope.classList.add("open");

    createMagicSparkles();

    setTimeout(() => {
        startTreeSequence();
    }, 900);
}

function createMagicSparkles(){

    for(let i=0;i<40;i++){

        const spark=document.createElement("div");

        spark.className="magic";

        spark.style.left=

            (window.innerWidth/2 + Math.random()*180-90)+"px";

        spark.style.top=

            (window.innerHeight*0.63 + Math.random()*120-60)+"px";

        spark.style.animationDelay=

            Math.random()*0.8+"s";

        spark.style.animationDuration=

            1.2+Math.random()+"s";

        magicLayer.appendChild(spark);

        setTimeout(()=>{

            spark.remove();

        },2500);

    }

}


const leftTree = document.getElementById("leftTree");
const rightTree = document.getElementById("rightTree");


const SVG_NS = "http://www.w3.org/2000/svg";


const TREE = {
    trunkLength:180,
    branchAngle:26,
    shrink:0.74,
    minLength:42,
    stroke:8
};

function growTree(
    

    svg,

    x,

    y,

    angle,

    length,

    direction

){

    if(branchCount >= MAX_BRANCHES)
    return;

branchCount++;

    if(length<TREE.minLength){

        if(Math.random()>0.45){

    createLeafBurst(svg,x,y);

}

        return;

    }



    const rad=angle*Math.PI/180;



    const x2=x+

    Math.cos(rad)*length;



    const y2=y+

    Math.sin(rad)*length;



    drawBranch(

        svg,

        x,

        y,

        x2,

        y2,

        length

    );



    setTimeout(()=>{

        growTree(

            svg,

            x2,

            y2,

            angle-TREE.branchAngle,

            length*TREE.shrink,

            direction

        );



        growTree(

            svg,

            x2,

            y2,

            angle+TREE.branchAngle,

            length*TREE.shrink,

            direction

        );

                if(length < 30){

    createLeafBurst(svg, x2, y2);

    decorateBranch(svg, x1, y1, x2, y2);

    return;

}






    },180);

}

function drawBranch(

    svg,

    x1,

    y1,

    x2,

    y2,

    length

){

    const path=document.createElementNS(

        SVG_NS,

        "path"

    );



    const cx=(x1+x2)/2+

        (Math.random()*40-20);



    const cy=(y1+y2)/2+

        (Math.random()*40-20);



    path.setAttribute(

        "d",

        `M ${x1} ${y1}
         Q ${cx} ${cy}
         ${x2} ${y2}`

    );



    path.setAttribute(

        "stroke-width",

        Math.max(

            1.3,

            length/24

        )

    );



    const total=250;



    path.style.strokeDasharray=total;

    path.style.strokeDashoffset=total;



    svg.appendChild(path);



    requestAnimationFrame(()=>{

        path.classList.add("draw");

    });

    if(length < 90){

    setTimeout(()=>{

        decorateBranch(
            svg,
            x1,
            y1,
            x2,
            y2
        );

    },300);

}

}

function growHeartCurve(

    svg,

    x,

    y,

    direction

){

    const branch=document.createElementNS(

        SVG_NS,

        "path"

    );



    const endX=

        direction===-1

        ?300

        :300;



    const endY=180;



    const controlX=

        direction===-1

        ?x+120

        :x-120;



    const controlY=

        y-80;



    branch.setAttribute(

        "d",

        `M ${x} ${y}
         Q ${controlX} ${controlY}
         ${endX} ${endY}`

    );



    branch.setAttribute(

        "stroke-width",

        "4"

    );



    const total=400;



    branch.style.strokeDasharray=total;

    branch.style.strokeDashoffset=total;



    svg.appendChild(branch);



    requestAnimationFrame(()=>{

        branch.classList.add("draw");

    });

}

function startTreeSequence(){

    magicAudio.volume=.35;

    magicAudio.play().catch(()=>{});

    windAudio.volume=.25;

    windAudio.play().catch(()=>{});

    growTree(

        leftTree,

        120,

        650,

        -70,

        TREE.trunkLength,

        -1

    );



    growTree(

        rightTree,

        480,

        650,

        -110,

        TREE.trunkLength,

        1

    );



    setTimeout(()=>{

        showContinueButton();

    },7000);

}

function createLeafBurst(svg,x,y){
const amount = 70 + Math.floor(Math.random() * 20);
    

    for(let i=0;i<amount;i++){

        createBloom(svg,x,y);

    }

}

function createBloom(svg,x,y){

    if(blossomCount >= MAX_BLOSSOMS)
    return;

blossomCount++;

    const leaf=document.createElementNS(SVG_NS,"ellipse");

    const angle =
    Math.random()*Math.PI;

const radius =
20 + Math.random()*45;
const lx =
    x + Math.cos(angle)*radius;

const ly =
    y - Math.abs(Math.sin(angle))*radius;

    leaf.setAttribute("cx",lx);

    leaf.setAttribute("cy",ly);

    leaf.setAttribute(
    "rx",
    13 + Math.random()*8
);

leaf.setAttribute(
    "ry",
    20 + Math.random()*10
);

    leaf.setAttribute(
        "fill",
        BLOOM_COLORS[
            Math.floor(Math.random()*BLOOM_COLORS.length)
        ]
    );

    leaf.setAttribute(
        "transform",
        `rotate(${Math.random()*360} ${lx} ${ly})`
    );

    leaf.style.opacity="0";

    leaf.style.filter =
"drop-shadow(0 0 5px rgba(255,170,220,.9))";

    svg.appendChild(leaf);

    leaf.animate(

        [

            {
                transform:`scale(.1)`,
                opacity:0
            },

            {
                transform:`scale(1.25)`,
                opacity:1,
                offset:.65
            },

            {
                transform:`scale(1)`,
                opacity:1
            }

        ],

        {

            duration:700+Math.random()*500,

            delay:Math.random()*400,

            easing:"ease-out",

            fill:"forwards"

        }

    );

}

function decorateBranch(svg,x1,y1,x2,y2){

    const amount=30;

    for(let i=0;i<amount;i++){

        const t=Math.random();

        const px=x1+(x2-x1)*t;

        const py=y1+(y2-y1)*t;

        createBloom(svg,px,py);

    }

}

