import { Selectors } from "./Selectors"
import  { SearchResultProduct }  from "./SearchResultProduct"

describe("Products verification", () => {
    beforeEach(() => {
        cy.viewport(1920, 1280);
        cy.visit("https://www.amazon.de/")      
        
      })

      it("Compare search result product details with the product's details page information", () => {
        cy.get(Selectors.acceptCookiesBtn).click();
        cy.readFile("inputFile.csv").then((config) => {

            let fileLines = config.split(",")
            fileLines.forEach((line: string) => {
           
                cy.get(Selectors.searchBarInput).clear().type(line);
                cy.get(Selectors.searchBtn).click();

                var searchResultProduct = new SearchResultProduct();
                searchResultProduct.setDetails(4);
                searchResultProduct.image.click().then(() => {
                    cy.get(Selectors.productDetailsPagePrice).eq(0).should('have.text', searchResultProduct.price)
                    cy.get(Selectors.productDetailsPageTitle).should($title => expect($title.text().trim()).to.equal(searchResultProduct.title))                   
                });    
            });       
        })
    })

    it("Compare search result product price with the product's details page price", () => {
        cy.get(Selectors.acceptCookiesBtn).click();
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

    it("Compare search result product title with the product's details page title", () => {
        
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