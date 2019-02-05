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
        button.classList.add("toggled");
        function frame() {
            if (offset >= 10) {
                clearInterval(interval);

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
                document.body.innerHTML = "Could not find " + sections[i].id;
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
