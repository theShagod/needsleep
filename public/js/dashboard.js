const status = document.querySelector('#bedOrWake');
const date = document.querySelector('#date')

date.value = moment().format("YYYY-MM-DDTkk:mm");
//location.href = 'http://localhost:5050/api/getBed'

document.addEventListener("click",event => {
    if ('bedOrWake' == event.target.id){
        if (status.checked){
           console.log('wake') 
        } else {
            console.log('bed')
        }
    }
})

document.addEventListener("submit", event=> {
    event.preventDefault();
    let type;
    if (status.checked){
        type = "wake";
    } else{
        type = "sleep";
    }

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