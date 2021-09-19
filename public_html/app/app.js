let HttpGet = function(url) {
    this.get = function(callback) {
        var rqt = new XMLHttpRequest();
        rqt.onreadystatechange = function() { 
            if (rqt.readyState == 4 && rqt.status == 200)
                callback(rqt.responseText);
        }
        
        rqt.open( "GET", url, true );            
        rqt.send( null );
    }
}


app.controller('calendar', function($scope){
    // Créer le tableau avec AngularJS pour le front
    $scope.days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    $scope.hours = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
    $scope.jours;
    $scope.hour;
    let twof = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
    // Quand la parche charge
    onloads = function() {
        let client = new HttpGet('http://dkadomicile.fr/API/data.json');
        let dataLink = window.location.href;
        let modal = document.getElementById("myModal");
        //let modalText = document.getElementById('text');
        let modalOk = document.getElementById('myModalOk');
        let modalPasOk = document.getElementById('myModalPasOk');
        let words = dataLink.split('=');
        let verif = words[0].split('?');
        let dates = new Date();
        console.log();
        let checker;
        let date = date.getDay(); 
        //  récupèration de hours+jours
        $scope.jours = words[1];   
        console.log(words[0])
        // Vérification des URL
        if(verif[1] === 'Rdv'){
        //Scope du de l'heure
        $scope.hour = parseInt($scope.jours);
            for(i=0;i<24;i++){
                //scope du jours pour retirer les int
                $scope.jours = $scope.jours.replace(i, '');
                
            } 
        }
        // Curl sur le fichier json
        client.get(function(response) {
        // écriture de la réponse en data
        data = JSON.parse(response);
        // Récupération des heures prises pour créer le tableau
        let datails = data['details'].split(';');
        let btn = document.getElementById('btnRdv');

        if(response != false){ 
            //Vérification pour la prise de rendez vous depuis le tableau
            if($scope.days.includes($scope.jours) && twof.includes($scope.hour)){
                btn.style.display = "block";
                btn.style.margin = "0 auto";

            }else{
                checker = false;
                btn.style.display = "none";

            }
           for(i=0;i<$scope.days;i++){
               count = i;
               if($scope.days[i]===$scope.jours){
                   break;
               }
           }

            //Récupération des données
            data = JSON.parse(response);
            if(dataLink.indexOf("=")>0){
                console.log($scope.jours);
                // bug sur le Lundi 8H je sais pas pourquoi
                if(words[1] !== "8Lundi"){
               /*     
                    if(date+1 >= count){
                        console.log('Semaine prochaine');
                    }else{
                        console.log('cette semaine')
                    }
                */
                    console.log(datails.indexOf(words[1]) > 1);
                    //Charger le modal puor la prise de rendez vous
                    if(datails.indexOf(words[1]) > 0){
                        modal.style.display = "block";
                        modalOk.style.display = "none";
                        modalPasOk.style.display = "block";
                    }else{
                        modal.style.display = "block";
                        modalOk.style.display = "block";
                        modalPasOk.style.display = "none";
                    }
                }
            }
            // Afficher les couleurs au tableau
            let dispo = data['details'].split(";");
                for(i=0;i<dispo.length;i++){
                    if(dispo[i]){
                        if(data != "false"){
                            document.getElementById(dispo[i]).style.backgroundColor = "#FF1F12";
                        }
                    }
                }
        }
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }
    });      
    }
    onloads();

})
// Création de la map pour la page contact.
app.controller('map', function($scope){
    let mymap = L.map('maCarte').setView([49.679, 2.763], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    let circle = L.circle([49.679, 2.7631], {
        color: '#8EFA7B',
        fillColor: '#8FFA8F',
        fillOpacity: 0.2,
        radius: 12000
    }).addTo(mymap);
  });
  //Envoie d'emails (Envoie en JSON a une API PHP qui s'occupe de l'envoyé)
app.controller('sendMails', function($scope){
    //$scope.messages ="ok";
    elem = document.getElementById('Message');
    click= document.getElementById('sendMails');
    click.onclick = function () {
        let mails = { 
            API: 'sendMails',
            nom: $scope.nom,
            prenom: $scope.prenom,
            email: $scope.email,
            telephone: $scope.telephone,
            message: $scope.message,
        };
        if($scope.telephone !== undefined && $scope.email !== undefined && $scope.nom !== undefined && $scope.prenom !== undefined && $scope.message !== undefined){
            const sendMails = fetch('http://dkadomicile.fr/API/send.php', {
                method: "POST",
                body: JSON.stringify(mails),
                headers: {
                    "Content-Type": "application/json",
                },                
            })
            $scope.messages = "Message envoyé.";
            elem.style.color = "green";

            console.log("info User: "+mails.nom);   
        }else{
            $scope.messages = "Formulaire pas remplis."; 
            elem.style.color = "red";

        }
        //HttpPost("http://www.dkadomicile.fr/API/send.php",data);
    }
});