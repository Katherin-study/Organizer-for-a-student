var data, upH, upM, downH, downM, interval;
var events_count, e_day, e_color, e_upH, e_upM, e_downH, e_downM, e_name;

//ВЗЯТИЕ ОБЩИХ ДАННЫХ ИЗ БАЗЫ
try{
    function getDataFromDatabase() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                upH = Number(data['upH']);
                upM = Number(data['upM']);
                downH = Number(data['downH']);
                downM = Number(data['downM']);
                interval=Number(data['interval']);
                //ПОСТРОЕНИЕ ТАБЛИЦЫ
                BuildTable(upH, upM, downH, downM, interval);
            }
        };
        xhttp.open("POST", "http://App/php/api.php", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send();
    }
    getDataFromDatabase();
} 
catch(err){console.log(err.message);}


try{
    function getDataFromDatabase2() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                events_count=data.events.length;
                for (let i=0; i<events_count; i++){
                    e_day=Number(data.events[i].day);
                    e_color=data.events[i].color;
                    e_upH=Number(data.events[i].upH);
                    e_upM=Number(data.events[i].upM);
                    e_downH=Number(data.events[i].downH);
                    e_downM=Number(data.events[i].downM);
                    e_name=data.events[i].name;
                    //ДОБАВЛЕНИЕ СОБЫТИЙ В ТАБЛИЦУ
                    createEvent(e_upH, e_upM, e_downH, e_downM, e_day, e_name, interval, e_color);
                }
            }
        };
        xhttp.open("POST", "http://App/php/api.php", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send();
    }
    getDataFromDatabase2();
} 
catch(err){console.log(err.message);}

function BuildTable(upH, upM, downH, downM, interval) {
    let table = document.getElementById('table_main');
    while (!((upH > downH) || (upH === downH && upM > downM))) {
    var tr = document.createElement('tr');
    tr.id="tr_" + upH + "_" + upM;
    for (let i=0; i<8; i++){
        var td = document.createElement('td');
        td.id="td_" + upH + "_" + upM + "_" + i;
        if (i === 0) {
            td.textContent = `${upH}:${(upM < 10 ? '0' : '') + upM}`;
        } else{
        td.textContent = " ";
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
    if ((upM += interval) >= 60) {
        upH++;
        upM = 0;
    }
}
}

function createEvent(upH, upM, downH, downM, day, name, interval, color) {
    var count=1;
    fUpH=upH;
    fUpM=upM;
    td = document.getElementById("td_" + fUpH + "_" + fUpM + "_" + day);
    while (!((upH >= downH) || (upH === downH && upM >= downM))) {
        if ((upM += interval) >= 60) {
            upH++;
            upM = 0;
        }
        var td1 = document.getElementById("td_" + upH + "_" + upM + "_" + day);
        tr = document.getElementById("tr_" + upH + "_" + upM);
        tr.removeChild(td1);
        count++;
    }
    td.setAttribute("rowspan", count);
    td.id="td_" + upH + "_" + upM + "_" + day;
    td.textContent=name;
    td.style.backgroundColor=color;
}
