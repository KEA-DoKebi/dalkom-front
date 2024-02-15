import { Alert, Stack } from "@mui/material";

// 알람
export const CustomAlerts = ({ alerts }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {alerts.map((alert, index) => (
        <Alert key={index} severity={alert.severity}>
          {alert.message}
        </Alert>
      ))}
    </Stack>
  );
};

// 알람 예시 입니당
// const customAlerts = [
//   { severity: 'success', message: 'Custom success message.' },
//   { severity: 'info', message: 'Custom info message.' },
//   { severity: 'warning', message: 'Custom warning message.' },
//   { severity: 'error', message: 'Custom error message.' },
// ];
// <CustomAlerts alerts={customAlerts} />
