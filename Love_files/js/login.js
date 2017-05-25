/**
 * Created by admin on 2017/5/25.
 */
$(function() {
    $('.btn').on('click',function(){
        var val = $('.ipt').val();
        if(val.trim() === ''){
            $('.warn').slideDown(400).html('请输入内容!');
            return;
        }
        if(val === '李晶晶'){
            $('.warn').fadeIn(400).html('请稍等...');
            setTimeout(function(){
                window.location = './view/index.html'
            },1000);
        }else if(val === '0828'){
            $('.warn').fadeIn(400).html('请稍等...');
            setTimeout(function(){
                $('.warn').html('欢迎宝宝,么么哒~~');
            },1000);
            setTimeout(function(){
                window.location = './view/index.html'
            },2000);
        }else{
            $('.warn').fadeIn(400).html('请稍等...');
            setTimeout(function(){
                $('.warn').html('对不起,你看不了 - -!!');
            },1000)
        }
    });
    document.onkeydown = function(e){
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
            $('.btn').click();
        }
    }
});