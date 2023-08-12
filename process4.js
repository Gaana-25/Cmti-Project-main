let developed = false;

if (developed) {
    console.log = function() {};
}
let stop = false;

let machine_select;
let machine_option;
let process_name;

let timesRun = 0;
let secs = 0;
// let times = "2019-12-24 15:13:27";
let times = "2021-07-29 10:02:08";
// console.log(typeof(secs));
// let arrr = Array.from(Array(parseInt(secs)), (e, i) => i + 1);
let g;
let g1;
let onepart = 0;
let k = 0;
let loop = 1;
var demo = document.getElementById('process_chart');
var div = document.createElement('div');
div.className = "className";
div.style.display = 'inline-block';
div.style.margin = '4px';
demo.appendChild(div);
let rep = document.getElementById("reps").value;
let split_current = []
let livediv = document.getElementById("real_chart");

function openPage(pageName, elmnt, num) {
    // Hide all elements with class="tabcontent" by default */

    var i, tabcontent, tablinks;
    let color = "rgba(255, 255, 255, 0.527)";
    // let color = "#0B2D41";
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    if (num == 1) {
        document.getElementById('sample-data-tablink').style.backgroundColor = "white";
        document.getElementById('live-data-tablink').style.backgroundColor = "white";
        document.getElementById('defaultOpen').style.backgroundColor = color;
    } else if (num == 2) {
        document.getElementById('live-data-tablink').style.backgroundColor = "white";
        document.getElementById('defaultOpen').style.backgroundColor = "white";
        document.getElementById('sample-data-tablink').style.backgroundColor = color;
    } else if (num == 3) {
        document.getElementById('defaultOpen').style.backgroundColor = "white";
        document.getElementById('sample-data-tablink').style.backgroundColor = "white";
        document.getElementById('live-data-tablink').style.backgroundColor = color;

    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "grid";

    // Add the specific color to the button used to open the tab content
    // elmnt.style.backgroundColor = color;

}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();



function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function() {

    // times = "2019-12-24 15:13:27";
    times = "2021-07-29 10:02:08";
    //let times = moment().subtract(2, 'hours').format("YYYY-MM-DD HH:mm:ss");
    // document.getElementById("start").addEventListener("click", openPage('sample-data-graph', "sone", 2), false);
    document.getElementById("start").addEventListener("click", function() { getData(times, drawChart, 1); }, false);


})



