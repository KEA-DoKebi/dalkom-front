describe("Cart test", () => {
  beforeEach(() => {
    // 사용자 로그인
    cy.visit("/login");
    cy.get('input[name="email"]').type("temp@gmail.com");
    cy.get('input[name="password"]').type("123456a!");
    cy.get('button[type="submit"]').click();
    cy.wait(2000); // 로그인 후 잠시 대기

    cy.visit("/");
  });

  it("상품이 장바구니에 잘 담기는 지 확인한다.", () => {
    // 카테고리 1번에 대한 요소를 찾아 클릭
    cy.get('a[href="/category/1?page=1"]').click();

    cy.get('a[href="/category/1/sub/7?page=1"]').click();

    cy.visit("/category/1/sub/7?page=2");

    // 카테고리 1번에 대한 요소를 찾아 클릭
    cy.get('a[href="/product/145/상품상세"]').click();

    cy.wait(2000);

    // 상품 옵션 선택 드롭다운이 보이는지 확인
    cy.get("#option").click();

    // 드롭다운에서 옵션 선택
    cy.get('ul[role="listbox"]').contains("3. L (남은 재고: 70개)").click();

    // 선택한 옵션 확인
    cy.get("#option").should("contain", "L");
    // 초기 수량이 0으로 설정되어 있는지 확인
    cy.get('input[type="number"]').should("have.value", "0");

    // 수량을 올릴 수 있는지 확인
    cy.get('input[type="number"]').clear().wait(100).type("1");

    // input 필드에 초점을 맞추고, backspace를 세 번 입력하여 기존 값을 지운 다음 '3'을 입력
    cy.get('input[type="number"]')
      .click()
      .type("{backspace}{backspace}{backspace}");

    // 최종 값이 '3'인지 확인
    cy.get('input[type="number"]').should("have.value", "1");

    // "장바구니 담기" 버튼을 클릭
    cy.contains("button", "장바구니 담기").click();

    // Swal 알림창에서 "장바구니로 이동" 버튼 클릭
    cy.get(".swal2-confirm").contains("장바구니로 이동").click();

    // 장바구니 페이지로 이동 확인
    cy.url().should("include", "/cart"); // 실제 장바구니 페이지 URL로 변경해야 합니다.

    // 장바구니 페이지에서 해당 상품이 추가된 것을 확인
    cy.contains("여성의류9").should("exist");
  });

  it("상품이 장바구니에서 수량 변경 / 삭제 확인한다.", () => {
    cy.visit("/cart");

    // 상품 수량 증가 버튼 클릭
    cy.get('[name="increase"]').first().click();
    cy.wait(500); // UI 업데이트 대기

    // 상품 수량 감소 버튼 클릭
    cy.get('[name="decrease"]').first().click();
    cy.wait(500); // UI 업데이트 대기

    // 첫 번째 상품의 체크박스 선택 해제
    cy.get('input[type="checkbox"]').first().uncheck();
    cy.wait(500); // UI 업데이트 대기

    // 선택된 항목 삭제
    cy.get('[name="delete"]').click();
    cy.wait(500); // 삭제 처리 대기

    // SweetAlert2 모달의 '확인' 버튼 클릭
    cy.get(".swal2-confirm").click();

    // 모든 항목 선택
    cy.get('input[type="checkbox"]').first().check();
    cy.wait(500); // UI 업데이트 대기

    // 결제 동의 체크박스 선택
    cy.get('input[name="agree"]').first().check();
    cy.wait(500); // UI 업데이트 대기

    // 결제하기 버튼 클릭
    cy.contains("button", "결제하기").click();

    // 결제 페이지로 이동했는지 확인
    cy.url().should("include", "/payment");
  });
});
