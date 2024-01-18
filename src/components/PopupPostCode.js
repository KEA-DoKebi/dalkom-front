import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = (props) => {
  const [selectedAddress, setSelectedAddress] = useState('');

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    // Set the selected address to display
    setSelectedAddress(fullAddress);

    // 주소 검색 결과를 부모 컴포넌트로 전달
    if (props.onAddressChange) {
      props.onAddressChange(fullAddress);
    }

    // 팝업 닫기
    if (props.onClose) {
      props.onClose();
    }
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '10%',
    width: '600px',
    height: '600px',
    padding: '7px',
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      
      {/* 선택한 주소를 표시하는 input 추가 */}
      <input type="text" value={selectedAddress} readOnly />

      {/* 닫기 버튼은 props.onClose가 제공되는 경우에만 표시 */}
      {props.onClose && (
        <button type="button" onClick={() => props.onClose()} className="postCode_btn">
          닫기
        </button>
      )}
    </div>
  );
};

export default PopupPostCode;