/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables & switches
let myDataTable,
    myMapVis,
    myBarVisOne,
    myBarVisTwo,
    myBrushVis;

let selectedTimeRange = [];
let selectedState = '';
let selectedCategory = document.getElementById('categorySelector').value;

function categoryChange() {
    selectedCategory = document.getElementById('categorySelector').value;
    myMapVis.wrangleData();
    myBarVisOne.wrangleData();
    myBarVisTwo.wrangleData();

    changeTitles(selectedCategory)
}

function changeTitles(title) {
    console.log(title)
    // update MapTitle
    document.getElementById('map-title')
    // update Barchart
}


// Create bootsrap carousel, disabling rotating
let carousel = new bootstrap.Carousel(document.getElementById('stateCarousel'), {interval: false})


// on button click switch view
function switchView() {
    carousel.next();
    document.getElementById('switchView').innerHTML === 'map view' ? document.getElementById('switchView').innerHTML = 'table view' : document.getElementById('switchView').innerHTML = 'map view';
}


// load data using promises
let promises = [

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json"), // already projected -> you can just scale it to ft your browser window
    //d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),  // not projected -> you need to do it

    d3.csv("data/covid_data_20.csv"),
    d3.csv("data/census_usa.csv")
    // usa data
];

Promise.all(promises)
    .then(function (data) {
        initMainPage(data)
    })
    .catch(function (err) {
        console.log(err)
    });

// initMainPage
function initMainPage(dataArray) {

    // init table
    myDataTable = new DataTable('tableDiv', dataArray[1], dataArray[2]);

    // init map
    myMapVis = new MapVis('mapDiv', dataArray[0], dataArray[1], dataArray[2]);

    // init scatter
    myBarVisOne = new BarVis('barDiv', dataArray[1], dataArray[2], true);
    myBarVisTwo = new BarVis('barTwoDiv', dataArray[1], dataArray[2], false);

    // init brush
    myBrushVis = new BrushVis('brushDiv', dataArray[1]);
}


