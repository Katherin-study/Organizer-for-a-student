//ПЕРЕХОД КО ВТОРОМУ ВОПРОСУ
function NextButton1(){
    document.getElementById('quest1').style = 'display:none;';
    document.getElementById('quest2').style = 'display:inline-block;';
    return false;  
};

//ПЕРЕХОД К ТРЕТЬЕМУ ВОПРОСУ
function NextButton2(){
    document.getElementById('quest2').style = 'display:none;';
    document.getElementById('quest3').style = 'display:inline-block;';
    return false;  
};

//ПЕРЕХОД К ЧЕТВЁРТОМУ ВОПРОСУ
function NextButton3(){
    document.getElementById('quest3').style = 'display:none;';
    document.getElementById('quest4').style = 'display:inline-block;';
    return false;  
};
var data, cat1, cat2, cat3, cat4, cat5;
var cat_count;
var e_upH, e_upM, e_downH, e_downM, e_day, e_name, interval, e_day;
var upH, upM, downH, downM;
var schedule = [];

//ВЗЯТИЕ ДАННЫХ ИЗ БАЗЫ
try{
    function getDataFromDatabaseCat() {
        var xhttpCat = new XMLHttpRequest();
        xhttpCat.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                dataCat = JSON.parse(this.responseText);
                upH = Number(dataCat['upH']);
                upM = Number(dataCat['upM']);
                downH = Number(dataCat['downH']);
                downM = Number(dataCat['downM']);
                interval=Number(dataCat['interval']);

                //УСТАНОВКА ДИАПАЗОНА И ИНТЕРВАЛА
                document.getElementById('time_range_up_h').setAttribute("min", upH);
                document.getElementById('time_range_up_h').setAttribute("value", upH);
                document.getElementById('time_range_up_m').setAttribute("step", interval);
                document.getElementById('time_range_down_h').setAttribute("max", downH);
                document.getElementById('time_range_down_h').setAttribute("value", downH);
                document.getElementById('time_range_down_m').setAttribute("step", interval);

                //ГЕНЕРАЦИЯ ВРЕМЕННОГО МАССИВА ЗАДАЧ
                generateSchedule(upH, upM, downH, downM, interval);
                console.log(schedule);
                events_count=dataCat.events.length;

                //ДОБАВЛЕНИЕ СОБЫТИЙ В МАССИВ
                for (let i=0; i<events_count; i++){
                    e_day=Number(dataCat.events[i].day);
                    e_upH=Number(dataCat.events[i].upH);
                        e_upM=Number(dataCat.events[i].upM);
                        e_downH=Number(dataCat.events[i].downH);
                        e_downM=Number(dataCat.events[i].downM);
                        addEvent(e_upH, e_upM, e_downH, e_downM, e_day, e_name, e_day);
                    }

                //ДОБАВЛЕНИЕ КАТЕГОРИЙ В ФОРМУ
                cat_count=dataCat.categories.length;
                if(dataCat.categories[0]!=0){
                    for (let j=1; j<=cat_count; j++){
                        addCategory(dataCat.categories[j-1], j);
                    }
                }
            }
        };
        xhttpCat.open("POST", "http://App/php/api.php", true);
        xhttpCat.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttpCat.send();
    }
    getDataFromDatabaseCat();
} 
    catch(err){console.log(err.message);}


//ФУНКЦИЯ ДОБАВЛЕНИЯ НАЗВАНИЯ КАТЕГОРИИ В ВОПРОС    
function addCategory (data, i){
    var select = document.getElementById("select_cat");
    var option = document.createElement('option');
    option.value = data;
    option.text = data;
    option.id = "option_" + i;
    select.appendChild(option);
}

//СОЗДАНИЕ МАССИВА РАСПИСАНИЯ
function generateSchedule(upH, upM, downH, downM, interval) {
    for (let day = 0; day < 7; day++) {
      let currentH = upH;
      let currentM = upM;
      
      while (!(currentH > downH || (currentH === downH && currentM > downM))) {
        schedule.push({ day: day+1, hour: currentH, minutes: currentM, status: 0 });
        
        if ((currentM += interval) >= 60) {
          currentH++;
          currentM = 0;
        }
      }
    }
}

//ДОБАВЛЕНИЕ СОБЫТИЙ В МАССИВ РАСПИСАНИЯ
function addEvent(upH, upM, downH, downM, day){
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].day === day) {
            if (
              schedule[i].hour > upH ||
              (schedule[i].hour === upH && schedule[i].minutes >= upM)) {
              if (
                schedule[i].hour < downH ||
                (schedule[i].hour === downH && schedule[i].minutes < downM)
              ) {
                schedule[i].status = 1;
              }
            }
          }
        }
}

//ОТПРАВКА РЕЗУЛЬТАТОВ ФОРМЫ
function SendData(){
                try{
                    function getDataFromDatabase() {
                        var day;
                        for (let i=1; i<8; i++){
                            if (document.getElementById('select_day_'+ i).checked){
                                day=i;
                            }
                        }
                        var category;
                        for (let i=1; i<=cat_count; i++){
                            if (document.getElementById('option_'+ i).selected){
                                category=document.getElementById('option_'+ i).value;
                            }
                        }
                        var 
                        tupH=document.getElementById('time_range_up_h').value;
                        tupM=document.getElementById('time_range_up_m').value;
                        tdownH=document.getElementById('time_range_down_h').value;
                        tdownM=document.getElementById('time_range_down_m').value;
                        var count=0;
                        console.log(schedule);
                        for (let i = 0; i < schedule.length; i++) {
                            if (schedule[i].day === day) {
                                if (
                                  schedule[i].hour > tupH ||
                                  (schedule[i].hour === tupH && schedule[i].minutes >= tupM)) {
                                  if (
                                    schedule[i].hour < tdownH ||
                                    (schedule[i].hour === tdownH && schedule[i].minutes < tdownM)
                                  ) {
                                    if (schedule[i].status === 1){
                                        count++;
                                    }
                                  }
                                }
                              }
                            }
                        if (count>0){
                            alert ("На это время уже есть задачи");
                        }
                        else{
                        count=0;
                        schedule=[];
                        var formData = "day=" + day + "&category=" + category + "&name=" + document.getElementById('name').value + "&tupH=" + tupH + "&tupM=" + tupM + "&tdownH=" + tdownH + "&tdownM=" + tdownM;
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                window.location.href="..//html/planer.html";
                            }
                        };
                        xhttp.open("POST", "http://App/php/api.php", true);
                        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        xhttp.send(formData);}
                    }
                    getDataFromDatabase();
                } 
                    catch(err){
                        console.log(err.message);}
                return false;}