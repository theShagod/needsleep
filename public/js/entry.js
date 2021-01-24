const status = document.querySelector('#bedOrWake');
const date = document.querySelector('#date')
date.value = moment().format("YYYY-MM-DDThh:mm");
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
        type = "bed";
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
    })
})