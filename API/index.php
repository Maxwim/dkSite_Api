
<?php 
/** @noinspection */
session_start();
require_once('regex.php');
require_once('db/DB.php');
?>
<?php
$init = new regex;
$sql = new connexionDB;
if(isset($_GET['date'])){
    // var_dump($sql->get($_GET['date']));
    echo json_encode($sql->get($_GET['date']));
    // echo 'Date API';
    }else{
    // echo $_SESSION['logOn'];    
    if(isset($_POST['password']) == "MyPassword"){
        $checker = $init->CheckCsrf($_SESSION['jeton']);
        if($_POST['password'] == "MyPassword"){
            
            $_SESSION['logOn'] = 'ok';
        }
    }
    if(isset($_POST['deco'])){
        session_destroy();
    }
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="style/style.css">
    </head>
    <body>
    <?php
    if(!isset($_SESSION['logOn'])){
        ?> 
        
        <form action="#" method="post">
            <input type="text" name="password" id="password">
            <input type="text" name="csrf" id="csrf" value="<?php $_SESSION['jeton'] ?>" hidden=true>
            <input type="submit" value="Connect">
        </form>
        
        <?php
    }else{
    ?>
        <div class="calendar">
            <form action="#ok" method="post">
            <input type="date" id="start" name="trip-start" value="2021-09-01" min="2018-01-01" max="2118-12-31">
            <?php
            // Yolo ici serra le checker mdr
            $day = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            $hour = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
            $xml = file_get_contents("http://localhost/site/kd_a_domicile/API/?date=2021-09-01");
                     
            // echo $json;
            for($i=0;$i<count($day);$i++){
                echo '<ul class="day">' . $day[$i];
                for($d=0;$d<count($hour);$d++){
                    
                    echo '<li class="hour">' . $hour[$d] . '</li><li class="hour">
                        <input type="checkbox" id="'.$hour[$d] . $day[$i] .'" name="'.$hour[$d] . $day[$i] .'"></li>';
                    
                }
                echo "</ul>";
            }  
            // return $data;
            ?>
                <input type="submit" value="Submit">
            </form>
            <form action="#" method="post">
                <input type="text" name="deco" id="deco" hidden=true>
                <input type="submit" value="Deco">
            </form>
        </div>
    </body>
    </html>
    <?php 
        if(isset($_POST['trip-start'])){
            echo $_POST['trip-start'];
            $day = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            $hour = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
            $tr = '';
            $date = $_POST['trip-start'];
            for($i=0;$i<count($day);$i++){
                // day
                for($d=0;$d<count($hour);$d++){
                //  hours
                
                if(isset($_POST[$hour[$d] . $day[$i]])){
                    // Le TR serra dans la BDD, découpable avec un ";" par un fichier PHP
                    $tr = $tr . $hour[$d] . $day[$i] . ';';
                    // $arr = array("date" => $_POST['trip-start'], "jour" => $hour[$d], "heure"=> $day[$i]);
                    // var_dump($arr);
                    
                    // echo $tr;
                }

                }

                echo "</ul>";
            }
            echo $tr;
            $arr = [$date, $tr];
            // var_dump($arr);
            $sql->insert($arr);
        }
    }
}