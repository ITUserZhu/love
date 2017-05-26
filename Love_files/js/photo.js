$(function() {
  var num = 1
  $('img').eq(0).on('mousedown',function(e){
    e.preventDefault()  
  })
  $('.check').on('click',function(){
    $('.swiper-wrapper').empty()
    num++;
    $.ajax({
    url: 'https://gank.io/api/data/福利/12/' + num,
    success: function(data) {
      $.each(data.results, function(index, item) {
        $('<li class="swiper-slide"><img src=' + item.url + ' alt=""></li>').appendTo('.swiper-wrapper')
      })
      var $_slider = $('.swiper-slide')
      mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
      })
      $(document).on('click',function(e){
        var target = e.target
        switch ($(target).get(0).tagName){
          case 'IMG':
            $('.box').fadeIn(400)
            $('.img-wrapper').empty().append('<li class="item"><img src=' + $(target).attr("src") + ' alt=""></li>')
            break;
          default:
            $('.box').fadeOut()
        } 
      })
    }
  })
  })

  $.ajax({
    url: 'https://gank.io/api/data/福利/12/' + num,
    success: function(data) {
      $.each(data.results, function(index, item) {
        $('<li class="swiper-slide"><img src=' + item.url + ' alt=""></li>').appendTo('.swiper-wrapper')
        $('<li clsss="wrapper-item"><img src='+ item.url +' ondragstart="return false;"></li>').appendTo('.wrapper-item')
      })
      var $_slider = $('.swiper-slide')
      var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
      })
      $(document).on('click',function(e){
        var target = e.target
        switch ($(target).get(0).tagName){
          case 'IMG':
            $('.box').fadeIn(400)
            $('.img-wrapper').empty().append('<li class="item"><img src=' + $(target).attr("src") + ' alt=""></li>')
            break;
          default:
            $('.box').fadeOut()
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
            console.log(12)
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

    }
  })



  

});