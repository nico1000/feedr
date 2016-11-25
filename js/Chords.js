export class Chords {
  constructor() {
  }
  
  // render all chords to dom elements
  static get allChords() {
    return {
      'C': {
        positions: '577655',
        fingers: '134211',
      },
      'Am': {
        positions: '577655',
        fingers: '134211',
      },
    };
  }

  static renderChords() {
    return this.allChords;
  }

}