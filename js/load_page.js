window.addEventListener("DOMContentLoaded", (event) => {


    $('.tabs .tab').click(function () {
        if ($(this).hasClass('generate')) {
            $('.tabs .tab').removeClass('active');
            $(this).addClass('active');
            $('.cont').hide();
            $('.generate-cont').show();
            $('.animate-cont').hide();
            $('#show-generate').show();
            $('#show-cam-cursor').hide();

        }
        if ($(this).hasClass('animate')) {
            $('.tabs .tab').removeClass('active');
            $(this).addClass('active');
            $('.cont').hide();
            $('.animate-cont').show();
            $('#show-generate').hide();
            $('#show-cam-cursor').show();
        }
    });

    var textWrapper = document.querySelector(".ml12");
    textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
    );

    var textWrapper2 = document.querySelector(".ml13");
    textWrapper2.innerHTML = textWrapper2.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
    );


    var textWrapper3 = document.querySelector(".ml14");
    textWrapper3.innerHTML = textWrapper3.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
    );

    anime.timeline().add({
        targets: ".ml12 .letter",
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 1200 + 60 * i,
    });

    anime.timeline().add({
        targets: ".ml13 .letter",
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 1200 + 60 * i,
    });

    anime.timeline().add({
        targets: ".ml14 .letter",
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 1200 + 60 * i,
    });

    TweenMax.from(".logo", 3, {
        y: "40",
        opacity: 0,
        ease: Expo.easeInOut,
    });

    TweenMax.from(".back-btn", 3, {
        y: "40",
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 0.4,
    });

    TweenMax.from(".right", 3, {
        y: "40",
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 0.6,
    });

    TweenMax.from(".card-img", 2, {
        y: "60",
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 1.2,
    });

    TweenMax.from(".btn", 2, {
        y: "60",
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 1.4,
    });

    TweenMax.staggerFrom(
        ".price > span",
        1, {
        y: "40",
        opacity: 0,
        ease: Power2.easeOut,
        delay: 1.6,
    },
        0.2
    );

    TweenMax.staggerFrom(
        ".nav > .nav-item",
        1, {
        y: "40",
        opacity: 0,
        ease: Power2.easeOut,
        delay: 1.6,
    },
        0.2
    );

    

    TweenMax.staggerFrom(
        ".form > div",
        1, {
        y: "40",
        opacity: 0,
        ease: Power2.easeOut,
        delay: 2,
    },
        0.2
    );

})