import { useContext, useEffect, useMemo, useState } from "react";
import { Reorder } from "framer-motion";
import Modal from "./Modal";
import { useTheme } from "../../util/ThemeContext";
import axios from "axios";

function MainNavigation() {
  const [edit, setEdit] = useState(false);
  const [x, setX] = useState({});
  const theme = useTheme();
  console.log("theme=>", theme.theme.nav);

  const [items, setItems] = useState([]);

  const handleAddItem = (text, link, index) => {
    if (index) {
      setItems(items.map((item) => (item.index === index ? { ...item, text, link } : item)));
    } else {
      const newIndex = items.length ? items[items.length - 1].index + 1 : 1;
      setItems([...items, { index: newIndex, text, link }]);
    }
    setX({});
  };

  const modal = useMemo(() => {
    return <Modal itemEdit={x} handleAddItem={handleAddItem} setX={setX} />;
  }, [x]);

  useEffect(() => {
    console.log("x#####:", x);
  }, [x]);
  useEffect(() => {
    if (theme.theme.nav) setItems(theme.theme.nav);
  }, [theme.theme.nav]);

  const handleReorder = async (newItems) => {
    setItems(newItems);
    theme.setTheme((prevTheme) => ({
      ...prevTheme,
      nav: newItems,
    }));
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/theme/update/${theme.theme._id}`, { nav: newItems });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary position-relative"
        onMouseEnter={() => setEdit(true)}
        onMouseLeave={() => setEdit(false)}
      >
        <div className="container-fluid position-relative">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <Reorder.Group axis="x" values={items} onReorder={handleReorder} className="navbar-nav">
              {items.map((item) => (
                <Reorder.Item key={item.index} value={item} className="nav-item">
                  <span
                    className="nav-link btn"
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      setX({ text: item.text, link: item.link, index: item.index });
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    {item.text}
                  </span>
                </Reorder.Item>
              ))}
              {edit && (
                <li className="nav-item">
                  <a className="nav-link btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setX({})}>
                    + Add item
                  </a>
                </li>
              )}
            </Reorder.Group>
          </div>
        </div>
        {modal}
      </nav>
    </div>
  );
}

export default MainNavigation;
