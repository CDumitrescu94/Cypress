export class SearchResultProduct {
    
    title!: string;
    price!:string;
    image!: Cypress.Chainable<JQuery<HTMLElement>>;

    setDetails(index:number):void{ 
        
        let product = cy.get("[data-cel-widget=search_result_"+ index +"]");
        cy.get("[data-cel-widget=search_result_"+ index +"] .s-title-instructions-style h2").then(($title) => {
            this.title = $title.text().trim();
        });
        cy.get("[data-cel-widget=search_result_"+ index +"] span[data-a-size=xl] span.a-offscreen").then(($price) => {
            this.price = $price.text();
        });    
        this.image = product.find(".s-product-image-container");
        
    }
}