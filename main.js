//Variables
let thecountry =document.getElementById("country");
let thedate =document.querySelectorAll("cite");
let theprayertimes =document.getElementById("prayer-times");
let thecitySel = document.getElementById("citySel");
let citiesArr = ["Ben Arous" , "	Bizerte" , "Béja" , "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili", "L'Ariana", "La Manouba", "Le Kef", "Mahdia", "Monastir", "Médenine", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Zaghouan"];

//Change Select By Choosen Options 
//Choose City 
thecitySel.onchange = function (){
     let choosenCity = this.value;
     getPrayerTimes(choosenCity)
}

//Get API Using Axios From aladhan.com/prayer-times-api 
function getPrayerTimes(choosenCity){
    axios({
         method : "GET",
        url :"http://api.aladhan.com/v1/timingsByCity",
        params : {
            country:"TN" ,
            city:choosenCity
        } ,
        // responseType : "json"
    }).then(response => response.data.data)
    .then(respdat => {
        let element = respdat;
            console.log(element.meta.timezone)
            console.log(element.date.gregorian.date);
            console.log(element.date.readable);
            console.log(element.timings.Fajr);
    
            //Country Name
            thecountry.innerHTML ="";
            let contentCountry = choosenCity;
            thecountry.innerHTML = '<i class="fa-solid fa-location-dot fs-4"></i>'+ " "+  contentCountry ;
    
            //English Date
            thedate[0].innerHTML ="";
            let contentDateEn = element.date.gregorian.weekday.en + "  " + element.date.gregorian.date;
            thedate[0].innerHTML = contentDateEn;
           
            //Arabic Date 
            thedate[1].innerHTML ="";
            let contentDateAr = element.date.hijri.date + " " + element.date.hijri.weekday.ar;
            thedate[1].innerHTML = contentDateAr;

            //Cities
            let contentCitiesoptions = `<option selected value="Tunis">Tunis</option>`;
             for(let city of citiesArr){
                console.log(city);
                contentCitiesoptions += `<option value="${city}">${city}</option>`;
             }
             thecitySel.innerHTML = contentCitiesoptions;
         
             //Prayer Times
          let contentPrayerTimes="";
          for(timpray in element.timings){
            if(timpray != "Sunset" && timpray != "Imsak" && timpray != "Midnight" && timpray != "Firstthird" &&  timpray != "Lastthird"){
                  theprayertimes.innerHTML ="";
            contentPrayerTimes += ` 
             <div class="prayer-time col-md-2 text-center"   >
                <div class="shadow p-3 mb-5 rounded-pill p-4 hv " >
                
                    <h3> ${timpray}</h3>
                
                 
                  <hr>
                  <p class="fw-bold text-light">${element.timings[timpray]}</p>
                </div>
             </div>
         `; 
            }
        } 
         theprayertimes.innerHTML = contentPrayerTimes;
});
}
getPrayerTimes("Tunis");








