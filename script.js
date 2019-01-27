//Update content when scrolling
document.getElementById("side-bar").addEventListener('scroll', updateScroll);
let sections = document.getElementsByClassName("section");

function updateScroll(e) {
    //Draw all of the sections based on scroll position
    for (let i = sections.length - 1; i >= 0; i--) {
        let pos = getTopOffset(sections[i]);
        switch (sections[i].id) {
            case ("section-one"):
                //Only show scrolling guide at Welcome screen
                if (pos < window.innerHeight * -.2) {
                    document.getElementById("scroll-here").style.display = "none";
                } else {
                    document.getElementById("scroll-here").style.display = "block";
                }
                displayContent(document.getElementById("welcome"), pos);
                break;
            case ("section-two"):
                animText(sections[i].getElementsByTagName("H1")[0], pos, "Education");
                displayContent(document.getElementById("university"), pos);
                break;
            case ("section-three"):
                animText(sections[i].getElementsByTagName("H1")[0], pos, "Projects");
                displayContent(document.getElementById("projects"), pos);
                break;
            case ("section-four"):
                animText(sections[i].getElementsByTagName("H1")[0], pos, "Contact Me");
                displayContent(document.getElementById("contact"), pos);
                //Only show arrow when you can scroll
                if (pos < window.innerHeight * .2) {
                    document.getElementById("arrow").style.display = "none";
                } else {
                    document.getElementById("arrow").style.display = "block";
                }
                break;
            default:
                document.body.innerHTML = "I've made a mistake.";
        }

    }
}

//Element Number String
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
