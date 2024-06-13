import { CloseRounded } from "@mui/icons-material";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAppDispatch } from "../../../../../redux/hooks";
import { removeOptionItem } from "../../../../../redux/menu/menuReducer";
import { useMemo } from "react";
import { MenuValue } from "../../../../../types/types";

interface MenuOptionProps {
  values?: MenuValue[];
  optionName: string;
}

interface MenuOptionRowProps {
  value: MenuValue;
  optionName: string;
}

function MenuOptionRow({ value, optionName }: MenuOptionRowProps) {
  const dispatch = useAppDispatch();
  return (
    <TableRow>
      <TableCell sx={tableCellStyle}>
        {value.name}
      </TableCell>
      <TableCell sx={tableCellStyle}>+{value.addedPrice}</TableCell>
      <TableCell sx={tableCellStyle}>+{value.addedCost}</TableCell>
      <TableCell sx={tableCellStyle}>
        <Button sx={{ minWidth: 'unset' }} size="small" onClick={() => dispatch(removeOptionItem({ targetName: optionName, targetValue: value }))}>
          <CloseRounded sx={{ marginRight: '3px' }} color="secondary" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default function MenuOptionTable({ values, optionName }: MenuOptionProps) {
  const renderValues = useMemo(() => (values && values.map((value, key) => (
    <MenuOptionRow
      key={key}
      value={value}
      optionName={optionName} />
  ))), [values]);

  return (
    <TableContainer sx={{ border: "1px solid #6e6e6e5f", borderRadius: "8px" }}>
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell sx={tableHeadingStyle}>{optionName} Name</TableCell>
            <TableCell sx={tableHeadingStyle}>Addtl. price</TableCell>
            <TableCell sx={tableHeadingStyle}>Addtl. cost</TableCell>
            <TableCell sx={tableHeadingStyle}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderValues}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const tableHeadingStyle = {
  fontWeight: "bold",
  color: "#6e6e6e",
  borderBottom: "1px solid #6e6e6e5f"
} as const

const tableCellStyle = {
  color: "#333333",
  borderBottom: "none",
} as const
