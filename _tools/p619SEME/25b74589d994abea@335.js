import define1 from "./76d3d1a9f5e4d386@399.js";
import define2 from "./6437971c2042ae53@235.js";

function _1(md){return(
md`# ITU-R P.619`
)}

function _2(md){return(
md`## Prediction of beam Spreading Losses`
)}

function _3(md){return(
md`### Inputs For Sample Calculation`
)}

function _get_Beam_spreading_loss(){return(
function get_Beam_spreading_loss(Altitude_km,Elevation_deg,Direction){

  let numerator = .5411 + .07446 * Elevation_deg + Altitude_km * (.06272 + .0276 * Elevation_deg) + Altitude_km ** 2 * .008288
  
  let denominator = (1.728 + .5411 * Elevation_deg + .03723 * Elevation_deg **2 +
                       Altitude_km * (.1815 + .06272 * Elevation_deg + .0138 * Elevation_deg ** 2) +
                       (Altitude_km ** 2) * (.01727 + .008288 * Elevation_deg))**2

  let attenuation = 10 * Math.log10(1 - numerator/denominator)

  if (Direction == "Earth to space"){
        attenuation = -attenuation
  }
  return attenuation
  
}
)}

function _Altitude_km(Inputs){return(
Inputs.range([0, 5], {step: 0.01, label: "Altitude (Km)"})
)}

function _Elevation_deg(Inputs){return(
Inputs.range([0, 10], {step: 0.01, label: "Free Space elevation Angle(degrees)"})
)}

function _Direction(Inputs){return(
Inputs.radio(["Earth to space", "Space to earth"], {label: "Direction", value: "Earth to space"})
)}

function _Beam_Spreading_Loss(get_Beam_spreading_loss,Altitude_km,Elevation_deg,Direction){return(
get_Beam_spreading_loss(Altitude_km,Elevation_deg,Direction)
)}

function _9(md){return(
md`### Plot of Beam Spreading Loss vs Free-Space elevation Angle`
)}

function _data_beam(get_Beam_spreading_loss)
{
  const Altitude_List=[0,0.5,1,2,3,5]
  var dataf=[]
  for (let x in Altitude_List){
    var data=[]
    for (let i = 0; i <10; i+=0.05) {
      const entry={Free_Space_Elevation_Angle:i,
            Attenuation_dB: get_Beam_spreading_loss(x,i,"Earth to space"),
            Altitude:x}
      data.push(entry)
    }
    dataf=dataf.concat(data)
  }
  return dataf
}


function _11(Plot,data_beam){return(
Plot.plot({
  color: {
    legend: true
  },
  grid:true,
  x:{type: "linear",domain: [0,6],label:"Free Space Elevation Angle"},
  marks: [
    Plot.lineY(data_beam, {x: "Free_Space_Elevation_Angle", y: "Attenuation_dB", stroke:"Altitude"}),
    Plot.ruleY([0])
  ]
})
)}

function _12(md){return(
md`## Loss due to atmospheric gases`
)}

function _13(md){return(
md`### Inputs`
)}

function _Freq_Mhz(Inputs){return(
Inputs.range([1, 100000], {step: 0.01, label: "Frequency (MHz)"})
)}

function _Apparent_Elevation(Inputs){return(
Inputs.range([-10, 90], {step: 1, label: "Apparent Elevation(degrees)"})
)}

function _IMT_Altitude_km(Inputs){return(
Inputs.range([0, 5], {step: 0.01, label: "IMT Altitude (Km)"})
)}

function _surf_water_vapour_density(Inputs){return(
Inputs.range([0, 15], {step: 0.1, label:"Surface water vapour density (grams per cubic meter)"})
)}

function _Earth_Raduis_km(){return(
6371
)}

function _19(md){return(
md`#### Function for performing calculations`
)}

