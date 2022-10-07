let seachBtn = document.querySelector("input[type=button]");
let result = document.querySelector(".result");
let copyText = document.querySelector("ion-icon");
let selectBtn = document.querySelector("#selector");
let option = document.querySelectorAll("option");
let input = document.querySelector("input[type=text]");
let from = "en";
let to = "ar";

selectBtn.addEventListener("change", () => {
    if (selectBtn.value === "en-ar") {
        from = "en";
        to = "ar";
        input.style.cssText = "direction:ltr";
    } else {
        from = "ar";
        to = "en";
        input.style.cssText = "direction:rtl";
    }
});

seachBtn.addEventListener("click", () => {
    // console.log(input.value);
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "745e563a14msh1097188a84d9738p14199bjsn34e362db911d",
            "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
        },
    };

    fetch(
            `https://nlp-translation.p.rapidapi.com/v1/translate?text=${input.value}&to=${to}&from=${from}`,
            options
        )
        .then((response) => response.json())
        .then((response) => {
            let words;
            if (from === "en") {
                words = response.translated_text.ar;
                result.style.cssText = "direction:rtl";
            } else {
                words = response.translated_text.en;
                result.style.cssText = "direction:ltr";
            }
            copyText.style.cssText = "display:block";

            result.innerHTML = "-  " + words;
        })
        .catch((err) => console.error(err));
});

copyText.onclick = function() {
    var range = document.createRange();
    range.selectNode(result);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Copied",
        showConfirmButton: false,
        timer: 1500,
    });
};