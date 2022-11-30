import define1 from "./c71c56e1141f5a7f@282.js";

function _1(md){return(
md`# Loss Calculation Function for P.452`
)}

function _los_prop(specific_atten_dryair11,specific_atten_water11){return(
function los_prop(p, f, dlt, dlr, dtot, pressure, temp, BETAo, omega){
  let rho = 7.5 + 2.5 * omega
  let gammao = specific_atten_dryair11(f, pressure, rho, temp + 273.15)
  let gammaw = specific_atten_water11(f, pressure, rho, temp + 273.15)
  let Ag = (gammao + gammaw) * dtot
  let L_bfsg = 92.5 + 20 * Math.log(f) / Math.log(10) + 20 * Math.log(dtot) / Math.log(10) + Ag
  let E_sp = 2.6 * (1 - Math.exp(-0.1 * (dlt + dlr))) * Math.log(p / 50) / Math.log(10)
  let los_prop_1 = L_bfsg + E_sp
  let E_sbeta = 2.6 * (1 - Math.exp(-0.1 * (dlt + dlr))) * Math.log(BETAo / 50) / Math.log(10)
  let los_prop_2= L_bfsg + E_sbeta
  const arr=[los_prop_1,los_prop_2,L_bfsg]
  return arr
  
}
)}

function _troposcatter_prop(specific_atten_dryair11,specific_atten_water11){return(
function troposcatter_prop(p, f, dtot, pressure, temp, theta, N0, Gt, Gr){
  let rho = 3
  let gammao = specific_atten_dryair11(f, pressure, rho, temp + 273.15)
  let gammaw = specific_atten_water11(f, pressure, rho, temp + 273.15)
  let Ag = (gammao + gammaw) * dtot//total gaseous atten (dB)
  let Lf = 25 * Math.log(f) / Math.log(10) - 2.5 * Math.pow((Math.log(f / 2) / Math.log(10)) , 2)//frequency dependent loss (dB)
  let Lc = 0.051 * Math.exp(0.055 * (Gt + Gr))
  return 190 + Lf + 20 * Math.log(dtot) / Math.log(10) + 0.573 * theta - 0.15 * N0 + Lc + Ag - 10.1 * Math.pow((-1 * Math.log(p / 50) / Math.log(10)) , 0.7 )
}
)}

function _Diffraction_Master(){return(
function Diffraction_Master(p, f, DELTA_N, hrs, hts, L_bfsg, L_b0p, BETAo, d, h, Index1, Index2, hstd, hsrd){
  
  
}
)}

function _5(md){return(
md`This function implements section 4.2 of Recommendation p.452-16.
Diffraction loss calculated by the combination of the Bullington construction and spherical-Earth diffraction.`
)}

function _7(md){return(
md`## Dependencies`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("los_prop")).define("los_prop", ["specific_atten_dryair11","specific_atten_water11"], _los_prop);
  main.variable(observer("troposcatter_prop")).define("troposcatter_prop", ["specific_atten_dryair11","specific_atten_water11"], _troposcatter_prop);
  main.variable(observer("Diffraction_Master")).define("Diffraction_Master", _Diffraction_Master);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _7);
  const child1 = runtime.module(define1);
  main.import("specific_atten_dryair11", child1);
  main.import("specific_atten_water11", child1);
  return main;
}
