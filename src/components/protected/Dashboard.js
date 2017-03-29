import React, { Component } from 'react'
import {savePost,getPosts } from '../../helpers/auth'
import {Doughnut} from 'react-chartjs-2';
import { Button , Modal, Table } from 'react-bootstrap';

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

function abc() { 
  var a =getPosts();
  // for(var i=0 ; i< a.length ; i++ )
    console.log("number of element "  + a);  
}

export default class Dashboard extends Component {
 constructor(props) {
      super(props);    
      this.state = {
        title: "",
        category :"",
        content : "",
        showModal: false,
        showModalPost : false,
       registerError: null
      }
      this.updateTitleState = this.updateTitleState.bind(this);
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.closePost = this.closePost.bind(this);
      this.openPost = this.openPost.bind(this);
      this.updateCategoryState = this.updateCategoryState.bind(this);
       this.updateContentState = this.updateContentState.bind(this);
   }
  
   /*modal popups */
      close() {
        this.setState({ showModal: false });
      }

      open() {
        this.setState({ showModal: true });
      }

       closePost() {
        this.setState({ showModalPost: false });
      }

      openPost() {
        this.setState({ showModalPost: true });
      }

    updateTitleState(e) {
      this.setState({title: e.target.value});
   }

    updateCategoryState(e) {
      this.setState({category: e.target.value});
   }

   updateContentState(e) {
      this.setState({content: e.target.value});
   }

  componentDidMount () {
    abc();
  }

  handleSubmit = (e) => {
   e.preventDefault()
    savePost(this.state.title, this.state.category , this.state.content)
      .catch(e => this.setState(setErrorMsg(e)))
      // close();
    }

  render () {
    return (
      <div>
      <div>
        <div className="col-sm-12">
       <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Create post
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
         <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input className="form-control" value={this.state.title} 
               onChange={this.updateTitleState} ref="title" placeholder="Title"/>
          </div>
          <div className="form-group">
            <label>Category</label>
            <input className="form-control" value={this.state.category} 
               onChange={this.updateCategoryState} ref="category" placeholder="Category"/>
          </div>
          <div className="form-group">
            <label>Content</label>
            <textArea type="text" className="form-control"value={this.state.content} 
               onChange={this.updateContentState} rows="6" placeholder="Content" ref="content" />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
           <div className="modal-footer">
            <button type="submit" className="btn btn-primary postBtn" >Post</button>
            </div>
         </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
      </div>
     <div className="col-sm-8">
     <h1>Posts</h1>
      <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Content</th>
      </tr>
    </thead>
    <tbody id="postid">
     </tbody>
  </Table>     
        <Modal id="modalPostsID" show={this.state.showModalPost} onHide={this.closePost}>
          <Modal.Header closeButton>
            <Modal.Title>Recent Posts</Modal.Title>
          </Modal.Header>
          <Modal.Body id="showPosts">         
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePost}>Close</Button>
          </Modal.Footer>
        </Modal>
       </div>
       <div id="bloggraph" className="col-sm-4">
          <h1>Graph</h1>
          <Doughnut data={data} />
       </div>         
       
      </div>
    )
  }
}

Dashboard.propTypes = {
  title: React.PropTypes.string.isRequired ,
  category: React.PropTypes.string.isRequired,
  content : React.PropTypes.string.isRequired  
};

Dashboard.defaultProps = {
    title: "",
    category :"",
    content : "" 
}