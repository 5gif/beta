function _1(md){return(
md`# Functions for Calculation of atmospheric gas losses`
)}

function _nj(require){return(
require('https://cdn.jsdelivr.net/gh/nicolaspanel/numjs@0.16/dist/numjs.min.js')
)}

function _p676_a(){return(
[[0.975, 9.651, 6.690, 0.0, 2.566, 6.850], [2.529, 8.653, 7.170, 0.0, 2.246, 6.800],
             [6.193, 7.709, 7.640, 0.0, 1.947, 6.729], [14.320, 6.819, 8.110, 0.0, 1.667, 6.640],
             [31.240, 5.983, 8.580, 0.0, 1.388, 6.526], [64.290, 5.201, 9.060, 0.0, 1.349, 6.206],
             [124.600, 4.474, 9.550, 0.0, 2.227, 5.085], [227.300, 3.800, 9.960, 0.0, 3.170, 3.750],
             [389.700, 3.182, 10.370, 0.0, 3.558, 2.654], [627.100, 2.618, 10.890, 0.0, 2.560, 2.952],
             [945.300, 2.109, 11.340, 0.0, -1.172, 6.135], [543.400, 0.014, 17.030, 0.0, 3.525, -0.978],
             [1331.800, 1.654, 11.890, 0.0, -2.378, 6.547], [1746.600, 1.255, 12.230, 0.0, -3.545, 6.451],
             [2120.100, 0.910, 12.620, 0.0, -5.416, 6.056], [2363.700, 0.621, 12.950, 0.0, -1.932, 0.436],
             [1442.100, 0.083, 14.910, 0.0, 6.768, -1.273], [2379.900, 0.387, 13.530, 0.0, -6.561, 2.309],
             [2090.700, 0.207, 14.080, 0.0, 6.957, -0.776], [2103.400, 0.207, 14.150, 0.0, -6.395, 0.699],
             [2438.000, 0.386, 13.390, 0.0, 6.342, -2.825], [2479.500, 0.621, 12.920, 0.0, 1.014, -0.584],
             [2275.900, 0.910, 12.630, 0.0, 5.014, -6.619], [1915.400, 1.255, 12.170, 0.0, 3.029, -6.759],
             [1503.000, 0.083, 15.130, 0.0, -4.499, 0.844], [1490.200, 1.654, 11.740, 0.0, 1.856, -6.675],
             [1078.000, 2.108, 11.340, 0.0, 0.658, -6.139], [728.700, 2.617, 10.880, 0.0, -3.036, -2.895],
             [461.300, 3.181, 10.380, 0.0, -3.968, -2.590], [274.000, 3.800, 9.960, 0.0, -3.528, -3.680],
             [153.000, 4.473, 9.550, 0.0, -2.548, -5.002], [80.400, 5.200, 9.060, 0.0, -1.660, -6.091],
             [39.800, 5.982, 8.580, 0.0, -1.680, -6.393], [18.560, 6.818, 8.110, 0.0, -1.956, -6.475],
             [8.172, 7.708, 7.640, 0.0, -2.216, -6.545], [3.397, 8.652, 7.170, 0.0, -2.492, -6.600],
             [1.334, 9.650, 6.690, 0.0, -2.773, -6.650], [940.300, 0.010, 16.640, 0.0, -0.439, 0.079],
             [67.400, 0.048, 16.400, 0.0, 0.000, 0.000], [637.700, 0.044, 16.400, 0.0, 0.000, 0.000],
             [237.400, 0.049, 16.000, 0.0, 0.000, 0.000], [98.100, 0.145, 16.000, 0.0, 0.000, 0.000],
             [572.300, 0.141, 16.200, 0.0, 0.000, 0.000], [183.100, 0.145, 14.700, 0.0, 0.000, 0.000]]
)}

function _4(p676_a){return(
p676_a.slice([null, 0])
)}

function _p676_oxygen_f0(){return(
[50.474214, 50.987745, 51.503360, 52.021429, 52.542418, 53.066934, 53.595775,
                     54.130025, 54.671180, 55.221384, 55.783815, 56.264774, 56.363399, 56.968211,
                     57.612486, 58.323877, 58.446588, 59.164204, 59.590983, 60.306056, 60.434778,
                     61.150562, 61.800158, 62.411220, 62.486253, 62.997984, 63.568526, 64.127775,
                     64.678910, 65.224078, 65.764779, 66.302096, 66.836834, 67.369601, 67.900868,
                     68.431006, 68.960312, 118.750334, 368.498246, 424.763020, 487.249273, 715.392902,
                     773.839490, 834.145546]
)}

