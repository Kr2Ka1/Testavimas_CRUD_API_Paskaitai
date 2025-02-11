// const { response } = require("express");

describe('CRUD_API', () => {

    context('/productsnd', () => {




        it('/productsnd endpoint bendras testas', () => {


            cy.request("GET", "localhost:3000/productsnd").then((response) => {
                expect(response.body).to.exist;

                expect(response.status).to.be.eq(200);
                expect(response.body).length.to.be.greaterThan(0);//above(0) - dar galima rašyti.
                expect(response.duration).to.be.lessThan(1000);


                console.log('test');
                cy.log('test');

                console.log(response.body);
                cy.log(response.body);
            });


        });



        it('/productsnd vieno produkto bendras testas', () => {
            cy.request("GET", "http://localhost:3000/productsnd/2").then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body).to.have.property('id', 2);
                expect(response.body).to.have.property('title', 'sofa');
                //id==2 arba title=="sofa" nebūtų tuščias
                // expect(response.body).length.to.be.greaterThan(0);
                // cy.log(response.body.id);
                // cy.log(response.body.title);

            });

            cy.log('pasiruo6imas testui');
        });

//kometuoju kad neprikurtų daigybės naujų post:
        it('/productsnd create bendras testas', () => {
            cy.request("POST", "http://localhost:3000/productsnd", {
                title: "Katinas",
                description: "Juodas katinas",
                price: 500
            }).then((response) => {
                expect(response.status).to.be.eq(201);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('title', 'Katinas');
                expect(response.body).to.have.property('description', 'Juodas katinas');
                expect(response.body).to.have.property('price', 500);
                cy.log(response.body)
            });
        });

        it('/productsnd update bendras testas', () => {
            cy.request("PUT", "http://localhost:3000/productsnd/13", {
                title: "naujaPrekė",
                description: "pakeistasAprašymas",
                price: 5.90
            }).then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body).to.have.property('id', 13);
                expect(response.body).to.have.property('title', 'naujaPrekė');
                expect(response.body).to.have.property('description', 'pakeistasAprašymas');
                expect(response.body).to.have.property('price', 5.90);
                cy.log(response.body)
            });
        });


        it('/productsnd delete bendras testas', () => {
            cy.request("DELETE", "http://localhost:3000/productsnd/11", {
                id: 11
            }).then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body).to.have.property('message', 'Elementas sėkmingai ištrintas');
                cy.log(response.body)
            });
        });


        context('/productsnd atskiri testai', () => {
            it('/productsnd staus kodas 200', () => {
                cy.request("GET", "localhost:3000/productsnd").then((response) => {
                    expect(response.status).to.be.eq(200);
                });
            });
            it('/products atsakymo laikas', () => {
                cy.request("GET", "localhost:3000/productsnd").then((response) => {
                    expect(response.duration).to.be.lessThan(1000);
                });
            });
            it('/products netuscias', () => {
                cy.request("GET", "localhost:3000/productsnd").then((response) => {
                    expect(response.body).length.to.be.greaterThan(1);
                });
            });
        });


    });
});