/*==================================================
                MELODY JAR
              PART 1 - CONSTANTS
==================================================*/

"use strict";

/*==================================================
                    DOM ELEMENTS
==================================================*/

// ---------- Main ----------
const body = document.body;
const background = document.querySelector(".background");
const jar = document.querySelector(".melody-jar");
const jarGlow = document.querySelector(".jar-glow");

// ---------- Music Notes ----------
const notes = [...document.querySelectorAll(".music-note")];
// ---------- Player ----------
const playerPanel = document.getElementById("playerPanel");
const playerCard = document.querySelector(".player-card");

const audioPlayer = document.getElementById("audioPlayer");

const albumImage = document.getElementById("albumImage");

const songTitle = document.getElementById("songTitle");
const songMessage = document.getElementById("songMessage");

const playPauseBtn = document.getElementById("playPauseBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");

const currentTimeLabel =
document.getElementById("currentTimeLabel");

const durationLabel =
document.getElementById("durationLabel");

const backButton =
document.getElementById("backButton");

// ---------- Finale ----------
const finalMessage =
document.querySelector(".final-message");

const continueButton =
document.getElementById("continueButton");


/*==================================================
                APPLICATION STATE
==================================================*/

const App = {

    currentSong : 0,

    playing : false,


    finalSequencePlayed : false,

    activeNote : null,

    initialized : false

};


/*==================================================
            USER PROGRESS
==================================================*/

const listenedSongs = new Set();


/*==================================================
                CONFIGURATION
==================================================*/

const CONFIG = {

    petals : {

        interval : 750,

        lifetime : 10000

    },

    sparkles : {

        interval : 250,

        lifetime : 3200

    },

    jar : {

        breatheDuration : 3500,

        floatAmount : 5

    },

    note : {

        flyDuration : 900,

        returnDuration : 800

    },

    player : {

        openDuration : 650,

        closeDuration : 450

    }

};


/*==================================================
                COLORS
==================================================*/

const BLOOM_COLORS = [

"#ff4f9f",
"#ff74b8",
"#ff97d2",
"#ffc0dc",
"#ffd0ea",
"#ffe6f4",
"#ff9f80",
"#ffca57",
"#f8ff8d",
"#8df7ff",
"#72d6ff",
"#c89dff",
"#d86dff"

];


/*==================================================
            GLOBAL TIMERS
==================================================*/

const Timers = {

    petals : null,

    sparkles : null,

    breathing : null,

    notePulse : null,

};


/*==================================================
            INITIALIZATION
==================================================*/

function initializeMelodyJar(){

    if(App.initialized)
        return;

    App.initialized = true;

    console.clear();

    console.log(
        "%c🎵 Melody Jar Initialized",
        "color:#ff66b3;font-size:16px;font-weight:bold;"
    );

}


/*==================================================
            START APPLICATION
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeMelodyJar();

});
/*==================================================
                MELODY JAR
              PART 2 - SONG DATABASE
==================================================*/

/*
----------------------------------------------------
    SONG DATABASE

    Replace these values later with your own:

    • title
    • duration
    • audio
    • cover
    • message

----------------------------------------------------
*/

