const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")
const searchInput2 = document.getElementById("search2")
const searchInput3 = document.getElementById("search3")



let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.job.toLowerCase().includes(value) 
    user.element.classList.toggle("hide", !isVisible)
  })
})
searchInput2.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.country.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})
searchInput3.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.time.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("http://127.0.0.1:5500/user.js")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[title]")
      const headers =card.querySelector("[data-header]")
      const overview = card.querySelector(".card-text")
      const requirements = card.querySelector(".card-text2")
      const work_involved = card.querySelector(".card-text3")

      header.textContent = user.job+"||"+user.company;
      headers.textContent = user.country+"||"+user.time;
      overview.textContent = "JOB OVERVIEW:"+user.overview;
      requirements.textContent ="REQUIREMENTS:"+ user.requirements;
      work_involved.textContent="WORK INVOLVED:"+user.work_involved
      userCardContainer.append(card)
      return { job: user.job, country: user.country,time:user.time, element: card }
    })
  })