function _p676_vapour_f0(){return(
[ 22.235080,  67.803960, 119.995940, 183.310087, 321.225630, 325.152888,
                                        336.227764, 380.197353, 390.134508, 437.346667, 439.150807, 443.018343,
                                        448.001085, 470.888999, 474.689092, 488.490108, 503.568532, 504.482692,
                                        547.676440, 552.020960, 556.935985, 620.700807, 645.766085, 658.005280,
                                        752.033113, 841.051732, 859.965698, 899.303175, 902.611085, 906.205957,
                                        916.171582, 923.112692, 970.315022, 987.926764, 1780.000000]
)}

function _p676_b(){return(
[[.1079, 2.144, 26.38, .76, 5.087, 1.00], [.0011, 8.732, 28.58, .69, 4.930, .82],
             [.0007, 8.353, 29.48, .70, 4.780, .79], [2.273, .668, 29.06, .77, 5.022, .85],
             [.0470, 6.179, 24.04, .67, 4.398, .54], [1.514, 1.541, 28.23, .64, 4.893, .74],
             [.0010, 9.825, 26.93, .69, 4.740, .61], [11.67, 1.048, 28.11, .54, 5.063, .89],
             [.0045, 7.347, 21.52, .63, 4.810, .55], [.0632, 5.048, 18.45, .60, 4.230, .48],
             [.9098, 3.595, 20.07, .63, 4.483, .52], [.1920, 5.048, 15.55, .60, 5.083, .50],
             [10.41, 1.405, 25.64, .66, 5.028, .67], [.3254, 3.597, 21.34, .66, 4.506, .65],
             [1.260, 2.379, 23.20, .65, 4.804, .64], [.2529, 2.852, 25.86, .69, 5.201, .72],
             [.0372, 6.731, 16.12, .61, 3.980, .43], [.0124, 6.731, 16.12, .61, 4.010, .45],
             [.9785, .158, 26.00, .70, 4.500, 1.00], [.1840, .158, 26.00, .70, 4.500, 1.00],
             [497.0, .159, 30.86, .69, 4.552, 1.00], [5.015, 2.391, 24.38, .71, 4.856, .68],
             [.0067, 8.633, 18.00, .60, 4.000, .50], [.2732, 7.816, 32.10, .69, 4.140, 1.00],
             [243.4, .396, 30.86, .68, 4.352, .84], [.0134, 8.177, 15.90, .33, 5.760, .45],
             [.1325, 8.055, 30.60, .68, 4.090, .84], [.0547, 7.914, 29.85, .68, 4.530, .90],
             [.0386, 8.429, 28.65, .70, 5.100, .95], [.1836, 5.110, 24.08, .70, 4.700, .53],
             [8.400, 1.441, 26.73, .70, 5.150, .78], [.0079, 10.293, 29.00, .70, 5.000, .80],
             [9.009, 1.919, 25.50, .64, 4.940, .67], [134.6, .257, 29.85, .68, 4.550, .90],
             [17506., .952, 196.3, 2.00, 24.15, 5.00]]
)}

function _get_specific_attenuation(p676_a,nj,p676_b,p676_oxygen_f0,p676_vapour_f0,spe){return(
function get_specific_attenuation(pressure, water_vapour_pressure, temperature, frequency_MHz){
  /*
        """
         Calculates specific attenuation (dB/km) of an atmosphere layer according to ITU-T P.676-11

         Parameters
         ----------
             pressure (float): dry-air partial pressure (hPa)
             water_vapour_pressure (float): water-vapour partial pressure (hPa)
             temperature (float): temperature(K)
             frequency_MHz (float) : carrier frequency (MHz)

         Returns
         -------
             specific_attenuation (float): specific gaseous attenuation (dB/km)
         """
*/
        let theta = 300 / temperature
        let f_GHz = frequency_MHz / 1000

        // line strength
        let s_oxygen = p676_a.slice([null, 0]) * 1e-7 * pressure * theta ** 3 * nj.exp(p676_a.slice([null, 1]) * (1 - theta))
        let s_vapour = p676_b[null, 0] * 1e-1 * water_vapour_pressure * theta ** 3.5  * Math.exp(p676_b[null, 1] * (1 - theta))
        // line width
        let df_oxygen = p676_a[null, 2] * 1e-4 * (pressure * theta ** (.8 - p676_a[null, 3])
                                      + 1.1 * water_vapour_pressure * theta)
        let df_vapour = p676_b[null, 2] * 1e-4 * (pressure * theta ** (p676_b[null, 3])
                                      + p676_b[null, 4] * water_vapour_pressure * theta ** p676_b[null, 5])
        // correction factor
        let delta_oxygen = (p676_a[null, 4] + p676_a[null, 5] * theta) * 1e-4 * 
                       (pressure + water_vapour_pressure) * theta ** .8

        // line shape factor
        let sf_oxygen = f_GHz / p676_oxygen_f0 * 
                    ((df_oxygen - delta_oxygen * (p676_oxygen_f0 - f_GHz)) /
                     ((p676_oxygen_f0 - f_GHz) ** 2 + df_oxygen ** 2) +
                     (df_oxygen - delta_oxygen * (p676_oxygen_f0 + f_GHz)) /
                     ((p676_oxygen_f0 + f_GHz) ** 2 + df_oxygen ** 2))

        let sf_vapour = f_GHz / p676_vapour_f0 * 
                    (df_vapour / ((p676_vapour_f0 - f_GHz) ** 2 + df_vapour ** 2) +
                     df_vapour / ((p676_vapour_f0 + f_GHz) ** 2 + df_vapour ** 2))

        // Debye spectrum width
        let dw = 5.6e-4 * (pressure + water_vapour_pressure) * theta ** .8
        // dry continuum due to pressure-induced nitrogen absorption and the Debye spectrum
        let nd = f_GHz * pressure * theta ** 2 * 
             (6.14e-5 / (dw * (1 + (f_GHz / dw) ** 2))
              + 1.4e-12 * pressure * theta ** 1.5 / (1 + 1.9e-5 * f_GHz ** 1.5))
        let att_oxygen = 0.182 * f_GHz * (nj.sum(s_oxygen * sf_oxygen) + nd)
        let att_vapour = 0.182 * f_GHz * nj.sum(s_vapour * sf_vapour)

        let specific_attenuation = att_oxygen + att_vapour

        return spe
}
)}

