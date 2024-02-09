// 탑바의 모든 요소가 잘 나오는지 확인
// 배너가 잘 나오는지 확인
// 카테고리 아이콘들이 잘 나오는지 확인
// 상품 리스트들이 잘 나오는지 확인
// 푸터가 잘 나오는지 확인


describe('메인 페이지 테스트', () => {
  beforeEach(() => {
    // 토큰 로컬스토리지에 설정
    localStorage.setItem("accessToken", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNiIsImlhdCI6MTcwNzQwMjU2MiwiZXhwIjoxNzA4MDA3MzYyfQ.-VmQxIhZXScR6Kp28Z18k0N1I063BYsXZW8r1fAm79I");
    cy.visit('/'); // 메인 페이지로 이동
  });
  it('메인 페이지가 정상적으로 로드되는지 확인', () => {
    // 메인 페이지의 특정 요소가 로드되었는지 확인
    // 예시로, 메인 페이지에 있는 특정 텍스트나 요소를 확인합니다.
    // 이 부분은 실제 페이지의 구성에 따라 수정해야 할 수 있습니다.
    cy.contains('DalKom.Shop').should('exist'); // 페이지 타이틀이 제대로 표시되는지 검사
    cy.get('main').should('exist'); // Main 컨테이너가 존재하는지 확인
    cy.get('header').should('exist'); // Header가 정상적으로 로드되었는지 확인
    cy.get('footer').should('exist'); // Footer가 정상적으로 로드되었는지 확인
  });

  it('Carousel이 정상적으로 로드되는지 확인', () => {
    it('Carousel이 정상적으로 로드되는지 확인', () => {
      // Carousel 존재 확인
      cy.get('[data-cy="carousel"]').should('exist');
  
      // 첫 번째 아이템 및 이미지 로드 상태 확인
      cy.get('[data-cy="carousel-item-1"]').should('exist');
      cy.get('[data-cy="banner-image-1"]')
        .should('have.attr', 'src', '/images/MainPage/dokebiBanner4.png') // 이미지 URL 확인
        .and((img) => {
          expect(img[0].naturalWidth).to.be.greaterThan(0); // 이미지가 실제로 로드되었는지 확인
        });
  
      // 두 번째 아이템 및 이미지 로드 상태 확인
      cy.get('[data-cy="carousel-item-2"]').should('exist');
      cy.get('[data-cy="banner-image-2"]')
        .should('have.attr', 'src', '/images/MainPage/dokebiBanner5.png') // 이미지 URL 확인
        .and((img) => {
          expect(img[0].naturalWidth).to.be.greaterThan(0); // 이미지가 실제로 로드되었는지 확인
        });
    });
  });

  it('카테고리가 정상적으로 로드되는지 확인', () => {
    cy.get('[data-cy="category-box"]').should('exist'); // 카테고리 박스 존재 확인

    // 카테고리 링크의 개수가 categoryLists 배열의 길이와 일치하는지 확인
    cy.get('[data-cy^="category-link-"]').then((links) => {
      expect(links.length).to.equal(6);
    });

    // 각 카테고리 아이콘의 로드 상태 확인
    cy.get('[data-cy^="category-avatar-"]').each((avatar, index) => {
      // 예상되는 이미지 경로를 생성
      const expectedSrc = `/images/MainPage/category${index+1}.png`;
    
      // img 태그를 명시적으로 찾아서 src가 예상 경로와 일치하는지 확인
      cy.wrap(avatar).find('img').should('have.attr', 'src', expectedSrc);
    
      cy.wrap(avatar).find('img').should(($img) => {
        // 이미지가 완전히 로드되었는지 확인
        const isLoaded = $img[0].complete && $img[0].naturalWidth > 0;
        expect(isLoaded).to.be.true;
      });
    });
  });

  // 상품 리스트들이 잘 나오는지 확인
  it('상품 테이블이 정상적으로 로드되는지 확인', () => {
    // 상품 테이블 컨테이너 존재 확인
    cy.get('[data-cy="product-table"]').should('exist');

    // 상품 테이블의 각 행이 존재하는지 확인
    cy.get('[data-cy^="product-row-"]').each(($row, index) => {
      // 각 행의 셀이 존재하는지 확인
      cy.get(`[data-cy="product-cell-${index}"]`).should('exist');

      // 각 행 내의 상품 그리드가 존재하는지 확인
      cy.get(`[data-cy="product-grid-${index}"]`).should('exist');

      // 각 행 내의 상품 카드가 적절히 로드되었는지 확인
      // 이 부분은 productList 배열의 길이에 따라 달라질 수 있으므로, 실제 데이터에 맞게 조정이 필요할 수 있습니다.
      // 예시 코드는 상품 카드가 최소 하나 이상 존재한다고 가정합니다.
      const index = 0; // 예시로 사용될 product-grid의 인덱스
      const expectedProductCount = 48; // 이 그리드에서 기대하는 상품 카드의 수

      // 각 상품 카드에 대해 반복 검사를 수행합니다.
      for (let i = 1; i <= expectedProductCount; i++) {
        cy.get(`[data-cy="product-grid-${index}"]`, { timeout: 10000 }).find(`[data-cy="product-card-${i}"]`).should('exist');
      }
    });
  });

    



  });
  