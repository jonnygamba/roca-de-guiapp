describe("Cloudinary POST requests", () => {
  it("should create a new input if all fields pass validation", () => {
    cy.request({
      method: "POST",
      url: "/api/inputs/cloudinary",
      body: {
        original_fileName: Date.now() / 1000 + 2000,
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
      url: "/api/inputs/cloudinary",
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