const SONGS = [

{
    id:1,
    title:"Perfect",
    artist:"Performed by Loki ❤️",
    duration:"01:35",
    audio:"perfect.mp4",
    cover:"perfect.jpg",
    message:"This was the song that played in my mind when I saw you on farewell in that navy blue suit."
},

{
    id:2,
    title:"Until I Found You",
    artist:"Performed by Loki ❤️",
    duration:"00:57",
    audio:"untilifoundyou.mp4",
    cover:"untilifoundyou.jpeg",
    message:"This song is really true."
},

{
    id:3,
    title:"Dandelions",
    artist:"Performed by Loki ❤️",
    duration:"02:30",
    audio:"dandelions.mp4",
    cover:"dandelions.jpeg",
    message:"Every lyric reminds me of you."
},

{
    id:4,
    title:"I think they call this love",
    artist:"Performed by Loki ❤️",
    duration:"00:32",
    audio:"ithinktheycallthislove.mp4",
    cover:"ithinktheycallthislove.jpeg",
    message:"A tiny melody made with lots of love."
},

{
    id:5,
    title:"Neethane Neethane",
    artist:"Performed by Loki ❤️",
    duration:"00:53",
    audio:"neethane.mp4",
    cover:"neethane.jpeg",
    message:"This song is my favourite one and only you know this now and this is for you."
},

{
    id:6,
    title:"Those eyes",
    artist:"Performed by Loki ❤️",
    duration:"01:22",
    audio:"thoseeyes.mp4",
    cover:"thoseeyes.jpeg",
    message:"Hope you're still smiling."
},

{
    id:7,
    title:"Jhol",
    artist:"Performed by Loki ❤️",
    duration:"01:31",
    audio:"jhol.mp4",
    cover:"jhol.jpeg",
    message:"Here is your favourite song. Enjoy."
},

{
    id:8,
    title:"Wanna be yours",
    artist:"Performed by Loki ❤️",
    duration:"01:19",
    audio:"wannabeyours.mp4",
    cover:"wannabeyours.png",
    message:"You may have heard it alot of times but this one is made with love just for you."
},

{
    id:9,
    title:"Love me like you do",
    artist:"Performed by Loki ❤️",
    duration:"02:40",
    audio:"lovemelikeyoudo.mp4",
    cover:"lovemelikeyoudo.jpg",
    message:"This one is just for you."
},

{
    id:10,
    title:"Oorum blood",
    artist:"Performed by Loki ❤️",
    duration:"00:53",
    audio:"orumblood.mp4",
    cover:"orumblood.jpeg",
    message:"You're worth every second of this."
},

{
    id:11,
    title:"Alone part-2",
    artist:"Performed by Loki ❤️",
    duration:"00:55",
    audio:"alonepart2.mp4",
    cover:"alonepart2.jpeg",
    message:"Just a song from my heart."
},

{
    id:12,
    title:"Kaadhal en kaviye",
    artist:"Performed by Loki ❤️",
    duration:"01:07",
    audio:"kaadhalenkaviye.mp4",
    cover:"kaadhalenkaviye.jpg",
    message:"Tried singing tamil song I hope its good."
},

{
    id:13,
    title:"Oh penne",
    artist:"Performed by Loki ❤️",
    duration:"01:21",
    audio:"Oh penne.mp3",
    cover:"ohpenne.jpg",
    message:"I hope you are loving it."
},

{
    id:14,
    title:"Unnai Engo",
    artist:"Performed by Loki ❤️",
    duration:"01:53",
    audio:"Unnai engo.mp3",
    cover:"unnaiengo.jpg",
    message:"I really wanted to sing this song for you from a very long time ago"
},

{
    id:15,
    title:"A Thousand years",
    artist:"Performed by Loki ❤️",
    duration:"01:21",
    audio:"Thousand years.mp3",
    cover:"thousandyears.jpeg",
    message:"Not just thousand years, I love you for eternity."
},

{
    id:16,
    title:"Kadhaippoma",
    artist:"Performed by Loki ❤️",
    duration:"01:16",
    audio:"Kadhaippoma.mp3",
    cover:"kadhaippoma.jpg",
    message:"Actually this para is like just made for you tha. Cause you are the diamond that I got in my life."
},

{
    id:17,
    title:"Cars Outside",
    artist:"Performed by Loki ❤️",
    duration:"00:45",
    audio:"carsoutside.mp4",
    cover:"carsoutside.jpg",
    message:"This sound has become my favourite and I play it in loop everyday."
},

{
    
    id:18,
    title:"Aradhya",
    artist:"Performed by Loki ❤️",
    duration:"01:09",
    audio:"Aradhya.mp3",
    cover:"aradhya.jpg",
    message:"This song is my favourite and I want to sing this to you in person and I will soon. ❤️"
}


];


/*==================================================
            HELPER FUNCTIONS
==================================================*/

/*--------------------------------------
    Get Song by Index
--------------------------------------*/

function getSong(index){

    return SONGS[index];

}


/*--------------------------------------
    Total Songs
--------------------------------------*/

function totalSongs(){

    return SONGS.length;

}


/*--------------------------------------
    Is Final Song?
--------------------------------------*/



