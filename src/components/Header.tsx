import emotionStyled from "@emotion/styled";
import { DarkModeOutlined, DarkMode } from "@mui/icons-material";
import { Button, Container, TextField, styled } from "@mui/material";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setThemeMode } from "../redux/appReducer";

const HeaderContainer = styled(Container)`
  padding-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BrandContainer = emotionStyled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
`

const SearchField = styled(TextField)`
  font-size: 16px;
  border-radius: 5px;
  width: 20rem;
  &:focus {
    outline: none;
  }
`

export default function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.app.themeMode)
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);

  function handleThemeClick() {
    dispatch(setThemeMode(isDarkMode ? 'light' : 'dark'))
  }

  return (
    <HeaderContainer>
      <BrandContainer>
        <h1>Brand Name</h1>
        <div>
          <SearchField placeholder="Search menu" variant="standard" />
        </div>
      </BrandContainer>
      <Button
        sx={{ color: 'text.primary' }}
        onClick={handleThemeClick}
      >
        {isDarkMode ? (
          <DarkMode />
        ) : (
          <DarkModeOutlined />
        )}
      </Button>
    </HeaderContainer>
  );
}
