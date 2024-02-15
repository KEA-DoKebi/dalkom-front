describe('Review Process', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('마이페이지에서 주문을 확인한다.', () => {
        // 유효한 사용자 정보 입력
        cy.get('input[name="email"]').type('temp@gmail.com');
        cy.get('input[name="password"]').type('123456a!');
        cy.get('button[type="submit"]').click();
    
        // 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
        cy.url().should('include', '/'); // 예상되는 리다이렉션 확인
        cy.wait(2000); // 1초 대기


       // 마이페이지로 이동
       cy.contains('마이페이지').click();
       cy.url().should('include', '/mypage');

       // 첫 번째 주문의 보기 버튼 클릭
       cy.get('button').contains('보기').first().click();
       
       // 주문 상세 페이지로 이동하는지 확인
       cy.url().should('include', '/order-detail/');
       cy.wait(2000); // 1초 대기
      })


      it('관리자에서 배송상태 변경한다.', () => {
         // 스위치를 클릭하여 모드를 변경합니다.
        cy.get('.MuiSwitch-switchBase').click();
        
        cy.get('input[name="email"]').type('admin');
        cy.get('input[name="password"]').type('1234a!');
        cy.get('button[type="submit"]').click();

        // 관리자 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
        cy.url().should('include', '/admin'); // 예상되는 리다이렉션 확인
        cy.wait(1000); // 0.5초 대기

        // 주문목록 이동
        cy.contains('주문 목록').click();
        cy.url().should('include', '/admin/order/list');

         // 검색을 클릭합니다.
         // MuiAutocomplete을 클릭하여 검색창을 활성화합니다.
        cy.get('.MuiAutocomplete-root').click();
        cy.contains('.MuiAutocomplete-option', '주문자').click();

        //검색어를 입력합니다.
        cy.get('input[placeholder="Search"]').click().type('temp');
        
        //첫번째 리스트 보기 클릭
        cy.contains('보기').first().click();

        //주문상태 변경
        cy.get('[data-testid="mui-select"]').click();
        cy.get('[data-value="15"]').click();

        //변경사항 저장
        cy.contains('저장').click();
    });


    it('리뷰를 작성한다.', () => {
        // 유효한 사용자 정보 입력
        cy.get('input[name="email"]').type('temp@gmail.com');
        cy.get('input[name="password"]').type('123456a!');
        cy.get('button[type="submit"]').click();
    
        // 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
        cy.url().should('include', '/'); // 예상되는 리다이렉션 확인
        cy.wait(2000); // 1초 대기


       // 마이페이지로 이동
       cy.contains('마이페이지').click();
       cy.url().should('include', '/mypage');

       // 첫 번째 주문의 보기 버튼 클릭
       cy.get('button').contains('보기').first().click();
       
       // 주문 상세 페이지로 이동하는지 확인
       cy.url().should('include', '/order-detail/');
       cy.wait(2000); // 1초 대기

        // 첫 번째 주문의 리뷰 작성 버튼 클릭
        cy.get('button').contains('리뷰 작성').first().click();

        //리뷰 작성
        cy.get(".MuiRating-visuallyHidden").eq(6).click({force: true})
        cy.get('.ql-editor')
        .type('향기가 좋아요!!', { delay: 50 }) // 사용자가 에디터에 내용을 입력합니다.
        .should('have.text', '향기가 좋아요!!');
        cy.get('button').contains('리뷰 제출').first().click();
        cy.get('button').contains('확인').first().click();



        //리뷰학인
        cy.contains('리뷰관리').click();
        cy.url().should('include', '/mypage/review');
      })

})

