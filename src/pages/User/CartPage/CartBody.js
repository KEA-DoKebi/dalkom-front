import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import { Button, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TokenAxios } from "apis/CommonAxios";
import { useNavigate } from "react-router-dom";
import { DefaultAxios } from "apis/CommonAxios";
import Swal from "sweetalert2";



const Img = styled.img`
  width: 70px;
  height: auto;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 12px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1400px;
  margin-right: 80px;
  margin-left: 100px;
  max-height: 550px; // 4개 항목의 높이에 맞춤
  overflow-y: auto; // 항목이 4개를 초과하면 스크롤 생성
`;

const FinalPaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin : 50px 100px;
  width: 520px;
  font-size: 16px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: #ffffff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const StyledTableRow = styled(TableRow)`
  height: 110px; // 원하는 행의 높이로 설정
`;

export default function CartBody() {
  const [rows, setRows] = useState([]); // 상품 데이터 상태를 빈 배열로 초기화
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 상품 이름들을 저장하는 상태
  const [agree, setAgree] = useState(false); // 결제 동의 체크박스 상태
  const navigate = useNavigate(); // useHistory 훅 사용
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TokenAxios.get("/api/cart/user");
        console.log(response.data);
  
        const result = response.data;
        if (result && result.result && result.result.data && Array.isArray(result.result.data.content)) {
          const cartData = result.result.data.content;
          console.log(cartData);
          
          const mappedData = cartData.map((item) => ({
            productSeq : item.productSeq,
            orderCartSeq : item.orderCartSeq,
            prdtOptionSeq : item.prdtOptionSeq,
            name: item.productName,
            option: item.prdtOptionDetail,
            price: item.price, // Assuming the price is directly available in the response
            amount: item.amount,
            totalPrice: item.amount * item.price, // Adjust calculation based on available data
            imageUrl: item.imageUrl,
          }));

          console.log(mappedData);
          setRows(mappedData);
          setSelectedRows(mappedData.map((item) => item.orderCartSeq));
        } else {
          console.error("잘못된 데이터 형식:", result);
        }
      } catch (error) {
        console.error("장바구니 데이터 가져오기 실패:", error);
      }
    };
  
    fetchData();
  }, []);

  const handlePaymentClick = () => {
    if (agree) {
      // 동의한 경우에만 페이지 이동
      console.log(rows);
      
      const selectedRowsData = rows
        
        .filter((row) => selectedRows.includes(row.orderCartSeq))
        .map((row) => ({          
          productSeq: row.productSeq,
          productOptionSeq: row.prdtOptionSeq,
          productAmount: row.amount,
        }));

      navigate("/payment", { state: { orderList: selectedRowsData } });
    }
  };

  const handleCheckboxChange = (name) => {
    setSelectedRows((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const handleQuantityChange = (row, value) => {
    const updatedRows = rows.map((r) => {
      if (r.orderCartSeq === row.orderCartSeq) {
        const newAmount = r.amount + value; // 수량 변경
        return { ...r, amount: newAmount, totalPrice: newAmount * r.price }; // 새로운 수량과 총액 업데이트
      }
      return r;
    });
    setRows(updatedRows);
  };

  const handleDeleteSelected = async() => {
    
    const selectedCartSeqList = rows
    .filter((row) => selectedRows.includes(row.orderCartSeq))
    .map((row) => row.orderCartSeq);

  // rows 상태에서 선택된 상품들을 제거
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.orderCartSeq));
    setRows(updatedRows);

    // 선택된 상품을 삭제하는 API 호출
    try {
      await DefaultAxios.delete("/api/cart", {
        data: { orderCartSeqList: selectedCartSeqList },
      });
      console.log("선택된 상품 삭제 성공");
    } catch (error) {
      console.error("선택된 상품 삭제 실패:", error);
    }
    Swal.fire({
      icon: 'success', // 성공 아이콘 (success, error, warning, info 중 선택)
      title: '장바구니에서 삭제하였습니다',
      showConfirmButton: false, // 확인 버튼 감추기
      timer: 1500 // 1.5초 후에 모달이 자동으로 사라짐
    });
  };

  // 최종 결제 금액 계산을 위해 rows 상태 사용
  const totalAmount = rows
    .filter((row) => selectedRows.includes(row.orderCartSeq))
    .reduce((acc, row) => acc + row.totalPrice, 0); // `totalPrice`를 사용하여 총 금액 합산

  return (
    <Paper elevation={0} style={{ display: "flex" }}>
      <TableContainer>
        <Button
          onClick={handleDeleteSelected}
          style={{
            alignSelf: "flex-end",
            border: "1px solid",
            width: "60px",
            height: "30px",
            margin: "20px",
            color: "black",
          }}
        >
          삭제
        </Button>
        <Table
          sx={{
            height: "644px",
            maxWidth: "1243px",
            border: "1px solid",
            borderColor: "#CCCCCC",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>선택</TableCell>
              <TableCell>상품명(옵션)</TableCell>
              <TableCell>판매가</TableCell>
              <TableCell>상품수량</TableCell>
              <TableCell>주문금액</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                (
                <StyledTableRow key={row.orderCartSeq}>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={selectedRows.includes(row.orderCartSeq)}
                      onChange={() => handleCheckboxChange(row.orderCartSeq)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ProductInfo>
                      <Img src={row.imageUrl} />
                      <TextContainer>
                        <div>{row.name}</div>
                        {row.option !== "default" && (
                          <div style={{ marginTop: "4px" }}>{row.option}</div>
                        )}
                      </TextContainer>
                    </ProductInfo>
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <QuantityControl>
                      <QuantityButton
                        onClick={() => handleQuantityChange(row, -1)}
                        disabled={row.amount === 1}
                      >
                        -
                      </QuantityButton>
                      {row.amount}
                      <QuantityButton
                        onClick={() => handleQuantityChange(row, 1)}
                      >
                        +
                      </QuantityButton>
                    </QuantityControl>
                  </TableCell>
                  <TableCell>{row.totalPrice}</TableCell>
                </StyledTableRow>
              )
            ))}
            {rows.length < 4 &&
              [...Array(4 - rows.length)].map((_, index) => (
                <TableRow key={`empty-${index}`}>
                  <TableCell
                    component="th"
                    scope="row"
                    colSpan={5}
                    style={{ borderBottom: "none" }}
                  >
                    {/* colSpan은 테이블 컬럼 수에 따라 조정 */}
                    {/* 빈 셀 내용 */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FinalPaymentContainer>
        <Divider />
        <div style={{ fontSize: "30px", marginTop : "20px"}}>최종 결제 금액: {totalAmount}원</div>
        <div style={{ fontSize: "25px",marginTop : "20px" }}>상품금액: {totalAmount}원</div>
        <div style={{ fontSize: "25px",marginTop : "20px" }}>배송비: 0원</div>
        <FormControlLabel
          style={{marginTop:"20px"}}
          control={
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
          }
          label="최종 결제에 동의 합니다."
          labelPlacement="end"
        />
        <Button
          disabled={!agree}
          style={{
            backgroundColor: agree ? "#000000" : "#eeeeee",
            width: "210px",
            height: "60px",
            fontSize: "25px",
            color: agree ? "white" : "black",
            marginTop : "20px"
          }}
          onClick={handlePaymentClick}
        >
          결제하기
        </Button>
      </FinalPaymentContainer>
    </Paper>
  );
}