/*--------------------------------------
    Random Song
--------------------------------------*/

function randomSong(){

    return Math.floor(
        Math.random() * SONGS.length
    );

}

/*==================================================
            MELODY JAR
      PART 3 - BACKGROUND ENGINE
==================================================*/


/*=========================================
            BACKGROUND ENGINE
=========================================*/

const BackgroundEngine = {

    running:false,

    petalTimer:null,

    sparkleTimer:null,

    fireflyTimer:null,

    noteTimer:null

};


/*=========================================
        START BACKGROUND
=========================================*/

function startBackground(){

    if(BackgroundEngine.running)
        return;

    BackgroundEngine.running = true;

    startPetals();

    startSparkles();

    startFireflies();

    startFloatingNotes();

}


/*=========================================
        STOP BACKGROUND
=========================================*/

function stopBackground(){

    BackgroundEngine.running = false;

    clearInterval(BackgroundEngine.petalTimer);

    clearInterval(BackgroundEngine.sparkleTimer);

    clearInterval(BackgroundEngine.fireflyTimer);

    clearInterval(BackgroundEngine.noteTimer);

}


/*=========================================
            PETALS
=========================================*/

function startPetals(){

    BackgroundEngine.petalTimer =

    setInterval(createPetal,
        CONFIG.petals.interval);

}


function createPetal(){

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.style.left = Math.random()*100 + "vw";

    /* Start ABOVE the screen */
    petal.style.top = "-40px";

    petal.style.animationDuration =
        (8 + Math.random()*5) + "s";

    petal.style.animationDelay =
        Math.random()*2 + "s";

    petal.style.opacity =
        0.5 + Math.random()*0.5;

    petal.style.transform =
        `scale(${0.5 + Math.random()*0.8})`;

    body.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },13000);

}

/*=========================================
            SPARKLES
=========================================*/

function startSparkles(){

    BackgroundEngine.sparkleTimer=

    setInterval(createSparkle,
        CONFIG.sparkles.interval);

}


function createSparkle(){

    const sparkle=document.createElement("div");

    sparkle.className="sparkle";

    sparkle.style.left=
        Math.random()*100+"vw";

    sparkle.style.top=
        Math.random()*100+"vh";

    const size=
        2+Math.random()*5;

    sparkle.style.width=size+"px";

    sparkle.style.height=size+"px";

    sparkle.style.animationDuration=
        (1+Math.random()*2)+"s";

    body.appendChild(sparkle);

    setTimeout(()=>{

        sparkle.remove();

    },CONFIG.sparkles.lifetime);

}


/*=========================================
            FIREFLIES
=========================================*/

function startFireflies(){

    BackgroundEngine.fireflyTimer=

    setInterval(createFirefly,1500);

}


function createFirefly(){

    const fly=document.createElement("div");

    fly.className="firefly";

    fly.style.left=
        Math.random()*100+"vw";

    fly.style.top=
        Math.random()*100+"vh";

    body.appendChild(fly);

    fly.animate(

    [

        {

            transform:"translate(0,0)",

            opacity:0

        },

        {

            opacity:1,

            offset:.2

        },

        {

            transform:

            `translate(
            ${Math.random()*180-90}px,
            ${Math.random()*180-90}px
            )`,

            opacity:0

        }

    ],

    {

        duration:5000,

        easing:"ease-in-out"

    });

    setTimeout(()=>{

        fly.remove();

    },5000);

}


/*=========================================
        FLOATING MUSIC NOTES
=========================================*/

function startFloatingNotes(){

    BackgroundEngine.noteTimer=

    setInterval(createFloatingNote,500);

}


function createFloatingNote(){

    const note=document.createElement("div");

    note.className="floating-note";

    note.innerHTML =
    Math.random() > .5 ? "♪" : "♫";


    // Keep notes around jar sides
    const side = Math.random() > .5;


    if(side){

        // left side

        note.style.left =
        (15 + Math.random()*25)+"vw";

    }

    else{

        // right side

        note.style.left =
        (70 + Math.random()*20)+"vw";

    }


    note.style.top =
    (35 + Math.random()*35)+"vh";


    note.style.fontSize =
    (20 + Math.random()*25)+"px";


    note.style.animationDuration =
    (5 + Math.random()*4)+"s";


    body.appendChild(note);


    setTimeout(()=>{

        note.remove();

    },9000);

}

