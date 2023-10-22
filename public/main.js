const searchBox = document.getElementById("search-box");
const resultDiv = document.getElementById("results");
let t;
let isPending;
let controller;

async function checkDB(key) {

    // abort previous pending request if any
    if (isPending) {
        controller.abort();
    }

    try {
        
        if(key !== "") {

            // set abortController for new request
            controller = new AbortController();
            isPending = true;

            const response = await fetch(`${document.location.origin}/songs?search=${key}`, {
                signal: controller.signal,
            });
            const list = await response.json();

            console.log(list);

            list.forEach((element) => {
                resultDiv.innerHTML += `<li>${element.title}</li>`;
            });

            isPending = false;
        }

    } catch (err) {
        console.log("fetch aborted for "+key);
    }
}

function handleChange() {
    const searchKey = searchBox.value;

    // let user finish typing
    if (t) {
        clearTimeout(t);
    }
    t = setTimeout(async () => {
        resultDiv.innerHTML = "";
        checkDB(searchKey.trim()); // remove spaces from begnning and end
    }, 500);
}

searchBox.addEventListener("keyup", handleChange);