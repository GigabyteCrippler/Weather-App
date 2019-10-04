window.addEventListener('load', () => {
    let lat;
    let long;
    let locationTimezone = document.querySelector('.location-timezone')
    let tempretureDegree = document.querySelector('.temperature-degree')
    let tempretureDescription = document.querySelector('.temperature-description')


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            lat = position.coords.latitude;
            long = position.coords.longitude;

            // proxy added in order to bypass CORS error 
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/8d2330fcf8903ed8a4fd1f337ec77849/${5.662427699999999},${ -0.2137578}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    locationTimezone.textContent = data.timezone
                    tempretureDegree.textContent = temperature;
                    tempretureDescription.textContent = summary;
                    setIcons(icon, document.querySelector(".icon"));
                })
        })
    }

        // followed instructions on skycons website  
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ "color": "white" })
        /*skycons and darksky have diffrent ways of writing tempreture descriptions
         the code below is used to make them the same */
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

})