import define1 from "./76d3d1a9f5e4d386@399.js";
import define2 from "./6e21cf72e679c4c1@13.js";
import define3 from "./25b74589d994abea@335.js";
import define4 from "./70962b6428dcf2b1@35.js";

function _1(md){return(
md`# P.619`
)}

function _2(md){return(
md`### Basic transmission loss for single-entry interference`
)}

function _3(md){return(
md`The clear-air basic transmission loss not exceeded for 𝑝% time for a single unwanted transmitter and 
victim receiver over an Earth-space path is composed of losses described as follows`
)}

function _screenshot92(FileAttachment){return(
FileAttachment("Screenshot (92)@1.png").image()
)}

function _5(md){return(
md`#### Inputs`
)}

function _Frequency_GHz(Inputs){return(
Inputs.number([0.01, Infinity], {step: 0.01, label: "Frequency_GHz", value:30})
)}

function _7(md){return(
md`##### Satellite Parameters`
)}

function _station_alt(Inputs){return(
Inputs.number([0.01, Infinity], {step: 0.01, label: "space station height (km)",value:100})
)}

function _sat_lat(Inputs){return(
Inputs.number([-90, 90], {step: 0.01, label: "Latitude of sub-satellite point",value:23})
)}

function _sat_lon(Inputs){return(
Inputs.number([-180, 180], {step: 0.01, label: "Longitude of sub-satellite point",value:24})
)}

function _11(md){return(
md`##### Earth Station Parameters`
)}

function _Earth_alt(Inputs){return(
Inputs.number([0.01, Infinity], {step: 0.01, label: "Earth station height (km)"})
)}

function _Earth_lat(Inputs){return(
Inputs.number([-90, 90], {step: 0.01, label: "Latitude of Earth Station",value:24})
)}

function _Earth_lon(Inputs){return(
Inputs.number([-180, 180], {step: 0.01, label: "Longitude of Earth Station",value:23})
)}

function _15(md){return(
md`### Free space basic transmission loss`
)}

function _16(free_space_att,station_alt,Earth_alt,sat_lat,sat_lon,Earth_lat,Earth_lon,Frequency_GHz){return(
free_space_att(station_alt,Earth_alt,sat_lat,sat_lon,Earth_lat,Earth_lon,Frequency_GHz)
)}

function _17(md){return(
md`### Beam Spreading Loss`
)}

function _18(md){return(
md`### Atmospheric Gases loss`
)}

function _19(md){return(
md`### Earth-space and Aeronautical statistical clutter loss`
)}

function _21(md){return(
md`### Clear-air basic transmission loss for multiple-entry interference`
)}

function _22(md){return(
md`The clear-air basic transmission loss not exceeded for 𝑝% of the time for each unwanted transmitter 
in a multiple-entry Earth-space interference calculation is composed of losses`
)}

function _screenshot93(FileAttachment){return(
FileAttachment("Screenshot (93).png").image()
)}

function _Frequency_GHz_multi(Inputs){return(
Inputs.number([10, 100], {step: 0.01, label: "Frequency_GHz",value:30})
)}

function _Clut_Plc(Inputs){return(
Inputs.number([0.1, 100], {step: 0.01, label: "Clutter Loss Percent",value:10})
)}

function _Distance_3d(Inputs){return(
Inputs.number({label:"3d Distance (km)",value:120})
)}

function _Elevation_angle_deg(Inputs){return(
Inputs.range([0, 90], {step: 0.01, label: "Elevation Angle (deg)"})
)}

function _Earth_Station_Height(Inputs){return(
Inputs.number([0, 10], {step: 0.01, label: "Earth Station Height (km)",value:2})
)}

function _surf_water_vapour_density(Inputs){return(
Inputs.range([0, 15], {step: 0.1, label:"Surface water vapour density (grams per cubic meter)"})
)}

function _30(md){return(
md`Free Space basic Transmission loss`
)}

function _Free_loss(Frequency_GHz_multi,Distance_3d){return(
92.45 + 20*Math.log10(Frequency_GHz_multi*Distance_3d)
)}

function _32(md){return(
md`Earth-space and Aeronautical statistical clutter loss`
)}

function _Clut_loss(L_ces,Frequency_GHz_multi,Elevation_angle_deg,Clut_Plc){return(
L_ces(Frequency_GHz_multi,Elevation_angle_deg,Clut_Plc)
)}

function _34(md){return(
md`Beam Spreading loss`
)}

function _beam_loss(get_Beam_spreading_loss,Earth_Station_Height,Elevation_angle_deg){return(
get_Beam_spreading_loss(Earth_Station_Height,Elevation_angle_deg,"Earth to space")
)}

function _36(md){return(
md`Free Space Elevation Angle to Apparent Elevation Angle Conversion`
)}

function _38(md){return(
md`Apparent_Elevation (deg)`
)}

function _Apparent_Elevation(conv_free_to_app,Elevation_angle_deg,Earth_Station_Height){return(
conv_free_to_app(Elevation_angle_deg,Earth_Station_Height)
)}

function _40(md){return(
md`losses due to atmospheric gases (dB)`
)}

