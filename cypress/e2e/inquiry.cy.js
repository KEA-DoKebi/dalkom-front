describe("Cart test", () => {
    beforeEach(() => {
      // 사용자 로그인
      cy.visit("/login");
      cy.get('input[name="email"]').type("temp@gmail.com");
      cy.get('input[name="password"]').type("123456a!");
      cy.get('button[type="submit"]').click();
      cy.wait(2000); // 로그인 후 잠시 대기
  
      
    });
  
    it("사용자가 문의를 남긴다.", () => {

        cy.visit("/");
      
    });
  
    it("상품이 장바구니에서 수량 변경 / 삭제 확인한다.", () => {
      
    });
  });
  