/*================================================================
                        Initial Page Load
=================================================================*/

$(document).ready(function() {
    $('#text-input').val($('#slider').val());
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
    //set scope variables
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.drawImage(imageObj, x, y);
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

function updateImage (value) {
    //initialize variables and image
    value = value || 80;
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
    if (value === 80) {
        drawImage(imageObj);
    }
    //red
    if (value > 80) {
        drawImage(imageObj, 0, 255, 255);
    //blue
    } else if (value < 80) {
        drawImage(imageObj, 255, 255, 0);
    }
}

/*====================================================================
                        Range Manipulation
====================================================================*/

$('#text-input').on('change', function() {
    $('#slider').val($(this).val());
    updateImage($(this).val());
});

$('#slider').on('change', function() {
    $('#text-input').val($(this).val());
    updateImage($(this).val());
});