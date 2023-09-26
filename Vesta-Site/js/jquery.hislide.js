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
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};




// About our team slider code
(function($) {
        // This function is only responsible for the function of a carousel each time it is called
        // In other words, only one carousel graph will be generated, and the scope of this function can only be assigned to one carousel graph
        // It is required to pass the root label of the current carousel picture when calling this function
        // The formal parameter ele here is the root label of a certain carousel
    
    
        var slide = function(ele,options) {
            // var x = $('li').filter(function() {
            //     return this.style.z-index == '4'});
            // x[0].css("overflow", "hidden");
            var $ele = $(ele);
            // Default setting options
            var setting = {
              // Control the animation time of the carousel
                speed: 1000,
                // Control interval time (carousel speed)
                interval: 15000,
                
            };
            // Object merger
            $.extend(true, setting, options);
            // Prescribe the position and state of each picture
            var states = [
                // { $zIndex: 1, width: 120, height: 150, top: 69, left: 134, $opacity: 0.2, },
                { $zIndex: 2, width: 130, height: 170, top: 59, left: 0, $opacity: 0.4 },
                { $zIndex: 3, width: 170, height: 218, top: 35, left: 110, $opacity: 0.7, $overflow: "hidden"},
                { $zIndex: 4, width: 224, height: 288, top: 0, left: 263, $opacity: 1,$overflow: "visible", $class: "mobileTeam"  },
                { $zIndex: 3, width: 170, height: 218, top: 35, left: 470, $opacity: 0.7, $overflow: "hidden", $class: "mobileTeam" },
                { $zIndex: 2, width: 130, height: 170, top: 59, left: 620, $opacity: 0.4, $overflow: "hidden", $class: "mobileTeam" },
                // { $zIndex: 1, width: 120, height: 150, top: 69, left: 500, $opacity: 0.2 }
            ];
           
    
            var $lis = $ele.find('li');
            var timer = null;
    
            
            var images = [ "images/ned.png", "images/adrian.JPG" ,"images/alex.jpeg","images/1.jpg", "images/vladHeadshot.jpeg"]
    
            var titles = ["Makkonen Haile, Co-Founder", "Adrian Gonzalez, Graphic Designer", "Alex Rios, Social Media Marketing","Ibrahim 'Abe' Durham, SEO" , "Vlad Gonzalez, Co-Founder"]
            var bios = ["Makkonen is a current Computer Science and Business Administration major at the University of Southern California (USC). Makkonen combines his business acumen and extensive programming knowledge to develop both beautiful and effective websites.", "Adrian Gonzalez is a graphic design student at Cal State Eastbay who has a passion for drawing. With over a hundred professional logos under his belt, Adrian's philosophy has always followed the Bauhaus design principle of drawing attention to the streamlined design.", "Alex's expertise stems from his work developing social media presences for businesses. With over twenty various social media marketing campaigns under his belt, Alex's reputation for increasing foot traffic via social media is renowned.","Ibrahim “Abe” Durham is a current Stanford computer science student with a deep understanding of computer algorithms. This coupled with his knowledge for Search Engine Optimization has helped him increase many client’s web traffic." , "Vlad is an entrepreneur and current Stanford student dedicated to serving his clients’ needs professionally and on time. With over 5 years of programming experience, Vlad both drives the creative process and contributes to the project development."]
            var i = -1;
            $(".hi-next").click(function(){
              if (i == 4) {
               i = 0;
               $(".mobileTeam").attr("src", images[i]);
               $(".bioTitles").text(titles[i])
               $(".bioText").text(bios[i]).css("text-align", "center");
              } else {
                i += 1;
                $(".mobileTeam").attr("src", images[i]);
                $(".bioTitles").text(titles[i])
                $(".bioText").text(bios[i]).css("text-align", "center");
              }
              
            });
    
            $(".hi-prev").click(function(){
              if (i == -1) {
               i = 3;
               $(".mobileTeam").attr("src", images[i]);
               $(".bioTitles").text(titles[i])
               $(".bioText").text(bios[i]);
              } else if (i == 0) {
                i = 4;
                $(".mobileTeam").attr("src", images[i]);
                $(".bioTitles").text(titles[i])
                $(".bioText").text(bios[i]);
                
              } else {
                i -= 1;
                $(".mobileTeam").attr("src", images[i]);
                $(".bioTitles").text(titles[i])
                $(".bioText").text(bios[i]);
                
              }
              
            });
    
    
            $ele.find('.hi-next').on('click', function() { 
                next();
                // showCaption();
            });
            $ele.find('.hi-prev').on('click', function() {
              
                states.push(states.shift());
                move();
                
            });
            $ele.on('mouseenter', function() {
              // var x = $('li').filter(function() {
              //   return this.style.zIndex == '4'});
              //   x.css({"overflow": "hidden"});
                // showCaption();
                clearInterval(timer);
                timer = null;
            }).on('mouseleave', function() {
                // showCaption();
                // autoPlay();
            });
    
            move();
            overflow();
            // autoPlay();
    
            // et each li correspond to each state of the above states
            // Let li spread out from the middle
           
    
            function move() {
                $lis.each(function(index, element) {
                    // showCaption();
                    var state = states[index];
                   
                   
                    // $(element).toggleClass(state.$class)
                    // $(element).css({"overflow": state.$overflow});
                    $(element).css({'zIndex': state.$zIndex}).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
                    // $(element).css({"overflow": state.$overflow});
                    
                   
                   
    
                });
            }
          
    
            // Switch to the next
            function next() {
                // Principle: Move the last element of the array to the first
                // showCaption();
                states.unshift(states.pop());
                move();
            }
        }
    // Find the root label of the carousel picture to be carousel, call slide()
    $.fn.hiSlide = function(options) {
            $(this).each(function(index, ele) {
                slide(ele,options);
            });
            // return value to support chained calls
            return this;
        }
    })(jQuery);
    
