import define1 from "./c71c56e1141f5a7f@282.js";
import define2 from "./0ee5e780f63b3348@466.js";
import define3 from "./a35a4324138ec418@28.js";

function _1(md){return(
md`# ITU-R P.452`
)}

function _2(md){return(
md`This recommendation contains a prediction method for the evaluation of interference between stations on 
the surface of the Earth at frequencies from about 0.1 GHz to 50 GHz, accounting for both clear-air and 
hydrometeor scattering interference mechanisms

The models within Recommendation ITU-R P.452 are designed to calculate propagation losses not 
exceeded for time percentages over the range 0.001  p  50%. This assumption does not imply the 
maximum loss will be at p = 50%`
)}

function _3(md){return(
md`## Interference propagation mechanisms`
)}

function _screenshot20220812235757(FileAttachment){return(
FileAttachment("Screenshot 2022-08-12 235757.png").image()
)}

function _screenshot20220812235849(FileAttachment){return(
FileAttachment("Screenshot 2022-08-12 235849.png").image()
)}

function _screenshot20220812235932(FileAttachment){return(
FileAttachment("Screenshot 2022-08-12 235932.png").image()
)}

function _screenshot20220813000001(FileAttachment){return(
FileAttachment("Screenshot 2022-08-13 000001.png").image()
)}

function _screenshot20220813000041(FileAttachment){return(
FileAttachment("Screenshot 2022-08-13 000041.png").image()
)}

function _9(md){return(
md`## Inputs`
)}

function _Pressure(Inputs){return(
Inputs.range([900, 1100], {label: "Pressure (hPa)", step: 1,value:1013})
)}

function _Temp(Inputs){return(
Inputs.range([0, 50], {label:"Temperature(°C)", step: 1,value:15})
)}

function _Transmitter_lat(Inputs){return(
Inputs.number([-90, 90], {step: 0.01, label: "Latitude of Transmitter (interferer)",value:51.2})
)}

function _hgt(Inputs){return(
Inputs.number([0, 90], {step: 0.01, label: "Transmitter Antenna Height (m)",value:10})
)}

function _Receiver_lat(Inputs){return(
Inputs.number([-90, 90], {step: 0.01, label: "Latitude of Receiver (Interfered with)",value:50.73})
)}

function _hgr(Inputs){return(
Inputs.number([0, 90], {step: 0.01, label: "Receiver Antenna Height (m)",value:10})
)}

function _Delta_N(Inputs){return(
Inputs.number([30, 90], {step: 0.01, label: "ΔN (the refractive index lapse-rate over the first 1 km of the atmosphere)",value:53})
)}

function _f(Inputs){return(
Inputs.number([30, 90], {step: 0.01, label: "Frequency (GHz)",value:50})
)}

function _N0(Inputs){return(
Inputs.number([200, 400], {step: 0.01, label: "N0 (N-units), the sea-level surface refractivity.",value:238})
)}

function _Gt(Inputs){return(
Inputs.number([0, 100], {step: 0.01, label: "Transmitting antenna gain in the direction of the horizon along the great-circle interference path (dBi)",value:20})
)}

function _Gr(Inputs){return(
Inputs.number([0, 100], {step: 0.01, label: "Receiving antenna gain in the direction of the horizon along the great-circle interference path (dBi)",value:5})
)}

function _p(Inputs){return(
Inputs.range([0, 100], {label: "Time Percentage (p)", step: 0.01,value:0.01})
)}

function _22(md){return(
md`The `
)}

function _23(md){return(
md`### Importing Path Data`
)}

function _pathdata(FileAttachment){return(
FileAttachment("PathData@2.csv").csv({typed:true})
)}

function _25(Inputs,pathdata){return(
Inputs.table(pathdata,{width:500})
)}

function _26(d3,pathdata,Plot)
{
  var zones=Array.from(new Set(d3.map(pathdata,d=>d.Zone)))
return Plot.plot( {y:{grid:true}, color:{legend:true,label:"Zone"}, marks:[Plot.areaY(pathdata,{x:"Distance",y:"Height",opacity:0.5}),
                                                                           d3.map(zones,z=>
                                                                           Plot.lineY(pathdata,{x:"Distance",y:d=>d.Zone==z?d.Height:null,z:"Zone",sort:"Zone"}))]})  
}


function _27(md){return(
md`### Path Analysis`
)}

function _28(md){return(
md`Values for a number of path-related parameters necessary for the calculations must be derived via an initial analysis of the path profile`
)}

