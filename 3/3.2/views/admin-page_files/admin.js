const url = "http://localhost:3000/admin/api/v1/"

async function logout() {
   fetch(url, {
      method: 'GET',
      headers: { 'Authorization': 'Basic log:out' }
   }).then(window.location.href = 'http://localhost:3000/').catch(err => console.log(err))
}

function readURL(input) {
   if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
         const image = document.getElementById('prevImage')
         image.src = e.target.result;
         image.style = "display: block;";
      }
      reader.readAsDataURL(input.files[0]);
   }
}

function checkDigits(element) {
   if (element.value.match(/\D/)) {
      element.className = 'invalidInput'
      return false;
   } else {
      element.className = ''
      return true;
   }
}

function deleteBook(id) {
   if (confirm('Удалить книгу?')) {
      fetch(url + 'delete/book/' + id, {
         method: 'PUT'
      }).then(res => window.location.reload()).catch(err => console.log(err))
   }
}

function recoverBook(id) {
   fetch(url + 'recover/book/' + id, {
      method: 'PUT'
   }).then(res => window.location.reload()).catch(err => console.log(err))
}


function validateForm(e) {
   const authors = document.querySelectorAll('.authors')
   const authorsContainer = document.getElementById('authors_container')
   const year = document.getElementById('year')
   const pages = document.getElementById('pages')
   const hint = document.querySelector('.hint')
   const location = document.getElementById('location')
   
   const valid = Array.from(authors).reduce((buff, element) => element.value || buff, false);

   if (!valid) {
      authorsContainer.className = 'invalid'
      hint.className = 'tooltiptext'
      Array.from(authors).forEach(element => {
         element.addEventListener('focus',()=> {
            authorsContainer.className = ''
            hint.className = 'hint'
         })
      });
      e.preventDefault();
   } else if(!checkDigits(year) || !checkDigits(pages)){
      e.preventDefault();
   } else {
      location.value = window.location.href;
   }
}