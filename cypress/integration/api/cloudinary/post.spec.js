describe("Cloudinary POST requests", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://api.notion.com/v1/pages", {
      test: "test",
    }).as("postToNotion");
  });
  it("should create a new input if all fields pass validation", () => {
    console.log(Date.now() / 1000 + 2000, "lala");
    cy.request({
      method: "POST",
      url: "/api/inputs/cloudinary?database=4b0646182c5f4af09cea65567314260e",
      body: {
        original_filename: Date.now() / 1000 + 2000,
        asset_id: "1",
        secure_url: "https://www.google.com",
        metadata: {
          metadata_url: "https://google.com",
          metadata_ocr: "this is a test",
        },
      },
    }).as("response");

    cy.get("@response").its("status").should("be.equal", 201);
  });

  it("should create a new input if all fields pass validation", () => {
    cy.request({
      failOnStatusCode: false,
      method: "POST",
      url: "/api/inputs/cloudinary?database=4b0646182c5f4af09cea65567314260e",
      body: {
        asset_id: "1",
        secure_url: "https://www.google.com",
        metadata: {
          metadata_url: "https://google.com",
          metadata_ocr: "this is a test",
        },
      },
    }).as("response");

    cy.get("@response").its("status").should("be.equal", 400);
  });
});