let chi_square = {
    prob_99: [0.000157088, 0.020100672, 0.114831802, 0.297109481, 0.554298077, 0.87209033, 1.239042306, 1.646497373, 2.087900736, 2.55821216, 3.053484107, 3.570568971, 4.106915472, 4.660425063, 5.229348884, 5.81221247, 6.407759778, 7.014910901, 7.632729648, 8.260398333, 8.897197942, 9.542492339, 10.19571556, 10.85636148, 11.52397537, 12.19814692, 12.87850439, 13.56470975, 14.25645458, 14.95345653, 15.6554564, 16.36221555, 17.07351367, 17.78914692, 18.50892623, 19.23267583, 19.96023204, 20.69144206, 21.42616306, 22.16426125, 22.90561111, 23.65009468, 24.39760097, 25.14802538, 25.90126919, 26.65723912, 27.41584691, 28.17700895, 28.94064597, 29.7066827, 30.47504759, 31.24567261, 32.01849293, 32.79344678, 33.57047525, 34.34952206, 35.13053343, 35.91345794, 36.69824635, 37.48485153, 38.27322826, 39.0633332, 39.85512471, 40.64856283, 41.44360913, 42.24022666, 43.03837987, 43.8380345, 44.63915758, 45.44171731, 46.24568302, 47.05102512, 47.85771504, 48.66572519, 49.47502889, 50.28560038, 51.09741471, 51.91044776, 52.72467616, 53.54007729, 54.35662923, 55.17431075, 55.99310123, 56.81298069, 57.63392976, 58.45592961, 59.27896195, 60.10300906, 60.92805366, 61.754079, 62.58106878, 63.40900714, 64.23787865, 65.06766831, 65.89836149, 66.72994397, 67.56240189, 68.39572174, 69.22989036, 70.06489493],
    prob_95: [0.00393214, 0.102586589, 0.351846318, 0.710723021, 1.145476226, 1.635382894, 2.167349909, 2.732636793, 3.325112843, 3.940299136, 4.574813079, 5.226029488, 5.891864338, 6.570631384, 7.260943928, 7.961645572, 8.671760205, 9.390455081, 10.11701306, 10.85081139, 11.59130521, 12.33801458, 13.09051419, 13.84842503, 14.61140764, 15.37915658, 16.15139585, 16.92787504, 17.70836618, 18.49266098, 19.28056856, 20.07191346, 20.86653399, 21.66428071, 22.46501522, 23.26860902, 24.07494256, 24.88390438, 25.6953904, 26.5093032, 27.32555147, 28.1440495, 28.96471667, 29.78747708, 30.61225915, 31.43899527, 32.26762153, 33.09807743, 33.93030562, 34.76425168, 35.59986394, 36.43709324, 37.2758928, 38.11621806, 38.95802653, 39.80127763, 40.64593263, 41.49195448, 42.33930773, 43.18795845, 44.03787413, 44.88902356, 45.74137684, 46.59490522, 47.4495811, 48.30537793, 49.16227018, 50.02023325, 50.87924348, 51.73927805, 52.60031495, 53.46233296, 54.3253116, 55.18923108, 56.05407229, 56.91981675, 57.78644661, 58.65394456, 59.52229389, 60.39147839, 61.26148237, 62.13229063, 63.00388842, 63.87626144, 64.74939583, 65.62327812, 66.49789524, 67.37323449, 68.24928355, 69.12603043, 70.00346347, 70.88157134, 71.76034302, 72.63976779, 73.51983519, 74.40053508, 75.28185754, 76.16379294, 77.04633186, 77.92946517],
    prob_90: [0.015790774, 0.210721031, 0.584374374, 1.063623217, 1.610307987, 2.204130656, 2.833106918, 3.489539126, 4.168159008, 4.865182052, 5.57778479, 6.30379606, 7.04150458, 7.78953361, 8.546756242, 9.312236354, 10.08518633, 10.86493612, 11.65091003, 12.44260921, 13.23959798, 14.04149319, 14.8479558, 15.65868405, 16.473408, 17.29188499, 18.11389597, 18.93924237, 19.76774356, 20.59923461, 21.4335645, 22.27059448, 23.11019674, 23.95225327, 24.79665478, 25.64329988, 26.49209426, 27.34295004, 28.19578518, 29.05052293, 29.90709137, 30.76542301, 31.6254544, 32.48712579, 33.35038089, 34.21516651, 35.08143242, 35.94913102, 36.81821727, 37.68864839, 38.56038379, 39.43338485, 40.30761485, 41.18303878, 42.05962329, 42.93733653, 43.8161481, 44.69602892, 45.5769512, 46.4588883, 47.34181472, 48.225706, 49.11053868, 49.99629021, 50.88293897, 51.77046414, 52.65884569, 53.54806438, 54.43810163, 55.32893957, 56.22056097, 57.11294919, 58.00608819, 58.89996246, 59.79455705, 60.68985747, 61.58584975, 62.48252034, 63.37985614, 64.27784447, 65.17647304, 66.07572996, 66.97560368, 67.87608301, 68.77715708, 69.67881538, 70.58104766, 71.48384399, 72.38719472, 73.29109048, 74.19552215, 75.10048085, 76.00595797, 76.91194512, 77.81843412, 78.72541703, 79.6328861, 80.54083379, 81.44925275, 82.35813581]
}

let normal_dist = {
    p0_999: 3.290526731,
    p0_995: 2.807033768,
    p0_99: 2.575829304,
    p0_975: 2.241402728,
    p0_95: 1.959963985,
    p0_9: 1.644853627

}

let getMean = function(data) {
    return data.reduce(function(a, b) {
        return Number(a) + Number(b);
    }) / data.length;
};

// Standard Deviation
let getSD = function(data) {
    let m = getMean(data);
    return Math.sqrt(data.reduce(function(sq, n) {
        return sq + Math.pow(n - m, 2);
    }, 0) / (data.length - 1));
};
// function startProcess(times) {
//     let rep = document.getElementById("reps").value;
//     let secs = document.getElementById("secs").value;
//     console.log(`seconds : ${secs} and repitition : ${rep}`);
//     let start_time = moment(times).format("YYYY-MM-DD HH:mm:ss");
//     let stop_time = moment(start_time).add(secs, 'seconds').format("YYYY-MM-DD HH:mm:ss");
//     // let start_time = Math.floor(Date.now() / 1000); // Floor is added to remove milliseconds and nanoseconds in unix timestamp and 16200 is to convert it into ///////localtime from database time
//     let curr_values = getData(start_time, stop_time, rep);
//     let add_val = curr_values.length;
//     curr_values[add_val] = stop_time;
//     console.log(start_time);
//     console.log(stop_time);
//     return curr_values;

