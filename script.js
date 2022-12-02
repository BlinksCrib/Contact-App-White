// getting all the elements needed
// getting all the elements needed
let contactSearch = document.getElementById('outs')
let totalContacts = document.getElementById('contacts')
let addContactBtn = document.getElementById('add-contact-button')
let contactList = document.getElementById('contact-list')
let editBtn = document.getElementById('edit-button')
let deleteBtn = document.getElementById('delete-button')
let nameInput = document.getElementById('name')
let phoneInput = document.getElementById('phone')
let emailInput = document.getElementById('email')
let addBtn = document.getElementById('add-button')
let cancelBtn = document.getElementById('cancel-button')
let modal = document.getElementById('add-contact-modal')
// getting all the elements needed
// getting all the elements needed
if (localStorage.getItem('contactItems')) {
let totalcont = JSON.parse(localStorage.getItem('contactItems'))
totalContacts.innerHTML = totalcont.length
}else{
  let totalcont = 0
  totalContacts.innerHTML = totalcont
}


addContactBtn.addEventListener('click', () => {
  modal.style.display = 'block'

  contactList.style.display = 'none'
  contactSearch.style.display = 'none'
})

cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none'

  contactList.style.display = 'block'
  contactSearch.style.display = 'flex'
  nameInput.value = ''
  phoneInput.value = ''
  emailInput.value = ''
})

addBtn.addEventListener('click', () => {

  let id = Math.floor(Math.random() * 100000000000000)
  // contact.id = id;

  let fullName = nameInput.value
  let phone = phoneInput.value
  let email = emailInput.value

  nameInput.value = ''
  phoneInput.value = ''
  emailInput.value= ''

  modal.style.display = 'none'
  contactList.style.display = 'block'
  const contact = JSON.parse(localStorage.getItem('contactItems'))
  if (!contact) {
    localStorage.setItem(
      'contactItems',
      JSON.stringify([{ id: id, fullName, email, phone }])
    )
  } else {
    localStorage.setItem(
      'contactItems',
      JSON.stringify([...contact, { id: id, fullName, email, phone }])
    )
  }

  window.location.reload()
})

function validateContacts(contactss) {
  let contacts = JSON.parse(localStorage.getItem('contactItems'))
  if (contactss === null || contactss == undefined) {
    contacts = JSON.parse(localStorage.getItem('contactItems'))
    return contacts
  } else {
    contacts = contactss
    return contacts
  }
}

// showcontact function
// showcontact function
function showContact(contactss) {
  let contacts = validateContacts(contactss)

  // .sort((a, b) => (a.fullName > b.fullName ? 1 : -1))
  for (var i = 0; i < contacts.length; i++) {
    // getting the feedback object from local storage

    contactList.innerHTML += `
        <div class="contact__item item-animation" >
        <div class="ogechi-icon" style="margin-bottom: 10px;" onclick="editContact(${
          contacts[i].id
        })">
        <div class="css-154ogbs">${contacts[i].fullName
          .charAt(0)
          .toUpperCase()}</div>
        </div>
        <div class="contact__details" onclick="editContact(${contacts[i].id})">
            <h4 class="contact__name" id="contact-name">
                ${contacts[i].fullName}
            </h4>
        </div>

        <div class="contact__buttons">
            <button class="contact__button" id="delete-button" onclick="deleteContact(${
              contacts[i].id
            })">
            <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </div>
        `
  }
}
showContact()
// showcontact function
// showcontact function


// delete function
// delete function
function deleteContact(id) {
  const contacts = JSON.parse(localStorage.getItem('contactItems')).filter(
    (contact) => contact.id !== id
  )
  localStorage.setItem('contactItems', JSON.stringify([...contacts]))
  window.location.reload()
}
// delete function
// delete function

// edit function
// edit function
function editContact(id) {
  const contacts = JSON.parse(localStorage.getItem('contactItems')).find(
    (contact) => contact.id === id)

  modal.style.display = 'block'
  contactList.style.display = 'none'
  contactSearch.style.display = 'none'

  nameInput.value = contacts.fullName
  phoneInput.value = contacts.phone
  emailInput.value = contacts.email

  addBtn.addEventListener('click', () => {
    let fullName = nameInput.value
    let phone = phoneInput.value
    let email = emailInput.value

    const contactss = JSON.parse(localStorage.getItem('contactItems')).filter(
      (contact) => contact.id !== id
    )

    localStorage.setItem(
      'contactItems',
      JSON.stringify([...contactss, { id: id, fullName, phone, email }])
    )

    // making the modal disappear
    modal.style.display = 'none'
    contactList.style.display = 'block'
    contactSearch.style.display = 'block'

    deleteContact(id)
    window.location.reload()
  })
}
// edit function
// edit function

// search function
let contactss = []
const contact = JSON.parse(localStorage.getItem('contactItems'))
const searchInput = document.querySelector('[data-search]')
searchInput.addEventListener('keyup', function () {
  // const value = e.target.value.toLowerCase()
  var search = this.value
  contactss = contact.filter(function (val) {
    if (
      val.fullName.toLowerCase().includes(search.toLowerCase()) ||
      val.phone.includes(search)
    ) {
      var newobj = { fullName: val.fullName, phone: val.phone }
      return newobj
    }else{
      console.log("hello");
    }
  })
  showsearchcontact(contactss)
})

function showsearchcontact(searcharray) {
  document.getElementById('contact-list').innerHTML = `
  `
  if (searcharray == '') {
    document.getElementById(
      'error'
    ).innerHTML = `<span class="text-danger">Not Found</span>`
  } else {
    document.getElementById('error').innerHTML = ''

    for (var i = 0; i < searcharray.length; i++) {
      document.getElementById('contact-list').innerHTML += `
        <div class="contact__item item-animation" onclick="editContact(${
          searcharray[i].id
        })">
        <div class="ogechi-icon" style="margin-bottom: 10px;">
        <div class="css-154ogbs">${searcharray[i].fullName
          .charAt(0)
          .toUpperCase()}</div>
        </div>
        <div class="contact__details">
            <h4 class="contact__name" id="contact-name">
                ${searcharray[i].fullName}
            </h4>
        </div>

        <div class="contact__buttons">
            <button class="contact__button" id="delete-button" onclick="deleteContact(${
              searcharray[i].id
            })">
            <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </div>
      `
    }
  }
}