function _get_atmospheric_gasses_loss(IMT_Altitude_km,get_atmospheric_params,Earth_Raduis_km){return(
function get_atmospheric_gasses_loss(Apparent_Elevation,surf_water_vapour_density,IMT_Altitude,frequency_MHz){
  let beta=(90-Math.abs(Apparent_Elevation)) * Math.PI/180//incidence angle
  let rho_s = surf_water_vapour_density * Math.exp(IMT_Altitude_km/2)
  let a_acc=0

  if (Apparent_Elevation < 0){
            // get temperature (t), dry-air pressure (p), water-vapour pressure (e),
            //     refractive index (n) and specific attenuation (gamma)
            let x = get_atmospheric_params(IMT_Altitude, rho_s, frequency_MHz)
            let t=x[0]
            let p=x[1]
            let e=x[2]
            let n=x[3]
            let gamma=x[4]
            let delta = .0001 + 0.01 * Math.max(IMT_Altitude, 0) // layer thickness
            let r = Earth_Raduis_km + IMT_Altitude - delta // radius of lower edge
            while (1){
                let m = (r + delta) * Math.sin(beta) - r
                if (m >= 0){
                    let dh = 2 * Math.sqrt(2*r*(delta-m)+delta**2-m**2) // horizontal path
                    a_acc += dh * gamma
                    break
                }
                let ds = (r+delta)*Math.cos(beta)-Math.sqrt((r+delta)**2 * Math.cos(beta)**2 -
                                                    (2*r*delta + delta**2)) // slope distance
                a_acc += ds*gamma
                let alpha = Math.sin((r+delta)/r * Math.sin(beta)) // angle to vertical
                IMT_Altitude -= delta
                r -= delta
                x = get_atmospheric_params(IMT_Altitude, rho_s, frequency_MHz)
                delta = 0.0001 + 0.01 * Math.max(IMT_Altitude, 0)
                beta = Math.asin(n/x[3] * Math.sin(alpha))
                t=x[0]
                p=x[1]
                e=x[2]
                n = x[3]
                gamma=x[4]
            }
  }

        let x = get_atmospheric_params(IMT_Altitude, rho_s, frequency_MHz)
        let t=x[0]
        let p=x[1]
        let e=x[2]
        let n=x[3]
        let gamma=x[4]        
        let delta = .0001 + .01 * Math.max(IMT_Altitude, 0)
        let r = Earth_Raduis_km + IMT_Altitude

        while (1){
            let ds = Math.sqrt(r**2 * Math.cos(beta)**2 + 2*r*delta + delta**2) - r * Math.cos(beta)
            a_acc += ds * gamma
            let alpha = Math.asin(r/(r+delta) * Math.sin(beta))
            IMT_Altitude += delta
            if (IMT_Altitude >= 100){
                break
          }
            r += delta
            
            x = get_atmospheric_params(IMT_Altitude, rho_s, frequency_MHz)
            beta = Math.asin(n/x[3] * Math.sin(alpha))
            t=x[0]
            p=x[1]
            e=x[2]
            n = x[3]
            gamma=x[4]
        }
  
  return a_acc
  
}
)}

function _21(md){return(
md`### Sample Calculation`
)}

function _22(get_atmospheric_gasses_loss,Apparent_Elevation,surf_water_vapour_density,IMT_Altitude_km,Freq_Mhz){return(
get_atmospheric_gasses_loss(Apparent_Elevation,surf_water_vapour_density,IMT_Altitude_km,Freq_Mhz)
)}

function _23(md){return(
md`### Plot of atmospheric gases losses vs Apparent Elevation Angles for varying surface water vapour densities (!!! can cause crashes)`
)}

function _data_gas(FileAttachment){return(
FileAttachment("data_gas.csv").csv()
)}

function _Gaseous_att(Plot,data_gas){return(
Plot.plot({
  color: {
    legend: true
  },
  grid:true,
  x:{type: "linear",label:"Apparent Elevation (deg)"},
  y:{type: "log",domain: [Math.pow(10,-1),Math.pow(10,2)],label:"Attenuation dB"},
  marks: [
    Plot.lineY(data_gas, {x: "ApparentElevation", y: "AttenuationdB", stroke:"density"}),
    Plot.ruleY([0])
  ]
})
)}

