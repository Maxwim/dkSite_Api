// Requête HTTP 
var HttpClient = function(url) {
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
// Calendrier
app.controller('calendar', function($scope){
    $scope.days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    $scope.hours = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
    // Quand la parge charge
    $scope.onload = function() {
        // Curl API du site pour voir les disponibilitée du jour
        var client = new HttpClient('http://localhost/site/kd_a_domicile/API/?date=2021-09-01');
        // Vérification plus tard
        client.get(function(response) {
        data = JSON.parse(response);
        // let calc = 0;
        if(response != false){
            data = JSON.parse(response);
            let dispo = data[2].split(";");
            // console.log(dispo);
            
            for(i=0;i<dispo.length;i++){
                if(data != "false" && dispo[i]){
                    // console.log(dispo[i]);
                    document.getElementById(dispo[i]).style.backgroundColor = "#FF1F12";
                }
            }
        }
    });      
    }
})



// MAP
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


