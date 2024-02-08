describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('로그인 페이지에 접속하여 로그인 폼을 확인한다.', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', '로그인');
  })

  it('로그인 폼에 잘못된 정보 입력시 로그인에 실패한다.', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.get('button[type="submit"]').click();

    // 에러 메시지가 나타나는지 확인
    cy.get('.swal2-title').should('contain', '로그인에 실패했습니다.');
    // 경고 창 닫기
    cy.get('.swal2-confirm').click(); 

  })

  it('사용자 로그인에 성공한다.', () => {
    // 유효한 사용자 정보 입력
    cy.get('input[name="email"]').type('temp@gmail.com');
    cy.get('input[name="password"]').type('123456a!');
    cy.get('button[type="submit"]').click();

    // 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
    cy.url().should('include', '/'); // 예상되는 리다이렉션 확인

    cy.wait(2000); // 1초 대기
  
  })

  it('스위치를 클릭하여 로그인 모드를 변환한다.', () => {
    // 스위치의 초기 상태를 확인합니다.
    cy.get('.MuiSwitch-switchBase.Mui-checked').should('not.exist');

    // 스위치를 클릭하여 모드를 변경합니다.
    cy.get('.MuiSwitch-switchBase').click();

    // 스위치의 상태를 확인하여 모드 변경이 올바르게 적용되었는지 확인합니다.
    cy.get('.MuiSwitch-switchBase.Mui-checked').should('exist');
});
 
  it('관리자 모드에서 관리자 로그인에 성공한다.', () => {
    // 스위치를 클릭하여 모드를 변경합니다.
    cy.get('.MuiSwitch-switchBase').click();
    
    cy.get('input[name="email"]').type('admin');
    cy.get('input[name="password"]').type('1234a!');
    cy.get('button[type="submit"]').click();

    // 관리자 로그인 후에 이동되는 페이지에 대한 테스트 코드 작성
    cy.url().should('include', '/admin'); // 예상되는 리다이렉션 확인
  })
});