import define1 from "./0ee5e780f63b3348@466.js";

function _1(md){return(
md`# Beta0 and specific Attenuation Calculations for ITU-R P.452`
)}

function _2(md){return(
md`BETAo (%) = %time that DELTA-N is expected to exceed 100 in first 100m of
atmosphere`
)}

function _beta0_calc(){return(
function beta0_calc(theta,dtm,dlm){
  let tau= 1 - Math.exp(-(0.000412 * Math.pow(dlm,2.41)))
  let mu1 = Math.pow(Math.pow(10 , (-dtm / (16 - 6.6 * tau))) + Math.pow(10 , -5*(0.496 + 0.354 * tau)) , 0.2)
  if (mu1>1){
    mu1=1
  }
  let mu4=0
  let BETAo=0
  if (Math.abs(theta) <= 70) {
    mu4 = Math.pow(10 , ((-0.935 + 0.0176 * Math.abs(theta)) * Math.log(mu1) / Math.log(10)))
    BETAo = Math.pow(10 , (-0.015 * Math.abs(theta) + 1.67)) * mu1 * mu4 
  }
  else{
    mu4 = Math.pow(10 , (0.3 * Math.log(mu1) / Math.log(10)))
    BETAo = 4.17 * mu1 * mu4
  }
  return BETAo
}
)}

function _4(md){return(
md`This function computes the specific attenuation due to dry air, at frequencies up to 1 000 GHz for different values of of pressure, temperature and humidity by means of a summation of the individual resonance lines from oxygen and water vapor according to ITU-R P.676-11, Annex 1`
)}

function _specific_atten_dryair11(){return(
function specific_atten_dryair11(f, p, rho, T){
  const f0 = Array(50.474214, 50.987745, 51.50336, 52.021429, 52.542418, 53.066934, 53.595775, 54.130025, 54.67118, 55.221384, 55.783815, 56.264774, 56.363399, 56.968211, 57.612486, 58.323877, 58.446588, 59.164204, 59.590983, 60.306056, 60.434778, 61.150562, 61.800158, 62.41122, 62.486253, 62.997984, 63.568526, 64.127775, 64.67891, 65.224078, 65.764779, 66.302096, 66.836834, 67.369601, 67.900868, 68.431006, 68.960312, 118.750334, 368.498246, 424.76302, 487.249273, 715.392902, 773.83949, 834.145546)
                   
  const a1 = Array(0.975, 2.529, 6.193, 14.32, 31.24, 64.29, 124.6, 227.3, 389.7, 627.1, 945.3, 543.4, 1331.8, 1746.6, 2120.1, 2363.7, 1442.1, 2379.9, 2090.7, 2103.4, 2438 , 2479.5, 2275.9, 1915.4, 1503 , 1490.2, 1078 , 728.7, 461.3, 274 , 153 , 80.4, 39.8, 18.56, 8.172, 3.397, 1.334, 940.3, 67.4, 637.7, 237.4, 98.1, 572.3, 183.1)
                   
  const a2 = Array(9.651, 8.653, 7.709, 6.819, 5.983, 5.201, 4.474, 3.8, 3.182, 2.618, 2.109, 0.014, 1.654, 1.255, 0.91, 0.621, 0.083, 0.387, 0.207, 0.207, 0.386, 0.621, 0.91, 1.255, 0.083, 1.654, 2.108, 2.617, 3.181, 3.8, 4.473, 5.2, 5.982, 6.818, 7.708, 8.652, 9.65, 0.01, 0.048, 0.044, 0.049, 0.145, 0.141, 0.145)
                   
  const a3 = Array(6.69, 7.17, 7.64, 8.11, 8.58, 9.06, 9.55, 9.96, 10.37, 10.89, 11.34, 17.03, 11.89, 12.23, 12.62, 12.95, 14.91, 13.53, 14.08, 14.15, 13.39, 12.92, 12.63, 12.17, 15.13, 11.74, 11.34, 10.88, 10.38, 9.96, 9.55, 9.06, 8.58, 8.11, 7.64, 7.17, 6.69, 16.64, 16.4, 16.4, 16 , 16 , 16.2, 14.7)
                   
  const a4 = Array(0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 )
                   
  const a5 = [2.566, 2.246, 1.947, 1.667, 1.388, 1.349, 2.227, 3.17, 3.558, 2.56, -1.172, 3.525, -2.378, -3.545, -5.416, -1.932, 6.768, -6.561, 6.957, -6.395, 6.342, 1.014, 5.014, 3.029, -4.499, 1.856, 0.658, -3.036, -3.968, -3.528, -2.548, -1.66, -1.68, -1.956, -2.216, -2.492, -2.773, -0.439, 0 , 0 , 0 , 0 , 0 , 0 ]
                  
  const a6 = [6.85, 6.8, 6.729, 6.64, 6.526, 6.206, 5.085, 3.75, 2.654, 2.952, 6.135, -0.978, 6.547, 6.451, 6.056, 0.436, -1.273, 2.309, -0.776, 0.699, -2.825, -0.584, -6.619, -6.759, 0.844, -6.675, -6.139, -2.895, -2.59, -3.68, -5.002, -6.091, -6.393, -6.475, -6.545, -6.6, -6.65, 0.079, 0 , 0 , 0 , 0 , 0 , 0 ]


  let theta = 300 / T
  let e = rho * T / 216.7
  let SumSiFi = 0
  let d = 0.00056 * (p + e) * Math.pow(theta , 0.8)
  let Ndf = f * p * theta * theta * (0.0000614 / (d * (1 + Math.pow((f / d) , 2))) + 0.0000000000014 * p * Math.pow(theta , 1.5) / (1 + 0.000019 * Math.pow(f , 1.5)))

  for(let i=0;i<43;i+=1){
    let fi=f0[i]
    let Si = a1[i] * 0.0000001 * p * Math.pow(theta , 3) * Math.exp(a2[i] * (1 - theta))
    let df = a3[i] * 0.0001 * (p * Math.pow(theta , (0.8 - a4[i])) + 1.1 * e * theta)
    df = Math.sqrt(df * df + 0.00000225) 
    let Delta = (a5 [i] + a6 [i] * theta) * 0.0001 * (p + e) * Math.pow(theta , 0.8)
    fi = f / fi * ((df - Delta * (fi - f)) / ((fi - f)*(fi - f) + df * df) + (df - Delta * (fi + f)) / ((fi + f) *(fi + f) + df * df))

    SumSiFi = SumSiFi + (Si * fi)
  }
  return 0.182 * f * (SumSiFi + Ndf)
}
)}

