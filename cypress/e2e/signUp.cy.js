describe('SignUp Page', () => {
    beforeEach(() => {
        cy.visit('/signUp');
    });

    it('회원가입 페이지에 접속하여 회원가입 폼을 입력한다', () => {
        cy.get('input#empId').type('DKT868617632');
        cy.get('input#email').type('example188@example.com');
        cy.get('input#name').type('아자차');
        cy.get('input#password').type('123456a!');
        cy.get('input#nickname').type('DoKebi');

        // Datepicker 아이콘 클릭
        cy.get('.MuiSvgIcon-root').click();
        cy.get('.MuiPickersYear-select').click().type('2022');
        cy.get('.MuiPickersMonth-select').click().type('4');
        cy.get('.MuiPickersDay-select').click().type('14');

        cy.get('input#address').type('경기도 성남시 분당구 판교역로 235 에이치스퀘어 N동');
        cy.get('button[type="submit"]').click(); // 회원가입 시도

        // 회원가입 실패 확인
        cy.contains('회원가입에 실패했습니다.').should('be.visible');

        // 비밀번호 확인에 다른 비밀번호 입력
        cy.get('input#confirmPassword').clear().type('123456a@');
        cy.get('button[type="submit"]').click(); // 회원가입 시도

        // 비밀번호 일치 오류 메시지 확인
        cy.contains('비밀번호가 일치하지 않습니다.').should('be.visible');

        // 비밀번호 확인 필드의 눈 아이콘 클릭하여 비밀번호 확인
        cy.get('div[role="button"]').click();

        // 비밀번호 확인 필드에 다시 정확한 비밀번호 입력
        cy.get('input#confirmPassword').clear().type('123456a!');
        cy.get('button[type="submit"]').click(); // 회원가입 시도

        // 회원가입 완료 메시지 확인
        cy.contains('회원가입이 완료되었습니다.').should('be.visible');

        // 가입된 이메일과 비밀번호로 로그인
        cy.visit('/login');
        cy.get('input#email').type('example188@example.com');
        cy.get('input#password').type('123456a!');
        cy.get('button[type="submit"]').click();
    });
});
