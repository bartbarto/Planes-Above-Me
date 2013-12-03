// From http://mkweb.bcgsc.ca/circos/guide/tables/

var matrix = [
[1,11,0,2,0,11,0,0,0,0,0,0,0,0,0,0,7,1,0,0,0],
[11,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,2,2,3,0,0,2,0,0,0,0,0,3,0],
[2,0,1,0,0,0,0,10,0,0,0,2,6,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,1,0,3],
[11,0,0,0,0,0,0,7,0,0,0,4,3,0,0,1,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,1,0,4],
[0,1,0,10,0,7,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0],
[0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,2],
[0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,7,0,0,2,0,0],
[0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,2,0,0],
[0,0,0,4,0,4,0,0,0,0,0,0,0,0,0,0,3,1,0,0,0],
[0,1,0,6,0,3,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
[0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,6,0,0,2,0,0],
[0,0,0,0,1,0,2,0,1,2,0,0,0,1,0,0,0,0,2,2,0],
[0,0,0,5,2,1,3,0,1,7,4,0,0,6,0,0,0,0,0,13,0],
[7,0,0,0,0,0,0,3,0,0,0,3,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0],
[0,0,0,1,1,0,1,0,1,2,2,0,0,2,2,0,0,0,0,3,0],
[0,0,3,0,0,0,0,0,0,0,0,0,0,0,2,13,0,0,0,0,0],
[0,0,0,0,3,0,4,0,2,0,0,0,0,0,0,0,0,0,0,0,0]
];

var labelArr=['AMS', 'BCN', 'BHX', 'BRU', 'BUD', 'CDG', 'CGN', 'CPH', 'DUS', 'DXB', 'FRA', 'HAM', 'HEL', 'IST', 'LGW', 'LHR', 'LIS', 'LPA', 'MAN', 'MUC', 'STN'];

var textLabel = d3.scale.ordinal().range(['AMS', 'BCN', 'BHX', 'BRU', 'BUD', 'CDG', 'CGN', 'CPH', 'DUS', 'DXB', 'FRA', 'HAM', 'HEL', 'IST', 'LGW', 'LHR', 'LIS', 'LPA', 'MAN', 'MUC', 'STN']);

var chord = d3.layout.chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .matrix(matrix);

var width = 600,
    height = 600,
    innerRadius = Math.min(width, height) * .41,
    outerRadius = innerRadius * 1.1;

var fill = d3.scale.ordinal()
    .domain(d3.range(4))
    .range(["#466FA6", "#79AEF2", "#A5CFF2", "#EBEEF0", "#223650"]); //OOk toevallig mijn kleurenschema voor al de rest
    //.range(["#b7c9e1","hsl(214, 40.7%, 10%)","hsl(214, 40.7%, 20%)","hsl(214, 40.7%, 30%)","hsl(214, 40.7%, 40%)","hsl(214, 40.7%, 50%)","hsl(214, 40.7%, 60%)","hsl(214, 40.7%, 70%)","hsl(214, 40.7%, 80%)"]);

var svg = d3.select("#graph1").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("g").selectAll("path")
    .data(chord.groups)
  .enter().append("path")
    .style("fill", function(d) { return fill(d.index); })
    .style("stroke", function(d) { return fill(d.index); })
    .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

var ticks = svg.append("g").selectAll("g")
    .data(chord.groups)
  .enter().append("g").selectAll("g")
    .data(groupTicks)
  .enter().append("g")
    .attr("transform", function(d) {
      return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + outerRadius + ",0)";
    });


// ticks.append("line")
//     .attr("x1", 1)
//     .attr("y1", 0)
//     .attr("x2", 5)
//     .attr("y2", 0)
//     .style("stroke", "#000");

ticks.append("text")
    .attr("x", 4)
    .attr("dy", -4)
    //.attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
    .attr("transform", "rotate(93)")
    //.style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    //.style('fill','white')
    .text(function(d) { return d.label; });

svg.append("g")
    .attr("class", "chord")
  .selectAll("path")
    .data(chord.chords)
  .enter().append("path")
    .attr("d", d3.svg.chord().radius(innerRadius))
    .style("fill", function(d) { return fill(d.target.index); })
    .style("opacity", 1);

// Returns an array of tick angles and labels, given a group.
function groupTicks(d) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, 1000).map(function(v, i) {
    return {
      angle: v * k + d.startAngle,
      label: "Airport"
    };
  });
}


// Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(g, i) {
    svg.selectAll(".chord path")
        .filter(function(d) { return d.source.index != i && d.target.index != i; })
      .transition()
        .style("opacity", opacity);
  };
}

/******************/
/*    bar chart   */
/******************/
var data = [{airport: 'AMS', planes: 113},
            {airport: 'BRU', planes: 56},
            {airport: 'BUD', planes: 29},
            {airport: 'CDG', planes: 49},
            {airport: 'CGN', planes: 20},
            {airport: 'DUS', planes: 20},
            {airport: 'DXB', planes: 15},
            {airport: 'FRA', planes: 27},
            {airport: 'IST', planes: 15},
            {airport: 'MUC', planes: 41},
            {airport: 'CDG', planes: 15}
            ];

var barWidth = 25;
var width = 550;
var height = (barWidth + 15) * data.length;
var margin = {top: 10, right: 10, bottom: 20, left: 10};

var y = d3.scale.linear().domain([0, data.length]).range([0, height]);
var x = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.planes; })]).rangeRound([0, width]);

// add the canvas to the DOM
var barDemo = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

barDemo.selectAll("rect")
  .data(data)
  .enter()
  .append("g")
  .append("svg:rect")
  .attr("y", function(datum, index) { return y(index); })
  .attr("x", 30)
  .attr("width", function(datum) { return x(datum.planes); })
  .attr("height", barWidth)
    .attr("fill", function(d) {
    var lightness = 100 - d.planes/1.8;
    return "hsl(214, 40.7%, "+ lightness+"%)";
});

barDemo.selectAll("text")
  .data(data)
  .enter()
  .append("svg:text")
  .attr("y", function(datum, index) { return y(index) - barWidth+11; })
  .attr("x", function(datum) { return 50 })
  .attr("dy", barWidth/2)
  .attr("text-anchor", "middle")
  .attr("font-size", "14px")
  .attr("font-weight", "800")
    .attr("fill", function(d) {
    var lightness = 100 - d.planes/1.8;
    return "hsl(214, 40.7%, "+ lightness+"%)";
})
  .text(function(datum) {return datum.airport;})
  .attr("transform", "translate(0, 18)")
  .text( function(d) { return d.planes;});

barDemo.selectAll("text.xAxis")
  .data(data)
  .enter().append("svg:text")
  .attr("y", function(datum, index) { return y(index) - barWidth+10; })
  .attr("x", 10)
  .attr("dy", barWidth/2)
  .attr("text-anchor", "middle")
  .attr("style", "font-size: 12; color:black")
  .text(function(datum) {return datum.airport;})
  .attr("transform", "translate(0, 18)")
  .attr("class", "xAxis")

/******************/
/*    bar chart 2 */
/******************/
var data = [{airport: 'AMS', planes: 73},
            {airport: 'ARN', planes: 15},
            {airport: 'BCN', planes: 18},
            {airport: 'BHX', planes: 20},
            {airport: 'BRU', planes: 30},
            {airport: 'CDG', planes: 30},
            {airport: 'CPH', planes: 49},
            {airport: 'EIN', planes: 15},
            {airport: 'HAM', planes: 22},
            {airport: 'HEL', planes: 24},
            {airport: 'LGW', planes: 24},
            {airport: 'LHR', planes: 140},
            {airport: 'LIS', planes: 18},
            {airport: 'LPA', planes: 17},
            {airport: 'LTN', planes: 29},
            {airport: 'MAN', planes: 29},
            {airport: 'STN', planes: 35}
            ];

var barWidth = 25;
var width = 550;
var height = (barWidth + 15) * data.length;
var margin = {top: 10, right: 10, bottom: 20, left: 10};

var y = d3.scale.linear().domain([0, data.length]).range([0, height]);
var x = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.planes; })]).rangeRound([0, width]);

