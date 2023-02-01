
// Global API Variables 
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const ApiKey = '&appid=4d971428ea650bfbfb8022c37677cc6b&units=imperial';

// Getting current date with JavaScript dynamically
let d = new Date();
let newDate = d.getMonth()+1+ '.' + d.getDate() + '.' + d.getFullYear();
let feelings = document.getElementById('feelings');// user feelings




/**
 * @describtion
 *  get id generate  and when click on it , get zipcode and send urlapi for openweather
 * call funtion getweather with parameter url
 * then post data that return form openweathermap to server through route addweather
 * then update data of server
 */

document.getElementById('generate').addEventListener('click', () => {
    let zipccode = document.getElementById('zip').value;
    let urlapi = baseURL+zipccode+ApiKey;
    getWeatherAPI(urlapi)
        .then(function (data) {
            postData('/addData', { date: newDate, temp: data.main.temp, feelings: feelings.value });
        })
        .then(() => {
            updateUIDATA()
        });
});


// Async task to get weather from external api OpenWeatherMap then return data form openWeathermap
const getWeatherAPI = async (urlapi) => {
    const req = await fetch(urlapi);//fetch data 
    try {
        const allData = await req.json();//convert this data to json
        return allData;
    }
    catch (e) {
        console.log("error ", e)
    }
}



// postData function to save weather data in servers local data variable
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data),
    });

    try {
        const newdata = res.json();
        return newdata;
    } catch (error) {
        console.log("error", error);
    }
}


/**
 * @describtion get all data that store in server through route getweather then 
 * display this data for UI 
 */

const updateUIDATA = async () => {
    let UIGETData = await getData("/alldata");
    try {
        document.getElementById('date').textContent = "Date: " + UIGETData.date; //get Data from server 
        document.getElementById('temp').textContent = "Temperature: " + UIGETData.temp;// get temp form server
        document.getElementById('content').textContent = "Feeling: " + UIGETData.feelings;//get feeling form server
    }
    catch (error) {
        console.log("error: ", error);
    }
}

// getData function to get the weather data stored in the server's local variable
const getData = async (url = '') => {
    const req = await fetch(url);
    try {
        let d = await req.json();
        return d;
    }
    catch (e) {
        console.log("error: ",e);
    }
}


































