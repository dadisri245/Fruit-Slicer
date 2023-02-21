var playing =false;
var score=0;
var trialsleft;
var step;
var action;
var fruits=['apple.png','banana.png','grapes.jpg','guava.jpg','mango.jpeg','orange.jpg','papaya.jpg','pineapple.jpg','straw.jpg','watermelon.jpg','lemon.jpg','tomato.jpg','pumpkin.jpg'];
$(function(){
    //click on start or reset
    $("#startreset").click(function(){
        //playing
        if(playing==true){
            //reload page
            location.reload();
        }
        //not playing
        else{
            playing=true;
            score=0;
            $("#scorevalue").html(score);
            $("#trialsleft").show();
            trialsleft=3;
            addHearts();
            $("#gameOver").hide();
            $("#startreset").html("Reset Game");
            startAction();
        }
    });
    function addHearts(){
        $("#trialsleft").empty();
        for(i = 0; i < trialsleft; i++){
            $("#trialsleft").append('<img src="images/heart.png" class="life">');
        }
    }
    function startAction(){
       $("#fruit1").show();
       chooseFruit();
       $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
       step=1+Math.round(5*Math.random());
       action=setInterval(function(){
        $("#fruit1").css("top",$("#fruit1").position().top+step);
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            if(trialsleft > 1 ){
                $("#fruit1").show();
                chooseFruit(); 
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
                step = 1+ Math.round(5*Math.random()); 
                trialsleft --;
                addHearts();     
            }else{ 
                playing = false; 
                $("#startreset").html("Start Game"); 
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsleft").hide();
                stopAction();
            }
        }
       },10);
    }
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score); 
    //    document.getElementById("slicesound").play();
        $("#slicesound")[0].play();        
        clearInterval(action);
        $("#fruit1").hide("explode", 500); 
        setTimeout(startAction, 800);
    });
    function chooseFruit(){
        $("#fruit1").attr('src','images/'+fruits[Math.round(12*Math.random())])
    }
    
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});
