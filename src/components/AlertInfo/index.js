import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef } from "react";
import "./styles.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function AlertInfo({ open, mensagemOculta, accept }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
      >
        {accept ? (
          <Alert severity="success">{mensagemOculta}</Alert>
        ) : (
          <Alert severity="error">{mensagemOculta}</Alert>
        )}
      </Snackbar>
    </div>
  );
}
