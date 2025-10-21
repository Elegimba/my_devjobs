// Filtros "Select"
const filterByTechnology = document.querySelector('#filter-technology')
const filterByLocation = document.querySelector('#filter-location')
const filterByExperienceLevel = document.querySelector('#filter-experience-level')


const resetOtherFilters = (activeFilter) => {
    const filters = [filterByTechnology, filterByLocation, filterByExperienceLevel]

    filters.forEach(filter => {
        if (filter !== activeFilter)
            filter.selectedIndex = 0
    })
}


filterByTechnology.addEventListener('change', function(){
    resetOtherFilters(filterByTechnology)

    const jobs = document.querySelectorAll('.job-listing-card')
    const selectedValue = filterByTechnology.value

    jobs.forEach(job => {
        const technology = job.dataset.technology
        const isShown = selectedValue === '' || technology.includes(selectedValue)
        job.classList.toggle('is-hidden', !isShown)
    })
})

filterByLocation.addEventListener('change', function () {
    resetOtherFilters(filterByLocation)

    const jobs = document.querySelectorAll('.job-listing-card')
    const selectedValue = filterByLocation.value

    jobs.forEach(job => {
        const modalidad = job.dataset.modalidad
        const isShown = selectedValue === '' || selectedValue === modalidad
        job.classList.toggle('is-hidden', !isShown)
    })
})

filterByExperienceLevel.addEventListener('change', function () {
    resetOtherFilters(filterByExperienceLevel)

    const jobs = document.querySelectorAll('.job-listing-card')
    const selectedValue = filterByExperienceLevel.value

    jobs.forEach(job => {
        const level = job.dataset.nivel
        const isShown = selectedValue === '' || selectedValue === level
        job.classList.toggle('is-hidden', !isShown)
    })
})