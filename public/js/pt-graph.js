/*
@credits https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
*/
var data;
function makePtGraph(dat){
    var graph = document.querySelector('#pt-graph');
    var display = graph.childNodes[0];
    if (display){
        graph.removeChild(display); 
    }
    

    var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = graph.offsetWidth - margin.left - margin.right // Use the window's width, 
    , height = window.innerHeight - margin.top - margin.bottom - 150; // Use the window's height, 100 is the size of the navs

    // The number of datapoints

    //was 8. 
    
    var dataset = dat.map(entry => {
        let hours = parseInt(moment(entry.date).format('HH'))
        let min = parseInt(moment(entry.date).format('mm'))
        let decimalHr = hours + min/60;
        let newDate = new Date(moment(entry.date).format('YYYY-MM-DD'+'T00:00'))
        return {
            date: newDate,
            value: decimalHr,
            type: entry.type
        }
    })
//  

    

    var n = dataset.length;
    //ordered so that x domain is set properly
    var orderedX = dataset.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
    })
    console.log(orderedX[n-1].date)
    // 5. X scale will use the index of our data
    var x = d3.scaleTime()
        .domain([new Date(orderedX[0].date), new Date(orderedX[n-1].date)]) // input
        .range([0, width]).nice(); // output

    // 6. Y scale will use the randomly generate number 
    var y = d3.scaleLinear()
        .domain([0, 24]) // input 
        .range([height, 0]); // output 

    var xAxis = d3.axisBottom(x)
        //.tickFormat(d3.timeFormat("%b %d")); // <-- format

    var svg = d3.select("#pt-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        //.call(d3.timeFormat("%Y")) //doesn't work
        .call(xAxis) // Create an axis component with d3.axisBottom
        

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y)); // Create an axis component with d3.axisLeft

    //create dots based on type
    function createDots(type){
        if (type != 'wake' && type != 'sleep'){
            throw new Error(`improper type, must be wake or sleep but got ${type}`)
        }
        var datasetFiltered = dataset.filter(entry => entry.type == type);
        // 12. Appends a circle for each datapoint 
        svg.selectAll(".dot")
        .data(datasetFiltered)
        .enter().append("circle") // Uses the enter().append() method
            .attr("class", `dot-${type}`) // Assign a class for styling
            .attr("cx", function(d) { return x(d.date) })
            .attr("cy", function(d) { return y(d.value) })
            .attr("r", 5)
            .on("mouseover", function(a, b, c) { 
                    console.log(a) 
                this.attr('class', 'focus')
                })
            .on("mouseout", function() {  })
    }
    createDots('wake')
    createDots('sleep')
    

}
fetch('/api/getDat').then(res => {
    console.log('fetching')
    if (res.ok){
        return res.json()
    } else {
        console.log('fetch for /api/getDat no bueno')
    }

}).then(dat => {
    data = dat;
    makePtGraph(dat);
}).catch(console.log)

window.addEventListener('resize', ()=> {
    if (data == null) {
        console.log('fuck me')
        return;}
    console.log('resize event')
    makePtGraph(data);
});