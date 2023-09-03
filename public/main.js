const searchBox = document.getElementById("search-box");
const resultDiv = document.getElementById("results");
let searchKey;
let data;

const url='http://localhost:3000/songs';

searchBox.addEventListener('keyup',async ()=>{
    searchKey = searchBox.value;
    resultDiv.textContent= searchKey;
    data={
        key: searchKey,
    }
    await fetch(url,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify(data),
    }).then((response)=>{
        console.log(JSON.stringify(response));
    })
    
})


