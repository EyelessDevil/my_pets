const list = document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS = []

filter.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase()
    const filtredUsers = USERS.filter((user) => user.name.toLowerCase().includes(value))
    
    render(filtredUsers)
})

async function start() {
    list.innerHTML = 'Идёт загрузка...'
    try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await resp.json()
    
        setTimeout(() => {
            USERS = data
            render(data)
        }, 2000)
    } catch (error) {
        list.style.color = 'red'
        list.innerHTML = error.message
    }
}

function render(users = []) {
    if(users.length === 0) {
        list.innerHTML = 'Пользователь не найден'
    } else {
        const html = users.map(toHTML).join('')
        list.innerHTML = html
    }
}

function toHTML(user) {
    return `<li class="list-group"><span class="btn btn-dark">${user.name}
    <button class="btn btn-outline-info w-100 mb-2" data-index="${user.id}">Показать информацию</button></span></li>`
}

list.onclick = function (event) {
    const index = Number(event.target.dataset.index)
    if(event.target.dataset.index) {
        const user = USERS[index - 1]
        list.innerHTML = `
            <li class="list-group"><span class="btn btn-dark" style="color: aqua; font-size: 20px;">Пользователь: ${user.name}
            </span></li>
            <li class="list-group"><span class="btn btn-dark"><strong>Никнейм:</strong> ${user.username}
            </span></li>
            <li class="list-group"><span class="btn btn-dark"><strong>Телефон:</strong> ${user.phone}
            </span></li>
            <li class="list-group"><span class="btn btn-dark"><strong>Почта:</strong> ${user.email}
            </span></li>
            <li class="list-group"><span class="btn btn-dark"><strong>Вебсайт:</strong> ${user.website}
            </span></li>
            <li class="list-group"><span class="btn btn-dark"><strong>Компания:</strong> ${user.company.name}
            </span></li>
            <li class="list-group"><span class="btn btn-dark"><strong>Адрес:</strong> 
            ${user.address.city} city, Str.${user.address.street}, ${user.address.suite}, zip: ${user.address.zipcode}
            </span></li>
            <div id="map" style="width: 100%; height: 300px; margin-bottom: 10px"></div>

            <li class="list-group"><button class="btn btn-outline btn-danger w-100 mb-2" data-type="back">Назад</button></li>
        `
        
        ymaps.ready(init)

        function init() {
            var map = new ymaps.Map("map", {
                center: [user.address.geo.lat, user.address.geo.lng],
                zoom: 3
            })

            var placemark = new ymaps.Placemark([user.address.geo.lat, user.address.geo.lng], {
                balloonContent: `<strong>${user.name}</strong><br>${user.address.street}, ${user.address.city}`
            })

            map.geoObjects.add(placemark)
        }
        
    } else if (event.target.dataset.type === 'back') {
        start()
    }
}

start()