function _29(md){return(
md`path analysis function implemented in https://observablehq.com/@gurazeez16/path-analysis`
)}

function _path(Path_Analysis,pathdata,Delta_N,hgt,hgr){return(
Path_Analysis(pathdata,Delta_N,hgt,hgr)
)}

function _31(md){return(
md`#### Output parameters`
)}

function _32(md){return(
md`Effective earth Radius (km)`
)}

function _a_e(path){return(
path[0]
)}

function _34(md){return(
md`Total great circle path distance between the terminals (km)`
)}

function _dtot(path){return(
path[1]
)}

function _36(md){return(
md`Transmitting (interferer) antenna height amsl (m)`
)}

function _hts(path){return(
path[2]
)}

function _38(md){return(
md`Receiving (interfered with) antenna height amsl (m)`
)}

function _hrs(path){return(
path[3]
)}

function _40(md){return(
md`horizontal elevation angle (above local horizontal)at TX ant (mrad)`
)}

function _theta_t(path){return(
path[4]
)}

function _42(md){return(
md`horizontal elevation angle (above local horizontal)at RX ant (mrad)`
)}

function _theta_r(path){return(
path[5]
)}

function _44(md){return(
md`Earth centered, angular distance between TX & RX ants (mrad)`
)}

function _theta(path){return(
path[6]
)}

function _46(md){return(
md`height of the smooth-earth surface (amsl) at TX station (m)`
)}

function _hst(path){return(
path[7]
)}

function _48(md){return(
md`height of the smooth-earth surface (amsl) at RX station (m)
`
)}

function _hsr(path){return(
path[8]
)}

function _50(md){return(
md`terrain roughness parameter (m)`
)}

function _m(path){return(
path[9]
)}

function _52(md){return(
md`effective height of TX ant (m)`
)}

function _hte(path){return(
path[10]
)}

function _54(md){return(
md`Effective Height of RX ant (m)`
)}

function _hre(path){return(
path[11]
)}

function _56(md){return(
md`great circle distance from TX ant to its horizon point (km)`
)}

function _dlt(path){return(
path[12]
)}

function _58(md){return(
md`great circle distance from RX ant to its horizon point (km)`
)}

function _dlr(path){return(
path[13]
)}

function _60(md){return(
md`Fraction of path over water`
)}

function _omega(sea_fraction,pathdata){return(
sea_fraction(pathdata)
)}

function _62(md){return(
md`the % time that the refractivity gradient (DELTA-N) exceeds 100 N-units/km in the first 100m of the lower atmosphere.`
)}

function _BETAo(beta0_calc,theta){return(
beta0_calc(theta,34.5,6)
)}

function _64(md){return(
md`# Clear Air Propagation Models`
)}

function _65(md){return(
md`#### Line-of-sight propagation (including short-term effects) (Section 4.1 of Rec p.452-16)`
)}

function _los(los_prop,f,dlt,dlr,dtot,Pressure,Temp,omega){return(
los_prop(0.2, f, dlt, dlr, dtot, Pressure, Temp, 3.28, omega)
)}

function _67(md){return(
md`#### Basic transmission loss due to free-space propagation and attenuation by atmospheric gases:`
)}

function _L_bfsg(los){return(
los[2]
)}

function _69(md){return(
md`#### Basic transmission loss not exceeded for time percentage, p%, due to LoS propagation`
)}

function _L_b0p(los){return(
los[0]
)}

function _71(md){return(
md`#### Basic transmission loss not exceeded for time percentage, p%, due to LoS propagation (regardless of whether or not the path is actually LoS):`
)}

function _L_b0beta(los){return(
los[1]
)}

function _73(md){return(
md`#### basic transmission loss due to troposcatter effects Loss is not exceeded for p% of the time (p<=50%). This loss needs to be calculated for transhorizon paths`
)}

function _L_bs(troposcatter_prop,p,f,dtot,Pressure,Temp,theta,N0,Gt,Gr){return(
troposcatter_prop(p, f, dtot, Pressure, Temp, theta, N0, Gt, Gr)
)}

function _75(md){return(
md`#### basic transmission loss due to ducting and atmospheric layer reflection/refraction losses. This loss needs to be calculated for transhorizon paths`
)}

function _L_ba(anomalous_prop,p,f,dtot,Pressure,Temp,Delta_N,dlt,dlr,theta_t,theta_r,hts,hrs,hte,hre,omega){return(
anomalous_prop(p, f, dtot, Pressure, Temp, Delta_N, 3.28, 6, dlt, dlr, theta_t, theta_r, hts, hrs, hte, hre, 119.52, omega, 500, 500)
)}

