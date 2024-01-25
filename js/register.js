function Register(){
    document.getElementById('register').style = 'display:inline-block;';
    document.getElementById('login').style = 'display:none;';
};

function EnterBtn(){
var login_enter =  document.getElementById('login_enter').value;
var pass_enter = document.getElementById('pass_enter').value;
try{
    function getDataFromDatabase() {
        var formData = "login_enter=" + login_enter + "&pass_enter=" + pass_enter;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                if (data["enter"]!="Error") {
                    window.location.href="..//html/enter_success.html";
                }
                else {
                    alert("Ошибка в логине или пароле пользователя");
                }
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

function RegisterBtn(){
var login_reg =  document.getElementById('login_reg').value;
var pass_reg = document.getElementById('pass_reg').value;
var repeatpass_reg=document.getElementById('repeatpass_reg').value;
var email_reg= document.getElementById('email_reg').value;
    if (pass_reg===repeatpass_reg){
    try{
        function getDataFromDatabase() {
            formData = "login_reg=" + login_reg + "&pass_reg=" + pass_reg + "&email_reg=" + email_reg;
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    if (data["enter"]!="Error") {
                    window.location.href="..//html/register_success.html";;
                }
                else {
                    alert("Ошибка записи данных");
                }
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
else {
    alert("Пароли не совпадают");
}
}