// onclick="openPage('sample-data-graph', this, 2);"

function getData(times, callback, id) {

    machine_select = document.getElementById("machines-names");
    machine_option = machine_select.options[machine_select.selectedIndex].text;
    process_name = document.getElementById("name").value;
    document.getElementById('sample-data-tablink').style.display = "block";
    updateTable();
    openPage('sample-data-graph', "this", 2);

    rep = document.getElementById("reps").value;
    secs = document.getElementById("secs").value;
    onepart = (1 / rep) * 100;
    console.log(`seconds : ${secs} and repitition : ${rep}`);
    let start_time = moment(times).format("YYYY-MM-DD HH:mm:ss");
    // let stop_time = moment(start_time).add(secs, 'seconds').format("YYYY-MM-DD HH:mm:ss");
    let st = Date.now() / 1000;
    console.log(`https://cmti-iiot.online/phpapi/api/process/process_num.php?start=${start_time}&num=${secs}`);


    live = $.post(`https://cmti-iiot.online/phpapi/api/process/process_num.php?start=${start_time}&num=${secs}`, function(data) {
        // let current = splitdata(data);
        console.log(`time_to_download : ${(Date.now() / 1000) - st}`);
        let curr_values = plotChart(data, rep);
        console.log(start_time);
        console.log(curr_values[3]);
        if (id == 1) {
            callback(curr_values, iterate, div);
        } else {
            callback(curr_values);
        }
        // callback(curr_values, iterate, div);
    });

}

function plotChart(data, rep) {

    console.log(data);
    len_data = data.length;
    let check_time = data[len_data - 1].timestamp;
    comp_result = check_time == data[len_data - 1].timestamp ? 1 : 0;
    let f_current = dataFormat(data, len_data, loop, check_time);
    console.log(comp_result);
    loop = loop + 1;
    return f_current;
}

function dataFormat(datas, len, loop, check_time) {

    a = datas;
    console.log(k);
    console.log(a)
    let new_len = a.length;
    // for (let k = 0; k < loop; k++) {
    split_current[k] = [];
    console.log(split_current[k]);
    a.forEach(function(entry) {
        split_current[k].push(parseFloat(entry.current1));
    });
    // }
    console.log("drawing chart");
    console.log(split_current);
    let cur_max = Math.max(...a); // deconstructing by giving ... in array
    let cur_min = Math.min(...a);
    cur_max = cur_max + cur_max * (20 / 100);
    cur_min = cur_min - cur_min * (20 / 100);
    let data = [];
    for (var j = 0; j < len; ++j) {
        data[j] = [j];
    }
    for (var i = 0; i < loop; ++i) {
        for (var j = 0; j < len; ++j) {
            data[j][i + 1] = split_current[i][j];
        }
    }
    console.log(data);
    console.log("chart function");
    // drawChart(data, cur_min, cur_max, last_time);
    k = k + 1;
    return [data, cur_min, cur_max, check_time];
}

function drawChart(full_data, callback, div) {


    frame(onepart);
    let current = full_data[0];
    let cur_min = full_data[1];
    let cur_max = full_data[2];
    let last_time = full_data[3];
    // let last_time = full_data[3];
    g = new Dygraph(
        div,
        current, {
            title: "Sample Data for Tolerance",
            width: 600,
            height: 400,
            //rollPeriod: 7,
            xlabel: "Seconds(s)",
            ylabel: "Current(A)",
            labelsDiv: "label1",
            drawPoints: true,
            showRoller: false,
	    strokeWidth: 3,
            legend: "always",
            valueRange: [cur_min, cur_max],
            // labels: ['Time', 'Current']
        });
    var onclick = function(ev) {
        if (g.isSeriesLocked()) {
            g.clearSelection();
        } else {
            g.setSelection(g.getSelection(), g.getHighlightSeries(), true);
        }
    };
    g.updateOptions({ clickCallback: onclick }, true);

    // window.intervalId = setInterval(function() {
    //     let current = getData(last_time, drawChart, 2);
    //     g.updateOptions({ 'file': current });
    //     timesRun += 1;
    //     if (timesRun === 3) {
    //         clearInterval(interval);
    //     }
    // }, 1000);
    console.log(`k =${k} and rep = ${rep}`);
    console.log(current);
    if (k == rep) {
        console.log("graph completed");
        findTolerance(current);
        return false;
    } else {
        callback(last_time);
    }

}

