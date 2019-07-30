window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long= position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/e74c33f5ea77a0ff21ada0a3592aa1df/${lat},${long}`;
            
            fetch(api)
                .then(Response => {
                    return Response.json()
            })
                .then( data => {
                    console.log(data)
                    const { temperature, summary,icon} = data.currently;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent= temperature;
                    temperatureDescription.textContent = summary
                    locationTimezone.textContent = data.timezone

                    // formula for celsius
                    let celsius = (temperature - 32) * (5/9)

                    // Set Icon
                    setIcons(icon,document.querySelector(".icon"));
                    
                    //Change temperature to Celsisus/Farenheit
                        temperatureSection.addEventListener('click', () =>{
                            if (temperatureSpan.textContent === "F"){
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = Math.floor(celsius);
                            }else{
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = temperature
                            };
                        })

                });

        });


    }
    function setIcons(icon,iconID){
        const skycons = new Skycons({"color": "black"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    };
});



console.log("hello world"); 

