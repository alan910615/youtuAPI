$(document).ready(function(){
    let vm = new Vue({ 
        el: '.main',
        data: {
            videos:[],
            pages: {start: 0,end: 12},
        },
        methods: {
            converTime(d) {
                //ignore the "PT" part
                d = d.search(/PT/i) > -1? d.slice(2) : d;
                let h, m, s;
                //indexes of the letters h, m, s in the duration
                let hIndex = d.search(/h/i),
                    mIndex = d.search(/m/i),
                    sIndex = d.search(/s/i);
                //is h, m, s inside the duration
                let dContainsH = hIndex > -1,
                    dContainsM = mIndex > -1,
                    dContainsS = sIndex > -1;
                //setting h, m, s
                h = dContainsH? d.slice(0, hIndex) + ":" : "";
                m = dContainsM? d.slice(dContainsH ? hIndex + 1 : 0, mIndex) : dContainsH? "0" : "0";
                s = dContainsS? d.slice(dContainsM ? mIndex + 1 : hIndex + 1, sIndex) : "0";
                //adding 0 before m or s
                s = (dContainsM || dContainsS) && s < 10? "0" + s: s;
                m = (dContainsH || dContainsM) && m < 10? "0" + m + ":" : m + ":";
                return d !== "0S" ? h + m + s : "LIVE"
            },

            changePage(e){ //換頁
                var allLi = $('.pageBar > li');
                for(let i = 0; i < allLi.length; i++){
                    allLi.removeClass('addBgc');
                }
                e.target.classList.add('addBgc');

                var page = e.target.innerText;
                switch(page){
                case '1':
                    vm.pages.start = 0;
                    vm.pages.end = 12;
                    break;
                case '2':
                    vm.pages.start = 13;
                    vm.pages.end = 25;
                    break;
                case '3':
                    vm.pages.start = 26;
                    vm.pages.end = 38;
                    break;
                case '4':
                    vm.pages.start = 39;
                    vm.pages.end = 51;
                    break;
                case '5':
                    vm.pages.start = 52;
                    vm.pages.end =  64;
                    break;
                case '6':
                    vm.pages.start = 65;
                    vm.pages.end =  77;
                    break;
                case '7':
                    vm.pages.start = 78;
                    vm.pages.end = 90;
                    break;
                case '8':
                    vm.pages.start = 91;
                    vm.pages.end = 100;
                    break;
                default:
                }

            },
            
            hasClass(elem, className) {
                var reg = new RegExp('(^|\\s+)' + className + '($|\\s+)');
                return reg.test(elem.className);
            },
            grayBlockOff(e){
                e.target.classList.add('off');
                $('div.saveCase').toggleClass('on');
            },
            addOn(e){
                $('div.saveCase').toggleClass('on');
                $('div.grayBlock').toggleClass('off');

            },
            

        },
        components: {
            'li-component':{
                props: ['myTitle','myTime','myImg','myContent','myId','myFtitle','myFdescription'],
                methods: {
                    saveVideo(e){
                        if(!vm.hasClass(e.target,'fas')){//儲存
                            e.target.classList.add('fas');
                            if(JSON.parse(localStorage.getItem('vidios'))){//如果localStorage有資料
                                var vidiosArr = [];
                                var vidios = JSON.parse(localStorage.getItem('vidios'));
                                for(let i = 0; i< vidios.length;i++){
                                    vidiosArr.push(vidios[i]);
                                }
                                
                                var vidio = {
                                    id : e.target.closest('li').querySelector('input.myId').value,
                                    title : e.target.closest('li').querySelector('input.myFtitle').value,
                                    Content : e.target.closest('li').querySelector('input.myFdescription').value,
                                    Time : e.target.closest('li').querySelector('.videoTime').innerText,
                                    src : e.target.closest('li').querySelector('img').src
                                };
                                vidiosArr.push(vidio);
                                localStorage.setItem('vidios', JSON.stringify(vidiosArr));

                            }else{//如果localStorage無資料
                                var vidiosArr = [];
                                var vidio = {
                                    id : e.target.closest('li').querySelector('input.myId').value,
                                    title : e.target.closest('li').querySelector('input.myFtitle').value,
                                    Content : e.target.closest('li').querySelector('input.myFdescription').value,
                                    Time : e.target.closest('li').querySelector('.videoTime').innerText,
                                    src : e.target.closest('li').querySelector('img').src
                                };
                                vidiosArr.push(vidio);
                                localStorage.setItem('vidios', JSON.stringify(vidiosArr));
                            }

                            var saveVedio = JSON.parse(localStorage.getItem('vidios'));
                            var Video = "";
                            for(let i=0 ;i < saveVedio.length; i++){//放入收藏欄
                                var id = saveVedio[i].id;
                                var src = saveVedio[i].src;
                                var title = saveVedio[i].title.slice(0,30) + '...';
                                var FullTitle = saveVedio[i].title;
                                var FullContent = saveVedio[i].Content;


                                var saveVideo = `
                                    <li>
                                        <div class="imgBlock">
                                            <img src="${src}" class="savedImg" >
                                            <h3 class="savedTitle">${title}</h3>
                                        </div>
                                        <img src="./icon/close_icon_black.png" class="closeIcon" @click="removeSaveVedio">
                                        <input type="hidden"  class="saveID" value="${id}">
                                        <input type="hidden"  class="myFtitle" value="${FullTitle}">
                                        <input type="hidden"  class="myFdescription" value="${FullContent}">
                                    </li>
                                ` ;
                                Video += saveVideo;
                            }
                            $('ul.saveUl').html(Video);
                            $('div.saveCase > span').addClass('upDown');
                            setTimeout( function(){
                                $('div.saveCase > span').removeClass('upDown');
                            }, 700);
                        }else{//移除儲存
                            e.target.classList.remove('fas');

                            var vidiosArr = [];
                            var vidios = JSON.parse(localStorage.getItem('vidios'));
                            for(let i = 0; i< vidios.length;i++){
                                var thisID = e.target.closest('li').querySelector('input.myId').value;
                                if(thisID != vidios[i].id){
                                    vidiosArr.push(vidios[i]);
                                }
                                localStorage.setItem('vidios', JSON.stringify(vidiosArr));
                            }

                            var saveVedio = JSON.parse(localStorage.getItem('vidios'));
                            var Video = "";
                            for(let i=0 ;i < saveVedio.length; i++){//放入收藏欄
                                var id = saveVedio[i].id;
                                var src = saveVedio[i].src;
                                var title = saveVedio[i].title.slice(0,30) + '...';
                                var FullTitle = saveVedio[i].title;
                                var FullContent = saveVedio[i].Content;
                                

                                var saveVideo = `
                                <li>
                                    <div class="imgBlock">
                                        <img src="${src}" class="savedImg" >
                                        <h3 class="savedTitle">${title}</h3>
                                    </div>
                                    <img src="./icon/close_icon_black.png" class="closeIcon" @click="removeSaveVedio">
                                    <input type="hidden"  class="saveID" value="${id}">
                                    <input type="hidden"  class="myFtitle" value="${FullTitle}">
                                    <input type="hidden"  class="myFdescription" value="${FullContent}">
                                </li>
                                ` ;
                                Video += saveVideo;
                            }
                            $('ul.saveUl').html(Video);
                        }
                        
                    },
                    
                },
                beforeDestroy(){
                    
                },
                updated(){//裡面主要即時更新頁面收藏狀態
                    var vidiosArr = JSON.parse(localStorage.getItem('vidios'));
                    var vidiosID = document.getElementsByClassName('myId');
                    
                    for(let j =0; j < vidiosArr.length; j++){
                        for(let i =0; i < vidiosID.length; i++){
                            if(vidiosID[i].value != vidiosArr[j].id){
                                vidiosID[i].closest('li').querySelector('i').classList.remove('fas');
                            }
                        }
                    };
    
                    for(let j =0; j < vidiosArr.length; j++){
                        for(let i =0; i < vidiosID.length; i++){
                            if(vidiosID[i].value == vidiosArr[j].id){
                                vidiosID[i].closest('li').querySelector('i').classList.add('fas');
                            }
                        }
                    };
                },
                created() {

                },
                mounted() {
                    var vidiosArr = JSON.parse(localStorage.getItem('vidios'));
                    var vidiosID = document.getElementsByClassName('myId');
                    
                    for(let j =0; j < vidiosArr.length; j++){
                        for(let i =0; i < vidiosID.length; i++){
                            if(vidiosID[i].value == vidiosArr[j].id){
                                vidiosID[i].closest('li').querySelector('i').classList.add('fas');
                            }
                        }
                    };
                    


                    var saveVedio = JSON.parse(localStorage.getItem('vidios'));
                    var Video = "";
                    for(let i=0 ;i < saveVedio.length; i++){//放入收藏欄
                        var id = saveVedio[i].id;
                        var src = saveVedio[i].src;
                        var title = saveVedio[i].title.slice(0,30) + '...';
                        var FullTitle = saveVedio[i].title;
                        var FullContent = saveVedio[i].Content;
                        

                        var saveVideo = `
                        <li>
                            <div class="imgBlock">
                                <img src="${src}" class="savedImg" >
                                <h3 class="savedTitle">${title}</h3>
                            </div>
                            <img src="./icon/close_icon_black.png" class="closeIcon" @click="removeSaveVedio">
                            <input type="hidden"  class="saveID" value="${id}">
                            <input type="hidden"  class="myFtitle" value="${FullTitle}">
                            <input type="hidden"  class="myFdescription" value="${FullContent}">
                        </li>
                        ` ;
                        Video += saveVideo;
                    }
                    $('ul.saveUl').html(Video);
                },
                template:`
                    <li class="videoLi">
                    <img :src="myImg" class="videoImg">
                    <h3 class="videoTitle">{{myTitle}}</h3>
                    <p class="videoContent">{{myContent}}</p>
                    <p class="videoTime">片長：{{myTime}}</p>
                    <i class="saveBtn far  fa-bookmark" style="color:red" @click="saveVideo"></i>
                    <input type="hidden" :value="myId" class="myId">
                    <input type="hidden" :value="myFtitle" class="myFtitle">
                    <input type="hidden" :value="myFdescription" class="myFdescription">
                    </li>`,
            },

        },
        mounted() {
            $(document).click(function(e){
                console.log(e.target);
                if(e.target.classList.contains("closeIcon")){
                    var saveVideoID = e.target.nextElementSibling.value;
                    var videos = document.getElementsByClassName('videoLi');
                    var vidiosArr = [];
                    var vidios = JSON.parse(localStorage.getItem('vidios'));
                    for(let i = 0; i< vidios.length;i++){
                        var thisID = e.target.nextElementSibling.value;
                        if(thisID != vidios[i].id){
                            vidiosArr.push(vidios[i]);
                        }
                        localStorage.setItem('vidios', JSON.stringify(vidiosArr));
                    }
                    e.target.parentElement.remove();
                    for(let i = 0; i < videos.length;i++){
                        if(videos[i].querySelector('input.myId').value == saveVideoID){
                            videos[i].querySelector('i.saveBtn').classList.remove('fas');
                        }
                    }
                }
                else if(e.target.classList.contains("videoImg")){
                    var title = e.target.parentElement.querySelector('input.myFtitle').value;
                    var Content = e.target.parentElement.querySelector('input.myFdescription').value;
                    var arr = [title,Content];
                    localStorage.setItem('Content', JSON.stringify(arr));
                    var url = `./html/viedo.html`;
                    window.location.href = url;
                }else if(e.target.classList.contains("videoTitle")){
                    var title = e.target.parentElement.querySelector('input.myFtitle').value;
                    var Content = e.target.parentElement.querySelector('input.myFdescription').value;
                    var arr = [title,Content];
                    localStorage.setItem('Content', JSON.stringify(arr));
                    var url = `./html/viedo.html`;
                    window.location.href = url;
                }else if(e.target.classList.contains("savedImg")){//點擊收藏的圖片
                    // console.log('aaa');
                    var title = e.target.closest('li').querySelector('input.myFtitle').value;
                    var Content = e.target.closest('li').querySelector('input.myFdescription').value;
                    var arr = [title,Content];
                    localStorage.setItem('Content', JSON.stringify(arr));
                    var url = `./html/viedo.html`;
                    window.location.href = url;
                }else if(e.target.classList.contains("savedTitle")){//點擊收藏的title
                    var title = e.target.closest('li').querySelector('input.myFtitle').value;
                    var Content = e.target.closest('li').querySelector('input.myFdescription').value;
                    var arr = [title,Content];
                    localStorage.setItem('Content', JSON.stringify(arr));
                    var url = `./html/viedo.html`;
                    window.location.href = url;
                }

    
            })
        },
        created() {
            if(!JSON.parse(localStorage.getItem('vidios'))){
                var vidios = [];
                localStorage.setItem('vidios', JSON.stringify(vidios));
            }

            var url =
            "https://www.googleapis.com/youtube/v3/search" +
            "?" +
            "&key=AIzaSyDvuRYXUghs0i3BjrPopZbyqdKCc_ncgMU" +
            "&part=snippet" +
            "&relevanceLanguage=zh-Hant" +
            "&regionCode=TW"+
            "&type=video" +
            "&videoCaption=closedCaption" +
            "&maxResults=50" +
            "&q=五月天";
            
            fetch( url, {method: 'get'})
            .then(function(response) {
                response.json().then(
                    function(data){
                        //將撈到的影片資料放進vue的data
                        for(let i = 0; i < data.items.length;i++){
                            vm.videos.push({
                                'videoId':data.items[i].id.videoId,
                                'title':data.items[i].snippet.title.slice(0,30) + '...',
                                'description':data.items[i].snippet.description.slice(0,55) + '...',
                                'imgURL':data.items[i].snippet.thumbnails.high.url,
                                'Fulltitle':data.items[i].snippet.title,
                                'Fulldescription':data.items[i].snippet.description
                            })
                        }
                        
                        var url =
                            "https://www.googleapis.com/youtube/v3/search" +
                            "?" +
                            "&key=AIzaSyDvuRYXUghs0i3BjrPopZbyqdKCc_ncgMU" +
                            "&part=snippet" +
                            "&relevanceLanguage=zh-Hant" +
                            "&regionCode=TW"+
                            "&type=video" +
                            "&videoCaption=closedCaption" +
                            "&maxResults=50"+
                            "&pageToken=CAoQAA"+ //加上這段才能拿到51-100的資料
                            "&q=五月天";
                    
                        fetch( url, {method: 'get'})
                        .then(function(response) {
                            response.json().then(
                                function(data){
                                    //將撈到的影片資料放進vue的data
                                    for(let i = 0; i < data.items.length;i++){
                                        vm.videos.push({
                                            'videoId':data.items[i].id.videoId,
                                            'title':data.items[i].snippet.title.slice(0,30) + '...',
                                            'description':data.items[i].snippet.description.slice(0,55) + '...',
                                            'imgURL':data.items[i].snippet.thumbnails.high.url,
                                            'Fulltitle':data.items[i].snippet.title,
                                            'Fulldescription':data.items[i].snippet.description
                                        })
                                    }

                                    //撈到的影片資料補上影片長度
                                    for(let i = 0; i < vm.videos.length;i++){
                                        let getLength =`https://www.googleapis.com/youtube/v3/videos?id=${vm.videos[i].videoId}&part=contentDetails&key=AIzaSyDvuRYXUghs0i3BjrPopZbyqdKCc_ncgMU`;
                
                                        fetch( getLength, {method: 'get'})
                                        .then(function(response) {
                                            response.json().then(
                                                function(data){
                                                    vm.videos[i].time = vm.converTime(data.items[0].contentDetails.duration);
                                                    vm.$forceUpdate();
                                                }
                                            )
                                        }).catch(function(err) {
                                            console.log('error')
                                        });
                                    }
                                }
                            )
                        }).catch(function(err) {
                            console.log('error')
                        });
                    }
                    
                )
            }).catch(function(err) {
                console.log('error')
            });
        },
    });

    let vm1 = new Vue({
        el: '#header',     
        data: {
            
        },
        methods: {     
            search(){
                if($('input.searchVal').val() != ""){
                    var searchVal = $("input.searchVal").val();
                    $("input.searchVal").val("")

                    var url =
                    "https://www.googleapis.com/youtube/v3/search" +
                    "?" +
                    "&key=AIzaSyDvuRYXUghs0i3BjrPopZbyqdKCc_ncgMU" +
                    "&part=snippet" +
                    "&relevanceLanguage=zh-Hant" +
                    "&regionCode=TW"+
                    "&type=video" +
                    "&videoCaption=closedCaption" +
                    "&maxResults=50" +
                    `&q=${searchVal}`;

                    fetch( url, {method: 'get'})
                    .then(function(response) {
                        response.json().then(
                            function(data){
                                //將撈到的影片資料放進vue的data
                                for(let i = 0; i < data.items.length;i++){
                                    vm.videos.push({
                                        'videoId':data.items[i].id.videoId,
                                        'title':data.items[i].snippet.title.slice(0,30) + '...',
                                        'description':data.items[i].snippet.description.slice(0,55) + '...',
                                        'imgURL':data.items[i].snippet.thumbnails.high.url,
                                        'Fulltitle':data.items[i].snippet.title,
                                        'Fulldescription':data.items[i].snippet.description
                                    })
                                }
                                
                                var url =
                                    "https://www.googleapis.com/youtube/v3/search" +
                                    "?" +
                                    "&key=AIzaSyDvuRYXUghs0i3BjrPopZbyqdKCc_ncgMU" +
                                    "&part=snippet" +
                                    "&relevanceLanguage=zh-Hant" +
                                    "&regionCode=TW"+
                                    "&type=video" +
                                    "&videoCaption=closedCaption" +
                                    "&maxResults=50"+
                                    "&pageToken=CAoQAA"+ //加上這段才能拿到51-100的資料
                                    `&q=${searchVal}`;
                            
                                fetch( url, {method: 'get'})
                                .then(function(response) {
                                    response.json().then(
                                        function(data){
                                            vm.videos = [];
                                            //將撈到的影片資料放進vue的data
                                            for(let i = 0; i < data.items.length;i++){
                                                vm.videos.push({
                                                    'videoId':data.items[i].id.videoId,
                                                    'title':data.items[i].snippet.title.slice(0,30) + '...',
                                                    'description':data.items[i].snippet.description.slice(0,55) + '...',
                                                    'imgURL':data.items[i].snippet.thumbnails.high.url,
                                                    'Fulltitle':data.items[i].snippet.title,
                                                    'Fulldescription':data.items[i].snippet.description
                                                })
                                            }

                                            //撈到的影片資料補上影片長度
                                            for(let i = 0; i < vm.videos.length;i++){
                                                let getLength =`https://www.googleapis.com/youtube/v3/videos?id=${vm.videos[i].videoId}&part=contentDetails&key=AIzaSyDvuRYXUghs0i3BjrPopZbyqdKCc_ncgMU`;
                        
                                                fetch( getLength, {method: 'get'})
                                                .then(function(response) {
                                                    response.json().then(
                                                        function(data){
                                                            vm.videos[i].time = vm.converTime(data.items[0].contentDetails.duration);
                                                            vm.$forceUpdate();
                                                        }
                                                    )
                                                }).catch(function(err) {
                                                    console.log('error')
                                                });
                                            }
                                        }
                                    )
                                }).catch(function(err) {
                                    console.log('error')
                                });
                            }
                            
                        )
                    }).catch(function(err) {
                        console.log('error')
                    });
                    ///
                }
            }
        },
    });

    // let vm2 = new Vue({
    //     el: '#saveCase',     
    //     data: {
            
    //     },
    //     methods: {    

    //     },
    //     mounted(){
    //         $(document).click(function(e){
    //             if(e.target.classList.contains("savedImg")){//點擊收藏的圖片
    //                 console.log('aaa');
    //                 // var title = e.target.closest('li').querySelector('input.myFtitle').value;
    //                 // var Content = e.target.closest('li').querySelector('input.myFdescription').value;
    //                 // var arr = [title,Content];
    //                 // localStorage.setItem('Content', JSON.stringify(arr));
    //                 // var url = `./html/viedo.html`;
    //                 // window.location.href = url;
    //             }else if(e.target.classList.contains("savedTitle")){//點擊收藏的title
    //                 // var title = e.target.closest('li').querySelector('input.myFtitle').value;
    //                 // var Content = e.target.closest('li').querySelector('input.myFdescription').value;
    //                 // var arr = [title,Content];
    //                 // localStorage.setItem('Content', JSON.stringify(arr));
    //                 // var url = `./html/viedo.html`;
    //                 // window.location.href = url;
    //             }
    //         });
    //     },
    // });
    
});



//AIzaSyDKpfJCOxrXRgVy09mtdpUuB13T2Vrgr5g
//AIzaSyCYMLZUpTLHyl6bGYJ36K1TuSzEMWnqwFk
//AIzaSyA_XVlQxqqvP3thA7gon6F8qLAJVCTTQEY
//AIzaSyC3VUFZzgD565D8kdqJvQxTJo0xX7H0550
//AIzaSyALOlpoeObV3M3bx0ajK5j58GdWOoOeo8M




//AIzaSyDvuRYXUghs0i3BjrPopZbyqdKCc_ncgMU


