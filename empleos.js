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
const jobs = document.querySelectorAll('.job-listing-card')


filter.addEventListener('change', function() {
    const selectedValue = filter.value

    jobs.forEach(job => {
        const modalidad = job.dataset.modalidad
        const isShown = selectedValue === '' || selectedValue === modalidad
        job.classList.toggle('is-hidden', !isShown)
    })
    
})