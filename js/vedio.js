$(document).ready(function(){

    var arr = JSON.parse(localStorage.getItem('Content'));
    $("#title").text(arr[0]);
    $("#Content").text(arr[1]);

    $(document).click(function(e){
        console.log(e.target);
    });

    $('video#my-video_html5_api').click(function(e){
        console.log(e.target);
        if(!$('#my-video').hasClass('vjs-playing')){
            $('div.ad').addClass('on');
        }
    });

    $('.vjs-icon-placeholder').click(function(e){
        console.log(e.target);
        if($('#my-video').hasClass('vjs-playing')){
            $('div.ad').addClass('on');
        }
    });

    $('img.close').click(function(){
        $('div.ad').remove();
    })

    localStorage.clear();
})