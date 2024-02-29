import { Link, redirect } from "react-router-dom";
import { Avatar, Dropdown, Navbar as Nav } from "flowbite-react";
import { logout } from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };
  const { isAuthenticate, user } = state;
  return (
    <Nav fluid rounded className="m-3">
      <Nav.Brand href="/">
        <img
          src="/Nav/faviconblack.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <h1>AIRDC</h1>
        </span>
      </Nav.Brand>
      <div className="flex md:order-1">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Link to="/login">
            <Dropdown.Item>Iniciar Sesión</Dropdown.Item>{" "}
          </Link>
          <Dropdown.Divider />
          <Link to="/signup">
            <Dropdown.Item>Registrarse</Dropdown.Item>{" "}
          </Link>
        </Dropdown>
        <Nav.Toggle />
      </div>
      <Nav.Collapse>
        <Link to="/"> Inicio </Link>
        {user ? (
          <>
            <button onClick={handleClick}>logout</button>
          </>
        ) : (
          <>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/contactanos">Contáctanos</Link>
          </>
        )}
      </Nav.Collapse>
    </Nav>
    // <Nav fluid rounded>
    //   <Nav.Brand as={Link} href="https://flowbite-react.com">
    //     <Link to="/">
    //       <img
    //         src="/vite.svg"
    //         className="mr-3 h-6 sm:h-9"
    //         alt="Flowbite React Logo"
    //       />
    //     </Link>
    //     <Link to="/">
    //       <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
    //         Bienvenido
    //       </span>
    //     </Link>
    //   </Nav.Brand>
    //   <Nav.Toggle />
    //   <Nav.Collapse>
    //     <Link to="/"> Inicio </Link>
    //     {user ? (
    //       <>
    //         <button onClick={handleClick}>logout</button>
    //       </>
    //     ) : (
    //       <>
    //         <Link to="/login">Nosotros</Link>
    //         <Link to="/login">Productos</Link>
    //         <Link to="/login">Contáctanos</Link>
    //       </>
    //     )}
    //   </Nav.Collapse>
    // </Nav>
  );
}
export default Navbar;
