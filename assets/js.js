// Libraries and third party codes
// Formatter function to format the date into desired formats
function formatter(date) {
  return {
    day: {
      monthDay: dayjs(date).format('DD'), // Day of the month
      weekDay: {
        short: dayjs(date).format('ddd'), // Short day of the week
        large: dayjs(date).format('dddd') // Full day of the week
      }
    },
    month: dayjs(date).format('MMMM'), // Full month name
    hour: dayjs(date).format("HH:mm") // Hour and minute in 24-hour format
  }
}

// Objects
// Array of activity objects with name, date, and check status
let activities = [
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
// Function to create the HTML for a single activity
function createActivity(activity) {
  // Select the first <section> element in the document
  let input = `<input onchange="activityDone(event)" value="${activity.date}" type="checkbox"`
  if(activity.check) {
    input += 'checked' // Mark checkbox as checked if activity is done
  }
  input += '>'

  // Format the date for display
  const formattedDate = formatter(activity.date)

  // Return the HTML string for the activity
  return `
    <div>
      ${input}
      <span> ${activity.name} </span>
      <time> ${formattedDate.day.weekDay.large}, 
      dia ${formattedDate.day.monthDay} 
      de ${formattedDate.month}
      às ${formattedDate.hour}h </time>
    </div>
  `
}   

// Function to update the activities in the HTML section
function updateActivities() {
  // Select the first <section> element in the document
  const section = document.querySelector('section')
  
  // Clear old activities after updating the list and prevents duplication
  section.innerHTML = ''
  
  // Check if the activities list is empty
  if(activities.length == 0) {
    section.innerHTML = `<p> Nenhuma atividade cadastrada. <p>`
    return
  }
  
  // Loop through each activity and append its HTML to the section
  for(let activity of activities) {
    section.innerHTML += createActivity(activity)
  }
}

// Update the activities on the page
updateActivities()

// Function to save a new activity from a form submission
const saveActivity = (event) => {
  event.preventDefault() // Prevent default form submission behavior
  const formData = new FormData(event.target) // Get form data

  // Extract activity details from form data
  const name = formData.get('activity')
  const day = formData.get('day')
  const hour = formData.get('hour')
  const date = `${day} ${hour}`

  // Create a new activity object
  const newActivity = {
    name,
    date,
    check: false
  }

  // Check if an activity with the same date and time already exists
  const activityExists = activities.find((activity) => {
    return activity.date == newActivity.date
  })

  // If activity exists, alert the user and do not add the new activity
  if (activityExists) {
    return alert('Dia/Hora não disponível')
  }

  // Add the new activity to the activities array and update the activities list
  activities = [newActivity, ...activities]
  updateActivities()
}

// Function to create the options for the days dropdown in the form
function createDaysForm() {
  const days = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-02-02",
    "2024-02-03"
  ]

  let selectedDays = ''

  // Format each day and create an option element for it
  for(let day of days) {
    const formatted = formatter(day)
    const formattedDate = `
      ${formatted.day.monthDay} de
      ${formatted.month}
    `
    selectedDays += `
      <option value="${day}"> ${formattedDate} </option>
    `
  }

  // Insert the day options into the days select element
  document.querySelector('select[name="day"]').innerHTML = selectedDays
}
createDaysForm()

// Function to create the options for the hours dropdown in the form
function createHourForm() {
  let timeOptions = ''

  // Create option elements for each hour and half-hour time slot
  for(let i = 5; i <= 23; i++) {
    const hour = String(i).padStart(2, '0')
    timeOptions += `<option value="${hour}:00"> ${hour}:00 </option>`
    timeOptions += `<option value="${hour}:30"> ${hour}:30 </option>`
  }

  // Insert the hour options into the hours select element
  document.querySelector('select[name="hour"]').innerHTML = timeOptions
}
createHourForm()

// Function to toggle the done status of an activity when its checkbox is clicked
// Prevents a change of status after the updateActivities()
function activityDone(event) {
  const input = event.target // Get the checkbox input element
  const inputValue = input.value // Get the value of the checkbox (activity date)

  // Find the activity that matches the date of the checkbox
  const activity = activities.find((activity) => {
    return activity.date == inputValue
  })

  // If the activity is not found, do nothing
  if(!activity) {
    return
  }

  // Toggle the check status of the activity
  activity.check = !activity.check
}