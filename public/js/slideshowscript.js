var slideIndex = 1;
loop();

function plusSlides(n) {
    slideIndex += n;
    var slides = document.getElementsByClassName("mySlides");
    if (slideIndex > slides.length) { slideIndex = 1 }
    showSlides();
}

function setSlide(n) {
    slideIndex = n;
    showSlides();
}
const delay = ms => new Promise(res => setTimeout(res, ms));
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
function loop() {
    // make a while loop
    showSlides();
    slideIndex++;
    var slides = document.getElementsByClassName("mySlides");
    if (slideIndex > slides.length) { slideIndex = 1 }
    setTimeout(loop, 4000); // Change image every 2 seconds
}
