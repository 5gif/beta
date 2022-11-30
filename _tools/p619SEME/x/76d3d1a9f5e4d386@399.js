function _1(md){return(
md`# ITU-R P.2108`
)}

function _2(md){return(
md`This Recommendation describes a set of models that can be used for estimating the loss due to clutter for a number of different environments. These models can be used as an end correction to long distance or over the rooftop models.

This Recommendation defines categories for clutter environments and provides methods for 
estimating losses between the rooftop and a terminal within the clutter.
Statistical models are to be used when precise knowledge of the radio path is not known such as the width of streets, heights of buildings, depth of vegetation`
)}

function _3(md){return(
md`“Clutter” is described here in the context of ITU-R P-Series Recommendations.

Clutter refers to objects, such as buildings or vegetation, which are on the surface of the Earth but not actually terrain. Clutter around a radio transmitter/receiver terminal can have a significant effect on the overall propagation. It is normally the clutter closest to the terminal that has most effect on the propagation, but the actual distance will depend on the nature of the clutter and the radio parameters.

Clutter loss models in this Recommendation are statistical in nature. As an end correction for a long-path propagation model, “Clutter loss” is defined as the difference in the transmission loss or basic transmission loss1 with and without the presence of terminal clutter at either end of the path with all other path details being the same. Short-path propagation models take into account the effect of clutter along the full length of the path.`
)}

function _4(md){return(
md`## Model Selection`
)}

function _5(md){return(
md`The appropriate model should be selected based on frequency, environment around the terminal and path type`
)}

async function _6(FileAttachment,htl){return(
htl.html`<figure>
  <img alt="image@1.png" src="${await FileAttachment("Screenshot (89).png").url()}"</img>
</figure>`
)}

function _7(md){return(
md`## Height gain terminal correction model`
)}

function _8(md){return(
md`This method gives the median of losses due to different terminal surroundings. The possible mechanisms include obstruction loss and reflections due to clutter objects at the representative height, and scattering and reflection from the ground and smaller clutter objects. When using a computer implementation, with terrain profile extracted from a digital terrain model, and with the terminal surroundings defined by a clutter category, it is not practicable to identify individual mechanisms. The method used here distinguishes between two general cases: for woodland and urban categories. 
It is assumed that the dominant mechanism is diffraction over clutter. For other categories, it is assumed that reflection or scattering dominates.

An additional loss, A_h, is calculated which can be added to the basic transmission loss of a path calculated above the clutter, therefore basic transmission loss should be calculated to/from the height of the representative clutter height used. This model can be applied to both transmitting and receiving ends of the path.`
)}

function _9(md){return(
md`### The Model`
)}

function _mod2(FileAttachment){return(
FileAttachment("Mod2.jpg").image()
)}

function _11(md){return(
md`### Sample Calculation`
)}

function _12(md){return(
md`### Input Parameters`
)}

function _Inps(Inputs,Ctype){return(
Inputs.form([
  Inputs.range([0.3, 3], {step: 0.01, label: "Frequency (0.3 to 3 Ghz)"}),
  Inputs.number([0.01, Infinity], {step: 0.01, label: "Antenna Height (m)",value:4}),
  Inputs.number([0.01, Infinity], {step: 0.01, label: "Street Width (m)", value: 27}),
  Inputs.number([0.01, Infinity], {step: 0.01, label: "Representative clutter height (m)",value: (Ctype>2) ? ((Ctype==4) ? 20:15) : 10 }),
  
])
)}

function _Ctype(Inputs){return(
Inputs.select(new Map([["Water/sea", 0], ["Open/rural", 1], ["Open/rural", 1], ["Suburban", 2], ["Urban/trees/forest", 3], ["Dense Urban", 4]]), {value: 12, label: "Clutter Type"})
)}

function _15(md){return(
md`#### Defining a function for Calculations`
)}

function _Additional_Loss(){return(
function Additional_Loss(Frequency,Antenna,Street,Rep_h,Ctype){
  if (Rep_h<Antenna){
    return "Invalid Input"
  }
  
  let K_nu=0.342*Math.sqrt(Frequency)
  let K_h2=21.8+6.2*Math.log10(Frequency)
  let theta_clut=Math.atan((Rep_h-Antenna)/Street)*180/Math.PI
  let v = K_nu* Math.sqrt(theta_clut * (Rep_h-Antenna))

  let A_h=0

  if (Ctype<2){
    A_h=-K_h2*Math.log10(Antenna/Rep_h)
  }
  else{
    let J=6.9+20*Math.log10(Math.sqrt((v-0.1)*(v-0.1)+1)+v-0.1)
    A_h=J-6.03
  }
  return A_h
}
)}

