import React, { Component } from 'react';
import axios from 'axios'
import { Document, Page } from 'react-pdf';

import '../css/records.css';
 
export default class Record extends Component {
    constructor(props) {
    super(props)
  this.state = {
    pdf: null,
    numPages: null,
    pageNumber: 1,
  }
  this.onClickNextPage = this.onClickNextPage.bind(this);
  this.onClickPreviousPage = this.onClickPreviousPage.bind(this);
}


  componentDidMount() {
      console.log(this.props.match.params.id)
    axios.get(`http://localhost:8080/api/record/${this.props.match.params.id}`)
    .then((response) => {
          console.log(response.data)
        this.setState({pdf: `http://localhost:8080/${response.data[0].filepath}`})
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  onClickNextPage(event) {
    event.preventDefault()
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }))
}

  onClickPreviousPage(event) {
    event.preventDefault()
    this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }))
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
    // const pages = for (let i = 1; i > numPages; i++) {
    //     return (
    //         <Page pageNumber ={i} />
    //     )
    // }

    return (
        <div className="container">
        <div className="pdf">
        <Document
          file={this.state.pdf}
          onLoadSuccess={this.onDocumentLoad}>
          <Page pageNumber={pageNumber} />
        </Document>
        </div>
        <div className="information">
        <button onClick={this.onClickPreviousPage}  className="btn btn-success">Previous Page</button>
        <p className="pages">Page {pageNumber} of {numPages}</p>
        <button onClick={this.onClickNextPage}  className="btn btn-success">Next Page</button>
        </div>
    //   </div>
    )
  }
}