(function () {
    var iNow = 0;
    var tools = {
        init:function () {
            tools.headerHandle();
            tools.contentSize();
            tools.mousewheel();
            tools.robot();
            tools.homeChange();
            // tools.homeAuto(0);
            tools.bannerChange();
            tools.sideBtn();
            tools.music();

            for (var i=0;i<5;i++){
                tools.bgSet[i].outFn();
            }
            tools.start();

            window.onresize = tools.contentSize;
        },

        headerHandle:function () {
            var oArrow = document.getElementById('headerArrow');
            var oNav = document.getElementById('nav');
            var oNavLi = oNav.getElementsByTagName('li');
            var oNavUp = oNav.getElementsByClassName('up');

            oArrow.style.left = oNavLi[0].offsetLeft+oNavLi[0].offsetWidth/2-oArrow.offsetWidth/2+'px';
            oNavUp[0].style.width = '100%';
            for(var i=0;i<oNavLi.length;i++){
                oNavLi[i].index = i;
                oNavLi[i].onclick = function () {
                    tools.changeScreen(iNow,this.index);
                    iNow = this.index;
                }
            }
        },
        contentSize:function () {
            var CH = document.documentElement.clientHeight;
            var headerH = document.getElementById('header').offsetHeight;
            var content = document.getElementById('content');
            var content1 = document.getElementById('content1');
            var oArrow = document.getElementById('headerArrow');
            var oNav = document.getElementById('nav');
            var oNavLi = oNav.getElementsByTagName('li');
            var aDiv = content.getElementsByClassName('screen');
            content.style.height = CH-headerH+'px';
            content1.style.height = CH-headerH-60+'px';
            oArrow.style.left = oNavLi[iNow].offsetLeft+oNavLi[iNow].offsetWidth/2-oArrow.offsetWidth/2+'px';
            aDiv[iNow].style.height = content.offsetHeight+'px';
            for(var i=0;i<aDiv.length;i++){
                if(i<iNow){
                    aDiv[i].style.top = -document.documentElement.clientHeight-headerH+'px';
                }
            }
        },
        changeScreen:function (iNow,index) {
            var oContent = document.getElementById('content');
            var aDiv = oContent.getElementsByClassName('screen');
            var oArrow = document.getElementById('headerArrow');
            var oNav = document.getElementById('nav');
            var oNavLi = oNav.getElementsByTagName('li');
            var oNavUp = oNav.getElementsByClassName('up');
            var sideBtn = document.getElementById('sideBtn');
            var aSpan = sideBtn.getElementsByTagName('span');
            if(iNow<index){
                for(var i=0;i<index;i++){
                    aDiv[i].style.top = -document.documentElement.clientHeight+'px';
                    aDiv[i].style.webkitTransition= '0.5s top,0.5s height';
                    tools.bgSet[i].outFn();
                }
            }else {
                for(var i=index;i<=iNow;i++){
                    aDiv[i].style.top = 0;
                    aDiv[i].style.webkitTransition= '0.5s top,0.5s height';
                    tools.bgSet[i].outFn();
                }
            }
            tools.bgSet[index].inFn();
            oArrow.style.left = oNavLi[index].offsetLeft+oNavLi[index].offsetWidth/2-oArrow.offsetWidth/2+'px';
            for(var j=0;j<oNavUp.length;j++){
                oNavUp[j].style.width = '0%';
                oNavUp[index].style.width = '100%';
                for(var i=0;i<aSpan.length;i++){
                    aSpan[i].className = '';
                }
                aSpan[index].className = 'sideActive';
            }
        },
        mousewheel:function () {
            var oContent = document.getElementById('content');
            var timer = null;
            if(oContent.addEventListener){
                oContent.addEventListener('DOMMouseScroll',function (ev) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        clearTimeout(timer);
                        tools.changeWheel(ev);
                    },200)
                },false)
            }
            oContent.onmousewheel = function (ev) {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    tools.changeWheel(ev);
                },200)
            }

        },
        changeWheel:function (ev) {
            var onOff = true;
            var num = 0;
            var aDiv = document.getElementsByClassName('screen');
            if(ev.detail){
                onOff = ev.detail>0?true:false;
            }else {
                onOff = ev.wheelDelta<0?true:false;
            }
            if(onOff){
                num = iNow;
                iNow++;
                if(iNow==aDiv.length){
                    iNow = aDiv.length-1;
                }else if(iNow==aDiv.length-1){
                    tools.bgSet[0].outFn();
                    tools.bgSet[iNow].inFn();
                    tools.bgSet[iNow-1].outFn();
                }
                else {
                    tools.bgSet[iNow+1].outFn();
                    tools.bgSet[iNow].inFn();
                    tools.bgSet[iNow-1].outFn();
                }
                tools.changeScreen(num,iNow);
            }else {
                num = iNow;
                iNow--;
                if(iNow<0){
                    iNow = 0;
                }else if(iNow==0){
                    tools.bgSet[1].outFn();
                }
                tools.changeScreen(num,iNow);
                tools.bgSet[num].outFn();
                tools.bgSet[iNow].inFn();
            }
        },

        //三屏机器人
        robot:function () {
            var robot = document.getElementById('robot');
            var timer = null;
            var speed = 3;
            var oL = robot.offsetLeft;
            var c1= document.getElementById('content3');
            var pW = c1.getElementsByTagName('ul')[0].offsetWidth;
            timer = setInterval(function () {
                if(robot.offsetLeft<oL){
                    speed = -speed;
                    robot.style.webkitTransform = 'rotateY(-360deg)';
                }else if(robot.offsetLeft>pW-robot.offsetWidth){
                    speed = -speed;
                    robot.style.webkitTransform = 'rotateY(-180deg)';
                }
                robot.style.left = robot.offsetLeft+speed+'px';
            },20)
        },
        //一屏切换
        homeChange:function () {
            var content1Btn = document.getElementById('content1Btn');
            var aBtn = content1Btn.getElementsByTagName('span');
            var content1 = document.getElementById('content1');
            var aLi = content1.getElementsByTagName('li');
            var onOff = true;
            var old = 0;
            var timer = null;
            var timer2 = null;
            aLi[0].style.visibility = 'visible';
            aBtn[0].className = 'btnActive';

            for(var i=0;i<aBtn.length;i++){
                aBtn[i].index = i;
                aBtn[i].onclick = function () {
                    var that = this;
                    if(onOff){
                        if(this.index!==0){
                            aLi[0].style.visibility = '';
                        }
                        onOff = false;

                        // clearInterval(content1Btn.timer);   //关自动轮播
                        // timer2 = setTimeout(function () {
                        //     tools.homeAuto(that.index);
                        // },3000)
                        // if(content1Btn.btn){
                        //     aLi[old].style.visibility = 'hidden';
                        //     old = content1Btn.num;
                        //     content1Btn.btn = false;
                        // }

                        clearTimeout(timer);
                        if(this.index>old){
                            aLi[old].className = 'homeLeftHide';
                            aLi[this.index].className = 'homeRightShow';
                        }else if(this.index<old){
                            aLi[old].className = 'homeRightHide';
                            aLi[this.index].className = 'homeLeftShow';
                        }
                        for(var i=0;i<aBtn.length;i++){
                            aBtn[i].className = '';
                            aBtn[this.index].className = 'btnActive';
                        }
                        old = this.index;
                        timer = setTimeout(function () {
                            onOff = true;
                        },1000);
                    }
                }
            }
        },
        //一屏自动切换
        homeAuto:function (old) {
            var content1Btn = document.getElementById('content1Btn');
            var aBtn = content1Btn.getElementsByTagName('span');
            var content1 = document.getElementById('content1');
            var aLi = content1.getElementsByTagName('li');
            content1Btn.num = old+1;
            content1Btn.btn = true;

            content1Btn.timer = setInterval(function () {
                if(old!==0){
                    aLi[0].style.visibility = '';
                }
                if(content1Btn.num==aLi.length){
                    aLi[aLi.length-1].className = 'homeRightHide';
                    aLi[0].className = 'homeLeftShow';
                    aBtn[aLi.length-1].className = '';
                    aBtn[0].className = 'btnActive';
                    old = 0;
                    content1Btn.num = 1;
                }else {
                    aLi[old].className = 'homeLeftHide';
                    aLi[content1Btn.num].className = 'homeRightShow';
                    for(var i=0;i<aBtn.length;i++){
                        aBtn[i].className = '';
                    }
                    aBtn[content1Btn.num].className = 'btnActive';
                    old++;
                    content1Btn.num++;
                }
            },3000)
        },
        //四屏图片效果
        bannerChange:function () {
            var imgBox1 = document.getElementById('imgBox1');
            var imgBox2 = document.getElementById('imgBox2');
            var img1 = imgBox1.getElementsByTagName('img')[0];
            var img2 = imgBox2.getElementsByTagName('img')[0];
            var aDiv1 = imgBox1.getElementsByTagName('div');
            var aDiv2 = imgBox2.getElementsByTagName('div');

            for(var i=0;i<aDiv1.length;i++){
                aDiv1[i].style.background = 'url(img/about1.jpg) '+-i%2*130+'px '+-Math.floor(i/2)*100+'px no-repeat';
            }
            for(var i=0;i<aDiv2.length;i++){
                aDiv2[i].style.background = 'url(img/about3.jpg) '+-i%2*130+'px '+-Math.floor(i/2)*100+'px no-repeat';
            }
            var data = [
                {'name':'top','value':100},
                {'name':'left','value':-130},
                {'name':'left','value':130},
                {'name':'top','value':-100}
            ];
            imgBox1.onmouseover = function () {
                for(var i=0;i<aDiv1.length;i++){
                    aDiv1[i].style[data[i].name] = data[i].value+'px';
                }
                img1.style.webkitTransform = 'scale(1)';
            }
            imgBox1.onmouseout = function () {
                for(var i=0;i<aDiv1.length;i++){
                    aDiv1[i].style[data[i].name] = 0;
                }
                img1.style.webkitTransform = 'scale(1.5)';
            }
            imgBox2.onmouseover = function () {
                for(var i=0;i<aDiv2.length;i++){
                    aDiv2[i].style[data[i].name] = data[i].value+'px';
                }
                img2.style.webkitTransform = 'scale(1)';
            }
            imgBox2.onmouseout = function () {
                for(var i=0;i<aDiv2.length;i++){
                    aDiv2[i].style[data[i].name] = 0;
                }
                img2.style.webkitTransform = 'scale(1.5)';
            }
        },
        //侧栏
        sideBtn:function () {
            var sideBtn = document.getElementById('sideBtn');
            var aSpan = sideBtn.getElementsByTagName('span');
            aSpan[0].className = 'sideActive';
            for(var i=0;i<aSpan.length;i++){
                aSpan[i].index = i;
                aSpan[i].onclick = function () {
                    for(var i=0;i<aSpan.length;i++){
                        aSpan[i].className = '';
                    }
                    this.className = 'sideActive';
                    tools.changeScreen(iNow,this.index);
                    iNow = this.index;
                }
            }
        },
        //背景物品定位
        bgSet:[
            {
                inFn:function () {
                    var content1Btn = document.getElementById('content1Btn');
                    var content1 = document.getElementById('content1');
                    content1Btn.style.webkitTransform = 'translate(0,0)';
                    content1.style.webkitTransform = 'translate(0,0)';
                    content1.style.opacity = '1';
                    content1Btn.style.opacity = '1';
                },
                outFn:function () {
                    var content1Btn = document.getElementById('content1Btn');
                    var content1 = document.getElementById('content1');
                    content1Btn.style.webkitTransform = 'translate(0,150px)';
                    content1.style.webkitTransform = 'translate(0,-100px)';
                    content1.style.opacity = '0';
                    content1Btn.style.opacity = '0';
                }
            },
            {
                inFn:function () {
                    var plane1 = document.getElementById('plane1');
                    var plane2 = document.getElementById('plane2');
                    var plane3 = document.getElementById('plane3');
                    plane1.style.webkitTransform = 'translate(0,0)';
                    plane2.style.webkitTransform = 'translate(0,0)';
                    plane3.style.webkitTransform = 'translate(0,0)';
                    plane1.style.opacity = '1';
                    plane2.style.opacity = '1';
                    plane3.style.opacity = '1';
                },
                outFn:function () {
                    var plane1 = document.getElementById('plane1');
                    var plane2 = document.getElementById('plane2');
                    var plane3 = document.getElementById('plane3');
                    plane1.style.webkitTransform = 'translate(-150px,-150px)';
                    plane2.style.webkitTransform = 'translate(-150px,150px)';
                    plane3.style.webkitTransform = 'translate(150px,-150px)';
                    plane1.style.opacity = '0';
                    plane2.style.opacity = '0';
                    plane3.style.opacity = '0';
                }
            },
            {
                inFn:function () {
                    var pencel1 = document.getElementById('pencel1');
                    var pencel2 = document.getElementById('pencel2');
                    var pencel3 = document.getElementById('pencel3');
                    pencel1.style.webkitTransform = 'translate(0,0)';
                    pencel2.style.webkitTransform = 'translate(0,0)';
                    pencel3.style.webkitTransform = 'translate(0,0)';
                    pencel1.style.opacity = '1';
                    pencel2.style.opacity = '1';
                    pencel3.style.opacity = '1';
                },
                outFn:function () {
                    var pencel1 = document.getElementById('pencel1');
                    var pencel2 = document.getElementById('pencel2');
                    var pencel3 = document.getElementById('pencel3');
                    pencel1.style.webkitTransform = 'translate(0,-150px)';
                    pencel2.style.webkitTransform = 'translate(0,150px)';
                    pencel3.style.webkitTransform = 'translate(0,150px)';
                    pencel1.style.opacity = '0';
                    pencel2.style.opacity = '0';
                    pencel3.style.opacity = '0';
                }
            },
            {
                inFn:function () {
                    var imgBox1 = document.getElementById('imgBox1');
                    var imgBox2 = document.getElementById('imgBox2');
                    imgBox1.style.webkitTransform = 'rotate(0deg)';
                    imgBox2.style.webkitTransform = 'rotate(0deg)';
                    imgBox1.style.opacity = '1';
                    imgBox2.style.opacity = '1';
                },
                outFn:function () {
                    var imgBox1 = document.getElementById('imgBox1');
                    var imgBox2 = document.getElementById('imgBox2');
                    imgBox1.style.webkitTransform = 'rotate(30deg)';
                    imgBox2.style.webkitTransform = 'rotate(30deg)';
                    imgBox1.style.opacity = '0';
                    imgBox2.style.opacity = '0';
                }
            },
            {
                inFn:function () {
                    var content5 = document.getElementById('content5');
                    var moveH1 = content5.getElementsByTagName('h1')[0];
                    var moveP = content5.getElementsByTagName('p')[0];
                    moveH1.style.webkitTransform = 'translate(0,0)';
                    moveP.style.webkitTransform = 'translate(0,0)';
                    moveH1.style.opacity = '1';
                    moveP.style.opacity = '1';
                },
                outFn:function () {
                    var content5 = document.getElementById('content5');
                    var moveH1 = content5.getElementsByTagName('h1')[0];
                    var moveP = content5.getElementsByTagName('p')[0];
                    moveH1.style.webkitTransform = 'translate(-150px,0)';
                    moveP.style.webkitTransform = 'translate(150px,0)';
                    moveH1.style.opacity = '0';
                    moveP.style.opacity = '0';
                }
            }
        ],
        //开场
        start:function () {
            var start = document.getElementById('start');
            var aDiv = start.getElementsByTagName('div');
            var oSpan = start.getElementsByTagName('span')[0];
            var music = document.getElementById('music');
            var timer1 = null;
            var timer2 = null;
            var speed = 0;

            timer1 = setInterval(function () {
                oSpan.style.width = oSpan.offsetWidth+40+'px';
                if(oSpan.offsetWidth >= document.documentElement.clientWidth){
                    clearInterval(timer1);
                    oSpan.style.display = 'none';
                    timer2 = setInterval(function () {
                        for(var i=0;i<aDiv.length;i++){
                            if(aDiv[1].offsetHeight-5<=0){
                                for(var i=0;i<aDiv.length;i++){
                                    aDiv[i].style.height = 0;
                                }
                                clearInterval(timer2);
                                tools.bgSet[0].inFn();
                                music.play();
                                return;
                            }
                            speed = Math.floor((0-aDiv[1].offsetHeight)/12);
                            aDiv[i].style.height = aDiv[i].offsetHeight+speed+'px';
                        }
                    },20)
                }
            },20)
        },
        //音乐
        music:function () {
            var musicBox = document.getElementById('musicBox');
            var music = document.getElementById('music');
            var onOff = true;

            musicBox.onclick = function () {
                if(onOff){
                    musicBox.style.background = 'url(img/musicoff.gif)';
                    music.pause();
                }else {
                    musicBox.style.background = 'url(img/musicon.gif)';
                    music.play();
                }
                onOff = !onOff;
            }
        }
}
    window.onload = tools.init;
})()














