//   navbar
const menu = document.querySelector('#mobile-menu')
const menuLinks= document.querySelector('.navbar__menu')

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);

const faders = document.querySelectorAll(".fade-in");

function disableScroll() {
    document.body.style.overflow = "hidden";
    document.querySelector("html").scrollTop = window.scrollY;
  }
  
  function enableScroll() {
    document.body.style.overflow = null;
  }
  if ($(window).width() > 700) {
    disableScroll();
    $(function () {
      var isScrolling = false;
      $(window).on("wheel", function (e) {
        if (!isScrolling) {
          isScrolling = true;
  
          var howFarFromTop = $(document).scrollTop(); //how far from the top have we scrolled?
          var currentWindowHeight = $(window).height(); //current window height for responsiveness
          var delta = e.originalEvent.deltaY; // just to know if it is scroll wheel up or down
          //find out what is our offset from the top so we can now how far do we have to scroll to  the next / previous element
          var currentSlide = Math.floor(howFarFromTop / currentWindowHeight); //approximate which slide is on screen at the moment
  
          if (delta > 0) {
            //scroll down
            smoothScroll(currentWindowHeight * (currentSlide + 1));
          } else {
            //scroll up
            smoothScroll(currentWindowHeight * (currentSlide - 1));
          }
          setTimeout(function () {
            isScrolling = false;
          }, 1500);
        }
  
        return false; // don't let the browser do the default scroll
      });
    });
  
    function smoothScroll(offsetPixels) {
      if (offsetPixels < 0) {
        //avoid negative numbers on the scroll up
        offsetPixels = 0;
      }
  
      //this function is just to make an animated scrolling transition
      $("html, body").animate(
        {
          scrollTop: offsetPixels,
        },
        1500
      );
    }
  } else {
    enableScroll();
  }


  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -150px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);
  
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
  
  sliders.forEach(slider => {
    appearOnScroll.observe(slider);
  });

  var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000}";
        document.body.appendChild(css);
    };