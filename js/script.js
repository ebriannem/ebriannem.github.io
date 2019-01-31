//Custom tags
document.createElement('section-label');
//Immediately resize elements as necessary
resizeWindow();
window.addEventListener('resize', resizeWindow, true);
/***************** SCROLLING ****************/
//Update as the user scrolls the side-bar
document.getElementById("side-bar").addEventListener('scroll', updateScroll);
let sections = document.getElementsByClassName("section");
document.getElementById("menu-button").addEventListener('click', toggleMenu);
document.getElementById("side-bar").addEventListener('click', hideMenu);

document.getElementById("content-container").addEventListener('click', hideMenu);

function toggleMenu() {
    hideMenu();
    showMenu();
}

function showMenu() {
    let menu = document.getElementById("menu");
    let button = document.getElementById("menu-button");
    if (!button.classList.contains("toggled")) {
        let interval = setInterval(frame, 5);
        let offset = -100;

        function frame() {
            if (offset >= 10) {
                clearInterval(interval);
                button.classList.add("toggled");
            } else {
                offset++;
                menu.style.top = offset + "vh";
            }
        }
    }
}

function hideMenu() {
    let menu = document.getElementById("menu");
    let button = document.getElementById("menu-button");
    if (button.classList.contains("toggled")) {
        let interval = setInterval(frame, 5);
        let offset = 10;

        function frame() {
            if (offset <= -100) {
                clearInterval(interval);
                button.classList.remove("toggled");
            } else {
                offset--;
                menu.style.top = offset + "vh";
            }
        }
    }
}


function updateScroll() {
    //Draw all of the sections based on scroll position
    for (let i = sections.length - 1; i >= 0; i--) {
        let pos = getTopOffset(sections[i]);
        switch (sections[i].id) {
            case ("welcome-section"):
                //Only show scrolling guide at Welcome screen
                if (pos < window.innerHeight * -.2) {
                    document.getElementById("scroll-here").style.display = "none";
                } else {
                    document.getElementById("scroll-here").style.display = "block";
                }
                displayContent(document.getElementById("welcome"), pos);
                break;
            case ("education-section"):
                animText(sections[i].getElementsByTagName("H1")[0], pos, "Education");
                displayContent(document.getElementById("university"), pos);
                break;
            case ("about-section"):
                animText(sections[i].getElementsByTagName("H1")[0], pos, "About Me");
                displayContent(document.getElementById("personal"), pos);
                break;
            case ("project-section"):
                animText(sections[i].getElementsByTagName("H1")[0], pos, "Projects");
                displayContent(document.getElementById("projects"), pos);
                break;
            case ("contact-section"):
                let CInfo = document.getElementById("contact");
                if (parseInt(CInfo.style.left) <= 0 && pos < window.innerHeight * .2) {
                    document.getElementById("arrow").style.display = "none";
                    sections[i].getElementsByTagName("H1")[0].innerHTML = "Contact";
                    CInfo.style.left = "-1vw";
                } else {
                    document.getElementById("arrow").style.display = "block";
                    displayContent(document.getElementById("contact"), pos);
                    animText(sections[i].getElementsByTagName("H1")[0], pos, "Contact");
                }
                break;
            default:
                document.body.innerHTML = "I've made a mistake.";
        }

    }
}

//Show percentage of text in holder based on pos
function animText(holder, pos, text) {
    animateScroll({
        location: pos,
        draw: function addText(progress) {
            holder.innerHTML = text.substring(0, progress * text.length);
        }
    });
}

//Get offset from top of screen of given element
function getTopOffset(el) {
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
}

//Move content of el left based on scroll pos
function displayContent(el, pos) {
    animateScroll({
        location: pos,
        draw: function shiftLeft(progress) {
            el.style.left = (1 - progress) * 100 + "vw";
        }
    });
}

//Progress animation as the location approaches the mid points.
//Reverse animation as the location leaves the mid points.
function animateScroll({draw, location}) {
    let start = window.innerHeight * -0.4;
    let mid1 = window.innerHeight * 0.05;
    let mid2 = window.innerHeight * .20;
    let end = window.innerHeight * .60;
    let frac;
    if (location < mid1) {
        frac = (location - start) / (mid1 - start);
    } else if (location < mid2) {
        frac = 1;
    } else if (location < end) {
        frac = 1 - ((location - mid2) / (end - mid2));
    } else {
        frac = 0;
    }
    draw(frac);
}


//Resize elements to make the website easier to navigate on smaller screens
function resizeWindow() {
    if (window.innerWidth / window.devicePixelRatio < 400) {
        let ps = document.querySelectorAll("#side-bar p");
        for (let i = 0; i < ps.length; i++) {
            ps[i].style.display = "none"
        }
        let sh = document.querySelectorAll("#side-bar h1");
        for (let i = 0; i < ps.length; i++) {
            sh[i].style.writingMode = "vertical-lr";
            sh[i].style.textOrientation = "upright";
            sh[i].style.fontSize = "medium";
        }
        let secs = document.querySelectorAll(".section");
        for (let i = 0; i < ps.length; i++) {
            secs[i].style.paddingLeft = "0";
            secs[i].style.paddingRight = "1vw";
        }
        let cons = document.querySelectorAll(".content");
        for (let i = 0; i < ps.length; i++) {
            cons[i].style.marginLeft = "20vw";
            cons[i].style.width = "80vw";
        }
        document.getElementById("projects").style.gridTemplateColumns = "1fr";
        document.getElementById("contact").style.marginLeft = "20vw";
        document.getElementById("content-container").style.width = "80vw";
        document.getElementById("content-container").style.marginLeft = "20vw";
        document.getElementById("side-bar").style.width = "20vw";
    } else {
        let ps = document.querySelectorAll("#side-bar p");
        for (let i = 0; i < ps.length; i++) {
            ps[i].style.display = "block";
        }
        let sh = document.querySelectorAll("#side-bar h1");
        for (let i = 0; i < ps.length; i++) {
            sh[i].style.writingMode = "lr";
            sh[i].style.textOrientation = "mixed";
            sh[i].style.fontSize = "x-large";
        }
        let secs = document.querySelectorAll(".section");
        for (let i = 0; i < ps.length; i++) {
            secs[i].style.paddingLeft = "20px";
            secs[i].style.paddingRight = "20px";
        }
        let cons = document.querySelectorAll(".content");
        for (let i = 0; i < ps.length; i++) {
            cons[i].style.marginLeft = "30vw";
            cons[i].style.width = "70vw";
        }
        document.getElementById("projects").style.gridTemplateColumns = "1fr 1fr";
        document.getElementById("contact").style.marginLeft = "30vw";
        document.getElementById("content-container").style.width = "70vw";
        document.getElementById("content-container").style.marginLeft = "30vw";
        document.getElementById("side-bar").style.width = "30vw";
    }
}