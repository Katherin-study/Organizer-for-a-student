var cat_count=0;
time_range_up_h;
time_range_up_m;
time_range_down_h;
time_range_down_m;

//ПЕРЕХОД КО ВТОРОМУ ВОПРОСУ
function NextButton1(){
    time_range_up_h=document.getElementById('time_range_up_h').value;
    time_range_up_m=document.getElementById('time_range_up_m').value;
    time_range_down_h=document.getElementById('time_range_down_h').value;
    time_range_down_m=document.getElementById('time_range_down_m').value;
    if ((time_range_up_h<time_range_down_h)||((time_range_up_h===time_range_down_h)&&(time_range_up_m<time_range_down_m))){
    document.getElementById('question_1').style = 'display:none;';
    document.getElementById('question_2').style = 'display:inline-block;';}
    else{
        alert("Ошибка формата времени");
    }
    return false;  
};

//ПЕРЕХОД К ТРЕТЬЕМУ ВОПРОСУ + ЗАПИСЬ ДАННЫХ В БАЗУ
function NextButton2(){
    var interval;
    if (document.getElementById('int1').checked){
        interval = document.getElementById('int1').value;
    }
    if (document.getElementById('int2').checked){
        interval = document.getElementById('int2').value;
    }
    if (document.getElementById('int3').checked){
        interval = document.getElementById('int3').value;
    }
    try{
        function getDataFromDatabase() {
            var formData = "time_range_up_h=" + time_range_up_h + "&time_range_up_m=" + time_range_up_m + "&time_range_down_h=" + time_range_down_h + "&time_range_down_m=" + time_range_down_m + "&interval=" + interval;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById('question_2').style = 'display:none;';
                    document.getElementById('question_3').style = 'display:inline-block;';
                }
            };
            xhttp.open("POST", "http://App/php/api.php", true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(formData);
        }
        getDataFromDatabase();
    } 
        catch(err){console.log(err.message);}
    return false;    
};

//ДОБАВЛЕНИЕ ДОПОЛНИТЕЛЬНЫХ КАТЕГОРИЙ
function AddCategory(){
    cat_count++;
    if(cat_count===1){
        document.getElementById('cat_3').style = 'display:block;';
    }
    if(cat_count===2){
        document.getElementById('cat_4').style = 'display:block;';
    }
    if(cat_count===3){
        document.getElementById('cat_5').style = 'display:block;';
        document.getElementById('add_cat').style = 'display:none;';
    }
};

//ОТПРАВКА ДАННЫХ ПОСЛДЕНЕГО ВОПРОСА В БАЗУ 
function Done(){
    try{
        function getDataFromDatabase() {
            var formData = "cat_name_1=" + document.getElementById('cat_name_1').value + "&cat_name_2=" + document.getElementById('cat_name_2').value + "&cat_name_3=" + document.getElementById('cat_name_3').value + "&cat_name_4=" + document.getElementById('cat_name_4').value + "&cat_name_5=" + document.getElementById('cat_name_5').value + "&cat_color_1=" + document.getElementById('cat_color_1').value + "&cat_color_2=" + document.getElementById('cat_color_2').value + "&cat_color_3=" + document.getElementById('cat_color_3').value + "&cat_color_4=" + document.getElementById('cat_color_4').value + "&cat_color_5=" + document.getElementById('cat_color_5').value;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    window.location.href="..//html/planer.html";
                }
            };
            xhttp.open("POST", "http://App/php/api.php", true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(formData);
        }
        getDataFromDatabase();
    } 
        catch(err){console.log(err.message);}
    return false;  
}