import define1 from "./c71c56e1141f5a7f@282.js";

function _1(md){return(
md`# Supporting Functions for P.452`
)}

function _2(md){return(
md`#### Main Path Analysis Function (ITU-R p.452 Attachment 2 to annex 1)`
)}

function _Path_Analysis(median_eff_Re,Effective_antenna_heights,correct_smooth_earth){return(
function Path_Analysis(pathdata,Delta_N,htg,hrg){
  let k50= median_eff_Re(Delta_N, 1)
  let a_e=median_eff_Re(Delta_N, 0)
  let index1=0
  let index2=pathdata.length-1
  let n=index2 - index1 + 1
  let dtot= parseInt(pathdata[index2].Distance) - parseInt(pathdata[index1].Distance)
  let hgt = parseInt(pathdata[index1].Height) //ground height (amsl) at TX station (m)
  let hgr = parseInt(pathdata[index2].Height) // ground height (amsl) at RX station (m)
  let hts = htg + hgt //Table 7
  let hrs = hrg + hgr // Table 7
  let theta_td = 1000 * Math.atan((hrs - hts) / (1000 * dtot) - dtot / (2 * a_e)) // Equation (153)
  let theta_rd = 1000 * Math.atan((hts - hrs) / (1000 * dtot) - dtot / (2 * a_e))
  const eheights = Effective_antenna_heights(hts, hrs, htg, hrg,pathdata, index1, index2,dtot)

  //return arr
  let theta_max=-999
  var theta = new Array(n+2)
    if (n>2){// There is at least one intervening terrain point between terminals
      for (let Counter=index1+1;Counter<=index2-1;Counter++){
          theta[Counter]=theta_max=Math.max(1000 * Math.atan((parseFloat(pathdata[Counter].Height) - hts) / (1000 * parseFloat(pathdata[Counter].Distance)) - parseFloat(pathdata[Counter].Distance) / (2 * a_e)),theta_max)
      }
  }
  let theta_out=NaN
  let theta_t=NaN
  let theta_r=NaN
  let dlt=NaN
  let dlr=NaN
  if (theta_max > theta_td) { // Trans-Horizon Path
    theta_t = theta_max // Equation (154)
        //Find the index of the first point, x, where THETA(x) = theta_max.  This will
        // determine the Interfering antenna horizon distance, dlt - Section 5.1.2
    let flag = 0
    for (let Counter = index1 + 1 ;Counter<=index2 - 1;Counter+=1){
      if ((theta[Counter] == theta_max) & (flag == 0)) {
        dlt = parseFloat(pathdata[Counter].Distance) // Equation (155)
        let index_t = Counter
        flag = 1
      }
    }
    var theta2= new Array(n+2)
    theta_r = -90000
    for(let Counter=index1+1;Counter<=index2-1;Counter+=1){
      // Equation (157)
      theta2[Counter] = 1000 * Math.atan((pathdata[Counter].Height - hrs) / (1000 * (dtot - pathdata[Counter].Distance)) - (dtot - pathdata[Counter].Distance) / (2 * a_e))
    // This If in the For/Next loop effectively is Equation (156)
      if (theta2[Counter] > theta_r){
        theta_r = theta2[Counter]
        // Use the index of theta_r to find interfered-with antenna horizon distance, dlr - Section 5.1.4
        dlr = dtot - pathdata[Counter].Distance // Equation (158)
        let index_r = Counter
      }
    }
    theta_out = 1000 * dtot / a_e + theta_t + theta_r  // Equation (159)  
  }
  else{ // LOS Path
    
      //Since the path is LoS, use the alternate definitions from Table 3 for these 4 parameters
   /*
        let theta_t = theta_td  ' Equation (154)
        theta_r = theta_rd  ' not defined in rec.-15
        
       ' Here is a section to check very carefully for theta_r
        
        theta_out = 1000 * dtot / ae + theta_t + theta_r
        
        Pi = 2 * Asin(1) 'define PI
        lambda = 0.3 / f
        Ce = 1 / ae

    BP = 1
    For Counter = Index1 + 1 To Index2 - 1
        d_i = d(Counter, 1)
        H_i = h(Counter, 1)
        vmax1 = H_i + 500 * Ce * d_i * (dtot - d_i) - ((hts * (dtot - d_i) + hrs * d_i) / dtot)
        If dtot - d_i > 0 Then vmax2 = Sqr(0.002 * dtot / (lambda * d_i * (dtot - d_i)))
        vmax = vmax1 * vmax2
        If Counter = Index1 + 1 Then
            maxValue_vmax = vmax
        End If

        If maxValue_vmax < vmax Then
            maxValue_vmax = vmax
            BP = Counter
        End If
        
    Next Counter
       
        dlt = d(BP, 1)
        dlr = dtot - dlt
        index_t = BP
        
        For Counter = Index1 To Index2
            If d(Counter, 1) < dlr Then index_r = Counter
        Next Counter
            
    End If
    */
    
  }
  const Correct = correct_smooth_earth(dtot, htg, hrg, eheights[2], eheights[3], pathdata, index1, index2)
  const arr=[a_e,dtot,hts,hrs,theta_t,theta_r,theta_out,eheights[0],eheights[1],Correct[2],Correct[3],Correct[4],dlt,dlr]
  return arr
}
)}

