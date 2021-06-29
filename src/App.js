import React from "react";
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  Slide,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  let [state, setState] = React.useState({
    field1: 0,
    field2: 0,
    field3: 0,
    opration: "+",
    checkbox: [true, true, true],
    total: 0,
    open: false,
    Transition: Slide,
  });

  const handleChangeOpration = (value) => {
    state.opration = value;
    const newValues = { ...state };
    setState(newValues);
  };

  function handleClose() {
    setState({
      ...state,
      open: false,
    });
  }

  const handleChange = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  };

  const handleChangeCheckbox = (event) => {
    const { checkbox } = state;
    checkbox[event.target.name] = event.target.checked;
    setState({ ...state, checkbox });
  };

  const count = () => {
    let { field1, field2, field3, opration, checkbox } = state;
    switch (opration) {
      case "-":
        state.total =
          parseInt(checkbox[0] ? field1 : 0) -
          parseInt(checkbox[1] ? field2 : 0) -
          parseInt(checkbox[2] ? field3 : 0);
        break;
      case "/":
        state.total =
          (checkbox[0] ? parseInt(field1) : 1) /
          (checkbox[1] ? parseInt(field2) : 1) /
          (checkbox[2] ? parseInt(field3) : 1);
        break;
      case "x":
        state.total =
          (checkbox[0] ? parseInt(field1) : 1) *
          (checkbox[1] ? parseInt(field2) : 1) *
          (checkbox[2] ? parseInt(field3) : 1);
        break;
      default:
        state.total =
          (checkbox[0] ? parseInt(field1) : 0) +
          (checkbox[1] ? parseInt(field2) : 0) +
          (checkbox[2] ? parseInt(field3) : 0);
    }
    const newValues = { ...state };
    setState(newValues);
  };

  React.useEffect(() => {
    count();
    if (state.checkbox.filter((old) => old !== true).length >= 2) {
      state.open = true;
      state.total = 0;
      const newValues = { ...state };
      setState(newValues);
    }
  }, [
    state.field1,
    state.field2,
    state.field3,
    state.opration,
    state.checkbox[0],
    state.checkbox[1],
    state.checkbox[2],
  ]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} xs={6}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            name="field1"
            type="number"
            value={state.field1}
            disabled={!state.checkbox[0]}
            onChange={handleChange}
            variant="outlined"
          />
          <Checkbox
            checked={state.checkbox[0]}
            onChange={handleChangeCheckbox}
            name="0"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            name="field2"
            type="number"
            value={state.field2}
            disabled={!state.checkbox[1]}
            onChange={handleChange}
            variant="outlined"
          />
          <Checkbox
            checked={state.checkbox[1]}
            onChange={handleChangeCheckbox}
            name="1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            name="field3"
            type="number"
            value={state.field3}
            disabled={!state.checkbox[2]}
            onChange={handleChange}
            variant="outlined"
          />
          <Checkbox
            checked={state.checkbox[2]}
            onChange={handleChangeCheckbox}
            name="2"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleChangeOpration("+")}
            disabled={state.opration === "+"}
          >
            +
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleChangeOpration("-")}
            disabled={state.opration === "-"}
          >
            -
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleChangeOpration("/")}
            disabled={state.opration === "/"}
          >
            /
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleChangeOpration("x")}
            disabled={state.opration === "x"}
          >
            x
          </Button>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message={"Field Must Active Two of Three"}
          autoHideDuration={3000}
        />
        <Grid item xs={12}>
          <span>=======================</span>
          <br />
          <span>Hasil : {state.total}</span>
          <br />
          <span>=======================</span>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
