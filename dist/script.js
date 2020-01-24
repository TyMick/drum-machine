// Drum machine wrapper
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastDrum: "" };

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  // Update display from drum press
  updateDisplay(msg) {
    this.setState({
      lastDrum: msg });

  }

  // 3x3 set of drum pads, display below
  render() {
    return (
      React.createElement("div", { id: "drum-machine", className: "d-inline-block" },
      React.createElement("div", { className: "mb-1" },
      React.createElement(Drum, {
        keyb: "Q",
        name: "Chord 1",
        fileName: "Chord_1.mp3",
        display: this.updateDisplay }),

      React.createElement(Drum, {
        keyb: "W",
        name: "Chord 2",
        fileName: "Chord_2.mp3",
        display: this.updateDisplay }),

      React.createElement(Drum, {
        keyb: "E",
        name: "Chord 3",
        fileName: "Chord_3.mp3",
        display: this.updateDisplay })),


      React.createElement("div", { className: "mb-1" },
      React.createElement(Drum, {
        keyb: "A",
        name: "Shaker",
        fileName: "Give_us_a_light.mp3",
        display: this.updateDisplay }),

      React.createElement(Drum, {
        keyb: "S",
        name: "Open HH",
        fileName: "Dry_Ohh.mp3",
        display: this.updateDisplay }),

      React.createElement(Drum, {
        keyb: "D",
        name: "Closed HH",
        fileName: "Bld_H1.mp3",
        display: this.updateDisplay })),


      React.createElement("div", { className: "mb-2" },
      React.createElement(Drum, {
        keyb: "Z",
        name: "Punchy Kick",
        fileName: "punchy_kick_1.mp3",
        display: this.updateDisplay }),

      React.createElement(Drum, {
        keyb: "X",
        name: "Side Stick",
        fileName: "side_stick_1.mp3",
        display: this.updateDisplay }),

      React.createElement(Drum, {
        keyb: "C",
        name: "Snare",
        fileName: "Brk_Snr.mp3",
        display: this.updateDisplay })),


      React.createElement(Display, { msg: this.state.lastDrum })));


  }}


// Individual drum button and audio clip
class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.playDrum = this.playDrum.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.buttonRef = React.createRef();
  }

  // Just play the sound
  playDrum(e) {
    const sound = document.getElementById(this.props.keyb);
    sound.currentTime = 0;
    sound.play();
    this.props.display(this.props.name);
  }

  // On key press, play sound and visually simulate button click
  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }
  handleKey(e) {
    if (e.keyCode == this.props.keyb.charCodeAt(0)) {
      this.buttonRef.current.click();
      this.buttonRef.current.focus();
      this.setState({ active: true });
      setTimeout(() => {
        this.setState({ active: false });
      }, 150);
    }
  }

  render() {
    return (
      React.createElement("button", {
        type: "button",
        id: this.props.name.replace(/ /g, "-"),
        onClick: this.playDrum,
        ref: this.buttonRef,
        "aria-pressed": this.state.active,
        className:
        "drum-pad btn btn-secondary btn-lg mr-1" + (
        this.state.active ? " active" : "") },


      this.props.keyb,
      React.createElement("audio", {
        className: "clip",
        id: this.props.keyb,
        src:
        "https://s3.amazonaws.com/freecodecamp/drums/" + this.props.fileName })));




  }}


// Drum display
class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", { id: "display", className: "card py-2 px-3" },
      React.createElement("samp", null,
      this.props.msg ? this.props.msg : String.fromCharCode(160))));



  }}


// Render to #app
ReactDOM.render(React.createElement(DrumMachine, null), document.getElementById("app"));