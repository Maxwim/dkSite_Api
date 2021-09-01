<?php
class connexionDB {

private $host    = 'localhost';  // nom de l'host  
private $name    = 'dka';    // nom de la base de donnée
private $user    = 'root';       // utilisateur
private $pass    = '';       // mot de passe (il faudra peut-être mettre '' sous Windows)
private $connexion;

public $id;
public $table;
public function __construct(){
    $this->connexion = null; 
    try{
        $this->connexion = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->name,
         $this->user, $this->pass, array(PDO::MYSQL_ATTR_INIT_COMMAND =>'SET NAMES UTF8', 
          PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::ATTR_EMULATE_PREPARES, false));
      }catch (PDOException $e){
        echo 'Erreur : Impossible de se connecter à la BDD !<br>';
        die();
      }
}
/*
Utilisé dans plusieurs class
-> ça fais un peu gros tout ça
-> Je vais voir pour clean ça plus tard.  
*/

/*
* INSERT
*/
public function insert($arr){
    $sql = 'INSERT INTO calendar (date, details) VALUE (?, ?)';
    //' . $this->tabIcp
    $req = $this->connexion->prepare($sql);
    $req->execute($arr);
}

/**
 * Simple get = date API
 */
    public function get($date){
        $sql = 'SELECT id, date, details FROM `calendar` WHERE date="'.$date.'";';
        $query = $this->connexion->prepare($sql);
        $query->execute();
        return $query->fetch();
    }

}