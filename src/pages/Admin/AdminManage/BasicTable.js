import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({ productData }) {
    console.log(productData)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">순위</TableCell>
                        <TableCell align="center">상품명</TableCell>
                        <TableCell align="center">제조사</TableCell>
                        <TableCell align="center">가격</TableCell>
                        <TableCell align="center">판매수량</TableCell>
                        <TableCell align="center">누적 판매금액</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productData.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{product.name}</TableCell>
                            <TableCell align="center">{product.company}</TableCell>
                            <TableCell align="center">{Number(product.price).toLocaleString()}</TableCell>
                            <TableCell align="center">{product.amount}</TableCell>
                            <TableCell align="center">{Number(product.totalPrice).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}