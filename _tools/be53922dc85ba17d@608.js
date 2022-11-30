import define1 from "./b2bbebd2f186ed03@1327.js";

function _1(md){return(
md`# ITU-R P-2109
Recommendation provides a method for estimating building entry loss at frequencies between about 80 MHz and 100 GHz for probabilities of 0.0 < P < 1.0. The method is not site-specific, and is primarily intended for use in sharing and compatibility studies.
`
)}

function _2(md){return(
md`ITU-R 2109 provides a model for building entry loss (BEL) as defined in Recommendation ITU-R P.2040. The output of the model is in the form of a cumulative distribution function of the 
probability that a given loss will not be exceeded.
The model makes no attempt to separate the loss suffered by a signal penetrating the exterior wall and the attenuation suffered in the path through the building.

Building entry loss exhibits great variability, both within any given building and between different buildings. Although techniques such as ray-tracing can provide useful site-specific predictions when coupled with detailed architectural data, such models will usually be inappropriate for generic applications such as spectrum sharing studies.
`
)}

function _3(md){return(
md`## The Model
The model is based on the measurement data collated in Report ITU-R P.2346 in the range 80 MHz to 73 GHz. The model can be used within a Monte Carlo method, but it should be noted that the model has only been validated against empirical data over the probability range 0.01 to 0.99.

Following the definition given in Recommendation ITU-R P.2040, building entry loss predicted here is defined in isolation from any surrounding clutter. Should the building be surrounded by local clutter, additional losses may need to be determined for the relevant terminal height and position above ground using Recommendation ITU-R P.2108.

The model makes the implicit assumption that terminals have an equal probability of location at any point within a building.`
)}

function _4(md){return(
md`### Input Parameters
The model takes the following input parameters:
 
 - frequency (~0.08-100 GHz);
 
 - the probability with which the loss is not exceeded;
 
 - building class (‘traditional’ or ‘thermally-efficient’);
 
 - elevation angle of the path at the building façade (degrees above the horizontal).

The azimuth of the path to the outdoor terminal with respect to the building surface is not accounted 
for explicitly. Although theory and measurement show that signals normally incident on a building 
surface will suffer lower loss than those arriving at oblique angles`
)}

function _5(md){return(
md`Experimental results, such as those collated in Report ITU-R P.2346, shows that, when characterised in terms of entry loss, buildings fall into two distinct populations: where modern, thermally-efficient building methods are used (metallised glass, foil-backed panels) building entry loss is generally significantly higher than for ‘traditional’buildings without such materials. The model therefore gives predictions for these two cases.
`
)}

function _6(md){return(
md`### The Model
The building entry loss distribution is given by a combination of two 
lognormal distributions. The building entry loss not exceeded for the probability, P, is given by:`
)}

async function _7(FileAttachment,htl){return(
htl.html`<figure>
  <img alt="image@1.png" src="${await FileAttachment("Screenshot (87).png").url()}"</img>
      <figcaption>Fig 1. Various Deployment scenarios (src:M.2101)</figcaption>
</figure>`
)}

function _8(md){return(
md`And the required Coefficients are Given in This Table`
)}

function _Model_Coefficients(FileAttachment){return(
FileAttachment("BELmodel.csv").csv()
)}

function _10(Inputs,Model_Coefficients){return(
Inputs.table(Model_Coefficients)
)}

function _11(md){return(
md`## Sample Calculation`
)}

function _Inps(Inputs){return(
Inputs.form([
  Inputs.range([1, 100], {step: 1, label: "Frequency GHz (0.08 to 100 Ghz)"}),
  Inputs.range([1, 100], {step: 1, label: "Probability (%)"}),
  Inputs.range([0.0, 90], {step: 1, label: "elevation angle"}),
])
)}

function _Btype(Inputs){return(
Inputs.select(new Map([["Traditional", 0], ["Thermally Efficient", 1]]), {value: 12, label: "Building Type"})
)}

function _14(Plot,data){return(
Plot.plot({
  grid:true,
  x:{label:"MaxLoss [dB]"},
  marks: [
    Plot.lineY(data, {x: "MaxLoss", y: "probability"}),
    Plot.ruleY([0])
  ]
})
)}

function _15(md){return(
md`Calculating Intermediate Values and defining the Function`
)}

function _mu1(Model_Coefficients,Btype,Inps){return(
parseFloat(Model_Coefficients[Btype].r)+
  parseFloat(Model_Coefficients[Btype].s)*Math.log10(Inps[0])+
  parseFloat(Model_Coefficients[Btype].t)*Math.pow(Math.log10(Inps[0]),2)+
  Inps[2]*0.212
)}

function _mu2(Model_Coefficients,Btype,Inps){return(
parseFloat(Model_Coefficients[Btype].w)+
  parseFloat(Model_Coefficients[Btype].x)*Math.log10(Inps[0])
)}

