import emotionStyled from "@emotion/styled";
import { Container, TextField, styled } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { onQueryChange } from "../redux/app/appReducer";

export default function Header() {
  const keyword = useAppSelector(state => state.app.search.query)
  const dispatch = useAppDispatch();

  return (
    <HeaderContainer>
      <BrandContainer>
        <h1>Brand Name</h1>
        <div>
          <SearchField
            placeholder="Search menu by name"
            variant="standard"
            value={keyword ?? ""}
            onChange={e => dispatch(onQueryChange(e.target.value))}
          />
        </div>
      </BrandContainer>
    </HeaderContainer>
  );
}

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

