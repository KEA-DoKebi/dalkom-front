describe("Cart test", () => {
  beforeEach(() => {
    cy.visit("/login");
    // 스위치를 클릭하여 모드를 변경합니다.
    cy.get(".MuiSwitch-switchBase").click();

    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("1234a!");
    cy.get('button[type="submit"]').click();

    // 관리자 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
    cy.url().should("include", "/admin"); // 예상되는 리다이렉션 확인
    cy.wait(1000); // 0.5초 대기
  });

  it("일반관리자를 등록한다.", () => {
    // 주문목록 이동
    cy.contains("관리자 목록").click();
    cy.url().should("include", "/admin/list");

    //등록하기 버튼
    cy.contains("등록하기").click();

    // 관리자 등록 페이지로 이동 확인
    cy.url().should("include", "/admin/register");

    cy.get('input[name="adminId"]').type("admin4321");
    cy.get('input[name="password"]').type("1234a!");
    cy.get('input[name="name"]').type("이테스트");
    cy.get('input[name="nickname"]').type("테스트용임4321");
    cy.get('input[name="depart"]').type("실험실");

    cy.get('button[type="submit"]').click();

     // Swal 알림창에서 "확인" 버튼 클릭
     cy.get(".swal2-confirm").click();

     cy.wait(1000); // 0.5초 대기
 
     cy.url().should("include", "/admin/list");

     cy.contains("button", "2").click();

     cy.contains("admintest123").should("exist");
  });
});
