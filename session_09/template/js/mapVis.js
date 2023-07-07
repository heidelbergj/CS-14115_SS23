/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */




class MapVis {

    // constructor method to initialize Timeline object
    constructor(parentElement, dataTopographic, covidData, usaData) {
        this.parentElement = parentElement;
        this.dataTopographic = dataTopographic;
        this.covidData = covidData;
        this.usaData = usaData;
        this.displayData = [];

        // parse date method
        this.parseDate = d3.timeParse("%m/%d/%Y");

        this.initVis()
    }

    initVis() {

        let vis = this;

        vis.colors = d3.scaleLinear().range(["#FFFFFF", "#136D70"])

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.colorScale = d3.scaleLinear()
            .range(['#FFFFFF', '#cb1b1b'])


        vis.viewpoint = {'width': 975, 'height': 610};
        vis.zoom = vis.width / vis.viewpoint.width;

        // adjust map position
        vis.map = vis.svg.append("g") // group will contain all state paths
            .attr("class", "states")
            .attr('transform', `scale(${vis.zoom} ${vis.zoom})`);


        // path generator
        vis.path = d3.geoPath();

        vis.states = vis.map.selectAll("path")
            .data(topojson.feature(vis.dataTopographic, vis.dataTopographic.objects.states).features)
            .enter()
            .append("path")
            .attr("d", vis.path)
            .attr("fill", "transparent")
            .attr("stroke", "black")

        vis.wrangleData()
    }

   wrangleData() {
        let vis = this

        // check out the data
        // console.log(vis.covidData)
        // console.log(vis.usaData)

        // first, filter according to selectedTimeRange, init empty array
        let filteredData = [];

        // if there is a region selected
        if (selectedTimeRange.length !== 0) {
            //console.log('region selected', vis.selectedTimeRange, vis.selectedTimeRange[0].getTime() )

            // iterate over all rows the csv (dataFill)
            vis.covidData.forEach(row => {
                // and push rows with proper dates into filteredData
                if (selectedTimeRange[0].getTime() <= vis.parseDate(row.submission_date).getTime() && vis.parseDate(row.submission_date).getTime() <= selectedTimeRange[1].getTime()) {
                    filteredData.push(row);
                }
            });
        } else {
            filteredData = vis.covidData;
        }

        // prepare covid data by grouping all rows by state
        let covidDataByState = Array.from(d3.group(filteredData, d => d.state), ([key, value]) => ({key, value}))

        // have a look
        // console.log(covidDataByState)

        // init final data structure in which both data sets will be merged into
        vis.stateInfo = []

        // merge
        covidDataByState.forEach(state => {

            // get full state name
            let stateName = nameConverter.getFullName(state.key)

            // init counters
            let newCasesSum = 0;
            let newDeathsSum = 0;
            let population = 0;

            // look up population for the state in the census data set
            vis.usaData.forEach(row => {
                if (row.state === stateName) {
                    population += +row["2020"].replaceAll(',', '');
                }
            })

            // calculate new cases by summing up all the entries for each state
            state.value.forEach(entry => {
                newCasesSum += +entry['new_case'];
                newDeathsSum += +entry['new_death'];
            });

            // populate the final data structure
            vis.stateInfo.push(
                {
                    state: stateName,
                    population: population,
                    absCases: newCasesSum,
                    absDeaths: newDeathsSum,
                    relCases: (newCasesSum / population * 100),
                    relDeaths: (newDeathsSum / population * 100)
                }
            )
        })

        console.log('final data structure for myMapVis', vis.stateInfo);

        vis.updateMap()

    }

    updateMap(){
        let vis = this;

        let minCases = d3.min(vis.stateInfo, d=>{
            return d.absCases
        })

        let maxCases = d3.max(vis.stateInfo, d=>{
            return d.absCases
        })

        vis.colorScale
            .domain([0, maxCases])

        console.log(vis.colorScale(500))

        vis.states
            .attr("fill", d => {

                let color = ''

                vis.stateInfo.forEach(stateDict =>{
                    if(stateDict.state === d.properties.name){
                        color = vis.colorScale(stateDict.absCases)
                    }
                })

                return color
            })
    }


}