// add the canvas to the DOM
var barDemo = d3.select("#bar2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

barDemo.selectAll("rect")
  .data(data)
  .enter()
  .append("g")
  .append("svg:rect")
  .attr("y", function(datum, index) { return y(index); })
  .attr("x", function(datum, index) { return width - x(datum.planes) -30; })
  .attr("width", function(datum) { return x(datum.planes); })
  .attr("height", barWidth)
  .attr("fill", function(d) {
    var lightness = 100 - d.planes/1.8;
    return "hsl(214, 40.7%, "+ lightness+"%)";
});


barDemo.selectAll("text")
  .data(data)
  .enter()
  .append("svg:text")
  .attr("y", function(datum, index) { return y(index) - barWidth+11; })
  .attr("x", function(datum) { return width-50 })
  .attr("dy", barWidth/2)
  .attr("text-anchor", "middle")
  .attr("style", "font-size: 14px; font-weight:800;")
    .attr("fill", function(d) {
    var lightness = 100 - d.planes/1.8;
    return "hsl(214, 40.7%, "+ lightness+"%)";
})
  .text(function(datum) {return datum.airport;})
  .attr("transform", "translate(0, 18)")
  .text( function(d) { return d.planes;});

barDemo.selectAll("text.xAxis")
  .data(data)
  .enter().append("svg:text")
  .attr("y", function(datum, index) { return y(index) - barWidth+10; })
  .attr("x", width-10)
  .attr("dy", barWidth/2)
  .attr("text-anchor", "middle")
  .attr("style", "font-size: 12; color:black")
  .text(function(datum) {return datum.airport;})
  .attr("transform", "translate(0, 18)")
  .attr("class", "xAxis")

/*******************/
/*    bar chart 2  */
/*Letters & numbers*/
/*******************/
var dataLetter = [[["0"],[103]],[["1"],[307]],[["2"],[180]],[["3"],[192]],[["4"],[173]],[["5"],[241]],[["6"],[193]],[["7"],[201]],[["8"],[172]],[["9"],[150]],[["B"],[140]],[["E"],[129]],[["R"],[208]],[["A"],[283]],[["W"],[80]],[["D"],[70]],[["L"],[245]],[["H"],[76]],[["U"],[32]],[["Z"],[75]],[["M"],[124]],[["S"],[100]],[["V"],[44]],[["K"],[121]],[["P"],[51]],[["Y"],[117]],[["N"],[61]],[["F"],[87]],[["T"],[102]],[["X"],[64]],[["G"],[55]],[["I"],[41]],[["C"],[64]],[["O"],[4]],[["J"],[33]],[["Q"],[14]]]

var weekData = [[["Monday"], [105]], [["Tuesday"], [147]],[["Wednesday"], [170]],[["Thursday"], [221]], [["Friday"], [116]], [["Saturday"], [90 ]],[["Sunday"], [76]]]

var hourData = [[["0"],[7]],[["1"],[3]],[["2"],[1]],[["3"],[4]],[["4"],[5]],[["5"],[10]],[["6"],[23]],[["7"],[38]],[["8"],[38]],[["9"],[43]],[["10"],[46]],[["11"],[32]],[["12"],[49]],[["13"],[40]],[["14"],[43]],[["15"],[30]],[["16"],[41]],[["17"],[40]],[["18"],[37]],[["19"],[41]],[["20"],[51]],[["21"],[27]],[["22"],[37]],[["23"],[11]]]


// console.log(data.sort());
dataLetter.sort();
basicBartChart("#othergraphs2", dataLetter, 200, 10, "#a5cff2", 10, 4);
basicBartChart("#weekGraph", weekData, 200, 20, "#a5cff2",60, 3);
basicBartChart("#hourGraph", hourData, 600, 10, "#a5cff2",20, 0.7);

function basicBartChart(element, dataset, height, padding, color, textOffset, colorDivideFactor){
var w = $(window).width()-150;
var h = 200;
var barPadding = padding;
var margin = {top: 10, right: 10, bottom: 20, left: 10};

var svg = d3.select(element)
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.selectAll("rect").data(dataset).enter().append("rect")
   .attr("x", function(d, i) {
      return i * (w / dataset.length);
    })
   .attr("y", function(d) {
    if(element == "#hourGraph"){
      return h - d[1]*4;
    }else{
      return h - d[1];
    }
    })
   .attr("width", w / dataset.length - barPadding)
   .attr("height", function(d){
    if(element == "#hourGraph"){
      return d[1]*4;
    }else{
      return d[1];
    }
   })
   .attr("fill", function(d) {
    var lightness = 100 - d[1]/colorDivideFactor;
    return "hsl(214, 40.7%, "+ lightness+"%)";
});

svg.selectAll("text")
.data(dataset).enter()
  .append("text")
   .text(function(d) {
        return d[0];
   })
   .attr("x", function(d, i) {
        return i * (w / dataset.length) +textOffset;
   })
   .attr("font-size", "14px")
   .attr("y", h +15);
}


$(document).ready(function(){

  //to update zhe labels on zhe circle
  var count=0;
  $('#graph1 svg text').each(function(){
    this.textContent = labelArr[count];
    count++;
  });

  $('rect').on('hover', function(){
    console.log('ki');
  });

});