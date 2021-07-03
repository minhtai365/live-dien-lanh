import React, { Component } from 'react';
import { withRouter } from 'react-router';

class TingPage extends Component {
    constructor(props) {
        super(props);
        // this.url = ["music/beep.mp3","music/ting.mp3",""];
        this.url = "music/beep.mp3";
        this.audio = new Audio(this.url);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(_ => {
                        // Automatic playback started!
                        // Show playing UI.
                        // console.log("audio played auto");
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                        console.log("playback prevented");
                    });
            }
        }
    }
    componentDidMount() {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                    // console.log("audio played auto");
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    console.log("playback prevented");
                });
        }
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}
export default withRouter(TingPage);