import { useEffect, useState } from "react";
import { Table as RBTable, Modal, Button } from "react-bootstrap";
import axios from "axios";
import Moment from "react-moment";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [selItem, setSelItem] = useState(null)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const loadData = () => {
    const url =
      "https://api.stackexchange.com/2.2/search/advanced?page=" +
      page +
      "&pagesize=20&order=desc&sort=activity&site=stackoverflow";
    axios.get(url).then((res) => {
      console.log("received response ->", res);
      setQuestions(res.data);
    });
  };

  useEffect(() => {
    console.log("use effect ");
    loadData();
  }, []);

  const showItem = (item) => {
    console.log("selected item ", item.title);
    setSelItem(item)
    setShow(true);
  };

  return (
    <div>
      <RBTable striped bordered hover>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {questions.items ? (
            questions.items.map((item) => {
              return (
                <tr
                  onClick={() => showItem(item)}
                  style={{ cursor: "pointer" }}
                  key={item.question_id}
                >
                  <td>{item.owner.display_name}</td>
                  <td>{item.title}</td>
                  <td>
                    <Moment date={item.creation_date * 1000}></Moment>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </RBTable>
      {show ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selItem.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body><a href={selItem.link} target="_blank">Open in new tab</a></Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
