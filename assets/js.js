// Objects
const activities = [
    {
      name: "Almoço",
      date: new Date("2024-07-08 10:00"),
      check: true
    },
    {
      name: "Academia em Grupo",
      date: new Date("2024-07-09 12:00"),
      check: false
    },
    {
      name: "Gaming Session",
      date: new Date("2024-07-09 16:00"),
      check: false
    }
  ]
  
  // Functions
  function createActivity(activity) {
    let input = '<input type="checkbox"'
    if (activity.check) {
        input += 'checked'
    }
    input += '>'

    return `
      <div>
        ${input}
        <span> ${activity.name} </span>
        <time> ${activity.date} </time>
      </div>
    `
}   
  
  const section = document.querySelector('section')
  
  for(let activity of activities) {
    section.innerHTML += createActivity(activity)
  }
  