function _4(md){return(
md`#### this function will calculate the effective antenna heights (ITU-R p.452-16 Section 5.1.6.3)`
)}

function _Effective_antenna_heights(){return(
function Effective_antenna_heights(hts, hrs,hgt,hgr, pathdata, Index1, Index2,dtot){
  let n = Index2 - Index1 + 1
  let ho = hts - hgt
  let hn = hrs - hgr


  let sumV1 = 0
  let sumV2 = 0
  const Di=[]
  const Di_1=[]
  const Hi=[]
  const Hi_1=[]
  
  
  for (let i = Index1; i <=Index2-1; i++){
    let Di = parseFloat(pathdata[i+1].Distance)
    let Di_i = parseFloat(pathdata[i].Distance)
    let Hi = parseFloat(pathdata[i+1].Height)
    let Hi_i = parseFloat(pathdata[i].Height)
    sumV1 = sumV1 + (Di - Di_i) * (Hi + Hi_i) 
    sumV2 = sumV2 + (Di - Di_i) * (Hi * (2 * Di + Di_i) + Hi_i * (Di + 2 * Di_i)) 
  }
  
  let hst = (2 * sumV1 * dtot - sumV2) / Math.pow(dtot , 2 )
  let hsr = (sumV2 - sumV1 * dtot) / Math.pow(dtot , 2 )
  

  let maxValue = -999
  let maxValueaobt = -999
  let maxValueaobr = -999
  
  for (let i=Index1+1;i<=Index2-1;i++){ 
    let d_i = parseFloat(pathdata[i].Distance)
    let H_i = parseFloat(pathdata[i].Height)
    let Hi = H_i - ((hts * ((dtot - d_i)) + (hrs * d_i)) / dtot)
    let aobt = Hi / d_i
    let aobr = Hi / (dtot - d_i)
    if (i== Index1 + 1){
      maxValue = Hi
      maxValueaobt = aobt
      maxValueaobr = aobr
    }
    else{
      maxValue =Math.max(Hi,maxValue)
      
      maxValueaobt=Math.max(aobt,maxValueaobt)
      
      maxValueaobr=Math.max(aobr,maxValueaobr)   
    }
  }
  let hobs = maxValue 
  let aobt = maxValueaobt 
  let aobr = maxValueaobr 
  let Gtp = aobt / (aobt + aobr) 
  let Grp = aobr / (aobt + aobr) 
  let hstp= hst
  let hsrp= hsr
  if (hobs >0 ) {
    hstp = hst - (hobs * Gtp)
    hsrp = hsr - (hobs * Grp) 
  }
  let hstd=Math.min(ho,hstp)
  let hsrd=Math.min(hn,hsrp)

  const arr=[hstd,hsrd,hst,hsr]
  return arr



      
}
)}

function _6(md){return(
md`#### Function to compute median effective Earth radius factor (ITU-R p.452-16 Section 3.2.1)`
)}

function _median_eff_Re(){return(
function median_eff_Re(DELTA_N, choice){
  if (choice==1){
    return (157 / (157 - DELTA_N))
  }
  else{
    return  6371*(157 / (157 - DELTA_N))
  }
}
)}

function _8(md){return(
md`#### Function used by path profile analysis routine for calculating Effective Antenna Heights (ITU-R P.452-14 Appendix 2 to Annex 1, Section 5.1.6.4)`
)}

function _correct_smooth_earth(){return(
function correct_smooth_earth(dtot, htg, hrg, hst, hsr, pathdata, Index1, Index2){
// Equation (168a)
if (hst > pathdata[Index1].Height){
    hst = pathdata[Index1].Height
}
// Equation (168b) sort of
if (hsr > pathdata[Index2].Height){
    hsr = pathdata[Index2].Height
}

let m = (hsr - hst) / dtot // Equation (169)
let hte = htg+ pathdata[Index1].Height - hst
let hre = hrg +pathdata[Index2].Height - hsr

  return [hst,hsr,m,hte,hre]
}
)}

function _10(md){return(
md`#### Function to compute LOS propagation basic transmission loss NOT exceeded for p% of the time
(ITU-R p.452-16 Section 4.1)`
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
  const arr=[L_bfsg,los_prop_1,gammao,rho]
  return arr
  
}
)}

