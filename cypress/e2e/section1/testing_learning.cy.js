/// <reference types="cypress" />

require("cypress-plugin-tab")
require("cypress-xpath")
import "cypress-file-upload"
require("@4tw/cypress-drag-drop")

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

    it("Test radio-buttons", () => {
        cy.visit('https://testingqarvn.com.es/radio-buttons/')
        cy.title().should("eq","Radio Buttons | TestingQaRvn")
        for(var i = 1; i < 4; i++){
            cy.get('[id=wsf-1-field-44-row-'+i+']').check({force:true}).should("be.checked").wait(2000)
            if(1 < i && i < 4)
                cy.get('[id=wsf-1-field-44-row-'+(i-1)+']').should("not.be.checked")
        }
    })

    it("Test select", () => {
        cy.visit('https://testingqarvn.com.es/combobox/')
        cy.title().should("eq","ComboBox | TestingQaRvn")
        cy.get('#wsf-1-field-53').should("be.visible").select("Mac").should("have.value", "Mac")
        cy.wait(1500)
        cy.get('#wsf-1-field-53').should("be.visible").select("Linux").should("have.value", "Linux")
    })

    it("Test select autocompletado", () => {
        cy.visit('https://google.com/')
        cy.title().should("eq","Google")
        cy.get('#L2AGLb > .QS5gu').click()
        cy.get('.gLFyf').should("be.visible").type("ferrari").click().type("{enter}")
    })

    it("Test select multiple", () => {
        cy.visit('https://demo.anhtester.com/basic-select-dropdown-demo.html')
        cy.title().should("eq","Selenium Easy Demo - Automate All Scenarios")
        cy.get('#multi-select').should("be.visible").select(["California", "Florida", "Ohio"]).then(()=>{
            cy.get('#printMe').should("be.visible").click()
        })
    })

    it("Test select prueba", () => {
        cy.visit('https://demo.anhtester.com/jquery-dual-list-box-demo.html')
        cy.title().should("eq","Selenium Easy - JQuery Dual List Box Demo")
        cy.get(':nth-child(1) > .form-control').should("be.visible").select(["Sophia", "Alice", "Laura"]).then(() => {
            cy.get('.pAdd').should("be.visible").click().then(() => {
                cy.get('.pAddAll').should("be.visible").click().then(() => {
                    cy.get(':nth-child(3) > .form-control').should("be.visible").select(["Laura", "Valentina"]).then(() => {
                        cy.get('.pRemove').should("be.visible").click().then(() => {
                            cy.get('.pRemoveAll').should("be.visible").click()
                        })
                    })
                })
            })
        })
    })

    it("Test assert contains", () => {
        cy.visit('http://automationpractice.com/index.php')
        cy.title().should("eq","My Store")
        cy.wait(1000)
        cy.get('[id="block_top_menu"]').contains("Women").click()
    })

    it("Test assert find", () => {
        cy.visit('http://automationpractice.com/index.php')
        cy.title().should("eq","My Store")
        cy.wait(1000)
        cy.get('[id="block_top_menu"]').contains("Women").click()
        cy.get(".product-container").find(".product-image-container").eq(2).click() //selecciona el tercer elemento de la clase que coincide
    })

    it("Test assert busqueda de palabras en un campo", () => {
        cy.visit('http://automationpractice.com/index.php')
        cy.title().should("eq","My Store")
        cy.get('[id="block_top_menu"]').contains("Women").click()
        cy.get(".product-container").find(".product-image-container").eq(2).click() //selecciona el tercer elemento de la clase que coincide
        cy.get('#product_condition > .editable').then((e) => {
            //cy.log(e.text())
            let estado = e.text()
            if (estado == "New")
                cy.log("El vestido es nuevo")
        })
        cy.get('#our_price_display').then((e) => {
            let precio = e.text()
            precio = precio.slice(1)
            if (precio > 30)
                cy.log("el vestido sale de presupuesto")
            else{
                cy.log("el vestido esta en el presupuesto")
                cy.get('.exclusive > span').click()
            }
        })
    })

    it("Test assert have/contain", () => {
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

        //validamos que el campo contiene el nombre que queremos
        cy.get('.alert-message').should("have.text", "Done !  Computer cypress has been created") //have tiene que tener el texto entero
        cy.get('.alert-message').should("contain", "Computer cypress has been created")
    })

    it("Test assert validate/contain", () => {
        cy.visit('https://computer-database.gatling.io/computers')
        cy.title().should("eq","Computers database")
        cy.wait(1500)

        //search
        cy.xpath("//*[contains(@id, 'searchbox')]").should("be.visible").type("ACE")
        cy.get('#searchsubmit').should("be.visible").click()

        //add
        cy.get('#add').should("be.visible").click()
        cy.get('#name').should("be.visible").type("cypress")
        cy.get('#name').should("have.value", "cypress").then(() => {
            cy.get('#introduced').type("2022-12-01")
            cy.get('#discontinued').type("2022-12-12")
            cy.get('#company').should("be.visible").select("Nokia").should("have.value", "16")
            cy.get('.primary').should("be.visible").click()
        })

        //validamos que el campo contiene el nombre que queremos
        cy.get('.alert-message').should("have.text", "Done !  Computer cypress has been created") //have tiene que tener el texto entero
        cy.get('.alert-message').should("contain", "Computer cypress has been created")
    })

    it("Test assert have-class", () => {
        cy.visit('https://computer-database.gatling.io/computers')
        cy.title().should("eq","Computers database")
        cy.wait(1500)

        //search
        cy.xpath("//*[contains(@id, 'searchbox')]").should("be.visible").type("ACE")
        cy.get('#searchsubmit').should("be.visible").should("have.class", "btn primary")
        cy.get('#searchsubmit').should("be.visible").should("not.have.class", "wrong class")
    })

    it("Test assert and", () => {
        cy.visit('https://computer-database.gatling.io/computers')
        cy.title().should("eq","Computers database")
        cy.wait(1500)

        //search
        cy.xpath("//*[contains(@id, 'searchbox')]").should("be.visible").type("ACE")
        cy.get('#searchsubmit').should("be.visible").and("have.class", "btn primary")
        cy.get('#searchsubmit').should("be.visible").and("not.have.class", "wrong class")
    })
    
    it("Test assert length y css", () => {
        cy.visit('https://demo.anhtester.com/table-pagination-demo.html')
        cy.title().should("eq","Selenium Easy - Table with Pagination Demo")
        
        cy.get("#myTable >tr").should("have.length", 13) //con el >tr cogemos cada una de las filas dentro del id
        cy.get("#myTable >tr >td").should("have.length", 91).and("have.css", "padding", "8px") //para ver cantidad de elementos (celdas)
    })
    
    it("Test assert contains por inicio", () => {
        let tiempo = 1500

        cy.visit('https://demo.anhtester.com/basic-first-form-demo.html')
        cy.title().should("eq","Selenium Easy Demo - Simple Form to Automate using Selenium")
        cy.wait(tiempo)

        //closing window
        cy.get('.at-cm-no-button').should("be.visible").click({force:true})

        cy.get('.form-group > #user-message').should("be.visible").type("demo del contenido")
        cy.contains('[type="button"]', "Show Message").should("be.visible").click() //Para encontrar elementos que puede que se repitan en la misma pagina
        cy.get('#display').should("have.text", "demo del contenido")
    })

    it("Reto asserts", () => {
        let tiempo = 1500

        cy.visit('https://demo.anhtester.com/basic-first-form-demo.html')
        cy.title().should("eq","Selenium Easy Demo - Simple Form to Automate using Selenium")
        cy.wait(tiempo)

        //closing window
        cy.get('.at-cm-no-button').should("be.visible").click({force:true})

        let a = 10
        let b = 20

        cy.get('#sum1').should("be.visible").and("have.class", "form-control").type(a)
        cy.get('#sum2').should("be.visible").and("have.class", "form-control").type(b)
        cy.contains('[type="button"]', "Get Total").click()

        cy.get('#displayvalue').should("be.visible").then((e) => {
            let result = parseInt(e.text())
            cy.log(result)
            if (result == a+b)
                cy.log("Resultado correcto")
            else
                cy.log("Resultado incorrecto")
        })
    })

    it("Reto asserts invoke", () => {
        let tiempo = 1500

        cy.visit('https://demo.anhtester.com/basic-first-form-demo.html')
        cy.title().should("eq","Selenium Easy Demo - Simple Form to Automate using Selenium")
        cy.wait(tiempo)

        //closing window
        cy.get('.at-cm-no-button').should("be.visible").click({force:true})

        let a = 10
        let b = 20

        cy.get('#sum1').invoke("attr", "placeholder").should("contain", "Enter value").then(() => { //comprueba con invoke que el atributo tiene un valor
            cy.get("#sum1").type(a)
            cy.get("#sum1").invoke("attr", "style", "color:blue") //con invoke se cambia el color del atributo
        })
        cy.get('#sum2').invoke("attr", "placeholder").should("contain", "Enter value").then(() => {
            cy.get("#sum2").type(b)
            cy.get("#sum2").invoke("attr", "style", "color:red")
        })
        cy.contains('[type="button"]', "Get Total").click().then(() => {
            cy.get('#displayvalue').invoke("attr", "style", "color: yellow")
        })

        cy.get('#displayvalue').should("be.visible").then((e) => {
            let result = parseInt(e.text())
            cy.log(result)
            if (result == a+b)
                cy.log("Resultado correcto")
            else
                cy.log("Resultado incorrecto")
        })
    })

    it("windows propiedad charset", () => {
        cy.visit("https://testsheepnz.github.io/BasicCalculator.html")
        cy.title().should("eq","Basic Calculator")
        cy.wait(1500)

        cy.document().should("have.property", "charset").and("eq", "UTF-8")
    })

    it("windows validar nombre url", () => {
        cy.visit("https://testsheepnz.github.io/BasicCalculator.html")
        cy.title().should("eq","Basic Calculator")
        cy.wait(1500)

        cy.url().should("include", "BasicCalculator.html")
        cy.url().should("eq", "https://testsheepnz.github.io/BasicCalculator.html")
    })


    it("configuracion tamaño ventana", () => {
        cy.visit("https://testsheepnz.github.io/BasicCalculator.html")
        cy.title().should("eq","Basic Calculator")
        cy.wait(1500)

        cy.viewport("iphone-x")
        cy.wait(2000)
        cy.viewport("ipad-2")
        cy.wait(2000)
        cy.viewport("iphone-3")
        cy.wait(2000)
        cy.viewport("samsung-note9")
        cy.wait(2000)
        cy.viewport("macbook-16")
    })

    it("upload files", () => {
        cy.visit("https://testingqarvn.com.es/upload-files")
        cy.title().should("eq","Upload Files | TestingQaRvn")
        cy.wait(1500)

        const ruta="azul.png"
        cy.get('#wsf-1-field-94').attachFile(ruta)
        cy.wait(2000)
    })

    it("mouse dragAndDrop", () => {
        let tiempo = 1000
        cy.visit("https://the-internet.herokuapp.com/drag_and_drop")
        cy.title().should("eq","The Internet")
        cy.wait(1500)

        cy.get('#column-a').drag("#column-b")
    })

    it("mouse dragAndDrop2", () => {
        let tiempo = 1000
        cy.visit("https://demo.anhtester.com/drag-and-drop-demo.html")
        cy.title().should("eq","Selenium Easy Demo - Drag and Drop Demo")
        cy.wait(1500)

        cy.get('#todrag > :nth-child(2)').drag("#mydropzone",{force:true})
        cy.get('#todrag > :nth-child(3)').drag("#mydropzone",{force:true})
        cy.get('#todrag > :nth-child(4)').drag("#mydropzone",{force:true})
        cy.get('#todrag > :nth-child(5)').drag("#mydropzone",{force:true})
    })

    it("mouse over", () => {
        let tiempo = 1000
        cy.visit("http://way2automation.com")
        cy.title().should("eq","Get Online Selenium Certification Course | Way2Automation")

        cy.contains("Selenium").trigger("mouseover")
        cy.wait(1000)

        cy.contains("Selenium Python Video Tutorials").invoke("removeAttr","target").click()
    })

    it.only("mouse slider", () => {
        let tiempo = 1000
        cy.visit("https://demo.anhtester.com/drag-drop-range-sliders-demo.html")
        cy.title().should("eq","Selenium Easy - Drag and Drop Range Sliders")

        cy.get('#slider1 > .range > input').invoke("attr","value","80")
        cy.get('#slider3 > .range > input').invoke("attr","value","0")
        cy.get('#slider2 > .range > input').invoke("attr","value","90")
        cy.get('#slider4 > .range > input').invoke("attr","value","90")
    }) 
}) //closing describe