function _17(md){return(
md`### TheAdditional Loss comes out to be:`
)}

function _Sample1loss(Additional_Loss,Inps,Ctype){return(
Additional_Loss(Inps[0],Inps[1],Inps[2],Inps[3],Ctype)
)}

function _19(md){return(
md`## Statistical clutter loss model for terrestrial paths`
)}

function _20(md){return(
md`### The Model`
)}

function _mod(FileAttachment){return(
FileAttachment("mod@1.jpg").image()
)}

function _22(md){return(
md`### Input Parameters`
)}

function _Inps2(Inputs){return(
Inputs.form([
  Inputs.range([0.5, 67], {step: 0.01, label: "Frequency (0.5 to 67 Ghz)"}),
  Inputs.range([0.25, 10], {step: 0.01, label: "Path Length (km)"}),
  Inputs.range([0.01,100], {step: 0.01, label: "Percentage of Locations"}),

])
)}

function _24(md){return(
md`#### Defining Function For Calculations`
)}

function _loss_terrestrial(jstat){return(
function loss_terrestrial(F,D,P){

  if (D>2){
    return loss_terrestrial(F,2,P)
  }

  let L_s= 32.98 + 23.9*Math.log10(D) + 3*Math.log10(F)
  let L_l = -2*Math.log10(Math.pow(10,-5*Math.log10(F)-12.5) + Math.pow(10,-16.5))
  let σ_l=4 //(dB)
  let σ_s=6 //(dB)
  
  let σ_cb=Math.sqrt(((σ_l*σ_l)*Math.pow(10,-0.2*L_l)+(σ_s*σ_s)*Math.pow(10,-0.2*L_s))/(Math.pow(10,-0.2*L_l)+Math.pow(10,-0.2*L_s)))

  let ans =  -5*Math.log10((Math.pow(10,-0.2*L_l))+(Math.pow(10,-0.2*L_s)))
    -jstat.normal.inv((100-P)/100, 0, σ_cb )

  return ans
}
)}

function _26(md){return(
md`The clutter loss not exceeded is calculated to be (dB)`
)}

function _terrestrial_loss(loss_terrestrial,Inps2){return(
loss_terrestrial(Inps2[0],Inps2[1],Inps2[2])
)}

function _dataD(loss_terrestrial)
{
  const freq_list=[1,2,4,8,16,32,67]
  var dataf=[]
  for (let x in freq_list){
    var data=[]
    for (let i = 0.25; i <100; i+=0.05) {
      const entry={Distance:i,
            Loss: loss_terrestrial(x,i,50),
            Frequency: freq_list[x]}
      data.push(entry)
    }
    dataf=dataf.concat(data)
  }
  return dataf
}


function _plot1(Plot,dataD){return(
Plot.plot({
  color: {
    legend: true
  },
  grid:true,
  x:{type: "log",domain: [0.25, 100],label:"Distance(km)"},
  marks: [
    Plot.lineY(dataD, {x: "Distance", y: "Loss", stroke:"Frequency"}),
    Plot.ruleY([0])
  ]
})
)}

function _30(md){return(
md`## Earth-space and Aeronautical statistical clutter loss model`
)}

function _31(md){return(
md`### The Model`
)}

function _mod3(FileAttachment){return(
FileAttachment("mod3.jpg").image()
)}

function _33(md){return(
md`### Input Parameters`
)}

function _Inps3(Inputs){return(
Inputs.form([
  Inputs.range([10, 100], {step: 0.01, label: "Frequency (0.5 to 67 Ghz)"}),
  Inputs.range([0, 90], {step: 0.01, label: "Elevation Angle (deg)"}),
  Inputs.range([0,100], {step: 0.01, label: "Percentage of Locations"}),

])
)}

function _35(md){return(
md`#### Defining a Function to perform Calculations`
)}

function _L_ces(jstat){return(
function L_ces(Freq,Angle,P){
  let A_1=0.050
  let K_1=93*Math.pow(Freq,0.175)
  let A = 1/Math.tan(A_1*(1-Angle/90)+Math.PI)

  return Math.pow((-1*K_1*(Math.log(1-(P/100)))/Math.tan(A_1*(1-(Angle/90))+(Math.PI*Angle/180))),(0.5*(90-Angle)/90))-1-jstat.normal.inv((100-P)/100, 0, 0.6 )
}
)}

