import { Stack, Chip } from "@mui/material";

// 대기 / 완료 Chip 입니당
export const MuiColorChip = ({ status }) => {
  const getColor = (status) => {
    switch (status) {
      case "waiting":
        return "warning";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Chip label={status} color={getColor(status)} variant="outlined" />
    </Stack>
  );
};

// 사용 예시
// const waitingStatus = 'waiting';
// const completedStatus = 'completed';
// <MuiColorChip status={waitingStatus} />
