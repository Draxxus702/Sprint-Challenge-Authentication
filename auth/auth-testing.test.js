const db = require('../database/db-Config')

const request = require('supertest')
const server = require('../api/server')
const {add, remove} = require('../users/user-model')

describe('server.js', () =>{
    describe('GET /api/users', ()=>{
        it('should return 400 status', async() =>{
            const res = await request(server).get('/api/users')
            expect(res.status).toBe(400)
        })//needs to be a 200 with authentication
        it('should return JSON', async() =>{
            const res = await request(server).get('/api/users')
            expect(res.type).toMatch(/JSON/i)
        })
    })
})


describe('user model', function() {
    describe('insert()', function() {
        beforeEach(async() => {
            await db('users').truncate();
        })
        it('should add a username and password', async function() {
            await add({ username: 'kennith', Password: 'drax' });
            const users = await db('users');
            expect(users).toHaveLength(1);
            expect(users[0].username).toBe('kennith')
            expect(users[0].password).toBe('drax')
        })
        it('should return JSON', async() => {
            const res = await request(server).post('/api/auth/register').send({ username: 'kennith', password:'drax' });
            expect(res.type).toMatch(/JSON/i);
        });
        // it('should give a failing error', async() =>{
        //     await add({username: 'kennith', password:'drax'})
        //     await add({username: 'kennith', password:'drax'})
        //     const users = await db('users')
        //     expect(users).toHaveLength(1);
        // })
    })
})


describe('DELETE  /api/users/:id', ()=>{
    it('should return a 200 status', async() =>{
        await request(server).post('/api/auth/register').send({username: 'kennith', password: 'drax'})
        const res = await request(server).delete('/api/auth/user/1')
        expect(res.status).toBe(200)
    })
    it('should return JSON', async() =>{
        await request(server).post('/api/auth/register').send({username: 'kennith', password: 'drax'})
        const res = await request(server).delete('/api/auth/user/1')
        expect(res.type).toMatch(/JSON/i)
    })
    it('should fail with wrong id', async() =>{
        await request(server).post('/api/auth/register').send({username: 'kennith', password: 'drax'})
        const res = await request(server).delete('/api/auth/user/5')
        expect(res.status).toBe(404)
    })
})


describe('POST /api/auth/login', ()=>{
    it ('should log in', async() =>{
       const res = await request(server).post('/api/auth/login').send({username: 'kennith', password: 'drax'})
        expect(res.status).toBe(200)
    })
    it('should fail with missing credentials', async()=>{
        const res = await request(server).post('/api/auth/login').send({username: '', password: ''})
        expect(res.status).toBe(401)
    })
})