function _Sigma_1(Model_Coefficients,Btype,Inps){return(
parseFloat(Model_Coefficients[Btype].u)+
  parseFloat(Model_Coefficients[Btype].v)*Math.log10(Inps[0])
)}

function _Sigma_2(Model_Coefficients,Btype,Inps){return(
parseFloat(Model_Coefficients[Btype].y)+
  parseFloat(Model_Coefficients[Btype].z)*Math.log10(Inps[0])
)}

function _Loss(jstat,mu1,Sigma_1,mu2,Sigma_2){return(
function Loss(p)
{
  let LinA = Math.pow(10,jstat.normal.inv( p, mu1, Sigma_1 )/10)
  let LinB = Math.pow(10,jstat.normal.inv( p, mu2, Sigma_2 )/10)
  let LinC = Math.pow(10,-0.3)

  return  10*Math.log10(LinA+LinB+LinC)
}
)}

function _21(md){return(
md`#### building entry loss not exceeded is (dB):`
)}

function _loss(Loss,Inps){return(
Loss(Inps[1]/100)
)}

function _23(md){return(
md`### Creating plot of CDF`
)}

function _data(Loss)
{
  var data = []
  for (let i = 0.1; i <=99; i+=0.1) {
    const entry={probability:i,
          MaxLoss: Loss(i/100)}
    data.push(entry)
  }
  return data
}


function _25(Inputs,data){return(
Inputs.table(data,{width:300})
)}

function _26(d3){return(
d3.scaleLinear(). domain ([0,1]).range([0,100])(.5)
)}

function _27(d3,data){return(
d3.bisectCenter(data,20)
)}

function _28(md){return(
md`### Variation of building entry loss not exceeded with change in Frequency`
)}

function _29(md){return(
md`The Predicted Median building entry loss at horizontal incidence is calculated for frequencies ranging from 10^-1Ghz to 100 Ghz`
)}

function _Lossf(Model_Coefficients,jstat){return(
function Lossf(Frequency,Btype)
{
  let mu1 =
  parseFloat(Model_Coefficients[Btype].r)+
  parseFloat(Model_Coefficients[Btype].s)*Math.log10(Frequency)+
  parseFloat(Model_Coefficients[Btype].t)*Math.pow(Math.log10(Frequency),2)+
  0*0.212

  let mu2 = 
  parseFloat(Model_Coefficients[Btype].w)+
  parseFloat(Model_Coefficients[Btype].x)*Math.log10(Frequency)

  let Sigma_1 =  parseFloat(Model_Coefficients[Btype].u) + parseFloat(Model_Coefficients[Btype].v)*Math.log10((Frequency))

  let Sigma_2 =  
  parseFloat(Model_Coefficients[Btype].y)+
  parseFloat(Model_Coefficients[Btype].z)*Math.log10((Frequency))
  
  let LinA = Math.pow(10,jstat.normal.inv( 0.5, mu1, Sigma_1 )/10)
  
  let LinB = Math.pow(10,jstat.normal.inv( 0.5, mu2, Sigma_2 )/10)
  
  let LinC = Math.pow(10,-0.3)

  return  10*Math.log10(LinA+LinB+LinC)
}
)}

function _viewdomain(rangeSlider){return(
rangeSlider({
  min:0.1,
  max: 100,
  // Note that values must be specified as array of length 2.
  value: this ? this.value : [0.1, 100],
  // Custom slider CSS, replaces all styles.

  // Overrides the range color. Support for range colors is up to the theme.
  // format: "f MHz",
  title: "Frequency Range",
  description: "Ghz"
})
)}

function _32(Plot,viewdomain,datatrad,dataTE){return(
Plot.plot({
  color: {
    legend: true
  },
  grid:true,
  x:{type: "log",domain: [viewdomain[0], viewdomain[1]],label:"frequency (GHz)"},
  marks: [
    Plot.lineY(datatrad, {x: "Frequency", y: "MaxLoss", stroke:"btype"}),
    Plot.lineY(dataTE, {x: "Frequency", y: "MaxLoss",stroke: "btype" }),
    Plot.ruleY([0])
  ]
})
)}

function _datatrad(viewdomain,Lossf)
{
  var dataf = []
  for (let i = viewdomain[0]; i <=viewdomain[1]; i+=0.1) {
    const entry={Frequency:i,
          MaxLoss: Lossf(i,0),
          btype: "Traditional"}
    dataf.push(entry)
  }
  return dataf
}


function _dataTE(viewdomain,Lossf)
{
  var dataf = []
  for (let i = viewdomain[0]; i <=viewdomain[1]; i+=0.1) {
    const entry={Frequency:i,
          MaxLoss: Lossf(i,1),
          btype: "Thermally Efficient"}
    dataf.push(entry)
  }
  return dataf
}