function _41(get_atmospheric_gasses_loss,Apparent_Elevation,surf_water_vapour_density,Earth_Station_Height,Frequency_GHz_multi){return(
get_atmospheric_gasses_loss(Apparent_Elevation,surf_water_vapour_density,Earth_Station_Height,Frequency_GHz_multi*1000)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Screenshot (92)@1.png", {url: new URL("./files/5c65f86285bcd38f02df34200567877299ff0bd5c34a872c7be80ab17b7076e49c4a2293ce93930c2d55bb166a040367d7dbecd4c227bf678fd58e7f6138a6f6.png", import.meta.url), mimeType: "image/png", toString}],
    ["Screenshot (93).png", {url: new URL("./files/7c5d1f0a74f72bb4bfdd62c5ed89c66d1291d35ea4ecda46accad1fc3aed4e09038683d440a07e248d2cbabedd41bbb50bdbf57dfeb2d54a2172608a51c18c62.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("screenshot92")).define("screenshot92", ["FileAttachment"], _screenshot92);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof Frequency_GHz")).define("viewof Frequency_GHz", ["Inputs"], _Frequency_GHz);
  main.variable(observer("Frequency_GHz")).define("Frequency_GHz", ["Generators", "viewof Frequency_GHz"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof station_alt")).define("viewof station_alt", ["Inputs"], _station_alt);
  main.variable(observer("station_alt")).define("station_alt", ["Generators", "viewof station_alt"], (G, _) => G.input(_));
  main.variable(observer("viewof sat_lat")).define("viewof sat_lat", ["Inputs"], _sat_lat);
  main.variable(observer("sat_lat")).define("sat_lat", ["Generators", "viewof sat_lat"], (G, _) => G.input(_));
  main.variable(observer("viewof sat_lon")).define("viewof sat_lon", ["Inputs"], _sat_lon);
  main.variable(observer("sat_lon")).define("sat_lon", ["Generators", "viewof sat_lon"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof Earth_alt")).define("viewof Earth_alt", ["Inputs"], _Earth_alt);
  main.variable(observer("Earth_alt")).define("Earth_alt", ["Generators", "viewof Earth_alt"], (G, _) => G.input(_));
  main.variable(observer("viewof Earth_lat")).define("viewof Earth_lat", ["Inputs"], _Earth_lat);
  main.variable(observer("Earth_lat")).define("Earth_lat", ["Generators", "viewof Earth_lat"], (G, _) => G.input(_));
  main.variable(observer("viewof Earth_lon")).define("viewof Earth_lon", ["Inputs"], _Earth_lon);
  main.variable(observer("Earth_lon")).define("Earth_lon", ["Generators", "viewof Earth_lon"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["free_space_att","station_alt","Earth_alt","sat_lat","sat_lon","Earth_lat","Earth_lon","Frequency_GHz"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  const child1 = runtime.module(define1);
  main.import("L_ces", child1);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("screenshot93")).define("screenshot93", ["FileAttachment"], _screenshot93);
  main.variable(observer("viewof Frequency_GHz_multi")).define("viewof Frequency_GHz_multi", ["Inputs"], _Frequency_GHz_multi);
  main.variable(observer("Frequency_GHz_multi")).define("Frequency_GHz_multi", ["Generators", "viewof Frequency_GHz_multi"], (G, _) => G.input(_));
  main.variable(observer("viewof Clut_Plc")).define("viewof Clut_Plc", ["Inputs"], _Clut_Plc);
  main.variable(observer("Clut_Plc")).define("Clut_Plc", ["Generators", "viewof Clut_Plc"], (G, _) => G.input(_));
  main.variable(observer("viewof Distance_3d")).define("viewof Distance_3d", ["Inputs"], _Distance_3d);
  main.variable(observer("Distance_3d")).define("Distance_3d", ["Generators", "viewof Distance_3d"], (G, _) => G.input(_));
  main.variable(observer("viewof Elevation_angle_deg")).define("viewof Elevation_angle_deg", ["Inputs"], _Elevation_angle_deg);
  main.variable(observer("Elevation_angle_deg")).define("Elevation_angle_deg", ["Generators", "viewof Elevation_angle_deg"], (G, _) => G.input(_));
  main.variable(observer("viewof Earth_Station_Height")).define("viewof Earth_Station_Height", ["Inputs"], _Earth_Station_Height);
  main.variable(observer("Earth_Station_Height")).define("Earth_Station_Height", ["Generators", "viewof Earth_Station_Height"], (G, _) => G.input(_));
  main.variable(observer("viewof surf_water_vapour_density")).define("viewof surf_water_vapour_density", ["Inputs"], _surf_water_vapour_density);
  main.variable(observer("surf_water_vapour_density")).define("surf_water_vapour_density", ["Generators", "viewof surf_water_vapour_density"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("Free_loss")).define("Free_loss", ["Frequency_GHz_multi","Distance_3d"], _Free_loss);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("Clut_loss")).define("Clut_loss", ["L_ces","Frequency_GHz_multi","Elevation_angle_deg","Clut_Plc"], _Clut_loss);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("beam_loss")).define("beam_loss", ["get_Beam_spreading_loss","Earth_Station_Height","Elevation_angle_deg"], _beam_loss);
  main.variable(observer()).define(["md"], _36);
  const child2 = runtime.module(define2);
  main.import("conv_free_to_app", child2);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("Apparent_Elevation")).define("Apparent_Elevation", ["conv_free_to_app","Elevation_angle_deg","Earth_Station_Height"], _Apparent_Elevation);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["get_atmospheric_gasses_loss","Apparent_Elevation","surf_water_vapour_density","Earth_Station_Height","Frequency_GHz_multi"], _41);
  const child3 = runtime.module(define3);
  main.import("get_Beam_spreading_loss", child3);
  main.import("get_atmospheric_gasses_loss", child3);
  const child4 = runtime.module(define4);
  main.import("free_space_att", child4);
  return main;
}
