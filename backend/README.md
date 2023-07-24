# express-password-manager

Simple password manager by expressJS.

- [x] User CRUD
- [x] Vault CRUD
- [x] Encrypt and Decrypt data by CryptoJS libary
- [x] Relation with user and credential(schema). [One to One, One to many]
- [x] Hash password by bcrypt libary.
- [x] Token based authorization by jwt
- [x] Validate request by express-validator

## User Schema

    {
      name: {
          type: String,
          required: true
      },
      email: {
          type: String,
          required: true
      },
      password: {
          type: String,
          required: true
      }
    }

## Vault Schema

    {
        title: {
            type: String,
        },

        description: {
            type: String
        },

        domain: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        }
    }

## dotenv file

    PORT=3000
    CREDENTIAL_SECRET_KEY=putYourSecretKey
    USER_SECRET_KEY=putYourSecretKey
    JWT_SECRET=putYourSecretKey
