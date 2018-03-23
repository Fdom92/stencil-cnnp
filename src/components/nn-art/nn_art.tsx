import { Component } from '@stencil/core';

import {ActivationFunction, CPPN} from './cppn';

const CANVAS_UPSCALE_FACTOR = 3;
const MAT_WIDTH = 30;
const WEIGHTS_STDEV = .6;


@Component({
  tag: 'nn-art'
})
export class NnArtComponent {
  activationFunctionNames: ActivationFunction[];
  selectedActivationFunctionName: ActivationFunction;

  cppn: CPPN;

  inferenceCanvas;

  z1Scale: number;
  z2Scale: number;
  numLayers: number;

  componentDidLoad() {
    this.inferenceCanvas = document.getElementsByClassName('inference')[0];
    this.cppn = new CPPN(this.inferenceCanvas);

    this.inferenceCanvas.style.width = `${this.inferenceCanvas.width * CANVAS_UPSCALE_FACTOR}px`;
    this.inferenceCanvas.style.height = `${this.inferenceCanvas.height * CANVAS_UPSCALE_FACTOR}px`;

    this.activationFunctionNames = ['tanh', 'sin', 'relu', 'step'];
    this.selectedActivationFunctionName = 'tanh';
    this.cppn.setActivationFunction(this.selectedActivationFunctionName);

    this.numLayers = 2;
    this.cppn.setNumLayers(this.numLayers);

    this.z1Scale = 1;
    this.cppn.setZ1Scale(this.convertZScale(this.z1Scale));

    this.z2Scale = 1;
    this.cppn.setZ2Scale(this.convertZScale(this.z2Scale));

    this.cppn.generateWeights(MAT_WIDTH, WEIGHTS_STDEV);
    this.cppn.start();
  }

  convertZScale(z: number): number {
    return (103 - z);
  }

  render() {
    return (
      <div class="container">
        <canvas class="inference"></canvas>
      </div>
    );
  }
}
