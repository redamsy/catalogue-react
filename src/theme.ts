import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();

export default createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "none",
          color: "rgb(40, 42, 43)",
          fontSize: "0.9rem",
          transition: defaultTheme.transitions.create(
            ["background-color", "box-shadow", "border", "color"],
            {
              duration: defaultTheme.transitions.duration.short,
            }
          ),
        },
        text: {
          padding: "6px 14px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        outlinedPrimary: {
          border: "2px solid #027AC5",
          "&:hover": {
            border: "2px solid rgb(1, 85, 137)",
          },
        },
        startIcon: {
          marginRight: "6px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          color: "rgb(40, 42, 43)",
          fontSize: "0.9rem",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },
    // MuiSelect: {
    //   styleOverrides: {
    //     root: {
    //       padding: "0.85em",
    //     },
    //   },
    // },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "rgb(40, 42, 43)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgb(40, 42, 43)",
          fontSize: "1.1rem",
          marginBottom: "0.2em",
          fontWeight: 500,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgb(136, 140, 142)",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    primary: {
      main: "#027AC5",
    },
  },
});
