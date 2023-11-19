let synth;
let playing, note;
let seq;
let seq1, seq2;

function setup() {

cnv = createCanvas(windowWidth, windowHeight);
cnv.mousePressed(playSynth);

const lfilter = new Tone.Filter({
  frequency: 500,
  type: 'lowpass',
  rolloff: -48
}).toDestination();

synth = new Tone.Synth({
  volume: -12
}).connect(lfilter);

synth2 = new Tone.Synth({
  volume: -12
}).connect(lfilter);


const reverb = new Tone.Reverb({
  wet: 0.5,
  decay: 5
}).toDestination();

lfilter.connect(reverb);

seq1 = ["C4", ["E4", 0, "E4"], "G4", ["A4", "G4"]];
seq2 = ["G4", ["E4", 0, "E4"], "G5", ["A4", "G4"]];


seq = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, 0.1, time);
	// subdivisions are given as subarrays
}, seq1).start(0);

//Tone.Transport.timeSignature = [7, 8];

Tone.Transport.bpm.value = 80;

}

function draw() {
  background(220);

  //note = map(mouseY, 0, height, 20, 1000);
  
  // if (playing) {
    
  //   synth.setNote(note, 0.1);
  // }


}

function playSynth() {
  //synth.triggerAttack("C4", 0.3);
  Tone.Transport.start();
  console.log(seq);
  playing = true;
}

function mouseReleased() {
  //synth.triggerRelease("+0.2")
  Tone.Transport.stop();
  playing = false;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    seq.events = seq2;
  } else if (keyCode === RIGHT_ARROW) {
    seq.events = seq1;
  }
}