/*=========================================
        PAGE VISIBILITY
=========================================*/

document.addEventListener(

"visibilitychange",

()=>{

    if(document.hidden){

        stopBackground();

    }

    else{

        startBackground();

    }

});


/*=========================================
        START ENGINE
=========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

    startBackground();

});

/*==================================================
            MELODY JAR
          PART 4 - JAR ENGINE
==================================================*/


/*=========================================
            JAR ENGINE
=========================================*/

const JarEngine = {

    floating:false,

    mouseEnabled:true,

    glowEnabled:true,

    shineEnabled:true

};


/*=========================================
        INITIALIZE JAR
=========================================*/

function initializeJar(){

    startJarFloat();

    startJarGlow();

    enableMouseParallax();

    createGlassReflection();

}


/*=========================================
        FLOATING ANIMATION
=========================================*/

function startJarFloat(){

    if(JarEngine.floating)
        return;

    JarEngine.floating = true;
    console.log("jar =", jar);
console.log("jarGlow =", jarGlow);

    jar.animate(

    [

        {

            transform:
            "translateY(0px)"

        },

        {

            transform:
            "translateY(-8px)"

        },

        {

            transform:
            "translateY(0px)"

        }

    ],

    {

        duration:4200,

        iterations:Infinity,

        easing:"ease-in-out"

    });

}


/*=========================================
        JAR GLOW
=========================================*/

function startJarGlow(){

    if(!jarGlow) return;

    jarGlow.animate(

    [

        {

            opacity:.45,

            transform:
            "translateX(-50%) scale(1)"

        },

        {

            opacity:.85,

            transform:
            "translateX(-50%) scale(1.15)"

        },

        {

            opacity:.45,

            transform:
            "translateX(-50%) scale(1)"

        }

    ],

    {

        duration:3000,

        iterations:Infinity,

        easing:"ease-in-out"

    });

}


/*=========================================
        MOUSE PARALLAX
=========================================*/

function enableMouseParallax(){

    document.addEventListener("mousemove",(e)=>{

        if(!JarEngine.mouseEnabled)
            return;

        const x =
            (e.clientX/window.innerWidth-.5)*16;

        const y =
            (e.clientY/window.innerHeight-.5)*12;

        jar.style.transform =

        `translate(${x}px,${y}px)`;

    });

}


/*=========================================
        GLASS REFLECTION
=========================================*/

function createGlassReflection(){

    const shine=document.createElement("div");

    shine.className="jar-shine";

    jar.appendChild(shine);

}


/*=========================================
        MAGICAL PULSE
=========================================*/

function magicalPulse(){

    jar.animate(

    [

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(1.04)"

        },

        {

            transform:"scale(1)"

        }

    ],

    {

        duration:700,

        easing:"ease-out"

    });

}


/*=========================================
        SHAKE JAR
=========================================*/

function shakeJar(){

    jar.animate(

    [

        {transform:"translateX(0px)"},

        {transform:"translateX(-6px)"},

        {transform:"translateX(6px)"},

        {transform:"translateX(-4px)"},

        {transform:"translateX(4px)"},

        {transform:"translateX(0px)"}

    ],

    {

        duration:450,

        easing:"ease-in-out"

    });

}


/*=========================================
        GLOW BURST
=========================================*/

function glowBurst(){

    if(!jarGlow) return;

    jarGlow.animate(

    [

        {

            opacity:.5,

            transform:
            "translateX(-50%) scale(1)"

        },

        {

            opacity:1,

            transform:
            "translateX(-50%) scale(1.55)"

        },

        {

            opacity:.6,

            transform:
            "translateX(-50%) scale(1)"

        }

    ],

    {

        duration:900,

        easing:"ease-out"

    });

}


/*=========================================
        PLAYER OPEN
=========================================*/

function onPlayerOpenedEffects(){

    magicalPulse();

    glowBurst();

}


/*=========================================
        PLAYER CLOSED
=========================================*/

