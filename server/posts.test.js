const request = require("supertest");
const app = require('./server');

describe("Test GET /api/posts", () => {
   test('Respond with 200 success', async() => {
   	const res = await request(app)
   	      .get('/api/posts')
   	      .expect('Content-Type', /json/)
   	      .expect(200);
   })	
})

const blogpost = {
	title: "How to learn testing",
	description: "Let's learn about testing"
}

const blogPostWithMissingProp = {}

describe('Test post /api/posts', () => {
	test('Respond with 201 success created', async() => {
		const res = await request(app)
		      .post('/api/posts')
		      .send(blogpost)
		      .expect('Content-Type', /json/)
		      .expect(201)
	})

	test("inform when missing prop", async () => {
		const res = await request(app)
		     .post('/api/posts')
		     .send(blogPostWithMissingProp)
		     .expect('Content-Type', /json/)
		     .expect(400);

		expect(res.body).toStrictEqual({
			Error: "title and description must required"
		})
	})
})

