const initialCoords = { lat: 40.41589667117468, lng: -3.7051515622888167 }

let myMap;

function initMap() {
    renderMap()
    getEventsData()
    printMarkers()
}

function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        { zoom: 10, center: initialCoords }
    )
}

function getEventsData() {

    axios
        .get('/api/events')
        .then(response => printMarkers(response.data))
        .catch(err => console.log(err))
}

function printMarkers(event) {

    event.forEach(elm => {
        const position = {

            lat: elm.location.coordinates[1],
            lng: elm.location.coordinates[0]
        }

        new google.maps.Marker({
            position,
            map: myMap,

        })
    })
}
