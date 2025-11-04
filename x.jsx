const handlePrevClick = (event) => {
    event.preventDefault()
    if (!isFirstPage) {
        onPageChange(currentPage - 1)
    }
}

const handleNextClick = (event) => {
    event.preventDefault()
    if (!isLastPage) {
        onPageChange(currentPage + 1)
    }
}

const handleChangePage = (event, page) => {
    event.preventDefault()
    if (page !== currentPage) {
        onPageChange(page)
    }
}