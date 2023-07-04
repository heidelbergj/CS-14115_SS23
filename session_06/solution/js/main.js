/* BASIC JS
* Learning Goals: basic DOM manipulation, e.g. event listeners, buttons, dropdowns, carousel
*/

// task #1 - dropdown

// build a function that fires when dropdown menu selection changed
function categoryChange (){
    // first, grab DOM element
    let category = document.getElementById('categorySelector').value

    // log value of selected category
    console.log(category)
}

// task #2 - carousel

// to start this task, check out the bootstrap documentation of the carousel module:
// https://getbootstrap.com/docs/4.5/components/carousel/

// first initialize the carousel using jQuery
const carousel = new bootstrap.Carousel('#myCarousel')


// next, make sure you prevent the carousel from constantly rotating
carousel.pause()

// task # 3 - carousel button
function switchView(){

    console.log('test')
    // grab carousel and just go to the next slide (since we have only two slides - it will start from the beginning after it has reached the end)
    carousel.next()
    carousel.pause() // pause after sliding

    // bonus task: change the
    document.querySelector('#switchViewButton').innerHTML === 'map view'  ? document.querySelector('#switchViewButton').innerHTML = 'table view' :  document.querySelector('#switchViewButton').innerHTML='map view';
}

