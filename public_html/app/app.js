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

app.controller('calendar', function($scope){
    $scope.days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    $scope.hours = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
    // Quand la parche charge
    $scope.onload = function() {

        var client = new HttpClient('http://localhost/site/kd_a_domicile/API/?date=2021-09-01');
        // Vérification plus tard
        client.get(function(response) {
        data = JSON.parse(response);
        let calc = 0;

        if(data != false){
            let dispo = data[2].split(";");
            // console.log(dispo);
            
            for(i=0;i<dispo.length;i++){
                if(data != "false" && dispo[i]){
                    console.log(dispo[i]);
                    document.getElementById(dispo[i]).style.backgroundColor = "#FF1F12";
                }else{
                        // document.getElementById(data[i].heur + data[i].jour).style.backgroundColor = "red";
                }
                // console.log(9*i);

            }
        }
    });      
    }
})



// Permet de récupèrer les informations du fichier JSON.
app.controller('map', function($scope){
    let mymap = L.map('maCarte').setView([49.699, 2.793], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    let circle = L.circle([49.699, 2.7931], {
        color: '#8EFA7B',
        fillColor: '#8FFA8F',
        fillOpacity: 0.2,
        radius: 10000
    }).addTo(mymap);
  });


