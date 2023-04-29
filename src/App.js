import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Popup from 'reactjs-popup';
import "./index.css";
import { styled } from "@mui/material";



const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  const onInputChange = e => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    fetchBooks();
    setSearchTerm("harry");
  }, []);

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const fetchBooks = async () => {
    const result = await axios.get(`${API_URL}?q=${searchTerm}`);
    setBooks(result.data);
  };

  

  const onSubmitHandler = e => {
    e.preventDefault();
    fetchBooks();
  };

  window.addEventListener("beforeunload", (event) => {
    fetchBooks();
    console.log("API call before page reload");
  });
  window.addEventListener("unload", (event) => {
    fetchBooks();
    console.log("API call after page reload");
  });
  
  const view =view=>{
    console.log("dikh jaaaegi");
  }

  const bookAuthors = authors => {
    if (authors.length <= 2) {
      authors = authors.join(" and ");
    } else if (authors.length > 2) {
      let lastAuthor = " and " + authors.slice(-1);
      authors.pop();
      authors = authors.join(", ");
      authors += lastAuthor;
    }
    return authors;
  };

  return (
    

      // {/* <button onClick={}>Grid</button>
      // <button onClick={}>List</button> */}
      <section style={{backgroundColor: '#dbe7e4'}}>
        <form onSubmit={onSubmitHandler}>
          <label style={{marginLeft:'40%'}}>
            
            <span style={{textTransform: 'uppercase', fontSize: 'x-large', fontFamily: 'bold  '}}>Search for books</span>
            <br/>
            <br/>
            <input style={{marginLeft:'30%', width: '35%', height: '35%'}}
              type="search"
              placeholder="microservice, restful design, etc.,"
              value={searchTerm}
              onChange={onInputChange}
            />
            <button  type="submit" style={{ marginLeft: '3%'}}>Search</button>
          
          </label>
        </form>
        <Card style={{ width: '18rem' }}>
          <ul style={{display: 'block',marginLeft: '175%',marginRight: '10%',width: '90%'}}>
            {books.items.map((book, index) => {
              return (
                <li key={index}>
                  
                  <div>
                  <Popup show={true} popupClass={"popup-content"} trigger={<img alt={`${book.volumeInfo.title} book`}
                    src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/> } style={{marginRight: '90%'}} modal nested>
                      {
                      close => (
                        <div style={{backgroundColor:'#1c6994', width:'190%', marginRight: '30%'}}>
                          <img style={{ marginLeft: '20%'}} alt={`${book.volumeInfo.title} book`}
                                src={`http://books.google.com/books/content?id=${
                                  book.id
                                }&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                              />

                              <div style={{ marginLeft: '30%', }}>
                                <h3>{book.volumeInfo.title}</h3>
                                <p>{bookAuthors(book.volumeInfo.authors)}</p>
                                <p>{book.volumeInfo.publishedDate}</p>
                              </div>

                              <div style={{ marginLeft: '30%'}}>
                                  <button onClick=
                                      {() => close()}>
                                          Close modal
                                  </button>
                              </div>
                        </div>
                      )
                    }
                    </Popup>
                    
                    <div>
                      <h3>{book.volumeInfo.title}</h3>
                      <p>{bookAuthors(book.volumeInfo.authors)}</p>
                      <p>{book.volumeInfo.publishedDate}</p>
                    </div>
                  </div>
                  <hr />
                </li>
              );
            })}
          </ul>
        </Card>

      </section>
  );
};

const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default App;
