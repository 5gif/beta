function _1(md){return(
md`# Free Space Elevation to Apparent Elevation Angle Conversion`
)}

function _conv_free_to_app(){return(
function conv_free_to_app(free_deg,height_km){
  let T_fs1=1.728 + 0.5411*free_deg + 0.03723*free_deg*free_deg
  let T_fs2=0.1815 + 0.06272*free_deg + 0.01380*free_deg*free_deg
  let T_fs3= 0.01727 + 0.008288*free_deg
  let app= free_deg+ 1/(T_fs1+T_fs2*height_km+height_km*height_km*T_fs3)
  return app
}
)}

function _3(conv_free_to_app){return(
conv_free_to_app(8,2)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("conv_free_to_app")).define("conv_free_to_app", _conv_free_to_app);
  main.variable(observer()).define(["conv_free_to_app"], _3);
  return main;
}
