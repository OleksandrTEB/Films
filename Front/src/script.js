const body = document.querySelector('body');

const review_btn = document.querySelectorAll(".review_btn");

const arr_review_btn = Array.from(review_btn)

const status = localStorage.getItem("status");

if (status) {
    arr_review_btn.forEach((btn) => {
        if (btn.dataset.status !== status) {
            btn.style.display = "none";
        }
    })
} else {
    for (let i = 0; i < arr_review_btn.length; i++) {
        arr_review_btn[i].addEventListener("click", (e) => {
            arr_review_btn.forEach((btn) => {
                if (btn.dataset.status === e.target.dataset.status) {
                    localStorage.setItem("status", btn.dataset.status);
                } else {
                    btn.style.display = "none";
                }
            })
        })
    }
}

const posters = document.querySelectorAll("[data-poster]")
const film_info = document.querySelector(".film-info")
const films = document.querySelector(".films")
const img_poster = document.querySelector(".img_poster")

let arr_posters = Array.from(posters)

for (let i = 0; i < posters.length; i++) {
    arr_posters[i].addEventListener("mousemove", (e) => {
        film_info.style.display = "block";
        films.style.display = "none";
        img_poster.src = arr_posters[i].src;

        const poser_info = document.querySelector(".border")
        poser_info.addEventListener("mouseleave", () => {
            film_info.style.display = "none";
            films.style.display = "grid";
        })
    })
}

const ocena_btn = document.querySelector(".ocena");
const rating_form = document.querySelector(".rating_form");
ocena_btn.addEventListener("click", (e) => {
    rating_form.style.display = "block";
    ocena_btn.style.display = "none";

    setTimeout(() => {
        body.addEventListener("click", (e) => {
            if (!e.target.classList.contains("rating")) {
                rating_form.style.display = "none";
                ocena_btn.style.display = "block";
            }
        })
    }, 1000)
})