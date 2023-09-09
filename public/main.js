const searchBox = document.getElementById("search-box");
const resultDiv = document.getElementById("results");
let searchKey;
let data;

const API_ENDPOINT='http://localhost:3000/songs';

searchBox.addEventListener('keyup',async ()=>{
    searchKey = searchBox.value;
    let list= await checkDB(searchKey);
    resultDiv.textContent=list;

    
})


async function checkDB(key){
        let data;
        let url = API_ENDPOINT + `?search=${key}`;
        const response= await fetch(url, {
          method: "POST",
        })
          .then((response) => {
            data= response.json();
          })
        console.log(response);
}