/*================================================================
                        Initial Page Load
=================================================================*/

//set up intial state vars and load image
$(document).ready(function() {
    $('#text-input').val($('#slider').val() - 70);
    updateImage();
});

//update the canvas size on page resize
$(window).resize( function() {
        updateImage();
});

/*================================================================ 
                        Image Manipulation
=================================================================*/

//handles putting image on canvas
function drawImage(imageObj, r, g, b) {
    //set default values && scope variables
    r = r || 0;
    g = g || 0;
    b = b || 0;
    var x = 0;
    var y = 0;
    var n = 1;
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    //draw image on canvas with n representing the scale based on window size
    context.drawImage(imageObj, x, y, imageObj.width / n, imageObj.height / n);

    //when this method first runs on page load, it will not have image.obj, so we check
    if (imageObj.width) { 
       var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
       var data = imageData.data;

       //image color manipulation algorithm
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

//logic function that decides what parameters to pass to drawImage()
function updateImage (value) {
    //initialize variables and checking for edge cases
    value = value || 0;
    if (value === 0) {
        var filter = value;
    }  else  if (value > 0){
        var filter = value * 255 / 100;
    } else if (value < 0) {
        var filter = -value * 255 / 100;
    }
    var imageObj = new Image();
    imageObj.src = 'img/star-small.png';
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
    //grab the current value
    var self = $(this);
    var value = Number(self.val());
    //check for edge cases, make sure no value can be outside the range
    if (value < -100) {
        value = -100;
        $('#text-input').val(-100);
    } 
    if (value > 100) {
        value = 100;
        $('#text-input').val(100);
    } 
    //run the text-input value through rangeOffset() to see what the slider should display
    //this will differ from text-input value due to slider starting at value 70 = text input 0
    var sliderValue = rangeOffset(value, 'text');
    //set slider value equal to the result of rangeOffset()
    $('#slider').val(sliderValue);
    //make adjustments to the value that gets passed in to updateImage
    //we want the value to be what is in the input box, not the rangeoffset value
    //TODO: refactor into a more elegant solution
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
    //Get the slider value
    var self = $(this);
    var value = Number(self.val()) - 70;
    //check for edge cases, make sure the value is not outside the range
    if (value < -100) value = -100;
    if (value > 100) value = 100;
    //run the slider value through rangeOffset() to see what the text-input should display
    //this will differ from slider value due to slider starting at value 70 = text input 0
    var textValue = rangeOffset(value, 'slider');
    //set text-input value equal to the result of rangeOffset()
    $('#text-input').val(textValue);
    //pass in the rangeOffset value to update image, as it should correspond to the textbox value.
    updateImage(textValue);
});

//Range Offset Logic
function rangeOffset (value, mode) {
    //check for all three possible cases for slider values and convert them into text-input values
    if (value > 0 && mode === 'slider') {
        var outputValue = value * 100 / 30;
    } else if (value < 0 && mode === 'slider') {
        var outputValue = value * 100 / 70;
    } else if (value === 0 && mode === 'slider') {
        outputValue = 0;
        //check for all three possible cases for text-input values and convert them into slider values
    } else if (value > 0 && mode === 'text') {
        var outputValue = 70 + (value  * 30 / 100);
    } else if (value < 0 && mode === 'text') {
        var outputValue = 70 + (value  * 70 / 100);
    } else if (value === 0 && mode === 'text') {
        outputValue = 70;
    }
    //since the instructions call for the results to be numbers, make sure we don't have decimals
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