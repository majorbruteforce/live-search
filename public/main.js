const searchBox = document.getElementById("search-box");
const resultDiv = document.getElementById("results");
let searchKey;
let data;
let t;

const API_ENDPOINT = "http://localhost:3000/songs";

searchBox.addEventListener("keyup", async () => {
    searchKey = searchBox.value;
    resultDiv.innerHTML = "";

    // let user finish typing
    if (t) {
        clearTimeout(t);
    }
    t = setTimeout(async () => {
        await checkDB(searchKey);
    }, 500);
    
});

async function checkDB(key) {
    const res = await fetch(`${document.location.origin}/songs?search=${key}`);
    const list = await res.json();
    list.forEach(element => {
        resultDiv.innerHTML += `<li>${element.title}</li>`;
    });
}
