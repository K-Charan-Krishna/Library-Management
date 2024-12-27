let inputel = document.getElementById("searchInput");
let display = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");
let nofound = document.getElementById("noresult");

function createAndAppend(items) {
    let {
        title,
        author,
        imageLink
    } = items;

    let bookdiv = document.createElement("div");
    bookdiv.classList.add("col-6", "p-4");
    display.appendChild(bookdiv);

    let imgel = document.createElement("img");
    imgel.src = imageLink;
    imgel.style.width = "100%";
    bookdiv.appendChild(imgel);

    let author_name = document.createElement("p");
    author_name.textContent = author;
    bookdiv.appendChild(author_name);


}




function display_items(search_results) {
    spinner.classList.add("d-none");
    for (let item of search_results) {
        createAndAppend(item);
    }
}


inputel.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        display.textContent = " ";
        spinner.classList.remove("d-none");
        let url = "https://apis.ccbp.in/book-store?title=" + event.target.value;
        let options = {
            method: "GET"
        };
        fetch(url, options).
        then(function(responce) {
            return responce.json();
        }).then(function(data) {
            console.log(data);
            if (data.total === 0) {
                spinner.classList.add("d-none");
                let err = document.createElement("p");
                err.textContent = "No Result Found";
                err.classList.add("err-msg");
                display.appendChild(err);
            } else {
                let {
                    search_results
                } = data;
                let head = document.createElement("h1");
                head.textContent = "Popular Books";
                head.classList.add("books-head", "col-12");
                display.appendChild(head);
                console.log(data);
                display_items(search_results);
            }
        });
    }
})