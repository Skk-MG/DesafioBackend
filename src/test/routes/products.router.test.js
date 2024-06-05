const chai = require('chai');
const supertest = require('supertest');
const expect = chai.expect; 

const request = supertest("http://localhost:8080")

describe('/api/products tests', ()=>{
    before(()=>{
        this.productMock = {
            title: 'Test product',
            description: 'A test producqt',
            price: 495,
            thumbnails: [Array],
            code: '495495',
            stock: 495,
            status: true,
            category: 'Test',
            owner: 'admin'
        }
    })

    it('Debe poder traer la lista entera de productos', async ()=>{
        const response = await request.get(`/api/products`)

        expect(response).to.have.property('status')
        expect(response.body).to.have.property('payload')
        expect(response.body.payload).to.be.a('Array')
    })

    it('Debe poder traer un solo producto a traves de su ID', async ()=>{
        const productId = '65db932b855149a9a3133e23'; 

        const response = await request.get(`/api/products/${productId}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id', productId);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('price');
    })

    // it('Debe poder crear un producto con ciertas caracteristicas', async ()=>{
        // const {body, statusCode} = await request.post('/api/products').send(this.productMock);

        // console.log(body)
        // expect(body).to.exist
        // expect(statusCode).to.be.equal(200)
        // expect(response.body).to.have.property('_id');
        // expect(response.body).to.have.property('title');
        // expect(response.body).to.have.property('price');
        // expect(response.body.status).to.be.true;
    // })

    // it('Dado un ID, debe poder actualizar un producto', async ()=>{
    //     const updatedProductId = '65db932b855149a9a3133e23' 
    //     const updatedProduct = this.productMock
    //     const response = await request.put(`/api/products/${updatedProductId}`).send(updatedProduct)

    //     expect(response.status).to.equal(200);
    //     expect(response.body).to.be.an('object');
    //     expect(response.body).to.have.property('_id', updatedProductId);

    //     const getResponse = await request.get(`/api/products/${updatedProductId}`);

    //     expect(getResponse.status).to.equal(200);
    //     expect(getResponse.body).to.have.property('title', updatedProduct.name);
    //     expect(getResponse.body).to.have.property('price', updatedProduct.price);
    // })

    // it('Dado un ID, debe poder eliminar un producto', async ()=>{
    //     const createResponse = await request.post('/api/products').send(this.productMock);
    //     const newPetId = createResponse._body.payload._id; 
    //     console.log(createResponse.body)

    //     await request.delete(`/api/products/${newPetId}`)
    //     const {_body, statusCode} = await request.get(`/api/products/${newPetId}`)

    //     expect(statusCode).to.be.equal(400)
    //     expect(_body).not.to.have.property('payload')
    // })
})