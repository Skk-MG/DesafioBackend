const chai = require('chai');
const { response } = require('express');
const supertest = require('supertest');
const expect = chai.expect; 

const request = supertest("http://localhost:8080")

describe('/api/products tests', ()=>{
    before(()=>{
        this.cartMock = {
            products: []
        }
    })

    // it('Debe poder crear un carrito vacio', async ()=>{

    // })

    it('Debe poder traer un carrito a traves de su ID', async ()=>{
        const cartId = '6626ea9b09bcba3a9ddf78ae'; 

        const response = await request.get(`/api/carts/${cartId}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id', cartId);
        expect(response.body).to.have.property('products');
    })

    it('Debe poder traer la lista entera de carritos', async ()=>{
        const response = await request.get(`/api/carts`)

        expect(response).to.have.property('status')
        expect(response._body).to.have.property('payload')
        expect(response._body.payload).to.be.a('Array')
    })

    // it('Debe poder agregar un producto al carrito', async ()=>{

    // })

    // it('Debe poder eliminar un producto del carrito', async ()=>{

    // })

    // it('Debe poder actualizar un carrito con cualquier producto', async ()=>{

    // })

    // it('Debe poder actualizar la cantidad de un producto', async ()=>{

    // })

    // it('Debe poder eliminar un carrito', async ()=>{

    // })

    // it('Debe poder mostrar el ticket de una compra', async ()=>{

    // })
})