function playerClosed(){

    magicalPulse();

}


/*=========================================
        INITIALIZE
=========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

    initializeJar();

});

/*==================================================
            MELODY JAR
        PART 5 - MUSIC NOTE ENGINE
==================================================*/


/*=========================================
            NOTE ENGINE
=========================================*/

const NoteEngine={

    locked:false,

    flying:false

};


/*=========================================
        INITIALIZE NOTES
=========================================*/

function initializeNotes(){

    notes.forEach((note,index)=>{

        note.dataset.index=index;

        note.addEventListener(

            "click",

            handleNoteClick

        );

    });

}


/*=========================================
        NOTE CLICK
=========================================*/

function handleNoteClick(e){

    if(NoteEngine.locked)
        return;

    const note=e.currentTarget;

    const index=
        Number(note.dataset.index);

    if(
        note.classList.contains("locked")
    )
        return;

    NoteEngine.locked=true;

    App.activeNote=note;

    App.currentSong=index;

    flyNote(note,index);

}


/*=========================================
        FLY NOTE
=========================================*/

function flyNote(note,index){

    NoteEngine.flying=true;

    note.style.pointerEvents="none";

    const animation=

    note.animate(

    [

        {

            transform:
            "translateY(0px) scale(1)",

            opacity:1

        },

        {

            transform:
            "translateY(-120px) scale(1.4)",

            opacity:1,

            offset:.5

        },

        {

            transform:
            "translateY(-260px) scale(2)",

            opacity:0

        }

    ],

    {

        duration:
        CONFIG.note.flyDuration,

        easing:"ease-in-out",

        fill:"forwards"

    });

    sparkleTrail(note);

    animation.onfinish=()=>{

        openSong(index);

    };

}


/*=========================================
        SPARKLE TRAIL
=========================================*/

function sparkleTrail(note){

    const rect=
    note.getBoundingClientRect();

    for(let i=0;i<20;i++){

        const spark=
        document.createElement("div");

        spark.className="sparkle";

        spark.style.left=

        rect.left+
        rect.width/2+"px";

        spark.style.top=

        rect.top+
        rect.height/2+"px";

        body.appendChild(spark);

        const angle=
        Math.random()*Math.PI*2;

        const distance=
        30+Math.random()*80;

        spark.animate(

        [

            {

                transform:

                "translate(0,0)",

                opacity:1

            },

            {

                transform:

                `translate(
                ${Math.cos(angle)*distance}px,
                ${Math.sin(angle)*distance}px
                )`,

                opacity:0

            }

        ],

        {

            duration:700,

            easing:"ease-out"

        });

        setTimeout(()=>{

            spark.remove();

        },700);

    }

}


/*=========================================
        OPEN SONG
=========================================*/

function openSong(index){

    const song=
        getSong(index);
    console.log(index);
console.log(song);
console.log(SONGS.length);

    loadSong(song);

    playerOpened();

}


/*=========================================
        RETURN NOTE
=========================================*/

function returnCurrentNote(){

    NoteEngine.locked = false;

    NoteEngine.flying = false;

}


/*=========================================
        NOTE PULSE
=========================================*/

function pulseUnplayedNotes(){

    notes.forEach(note=>{

        if(
            note.classList.contains(
                "listened"
            )
        )
            return;

        note.animate(

        [

            {

                transform:
                "scale(1)"

            },

            {

                transform:
                "scale(1.15)"

            },

            {

                transform:
                "scale(1)"

            }

        ],

        {

            duration:1800,

            easing:"ease-in-out"

        });

    });

}


/*=========================================
        NOTE COUNTER
=========================================*/

function listenedCount(){

    return listenedSongs.size;

}


/*=========================================
        INITIALIZE
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeNotes();

        Timers.notePulse=

        setInterval(

            pulseUnplayedNotes,

            2500

        );

    }

);

/*==================================================
            MELODY JAR
        PART 6 - MUSIC PLAYER
==================================================*/


/*=========================================
            PLAYER ENGINE
=========================================*/

const Player={

    loaded:false,

    rotating:false

};


/*=========================================
        LOAD SONG
=========================================*/

