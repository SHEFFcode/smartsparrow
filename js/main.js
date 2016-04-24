/*================================================================
                        Initial Page Load
=================================================================*/

//handle initial params and load image
$(document).ready(function() {
    $('#text-input').val($('#slider').val() - 70);
    updateImage();
});

//update the image on resize
$(window).resize( function() {
        updateImage();
});

/*================================================================ 
                        Image Manipulation
=================================================================*/

function drawImage(imageObj, r, g, b) {
    //set default values for initial state
    r = r || 0;
    g = g || 0;
    b = b || 0;
    var x = 0;
    var y = 0;
    var n = 1;
    //set scope variables
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.drawImage(imageObj, x, y, imageObj.width / n, imageObj.height / n);
    if (imageObj.width) {
       var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
       var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
            // red
            data[i] =  data[i] - r; // - 255 gives us blue
            // green
            data[i + 1] = data[i + 1] - g; // should match the - number in either red or blue
            // blue
            data[i + 2] = data[i + 2] - b; // - 255 gives us red
        }
        // overwrite original image
        context.putImageData(imageData, x, y);
    }
    
}

function updateImage (value) {
    //initialize variables and image
    value = value || 0;
    if (value === 0) {
        var filter = value;
    }  else  if (value > 0){
        var filter = value * 255 / 100;
    } else if (value < 0) {
        var filter = -value * 255 / 100;
    }
    var imageObj = new Image();
    imageObj.src = '../img/star-small.png';
    imageObj.onload = function() {
        drawImage(this);
    };
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    /*======= Image Color Logic ========*/
    //neutral
    if (value === 0) {
        drawImage(imageObj);
    }
    //red
    if (value > 0) {
        //In order to amplify color change effect, call funciton twice.
        drawImage(imageObj, 0, filter, filter);
        drawImage(imageObj, 0, filter, filter);
    //blue
    } else if (value < 0) {
        //In order to amplify color change effect, call function twice.
        drawImage(imageObj, filter, filter, 0);
        drawImage(imageObj, filter, filter, 0);
    }
}

/*====================================================================
                        Range Manipulation
====================================================================*/

//Change slider based on text input value.
$('#text-input').on('change', function() {
    //Adjust for the range offset
    var self = $(this);
    var value = Number(self.val());
    var sliderValue = rangeOffset(value, 'text');
    $('#slider').val(sliderValue);
    if (sliderValue - 70 > 0) {
        updateImage((sliderValue - 70) * 100 / 30);
    } else if (sliderValue - 70 < 0) {
        updateImage((sliderValue - 70) * 100 / 70);
    } else if (sliderValue - 70 === 0) {
        updateImage(0);
    }
    
});

//Change text-input based based on slider value
$('#slider').on('change', function() {
    //Adjust for the range offset
    var self = $(this);
    var value = Number(self.val()) - 70;
    var textValue = rangeOffset(value, 'slider');
    $('#text-input').val(textValue);
    updateImage(textValue);
});

//Range Manipulation Logic
function rangeOffset (value, mode) {
    if (value > 0 && mode === 'slider') {
        var outputValue = value * 100 / 30;
    } else if (value < 0 && mode === 'slider') {
        var outputValue = value * 100 / 70;
    } else if (value > 0 && mode === 'text') {
        var outputValue = 70 + (value  * 30 / 100);
    } else if (value < 0 && mode === 'text') {
        var outputValue = 70 + (value  * 70 / 100);
    } else if (value === 0 && mode === 'text') {
        outputValue = 70;
    } else if (value === 0 && mode === 'slider') {
        outputValue = 0;
    }
    return Math.floor(outputValue);
}

/*================================================================
                        Just for Fun
=================================================================*/
console.log('%c learnMore() ', 'background: #fff; color: #ff0000; font-weight: 700; font-size: 15px;');
console.log('%c hireMe() ', 'background: #fff; color: #bada55; font-weight: 700; font-size: 15px;');
function hireMe () {
    window.open('https://youtu.be/0EtDYWKJnNQ');
}
function learnMore () {
    window.open('https://www.youtube.com/watch?v=h4OnBYrbCjY');
}