function _9(spec_att){return(
spec_att(1013.25,9.97288,288.15,12000)
)}

function _spec_att(p676_a,p676_b,p676_oxygen_f0,p676_vapour_f0){return(
function spec_att(pressure, water_vapour_pressure, temperature, frequency_MHz){
        let theta = 300 / temperature
        let f_GHz = frequency_MHz / 1000
        const s_oxygen=[]
        for (let i = 0; i < 44; i++){
          s_oxygen.push(p676_a[i][0] * 1e-7 * pressure * (theta ** 3) * Math.exp(p676_a[i][1] * (1 - theta)))
        }
        const s_vapour=[]
        for (let i = 0; i < 35; i++){
          s_vapour.push(p676_b[i][0] * 1e-1 * water_vapour_pressure * theta ** 3.5  * Math.exp(p676_b[i][1] * (1 - theta)))
        }
        const df_oxygen=[]
        for (let i = 0; i < 44; i++){
          df_oxygen.push(p676_a[i][2] * 1e-4 * (pressure * theta ** (.8-p676_a[i][3] )
                                      + 1.1 * water_vapour_pressure * theta))
        }
        const df_vapour=[]
        for (let i = 0; i < 35; i++){
          df_vapour.push(p676_b[i][2] * 1e-4 * (pressure * theta ** (p676_b[i][3])
                                      + p676_b[i][4] * water_vapour_pressure * theta ** p676_b[i][5]))
        } 
        const delta_oxygen=[]
        for (let i = 0; i < 44; i++){
          delta_oxygen.push((p676_a[i][4] + p676_a[i][5] * theta) * 1e-4 * 
                       (pressure + water_vapour_pressure) * theta ** .8)
        }
        const sf_oxygen=[]
        for (let i = 0; i < 44; i++){
          sf_oxygen.push(f_GHz / p676_oxygen_f0[i] * 
                    ((df_oxygen[i] - delta_oxygen[i] * (p676_oxygen_f0[i] - f_GHz)) /
                     ((p676_oxygen_f0[i] - f_GHz) ** 2 + df_oxygen[i] ** 2) +
                     (df_oxygen[i] - delta_oxygen[i] * (p676_oxygen_f0[i] + f_GHz)) /
                     ((p676_oxygen_f0[i] + f_GHz) ** 2 + df_oxygen[i] ** 2)))
        }
        const sf_vapour=[]
        for (let i = 0; i < 35; i++){
          sf_vapour.push(f_GHz / p676_vapour_f0[i] * 
                    (df_vapour[i] / ((p676_vapour_f0[i] - f_GHz) ** 2 + df_vapour[i] ** 2) +
                     df_vapour[i] / ((p676_vapour_f0[i] + f_GHz) ** 2 + df_vapour[i] ** 2)))
        }
        let dw = 5.6e-4 * (pressure + water_vapour_pressure) * theta ** .8
        let nd = f_GHz * pressure * theta ** 2 * 
             (6.14e-5 / (dw * (1 + (f_GHz / dw) ** 2))
              + 1.4e-12 * pressure * theta ** 1.5 / (1 + 1.9e-5 * f_GHz ** 1.5))
        let oxy_sum=0
        for (let i = 0; i < 44; i++){
          oxy_sum=oxy_sum+ (s_oxygen[i]*sf_oxygen[i])
        }
        let vapour_sum=0
        for (let i = 0; i < 35; i++){
          vapour_sum=vapour_sum+ (s_vapour[i]*sf_vapour[i])
        }
        let att_oxygen = 0.182 * f_GHz * (oxy_sum + nd)
        let att_vapour = 0.182 * f_GHz * vapour_sum

        let specific_attenuation = att_oxygen + att_vapour

        return specific_attenuation
  
}
)}

