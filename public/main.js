const searchBox = document.getElementById("search-box");
const resultDiv = document.getElementById("results");
let searchKey;
let data;
let t;

const API_ENDPOINT = "http://localhost:3000/songs";

searchBox.addEventListener("keyup", async () => {
    searchKey = searchBox.value;
    resultDiv.innerHTML = "";

    if(searchKey) {
        // let user finish typing
        if (t) {
            clearTimeout(t);
        }
        t = setTimeout(async () => {
            await checkDB(searchKey);
        }, 500);
    }
});

let request;
let controller;

async function checkDB(key) {

    // abort previous pending request if any
    if (request) {
        controller.abort();
    }

    try {
        // send new request
        controller = new AbortController();

        request = fetch(`${document.location.origin}/songs?search=${key}`, {
            signal: controller.signal,
        });

        const response = await request;
        const list = await response.json();
        console.log(list);

        list.forEach((element) => {
            resultDiv.innerHTML += `<li>${element}</li>`;
        });

        // set pending requests to null
        request = null;

    } catch (err) {
        console.log("fetch aborted");
    }
}
