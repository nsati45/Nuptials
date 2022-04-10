import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem, InputLabel } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const theme = createTheme();

export default function SignUp() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [userrole, setRole] = useState("Student");
 
  let navigate = useNavigate();

  async function handleSubmit(event) {
    // console.log("Handling Submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(data);

    // console.log(data.get("firstName").toString());

    // setName(data.get("firstName").toString() + data.get("lastName").toString());
    // // setEmail(data.get("email").toString());
    // setPassword(data.get("password").toString());
    // setPhoneNo(data.get("phoneno").toString());

    const user = JSON.stringify({
      name: firstName + " " + lastName,
      email: email,
      password: password,
      phoneno: phoneno,
      role: userrole,
    
    });

    // console.log(name + "\n" + email + "\n" + password + "\n" + phoneno + "\n" + userrole + "\n");
    console.log(user);

    const res = await axios.post("http://localhost:8000/api/register", user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === "ok") {
      navigate("/SignIn");
    } else if (res.data.status === "error") {
      alert("Duplicate Email");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneno"
                  label="Phone No."
                  type="phoneno"
                  id="phoneno"
                  autoComplete="+91"
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="user-role">User Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={userrole}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Supplier">Supplier</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>

                </Select>
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>
  );
}