function _37(md){return(
md`The clutter loss not exceeded for p% of locations Lces for the terrestrial to airborne or satellite path is calculated to be`
)}

function _Loss(L_ces,Inps3){return(
L_ces(Inps3[0],Inps3[1],Inps3[2])
)}

function _39(md){return(
md`### Plotting CDF of Clutter Loss not exceeded`
)}

function _data(L_ces,Inps3)
{
  const angles_list=[0,5,10,15,20,30,40,50,60,70,80,90,2]
  var dataf=[]
  for (let x in angles_list){
    var data=[]
    for (let i = 1; i <99.9; i+=0.1) {
      const entry={Probability:i,
            Loss: L_ces(Inps3[0],x,i),
            Angle: angles_list[x]}
      data.push(entry)
    }
    dataf=dataf.concat(data)
  }
  return dataf
}


function _clut(Plot,data){return(
Plot.plot({
  color: {
    legend: true
  },
  grid:true,
  x:{label:"Loss (dB)"},
  marks: [
    Plot.lineY(data, {x: "Loss", y: "Probability", stroke:"Angle"}),
    Plot.ruleY([0])
  ]
})
)}

function _42(md){return(
md`### Dependencies`
)}

function _jstat(require){return(
require('jstat')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Screenshot (89).png", {url: new URL("./files/adb46eeda8189ed0d9de66fb0e2e0e6a5fa1d5de70c92f77397df35ffe1b0a1f34bd4721950ca99437bb900d678b5e3562a7abb3c440c372a7557ec0532a7738.png", import.meta.url), mimeType: "image/png", toString}],
    ["Mod2.jpg", {url: new URL("./files/22b28e2c637d7ede29ee0ff9265a65c88f581377950b33c2b688bfa1ca4b7e91a16cca22355ef28edd7d0dda9034070bbff562d106a3fe39ed0e73fb221d534a.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["mod@1.jpg", {url: new URL("./files/5605a24591afa8935132f56c699e9760bfaa6b05ee537e8339998a0477b3b6cb0fc61b7499967848b06a05fcd04c0749849176ba090b89818de5efc7bf0ef9f5.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["mod3.jpg", {url: new URL("./files/d6bdab88858ca812c3d3b686b49be857027daedd3d631496890cb3a48066e0907c79b8f4035d7663ef349e313c77131d88a3e2c07d2a2e21fa93333b658cc064.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["FileAttachment","htl"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("mod2")).define("mod2", ["FileAttachment"], _mod2);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof Inps")).define("viewof Inps", ["Inputs","Ctype"], _Inps);
  main.variable(observer("Inps")).define("Inps", ["Generators", "viewof Inps"], (G, _) => G.input(_));
  main.variable(observer("viewof Ctype")).define("viewof Ctype", ["Inputs"], _Ctype);
  main.variable(observer("Ctype")).define("Ctype", ["Generators", "viewof Ctype"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("Additional_Loss")).define("Additional_Loss", _Additional_Loss);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("Sample1loss")).define("Sample1loss", ["Additional_Loss","Inps","Ctype"], _Sample1loss);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("mod")).define("mod", ["FileAttachment"], _mod);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof Inps2")).define("viewof Inps2", ["Inputs"], _Inps2);
  main.variable(observer("Inps2")).define("Inps2", ["Generators", "viewof Inps2"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("loss_terrestrial")).define("loss_terrestrial", ["jstat"], _loss_terrestrial);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("terrestrial_loss")).define("terrestrial_loss", ["loss_terrestrial","Inps2"], _terrestrial_loss);
  main.variable(observer("dataD")).define("dataD", ["loss_terrestrial"], _dataD);
  main.variable(observer("plot1")).define("plot1", ["Plot","dataD"], _plot1);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("mod3")).define("mod3", ["FileAttachment"], _mod3);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof Inps3")).define("viewof Inps3", ["Inputs"], _Inps3);
  main.variable(observer("Inps3")).define("Inps3", ["Generators", "viewof Inps3"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("L_ces")).define("L_ces", ["jstat"], _L_ces);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("Loss")).define("Loss", ["L_ces","Inps3"], _Loss);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("data")).define("data", ["L_ces","Inps3"], _data);
  main.variable(observer("clut")).define("clut", ["Plot","data"], _clut);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("jstat")).define("jstat", ["require"], _jstat);
  return main;
}
