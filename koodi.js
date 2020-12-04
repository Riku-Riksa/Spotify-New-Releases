async function start() {  

    const clientId = 'Your ClientId here';  
    const clientSecret = 'Your ClientSecret here';

        const tulos = await fetch('https://accounts.spotify.com/api/token', { 
            method: 'POST',   
            headers: {  
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' +btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials' 
        });
        const data = await tulos.json();  
        getNewReleases(data.access_token);  
        localStorage.mycode = data.access_token; 
        return data.access_token;
}
    
start()

    const  getNewReleases = async (token) => {   

        const result = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}  
        });

        const data = await result.json();     
        createReleaseList(data.albums.items);  
        return data;
    }
    function createReleaseList(releases) {    
        document.getElementById("releases").innerHTML = `
        <select id="select" onchange="loadByRelease(this.value)">  
            <option id = "lista">Choose New Release</option>
            ${releases.map(function (release){
                return `<option value = '${release.id}'>${release.name}</option>`
            }).join('')}
            </select>
            <button id = "click" class="p-2 bg-dark text-white"> Hide info </button>
            <button id = "click2" class="p-2 bg-dark text-white"> Display info </button>
            
    `        
    }  

async function loadByRelease(id) {  
    var token = localStorage.getItem("mycode")  
    if (id != "Choose New Release") {  
        const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        const data = await response.json();  
        createData(data); 
    }
    else {  alert("Choose a release album!"); }
    }   
    
    function createData(album) {  
        var data = [album]  
        console.log(data) 
        for(i = 0; i < data.length; i++) { 
            document.getElementById("newrelease").innerHTML = `
            <figure class="figure">
                <image id="image" src =${data[i].images[0].url} alt="Spotify Thumbnnail" class="figure-img img-thumbnail img-fluid">
               
                <div class="d-flex flex-column mb-3">
                <div id = "a" class="p-2 bg-dark text-white">Album Name: ${data[i].name}</div>
                <div id = "b" class="p-2 bg-dark text-white">Total Tracks: ${data[i].total_tracks}</div>
                <div id = "c" class="p-2 bg-dark text-white">Album Type: ${data[i].album_type}</div>
                <div id = "d" class="p-2 bg-dark text-white">Artist Name: ${data[i].artists[0].name}</div>
                <div id = "e" class="p-2 bg-dark text-white">Release Date: ${data[i].release_date}</div>
                 
              </div>
             `
              
        }
        $(document).ready(function(){ 
            $("#click").click(function(){ 
              $("#image").fadeOut();  
              $("#a").fadeOut();
              $("#b").fadeOut();
              $("#c").fadeOut();
              $("#d").fadeOut();
              $("#e").fadeOut();
              
            });
          });
          $(document).ready(function(){  
            $("#click2").click(function(){
              $("#image").fadeIn();  
              $("#a").fadeIn();
              $("#b").fadeIn();
              $("#c").fadeIn();
              $("#d").fadeIn();
              $("#e").fadeIn();
              
            });
          });
    }
    
    