{/* <script type="module"> */ }

import { Runtime, Library, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
// import * as L from "leaflet@1.9" https://unpkg.com/leaflet@1.9.2/dist/leaflet.js"

const runtime = new Runtime();
// const inspector =  new Inspector(document.querySelector("#everything"));
const module = runtime.module();
var a = module.variable(new Inspector(document.getElementById("showing"))); //new Inspector(document.getElementById("showing"))
a.define("iarray", []);


// const b = module.variable(new Inspector(document.getElementById("showing2")));
// var obs=
//                 var node = document.createElement("div");
//                 document.getElementById("showing2").appendChild(node);
//                 return new Inspector(node);
var svgdom = d3.select("#svgdom").style("background-color", 'lightgrey');;


var svg = svgdom.append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("id", "mysvgnode")
    .attr("viewBox", [0, 0, 100, 100])



var texvar = module.variable({
    fulfilled: v => {
        // console.log("Value of TEX is ", v, " of type ", typeof v)
    }
}).define(["tex", "md"], (r1, r2) => {
    // console.log("TEX is", renderr);
    // console.log("render1", r1);
    // console.log("render2", r2);
    // console.log("MD is", m);
    window.md = r2;
    window.tex = r1;

});


module.variable(observer("viewof Inps")).define("viewof Inps", ["Inputs"], _Inps);
module.variable(observer("Inps")).define("Inps", ["Generators", "viewof Inps"], (G, _) => G.input(_));

function _Inps(Inputs) {
    return Inputs.select(new Map([["Water/sea", 0], ["Open/rural", 1], ["Open/rural", 1], ["Suburban", 2], ["Urban/trees/forest", 3], ["Dense Urban", 4]]), { value: 12, label: "Clutter Type" })
}

function observer(name) {
    if (name == "viewof Inps") {
        return {
            fulfilled: v => {
                // console.log("Inputs ", v)
                var mydiv = document.createElement("div");
                document.getElementById("p2108model").appendChild(mydiv);
                new Inspector(mydiv).fulfilled(v)
            }
        }
    }
    if (name == "Inps") {
        return {
            fulfilled: v => {
                // console.log("Inputs ", v)
                var mydiv = document.createElement("div");
                document.getElementById("p2108model").appendChild(mydiv);
                new Inspector(mydiv).fulfilled(v)
            }
        }
    }
}

module.variable({
    fulfilled: v => {
        // console.log("Inputs", v)
        var mydiv = document.createElement("div");
        document.getElementById("p2108model").appendChild(mydiv);
        new Inspector(mydiv).fulfilled(v)
    }
}).define("viewof ctype", ["Inputs"], Inputs => {
    return (
        Inputs.select(new Map([["Water/sea", 0], ["Open/rural", 1], ["Open/rural", 1], ["Suburban", 2], ["Urban/trees/forest", 3], ["Dense Urban", 4]]), { value: 12, label: "Clutter Type" })
    )
})


module.variable({
    fulfilled: v => {
        // console.log("Inputs ctype is ", v)
        var mydiv = document.createElement("div");
        mydiv.style = "background:blue"
        document.getElementById("p2108model").appendChild(mydiv);
        new Inspector(mydiv).fulfilled(v)
    }
}).define("ctype", ["Generators", "viewof ctype"], (G, _) => G.input(_));


var radius = module.variable(
    {
        fulfilled: d => {
            console.log("Created circle ", d)

            // d3.select("mysvgnode")
            // svg.selectAll("circle")
            //      .data([d])
            //     .join('circle')
            //     .attr('cx',10)
            //     .attr('cy', 10)
            //     .attr('r',x=>x)
            //     .attr("fill","grey")

            // document.getElementById("everything").appendChild(node);
        }
    }
).define("radius", 10);
module.variable(new Inspector(document.getElementById("hello"))).define(["md", "html", "htl", "radius"], (md, html, htl, r) => {
    window.md = md;
    var x = (
        md`# Testing Markdown internally
    \n Radius is **${r}**

    `
    )
    var mydiv = document.createElement("div");
    // var mydiv=d3.select("div")
    // mydiv.append(x)
    var y = html`<p>New dummy html</p>`
    mydiv.append(x);
    mydiv.append(y);
    // console.log("After parsing ", x, typeof x)
    // console.log("After parsing ", y, typeof y)
    // console.log("html", html)
    // console.log("htl",htl,htl.html(`<h2>HEY</h2`));

    return mydiv;
});
// module.variable(new Inspector(document.getElementById("hello"))).define("markdown",`md"#Title"`)
function AppendInto(elemid) {
    return {

        fulfilled: d => {
            // console.log("RENDERING variable b/cumsum is ", d);
            var node = document.createElement("div");
            document.getElementById(elemid).appendChild(node);
            const inspector = new Inspector(node);
            inspector.fulfilled(d);

        }
    }
}


const b = module.variable(
    {
        pending: d => {
            // console.log("pending.. ", d);
        },
        fulfilled: d => {


            var node = document.getElementById("everything");
            const inspector = new Inspector(node);
            inspector.fulfilled(d);
            var cscale = d3.scaleOrdinal(d, d3.schemeCategory10);
            // console.log(cscale)
            svg.selectAll("circle")
                .data(d)
                .join('circle')
                .attr('cx', x => x)
                .attr('cy', x => x)
                .attr('r', x => x)
                .attr("opacity", 0.5)
                .attr("fill", x => cscale(x))

        },
        rejected: e => {
            console.log("Error ", e)
        }

    });
b.define("cumsum", ["iarray", "radius"], d => d3.cumsum(d));

// // module.variable().define("updateRadius", ["radius"], d => d);
document.getElementById("myRange").onchange = function (event) {
    // module.variable().redefine("a", this.value);
    radius.define("radius", this.value);

}

//https://wilessapi.appspot.com/geom/hexrandu
// http pie.dev/post hello=world
// https://api.github.com/search/repositories q==httpie per_page==1
var req = {
    method: "POST", body:
        JSON.stringify({
            title: 'Hello',
            body: '_d3-fetch_ is it',
            userId: 1,
            friends: [2, 3, 4]
        })
};
// https://pie.dev/post

var url = new URL("https://api.github.com/search/repositories")
url.searchParams.append("q", "wiless")
url.searchParams.append("per_page", 1)
var jsonreq = new Request(url); //"https://api.github.com/search/repositories?q=httpie"
d3.json(jsonreq).then(v => {
    // console.log(v);
    // var obj = JSON.parse(v.headers);
    module.variable(AppendInto("bslocations")).define("bslocations", v);
}
)


document.getElementById("somenumber").onchange = function (event) {
    var arrOfStr = this.value.split(",")
    const arrOfNum = arrOfStr.map(str => {
        return Number(str);
    });
    //module.value("cumsum").then(d=>console.log("VALUE in the module done.. : ",d ));
    console.log(this.value, arrOfNum);


    // module.variable().redefine("a", this.value);
    a.define("iarray", arrOfNum);

}

// // var md = {};
// module.value("md").then(d =>
//     // console.log("Found Markdown", d)
//     // console.log("Testing Markdown", d`# Hello World`)
//     window.md = d
// );
// module.value("tex").then(d => {
//     console.log("Found TEX", d)
//     console.log("Testing Tex ", d`E = mc^2`)
//     // window.tex = d
// }
// );


document.getElementById("generateMap").onclick = renderMap

document.getElementById("parseMD").onclick = () => {
    var value;
    value = document.getElementById("command").value;
    document.getElementById("hello").appendChild(md`## Repo Name \n The repo is **${value}**`)
    value = document.getElementById("scripttext").value;
    // document.getElementById("hello").appendChild(tex`E = mc^2`)
    document.getElementById("hello").appendChild(tex`${value}`)
    document.getElementById("hello").appendChild(UInumber([], { unit: "dBm", label: "Transmit power of the basestation ", name: "txpower", postcall: (d, u) => d + u }));

}


document.getElementById("command").onkeydown = function (event) {

    if (event.keyCode == 13) {
        console.log(event);
        if (event.ctrlKey == true || event.altKey == true) {
            console.log(event);

            return false;
        }
    }

    return true;

}




function getCardInspector(varname, infotext) {
    var htmlstring = ` <div class="ui card">
        <div class="image">
            <img src="">
        </div>
        <div class="content">
            <a class="header">${r}</a>
            <!-- <div class="meta">
                <span class="date">Joined in 2013</span>
            </div> -->
            <div class="slidecontainer">
                <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
            </div>
            <div class="description">Kristy is an art director living in New York.
                <div id="svgdom"></div>
            </div>
        </div>
        <div class="extra content">
            <a>
                <i class="user icon"></i> 22 Friends
            </a>
        </div>
    </div>`
    return {

    }
}

// import {  } from "module";
// import * as turf from "https://unpkg.com/@turf/turf@6/turf.min.js"
// {/* <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js" */ }

var AP30B_esurl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRNeZ7zXn42RaeRlzaCa_VUJy_hkbAzn4bqgfdRLPVL8A1_ediqeykyujQmH-pWTSW-6qTiPZDfL4Yu/pub?gid=314408490&single=true&output=csv";
var EStopojson = {};
var AP30B_es = {};
d3.csv(AP30B_esurl, d3.autoType).then(d => {
    AP30B_es = d;

    var appoints = d3.map(AP30B_es, (d) =>
        turf.point([d.LONGITUDE, d.LATITUDE], { Gain: d.GAIN, Antenna: d.ANTENNA })
    );
    EStopojson = turf.featureCollection(appoints);
}
);


// var EStopojson = () => {
//     var appoints = d3.map(AP30B_es, (d) =>
//         turf.point([d.LONGITUDE, d.LATITUDE], { Gain: d.GAIN, Antenna: d.ANTENNA })
//     );
//     return turf.featureCollection(appoints);
// }

function renderMap() {
    console.log("clicked");
    var lng = 79.579381;
    var lat = 22.004174;
    var z = 5;
    var Indiacenter = [lng, lat];
    // var width = "100%";

    // const container = document.createElement("div");
    // container.setAttribute("style", `width:${width}px; height:450px`)
    // });
    var container = document.getElementById("map")
    // yield container;
    // document.getElementById("map").appendChild(container);
    // console.log("Found container", container)
    let map = L.map(container).setView([lat, lng], z);
    var attr = {
        attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
    var baselayer = L.tileLayer(
        "https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}@2x.png",
        { minZoom: 1, maxZoom: 18, ...attr }
    );
    baselayer.addTo(map);

    //
    // var myIcon = L.icon({
    //   // iconUrl: "my-icon.png",
    //   iconSize: [38, 95],
    //   iconAnchor: [22, 94],
    //   popupAnchor: [-3, -76],
    //   shadowUrl: "my-icon-shadow.png",
    //   shadowSize: [68, 95],
    //   shadowAnchor: [22, 94]
    // });
    // var newicon = { ...L.Icon.Default.prototype.options, iconSize: [18, 35] };
    L.Icon.Default.prototype.options.iconSize = [15, 15];
    L.Icon.Default.prototype.options.shadowSize = [17, 17];
    // shadowSize: [68, 95],
    let AP30BesLayer = L.geoJson(EStopojson, {
        // weight: 1,
        // color: "#FEE",
        style: function (feature) {
            var mycolor = feature.properties.Antenna == "AP30B" ? "red" : "green";
            //   console.log(feature.properties.Antenna, mycolor);
            return {
                // fillColor: "blue",
                color: "white",
                stroke: false,
                fillColor: mycolor
            };
        },
        pointToLayer: (geoJsonPoint, latlng) => {
            // return L.marker(latlng, { icon: newicon }); //.addTo(map);
            //   console.log("geospoint", geoJsonPoint);
            return L.circleMarker(latlng, { radius: 5 }); // .addTo(map)

            // return L.point(latlng); // L.marker(latlng);
        }
    });
    AP30BesLayer.bindPopup((layer) => {
        // console.log(layer.feature.properties);
        return "Ant Type : " + layer.feature.properties.Antenna.toString();
    }).addTo(map);
    map.fitBounds(AP30BesLayer.getBounds());

    // var baseLayers = {
    //   Mapbox: "mapbox",
    //   OpenStreetMap: "osm"
    // };

    // var overlays = {
    //   Marker: "marker",
    //   Roads: AP30BesLayer
    // };
    var baseonly = {
        Base: baselayer
        // AP30B: AP30BesLayer
    };
    var basewithAP30B = {
        Base1: baselayer,
        AP30B: AP30BesLayer
    };

    L.control
        .layers()
        .addBaseLayer(baselayer, "BASE")
        .addOverlay(AP30BesLayer, "ap30b")
        .addTo(map);
    // const map = L.map(container); ///, { center: Indiacenter, zoom: 10 });
    // map.setView(Indiacenter);
    // L.tileLayer(
    //   "https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{lng}/{lat}@2x.png",
    //   { minZoom: 1, maxZoom: 18 }
    // ).addTo(map);
}

// /p2108.js
import { default as p2108 } from "./p2108.js";

// import define from "https://api.observablehq.com/@observablehq/hello-world.js?v=3";
// var L_ces = null;
// const modP2108 = runtime.module(p2108, Inspector.into(document.getElementById("p2108model")));
const modP2108 = runtime.module(p2108, varname => {
    // console.log(varname);
    if (varname === "viewof Inps3") {
        // console.log("inside viewof ", varname);
        return appendInspect("p2108model")
        // return new Inspector(document.getElementById("p2108model"))
    }

    if (varname == "Inps3") {
        // console.log("inside Inps3 ", varname);
        var name = varname;
        return {
            pending: () => {
                // console.log(`${name}: pending`);
            },
            fulfilled: (v) => {
                // console.log("Is it null ? ", v);
                if (window.L_ces != null) {

                    var result = L_ces(v[0], v[1], v[2]);
                    // console.log(`VARIABLE ${name}: i am fullfilled`, v, result);
                    var mydiv = d3.select("#p2108model").selectAll("div#result").data([result]).join("div").attr("id", "result")
                    new Inspector(mydiv.node()).fulfilled(result);
                }
                // var mydiv = document.createElement("div");
                // var mydiv = d3.selectAll("#p2108model div").join("div").text("hello")
                // console.log("mydiv is ", mydiv.node())

                // document.getElementById("p2108model").appendChild(mydiv);
                // mydiv.innerHTML = result
                // var v = value;
                // if (window.L_ces != null) {
                //     var result = window.L_ces(v[0], v[1], v[2]);
                //     // new Inspector(mydiv).fulfilled("Hello");
                //     // const inspector = new Inspector(mydiv);
                //     // inspector.fulfilled(result);
                //     console.log(result)
                //     //document.getElementById(rootelem).appendChild(mydiv);
                // } else {
                //     console.log("its null");
                // }
                // console.log(`SECOND time ${name}: fullfilled`, v);
            },
            rejected: (error) => {
                console.error(`${name}: rejected`, error);
            }

        }

        // return new Inspector(document.getElementById("p2108model"))
    }

    if (varname == "L_ces") {
        return {
            fulfilled: v => {
                window.L_ces = v;
                // console.log(`Value of ${varname} is ${v}`);
            }
        }
    }
});

function appendInspect(rootelem) {
    var mydiv = document.createElement("div");
    document.getElementById(rootelem).appendChild(mydiv);
    return new Inspector(mydiv)
}

document.getElementById("btnp2108").onclick = () => {
    // p2108.

    // console.log("module loaded");
}

// const main = runtime.module(define, name => {
//   if (name === "hello") {
//     const node = document.createElement("DIV");
//     document.body.appendChild(node);
//     return new Inspector(node);
//   }
// });


// IMPORT wiless units
import { default as wiless } from "https://api.observablehq.com/@wiless/units.js?v=3";
// import { default as p2108 } from "./p2108.js";
var wilessunitsobs = (varname) => {

    if (varname == "genericInput") {
        // console.log("NAME :", varname);
        return {
            fulfilled: v => {
                // console.log(`fulfilled: ${varname} : ${v}`);
                window.UIinput = v;
            }
        }
    }
    if (varname == "UIInputs") {
        // console.log("NAME :", varname);
        return {
            fulfilled: v => {
                console.log(`fulfilled: ${varname} : ${v}`);
                window.UIInputs = v;
            }
        }
    }
    if (varname == "number") {
        // console.log("NAME :", varname);
        return {
            fulfilled: v => {
                // console.log(`fulfilled: ${varname} : ${v}`);
                window.UInumber = v;
            }
        }
    }
    if (varname == "range") {
        // console.log("NAME :", varname);
        return {
            fulfilled: v => {
                window.UIrange = v;
            }
        }
    }
}

var wilessunits = runtime.module(wiless, wilessunitsobs);

// wilessunits.variable().define(null, ["radio"], v => { console.log("caught you ", v); window.UInumber = v });

// var uinum = wilessunits.variable().define(["number"], (r1) => {
//     console.log("render number", r1);
//     // console.log("render2", r2);
//     // console.log("MD is", m);
//     // window.md = m;
//     window.UInumber = r1;
// });
