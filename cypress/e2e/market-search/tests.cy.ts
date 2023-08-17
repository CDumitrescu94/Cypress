import { Selectors } from "./Selectors"

describe("Products verification", () => {
    beforeEach(() => {
        cy.viewport(1920, 1280);
        cy.visit("https://www.amazon.de/")      
        cy.get(Selectors.acceptCookiesBtn).click();
      })
    it("Compare selected product price with the product's details page price", () => {
        
        cy.readFile("inputFile.csv").then((config) => {

            let fileLines = config.split(",")
            fileLines.forEach((line: string) => {
           
                cy.get(Selectors.searchBarInput).clear().type(line);
                cy.get(Selectors.searchBtn).click();
                let prodPrice       
                cy.get(Selectors.listedProductPrice).eq(3).then(($price) => {
                    prodPrice = $price.text()
                    cy.get(Selectors.listedProductImage).eq(3).click()
                    cy.get(Selectors.productDetailsPagePrice).eq(0).should('have.text', prodPrice)
                });
            });       
        })
    })

    it("Compare selected product title with the product's details page title", () => {
        
        cy.readFile("inputFile.txt").then((config) => {

            let fileLines = config.split("\n")
            fileLines.forEach((line: string) => {
           
                cy.get(Selectors.searchBarInput).clear().type(line);
                cy.get(Selectors.searchBtn).click();
                let prodTitle: string       
                cy.get(Selectors.listedProductTitle).eq(3).then(($title) => {
                    prodTitle = $title.text().trim()
                    cy.get(Selectors.listedProductImage).eq(3).click()
                    cy.get(Selectors.productDetailsPageTitle).should($title => expect($title.text().trim()).to.equal(prodTitle))
                });
            });       
        })
    })
})