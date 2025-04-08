import { Injectable, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class GstreamerService {
  private recordingProcess: ChildProcessWithoutNullStreams | null = null;
  private streamingProcess= new Map<string, ChildProcessWithoutNullStreams>();
  private logger = new Logger(GstreamerService.name);
  constructor(private readonly httpService: HttpService) {}

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
  startStreaming(streamId: string, rtspUrl: string): string {
    if (this.streamingProcess.has(streamId)) {
      return `Streaming with ID ${streamId} is already in progress.`;
    }

    this.logger.log(`Starting RTSP streaming for ID ${streamId} from ${rtspUrl}`);

    const pipeline = [
      'rtspsrc', `location=${rtspUrl}`, 'protocols=tcp', 'latency=200', '!',
      'decodebin', '!',
      'videoconvert', '!', 'autovideosink'
    ];
    const process = spawn('gst-launch-1.0', pipeline);
    this.streamingProcess.set(streamId, process);

    process.stdout.on('data', (data) => {
      this.logger.log(`GStreamer Output [${streamId}]: ${data}`);
    });

    process.stderr.on('data', (data) => {
      this.logger.error(`GStreamer Error [${streamId}]: ${data}`);
    });

    process.on('close', (code) => {
      this.logger.log(`Streaming with ID ${streamId} stopped with exit code ${code}`);
      this.streamingProcess.delete(streamId);
    });

    return `RTSP streaming started with ID ${streamId}`;
  }

  stopStreaming(streamId: string): string {
    const process = this.streamingProcess.get(streamId);
    if (!process) {
      return `No streaming found with ID ${streamId}.`;
    }

    this.logger.log(`Stopping RTSP streaming for ID ${streamId}...`);
    process.kill('SIGINT');
    this.streamingProcess.delete(streamId);

    return `Streaming with ID ${streamId} stopped.`;
  }



}

