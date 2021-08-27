const Validation = {
  codes: document.querySelectorAll('.code'),
  container: document.querySelector('.container'),

  password: 123456,

  verifyPassword() {
    let typedPass = ''

    setTimeout(() => {
      Validation.codes.forEach(code => typedPass += code.value)
      let color
  
      if (typedPass == Validation.password) {
        color = 'var(--green)'
        setTimeout(() => alert("Clap"), 100)
      } else if (typedPass.length === Validation.codes.length && typedPass !== Validation.password) {
        color = 'var(--red)'
      } else {
        color = 'var(--white)'
      }

      Validation.container.style.borderColor = color
    }, 10)
  },

  prevField(index) {
    setTimeout(() => Validation.codes[index - 1].focus(), 10)
  },

  nextField(index) {
    Validation.codes[index].value = ''
    setTimeout(() => Validation.codes[index + 1].focus(), 10)
  },

  addListener() {
    Validation.codes.forEach((code, index) => code.addEventListener('keydown', e => {
      if (e.key >= 0 && e.key <= 9) {
        Validation.nextField(index)
      } else if (e.key === 'Backspace') {
        Validation.prevField(index)
      } else if (e.key === 'e') {
        Validation.codes[index].value = ''
      }
    
      Validation.verifyPassword()
    }))
  },

  start() {
    Validation.codes[0].focus()
    Validation.addListener()
  }
}

Validation.start()