function loadSong(song){

    audioPlayer.src=song.audio;

    albumImage.src=song.cover;

    songTitle.textContent=song.title;

    songMessage.textContent=song.message;

    durationLabel.textContent=song.duration;

}


/*=========================================
        OPEN PLAYER
=========================================*/

function playerOpened(){

    onPlayerOpenedEffects();

    playerPanel.classList.add("show");

    playerPanel.animate(

    [

        {

            opacity:0,

            transform:"scale(.85)"

        },

        {

            opacity:1,

            transform:"scale(1)"

        }

    ],

    {

        duration:
        CONFIG.player.openDuration,

        easing:"ease-out"

    });

    playSong();

}


/*=========================================
        CLOSE PLAYER
=========================================*/

function closePlayer(){

    pauseSong();

    playerPanel.classList.remove("show");

    playerClosed();

    returnCurrentNote();
    albumImage.classList.remove("playing");

}


/*=========================================
        PLAY SONG
=========================================*/

function playSong(){

    audioPlayer.play();

    App.playing=true;

    playPauseBtn.innerHTML="⏸";

    rotateAlbum();
    albumImage.classList.add("playing");

}


/*=========================================
        PAUSE SONG
=========================================*/

function pauseSong(){

    audioPlayer.pause();

    App.playing=false;

    playPauseBtn.innerHTML="▶";
    albumImage.classList.remove("playing");

}


/*=========================================
        PLAY / PAUSE
=========================================*/

function togglePlayback(){

    if(App.playing){

        pauseSong();

    }

    else{

        playSong();

    }

}


/*=========================================
        NEXT SONG
=========================================*/

function nextSong(){

    App.currentSong++;

    if(

        App.currentSong>=
        totalSongs()

    ){

        App.currentSong=0;

    }

    loadSong(

        getSong(App.currentSong)

    );

    playSong();

}


/*=========================================
        PREVIOUS SONG
=========================================*/

function previousSong(){

    App.currentSong--;

    if(App.currentSong<0){

        App.currentSong=

        totalSongs()-1;

    }

    loadSong(

        getSong(App.currentSong)

    );

    playSong();

}


/*=========================================
        ALBUM ROTATION
=========================================*/

function rotateAlbum(){

    if(Player.rotating)
        return;

    Player.rotating=true;

    albumImage.animate(

    [

        {

            transform:
            "rotate(0deg)"

        },

        {

            transform:
            "rotate(360deg)"

        }

    ],

    {

        duration:12000,

        iterations:Infinity,

        easing:"linear"

    });

}


/*=========================================
        STOP ROTATION
=========================================*/

audioPlayer.addEventListener(

"pause",

()=>{

    Player.rotating=false;

});


/*=========================================
        AUTO NEXT
=========================================*/

audioPlayer.addEventListener("ended", () => {

    listenedSongs.add(App.currentSong);

    updateSongProgress();

    // remove the note from the jar
    if (App.activeNote) {
        App.activeNote.remove();
        App.activeNote = null;
    }

    closePlayer();

    // finished all 18?
    if (listenedSongs.size === totalSongs()) {

        setTimeout(() => {

            beginFinalSequence();

        },500);

    }

});

/*=========================================
        KEYBOARD SHORTCUTS
=========================================*/

document.addEventListener(

"keydown",

(e)=>{

    if(

        playerPanel.classList.contains(

            "hidden"

        )

    ) return;

    switch(e.code){

        case"Space":

            e.preventDefault();

            togglePlayback();

            break;

        case"ArrowRight":

            nextSong();

            break;

        case"ArrowLeft":

            previousSong();

            break;

    }

});


/*=========================================
        BUTTON EVENTS
=========================================*/

playPauseBtn.addEventListener(

"click",

togglePlayback

);

nextBtn.addEventListener(

"click",

nextSong

);

previousBtn.addEventListener(

"click",

previousSong

);

backButton.addEventListener(

"click",

closePlayer

);

/*==================================================
            MELODY JAR
        PART 7 - PROGRESS ENGINE
==================================================*/


/*=========================================
            PROGRESS ENGINE
=========================================*/

const Progress = {

    seeking:false,

    completed:false

};


/*=========================================
        FORMAT TIME
=========================================*/