function _6(md){return(
md`This function computes the specific attenuation due to water vapour, at frequencies up to 1 000 GHz for different values of of pressure, temperature and humidity by means of a summation of the individual resonance lines from oxygen and water vapour according to ITU-R P.676-11, Annex 1`
)}

function _specific_atten_water10(){return(
function specific_atten_water10(f, p, rho, T){
  const f0 = Array(22.23508, 67.80396, 119.99594, 183.310087, 321.22563, 325.152888, 336.227764, 380.197353, 390.134508, 437.346667, 439.150807, 443.018343, 448.001085, 470.888999, 474.689092, 488.490108, 503.568532, 504.482692, 547.67644, 552.02096, 556.935985, 620.700807, 645.766085, 658.00528, 752.033113, 841.051732, 859.965698, 899.303175, 902.611085, 906.205957, 916.171582, 923.112692, 970.315022, 987.926764, 1780 )
                   
  const b1 = Array(0.1079, 0.0011, 0.0007, 2.273, 0.047, 1.514, 0.001, 11.67, 0.0045, 0.0632, 0.9098, 0.192, 10.41, 0.3254, 1.26, 0.2529, 0.0372, 0.0124, 0.9785, 0.184, 497 , 5.015, 0.0067, 0.2732, 243.4, 0.0134, 0.1325, 0.0547, 0.0386, 0.1836, 8.4, 0.0079, 9.009, 134.6, 17506)
                   
  const b2 = Array(2.144, 8.732, 8.353, 0.668, 6.179, 1.541, 9.825, 1.048, 7.347, 5.048, 3.595, 5.048, 1.405, 3.597, 2.379, 2.852, 6.731, 6.731, 0.158, 0.158, 0.159, 2.391, 8.633, 7.816, 0.396, 8.177, 8.055, 7.914, 8.429, 5.11, 1.441, 10.293, 1.919, 0.257, 0.952)
                   
  const b3 = Array(26.38, 28.58, 29.48, 29.06, 24.04, 28.23, 26.93, 28.11, 21.52, 18.45, 20.07, 15.55, 25.64, 21.34, 23.2, 25.86, 16.12, 16.12, 26 , 26 , 30.86, 24.38, 18 , 32.1, 30.86, 15.9, 30.6, 29.85, 28.65, 24.08, 26.73, 29 , 25.5, 29.85, 196.3)
                  
  const b4 = Array(0.76, 0.69, 0.7, 0.77, 0.67, 0.64, 0.69, 0.54, 0.63, 0.6, 0.63, 0.6, 0.66, 0.66, 0.65, 0.69, 0.61, 0.61, 0.7, 0.7, 0.69, 0.71, 0.6, 0.69, 0.68, 0.33, 0.68, 0.68, 0.7, 0.7, 0.7, 0.7, 0.64, 0.68, 2 )
                   
  const b5 = Array(5.087, 4.93, 4.78, 5.022, 4.398, 4.893, 4.74, 5.063, 4.81, 4.23, 4.483, 5.083, 5.028, 4.506, 4.804, 5.201, 3.98, 4.01, 4.5, 4.5, 4.552, 4.856, 4 , 4.14, 4.352, 5.76, 4.09, 4.53, 5.1, 4.7, 5.15, 5 , 4.94, 4.55, 24.15)
                   
  const b6 = Array(1 , 0.82, 0.79, 0.85, 0.54, 0.74, 0.61, 0.89, 0.55, 0.48, 0.52, 0.5, 0.67, 0.65, 0.64, 0.72, 0.43, 0.45, 1 , 1 , 1 , 0.68, 0.5, 1 , 0.84, 0.45, 0.84, 0.9, 0.95, 0.53, 0.78, 0.8, 0.67, 0.9, 5 )
                   
        
  let theta = 300  / T
  let flag=0
  let e = rho * T / 216.7  
  let SumSiFi = 0 
  for(let i=0;i<34;i+=1){
    let fi=f0[i]
    let Si = b1 [i] * 0.1 * e * Math.pow(theta , 3.5) * Math.exp(b2 [i] * (1 - theta))
    let df = b3 [i] * 0.0001 * (p * Math.pow(theta , b4 [i]) + b5 [i] * e * Math.pow(theta , b6 [i]))
    df = df = 0.535 * df + Math.sqrt(0.217 * df * df + 2.1316E-12 * fi * fi / theta)
    let Delta=0
    fi = (f / fi) * ((df - Delta * (fi - f)) / ((fi - f) *(fi-f) + df * df) + (df - Delta * (fi + f)) / ((fi + f) *(fi+f) + df * df))

    SumSiFi = SumSiFi + (Si * fi)
  }
  return 4.21*0.182 * f * SumSiFi
}
)}

