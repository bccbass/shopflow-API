import bcrypt from 'bcryptjs'

const users = [
    {
        firstName: 'Juan',
        lastName: 'Gonzales',
        fullAccess: true,
        email: 'manager@email.com',
        password: 'password'
    },
    {
        firstName: 'Adalberto',
        lastName: 'Rodriguez',
        email: 'admin@email.com',
        password: 'password'

    }
]

export default users