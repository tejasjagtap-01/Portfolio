const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//first page of animation
function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
     y: 0,
    ease: Expo.easeInOut,
    duration: 2,
    delay: -1,
    stagger: .2
    })
    tl.from("#herofooter",{
     y: - 10,
    opacity: 0,
    duration: 0.2 ,
    ease: Expo.easeInOut
    })
}

 //mouse gets skewed while moving
 function mouseSkew(){
    //define default scale value 
    var xscale = 1;
    var yscale = 1;

    //to store the previous values
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        //clearTimeout(timeout); for making circle to its shape when it stops

        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;
         
        //console.log(xdiff , ydiff);

        xscale = gsap.utils.clamp(.8,1,xdiff);
        yscale = gsap.utils.clamp(.8,1,ydiff);

        xprev = dets.clientX; 
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);

        /*for making circle to its shape when it stops
        timeout= setTimeout(function () {
        document.querySelector("#minicircle").style.transform =  `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`; 
        })*/
    });
 }

//Circle that follows mouse moments
function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        //console.log(dets.clientX,dets.clientY); to print about exact location of mouse
        this.document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`; 
    })
}

circleMouseFollower();
firstPageAnim();
mouseSkew();

//for adding images while hovering
document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    //for removing the img when we leave the #div
    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"), {
        opacity : 0,
        ease:"power3.out", 
        duration: 0.3, 
    });
    });
    
    //for showing img when we hover on it
    elem.addEventListener("mousemove", function(dets){
    var diff = (dets.clientY - elem.getBoundingClientRect().top);
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
        opacity : 1,
        ease:"power3.out",
        top: diff,
        left: dets.clientX - elem.getBoundingClientRect().left,
        rotate: gsap.utils.clamp(-10,10,diffrot*0.2),
        duration: 0.3,
        overwrite: true
    });
    });
}); 