function _77(md){return(
md`# Overall Final Prediction`
)}

function _78(md){return(
md`Overall Propagation Loss, Lb(p), from the interfering transmitter to the interfered-with receiver.`
)}

function _L_b(overall_predict,p,theta,dtot,BETAo,omega,L_b0p,L_b0beta,L_bs,L_ba){return(
overall_predict(p, theta, dtot, BETAo, omega, L_b0p, L_b0beta, 47.589, 327.20, 249.66, L_bs, L_ba, 0, 0, 0, 1.3119)
)}

function _80(md){return(
md`# Dependencies`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["PathData@2.csv", {url: new URL("./files/bec2522edb92b05e0f5c6bb2a182375ddf8ce1ff9f0e9880d0b032a94ebf5f1f91bd9f26a61ff28872608ac623d96809aa729aceed0795fbac8423d24695ad53.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Screenshot 2022-08-12 235757.png", {url: new URL("./files/44cb28036eb7fa029b1729b66ff43eba6c572c3fce0f264a18168d801c1d284c7f7139c28e6a6ad423a098696cae762ce2cbd3f944a647dd3092ef9bf3c18287.png", import.meta.url), mimeType: "image/png", toString}],
    ["Screenshot 2022-08-12 235849.png", {url: new URL("./files/eb2b8fc53654e9b22aa94b00e7a0a69a3d53b8b8a536ebeb4f90212001695d0766536429262de0906a5b2648006b3b5311dac22f8384e7c5a295967041f96a13.png", import.meta.url), mimeType: "image/png", toString}],
    ["Screenshot 2022-08-12 235932.png", {url: new URL("./files/403e485160ba9227d11b0a8da9dba8d712b234df95f393cf5b78937a0039273423ddf005220223f1aaaea16f4c1144dcd8bac68d4d9651b243b7f23605bd942e.png", import.meta.url), mimeType: "image/png", toString}],
    ["Screenshot 2022-08-13 000001.png", {url: new URL("./files/ecf6a180f3ed53d4c4ce5eee42bbb7792f98213466c80b8f869b0458244f36606ce82ad0f9c2b5ea0316b563208a017ae5ec697df529346af29d05b44ac6d29b.png", import.meta.url), mimeType: "image/png", toString}],
    ["Screenshot 2022-08-13 000041.png", {url: new URL("./files/3c0ea14d6e4c84ceafe626377acee1f62017d04a82e33d1c976311d976423538f087cf7fc5e74437bb896371562eb9178bed58543f5f92ab3414fbdd19041326.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("screenshot20220812235757")).define("screenshot20220812235757", ["FileAttachment"], _screenshot20220812235757);
  main.variable(observer("screenshot20220812235849")).define("screenshot20220812235849", ["FileAttachment"], _screenshot20220812235849);
  main.variable(observer("screenshot20220812235932")).define("screenshot20220812235932", ["FileAttachment"], _screenshot20220812235932);
  main.variable(observer("screenshot20220813000001")).define("screenshot20220813000001", ["FileAttachment"], _screenshot20220813000001);
  main.variable(observer("screenshot20220813000041")).define("screenshot20220813000041", ["FileAttachment"], _screenshot20220813000041);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof Pressure")).define("viewof Pressure", ["Inputs"], _Pressure);
  main.variable(observer("Pressure")).define("Pressure", ["Generators", "viewof Pressure"], (G, _) => G.input(_));
  main.variable(observer("viewof Temp")).define("viewof Temp", ["Inputs"], _Temp);
  main.variable(observer("Temp")).define("Temp", ["Generators", "viewof Temp"], (G, _) => G.input(_));
  main.variable(observer("viewof Transmitter_lat")).define("viewof Transmitter_lat", ["Inputs"], _Transmitter_lat);
  main.variable(observer("Transmitter_lat")).define("Transmitter_lat", ["Generators", "viewof Transmitter_lat"], (G, _) => G.input(_));
  main.variable(observer("viewof hgt")).define("viewof hgt", ["Inputs"], _hgt);
  main.variable(observer("hgt")).define("hgt", ["Generators", "viewof hgt"], (G, _) => G.input(_));
  main.variable(observer("viewof Receiver_lat")).define("viewof Receiver_lat", ["Inputs"], _Receiver_lat);
  main.variable(observer("Receiver_lat")).define("Receiver_lat", ["Generators", "viewof Receiver_lat"], (G, _) => G.input(_));
  main.variable(observer("viewof hgr")).define("viewof hgr", ["Inputs"], _hgr);
  main.variable(observer("hgr")).define("hgr", ["Generators", "viewof hgr"], (G, _) => G.input(_));
  main.variable(observer("viewof Delta_N")).define("viewof Delta_N", ["Inputs"], _Delta_N);
  main.variable(observer("Delta_N")).define("Delta_N", ["Generators", "viewof Delta_N"], (G, _) => G.input(_));
  main.variable(observer("viewof f")).define("viewof f", ["Inputs"], _f);
  main.variable(observer("f")).define("f", ["Generators", "viewof f"], (G, _) => G.input(_));
  main.variable(observer("viewof N0")).define("viewof N0", ["Inputs"], _N0);
  main.variable(observer("N0")).define("N0", ["Generators", "viewof N0"], (G, _) => G.input(_));
  main.variable(observer("viewof Gt")).define("viewof Gt", ["Inputs"], _Gt);
  main.variable(observer("Gt")).define("Gt", ["Generators", "viewof Gt"], (G, _) => G.input(_));
  main.variable(observer("viewof Gr")).define("viewof Gr", ["Inputs"], _Gr);
  main.variable(observer("Gr")).define("Gr", ["Generators", "viewof Gr"], (G, _) => G.input(_));
  main.variable(observer("viewof p")).define("viewof p", ["Inputs"], _p);
  main.variable(observer("p")).define("p", ["Generators", "viewof p"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("pathdata")).define("pathdata", ["FileAttachment"], _pathdata);
  main.variable(observer()).define(["Inputs","pathdata"], _25);
  main.variable(observer()).define(["d3","pathdata","Plot"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("path")).define("path", ["Path_Analysis","pathdata","Delta_N","hgt","hgr"], _path);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("a_e")).define("a_e", ["path"], _a_e);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("dtot")).define("dtot", ["path"], _dtot);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("hts")).define("hts", ["path"], _hts);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("hrs")).define("hrs", ["path"], _hrs);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("theta_t")).define("theta_t", ["path"], _theta_t);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("theta_r")).define("theta_r", ["path"], _theta_r);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("theta")).define("theta", ["path"], _theta);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("hst")).define("hst", ["path"], _hst);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("hsr")).define("hsr", ["path"], _hsr);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("m")).define("m", ["path"], _m);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("hte")).define("hte", ["path"], _hte);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("hre")).define("hre", ["path"], _hre);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("dlt")).define("dlt", ["path"], _dlt);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("dlr")).define("dlr", ["path"], _dlr);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("omega")).define("omega", ["sea_fraction","pathdata"], _omega);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("BETAo")).define("BETAo", ["beta0_calc","theta"], _BETAo);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer()).define(["md"], _65);
  main.variable(observer("los")).define("los", ["los_prop","f","dlt","dlr","dtot","Pressure","Temp","omega"], _los);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer("L_bfsg")).define("L_bfsg", ["los"], _L_bfsg);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("L_b0p")).define("L_b0p", ["los"], _L_b0p);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer("L_b0beta")).define("L_b0beta", ["los"], _L_b0beta);
  main.variable(observer()).define(["md"], _73);
  main.variable(observer("L_bs")).define("L_bs", ["troposcatter_prop","p","f","dtot","Pressure","Temp","theta","N0","Gt","Gr"], _L_bs);
  main.variable(observer()).define(["md"], _75);
  main.variable(observer("L_ba")).define("L_ba", ["anomalous_prop","p","f","dtot","Pressure","Temp","Delta_N","dlt","dlr","theta_t","theta_r","hts","hrs","hte","hre","omega"], _L_ba);
  main.variable(observer()).define(["md"], _77);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer("L_b")).define("L_b", ["overall_predict","p","theta","dtot","BETAo","omega","L_b0p","L_b0beta","L_bs","L_ba"], _L_b);
  main.variable(observer()).define(["md"], _80);
  const child1 = runtime.module(define1);
  main.import("beta0_calc", child1);
  main.import("anomalous_prop", child1);
  const child2 = runtime.module(define2);
  main.import("Path_Analysis", child2);
  main.import("troposcatter_prop", child2);
  main.import("sea_fraction", child2);
  main.import("overall_predict", child2);
  const child3 = runtime.module(define3);
  main.import("los_prop", child3);
  return main;
}
