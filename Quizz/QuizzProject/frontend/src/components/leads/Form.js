import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leads";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    Note: 100,Notification:"",
    videos:["Full Stack React _ Django [1] - Basic REST API.mp4", "Full Stack React _ Django [2] - Implementing React.mp4", "Full Stack React _ Django [3] - Redux _ HTTP.mp4"],
    questions:["What is the Problem in this video ?", "What the code is talking about here? ", "Video talking about what ?"],
    answer:[["Django", "React","Related Django and React","Sqlit 3","Related Django and React"],
    ["Django Code", "React Code","Config Django with React","Config Django Sqlit 3","Django Code"],
    ["Django Architect", "React Architect","Architect Django and React togather","Sqlit 3 Architect","Architect Django and React togather"]]
  };

  
  static propTypes = {
    addLead: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    var name = "Question "+this.state.name;
    var message = this.state.Note.toString();
    //const { isAuthenticated, user } = this.props.auth;
    var email = "User@mail.com";//user.username;
    const lead = { name, email , message };
    this.props.addLead(lead);
    this.setState({
      name: "",
      email: "",
      message: "",
      Note:100,
      Notification:""
    });
  };

 


 componentDidMount(){
  document.getElementById('Video').style.display = "block";
  document.getElementById('FormQuestion').style.display = "none";
   console.log('Added');
   document.getElementById('Video').addEventListener('ended',Handler,false);
   function Handler(e) {
       if(!e) { e = window.event; }
       //alert("Video Finished");
       document.getElementById('Video').style.display = "none";
       document.getElementById('FormQuestion').style.display = "block";
   }
 }

 CheckAnswer = e => {
    console.log('check Answer !!');
    var res = e.target.alt;
    if(res == "true"){
      var Notification = "Your Answer is Correct you have :"+ this.state.Note ;
      this.setState({Notification : Notification});
      for (let index = 0; index < this.state.answer[this.state.name].length-1; index++) {
        const element = this.state.answer[this.state.name][index];
        console.log("element "+element );
        var inlineRadio = 'inlineRadio'+(index+1);
        console.log(inlineRadio);
        document.getElementById(inlineRadio).disabled = true;
      }
    }else{
      var not = this.state.Note - 30;
      var Notification = "Your Answer is Incorrect you have :"+ not ;
      this.setState({Note : not,Notification : Notification});
    }
    
    console.log(this.state.Note);

 }


 ResetNote = e => {
  console.log('rest Note !!');
  console.log(this.state.Note);
  this.setState({Note : 100, name: e.target.value});
  console.log(this.state.Note);
  document.getElementById('Video').src = "/static/"+this.state.videos[e.target.value];
  document.getElementById("que").innerHTML = this.state.questions[e.target.value];
  for (let index = 0; index < this.state.answer[e.target.value].length-1; index++) {
    const element = this.state.answer[e.target.value][index];
    console.log("element "+element );

    var label = 'label'+(index+1);
    console.log(label);
    document.getElementById(label).innerHTML = element;
    var inlineRadio = 'inlineRadio'+(index+1);
    console.log(inlineRadio);
    console.log("correct answer "+this.state.answer[e.target.value][4] );
    document.getElementById(inlineRadio).disabled = false;

    if(element == this.state.answer[e.target.value][4]){
      document.getElementById(inlineRadio).alt = "true";
    }else{
      document.getElementById(inlineRadio).alt = "false";
    }
    
  }
  document.getElementById('Video').style.display = "block";
  document.getElementById('FormQuestion').style.display = "none";

}


  render() {
    const { name, email, message ,Note ,Notification,questions,answer} = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>look the video add answer the question </h2>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong> Warning </strong> You should answer a one question unique.
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={this.onSubmit}>

        <div className="list-group">
          <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target=".bd-example-modal-lg" value="0"  onClick={this.ResetNote}>
            Question 0
          </button>
          <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target=".bd-example-modal-lg"  value="1" onClick={this.ResetNote}> Question 1</button>
          <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target=".bd-example-modal-lg"  value="2" onClick={this.ResetNote}> Question 2</button>
        </div>



        <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
            <video style={{width:"100%", height:"450px"}} src="/static/Full Stack React _ Django [1] - Basic REST API.mp4" type="video/mp4" id="Video"  controls="controls">
              video not supported
            </video>
            <hr/>
            <div className="card card-body mt-4 mb-4">
              <div id='FormQuestion'>
              <div className="form-group">
                <h2 id="que">what the video Talk About ?</h2>
            </div>
              <div className="form-group">
              <label><strong>{Notification}</strong></label>
            </div>
              
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"  alt="" onClick={this.CheckAnswer}/>
                <label className="form-check-label" htmlFor="inlineRadio1" id="label1">Installing Django !</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"  alt="" onClick={this.CheckAnswer}/>
                <label className="form-check-label" htmlFor="inlineRadio2" id="label2">Installing React !</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" alt="" onClick={this.CheckAnswer}/>
                <label className="form-check-label" htmlFor="inlineRadio3" id="label3">Use Django and react togather !</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4" alt="" onClick={this.CheckAnswer}/>
                <label className="form-check-label" htmlFor="inlineRadio4" id="label4">Use Django and react togather !</label>
              </div>
              </div>

            </div>
            <hr/>
            <div className="form-group" style={{textAlign:"center"}} >
            <button type="submit" id="btnSubmit" className="btn btn-primary">
              Save Note
            </button>
          </div>
            </div>
          </div>
        </div>
          
          
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addLead }
)(Form);
