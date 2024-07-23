const Confirm = {
  codes: new Map(),

  create(email) {
    const code = Math.floor(
      1000 + Math.random() * 9000,
    ).toString()
    this.codes.set(code, email)

    console.log(
      'Created confirmation code:',
      code,
      'for email:',
      email,
    )
  },

  getData(code) {
    const email = this.codes.get(code)
    console.log(
      'Retrieved email for code:',
      code,
      'is:',
      email,
    )
    return email
  },
}

module.exports = Confirm
