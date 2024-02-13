describe("Cart test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("사용자가 문의를 남긴다.", () => {
    // 유효한 사용자 정보 입력
    cy.get('input[name="email"]').type("temp@gmail.com");
    cy.get('input[name="password"]').type("123456a!");
    cy.get('button[type="submit"]').click();

    // 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
    cy.url().should("include", "/"); // 예상되는 리다이렉션 확인

    cy.wait(2000); // 1초 대기

    // 마이페이지로 이동
    cy.contains("마이페이지").click();
    cy.url().should("include", "/mypage");

    // 첫 번째 주문의 보기 버튼 클릭
    cy.get("p").contains("문의하기").first().click();

    // 문의하기 페이지로 이동하는지 확인
    cy.url().should("include", "/mypage/inquiry");
    cy.wait(2000); // 1초 대기

    // 카테고리 선택 (예: '상품')
    cy.get("#categorySeq").click(); // Select 컴포넌트 클릭
    cy.get('ul[role="listbox"]').contains("상품").click(); // '상품' 옵션 선택

    // 제목 입력
    cy.get('textarea[name="title"]').type("애플워치 등록 가능할까요?");

    // 내용 입력
    // EditorComponent 사용 시 직접적인 DOM 접근이 어려울 수 있으므로, 이 부분은 커스텀 이벤트 트리거링 또는 Editor 인스턴스 접근 방식에 따라 달라질 수 있습니다.
    // 아래 예제 코드는 단순 텍스트 입력 필드를 대상으로 합니다. 실제 Editor 컴포넌트에 따라 적절히 조정해야 합니다.
    cy.get(".ql-editor")
      .type("애플워치가 사고 싶어요", { delay: 50 }); // 사용자가 에디터에 내용을 입력합니다.


    // '저장' 버튼 클릭
    cy.get('button[type="submit"]').click();

    // Swal 알림창이 나타나면 '확인' 버튼 클릭
    cy.get(".swal2-confirm").click();

    // 문의 내역 페이지로 이동 확인
    cy.url().should("include", "/mypage/inquiry/history");
    cy.wait(2000); // 1초 대기
  });

  it("관리자가 문의를 확인하고 답변한다.", () => {
    // 스위치를 클릭하여 모드를 변경합니다.
    cy.get(".MuiSwitch-switchBase").click();

    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("1234a!");
    cy.get('button[type="submit"]').click();

    // 관리자 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
    cy.url().should("include", "/admin"); // 예상되는 리다이렉션 확인
    cy.wait(1000); // 0.5초 대기

    // 주문목록 이동
    cy.contains("상품 문의").click();
    cy.url().should("include", "/admin/inquiry/product");

    //첫번째 리스트 보기 클릭
    cy.contains("보기").first().click();

    // 답변 입력
    cy.get('textarea[name="answer"]').type("등록해드릴게요!");

    cy.get('button[type="submit"]').click();

    // Swal 알림창에서 "확인" 버튼 클릭
    cy.get(".swal2-confirm").click();

    cy.wait(1000); // 0.5초 대기

    // 답변완료로 바뀌었는지 확인
    cy.get("[data-cy='inquiry-status']").first().should("contain", "답변완료");
  });

  it("사용자가 문의 답변을 확인한다.", () => {
    // 유효한 사용자 정보 입력
    cy.get('input[name="email"]').type("temp@gmail.com");
    cy.get('input[name="password"]').type("123456a!");
    cy.get('button[type="submit"]').click();

    // 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
    cy.url().should("include", "/"); // 예상되는 리다이렉션 확인

    cy.wait(2000); // 1초 대기

    // 마이페이지로 이동
    cy.contains("마이페이지").click();
    cy.url().should("include", "/mypage");

    // 첫 번째 주문의 보기 버튼 클릭
    cy.get("p").contains("문의내역").first().click();

    // 문의하기 페이지로 이동하는지 확인
    cy.url().should("include", "/mypage/inquiry/history");
    cy.wait(2000); // 1초 대기

    // 답변완료로 바뀌었는지 확인
    cy.get("[class='MuiTableBody-root css-apqrd9-MuiTableBody-root']").first().should("contain", "답변완료");

    cy.get('button').contains('보기').first().click();
  });
});
