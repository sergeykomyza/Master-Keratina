// =============================================== отложенная загрузка изображений
document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages;
    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });
        lazyloadImages.forEach(function (image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");
        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }
            lazyloadThrottleTimeout = setTimeout(function () {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function (img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
});
// ================================================== header
document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.header__menu');
    const menuItem = document.querySelectorAll('.menu__item');
    const gamburger = document.querySelector('.gamburger');
    const firstLine = gamburger.querySelectorAll('span')[0];
    const middleLine = gamburger.querySelectorAll('span')[1];
    const lastLine = gamburger.querySelectorAll('span')[2];
    gamburger.addEventListener('click', function () {
        middleLine.classList.toggle('open');
        firstLine.classList.toggle('open');
        lastLine.classList.toggle('open');
        menu.classList.toggle('active');
        let times = 0
        menuItem.forEach(item => {
            setTimeout(() => {
                item.classList.toggle('active')
            }, times);
            times += 100
        });
    });

    $('.menu__link').click(function () {
        var scroll_elem = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(scroll_elem).offset().top
        }, 2000);
        $('.menu__link').removeClass('menu__link--active')
        $(this).addClass('menu__link--active')
        middleLine.classList.toggle('open');
        firstLine.classList.toggle('open');
        lastLine.classList.toggle('open');
        menu.classList.toggle('active');
        menuItem.forEach(item => {
            item.classList.toggle('active')
        });
    });

    // $(window).scroll(function () {
    //     $('section').each(function (i, el) {
    //         const top = $(el).offset().top - 100;
    //         const bottom = top + $(el).height();
    //         const scroll = $(window).scrollTop();
    //         const id = $(el).attr('id');
    //         if (scroll > top && scroll < bottom) {
    //             $('.menu__link').removeClass('menu__link--active');
    //             $('a[href="#' + id + '"]').addClass('menu__link--active');
    //         }
    //     });
    // });
})
// ================================================== inputmask
$(document).ready(function () {
    $(".js-maskPhone").inputmask({
        mask: "+38 (999) 999 99 99",
        clearIncomplete: true
    });
    $('.email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        greedy: false,
        clearIncomplete: true,
        onBeforePaste: function (pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
        definitions: {
            '*': {
                validator: "[0-9A-Za-z-а-я-]",
                casing: "lower"
            }
        }
    }
    );
});
// ================================================== swiper slider on Home section
const swiper = new Swiper(".home .swiper-container", {
    effect: "fade",
    grabCursor: false,
    speed: 1000,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 1,
    },
    pagination: {
        el: ".home .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.home .swiper-button-next',
        prevEl: '.home .swiper-button-prev',
    }
});
if (document.documentElement.clientWidth > 992) {
    const slides = document.querySelectorAll('.home .swiper-slide');
    const infoBlockActive = slides[0].querySelector('.swiper-slide__info');
    infoBlockActive.classList.add('active');
    swiper.on('slideChangeTransitionEnd', function () {
        slides.forEach(item => {
            const infoBlock = item.querySelector('.swiper-slide__info');
            if (item.classList.contains('swiper-slide-active')) {
                infoBlock.classList.add('active');
            } else {
                infoBlock.classList.remove('active');
            }
        });
    });
}
// ================================================== counters (https://github.hubspot.com/odometer/docs/welcome/)
(function () {

    const elem = document.querySelector('.client');
    const elem2 = document.querySelector('.thanks');
    const elem3 = document.querySelector('.diplom');
    const elem4 = document.querySelector('.coffee');

    const odometer = new Odometer({
        el: elem,
        value: 123,
        format: 'd',
        duration: 3000
    })
    const odometer2 = new Odometer({
        el: elem2,
        value: 123,
        format: 'd',
        duration: 3000
    })
    const odometer3 = new Odometer({
        el: elem3,
        value: 12,
        format: 'd',
        duration: 3000
    })
    const odometer4 = new Odometer({
        el: elem4,
        value: 12,
        format: 'd',
        duration: 3000
    })

    document.addEventListener('scroll', function () {
        const counterSection = document.querySelector('.statistic')
        const trigger = window.pageYOffset + counterSection.getBoundingClientRect().top - 700
        const scrolling = window.pageYOffset
        if (trigger <= scrolling) {
            odometer.update(984)
            odometer2.update(761)
            odometer3.update(27)
            odometer4.update(1537)
        } else {
            odometer.update(000)
            odometer2.update(000)
            odometer3.update(00)
            odometer4.update(0000)
        }
    });



}())
// ================================================== slider gallery
const swiper1 = new Swiper(".gallery .swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    direction: "vertical",
    loop: 'true',
    centeredSlides: 'true',
    speed: 1000,
    pagination: {
        el: ".gallery .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.gallery .swiper-button-next',
        prevEl: '.gallery .swiper-button-prev',
    },
    breakpoints: {
        992: {
            slidesPerView: 3,
            spaceBetween: -80,
        }
    }
})
// ================================================== slider team
const swiper2 = new Swiper(".team .swiper-container", {
    slidesPerView: 4,
    spaceBetween: 50,
    loop: 'true',
    speed: 1000,
    pagination: {
        el: ".team .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.team .swiper-button-next',
        prevEl: '.team .swiper-button-prev',
    },
    breakpoints: {
        1200: {
            slidesPerView: 4,
            spaceBetween: 50,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 50,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 0,
        }
    }
})
// ================================================== slider reviews
const swiper3 = new Swiper(".reviews .swiper-container", {
    effect: "coverflow",
    slidesPerView: 3,
    spaceBetween: 0,
    loop: false,
    speed: 1000,
    pagination: {
        el: ".reviews .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.reviews .swiper-button-next',
        prevEl: '.reviews .swiper-button-prev',
    },
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
        992: {
            slidesPerView: 2,
            spaceBetween: 50,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        }
    }
})
// ================================================== services
document.addEventListener('DOMContentLoaded', function () {
    const services = document.querySelectorAll('.service__content')
    const nameModal = document.querySelector('.modal .feedback__title')
    const hiddenInput = document.querySelector('.form__input--hidden')
    if (document.documentElement.clientWidth > 992) {
        services.forEach(item => {
            const itemBtn = item.querySelector('.service__button')
            itemBtn.addEventListener('click', function () {
                item.classList.add('active')
            })
        })
        $("#modal").on("hidden.bs.modal", function () {
            services.forEach(item => {
                item.classList.remove('active')
            })
        });
    }
    services.forEach(item => {
        const itemBtn = item.querySelector('.service__button')
        const itemName = item.querySelector('.service__name')
        itemBtn.addEventListener('click', function () {
            nameModal.innerText = itemName.innerText
            hiddenInput.value = itemName.innerText
        })
    })
})
// ================================================== more goods
document.addEventListener('DOMContentLoaded', function () {

    const moreGoodsBtn = document.querySelector('.goods__button')
    const moreGoods = document.querySelector('.goods__more')
    moreGoodsBtn.addEventListener('click', function () {
        const thisClass = this.className
        if (thisClass == 'goods__button button closed') {
            this.className = 'goods__button button'
            moreGoods.style.maxHeight = moreGoods.scrollHeight + 'px'
        } else if (thisClass == 'goods__button button') {
            this.className = 'goods__button button closed'
            moreGoods.style.maxHeight = 0
        }
    })

})
// ================================================== goods
document.addEventListener('DOMContentLoaded', function () {
    const nameModal = document.querySelector('.modal .feedback__title')
    const goods = document.querySelectorAll('.goods__item')
    const hiddenInput = document.querySelector('.form__input--hidden')
    goods.forEach( item => {
        const goodBtnPrice = item.querySelector('.good__button')
        const goodBtnOrder = item.querySelector('.good__order')
        const goodName = item.querySelector('.good__name')
        goodBtnPrice.addEventListener('click', function(){
            goods.forEach( elems => {
                elems.classList.remove('active')
            })
            item.classList.add('active')
        })
        goodBtnOrder.addEventListener('click', function(){
            nameModal.innerText = goodName.innerText
            hiddenInput.value = goodName.innerText
        })
    })
})
// ================================================== сбрасываем значения в форме попапа
$("#modal").on("hidden.bs.modal", function () {
    document.querySelector('.modal .feedback__title').innerText = 'Напишите нам'
    document.querySelector('.form__input--hidden').value = ''
});
// ================================================== map
setTimeout(function() {
    var headID = document.getElementsByTagName("body")[0];         
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    headID.appendChild(newScript);
}, 3000);

