$(function() {
  var num = 10,
      i = 1;
  $('img').eq(0).on('mousedown',function(e){
    e.preventDefault()
  });
  $('.check').on('click',function(){
    $('.swiper-wrapper').empty();
    i++;
    $.ajax({
    type: "GET",
    url: './../data.json',
    dataType: "json",
    success: function(data) {
      $.each(data.results, function(index, item) {
        if(index < num * i && index > num * (i-1) ){
          $('<li class="swiper-slide"><img src=' + item.url + ' alt=""></li>').appendTo('.swiper-wrapper')
        }
      });
      var $_slider = $('.swiper-slide');
      mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20
      });
      $(document).on('click',function(e){
        var target = e.target;
        switch ($(target).get(0).tagName){
          case 'IMG':
            $('.box').fadeIn(400);
            $('.img-wrapper').empty().append('<li class="item"><img src=' + $(target).attr("src") + ' alt=""></li>')
            break;
          default:
            $('.box').fadeOut()
        }
      })
    }
  })
  });

  $.ajax({
    type: "GET",
    url: './../data.json',
    dataType: "json",
    success: function(data) {
      $.each(data.results, function(index, item) {
        if(index<10){
          $('<li class="swiper-slide"><img src=' + item.url + ' alt=""></li>').appendTo('.swiper-wrapper');
          $('<li clsss="wrapper-item"><img src='+ item.url +' ondragstart="return false;"></li>').appendTo('.wrapper-item')
        }
      });
      var $_slider = $('.swiper-slide');
      var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        autoplay : 5000
      });
      $(document).on('click',function(e){
        var target = e.target;
        switch ($(target).get(0).tagName){
          case 'IMG':
            $('.box').fadeIn(400);
            $('.img-wrapper').empty().append('<li class="item"><img src=' + $(target).attr("src") + ' alt=""></li>')
            break;
          default:
            $('.box').fadeOut();
            break;
        }
      })



      var oL = $('#wrap ul li').size();
      var Deg = 360 / oL;
      var xDeg = 0,
        yDeg = -10,
        xs, ys, p = null;

      for (var i = oL - 1; i >= 0; i--) {

        $('#wrap ul li').eq(i).css({
          transition: "1s " + (oL - i) * 0.15 + "s transform,.5s " + (1 + oL * 0.15) + "s opacity",
          'transform': 'rotateY(' + Deg * i + 'deg) translateZ(350px)'
        });
      }

      if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) { //跳到手机端
        $('.wrapper').on('touchstart', (function(e) {
          clearInterval(p);
          var x1 = e.originalEvent.targetTouches[0].pageX;
          var y1 = e.originalEvent.targetTouches[0].pageY;
          $(this).bind('touchmove', function(e) {
            xs = e.originalEvent.targetTouches[0].pageX - x1;
            ys = e.originalEvent.targetTouches[0].pageY - y1;
            x1 = e.originalEvent.targetTouches[0].pageX;
            y1 = e.originalEvent.targetTouches[0].pageY;

            xDeg += xs * 0.3;
            yDeg -= ys * 0.1;
            $('#wrap').css('transform', "perspective(800px) rotateX(" + yDeg + "deg) rotateY(" + xDeg + "deg)");
          });
        })).on('touchend', (function() {
          $(this).unbind('touchmove');
          p = setInterval(function() {
            if (Math.abs(xs) < 0.5 && Math.abs(ys) < 0.5) {
              clearInterval(p)
            };
            xs = xs * 0.95;
            ys = ys * 0.95
            xDeg += xs * 0.3;
            yDeg -= ys * 0.1;
            $('#wrap').css('transform', "perspective(800px) rotateX(" + yDeg + "deg) rotateY(" + xDeg + "deg)");
          }, 30);
        }));

      } else {
        $('.wrapper').mousedown(function(e) {
          clearInterval(p);
          var x1 = e.clientX;
          var y1 = e.clientY;
          $(this).bind('mousemove', function(e) {
            xs = e.clientX - x1;
            ys = e.clientY - y1;
            x1 = e.clientX;
            y1 = e.clientY;
            xDeg += xs * 0.3;
            yDeg -= ys * 0.1;
            $('#wrap').css('transform', "perspective(800px) rotateX(" + yDeg + "deg) rotateY(" + xDeg + "deg)");
          });
        }).mouseup(function() {
          $(this).unbind('mousemove');
          p = setInterval(function() {
            if (Math.abs(xs) < 0.5 && Math.abs(ys) < 0.5) {
              clearInterval(p)
            };
            xs = xs * 0.95;
            ys = ys * 0.95
            xDeg += xs * 0.3;
            yDeg -= ys * 0.1;
            $('#wrap').css('transform', "perspective(800px) rotateX(" + yDeg + "deg) rotateY(" + xDeg + "deg)");
          }, 30);
        });
      }

    },
    error: function(error) {
          console.log(error)
    }
  });



    function aa() {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");

        //Make the canvas occupy the full page
        var W = window.innerWidth,
            H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        var particles = [];
        var mouse = {};

        //Lets create some particles now
        var particle_count = 50;
        for (var i = 0; i < particle_count; i++) {
            particles.push(new particle());
        }

        //finally some mouse tracking
        // canvas.addEventListener('mousemove', track_mouse, false);

        function track_mouse(e) {
            //since the canvas = full page the position of the mouse
            //relative to the document will suffice
            mouse.x = e.pageX;
            mouse.y = e.pageY;
        }

        function particle() {
            //speed, life, location, life, colors
            //speed.x range = -2.5 to 2.5
            //speed.y range = -15 to -5 to make it move upwards
            //lets change the Y speed to make it look like a flame
            this.speed = {
                x: -2.5 + Math.random() * 5,
                y: -15 + Math.random() * 10
            };
            //location = mouse coordinates
            //Now the flame follows the mouse coordinates
            if (mouse.x && mouse.y) {
                this.location = {
                    x: mouse.x,
                    y: mouse.y
                };
            } else {
                this.location = {
                    x: W / 2,
                    y: H / 2
                };
            }
            //radius range = 10-30
            this.radius = 10 + Math.random() * 20;
            //life range = 20-30
            this.life = 20 + Math.random() * 10;
            this.remaining_life = this.life;
            //colors
            this.r = Math.round(Math.random() * 255);
            this.g = Math.round(Math.random() * 255);
            this.b = Math.round(Math.random() * 255);
        }

        function draw() {
            //Painting the canvas black
            //Time for lighting magic
            //particles are painted with "lighter"
            //In the next frame the background is painted normally without blending to the
            //previous frame
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, W, H);
            ctx.globalCompositeOperation = "lighter";

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                ctx.beginPath();
                //changing opacity according to the life.
                //opacity goes to 0 at the end of life of a particle
                p.opacity = Math.round(p.remaining_life / p.life * 100) / 100
                //a gradient instead of white fill
                var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
                gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                gradient.addColorStop(0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
                ctx.fillStyle = gradient;
                ctx.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
                ctx.fill();

                //lets move the particles
                p.remaining_life--;
                p.radius--;
                p.location.x += p.speed.x;
                p.location.y += p.speed.y;

                //regenerate particles
                if (p.remaining_life < 0 || p.radius < 0) {
                    //a brand new particle replacing the dead one
                    particles[i] = new particle();

                }
            }
        }

        setInterval(draw, 30);
    }
    aa();

});