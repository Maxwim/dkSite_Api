<?php 
//+ Sécurité + Tard
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');
$data = json_decode(file_get_contents('php://input'), true);
if($data['API'] == 'sendMails'){
    if(isset($data['email'])){
        $nom = $data['nom'];
        $prenom = $data['prenom'];
        $email = $data['email'];
        $telephone = $data['telephone'];
        $message = $data['message'];

        $message = 'Nom : '.$nom.'<br>prenom : '.$prenom.'<br>email : '.$email.'<br>telephone : '.$telephone.'<br><br><br>'.$message;
        //mail('caffeinated@example.com', 'Mon Sujet', $message);
        // Envoi du mail
        mail('maximdelcroix9@gmail.com', 'Nouveau contact : '. $nom . ' ' . $prenom, $message);
        echo 'true';
    }

}else{
    echo "false";
}
