import * as React from "react";
import MuiTable from "@mui/material/Table";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableContainer from "@mui/material/TableContainer";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function Table({ className = "", sx, children, ...props }: any) {
  return (
    <MuiTableContainer component={Paper} sx={{ bgcolor: "var(--card-secondary)", border: "0.625px solid var(--border)", borderRadius: "10px", overflow: "hidden", ...sx }}>
      <MuiTable sx={{ minWidth: 650 }} className={className} {...props}>
        {children}
      </MuiTable>
    </MuiTableContainer>
  );
}

export function TableHeader({ className = "", children, ...props }: any) {
  return (
    <MuiTableHead className={className} {...props}>
      {children}
    </MuiTableHead>
  );
}

export function TableBody({ className = "", children, ...props }: any) {
  return (
    <MuiTableBody className={className} {...props}>
      {children}
    </MuiTableBody>
  );
}

export function TableRow({ className = "", sx, children, ...props }: any) {
  return (
    <MuiTableRow
      className={className}
      sx={{
        borderBottom: "0.625px solid var(--border)",
        transition: "background-color 0.15s ease",
        "&:hover": {
          bgcolor: "var(--table-header-bg) !important",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTableRow>
  );
}

export function TableHead({ className = "", sx, children, ...props }: any) {
  return (
    <MuiTableCell
      variant="head"
      className={className}
      sx={{
        color: "var(--text-secondary)",
        padding: "10px 8px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "20px",
        letterSpacing: "-0.150391px",
        borderBottom: "0.625px solid var(--border)",
        whiteSpace: "nowrap",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTableCell>
  );
}

export function TableCell({ className = "", sx, children, ...props }: any) {
  return (
    <MuiTableCell
      className={className}
      sx={{
        padding: "16px 8px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
        color: "var(--text-primary)",
        borderBottom: "0.625px solid var(--border)",
        whiteSpace: "nowrap",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTableCell>
  );
}