function _specific_atten_water11(){return(
function specific_atten_water11(f, p, rho, T){

  const f0 = Array(22.23508, 67.80396, 119.99594, 183.310087, 321.22563, 325.152888, 336.227764, 380.197353, 390.134508, 437.346667, 439.150807, 443.018343, 448.001085, 470.888999, 474.689092, 488.490108, 503.568532, 504.482692, 547.67644, 552.02096, 556.935985, 620.700807, 645.766085, 658.00528, 752.033113, 841.051732, 859.965698, 899.303175, 902.611085, 906.205957, 916.171582, 923.112692, 970.315022, 987.926764, 1780 )
                   
  const b1 = Array(0.1079, 0.0011, 0.0007, 2.273, 0.047, 1.514, 0.001, 11.67, 0.0045, 0.0632, 0.9098, 0.192, 10.41, 0.3254, 1.26, 0.2529, 0.0372, 0.0124, 0.9785, 0.184, 497 , 5.015, 0.0067, 0.2732, 243.4, 0.0134, 0.1325, 0.0547, 0.0386, 0.1836, 8.4, 0.0079, 9.009, 134.6, 17506)
                   
  const b2 = Array(2.144, 8.732, 8.353, 0.668, 6.179, 1.541, 9.825, 1.048, 7.347, 5.048, 3.595, 5.048, 1.405, 3.597, 2.379, 2.852, 6.731, 6.731, 0.158, 0.158, 0.159, 2.391, 8.633, 7.816, 0.396, 8.177, 8.055, 7.914, 8.429, 5.11, 1.441, 10.293, 1.919, 0.257, 0.952)
                   
  const b3 = Array(26.38, 28.58, 29.48, 29.06, 24.04, 28.23, 26.93, 28.11, 21.52, 18.45, 20.07, 15.55, 25.64, 21.34, 23.2, 25.86, 16.12, 16.12, 26 , 26 , 30.86, 24.38, 18 , 32.1, 30.86, 15.9, 30.6, 29.85, 28.65, 24.08, 26.73, 29 , 25.5, 29.85, 196.3)
                  
  const b4 = Array(0.76, 0.69, 0.7, 0.77, 0.67, 0.64, 0.69, 0.54, 0.63, 0.6, 0.63, 0.6, 0.66, 0.66, 0.65, 0.69, 0.61, 0.61, 0.7, 0.7, 0.69, 0.71, 0.6, 0.69, 0.68, 0.33, 0.68, 0.68, 0.7, 0.7, 0.7, 0.7, 0.64, 0.68, 2 )
                   
  const b5 = Array(5.087, 4.93, 4.78, 5.022, 4.398, 4.893, 4.74, 5.063, 4.81, 4.23, 4.483, 5.083, 5.028, 4.506, 4.804, 5.201, 3.98, 4.01, 4.5, 4.5, 4.552, 4.856, 4 , 4.14, 4.352, 5.76, 4.09, 4.53, 5.1, 4.7, 5.15, 5 , 4.94, 4.55, 24.15)
                   
  const b6 = Array(1 , 0.82, 0.79, 0.85, 0.54, 0.74, 0.61, 0.89, 0.55, 0.48, 0.52, 0.5, 0.67, 0.65, 0.64, 0.72, 0.43, 0.45, 1 , 1 , 1 , 0.68, 0.5, 1 , 0.84, 0.45, 0.84, 0.9, 0.95, 0.53, 0.78, 0.8, 0.67, 0.9, 5 )

  let theta = 300  / T
  let flag=0
  let e = rho * T / 216.7 
  let SumSiFi = 0
  for(let i=0;i<=34;i+=1){
    let fi = f0[i]
    let Si = b1[i] * 0.1 * e * Math.pow(theta , 3.5) * Math.exp(b2[i] * (1 - theta))
    let df = b3[i] * 0.0001 * (p * Math.pow(theta , b4[i]) + b5[i] * e * Math.pow(theta , b6[i]))
    df = 0.535 * df + Math.sqrt(0.217 * df * df + 2.1316E-12 * fi * fi / theta)
    let Delta = 0
    fi = f / fi * ((df - Delta * (fi - f)) / ((fi - f) ** 2 + df * df) + (df - Delta * (fi + f)) / ((fi + f) ** 2 + df * df))
    SumSiFi = SumSiFi + Si * fi

  }

  return 0.182 * f * SumSiFi
        
    
}
)}

