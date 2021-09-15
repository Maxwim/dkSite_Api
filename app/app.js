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

let Popup = function(){

}
app.controller('calendar', function($scope){
    $scope.days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    $scope.hours = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
    // Quand la parche charge
    onloads = function() {
        let client = new HttpGet('http://dkadomicile.fr/API/data.json');
        let dataLink = window.location.href;
        let modal = document.getElementById("myModal");
        let modalText = document.getElementById('text');
        client.get(function(response) {
        data = JSON.parse(response);
        if(response != false){ 
            //Récupération des données
            data = JSON.parse(response);
            if(dataLink.indexOf("=")>0){
                let words = dataLink.split('=');
                let datails = data['details'].split(';');
                if(words !== "8Lundi"){
                    console.log(datails.indexOf(words[1]) > 1);
                    if(datails.indexOf(words[1]) > 0){
                        modalText.innerHTML = "L'heure et déjà prise.";
                        modal.style.display = "block";
                    }else{
                        modalText.innerHTML = "Rendez vous possible.";
                        modal.style.display = "block";
                    }
                }
            }
            let dispo = data['details'].split(";");
                for(i=0;i<dispo.length;i++){
                    if(dispo[i]){
                        if(data != "false"){
                            document.getElementById(dispo[i]).style.backgroundColor = "#FF1F12";
                        }
                    }
                    // www.url.fr/?rdv=Data
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
// Permet de récupèrer les informations du fichier JSON.
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