function updates(datas) {
    console.log("updating")
    console.log(datas[0]);
    // g.updateOptions({ 'file': datas[0] });
    drawChart(datas, iterate, div);
}

function iterate(last_time) {

    let new_time = moment(last_time).add(0, 'seconds').format("YYYY-MM-DD HH:mm:ss");
    //timeout(1000);
    setTimeout(() => {
        let current = getData(new_time, updates, 2);
    }, 800);


}

let tolval;
let lim;

function findTolerance(data) {

    console.log(data);

    lim = [];
    let val = data;
    val.forEach(function(entry) {
        entry.shift();
    });
    // console.log(val);
    tolval = [];
    console.log("Calculate Tolerance");

    function toleranceCalc(values) {

        let n = values.length;
        let Dof = n - 1;
        let alpha = 0.01; // Confidence of 99% which is 100-99 = 1/100
        let prob = 0.9; // probability of 90% rate
        let z_critic = normal_dist.p0_9;
        let chi_value = chi_square.prob_99[Dof - 1];
        console.log(`z_cr = ${z_critic} and ch_val = ${chi_value}`);
        let k = z_critic * (Math.sqrt(Dof * (1 + (1 / n)) / chi_value));
        console.log(k);
        let num = ((n - 3 - chi_value))
        let den = (2 * ((n + 1) * (n + 1)));
        let w = Math.sqrt(1 + (num / den));
        // let w = Math.sqrt((1 + ((n - 3 - chi_value) / (2 * ((n + 1) * (n + 1))))));
        console.log(w)
        let k_dash = k * w;
        console.log(k_dash);
        let mean = getMean(values);
        console.log(mean);
        let stdev = getSD(values);
        console.log(stdev);
        console.log(values);
        let upper_limit = mean + (stdev * k_dash);
        let lower_limit = mean - (stdev * k_dash);
        console.log(`u=${upper_limit} and l = ${lower_limit}`);
        return [upper_limit, lower_limit];
    }

    for (let id = 0; id < val.length; id++) {

        let limits = toleranceCalc(val[id]);
        lim[id] = [id, limits[0], limits[1]];
        tolval[id] = [id, limits[0], limits[1], val[0][id]];

    }
    console.log(tolval);
    document.getElementById("finished-statement").textContent = "Calculation Completed";
    document.getElementById("finished-statement").style.color = "green";
    document.getElementById("live-data-button").style.color = "white";
    document.getElementById("live-data-button").style.backgroundColor = "green";
    document.getElementById("live-data-button").disabled = false;
    // graphlive(tolval, lim, parseInt(secs), NaN);


    // val.forEach(function(entry) {
    //     split_current[k].push(parseFloat(entry.current1));
    // });

}




// console.log(chi_square.prob_95[rep]);

// Draw real time graph

async function graphlive(data, limits, nt) {

    let loop = 0;
    let current = data;
    g1 = new Dygraph(
        livediv,
        current, {
            title: "Real Time with Tolerance",
            xlabel: "Seconds(s)",
            ylabel: "Current(A)",
            //rollPeriod: 10,
            width: 600,
            height: 400,
            labelsDiv: "label2",
            drawPoints: true,
	    strokeWidth: 3,
            legend: "always",
            showRoller: false,
            // valueRange: [cur_min, cur_max],
            labels: ['Time', 'Upper Limit', 'Lower Limit', 'Live Current']
        });

    // let times = 0;
    // let setid = setInterval(function() {
    //     times = times + 1;
    //     if (times == 4) {
    //         clearInterval(setid);
    //     }
    if (nt == secs) {
        let lstart = moment(times).format("YYYY-MM-DD HH:mm:ss");
        //let lstart = moment().subtract(10, 'minutes').format("YYYY-MM-DD HH:mm:ss");
        updatelivechart(limits, lstart);
    }
    // }, 1000);

}

