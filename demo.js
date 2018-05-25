function Index(cols,rows){
    this.dom={
      wrapUl:$('.wrap-ul')
    }
    this.num={
       totalWidth:$('.wrap-ul').width(),
       totalHeight:$('.wrap-ul').height(),
       cols:cols,
       rows:rows
    }
    this.init();
}
Index.prototype.init=function(){
   this.createDom();
}
Index.prototype.createDom=function(){
  var wrap=this.dom.wrapUl,
      r=this.num.rows,
      c=this.num.cols,
      w=wrap.width()/c,
      h=wrap.height()/r;
      this.num.width=w,
      this.num.height=h
   for(var i=0;i<r;i++){
      for(var j=0;j<c;j++){
         $('<li><div><img src=""></div></li>').css({
          'cursor':'pointer',
            'width':w,
            'height':h,
            'position':'absolute',
            'left':w*j+'px',
            'top':h*i+'px',
            'transform':'scale(0.9) rotate('+(Math.random()*40-20)+'deg)'+
                        ' translateX('+(30*j-60)+'px)'+
                        ' translateY('+(30*i-60)+'px)'+
                        ' translateZ(-'+Math.random()*500+'px)'

         }).find('img').attr('src','img/pic'+(i*r+j)+'.jpg').end().appendTo(wrap);
      }
   }
   this.bindEvent();
}
Index.prototype.bindEvent=function(){
    var wrap=this.dom.wrapUl,
         r=this.num.rows,
        width=this.num.width,
        height=this.num.height,
        totalHeight=this.num.totalHeight,
        totalWidth=this.num.totalWidth,
        change=true;
    wrap.find('li').on('click',function(index){
        if(change){
                  change=false;
                    var bgImg=$(this).find('img'),
                      bgTop=0,
                      bgLeft=0

               $('.wrap-ul li').delay(index*10).animate({'opacity':0},200,function(){
                    var $this=$(this);
                    $this.css({

                      'transform':'scale(1) rotate(0deg) translateX(0px) translateY(0px)'
                    });
                    $this.find('div').css({
                      'transform':'scale(1)'
                    });
                    $this.find('img').attr('src',bgImg.attr('src')).css({
                      'position':'absolute',
                       'top':-bgTop,
                       'left':-bgLeft,
                       'width':totalWidth+'px',
                       'height':totalHeight+'px',

                    });
                    bgLeft+=width;
                    if(bgLeft>=totalWidth){
                        bgTop+=height;
                        bgLeft=0;
                    }
              $this.animate({ 'opacity': 1 }, 200);
               })
        }else{
            change=true;
           $('.wrap-ul li').each(function(index){
             var i= parseInt(index / r),
                j=index % r;
                var $this=$(this);
               // $this.find('img').attr('src','img/pic'+index+'.jpg');
                  $this.find('img').attr('src', 'img/pic' + index + '.jpg');
                   $this.find('img').css({
                    
                    'position':'absolute',
                    'width':'100%',
                    'height':'100%',
                    'top':0,
                    'left':0
                 
                   });
                    //   $this.css({
                    //     'transform': 'rotate(' + (Math.random() * 40 - 20) + 'deg)' +
                    //         'translateX(' + (30 * j- 60) + 'px)' +
                    //         'translateY(' + (30 * i - 60) + 'px)' + 'translateZ(-' + Math.random() * 500 + 'px)',
                    //         'height':30 + 'px',
                    //         'width':40 + 'px',
                    // });
                 $this.css({    
                 'transform':'scale(0.9) rotate('+(Math.random() * 40-20)+'deg)'+
                              'translateX('+(30 * j-60)+'px)'+
                              'translateY('+(30 * i-60)+'px)'+
                              'translateZ(-'+Math.random() * 500+'px)',          
                  'position':'absolute',
                
                  'width':30+'px',
                  'height':30+'px',
                  
               
                });
             
               $this.find('div').css({'transform':'scale(0.9)'});
          
               $this.animate({ 'opacity': 1 ,'width':width+'px','height':height+'px'}, 1200);
           })
            
        }
    })
}
new Index(5,5);