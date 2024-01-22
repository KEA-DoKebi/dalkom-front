import React from "react";
import styled from "styled-components";
import benefit from "assets/images/benefit.png"
import pay from "assets/images/pay.png";
import delivery from "assets/images/delivery.png";
import cancel from "assets/images/cancel.png";

const Body = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const ImgWithTextDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const ImgWithText = styled.div`
  display: flex;
  width: 200px;
  padding-bottom: 25px;
  padding-top: 25px;
  height:auto;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  
`;

const Img = styled.img`
    width: auto;
    height: 50%;
    object-position: bottom;
  
`;
const TextXL = styled.h1`
  font-size: 30px;
  margin-top: 7%;
  margin-bottom: -2%;
`;

const TextL = styled.h1`
  font-size: 20px;
 
  margin-bottom: -2%;
`;

const TextL2 = styled.h1`
  font-size: 20px;
  margin-bottom: 0%;
  margin-top: 3%;
`;

const TextS = styled.h1`
  font-size: 15px;
  margin-bottom: -5%;
`;

const TextS2 = styled.h1`
  font-size: 15px;
  white-space: pre-line;
`;

const Container = styled.div`
display: flex;
align-items: left;
flex-direction: column;
`;

const HorizontalLine = styled.hr`
  border: 1px solid #000; 
  width: 100%; 
  margin-top: 3%; 
  margin-bottom: -2%;
  text-align: left;
`;

export const ManualBody = ({ active, onButtonClick }) => {
    return (
        <Body>
            <ImgWithTextDiv>
                <ImgWithText>
                    <Img src={benefit} />
                    <TextL>회원 정보 혜택</TextL>
                    <TextS>1. 회원가입 안내</TextS>
                    <TextS>2. 적립금 제도</TextS>
                </ImgWithText>
                <ImgWithText>
                    <Img src={pay} />
                    <TextL>주문 결제</TextL>
                    <TextS>1. 상품 주문 방법</TextS>
                    <TextS>2. 결제 방법</TextS>
                </ImgWithText>
                <ImgWithText>
                    <Img src={delivery} />
                    <TextL>배송</TextL>
                    <TextS>1. 배송기간 및 방법</TextS>
                    <TextS>2. 주문확인 및 배송조회 </TextS>
                </ImgWithText>
                <ImgWithText>
                    <Img src={cancel} />
                    <TextL>취소 교환 반품품</TextL>
                    <TextS>1. 주문취소</TextS>
                    <TextS>2. 교환 반품</TextS>
                </ImgWithText>
            </ImgWithTextDiv>
            <Container>
                <TextXL>회원 정보 혜택</TextXL>
                <HorizontalLine/>
                <TextL2>1. 회원가입 안내</TextL2>
                <TextS2> 
                     - DalKom.Shop 기본적으로 회원제로 운영하고 있습니다.{"\n"}
                     - 회원가입비나 월회비, 연회비 등 어떠한 비용도 청구하지 않는 100% 무료입니다.
                </TextS2>
                <TextL2>2. 적립금 제도</TextL2>
                <TextS2> 
                    - 모든 회원분들께 매년 120만 마일리지가 지급됩니다. (신입 제외){"\n"}
                    - 마일리지가 부족할 시, 관리자에게 요청해 충전할 수 있습니다.
                </TextS2>

                <TextXL>주문 결제</TextXL>
                <HorizontalLine/>
                <TextL2>1. 상품 주문 방법</TextL2>
                <TextS2>
                    1) 상품 검색{"\n"}
                    2) 장바구니 담기{"\n"}
                    3) 주문서 작성{"\n"}
                    4) 결제{"\n"}
                    5) 주문 성공화면{"\n"}
                    6) 주문번호
                </TextS2>
                <TextL2>2. 결제방법</TextL2>
                <TextS2>- DalKom.Shop은 마일리지를 통한 결제방법을 제공하고 있습니다.</TextS2>

                <TextXL>배송</TextXL>
                <HorizontalLine/>
                <TextL2>1. 배송기간 및 방법</TextL2>
                <TextS2>
                - DalKom.Shop은 CJ대한통운 택배를 이용하고 있으며, 배송 관련 사항들은 택배사 원칙에 따라 운영되고 있습니다.{"\n"}
                - 고객님꼐서 마일리지를 충전하여 구매하신 경우에는 입금확인이 된 날로부터 2~3일 이내에(최장 7일이내) 입력하신 {"\n"}배송지로 부터 주문상품이 도착하게 됩니다. 주문하신 상품 또는 배송지에 따라 배송기간이 상이할 수 있씁니다.
                </TextS2>
                <TextL2>2. 주문확인 및 배송조회</TextL2>
                <TextS2>- DalKom.Shop 공식 홈페이지에서 주문시 메인페이지 -&gt; 주문배송을 통해 주문확인 및 배송조회가 가능합니다.</TextS2>
           
                <TextXL>취소 교환 반품</TextXL>
                <HorizontalLine/>
                <TextL2>1. 주문 취소</TextL2>
                <TextS2>
                - 주문취소는 미결제인 상태에서는 직접 취소가 가능합니다.{"\n"}
                - 결제 후 주문취소는 DalKom.Shop 고객센터 또는 1:1 문의 게시판으로 요청 바랍니다.
                </TextS2>
                <TextL2>2. 교환 / 반품</TextL2>
                <TextS2>
                - 교환/반품 요청 기한은 상품 수령 후 최대 14일 이내이며 미개봉 상품에 한하여 가능합니다.(상품에 하자가 있는 경우 수령 후 7일).{"\n"}
                - 변심으로 인한 교환/반품일 경우 왕복 택배비는 고객 부담이며, 반드시 저희 고객센터를 통해 접수 후 상담팀에 안내에 따라 반품을 진행할 수 있습니다 
                </TextS2>

            </Container>
        </Body>
    );
};
