/// <reference types="cypress" />

require("cypress-plugin-tab")
require("cypress-xpath")

describe("section 1", ()=> {
    it("My first test -> hola mundo", () => {
        cy.log("hello world")
        cy.wait(200)
    })

    it("Segundo test -> campo name", () => {
        cy.visit('https://example.cypress.io/todo')
        cy.get("[data-test=new-todo]").type("ruben");
        cy.wait(4000)
    })

    it("Test de validación de título de página", () => {
        cy.visit('https://example.cypress.io/todo')
        cy.title().should("eq","Cypress.io: Kitchen Sink")
    })

    it("Test de validación de título de página -> fail expected", () => {
        cy.visit('https://example.cypress.io/todo')
        cy.title().should("eq","Cypress.io: Kitchen Sin")
    })

    it("Test de type_enter", () => {
        cy.visit('https://www.vodafone.es/c/conocenos/es/vodafone-espana/')
        cy.title().should("eq","Vodafone España: Quienes somos, Contacto, Responsabilidad Corporativa, Trabaja con nosotros | Vodafone particulares")
        cy.wait(2000)
        cy.get("[id=onetrust-accept-btn-handler]").click()
        cy.get("[id=627d8545-2992-44a0-a753-61a98302d7c8]").click()
        cy.get("[enterkeyhint=search]").type("iphone {enter}");
    })

    it("Test de scrolling", () => {
        cy.visit('https://www.vodafone.es/c/conocenos/es/vodafone-espana/')
        cy.title().should("eq","Vodafone España: Quienes somos, Contacto, Responsabilidad Corporativa, Trabaja con nosotros | Vodafone particulares")
        cy.wait(2000)
        cy.get("[id=onetrust-accept-btn-handler]").click()
        cy.wait(1000)
        cy.scrollTo("bottom")
        cy.wait(1000)
        cy.scrollTo("top")
        cy.wait(500)
    })

    it("Test de tabulación", () => {
        cy.visit('https://testingqarvn.com.es/datos-personales/')
        cy.title().should("eq","Datos Personales | TestingQaRvn")
        cy.get("[id=wsf-1-field-21]").type("Ruben").
        tab().type("peña").
        tab().type("email@mail.com").
        tab().type("12345678").
        tab().type("nothing").
        tab().type(" ")
    })

    it("Test de asserts", () => {
        cy.visit('https://testingqarvn.com.es/datos-personales/')
        cy.title().should("eq","Datos Personales | TestingQaRvn")
        cy.get("[id=wsf-1-field-21]").should("be.visible").type("ruben")
        cy.get('#wsf-1-field-22').should("be.visible").type("peña")
        cy.get('#wsf-1-field-23').should("be.visible").should("be.enabled").type("email@mail.com")
    })

    it("Test de click básico", () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.title().should("eq","OrangeHRM")
        cy.get('#txtUsername').should("be.visible").type("Admin")
        cy.get('#txtPassword').should("be.visible").type("admin123")
        cy.get('#btnLogin').should("be.visible").click()
    })

    it("Test de click forzado", () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.title().should("eq","OrangeHRM")
        cy.get('#txtUsername').should("be.visible").type("Admin")
        cy.get('#txtPassword').should("be.visible").type("admin123")
        cy.get('#btnLogin').should("be.visible").click()
        cy.get('#menu_admin_viewAdminModule > b').should("be.visible").click()
        cy.get('#menu_admin_jobCategory').click({force:true})
    })

    it("Test de click coordenadas", () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.title().should("eq","OrangeHRM")
        cy.get('#txtUsername').should("be.visible").type("Admin")
        cy.get('#txtPassword').should("be.visible").type("admin123")
        cy.get('#btnLogin').should("be.visible").click()
        cy.get('.flot-overlay').should("be.visible").click(5,50)
        cy.get('.flot-overlay').should("be.visible").click(30,70)
        for(var i = 0; i < 100 ; i++)
            cy.get('.flot-overlay').should("be.visible").click(30,i)
    })

    it("Test de xpath", () => {
        cy.visit('https://testingqarvn.com.es/datos-personales/')
        cy.title().should("eq","Datos Personales | TestingQaRvn")
        cy.xpath("//*[@id='wsf-1-field-21']").should("be.visible").type("Ruben")
    })

    it("Test de contains", () => {
        cy.visit('https://testingqarvn.com.es/radio-buttons/')
        cy.title().should("eq","Radio Buttons | TestingQaRvn")
        cy.get(".wsf-label").should("be.visible").contains("PHP").click()
        cy.get(".wsf-label").should("be.visible").contains("JS").click()
    })

    it("Test de copySelector", () => {
        cy.visit('https://testingqarvn.com.es/radio-buttons/')
        cy.title().should("eq","Radio Buttons | TestingQaRvn")
        cy.get("#wsf-1-field-37").should("be.visible").type("Ruben")
    })

    it("Test completo 1", () => {
        cy.visit('https://computer-database.gatling.io/computers')
        cy.title().should("eq","Computers database")
        cy.wait(1500)

        //search
        cy.xpath("//*[contains(@id, 'searchbox')]").should("be.visible").type("ACE")
        cy.get('#searchsubmit').should("be.visible").click()

        //add
        cy.get('#add').should("be.visible").click()
        cy.get('#name').should("be.visible").type("cypress").tab().
        type("2022-12-01").tab().type("2022-12-12")
        cy.get('#company').should("be.visible").select("Nokia").should("have.value", "16")
        cy.get('.primary').should("be.visible").click()
        cy.get('.alert-message').should("contain", "Computer cypress has been created")
    })

    it("Test checkbox", () => {
        cy.visit('https://testingqarvn.com.es/prueba-de-campos-checkbox/')
        cy.title().should("eq","Prueba de campos Checkbox | TestingQaRvn")
        cy.get('[type=checkbox]').check({force:true}).should("be.checked")
        cy.wait(2000)
        cy.get('[type=checkbox]').uncheck({force:true}).should("not.be.checked")
    })
    
    it("Test checkbox por seleccion", () => {
        cy.visit('https://testingqarvn.com.es/prueba-de-campos-checkbox/')
        cy.title().should("eq","Prueba de campos Checkbox | TestingQaRvn")
        cy.get('[id="wsf-1-field-36-row-2"]').check({force:true})
    })

    it.only("Test radio-buttons", () => {
        cy.visit('https://testingqarvn.com.es/radio-buttons/')
        cy.title().should("eq","Radio Buttons | TestingQaRvn")
        for(var i = 1; i < 4; i++){
            cy.get('[id=wsf-1-field-44-row-'+i+']').check({force:true}).should("be.checked").wait(2000)
            if(1 < i && i < 4)
                cy.get('[id=wsf-1-field-44-row-'+(i-1)+']').should("not.be.checked")
        }
    })

    
}) //closing describe