function formatTime(seconds){

    if(isNaN(seconds))
        return "0:00";

    const mins=Math.floor(seconds/60);

    const secs=Math.floor(seconds%60);

    return `${mins}:${secs.toString().padStart(2,"0")}`;

}


/*=========================================
        METADATA LOADED
=========================================*/

audioPlayer.addEventListener(

"loadedmetadata",

()=>{

    durationLabel.textContent=

    formatTime(

        audioPlayer.duration

    );

});
    

/*=========================================
        UPDATE PROGRESS
=========================================*/

audioPlayer.addEventListener(

"timeupdate",

()=>{

    if(Progress.seeking)
        return;

    if(!audioPlayer.duration)
        return;

    currentTimeLabel.textContent=

    formatTime(

        audioPlayer.currentTime

    );

    progressBar.value=

    (

        audioPlayer.currentTime/

        audioPlayer.duration

    )*100;

});


/*=========================================
        START SEEK
=========================================*/

progressBar.addEventListener(

"mousedown",

()=>{

    Progress.seeking=true;

});


/*=========================================
        SEEK
=========================================*/

progressBar.addEventListener(

"input",

()=>{

    if(!audioPlayer.duration)
        return;

    audioPlayer.currentTime=

    (

        progressBar.value/100

    )*

    audioPlayer.duration;

});


/*=========================================
        END SEEK
=========================================*/

progressBar.addEventListener(

"mouseup",

()=>{

    Progress.seeking=false;

});


/*=========================================
        SONG COMPLETED
=========================================*/



/*=========================================
        UPDATE COUNTER
=========================================*/

function updateSongProgress(){

    console.log(

        `Completed :

        ${listenedSongs.size}

        /

        ${totalSongs()}`

    );

}


/*=========================================
        PERCENT COMPLETE
=========================================*/

function getCompletionPercentage(){

    return Math.floor(

        (

            listenedSongs.size/

            totalSongs()

        )*100

    );

}


/*=========================================
        RESET PROGRESS
=========================================*/

function resetProgress(){

    Progress.completed=false;

}


/*=========================================
        NEXT SONG READY
=========================================*/

audioPlayer.addEventListener(

"play",

()=>{

    resetProgress();

});


/*=========================================
        AUTO SAVE (Future)
=========================================*/

function saveProgress(){

    const data={

        currentSong:

        App.currentSong,

        listened:

        [...listenedSongs]

    };

    localStorage.setItem(

        "melodyJarProgress",

        JSON.stringify(data)

    );

}


/*=========================================
        LOAD SAVE (Future)
=========================================*/

function loadProgress(){

    const data=

    JSON.parse(

        localStorage.getItem(

            "melodyJarProgress"

        )

    );

    if(!data)
        return;

    App.currentSong=

    data.currentSong;

    data.listened.forEach(

        song=>{

            listenedSongs.add(song);

        }

    );

}


/*=========================================
        SAVE ON EXIT
=========================================*/

window.addEventListener(

"beforeunload",

saveProgress

);

/*==================================================
            MELODY JAR
        PART 9 - FINAL SEQUENCE
==================================================*/


/*=========================================
            FINAL ENGINE
=========================================*/

const FinalEngine={

    started:false,

    particles:140

};


/*=========================================
        BEGIN FINALE
=========================================*/

function beginFinalSequence(){

    if(FinalEngine.started)
        return;

    FinalEngine.started = true;

    pauseSong();

    stopBackground();

    playerPanel.classList.remove("show");

    const rect = jar.getBoundingClientRect();

    // Golden explosion
    for(let i = 0; i < FinalEngine.particles; i++){

        createGoldenParticle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
        );

    }

    // Hide the jar
    setTimeout(()=>{

        jar.style.display = "none";

        showFinalMessage();

    },1700);

}

/*=========================================
        GOLDEN EXPLOSION
=========================================*/

/*=========================================
        GOLDEN PARTICLE
=========================================*/