function _35(Inputs,dataTE){return(
Inputs.table(dataTE,{width:500})
)}

function _36(md){return(
md`### Plot of Median building entry loss predicted at horizontal incidence`
)}

function _37(md){return(
md`#### General Function for Calcuations`
)}

function _BEL(Model_Coefficients,jstat){return(
function BEL(Frequency,Btype,Probability,Angle)
{
  //Frequency to be entered in GHz
  //Btype is 0 for traditional and 1 for Thermally Efficienct
  //Probability's range is from 0 to 1
  //Angle is to be entered in degrees
  let mu1 =
  parseFloat(Model_Coefficients[Btype].r)+
  parseFloat(Model_Coefficients[Btype].s)*Math.log10(Frequency)+
  parseFloat(Model_Coefficients[Btype].t)*Math.pow(Math.log10(Frequency),2)+
  Angle*0.212

  let mu2 = 
  parseFloat(Model_Coefficients[Btype].w)+
  parseFloat(Model_Coefficients[Btype].x)*Math.log10(Frequency)

  let Sigma_1 =  parseFloat(Model_Coefficients[Btype].u) + parseFloat(Model_Coefficients[Btype].v)*Math.log10((Frequency))

  let Sigma_2 =  
  parseFloat(Model_Coefficients[Btype].y)+
  parseFloat(Model_Coefficients[Btype].z)*Math.log10((Frequency))
  
  let LinA = Math.pow(10,jstat.normal.inv( Probability, mu1, Sigma_1 )/10)
  
  let LinB = Math.pow(10,jstat.normal.inv( Probability, mu2, Sigma_2 )/10)
  
  let LinC = Math.pow(10,-0.3)

  return  10*Math.log10(LinA+LinB+LinC)
}
)}

function _39(md){return(
md`### Dependencies`
)}

function _jstat(require){return(
require('jstat')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["BELmodel.csv", {url: new URL("./files/c052e38e2d36e429f06462fd57ddbc4a4751cd38cb2666ca21e37326690817699ffeaf7bd624c7dcf1e7b560185be18d2c09e29a87ebd01544a04578ec28b12f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Screenshot (87).png", {url: new URL("./files/c86e7940a3a30e3ad5b5845a4641817086e66ec48eaae92265e9e5c6416e003d0310ffd9008c5433d11ae3f7d27f1c4fbc3a61e34073ff45234f9d0c59e73e4f.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["FileAttachment","htl"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("Model_Coefficients")).define("Model_Coefficients", ["FileAttachment"], _Model_Coefficients);
  main.variable(observer()).define(["Inputs","Model_Coefficients"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof Inps")).define("viewof Inps", ["Inputs"], _Inps);
  main.variable(observer("Inps")).define("Inps", ["Generators", "viewof Inps"], (G, _) => G.input(_));
  main.variable(observer("viewof Btype")).define("viewof Btype", ["Inputs"], _Btype);
  main.variable(observer("Btype")).define("Btype", ["Generators", "viewof Btype"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","data"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("mu1")).define("mu1", ["Model_Coefficients","Btype","Inps"], _mu1);
  main.variable(observer("mu2")).define("mu2", ["Model_Coefficients","Btype","Inps"], _mu2);
  main.variable(observer("Sigma_1")).define("Sigma_1", ["Model_Coefficients","Btype","Inps"], _Sigma_1);
  main.variable(observer("Sigma_2")).define("Sigma_2", ["Model_Coefficients","Btype","Inps"], _Sigma_2);
  main.variable(observer("Loss")).define("Loss", ["jstat","mu1","Sigma_1","mu2","Sigma_2"], _Loss);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("loss")).define("loss", ["Loss","Inps"], _loss);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("data")).define("data", ["Loss"], _data);
  main.variable(observer()).define(["Inputs","data"], _25);
  main.variable(observer()).define(["d3"], _26);
  main.variable(observer()).define(["d3","data"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("Lossf")).define("Lossf", ["Model_Coefficients","jstat"], _Lossf);
  main.variable(observer("viewof viewdomain")).define("viewof viewdomain", ["rangeSlider"], _viewdomain);
  main.variable(observer("viewdomain")).define("viewdomain", ["Generators", "viewof viewdomain"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","viewdomain","datatrad","dataTE"], _32);
  main.variable(observer("datatrad")).define("datatrad", ["viewdomain","Lossf"], _datatrad);
  main.variable(observer("dataTE")).define("dataTE", ["viewdomain","Lossf"], _dataTE);
  main.variable(observer()).define(["Inputs","dataTE"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("BEL")).define("BEL", ["Model_Coefficients","jstat"], _BEL);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("jstat")).define("jstat", ["require"], _jstat);
  const child1 = runtime.module(define1);
  main.import("rangeSlider", child1);
  return main;
}
