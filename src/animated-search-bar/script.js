window.onload = () => {
    const searchinput = document.getElementById("search");
    const searchbtn = document.querySelector(".icon");

    searchbtn.addEventListener("click", function() {
        searchinput.classList.toggle("shown");
        searchinput.focus();
        searchbtn.style.display = "none";
    })

    searchinput.addEventListener("focusout", function() {
        searchinput.classList.toggle("shown");
        searchbtn.style.display = "block";
    })

    searchinput.addEventListener("input", function(e) {
        let results = document.querySelectorAll(".result > p");
        let val = e.target.value.toLowerCase();
        results.forEach(p => {
            if (p.textContent.toLowerCase().includes(val)) {
                p.style.display = "block";
            } else {
                p.style.display = "none";
            }
        })
    })
}