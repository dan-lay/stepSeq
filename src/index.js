import * as Tone from 'tone';
import { FXRack } from './scripts/components/fxRack.js';
import { Sampler } from './scripts/components/sampler.js';

import { fxView } from './scripts/views/fxView.js';
import { visView } from './scripts/views/visView.js';
import { ctrlView } from './scripts/views/ctrlView.js';
import { gridView } from './scripts/views/gridView.js';


document.addEventListener("DOMContentLoaded", () => {
   console.log("Welcome to stepSeq");

   const bottomContainer = document.querySelector(".bottom-container");
   const sequencer = document.createElement("div");
   const spacer = document.createElement("div");
   const palmRest = document.createElement("div");
   palmRest.classList.add("palm-rest")
   spacer.classList.add("spacer");
   sequencer.classList.add("sequencer");
   bottomContainer.appendChild(sequencer);

   const fxRack = new FXRack();
   const sampler = new Sampler(fxRack);

   sequencer.appendChild(fxView());
   sequencer.appendChild(ctrlView());
   sequencer.appendChild(visView());
   sequencer.appendChild(spacer);
   sequencer.appendChild(gridView(sampler));
   sequencer.appendChild(palmRest);



   //add event listeners

   const rack = document.getElementsByClassName("fx-rack")[0];
   const fxFolder = document.getElementById("fx-folder");
   fxFolder.addEventListener("click", () => {
      if (rack.getAttribute("folded") === "true") {
         rack.setAttribute("folded", "false");
      } else {
         rack.setAttribute("folded", "true");
      }
   })

   const playButton = document.getElementById("play-button");
   playButton.addEventListener("click", () => {
      Tone.Transport.start();
      Tone.start();
      playButton.setAttribute("data-is-active", "true");
   })

   const stopButton = document.getElementById("stop-button");
   stopButton.addEventListener("click", () => {
      Tone.Transport.stop();
      playButton.setAttribute("data-is-active", "false");
      stopButton.setAttribute("data-is-active", "true");
      setTimeout(() => {
         stopButton.setAttribute("data-is-active", "false")
      }, 200);
   })

   const bpmReadout = document.getElementById("bpm-readout");
   const bpmUp = document.getElementById("bpm-up-button");
   bpmUp.addEventListener("click", () => {
      if (Tone.Transport.bpm.value >= 200) {
         return null;
      } else {
         Tone.Transport.bpm.value += 1;
         bpmReadout.innerHTML = Math.floor(Tone.Transport.bpm.value);
      } 
   })
   const bpmDown = document.getElementById("bpm-down-button");
   bpmDown.addEventListener("click", () => {
      if (Tone.Transport.bpm.value <= 41) {
         return null;
      } else {
         Tone.Transport.bpm.value -= 1;
         bpmReadout.innerHTML = Math.floor(Tone.Transport.bpm.value);
      }
   })

   const allTracks = document.getElementsByClassName("track");
   const rightControls = document.getElementById("right-controls").children;
   for (let control of rightControls) {
      console.log(control)
      control.addEventListener("click", () => {
         for (let control of rightControls) {
            control.setAttribute("data-is-active", "false");
         }
         control.setAttribute("data-is-active", "true");
         
         for (let track of allTracks) {
            if (track.id.includes(control.className)) {
               track.setAttribute("visible", "true");
            } else {
               track.setAttribute("visible", "false");
            }
         }
      })
   }



   //general slider handler

   const handleSlider = (element, effect) => {
      const val = element.value;
      const readOutId = `${element.id}-readout`;
      const readOut = document.getElementById(readOutId);
      effect(val);
      if (val <= -50) {
         readOut.innerHTML = "-inf";
      } else {
         readOut.innerHTML = Math.floor(val);
      }
   }


   //slider actions

   const pitchSlider = document.getElementById("pitch");
   pitchSlider.oninput = () => {
      handleSlider(pitchSlider, fxRack.changePitch);
   };

   const distortSlider = document.getElementById("distort");
   distortSlider.oninput = () => {
      handleSlider(distortSlider, fxRack.changeDistort);
   };

   const phaserSlider = document.getElementById("phaser");
   phaserSlider.oninput = () => {
      handleSlider(phaserSlider, fxRack.changePhaser);
   };

   const delaySlider = document.getElementById("delay");
   delaySlider.oninput = () => {
      handleSlider(delaySlider, fxRack.changeDelay);
   };

   const reverbSlider = document.getElementById("reverb");
   reverbSlider.oninput = () => {
      handleSlider(reverbSlider, fxRack.changeReverb);
   };

   const gainSlider = document.getElementById("gain");
   gainSlider.oninput = () => {
      handleSlider(gainSlider, fxRack.changeGain);
   };


   let currentPlayMark = 0;
   
   const loop = (time) => {
      let nextStep = currentPlayMark % 32;

      for (let i = 0; i < 21; i++) {
         const activeColumn = [allTracks[i].children[nextStep]]

         activeColumn.forEach((step) => {
            // sampleId = step.getAttribute()
            step.classList.toggle('highlighted');
            if (step.getAttribute("data-is-active") === "true") {
               sampler.playSample(`sound${i + 1}`, time);
            }
         })
      }
      
      currentPlayMark++;
   }

   Tone.Transport.scheduleRepeat(loop, "16n");
   Tone.Transport.loopEnd = "2m"

});