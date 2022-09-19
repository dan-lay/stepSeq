import Step from './step.js';
import * as Tone from 'tone'

class Track {
   constructor(trackID, sample, stepCount = 32) {
      this.trackID = trackID;
      this.stepCount = stepCount;
      this.row = [];
      this.sample = sample;
      
      for (let i = 0; i < this.stepCount; i++) {
         const step = new Step(i);
         this.row.push(step);
      }
   }

   loopTrack() {
      let sample = this.sample;
      for (let i = 0; i < this.row.length; i++) {
         let step = this.row[i];
         if (step.isActive === true) {
            sample.start();
         }
      }
   }
}



//alternate track





// function testPlay() {
//    const osc = new Tone.Oscillator().toDestination();

//    Tone.Transport.scheduleRepeat((time) => {
//       osc.start(time).stop(time + 0.1);
//    }, "8n");

//    Tone.Transport.start();
// }




// function createTrack() {
//    const newTrack = new Track();
//    const newStep = new Step();
//    return newTrack.makeRow(newStep);
// }


export {Track, Step};