var isPaused = false;
var sessionInt;
var breakInt;
var audio = new Audio('https://dl.dropboxusercontent.com/s/p61yqnij4fx3v0d/181148_3153523-lq%20%28mp3cut.net%29.mp3?dl=0');
var timer, hours, minutes, seconds;

var setSessionTimer = function (){ 
    timer = Number($("#theSessionTime").val())*60;
    document.body.style.backgroundImage = "url(https://source.unsplash.com/_UeY8aTI6d0)";
    fixBackgImage();
    sessionInt = setInterval(function(){
        if (!isPaused) {
            divideAssignTime();
            $("#textDisplay").html("Work Hard");
            if (--timer < 0) {
                clearInterval(sessionInt);
                setBreakTimer();
            } else if (hours === "00" && minutes === "00" && seconds === "05") {
                audio.play();
            } else if (hours === "00" && minutes === "00" && seconds === "03" || seconds==="02" || seconds==="01") {
                assignColorAndText();
            }
        }
    },1000);
}

var setBreakTimer = function (){ 
    timer = Number($("#theBreakTime").val())*60;
    document.body.style.backgroundImage = "url(https://source.unsplash.com/jp_hopLyOSU)";
    fixBackgImage()
    breakInt = setInterval(function(){
        if (!isPaused) {
            divideAssignTime();
            $("#textDisplay").html("Play Harder!!");            
            if (--timer < 0) {
                clearInterval(breakInt);
                setSessionTimer();
            } else if (hours === "00" && minutes === "00" && seconds === "05") {
                audio.play();
            } else if (hours === "00" && minutes === "00" && seconds === "03" || seconds==="02" || seconds==="01") {
                assignColorAndText();
            }           
        }
    },1000);
}

//for pause and play 
$('.playAndPause').on('click', function(e) {
    $("input").attr("disabled", true);
    if ($(this).html() === "Play") {
        $(this).html("Pause");
        e.preventDefault();
        isPaused = false;
    } else {
        e.preventDefault();
        $(this).html("Play"); 
        isPaused = true;
    }
});

//starting the countdown
$(".startAndReset").on("click", function(){
    if ($(this).html() === "Start") {
        $(this).html("Reset");
        $("input").attr("disabled", true);
        $('.playAndPause').removeAttr("disabled");
        isPaused = false;
        clearBoth();
        setSessionTimer();
    } else {
        reset();
    }
})

//checks for a change in the input section and displays it.. 
$('#theSessionTime').change(function() { 
    if ($("#textDisplay").html() === "Work Hard") {
        timer = Number($("#theSessionTime").val())*60;
        divideAssignTime();
        $("#timeDisplay").html(hours + " : " + minutes + " : " + "00");
    } else {
        timer = Number($("#theBreakTime").val())*60;
        divideAssignTime();
        $("#timeDisplay").html(hours + " : " + minutes + " : " + "00");       
    }
});

var colors = {
    01: "green",
    02: "yellow",
    03: "red"
}

var borderColors = {
    01: "black black black transparent",
    02: "black black transparent transparent",
    03: "black transparent transparent transparent"  
}

//assigns the color and text for the last 3 seconds
function assignColorAndText(){
    document.body.style.background = colors[Number(seconds)];
    $('#endText').show();
    $("#endText").html(seconds);
    $(".everything").hide();
    document.getElementById("endText").style.borderColor = borderColors[Number(seconds)];
}

//as the name implies..... :)
function reset(){
    document.body.style.backgroundImage = "url(https://source.unsplash.com/9HI8UJMSdZA)";
    $(".startAndReset").html("Start");
    $("input").val(1);
    clearBoth();
    isPaused = false;
    $("input").removeAttr("disabled");
    $('.playAndPause').removeAttr("disabled");
    $('.playAndPause').html("Pause");
    $("#timeDisplay").html("00 : 01 : 00")
}

//this fixes the background image cus after it changes, this style is removed from css
//i also added the hiding and showing of text here instead of making a new function
function fixBackgImage(){
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    $('#endText').hide();
    $(".everything").show();
}

//divides the minutes to hours and seconds, assigns and displays it
function divideAssignTime() {
    hours = Math.floor(timer / 3600);
    minutes = Math.floor(timer % 3600 / 60);
    seconds = Math.floor(timer % 3600 % 60);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $("#timeDisplay").html(hours + " : " + minutes + " : " + seconds);
} 

// clearinterval 
function clearBoth(){
    clearInterval(sessionInt);
    clearInterval(breakInt);
}

// to be honest, i would probably do it with text, 
//have the text within the body tag, maybe have it display: none on css and 
//even give it transition to transform: scale , 
//so that it grows a little as it comes to the end of the second