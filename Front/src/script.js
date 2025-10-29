const body = document.querySelector('body');

let current_film = 0;

const arr_review_buttons = Array.from(document.querySelectorAll(".review_btn"))

const posters = document.querySelectorAll("[data-poster]")
const film_info = document.querySelector(".film-info")
const films = document.querySelector(".films")
const img_poster = document.querySelector(".img_poster")
const border = document.querySelector(".border");

let arr_posters = Array.from(posters)

const arr_all_films = Array.from(document.querySelectorAll(".film"));


function updateStatus() {
    if (checkData()) {
        const data = JSON.parse(localStorage.getItem("films_reviews"));

        arr_all_films.forEach(film => {
            deleteClassList(film)
        })

        data.forEach(review => {
            arr_all_films.forEach(film => {
                if (+film.dataset.id === review.id) {
                    film.classList.add(review.status);
                }
            })
        })

        arr_all_films.forEach(film => {
            if (film.classList.length <= 1) {
                film.classList.add("no_review");
            }
        })

    } else {
        arr_all_films.forEach(film => {
            film.classList.add("no_review");
        })
    }
}

function checkData() {
    return !!localStorage.getItem("films_reviews");
}

function deleteClassList(element) {
    const border_class_list = element.classList


    if (border_class_list.contains("checked")) {
        border_class_list.remove("checked");
    }
    else if (border_class_list.contains("closed")) {
        border_class_list.remove("closed");
    }
    else if (border_class_list.contains("no_review")) {
        border_class_list.remove("no_review");
    }
}

for (let i = 0; i < posters.length; i++) {
    arr_posters[i].addEventListener("mousemove", (e) => {
        film_info.style.display = "block";
        films.style.display = "none";
        img_poster.src = arr_posters[i].src;

        let parentElement = arr_posters[i].parentElement.parentElement;

        current_film = +parentElement.dataset.id;

        const data = JSON.parse(localStorage.getItem("films_reviews"));

        if (checkData()) {
            data.forEach(review => {
                if (current_film === review.id) {
                    deleteClassList(border)
                    border.classList.add(review.status);
                    arr_review_buttons.forEach(button => {
                        if (button.dataset.status !== review.status) {
                            button.style.display = "none";
                        }
                    })
                } else {
                    if (border.classList.length <= 1) {
                        border.classList.add('no_review');
                    }
                }
            })
        } else {
            border.classList.add('no_review');
        }


        const poser_info = document.querySelector(".border")
        poser_info.addEventListener("mouseleave", () => {
            film_info.style.display = "none";
            films.style.display = "grid";

            deleteClassList(border)

            arr_review_buttons.forEach(button => {
                button.style.display = "block";
            })

            updateStatus()
        })
    })
}

for (let i = 0; i < arr_review_buttons.length; i++) {
    arr_review_buttons[i].addEventListener("click", (e) => {
        const data = JSON.parse(localStorage.getItem("films_reviews"));

        let localData = [];

        if (checkData()) {
            localData = data;
        }

        const btn_status = e.target.dataset.status;

        const user_data = {
            id: current_film,
            status: btn_status
        }

        localData.push(user_data)

        if (checkClon(current_film)) {
            localStorage.setItem("films_reviews", JSON.stringify(localData));
        }
    })
}

function checkClon(id) {
    if (!checkData()) return true;

    const data = JSON.parse(localStorage.getItem("films_reviews"));

    let isset = false;

    data.forEach(review => {
        if (review.id === id) {
            isset = true;
        }
    })

    return !isset;

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

function init() {
    updateStatus()
}
init();


let films_data = [
    {

    }
]



function createCard() {
    const films = document.querySelector(".films")

    const film = document.createElement('div')
    film.classList.add('film')

    films.appendChild(film)

    const base_border = document.createElement('div')
    base_border.classList.add('base-border')

    film.appendChild(base_border)

    const img = document.createElement('img')
    img.src = './assets/film3.png'
    img.dataset.poster = 'forrest'

    base_border.appendChild(img)

    console.log(films);
}

createCard()