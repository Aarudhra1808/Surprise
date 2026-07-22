const gifts = document.querySelectorAll(".gift-box");

let openedGifts =
JSON.parse(localStorage.getItem("openedGifts")) || [];

// Reset only if all gifts were opened
if (openedGifts.length >= 3) {
    localStorage.removeItem("openedGifts");
    openedGifts = [];
}

let destinationPage = "";


// Loop through every gift
gifts.forEach((gift) => {

    gift.addEventListener("click", () => {

        // Ignore if already clicked
       const giftID = gift.dataset.id;

        if(openedGifts.includes(giftID)) return;

        // Save page to redirect later
        destinationPage = gift.dataset.page;

        // Disable pointer events
        gift.style.pointerEvents = "none";

        // Fade the other gifts
        gifts.forEach(box => {

            if(box !== gift){

                box.style.transition = "0.8s";

                box.style.opacity = "0.35";

                box.style.transform = "scale(0.9)";

            }

        });

        // Highlight selected gift
        gift.classList.add("selectedGift");

        // Begin opening animation
        startGiftOpening(gift);

    });

});



/*=========================================
        OPENING ANIMATION
=========================================*/

function startGiftOpening(gift){

    // Stop bouncing
    gift.style.animation = "none";

    // Bring to front
    gift.style.zIndex = "999";

    // Small jump
    gift.animate(

        [

            {
                transform:"translateY(0px) scale(1)"
            },

            {
                transform:"translateY(-20px) scale(1.05)"
            },

            {
                transform:"translateY(0px) scale(1)"
            }

        ],

        {

            duration:450,

            easing:"ease"

        }

    );

    // Shake after jump
    setTimeout(() => {

        shakeGift(gift);

    },450);

}



/*=========================================
            SHAKE EFFECT
=========================================*/

function shakeGift(gift){

    gift.animate(

        [

            {transform:"rotate(0deg)"},

            {transform:"rotate(-5deg)"},

            {transform:"rotate(5deg)"},

            {transform:"rotate(-5deg)"},

            {transform:"rotate(5deg)"},

            {transform:"rotate(0deg)"}

        ],

        {

            duration:450,

            iterations:1

        }

    );

    // Continue in Part 3B
    setTimeout(()=>{

        openGift(gift);

    },450);

}


function openGift(gift){

    const lid = gift.querySelector(".gift-lid");
    const box = gift.querySelector(".gift-base");

    // Open lid
    if(lid){

        lid.style.transition = "0.8s ease";

        lid.style.transform =
            "translateY(-120px) rotate(-18deg)";
    }

    // Little pop effect
    gift.animate(

        [

            {transform:"scale(1)"},

            {transform:"scale(1.08)"},

            {transform:"scale(1)"}

        ],

        {

            duration:500

        }

    );

    // Sparkles
    createSparkles(gift);

    // Confetti
    createConfetti();

    const giftID = gift.dataset.id;

// Prevent duplicates
if(!openedGifts.includes(giftID)){
    openedGifts.push(giftID);
}

localStorage.setItem(
    "openedGifts",
    JSON.stringify(openedGifts)
);

// If all gifts are opened, reset progress
if(openedGifts.length === gifts.length){

    setTimeout(() => {

        localStorage.removeItem("openedGifts");

    }, 1600);

}

    // Fade gift away
    setTimeout(()=>{

        gift.style.transition="0.8s";

        gift.style.opacity="0";

        gift.style.transform="scale(1.3)";

    },900);

    // Proceed
    setTimeout(()=>{

        proceedNext(gift);

    },1700);

}

/*=========================================
            SPARKLES
=========================================*/

function createSparkles(gift){

    const rect = gift.getBoundingClientRect();

    for(let i=0;i<30;i++){

        const star=document.createElement("div");

        star.className="giftSparkle";

        star.style.left=(rect.left+rect.width/2)+"px";

        star.style.top=(rect.top+rect.height/2)+"px";

        star.style.setProperty("--x",
            (Math.random()-0.5)*260+"px");

        star.style.setProperty("--y",
            (Math.random()-0.5)*260+"px");

        document.body.appendChild(star);

        setTimeout(()=>{

            star.remove();

        },1200);

    }

}

/*=========================================
            CONFETTI
=========================================*/

function createConfetti(){

    const colors=[

        "#ff4d6d",
        "#ffd166",
        "#4ecdc4",
        "#5b8cff",
        "#ffffff",
        "#ff99cc"

    ];

    for(let i=0;i<100;i++){

        const piece=document.createElement("div");

        piece.className="giftConfetti";

        piece.style.left=Math.random()*100+"vw";

        piece.style.background=
            colors[Math.floor(Math.random()*colors.length)];

        piece.style.animationDuration=
            (2+Math.random()*2)+"s";

        piece.style.transform=
            "rotate("+Math.random()*360+"deg)";

        document.body.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },4000);

    }

}

function proceedNext(gift){

    // If all gifts have been opened,
    // reset progress for the next visit.
    if(openedGifts.length >= gifts.length){

        localStorage.removeItem("openedGifts");

    }

    if(destinationPage){

        window.location.href = destinationPage;

    }

}