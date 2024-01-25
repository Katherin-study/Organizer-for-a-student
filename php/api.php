<?php
$servername = "localhost";
$username = "root";
$password= "";
$dbname= "registerUser";
$conn= mysqli_connect($servername, $username, $password, $dbname);
if (!$conn){
    die("Connection Failed".mysqli_connect_error());
}else{
    "Успех";
}
session_start();

//New user (registration)
if (!empty($_POST['login_reg']) && !empty($_POST['email_reg']) && !empty($_POST['pass_reg'])){
    $login=$_POST['login_reg'];
    $pass=$_POST['pass_reg'];
    $email=$_POST['email_reg'];
}
if (isset($login)){
    $_SESSION=[];
    $sql = "INSERT INTO `users` (login, pass, email) VALUES ('$login', '$pass', '$email')";
    $result=$conn->query($sql);
    if ($result===TRUE){
        $register = array(
            'register' => 'Рады знакомству, ' . $login . ' !'
        );
    } else {
        $register = array(
            'register' => 'Error '
        );
    }
}
else{
    $register = array(
        'register' => 'Empty'
    );
}

    //Registerd user
if (!empty($_POST['login_enter'])&&!empty($_POST['pass_enter'])){  
    $login=$_POST['login_enter'];
    $pass=$_POST['pass_enter'];
    $_SESSION = [];
    $sql="SELECT * FROM `users` WHERE login='$login' AND pass='$pass'";
    $result=$conn->query($sql);
    if ($result -> num_rows > 0){
        while($row=$result->fetch_assoc()){
            $enter = array(
                'enter' => 'Добро пожаловать, ' . $login . '!'
            );
        }
    }
    else{
        $enter = array(
            'enter' => 'Error'
        );
    }
} else
{
    $enter = array(
        'enter' => 'Empty'
    );
}
//All cases (login & registration)
if ( $_SESSION['id']>0) {
    $id = $_SESSION['id'];
}
else {
    $sql="SELECT * FROM `users` WHERE login='$login'";
    $result=$conn->query($sql);
    if ($result -> num_rows > 0){
        while($row=$result->fetch_assoc()){
            $id=$row['id'];
            $_SESSION['id']=$row['id'];}
 
        } 
    }

//second slide
$time_range_up_h=$_POST['time_range_up_h'];
$time_range_up_m=$_POST['time_range_up_m'];
$time_range_down_h=$_POST['time_range_down_h'];
$time_range_down_m=$_POST['time_range_down_m'];
$interval=$_POST['interval'];
if (isset($interval)){
    $sql = "INSERT INTO `general` (id, range_up_h, range_up_m, range_down_h, range_down_m, `interval`) VALUES (". $id . ", " . $time_range_up_h . ", " . $time_range_up_m . ", " . $time_range_down_h . ", " . $time_range_down_m . "," . $interval .")";
    $result=$conn->query($sql);
    if ($result===TRUE){
        $general = array(
            'general' => 'success'
        );
    }
    else{
        $general = array(
            'general' => 'Error' . $sql
        );
    }
} else {
    $general = array(
        'general' => 'Empty'
    );
 
}

//CATEGORIES DATABASE
if (!empty($_POST['cat_name_1'])){
    $ctn1=$_POST['cat_name_1'];
}
if (!empty($_POST['cat_name_2'])){
    $ctn2=$_POST['cat_name_2'];
}
if (!empty($_POST['cat_name_3'])){
    $ctn3=$_POST['cat_name_3'];
}
if (!empty($_POST['cat_name_4'])){
    $ctn4=$_POST['cat_name_4'];
}
if (!empty($_POST['cat_name_5'])){
    $ctn5=$_POST['cat_name_5'];
}
if (!empty($_POST['cat_color_1'])){
    $ctc1=$_POST['cat_color_1'];
}
if (!empty($_POST['cat_color_2'])){
    $ctc2=$_POST['cat_color_2'];
}
if (!empty($_POST['cat_color_3'])){
    $ctc3=$_POST['cat_color_3'];
}
if (!empty($_POST['cat_color_4'])){
    $ctc4=$_POST['cat_color_4'];
}
if (!empty($_POST['cat_color_5'])){
    $ctc5=$_POST['cat_color_5'];
}
if (isset($ctn1)){
    $sql = "INSERT INTO `categories` (id, name, color) VALUES ($id, '$ctn1', '$ctc1')";
    $result=$conn->query($sql);
}
if (isset($ctn2)){
    $sql = "INSERT INTO `categories` (id, name, color) VALUES ($id, '$ctn2', '$ctc2')";
    $result=$conn->query($sql);
}
if (isset($ctn3)){
    $sql = "INSERT INTO `categories` (id, name, color) VALUES ($id, '$ctn3', '$ctc3')";
    $result=$conn->query($sql);
}
if (isset($ctn4)){
    $sql = "INSERT INTO `categories` (id, name, color) VALUES ($id, '$ctn4', '$ctc4')";
    $result=$conn->query($sql);
}
if (isset($ctn5)){
    $sql = "INSERT INTO `categories` (id, name, color) VALUES ($id, '$ctn5', '$ctc5')";
    $result=$conn->query($sql);
}

//GENERAL DATA
$sql="SELECT * FROM `general` WHERE id='$id'";
$result=$conn->query($sql);
    if ($result -> num_rows > 0){
        while($row=$result->fetch_assoc()){
            $upH = array(
                'upH' => $row['range_up_h']
            );
            $upM = array(
                'upM' => $row['range_up_m']
            );
            $downH = array(
                'downH' => $row['range_down_h']
            );
            $downM = array(
                'downM' => $row['range_down_m']
            );
            $interval = array(
                'interval' => $row['interval']
            );
        }}
    else{
        $upH = array(
            'upH' => 0
        );
        $upM = array(
            'upM' => 0
        );
        $downH = array(
            'downH' => 0
        );
        $downM = array(
            'downM' => 0
        );
        $interval = array(
            'interval' => 0
        );
    } 

//GET CATEGORY
$sql="SELECT * FROM `categories` WHERE id='$id'";
$result=$conn->query($sql);
$categories = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row['name'];
    }
} else {
    $categories[] = 0;
}

//ADD EVENT
$day=$_POST['day'];
$category=$_POST['category'];
$name=$_POST['name'];
$tupH=$_POST['tupH'];
$tupM=$_POST['tupM'];
$tdownH=$_POST['tdownH'];
$tdownM=$_POST['tdownM'];

$sql="SELECT * FROM `categories` WHERE id=$id AND name='$category'";
$result=$conn->query($sql);
    if ($result -> num_rows > 0){
        while($row=$result->fetch_assoc()){
            $color = $row['color'];
        }
    }

$sql = "INSERT INTO `events` (id, day, category, upH, upM, downH, downM, name, color) VALUES ($id, $day, '$category', $tupH, $tupM, $tdownH, $tdownM, '$name', '$color')";
$result=$conn->query($sql);

//CREATE EVENT
$sql="SELECT * FROM `events` WHERE id='$id'";
$result=$conn->query($sql);
$events = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $events[] = array(
            'day' => $row['day'],
            'color' => $row['color'],
            'upH' => $row['upH'],
            'upM' => $row['upM'],
            'downH' => $row['downH'],
            'downM' => $row['downM'],
            'name' => $row['name']);
    }
} else {
    $events[] = 0;
}

$response = array_merge($register, $enter, $general, $upH, $upM, $downH, $downM, $interval, array('categories' => $categories), array('events' => $events));
echo json_encode($response);
exit();
?>