function createGoldenParticle(x,y){

    const particle=document.createElement("div");

    particle.className="gold-particle";

    particle.style.left=x+"px";

    particle.style.top=y+"px";

    body.appendChild(particle);

    const angle=Math.random()*Math.PI*2;

    const distance=120+Math.random()*240;

    particle.animate(

    [

        {

            transform:"translate(0,0) scale(.2)",

            opacity:1

        },

        {

            transform:

            `translate(

            ${Math.cos(angle)*distance}px,

            ${Math.sin(angle)*distance}px

            ) scale(1)`,

            opacity:1,

            offset:.65

        },

        {

            opacity:0

        }

    ],

    {

        duration:1700,

        easing:"ease-out"

    });

    setTimeout(()=>{

        particle.remove();

    },1700);

}


/*=========================================
        ORBIT EFFECT
=========================================*/


/*=========================================
        FINAL MESSAGE
=========================================*/

function showFinalMessage(){

    finalMessage.classList.add("show");

    finalMessage.animate(

    [

        {

            opacity:0,

            transform:"translateY(40px)"

        },

        {

            opacity:1,

            transform:"translateY(0)"

        }

    ],

    {

        duration:1200,

        easing:"ease-out",

        fill:"forwards"

    });

}

/*==================================================
            MELODY JAR
        PART 10 - PAGE TRANSITION
==================================================*/


/*=========================================
            TRANSITION ENGINE
=========================================*/

const TransitionEngine={

    running:false

};


/*=========================================
        CONTINUE BUTTON
=========================================*/

continueButton.addEventListener(

"click",

()=>{

    if(TransitionEngine.running)
        return;

    TransitionEngine.running=true;

    beginTransition();

});


/*=========================================
        BEGIN TRANSITION
=========================================*/

function beginTransition(){

    disableInteractions();

    createFarewellParticles();

    fadeOutMusic();

    setTimeout(

        fadeEntirePage,

        1000

    );

}


/*=========================================
        DISABLE UI
=========================================*/

function disableInteractions(){

    document.body.style.pointerEvents="none";

}


/*=========================================
        MUSIC FADE
=========================================*/

function fadeOutMusic(){

    const fade=setInterval(()=>{

        if(audioPlayer.volume<=0.02){

            audioPlayer.pause();

            audioPlayer.volume=1;

            clearInterval(fade);

            return;

        }

        audioPlayer.volume-=0.02;

    },80);

}


/*=========================================
        GOLDEN PARTICLES
=========================================*/

function createFarewellParticles(){

    for(let i=0;i<180;i++){

        const particle=document.createElement("div");

        particle.className="farewell-particle";

        particle.style.left=

            Math.random()*100+"vw";

        particle.style.top=

            Math.random()*100+"vh";

        body.appendChild(particle);

        const angle=Math.random()*360;

        const distance=80+Math.random()*250;

        particle.animate(

        [

            {

                transform:

                "translate(0,0) scale(.2)",

                opacity:1

            },

            {

                transform:

                `translate(

                ${Math.cos(angle*Math.PI/180)*distance}px,

                ${Math.sin(angle*Math.PI/180)*distance}px

                ) scale(1.2)`,

                opacity:1,

                offset:.6

            },

            {

                opacity:0,

                transform:

                `translate(

                ${Math.cos(angle*Math.PI/180)*(distance+120)}px,

                ${Math.sin(angle*Math.PI/180)*(distance+120)}px

                ) scale(0)`

            }

        ],

        {

            duration:2200,

            easing:"ease-out"

        });

        setTimeout(()=>{

            particle.remove();

        },2200);

    }

}


/*=========================================
        PAGE FADE
=========================================*/

function fadeEntirePage(){

    body.animate(

    [

        {

            opacity:1,

            filter:"blur(0px)"

        },

        {

            opacity:0,

            filter:"blur(10px)"

        }

    ],

    {

        duration:1800,

        easing:"ease-in-out",

        fill:"forwards"

    });

    setTimeout(

        loadGiftThree,

        1800

    );

}


/*=========================================
        LOAD NEXT PAGE
=========================================*/

function loadGiftThree(){

    window.location.href="gift.html";

}


/*=========================================
        SAFETY
=========================================*/

window.addEventListener(

"pageshow",

()=>{

    TransitionEngine.running=false;

    document.body.style.pointerEvents="auto";

});