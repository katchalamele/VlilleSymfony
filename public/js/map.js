let map = null

function dessinerCarte(){
    console.log('OKOK');
    map = L.map('mapDiv').setView([50.64116, 3.06376], 12);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var stations = document.querySelectorAll(".station_item");
    for (var i = 0; i<stations.length; i++){
    var nom = stations[i].dataset.nom;
    var commune = stations[i].dataset.commune;
    var libelle = stations[i].dataset.libelle;
    var iconDraw = new VliveImage(stations[i].dataset.nbvelosdispo,stations[i].dataset.nbplacesdispo);
    var marker = L.marker(stations[i].dataset.geo.split(','), {icon:iconDraw.getLeafletIcon()}).addTo(map)
    .bindPopup(nom + ' <p>' + commune + '</p> <button data-libelle="' + libelle + '" type="hidden" value="' + nom + '">Choisir</button>');
    }
    //map.on("popupopen",activerBouton);
    //map.on("click",afficheCoord);
}

/*$( document ).ready(function() {
    dessinerCarte()
    $('.station_item').click(function(e) {
        e.preventDefault()
        const $that = $(this);
        $that.parent().find('a').removeClass('active');
        $that.addClass('active');

        map.setView($that.data().geo, 15, {
            "animate": true,
            "pan": {
              "duration": 0.5
            }
          });
    });            
});*/

window.addEventListener('load', function(){
    dessinerCarte()
    $('.station_item').click(function(e) {
        e.preventDefault()
        const $that = $(this);
        $that.parent().find('a').removeClass('active');
        $that.addClass('active');

        map.setView($that.data().geo.split(','), 15, {
            "animate": true,
            "pan": {
              "duration": 0.5
            }
          });
    });
})