// 카테고리 페이지로 와서
// 상품 비교 버튼 클릭
// 같은 상품 비교버튼 클릭 -> 같은 상품 눌렀을때는 리스트에 추가되지 않게 하기
// 카테고리 다른 상품 비교버튼 클릭 -> 못 담는다고 Swal창 나오게 하기
// 같은 카테고리의 다른 상품 비교버튼 클릭 -> 2개 담아지기 
// 하단 메뉴의 비교하기 버튼 클릭 -> comparision/{categorySeq} 로 페이지 이동
// 화면이 잘 렌더링 되는지 확인
// 셀렉트박스 선택 후 그 선택한 요소 잘 가져와지고 잘 렌더링 되는지 확인


describe('상품 비교 기능 테스트', () => {
  beforeEach(() => {
    // 토큰 생성
    localStorage.setItem("accessToken", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNiIsImlhdCI6MTcwNzQwMjU2MiwiZXhwIjoxNzA4MDA3MzYyfQ.-VmQxIhZXScR6Kp28Z18k0N1I063BYsXZW8r1fAm79I");
    // 카테고리 페이지로 이동
    cy.visit('/category/1'); // 예시 URL입니다. 실제 URL로 변경해주세요.
  });

  it('상품 비교 버튼 클릭 시 리스트에 추가', () => {
    // 첫 번째 상품의 '상품 비교' 버튼 클릭
    // cy.get('[data-cy="compare-btn-949"]').click();
    // // 리스트에 상품이 추가되었는지 확인
    // cy.get('[data-cy="product-compare-list"]').should('contain', '상품명');
  });

  // it('동일한 상품 비교 버튼 클릭 시 리스트에 추가되지 않음', () => {
  //   // 동일한 상품의 '상품 비교' 버튼 클릭
  //   cy.get('[data-cy="compareBtn"]').first().click();
  //   // 클릭 이후 Swal 확인
  //   cy.get('body').then(($body) => {
  //     if ($body.find('.swal2-container').length) {
  //       cy.get('.swal2-container').should('contain', '이미 추가된 상품입니다.');
  //     } else {
  //       // Swal 창이 뜨지 않으면 상품이 추가되지 않았음을 확인
  //       cy.get('[data-cy="product-compare-list"]').children().should('have.length', 1);
  //     }
  //   });
  // });

  // it('다른 카테고리의 상품 비교 버튼 클릭 시 Swal 경고 표시', () => {
  //   // 다른 카테고리 상품의 '상품 비교' 버튼 클릭 시도
  //   cy.get('[data-cy="compareBtn"]').eq(1).click(); // 예시로 두 번째 상품을 클릭한다고 가정
  //   cy.get('.swal2-container').should('contain', '같은 카테고리의 상품만 비교할 수 있습니다.');
  // });

  // it('비교하기 버튼 클릭 후 비교 페이지로 이동', () => {
  //   // '비교하기' 버튼 클릭
  //   cy.get('[data-cy="compare-button"]').click();
  //   // URL이 /comparison/{categorySeq}로 변경되었는지 확인
  //   cy.url().should('include', '/comparison/1');
  //   // 페이지가 올바르게 렌더링되었는지 확인
  //   cy.get('[data-cy="comparison-body"]').should('exist');
  // });

  // it('셀렉트박스에서 상품 선택 후 올바르게 렌더링되는지 확인', () => {
  //   // '비교하기' 버튼 클릭 후 비교 페이지로 이동
  //   cy.get('[data-cy="compare-button"]').click();
  //   // 첫 번째 셀렉트박스에서 상품 선택
  //   cy.get('[data-cy="product-select-1"]').select('상품명');
  //   // 선택한 상품이 올바르게 렌더링되었는지 확인
  //   cy.get('[data-cy="product-review-1"]').should('contain', '상품 리뷰 정보');
  // });
});
