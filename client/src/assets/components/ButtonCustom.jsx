import Button from "@mui/material/Button";

export default function ButtonCustom({ text, color = "primary", onClick, type = "button" }) {
  return (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      type={type}
      fullWidth
      sx={{ mt: 2 }}
    >
      {text}
    </Button>
  );
}