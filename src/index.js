import * as Tone from 'tone';
// import { Big_File } from './scripts/one_big_long_file.js';
// import { Samples } from './samples/sample_list.js';
// import { View } from './scripts/view.js';
// import {Step, Track, Sequencer} from './scripts/sequencer.js';


document.addEventListener("DOMContentLoaded", () => {
   console.log("Welcome to stepSeq");

   function blobify(samplePath) {
      let xhr = new XMLHttpRequest();
      let player = new Tone.Player;
   
      xhr.open("GET", samplePath, true)
      xhr.responseType = 'blob';
   
      xhr.onload = function(){
         let blob = URL.createObjectURL(this.response);
         player.load(blob);
         // console.log(`${samplePath} loaded...`);
      };
      
      xhr.send();
      return player;
   }
   
   // FUNCTION THAT TURNS AUDIO INTO BLOBS (THEY ARE LITTLE PLAYER OBJECTS)
   
   const hiphopSamples = function() {
      let kick = blobify("./src/samples/hiphop/hip_hop_kick.wav");               //need to make required from sample_list
      let snare = blobify("./src/samples/hiphop/hip_hop_snare.wav");
      let open_hihat = blobify("./src/samples/hiphop/hip_hop_hihat_open.wav");
      let closed_hihat = blobify("./src/samples/hiphop/hip_hop_hihat_closed.wav");
      let sub_bass = blobify("./src/samples/hiphop/hip_hop_sub.wav");
      let fx_hit = blobify("./src/samples/hiphop/hip_hop_orch_hit.wav");
      let lead = blobify("./src/samples/hiphop/hip_hop_lead.wav");
      let vox = blobify("./src/samples/hiphop/hip_hop_vox.wav");
   
      return [kick, snare, open_hihat, closed_hihat, sub_bass, fx_hit, lead, vox];
   }
   
   // const technoSamples = {
   //    kick: blobify("./src/samples/hiphop/hip_hop_kick.wav"),
   //    snare: blobify("./src/samples/hiphop/hip_hop_snare.wav"),
   //    open_hihat: blobify("./src/samples/hiphop/hip_hop_hihat_open.wav"),
   //    closed_hihat: blobify("./src/samples/hiphop/hip_hop_hihat_closed.wav"),
   //    sub_bass: blobify("./src/samples/hiphop/hip_hop_sub.wav"),
   //    fx_hit: blobify("./src/samples/hiphop/hip_hop_orch_hit.wav"),
   //    lead: blobify("./src/samples/hiphop/hip_hop_lead.wav"),
   //    vox: blobify("./src/samples/hiphop/hip_hop_vox.wav")
   // };
   
   // const pianoSamples = {
   //    kick: blobify("./src/samples/hiphop/hip_hop_kick.wav"),
   //    snare: blobify("./src/samples/hiphop/hip_hop_snare.wav"),
   //    open_hihat: blobify("./src/samples/hiphop/hip_hop_hihat_open.wav"),
   //    closed_hihat: blobify("./src/samples/hiphop/hip_hop_hihat_closed.wav"),
   //    sub_bass: blobify("./src/samples/hiphop/hip_hop_sub.wav"),
   //    fx_hit: blobify("./src/samples/hiphop/hip_hop_orch_hit.wav"),
   //    lead: blobify("./src/samples/hiphop/hip_hop_lead.wav"),
   //    vox: blobify("./src/samples/hiphop/hip_hop_vox.wav")
   // };
   
   // const sillySamples = {
   //    kick: blobify("./src/samples/hiphop/hip_hop_kick.wav"),
   //    snare: blobify("./src/samples/hiphop/hip_hop_snare.wav"),
   //    open_hihat: blobify("./src/samples/hiphop/hip_hop_hihat_open.wav"),
   //    closed_hihat: blobify("./src/samples/hiphop/hip_hop_hihat_closed.wav"),
   //    sub_bass: blobify("./src/samples/hiphop/hip_hop_sub.wav"),
   //    fx_hit: blobify("./src/samples/hiphop/hip_hop_orch_hit.wav"),
   //    lead: blobify("./src/samples/hiphop/hip_hop_lead.wav"),
   //    vox: blobify("./src/samples/hiphop/hip_hop_vox.wav")
   // };
   
   // SAMPLE BANKS OF BLOB PLAYERS
   
   // SET UP SEQUENCER VIEW
   
   const sequencer = function() {
      const seq = document.createElement("div");
      seq.classList.add('sequencer');
      
      for (let i = 0; i < 8; i++) {
         const track = document.createElement("div");          //DONE EXCEPT CUSTOM TRACK INPUT
         track.classList.add('track');
         track.setAttribute('data-track-id', i);
   
         for (let j = 0; j < 32; j++) {
            const step = document.createElement("button");
            step.classList.add('step');
            step.setAttribute('data-step-id', j);
            step.setAttribute('data-is-active', false);
   
            track.appendChild(step);
         }
   
         seq.appendChild(track);
      }
   
      return seq;
   };

// PUSH SAMPLE PLAYER OBJECTS INTO GRID

   function masterGrid(sampleList) {
      const grid = [];

      for (let i = 0; i < 8; i++) {
         const track = [];
         for (let j = 0; j < 32; j++) {
            const player = {
               sample: sampleList[i],
               isActive: false
            }
           
            track.push(player);
         }
         grid.push(track);
      }

      return grid;
   }
   
   const MG = masterGrid(hiphopSamples());
   // SET UP CONTROL BAR
   
   const controlBar = function() {
      const bar = document.createElement("div");
      bar.classList.add('control-bar')
   
      for (let i = 0; i < 3; i++) {
         const controlArea = document.createElement("div");
         if (i === 0) {
            controlArea.classList.add("FX-controls");
         } else if (i === 1) {
            controlArea.classList.add("playback-controls");
         } else {
            controlArea.classList.add("rec-controls");
         }

         for (let j = 0; j < 4; j++) {
            const button = document.createElement("button");
            button.setAttribute('id', j)
            controlArea.appendChild(button);
         }
         bar.appendChild(controlArea);
      }
   
      return bar;
   };
   
   // SET UP FX-RACK
   
   function setupFX() {
   
   };
   
   // SET UP RECORDER
   
   function setupRec() {
   
   };
   
   // SET UP VISUALIZER
   
   function setupVis() {
   
   };
   
   // CREATE ALL ELEMENTS AND ATTACH TO UNIT
   
   const unit = document.querySelector(".unit");
   // const sequencer = setupSeq();
   // const controlBar = setupControlBar();
   // const FXRack = setupFX();
   // const recorder = setupRec();
   // const visualizer = setupVis();
   
   
   // unit.appendChild(controlBar);
   // unit.appendChild(sequencer);
   // unit.appendChild(FXRack);
   // unit.appendChild(recorder);
   // unit.appendChild(visualizer);
   
   // ADD ALL LISTENERS
   


   function setupStepListeners(masterGrid) {
      const sequencer = document.getElementsByClassName("sequencer")
      const allTracks = sequencer[0].children;
      
      for (let i = 0; i < 8; i++) {
         let track = allTracks[i];

         for (let j = 0; j < 32; j++) {
            let step = track.children[j];

            step.addEventListener("click", (e) => {
               const selectedStep = e.target;
               // const stepID = selectedStep.getAttribute("data-step-id");
              
               if (selectedStep.getAttribute('data-is-active') === 'false') {
                  selectedStep.setAttribute('data-is-active', true);
                  masterGrid[i][j].isActive = true;
                  console.log(selectedStep);
                  console.log(masterGrid[i][j]);
               } else {
                  selectedStep.setAttribute('data-is-active', false);
                  masterGrid[i][j].isActive = false;
                  console.log(selectedStep);
                  console.log(masterGrid[i][j]);
               }       
            })
         }
      }
      
   };

   class View {
      constructor(unit, seq, bar) {  //, seq, fx, rec, vis
         this.unit = unit;
         this.seq = seq;
         this.controlBar = bar;
         // this.fx = fx;
         // this.rec = rec;
         // this.vis = vis;

         // const newFX = this.setupFX();
         // const newRec = this.setupRec();
         // const newVis = this.setupVis();
         
   
         unit.appendChild(this.controlBar);
         unit.appendChild(this.seq);
         // unit.appendChild(newFX);
         // unit.appendChild(newRec);
         // unit.appendChild(newVis);
         setupStepListeners(MG);
   
         return unit;
      }
   }
   
   
   const seq = sequencer();
   const bar = controlBar();
   // const fx = new FXRack();
   // const rec = new Recorder();
   // const vis = new Visualizer();

   window.view = new View(unit, seq, bar);                   //sets up all views initially

   const playback = document.getElementsByClassName("playback-controls");
   const playButton = playback[0].firstChild;
   console.log(playback);
   const stopButton = playback[0].children[1];
   stopButton.innerHTML = "Stop";
   playButton.innerHTML = "Play";

   let currentPlayMark = 0;

   const loop = function(time) {
      let nextStep = currentPlayMark % 32;
      let currentSteps = seq.getElementsByClassName('step');

      let masterGrid = MG;
   
      for (let i = 0; i < masterGrid.length; i++) {
         let columnStep = masterGrid[i][nextStep];
         console.log(nextStep);
         
         if (columnStep.isActive === true) {
            columnStep.sample.toDestination().start(time);
            console.log(columnStep);
         }
      }

      // console.log(seq.querySelectorAll("data-track-id"));

      currentPlayMark++;
   }

   stopButton.addEventListener("click", () => {
      Tone.Transport.stop();
   })

   playButton.addEventListener("click", () => {
      
      Tone.start();
      Tone.Transport.start();
      Tone.Transport.loopEnd = "1m"
      Tone.Transport.bpm.value = 120;
      Tone.Transport.scheduleRepeat(loop, "8n");
      
      
      
      
      // testSequence.start();
      // testSequence2.start();
      console.log(Tone.Transport.bpm.value)
   })

});