async function updatelivechart(limits, timest) {

    loop = loop + 1;
    if (loop == 5) {
        return;
    }
    // let tolval = [];
    let time = Date.now() / 1000;
    let lstart = moment(timest).add(parseInt(secs) + 1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
    console.log(lstart);
    let k = 0;
    let vals = Array.from(Array(parseInt(secs)), (e, i) => i + 1);
    // let setid = setInterval(function() {
    for (const item of vals) {
        if (stop) {
            return false;
        }
        url = `https://cmti-iiot.online/phpapi/api/process/process_num.php?start=${lstart}&num=${item}`;
        // console.log(url);
        let response = await fetch(url, {
            method: 'POST'
                // headers: {
                //     'Content-Type': 'application/json;charset=utf-8'
                // }
                // body: JSON.stringify(user)
        });
        let data = await response.json()
        let val = data;
        console.log(data);
        let livecurr = [];
        let lis = limits;
        console.log(lis);
        val.forEach(function(entry) {
            livecurr.push(parseFloat(entry.current1));
        });
        console.log(typeof(livecurr[0]));
        for (let d = 0; d < limits.length; d++) {
            lis[d][3] = livecurr[d];
        }
        console.log(lis);
        console.log(`number: ${item}`);
        console.log(`time_to_download : ${(Date.now() / 1000) - time}`);
        // console.log(dur);
        await graphlive(lis, limits, item);
        console.log("drawn");
        await timeout(800);
    }
    insertTable();
    document.getElementById('live-graph-details').style.display = 'grid';
}

// async function updatelivechart(limits) {

//     // let tolval = [];
//     let nu = 2;
//     let lstart = moment().subtract(3, 'hours').format("YYYY-MM-DD HH:mm:ss");
//     console.log(lstart);
//     let k = 0;
//     let vals = [2, 4, 6, 8, 10];
//     // let setid = setInterval(function() {
//     for (const item of vals) {
//         lives = $.post(`http://cmti-iiot.online/phpapi/api/process/process_num.php?start=${lstart}&num=${item}`, function(data) {

//             let val = data;
//             console.log(data);
//             let livecurr = [];
//             let lis = limits;
//             console.log(lis);
//             val.forEach(function(entry) {
//                 livecurr.push(parseFloat(entry.current1));
//             });
//             console.log(typeof(livecurr[0]));
//             // console.log(limits[0].push(livecurr[0]));
//             for (let d = 0; d < limits.length; d++) {
//                 // console.log(lis[d]);
//                 lis[d][3] = livecurr[d];
//             }
//             console.log(lis);
//             console.log(nt);
//             // g1.updateOptions({ 'file': lis });
//             await graphlive(data, limits, item);
//             console.log("drawn");
//         });
//     }
//     // if (nt == limits.length) {
//     //     nt = 2;
//     //     console.log("completed")

//     // }
//     //     k = k + 1;
//     //     if (k == 5) {
//     //         clearInterval(serid);
//     //     }
//     // },
//     // 1000);

// }

// For loading with percentage
let loading_width = 0;

function frame(percentage) {
    var elem = document.getElementById("myBar");
    // var width = 1;
    if (loading_width >= 100) {
        clearInterval(id);
        i = 0;
    } else {
        loading_width = loading_width + percentage;
        elem.style.width = loading_width + "%";
    }
}

document.getElementById("live-data-button").addEventListener("click", function() {
    document.getElementById('live-data-tablink').style.display = "block";
    openPage('live-data-graph', "this", 3);
    // console.log(document.getElementById("machine-name"));
    document.getElementById("machine-name2").innerText = `Machine : ${machine_option}`;
    document.getElementById("date-time").innerText = `Date :${moment().format("DD-MM-YYYY")}`;
    graphlive(tolval, lim, parseInt(secs), NaN);
}, false);


let insertRow = 0;

function insertTable() {
    var table = document.getElementById("live-table");
    var row = table.insertRow(insertRow);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = insertRow + 1;
    cell2.innerHTML = moment().format("hh:mm:ss");
    cell3.innerHTML = "GOOD";
    insertRow++;
}

function updateTable() {
    let oCells = [];
    let table7 = document.getElementById("process-tables");
    oCells[0] = table7.rows.item(0).cells; //machine name
    oCells[1] = table7.rows.item(1).cells; //process name
    oCells[2] = table7.rows.item(2).cells; //seconds
    oCells[3] = table7.rows.item(3).cells; //repetition

    oCells[0].item(3).innerHTML = machine_option;
    oCells[1].item(3).innerHTML = process_name;
    oCells[2].item(3).innerHTML = secs;
    oCells[3].item(3).innerHTML = rep;

    console.log("start");
    console.log(table7);
    console.log("stop");
}

let butclick = 1;
document.getElementById("stop").addEventListener("click", function() {
    document.getElementById("stop").style.backgroundColor = "black";
    document.getElementById("stop").innerText = "Process Stopped";
    document.getElementById("stop").disabled = true;
    stop = true;
    console.log("print");
}, false);