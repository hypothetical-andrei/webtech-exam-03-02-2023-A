const request = require('supertest')
const app = require('./../app')

describe('Test get index', () => {
  
    test('Can get index', (done) => {
        request(app).get('/')
            .send()
            .expect(200)
            .then(res => {
                expect(res.text).toContain('A simple app')
                done()
            })
    })

    test('Can get profile.json', (done) => {
        request(app).get('/profile.json')
            .send()
            .expect(200)
            .then(res => {
                expect(JSON.parse(res.text)).toMatchObject({name: "influencer", instagram: 1000000, youtube: 2000000})
                done()
            })
    })
})


