# express-password-manager

Simple password manager by expressJS.

- [x] Password manager CRUD
- [x] Password manager data encryption by CryptoJS libary
- [x] User creation CRUD
- [x] Make Relation with user collection and credential(data) collection.
- [x] Password encryption by bcrypt libary.
- [x] Token based authorization by jwt
- [ ] Data validation

## User Model

`{ name: { type: String, required: true }, username: { type: String, required: true }, password: { type: String, required: true }, } `

## Credential Data model

`{ title: { type: String, }, description: { type: String }, domain: { type: String, required: true }, username: { type: String, required: true }, password: { type: String, required: true }, }`
