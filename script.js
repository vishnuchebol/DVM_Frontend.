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
countries=[];

var headers = new Headers();
headers.append("X-CSCAPI-KEY","YTBLNHBHVkdvM2JWUEt2djhzWWZGN2ZZME5QcDZTcGtvblRlUTI2Qw==" );

var requestOptions = {
method: 'GET',
headers: headers,
redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
.then(response => response.json())
  .then(data => {
    countries=data.map(country =>{
      states=[];
      fetch("https://api.countrystatecity.in/v1/countries/"+country.iso2+"/states",requestOptions)
      .then(response => response.json())
      .then(data => {
        states= data.map(state =>{
          return({name: state.name})
        }

        )
      })

      return({name:country.name, states:states})
    })})
 


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
  let h2= document.querySelector("#head");
  h2.onmouseover = function(){
    h2.style.color = 'red';
  }
  h2.onmouseout = function(){
    h2.style.color = 'lime';
  }
  let s1= document.querySelector("#search4");
  s1.onmouseover = function(){
    s1.style.color = 'red';
  }
  s1.onmouseout = function(){
    s1.style.color = ' rgba(251, 243, 2, 0.98)';
  }

  let s2= document.querySelector("#search5");
  s2.onmouseover = function(){
    s2.style.color = 'red';
  }
  s2.onmouseout = function(){
    s2.style.color = ' rgba(251, 243, 2, 0.98)';
  }
  let s3= document.querySelector("#search6");
  s3.onmouseover = function(){
    s3.style.color = 'red';
  }
  s3.onmouseout = function(){
    s3.style.color = ' rgba(251, 243, 2, 0.98)';
  }