function _12(md){return(
md`#### Function to compute basic transmission loss due to troposcatter effects Loss is not exceeded for p% of the time (p<=50%). This loss needs to be calculated for transhorizon paths 
(ITU-R p.452 Section 4.3)`
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

function _14(md){return(
md`#### Calculates fraction of path over water`
)}

function _sea_fraction(){return(
function sea_fraction(pathdata){
  let total=parseFloat(pathdata[pathdata.length-1].Distance)
  let onedistance=parseFloat(pathdata[2].Distance)- parseFloat(pathdata[1].Distance)
  let seacounter=0
  for(let i=1;i<=pathdata.length-1;i+=1){
    if (pathdata[i].Zone=="B"){
      seacounter+=1
      
    }
  }
  return (seacounter*onedistance)/total
}
)}

function _16(md){return(
md`#### Calculates Overall Propagation Loss`
)}

function _overall_predict(Inv_Cum_Norm){return(
function overall_predict(p, theta, dtot, BETAo, omega, L_b0p, L_b0beta, L_dp, L_bd50, L_bd, L_bs, L_ba, Ah_t, Ah_r, StimMax, S_tr){
  let F_i=NaN
  if( 50 > p && p > BETAo){
    F_i = (Inv_Cum_Norm(p / 100)) / (Inv_Cum_Norm(BETAo / 100))
  }
  else{
    F_i = 1
  }
  let BIG_THETA = 0.3
  let xi = 0.8
  let F_j = 1 - 0.5 * (1 + Math.tanh(3 * xi * (StimMax - S_tr) / BIG_THETA))
  let d_sw = 20  // fixed parameter determing the distance range of blending
  let kappa = 0.5  // fixed parameter determing the blending slope
  let F_k = 1 - 0.5 * (1 + Math.tanh(3 * kappa * (dtot - d_sw) / d_sw))
  let L_minb0p=NaN
  //Calculate a notional minimum basic transmission loss, L_minb0p, associated with line-of-sight propagation and over-sea sub-path diffraction
  if (p < BETAo){
    L_minb0p = L_b0p + (1 - omega) * L_dp
  }
  else{
    L_minb0p = L_bd50 + (L_b0beta + (1 - omega) * L_dp - L_bd50) * F_i
  }
  //Calculate a notional minimum basic transmission loss, L_minbap, associated with line-of-sight and transhorizon signal enhancements
  let eta = 2.5
  let L_minbap = eta * Math.log(Math.exp(L_ba / eta) + Math.exp(L_b0p / eta))
  //Calculate a notional basic transmission loss, L_bda, associated with diffraction and line-of-sight or ducting/layer-reflection enhancements
  let L_bda=NaN
  if (L_minbap > L_bd ){
    L_bda = L_bd
  }
  else{
    L_bda = L_minbap + (L_bd - L_minbap) * F_k
  }
  let L_bam = L_bda + (L_minb0p - L_bda) * F_j
  //Calculate the final basic transmission loss, L_b, not exceed for p% time

  return -5 * Math.log(10 ** (-0.2 * L_bs) + 10 ** (-0.2 * L_bam)) / Math.log(10) + Ah_t + Ah_r
}
)}

function _18(md){return(
md`#### Function to approximate inverse cumulative normal distribution function`
)}

function _Inv_Cum_Norm(Tsub){return(
function Inv_Cum_Norm(p){
  if (p < 0.000001){
    return p = 0.000001
  }
  let C0 = 2.515516698  
  let C1 = 0.802853  
  let C2 = 0.010328  
  let D1 = 1.432788  
  let D2 = 0.189269  
  let D3 = 0.001308  
  let N_inv_cum_norm = ((C2 * Tsub(p) + C1) * Tsub(p)) + C0
  let D_inv_cum_norm = ((D3 * Tsub(p) + D2) * Tsub(p) + D1) * Tsub(p) + 1
  let chi = N_inv_cum_norm / D_inv_cum_norm 
  return (chi - Tsub(p))
}
)}

function _Tsub(){return(
function Tsub(x){
return Math.sqrt(-2 * Math.log(x))
}
)}

function _21(md){return(
md`## Dependencies`
)}

function _jstat(require){return(
require('jstat')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("Path_Analysis")).define("Path_Analysis", ["median_eff_Re","Effective_antenna_heights","correct_smooth_earth"], _Path_Analysis);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("Effective_antenna_heights")).define("Effective_antenna_heights", _Effective_antenna_heights);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("median_eff_Re")).define("median_eff_Re", _median_eff_Re);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("correct_smooth_earth")).define("correct_smooth_earth", _correct_smooth_earth);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("los_prop")).define("los_prop", ["specific_atten_dryair11","specific_atten_water11"], _los_prop);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("troposcatter_prop")).define("troposcatter_prop", ["specific_atten_dryair11","specific_atten_water11"], _troposcatter_prop);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("sea_fraction")).define("sea_fraction", _sea_fraction);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("overall_predict")).define("overall_predict", ["Inv_Cum_Norm"], _overall_predict);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("Inv_Cum_Norm")).define("Inv_Cum_Norm", ["Tsub"], _Inv_Cum_Norm);
  main.variable(observer("Tsub")).define("Tsub", _Tsub);
  main.variable(observer()).define(["md"], _21);
  const child1 = runtime.module(define1);
  main.import("specific_atten_water11", child1);
  main.import("specific_atten_dryair11", child1);
  main.variable(observer("jstat")).define("jstat", ["require"], _jstat);
  return main;
}
