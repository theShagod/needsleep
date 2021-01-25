const bedOrWake = document.querySelector('#bedOrWake');
const date = document.querySelector('#date')
date.value = moment().format("YYYY-MM-DDTkk:mm");
//location.href = 'http://localhost:5050/api/getBed'

if (window.localStorage){
    console.log('localstorage exists');
    var bedOrWakeStatus = localStorage.getItem('bedOrWakeStatus');
    if (bedOrWakeStatus !== null){
        console.log("localStorage.getItem('bedOrWakeStatus'): ", bedOrWakeStatus)
            bedOrWake.checked = JSON.parse(bedOrWakeStatus)
        
        
    } else{
        bedOrWake.checked= false;
        localStorage.setItem('bedOrWakeStatus', false);
    }
}

document.addEventListener("click",event => {
    if ('bedOrWake' == event.target.id){
        if (bedOrWake.checked){
            console.log('wake')
            localStorage.setItem('bedOrWakeStatus', true)
            
        } else {
            console.log('bed')
            localStorage.setItem('bedOrWakeStatus', false)
        }
    }
})

document.addEventListener("submit", event=> {
    event.preventDefault();
    let type;
    if (bedOrWake.checked){
        type = "wake";
    } else{
        type = "sleep";
    }
    var bedOrWakeStatus = JSON.parse(localStorage.getItem('bedOrWakeStatus'))
    localStorage.setItem('bedOrWakeStatus', !bedOrWakeStatus)
    bedOrWake.checked = !bedOrWakeStatus
    

    console.log(date.value)
    let data = {
        date: date.value,
        type
    }
    
    fetch('api/addBed', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(res => {
        if (res.ok){
            console.log('Success!')
        } else {
            console.log('Error')
        }
        
    }).then(()=> {
        console.log('goign to get bed')
        location.href = "http://localhost:5050/api/getBed"
    }).catch(err => {console.log(err)})
})