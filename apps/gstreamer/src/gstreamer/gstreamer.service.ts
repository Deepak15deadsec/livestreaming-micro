import { Injectable, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

@Injectable()
export class GstreamerService {
  private recordingProcess: ChildProcessWithoutNullStreams | null = null;
  private streamingProcess: ChildProcessWithoutNullStreams | null = null;
  private logger = new Logger(GstreamerService.name);

  startRecording(outputFile: string): boolean {
    if (this.recordingProcess) {
      this.logger.warn('Recording is already in progress.');
      return false;
    }
  
    this.logger.log(`Starting recording to ${outputFile}`);
  
    // Split the pipeline into individual arguments
    const pipeline = [
      'v4l2src', 'device=/dev/video0', '!',
      'videoconvert', '!',
      'videoscale', '!',
      'video/x-raw, format=NV12, width=1280, height=720, framerate=30/1', '!',
      'x264enc', 'bitrate=500', 'speed-preset=ultrafast', 'tune=zerolatency', '!',
      'mp4mux', '!',
      'filesink', `location=${outputFile}`
    ];
  
    // Log the pipeline for debugging
    this.logger.log(`GStreamer Pipeline: ${pipeline.join(' ')}`);
  
    // Start the GStreamer process
    this.recordingProcess = spawn('gst-launch-1.0', pipeline);
  
    // Handle stdout
    this.recordingProcess.stdout.on('data', (data) => {
      this.logger.log(`GStreamer Output: ${data}`);
    });
  
    // Handle stderr
    this.recordingProcess.stderr.on('data', (data) => {
      this.logger.error(`GStreamer Error: ${data}`);
    });
  
    // Handle process exit
    this.recordingProcess.on('close', (code) => {
      this.logger.log(`Recording stopped with exit code ${code}`);
      this.recordingProcess = null;
    });
  
    return true;
  }

  stopRecording(): boolean {
    if (!this.recordingProcess) {
      this.logger.warn('No recording in progress.');
      return false;
    }

    this.logger.log('Stopping recording...');
    this.recordingProcess.kill('SIGINT');
    this.recordingProcess = null;

    return true;
  }
  startStreaming(rtspUrl: string): string {
    if (this.streamingProcess) {
      return 'Streaming is already in progress.';
    }
  
    this.logger.log(`Starting RTSP streaming from ${rtspUrl}`);
  
    // GStreamer pipeline to fetch RTSP stream and forward it locally
    const pipeline = [
      'rtspsrc', `location=${rtspUrl}`, 'protocols=4', 'latency=200', '!',
      'rtpmp4vdepay', '!', 'decodebin', '!',
      'videoconvert', '!', 'autovideosink'
    ];
  
    this.streamingProcess = spawn('gst-launch-1.0', pipeline);
  
    this.streamingProcess.stdout.on('data', (data) => {
      this.logger.log(`GStreamer Output: ${data}`);
    });
  
    this.streamingProcess.stderr.on('data', (data) => {
      this.logger.error(`GStreamer Error: ${data}`);
    });
  
    this.streamingProcess.on('close', (code) => {
      this.logger.log(`Streaming stopped with exit code ${code}`);
      this.streamingProcess = null;
    });
  
    return 'RTSP streaming started and displaying locally!';
  }

  stopStreaming(): string {
    if (!this.streamingProcess) {
      return 'No streaming in progress.';
    }

    this.logger.log('Stopping RTSP streaming...');
    this.streamingProcess.kill('SIGINT');
    this.streamingProcess = null;

    return 'Streaming stopped.';
  }
}
