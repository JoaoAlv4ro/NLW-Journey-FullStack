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
    <div class="card-bg">
      ${input}
      <div> 
        <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.50008 9.99999L9.16675 11.6667L12.5001 8.33332M18.3334 9.99999C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333C5.39771 18.3333 1.66675 14.6024 1.66675 9.99999C1.66675 5.39762 5.39771 1.66666 10.0001 1.66666C14.6025 1.66666 18.3334 5.39762 18.3334 9.99999Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.41664 1.81833C9.46249 1.61593 10.5374 1.61593 11.5833 1.81833M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10083C15.5587 3.70019 16.3197 4.46406 16.9158 5.35083M1.8183 11.5833C1.6159 10.5375 1.6159 9.46252 1.8183 8.41667M16.8991 14.6742C16.2998 15.5587 15.5359 16.3198 14.6491 16.9158M18.1816 8.41667C18.384 9.46252 18.384 10.5375 18.1816 11.5833M3.1008 5.32583C3.70016 4.44128 4.46403 3.68023 5.3508 3.08417M5.3258 16.8992C4.44124 16.2998 3.6802 15.5359 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <span> ${activity.name} </span>
      </div>

      <time class="short"> 
        ${formattedDate.day.weekDay.short}.
        ${formattedDate.day.monthDay} <br>
        ${formattedDate.hour}
      </time>
      <time class="full"> 
      ${formattedDate.day.weekDay.large}, 
      dia ${formattedDate.day.monthDay} 
      de ${formattedDate.month}
      às ${formattedDate.hour}h 
      </time>
    </div>
  `
}   

// Function to sort activities by date
function sortActivitiesByDate() {
  activities.sort((a, b) => {
    // Convert date strings to Day.js objects
    const dateA = dayjs(a.date, "YYYY-MM-DD HH:mm");
    const dateB = dayjs(b.date, "YYYY-MM-DD HH:mm");
    return dateA - dateB;
  });
}

// Function to update the activities in the HTML section
function updateActivities() {
  // Sort activities by date
  sortActivitiesByDate();
  
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
    "2024-06-28",
    "2024-06-29",
    "2024-07-01",
    "2024-07-02",
    "2024-07-03",
    "2024-07-05",
    "2024-07-06",
    "2024-07-07",
    "2024-07-08",
    "2024-07-09",
    "2024-07-10",
    "2024-07-11",
    "2024-07-12"
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
// Prevent a status change after updateActivities()
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