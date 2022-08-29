var target = document.querySelectorAll(".drum");
for(var i=0;i<target.length;i++){
    target[i].addEventListener("click", function(){
        var button = this.textContent;
        
        makeSound(button);
        buttonAnimation(button);
    });
}

document.addEventListener("keypress", function(event){
    
    makeSound(event.key);
    buttonAnimation(event.key);
});

function buttonAnimation(buttonkey){
    var activeButton = document.querySelectorAll("."+buttonkey)[0];

    //adding the pressed class to the button key
    activeButton.classList.add("pressed");

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}
function playAudio(audio){
    var audio = new Audio("sounds/"+audio+".mp3");
    audio.play();
}

function makeSound(key){
    switch(key){
        case 'w':
            playAudio("crash");
            break;
        case 'a':
            playAudio("kick-bass");
            break;
        case 's':
            playAudio("snare");
            break;
        case 'd':
            playAudio("tom-1");
            break;
        case 'j':
            playAudio("tom-2");
            break;
        case 'k':
            playAudio("tom-3");
            break;
        case 'l':
            playAudio("tom-4");
        default:
            break;
    }
}