let imgplayer=document.getElementById("plyerImg");
let inputPlayer= document.getElementById("input-player");
     inputPlayer.onchange=function(){
    imgplayer.src=URL.createObjectURL(inputPlayer.files[0]);
}

let nationplayer=document.getElementById("plyernation");
let inputnation= document.getElementById("input-nation");
    inputnation.onchange=function(){
    nationplayer.src=URL.createObjectURL(inputnation.files[0]);
}

let clubplayer=document.getElementById("plyerclub");
let inputclub= document.getElementById("input-club");
    inputclub.onchange=function(){
    clubplayer.src=URL.createObjectURL(inputclub.files[0]);
}

