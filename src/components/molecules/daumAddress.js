import { CustomButton } from "common";
import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const DaumAddress = ({ open, onClose, onSelectAddress }) => {
  /**
   * useState
   */
  const [openPostcode, setOpenPostcode] = useState(false);

  /**
   * handler
   */
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
        주소: ${data.address},
        우편번호: ${data.zonecode}
      `);
      setOpenPostcode(false);
    },
  };

  return (
    <div style={{ position: " " }}>
      <SearchAddressButton onClick={handle.clickButton}>
        주소찾기
      </SearchAddressButton>

      {openPostcode && (
        <DaumPostcode
          onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            width: "100%", // Adjust the width as needed
            height: "100%", // Adjust the height as needed
            zIndex: 3333, // Adjust the zIndex as needed
          }}
        />
      )}
    </div>
  );
};

export default DaumAddress;

const SearchAddressButton = styled(CustomButton)`
  font-size: 11px;
`;
