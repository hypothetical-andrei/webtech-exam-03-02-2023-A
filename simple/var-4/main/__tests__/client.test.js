const puppeteer = require('puppeteer')

let browser
let page

describe('local', () => {

  beforeAll(async () => {
    browser = await puppeteer.launch({headless : true, args: ['--no-sandbox', '--disable-setuid-sandbox']})
    page = await browser.newPage()
  })

  it('should have a title', async () => {
    await page.goto('http://localhost:8080')
    await page.waitForSelector('#content')
    const title = await page.$eval("h1", e => e.textContent)
    expect(title.trim()).toEqual('Profil influencer')
  })

  it('should have display profile info', async () => {
    await page.goto('http://localhost:8080')
    await page.waitForSelector('#content')
    const paragraphs = await page.evaluate(() => {
      const ps = Array.from(document.querySelectorAll('#content p'))
      return ps.map(el => el.innerHTML)
    })
    expect(paragraphs[0]).toContain('influencer');
    expect(paragraphs[1]).toContain('1000000');
    expect(paragraphs[2]).toContain('2000000');
  })

  it('should convert numbers to milions', async () => {
    await page.goto('http://localhost:8080')
    await page.waitForSelector('#content')
    await page.click('#convert')
    const paragraphs = await page.evaluate(() => {
      const ps = Array.from(document.querySelectorAll('#content p'))
      return ps.map(el => el.innerHTML)
    })
    expect(paragraphs[1]).toContain('1M');
  })


  afterAll(() => {
    browser.close()
  })
})