function _27(md){return(
md`### Dependencies`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data_gas.csv", {url: new URL("./files/ce6afe2efb242b058e8f4222429a68ce477b493283e3b0829383eaf0bad67a82afe7691b249775dccb011acade5b20422100388db2eba3e09fcb009a9a06f6f3.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("get_Beam_spreading_loss")).define("get_Beam_spreading_loss", _get_Beam_spreading_loss);
  main.variable(observer("viewof Altitude_km")).define("viewof Altitude_km", ["Inputs"], _Altitude_km);
  main.variable(observer("Altitude_km")).define("Altitude_km", ["Generators", "viewof Altitude_km"], (G, _) => G.input(_));
  main.variable(observer("viewof Elevation_deg")).define("viewof Elevation_deg", ["Inputs"], _Elevation_deg);
  main.variable(observer("Elevation_deg")).define("Elevation_deg", ["Generators", "viewof Elevation_deg"], (G, _) => G.input(_));
  main.variable(observer("viewof Direction")).define("viewof Direction", ["Inputs"], _Direction);
  main.variable(observer("Direction")).define("Direction", ["Generators", "viewof Direction"], (G, _) => G.input(_));
  main.variable(observer("Beam_Spreading_Loss")).define("Beam_Spreading_Loss", ["get_Beam_spreading_loss","Altitude_km","Elevation_deg","Direction"], _Beam_Spreading_Loss);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("data_beam")).define("data_beam", ["get_Beam_spreading_loss"], _data_beam);
  main.variable(observer()).define(["Plot","data_beam"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof Freq_Mhz")).define("viewof Freq_Mhz", ["Inputs"], _Freq_Mhz);
  main.variable(observer("Freq_Mhz")).define("Freq_Mhz", ["Generators", "viewof Freq_Mhz"], (G, _) => G.input(_));
  main.variable(observer("viewof Apparent_Elevation")).define("viewof Apparent_Elevation", ["Inputs"], _Apparent_Elevation);
  main.variable(observer("Apparent_Elevation")).define("Apparent_Elevation", ["Generators", "viewof Apparent_Elevation"], (G, _) => G.input(_));
  main.variable(observer("viewof IMT_Altitude_km")).define("viewof IMT_Altitude_km", ["Inputs"], _IMT_Altitude_km);
  main.variable(observer("IMT_Altitude_km")).define("IMT_Altitude_km", ["Generators", "viewof IMT_Altitude_km"], (G, _) => G.input(_));
  main.variable(observer("viewof surf_water_vapour_density")).define("viewof surf_water_vapour_density", ["Inputs"], _surf_water_vapour_density);
  main.variable(observer("surf_water_vapour_density")).define("surf_water_vapour_density", ["Generators", "viewof surf_water_vapour_density"], (G, _) => G.input(_));
  main.variable(observer("Earth_Raduis_km")).define("Earth_Raduis_km", _Earth_Raduis_km);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("get_atmospheric_gasses_loss")).define("get_atmospheric_gasses_loss", ["IMT_Altitude_km","get_atmospheric_params","Earth_Raduis_km"], _get_atmospheric_gasses_loss);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["get_atmospheric_gasses_loss","Apparent_Elevation","surf_water_vapour_density","IMT_Altitude_km","Freq_Mhz"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("data_gas")).define("data_gas", ["FileAttachment"], _data_gas);
  main.variable(observer("Gaseous_att")).define("Gaseous_att", ["Plot","data_gas"], _Gaseous_att);
  main.variable(observer()).define(["md"], _27);
  const child1 = runtime.module(define1);
  main.import("L_ces", child1);
  const child2 = runtime.module(define2);
  main.import("get_atmospheric_params", child2);
  return main;
}
