function makeArray(min, max, size) {
    const array = [];
    
    for (var i = 0; i < size-1; i++) {
        let rand = Math.floor(Math.random() * (max - min + 1) + min);
    
        array.push(rand);
    }
    
    //Force bars to be at max height
    array.push(Math.floor(spaceHeight));
    
    return array;
};

function render(array) {    
    //Give every bar an unique ID and hight class
    for (var i = 0; i < array.length; i++) {
        $('#space').append('<div class="bar bar-id-'+ i +' bar-height-' + array[i] + '"></div>');
    }
    
    //change css height of the array bars
    for(var i = 0; i < array.length; i++) {
        $('.bar-height-'+array[i]).css('height', array[i]+'px');
    }
};

function generate() {
    //Remove divs from space earasing everything from screen
    for (var i = 0; i < array.length; i++) {
        $('.bar').remove();
    }
    
    //empty original array
    array = [];
    
    //make new array
    const numOfBars = findNumberOfBars(size);
    const barHeight = spaceHeight;
    array = makeArray(50, barHeight, numOfBars.size);

    
    render(array);
    let str = numOfBars.width + 'px';
    $('.bar').css('width', str);
};

function swap(bar1, bar2) {
    return new Promise((resolve) =>{
        const height1 = bar1.height();
        const height2 = bar2.height();
        
        bar1.css('height', height2);
        bar2.css('height', height1);
        
        resolve();
    });
}

function findNumberOfBars(size) { 
    //Find maximum number of bars for each width option
    const maxAt40px = Math.floor(spaceSize/(40+1));
    const maxAt30px = Math.floor(spaceSize/(30+1));
    const maxAt20px = Math.floor(spaceSize/(20+1));
    const maxAt10px = Math.floor(spaceSize/(10+1));
    const maxAt5px = Math.floor(spaceSize/(5+1));
    const maxAt2px = Math.floor(spaceSize/(2+1));
    const maxAt1px = Math.floor(spaceSize/(1+1));
    
    //Set maximum of bars to prevent overflow
    document.getElementById("sizeRange").max = maxAt1px;
    
    let barWidth = 0;

    //Decrease the pixle size of the bars in order to fit more on screen
    if(size < maxAt40px) {
        barWidth = 40;
    } else if(size < maxAt30px) {
        barWidth = 30;      
    } else if(size < maxAt20px) {
        barWidth = 20
    } else if(size < maxAt10px) {
        barWidth = 10;
    } else if(size < maxAt5px) {
        barWidth = 5;
    } else if(size < maxAt2px) {
        barWidth = 2;
    } else {
        barWidth = 1;
    }
    
    return {size: size, width: barWidth};
}

async function bubbleSort() {
    isSorting = true;
    for(var i = 0; i < array.length-1; i++) {
        for(var x = 0; x < array.length-1; x++) {
            const bar1 = $('.bar-id-'+x);
            const bar2 = $('.bar-id-'+(x+1));
            const time = speed/3;
            
            bar1.css('background-color', 'lightblue');
            bar2.css('background-color', 'lightblue');
            
            //wait
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, time)
            );
            
            if(array[x] > array[x+1]) {
                bar1.css('background-color', 'indianred');
                bar2.css('background-color', 'indianred');
                
                if(speed > 2) { 
                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, time)
                    );
                }
                    
                swap(bar1, bar2);
                
                const temp = array[x];
                array[x] = array[x+1];
                array[x+1] = temp;
                
            } else{
                bar1.css('background-color', 'lightgreen');
                bar2.css('background-color', 'lightgreen');
                
                if(speed > 2) { 
                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, time)
                    );
                }
            }
            if(speed > 2) { 
                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, time)
                );
            }
            
            bar1.css('background-color', 'pink');
            bar2.css('background-color', 'pink');
        }
    }
    isSorting = false;
}

//Variables
let spaceSize = $('#space').width();
let spaceHeight = $('#space').height();
let array = [];
let speedSlider = document.getElementById('speedRange');
let speed = speedSlider.value;
let sizeSlider = document.getElementById('sizeRange');
let size = sizeSlider.value;
let isSorting = false;


//Event listeners
$('#generate-button').on('click', function() {
    generate();
});
$('#bubble-button').on('click', function() {
    if (isSorting === false) {
        bubbleSort();
    }
});
$(window).on('resize', function() {
    generate();
});
speedSlider.oninput = function() {
    speed = this.value;
};
sizeSlider.oninput = function() {
    size = this.value;
    generate();
};
$('#dark-button').on('click', function() {
    $('body').toggleClass('dark');
    $('.button').toggleClass('dark-button');
    $('.button').toggleClass('dark-hover');
    $('.slider').toggleClass('dark-slider');
});

//Generate initail array
generate();
