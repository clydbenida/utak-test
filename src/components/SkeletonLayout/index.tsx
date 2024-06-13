import { Box, Container, Grid, Skeleton, Stack } from "@mui/material";

export default function SkeletonLayout() {
  return (
    <Container sx={{ top: -20, position: "relative" }}>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        {Array(5).fill(undefined).map((_, idx) => (
          <Grid item md={3} key={idx}>
            <Skeleton height={65} width={79} />
          </Grid>
        ))}
      </Box>
      <Stack gap={2}>
        {Array(3).fill(undefined).map((_, idx) => (
          <Box sx={{ marginY: "1rem" }} key={idx}>
            <Skeleton height={30} width={100} variant="rounded" sx={{ marginBottom: "1rem" }} />
            <Grid gap={6} container>
              {Array(6).fill(undefined).map((_, idx) => (
                <Grid item md={3} key={idx}>
                  <Skeleton height={100} width={290} sx={{ borderRadius: "14px" }} variant="rounded" />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