setTimeout(function() {
    var myMap = new ymaps.Map('map', {
        center: [48.570612, 39.341628],
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    }),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'г. Луганск, кв. Лиховида 1',
            balloonContent: 'г. Луганск, кв. Лиховида 1'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/logo_sign.png',
            iconImageSize: [40, 45],
            iconImageOffset: [-5, -38]
        })
    myMap.geoObjects
        .add(myPlacemark)
}, 4000);

// ================================================== animation
document.addEventListener('DOMContentLoaded', function () {
    if (document.documentElement.clientWidth > 992) {

        let controller = new ScrollMagic.Controller();
        // ///////////////////////////////////////////////////
        let tween1 = TweenMax.staggerFromTo('.about__box', 1,
            {
                opacity: "0"
            },
            {
                opacity: "1"
            }, 0.3);
        let scene1 = new ScrollMagic.Scene({
            triggerElement: ".about",
            offset: -300
        })
            .setTween(tween1)
            .addTo(controller);
        // scene1.addIndicators();
        // ///////////////////////////////////////////////////
        let tween2 = TweenMax.staggerFromTo('.about__foto', 1,
            {
                scale: "0"
            },
            {
                scale: "1"
            }, 0.3);
        let scene2 = new ScrollMagic.Scene({
            triggerElement: ".about",
            offset: -200
        })
            .setTween(tween2)
            .addTo(controller);
        // scene2.addIndicators();
        // ///////////////////////////////////////////////////
        let tween3 = TweenMax.staggerFromTo('.services__item', 1,
            {
                opacity: "0",
                top: "-100px"
            },
            {
                opacity: "1",
                top: "0"
            }, 0.3);
        let scene3 = new ScrollMagic.Scene({
            triggerElement: ".services",
            offset: 0
        })
            .setTween(tween3)
            .addTo(controller);
        // scene3.addIndicators();
        // ///////////////////////////////////////////////////
        let tween4 = TweenMax.staggerFromTo('.advantages__item', 1,
            {
                opacity: "0",
                bottom: "-100px"
            },
            {
                opacity: "1",
                bottom: "0"
            }, 0.3);
        let scene4 = new ScrollMagic.Scene({
            triggerElement: ".advantages",
            offset: 0
        })
            .setTween(tween4)
            .addTo(controller);
        // scene4.addIndicators();
        // ///////////////////////////////////////////////////
        let tween5 = TweenMax.staggerFromTo('.statistic__name', 1,
            {
                opacity: "0",
                left: "-100px"
            },
            {
                opacity: "1",
                left: "0"
            }, 0.3);
        let scene5 = new ScrollMagic.Scene({
            triggerElement: ".statistic",
            offset: -300
        })
            .setTween(tween5)
            .addTo(controller);
        // scene5.addIndicators();
        // ///////////////////////////////////////////////////
        let tween6 = TweenMax.staggerFromTo('.gallery__img', 1,
            {
                opacity: "0"
            },
            {
                opacity: "1"
            }, 0.3);
        let scene6 = new ScrollMagic.Scene({
            triggerElement: ".gallery",
            offset: 0
        })
            .setTween(tween6)
            .addTo(controller);
        // scene6.addIndicators();
        // ///////////////////////////////////////////////////
        let tween7 = TweenMax.staggerFromTo('.team .swiper-slide', 0.5,
            {
                transform: 'rotateY(90deg)'
            },
            {
                transform: 'rotateY(0)'
            }, 0.3);
        let scene7 = new ScrollMagic.Scene({
            triggerElement: ".team",
            offset: -300
        })
            .setTween(tween7)
            .addTo(controller);
        // scene7.addIndicators();
        // ///////////////////////////////////////////////////
        let tween8 = TweenMax.staggerFromTo('.reviews .swiper-slide', 1,
            {
                top: '-100px',
                opacity: '0'
            },
            {
                top: '0',
                opacity: '1'
            }, 0.3);
        let scene8 = new ScrollMagic.Scene({
            triggerElement: ".reviews",
            offset: -300
        })
            .setTween(tween8)
            .addTo(controller);
        // scene8.addIndicators();
        // ///////////////////////////////////////////////////
        let tween9 = TweenMax.staggerFromTo('.feedback__form', 1,
            {
                left: '-100px',
                opacity: '0'
            },
            {
                left: '0',
                opacity: '1'
            }, 0.3);
        let scene9 = new ScrollMagic.Scene({
            triggerElement: ".feedback",
            offset: 0
        })
            .setTween(tween9)
            .addTo(controller);
        // scene9.addIndicators();
        // ///////////////////////////////////////////////////
        let tween10 = TweenMax.staggerFromTo('.goods__item', 1,
            {
                top: '-100px',
                opacity: '0'
            },
            {
                top: '0',
                opacity: '1'
            }, 0.3);
        let scene10 = new ScrollMagic.Scene({
            triggerElement: ".goods",
            offset: 0
        })
            .setTween(tween10)
            .addTo(controller);
        // scene10.addIndicators();
        // ///////////////////////////////////////////////////
        let tween11 = TweenMax.staggerFromTo('.contacts__logo', 1,
            {
                left: '-100px',
                opacity: '0'
            },
            {
                left: '0',
                opacity: '1'
            }, 0.3);
        let scene11 = new ScrollMagic.Scene({
            triggerElement: ".contacts",
            offset: 0
        })
            .setTween(tween11)
            .addTo(controller);
        // scene11.addIndicators();
    }
})

// ================================================== 