function _1(md){return(
md`# Free Space att`
)}

function _free_space_att(loss_calc){return(
function free_space_att(H_s,H_t,sat_lat,sat_long,earth_lat,earth_long,Frequency_GHz){
  let R_e=  6372 //Earth's radius(km)
  let R_s= R_e + H_s
  let R_t= R_e + H_t
  let X_1=R_s*Math.cos(sat_lat*Math.PI/180)*Math.cos((sat_long-earth_long)*Math.PI/180)
  let Y_1=R_s*Math.cos(sat_lat*Math.PI/180)*Math.sin((sat_long-earth_long)*Math.PI/180)
  let Z_1=R_s*Math.sin(sat_lat*Math.PI/180)
  let X_2=X_1*Math.sin(earth_lat*Math.PI/180)-Z_1**Math.cos(earth_lat*Math.PI/180)
  let Y_2=Y_1
  let Z_2=Z_1*Math.sin(earth_lat*Math.PI/180)+X_1**Math.cos(earth_lat*Math.PI/180)-R_t
  let Distance=Math.sqrt(X_2*X_2+Y_2*Y_2+Z_2*Z_2)
  return loss_calc(Distance,Frequency_GHz)
}
)}

function _loss_calc(){return(
function loss_calc(Distance,Frequency_GHz){

  let loss=92.45 + 20*Math.log10(Frequency_GHz*Distance)
  return loss
  
}
)}

function _4(free_space_att){return(
free_space_att(100,0,0,0,0,0,30)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("free_space_att")).define("free_space_att", ["loss_calc"], _free_space_att);
  main.variable(observer("loss_calc")).define("loss_calc", _loss_calc);
  main.variable(observer()).define(["free_space_att"], _4);
  return main;
}
