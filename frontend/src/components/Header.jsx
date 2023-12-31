import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import Logo from "../assets/letter-b.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      navigate("/");
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar
        style={{ backgroundColor: "#262626", color: "white" }}
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={Logo}
                alt="Logo"
                style={{ marginRight: "10px", margin: "0", objectFit: "cover" }}
              />
              <span
                style={{
                  fontStyle: "italic",
                  position: "absolute",
                  marginTop: "23px",
                  color: "#262626",
                  textShadow: "1px 1px 1px white",
                }}
              >
                izbop
              </span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ textAlign: "center" }}
          ></Navbar.Collapse>

          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ textAlign: "center" }}
          >
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/postlist">
                    <NavDropdown.Item>Post</NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to="/admin/categorylist">
                    <NavDropdown.Item>Category</NavDropdown.Item>
                  </LinkContainer> */}
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