function _9(md){return(
md`Function to compute basic transmission loss due to ducting and atmospheric layer reflection/refraction losses. Loss is not exceeded for p% of the time. This loss needs to be calculated for transhorizon paths
`
)}

function _anomalous_prop(specific_atten_dryair11,specific_atten_water11,median_eff_Re){return(
function anomalous_prop(p, f, dtot, pressure, temp, DELTA_N, BETAo, dlm, dlt, dlr, theta_t, theta_r, hts, hrs, hte, hre, hm, omega, dct, dcr){

  let rho = 7.5 + 2.5 * omega
  let gammao = specific_atten_dryair11(f, pressure, rho, temp + 273.15)
  let gammaw = specific_atten_water11(f, pressure, rho, temp + 273.15)
  let Ag = (gammao + gammaw) * dtot

  let Act = 0
  if ((omega >= 0.75) && (dct <= dlt) && (dct <= 5)){
    Act = -3 * Math.exp(-0.25 * dct ** 2) * (1 + Math.tanh(0.07 * (50 - hts)))
  }
  let Acr = 0
  if ((omega >= 0.75) && (dcr <= dlr) && (dcr <= 5)){
    Acr = -3 * Math.exp(-0.25 * dcr ** 2) * (1 + Math.tanh(0.07 * (50 - hrs)))
  }
  let theta_t2 = theta_t - 0.1 * dlt
  let theta_r2 = theta_r - 0.1 * dlr

  let Ast=0
  if (theta_t2 > 0){
    Ast = 20 * Math.log(1 + 0.361 * theta_t2 * Math.sqrt(f * dlt)) / Math.log(10) + 0.264 * theta_t2 * f ** (1 / 3)
  }
  let Asr=0
  if (theta_r2 > 0){
    Asr = 20 * Math.log(1 + 0.361 * theta_r2 * Math.sqrt(f * dlr)) / Math.log(10) + 0.264 * theta_r2 * f ** (1 / 3)
  }
  let Alf=0
  if (f < 0.5){
    Alf = 45.375 - 137 * f + 92.5 * f ** 2
  }
  let Af= 102.45 + 20 * Math.log(f) / Math.log(10) + 20 * Math.log(dlt + dlr) / Math.log(10) + Alf + Ast + Asr + Act + Acr
  let Di=40
  if (dtot - dlt - dlr < 40){
    Di = dtot - dlt - dlr
  }
  let mu3=1
  if (hm > 10){
    mu3 = Math.exp(-0.000046 * (hm - 10) * (43 + 6 * Di))
  }
  let tau = 1 - Math.exp(-0.000412 * dlm ** 2.41)
  let eps = 3.5
  let alpha = -0.6 - eps * 0.000000001 * dtot ** 3.1 * tau
  if (alpha < -3.4) {
      alpha = -3.4
  }
  let k50 = median_eff_Re(DELTA_N, 1)
  let ae = median_eff_Re(DELTA_N, 2)
  let mu2 = (500 / ae * dtot ** 2 / (Math.sqrt(hte) + Math.sqrt(hre)) ** 2) ** alpha
  if (mu2 > 1){
    mu2 = 1
  }
  let beta= BETAo * mu2 * mu3 

  let GAMMA = 1.076 / (2.0058 - Math.log(beta) / Math.log(10)) ** 1.012 * Math.exp(-(9.51 - 4.8 * Math.log(beta) / Math.log(10) + 0.198 * (Math.log(beta) / Math.log(10)) ** 2) * 0.000001 * dtot ** 1.13)

  let ap = -12 + (1.2 + 0.0037 * dtot) * Math.log(p / beta) / Math.log(10) + 12 * (p / beta) ** GAMMA
  let theta_t1=0
  if (theta_t <= 0.1 * dlt){
    theta_t1 = theta_t 
  }
  else{
    theta_t1 = 0.1 * dlt
  }
  let theta_r1=0
  if (theta_r <= 0.1 * dlr){
    theta_r1 = theta_r
  }
  else{
    theta_r1 = 0.1 * dlr
  }
  let theta_1 = 1000 * dtot / ae + theta_t1 + theta_r1 
  let gammad = 0.00005 * ae * f ** (1 / 3) 
  let Ad = gammad * theta_1 + ap
  return Af + Ad + Ag
  
  
  
}
)}

function _11(specific_atten_water11){return(
specific_atten_water11(50,1000,8.486,25+273.15)
)}

function _x(){return(
23**2
)}

function _13(anomalous_prop){return(
anomalous_prop(0.01,50,109,1013,25,53,3.283,6,28,11,-0.6342,-1.39,50,193,44.582,121.89,119.52,0.3945,500,500)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("beta0_calc")).define("beta0_calc", _beta0_calc);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("specific_atten_dryair11")).define("specific_atten_dryair11", _specific_atten_dryair11);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("specific_atten_water10")).define("specific_atten_water10", _specific_atten_water10);
  main.variable(observer("specific_atten_water11")).define("specific_atten_water11", _specific_atten_water11);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("anomalous_prop")).define("anomalous_prop", ["specific_atten_dryair11","specific_atten_water11","median_eff_Re"], _anomalous_prop);
  main.variable(observer()).define(["specific_atten_water11"], _11);
  main.variable(observer("x")).define("x", _x);
  main.variable(observer()).define(["anomalous_prop"], _13);
  const child1 = runtime.module(define1);
  main.import("median_eff_Re", child1);
  return main;
}
