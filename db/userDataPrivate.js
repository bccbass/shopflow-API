import bcrypt from 'bcryptjs'

const users = [
    {
        firstName: 'Ben',
        lastName: 'Campbell',
        manager: true,
        fullAccess: true,
        email: 'ben@caringbahmusic.com.au',
        password: 'Rockflat33'
    },
    {
        firstName: 'Shane',
        lastName: 'Koek',
        manager: true,
        fullAccess: true,
        email: 'shane@caringbahmusic.com.au',
        password: 'Rockflat33'
    },
    {
        firstName: 'Lee',
        lastName: 'Benari',
        email: 'lee@caringbahmusic.com.au',
        password: 'Rockflat33'
    },
    {
        firstName: 'Adelaide',
        lastName: 'Koek',
        email: 'adelaide@caringbahmusic.com.au',
        password: 'Rockflat33'
    }
]

export default users