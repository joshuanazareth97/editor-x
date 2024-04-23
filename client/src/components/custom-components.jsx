import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeaderTypography = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.light};
`;

export const InfoTypography = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(0)};
  display: flex;
  font-weight: 600;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.extralight};
`;

export const EmphasizedButton = styled(Button)`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.white};
  text-transform: small-caps;
`;
