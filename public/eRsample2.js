var lat=12.98416265185855,lng=79.97378795232086
var map = L.map('map').setView([lat,lng], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19 
}).addTo(map); 

L.marker([lat, lng]).addTo(map)

const markers=[]
var marker
var polyline
const coordinates=[]
const slopes=[]
var c=1
const newCoordinates=[]

c && map.on('click',(e)=>{
    marker=L.marker([e.latlng.lat,e.latlng.lng]).addTo(map).bindPopup(`${e.latlng.lat},${e.latlng.lng}`).openPopup()
    markers.push(marker)
    coordinates.push([e.latlng.lat,e.latlng.lng])
    console.log(coordinates)

    if((lat- e.latlng.lat<0.00012 && lat -e.latlng.lat>-0.00012) && (lng - e.latlng.lng<0.00012 && lng - e.latlng.lng>-0.00012)){
        c=0
    }

    if(!c){
        markers.forEach((marker) =>{
            map.removeLayer(marker)
        });

        for(var i=0;i<coordinates.length-1;i++){
            slopes[i]=(coordinates[i+1][1]-coordinates[i][1])/(coordinates[i+1][0]-coordinates[i][0])
        }

        // console.log(slopes)

        polyline = L.polyline(coordinates, {
            color: 'red',
            smoothFactor:0.0001
        }).addTo(map);

        setTimeout(()=>{
            map.removeLayer(polyline)
        },2000)

        setTimeout(()=>{
            plotNewCoord()
        },4000)
    }
})





const plotNewCoord=()=>{

    for(var i=0,
        pos=0; 
        i<slopes.length-1;i++){ 
        while(slopes[i+1+pos]-slopes[i]<=0.07 && slopes[i+1+pos]-slopes[i]>=0){
            coordinates[i+1+pos]=0
            pos++
        }
        while(slopes[i+1+pos]-slopes[i]>=-0.07 && slopes[i+1+pos]-slopes[i]<0){
            coordinates[i+1+pos]=0
            pos++
        }
        newCoordinates.push(coordinates[i])
        i+=pos
        pos=0
    }
     
    if(coordinates[coordinates.length-2]){
        newCoordinates.push(coordinates[coordinates.length-2])
    }
    
    newCoordinates.push(coordinates[coordinates.length-1])  
    
    console.log(`no of coordinates: ${coordinates.length} \n 
    no of newCoordinates: ${newCoordinates.length} \n
    no of coordinates saved: ${coordinates.length - newCoordinates.length}
    `)

    polyline = L.polyline(newCoordinates, {
        color: 'red',
        smoothFactor:0.0001
    }).addTo(map);
}




