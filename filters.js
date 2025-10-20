// Filtros "Select"
const filter = document.querySelector('#filter-location')
const mensaje = document.querySelector('#filter-selected-value')


filter.addEventListener('change', function () {
    const jobs = document.querySelectorAll('.job-listing-card')
    const selectedValue = filter.value

    jobs.forEach(job => {
        const modalidad = job.dataset.modalidad
        const isShown = selectedValue === '' || selectedValue === modalidad
        job.classList.toggle('is-hidden', !isShown)
    })
})