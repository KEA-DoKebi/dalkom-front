import React, { useState } from "react";
import Stack from "@mui/joy/Stack";
import FloatingLabelInput from "./FloatingLabelInput";
import PopupDom from "components/atoms/PopupDom";
import PopupPostCode from "components/atoms/PopupPostCode";

const AddressField = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  return (
    <Stack spacing={1.5} sx={{ minWidth: 500 }}>
      <FloatingLabelInput
        inputType="text"
        label="주소"
        placeholder="주소를 입력하세요"
        value={address}
      />
      <button type="button" onClick={openPostCode}>
        주소 검색
      </button>

      <div id="popupDom">
        {isPopupOpen && (
          <PopupDom>
            {/* onAddressChange prop을 추가하고 handleAddressChange 함수를 전달 */}
            <PopupPostCode
              onClose={closePostCode}
              onAddressChange={handleAddressChange}
            />
          </PopupDom>
        )}
      </div>
    </Stack>
  );
};

export default AddressField;
