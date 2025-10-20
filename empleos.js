// Botones "Aplicar"
const jobsListingSection = document.querySelector('.jobs-listing')

jobsListingSection.addEventListener('click', function(event) {
    const element = event.target

    if (element.classList.contains('button-apply-job')) {
        element.textContent = '¡Aplicado!'
        element.classList.add('is-applied')
        element.disabled = true
    }
})

// Filtros "Select"
const filter = document.querySelector('#filter-location')
const mensaje = document.querySelector('#filter-selected-value')


filter.addEventListener('change', function() {
    const jobs = document.querySelectorAll('.job-listing-card')
    const selectedValue = filter.value

    jobs.forEach(job => {
        const modalidad = job.dataset.modalidad
        const isShown = selectedValue === '' || selectedValue === modalidad
        job.classList.toggle('is-hidden', !isShown)
    })  
})


// Artículos dinámicos
const container = document.querySelector('.jobs-listing')
fetch("./data.json")
    .then((response) => {
        return response.json();
    })
    .then((jobs) => {
        jobs.forEach(job => {
            const article = document.createElement('article')
            article.className = 'job-listing-card'

            article.dataset.modalidad = job.data.modalidad
            article.dataset.nivel = job.data.nivel
            article.dataset.technology = job.data.technology

            article.innerHTML = `<div>
                        <h3><a href="./detalles.html">${job.titulo}</a></h3>
                        <small>${job.empresa} | ${job.ubicacion}</small>
                        <p>${job.descripcion}</p>
                    </div>
                    <button class="button-apply-job">Aplicar</button>`

            container.appendChild(article)
        })
    })