function _get_atmospheric_params(spec_att){return(
function  get_atmospheric_params(altitude_km, water_vapour_density_sea_level, f_MHz){
 /*
  Calculates atmospheric parameters based on ITU-R P.619, Atttachment C.5

         Parameters
         ----------
             altitude_km (float) : altitude [km]
             water_vapour_density_sea_level (float) : water vapour density at sea level (g/m**3)
             f_MHz (float) : carrier frequency (MHz)

         Returns
         -------
             temperature (float): temperature(K) at altitude_km in reference atmosphere
             pressure (float): dry-air partial pressure at altitude_km in reference atmosphere (hPa)
             water_vapour_pressure (float): water-vapour partial pressure at altitude_km in reference atmosphere (hPa)
             refractive_index (float) : index of refraction of atmospheric layer at altitude_km
             specific_attenuation (float): specific gaseous attenuation (dB/km)
         """
  */

        let ref_atmosphere_altitude_km = [-1, 11, 20, 32, 47, 51, 71]
        let ref_atmosphere_temp_grad = [-6.5, 0, 1., 2.8, 0, -2.8, -2]
        let ref_atmosphere_temperature = [288.15, 216.65, 216.65, 228.65, 270.65, 270.65, 214.65]
        let ref_atmosphere_pressure = [1013.25, 226.323, 54.750, 8.68, 1.109, 0.669, 0.04]

        let index=0
        while(ref_atmosphere_altitude_km[index+1]<altitude_km){
          index=index+1
        }


        let Ti = ref_atmosphere_temperature[index]
        let Li = ref_atmosphere_temp_grad[index]
        let Hi = ref_atmosphere_altitude_km[index]
        if (Hi < 0){
            Hi = 0
        }
        let Pi = ref_atmosphere_pressure[index]

        let temperature = Ti + Li * (altitude_km - Hi)
        let pressure = Pi * Math.exp(-34.163 * (altitude_km - Hi) / Ti)
        if(Li){
            pressure = Pi * (Ti / (Ti + Li * (altitude_km - Hi))) ** (34.163 / Li)
        }
      
        let water_vapour_density = water_vapour_density_sea_level * Math.exp(-altitude_km / 2)
        let water_vapour_pressure = water_vapour_density * temperature / 216.7
        let refractive_index = 1 + 1e-6 * (77.6 / temperature *
                                       (pressure + water_vapour_pressure +
                                        4810 * water_vapour_pressure / pressure))
        let specific_attenuation = spec_att(pressure, water_vapour_pressure,
                                                                         temperature, f_MHz)

        return [temperature, pressure, water_vapour_pressure, refractive_index, specific_attenuation,water_vapour_pressure]
}
)}

function _12(get_atmospheric_params){return(
get_atmospheric_params(1,12.5,30000)
)}

function _z(){return(
[1,2,3,4]
)}

function _14(z){return(
z.reduce((a, b) => a + b, 0)
)}

function _15(spec_att){return(
spec_att
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("nj")).define("nj", ["require"], _nj);
  main.variable(observer("p676_a")).define("p676_a", _p676_a);
  main.variable(observer()).define(["p676_a"], _4);
  main.variable(observer("p676_oxygen_f0")).define("p676_oxygen_f0", _p676_oxygen_f0);
  main.variable(observer("p676_vapour_f0")).define("p676_vapour_f0", _p676_vapour_f0);
  main.variable(observer("p676_b")).define("p676_b", _p676_b);
  main.variable(observer("get_specific_attenuation")).define("get_specific_attenuation", ["p676_a","nj","p676_b","p676_oxygen_f0","p676_vapour_f0","spe"], _get_specific_attenuation);
  main.variable(observer()).define(["spec_att"], _9);
  main.variable(observer("spec_att")).define("spec_att", ["p676_a","p676_b","p676_oxygen_f0","p676_vapour_f0"], _spec_att);
  main.variable(observer("get_atmospheric_params")).define("get_atmospheric_params", ["spec_att"], _get_atmospheric_params);
  main.variable(observer()).define(["get_atmospheric_params"], _12);
  main.variable(observer("z")).define("z", _z);
  main.variable(observer()).define(["z"], _14);
  main.variable(observer()).define(["spec_att"], _15);
  return main;
}
