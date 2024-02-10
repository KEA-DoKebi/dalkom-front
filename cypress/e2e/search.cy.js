describe('Search', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
    
      it('로그인 후 상품 검색하기.', () => {
        // 유효한 사용자 정보 입력
        cy.get('input[name="email"]').type('temp@gmail.com');
        cy.get('input[name="password"]').type('123456a!');
        cy.get('button[type="submit"]').click();
    
        // 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
        cy.url().should('include', '/'); // 예상되는 리다이렉션 확인

        // 검색창을 찾고 입력 값을 입력합니다.
        cy.get('#search').type('검색어1 아기상어.');
      
        // 엔터를 눌러 검색을 실행합니다.
        cy.get('#search').type('{enter}');
      
        // 검색 실행 후에 페이지 이동을 확인합니다.
        cy.url().should('include', '/search'); 
        cy.url().should('include', 'searchKeyword=검색어1 아기상어.'); 
        cy.wait(2000); // 1초 대기
      
      })
      
})