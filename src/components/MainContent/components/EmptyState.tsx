import { NoFood, SearchOff } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";

export default function EmptyState() {
  const query = useAppSelector(state => state.app.search.query);

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'col', textAlign: 'center', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        {query ? (
          <SearchOff sx={{ scale: "2", color: "#6e6e6e" }} fontSize="large" />
        ) : (
          <NoFood sx={{ scale: "2", color: "#6e6e6e" }} fontSize="large" />
        )}
      </Box>
      <h1>No items found</h1>
      <Typography sx={{ width: "18rem", margin: "0 auto" }}>
        {query ? (
          ` No results found for "${query}" `
        ) : ` Click the plus icon below to get started in adding your items `}
      </Typography>
    </Stack>
  );
}


