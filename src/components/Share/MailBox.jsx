import React, { Component } from 'react';
import emailjs from 'emailjs-com';
// init("user_nKeVBfeN3GHyTUJMC2JeR");
class MailBox extends Component {
    constructor(props) {
        super(props);
        this.state = { feedback: '', name: 'Tài', email: 'thienhoang.tmt@gmail.com' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        const templateId = 'template_h6nx0dh';
        this.sendFeedback(templateId, { message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email })
    }
    handleChange(event) {
        this.setState({ feedback: event.target.value })
    }
    sendFeedback(templateId, variables) {
        emailjs.send(
            "service_yp5zkaq", templateId,
            variables, "user_nKeVBfeN3GHyTUJMC2JeR"
        ).then(res => {
            console.log('Email successfully sent!')
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))

            //rep cus
        emailjs.send(
            "service_yp5zkaq", "template_t1wjple",
            variables, "user_nKeVBfeN3GHyTUJMC2JeR"
        ).then(res => {
            console.log('Email successfully sent!')
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    render() {
        return (
            <form className="test-mailing">
                <h1>Let's see if it works</h1>
                <div>
                    <textarea
                        id="test-mailing"
                        name="test-mailing"
                        onChange={this.handleChange}
                        placeholder="Post some lorem ipsum here"
                        required
                        value={this.state.feedback}
                        style={{ width: '100%', height: '150px' }}
                    />
                </div>
                <input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
            </form>
        )
    }
}

export default MailBox;