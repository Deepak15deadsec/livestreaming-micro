import { Injectable, Logger } from '@nestjs/common';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';


@Injectable()
export class RecordingService {
 private ffmpegProcess: Record<number, ChildProcessWithoutNullStreams> = {}; // Store processes per ID
 private readonly logger = new Logger(RecordingService.name);


 startRecording(id: number, rtspUrl: string, outputPath: string)  {
   if (this.ffmpegProcess[id]) {
     throw new Error('Recording is already in progress.');
   }


   // const rtspUrl = 'rtsp://807e9439d5ca.entrypoint.cloud.wowza.com:1935/app-rC94792j/068b9c9a_stream2';
  
   this.logger.log(`Starting recording from RTSP stream: ${rtspUrl}`);

  


   try {
    this.ffmpegProcess[id] = spawn('ffmpeg', [
      // Improve connection reliability
      '-rtsp_transport', 'tcp',
      '-timeout', '5000000',  // Increase timeout (5 seconds)
      
      // Input
      '-i', rtspUrl,
      
      // Error recovery options
      '-err_detect', 'ignore_err',
      '-analyzeduration', '10000000',  // Increase analysis time
      
      // Video encoding options
      '-r', '30',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-tune', 'zerolatency',   // Reduce latency
      '-pix_fmt', 'yuv420p',    // More compatible pixel format
      '-profile:v', 'baseline', // More compatible profile
      '-level', '3.0',
      '-maxrate', '2000k',
      '-bufsize', '4000k',
      
      // Duration limit
      '-t', '3600',
      
      // Output
      '-f', 'mp4',              // Explicitly specify format
      outputPath,
    ]);

    this.logger.log(`FFmpeg process started for ID ${id}`);
    
    // Monitor stdout for progress info
    this.ffmpegProcess[id].stdout.on('data', (data) => {
      this.logger.debug(`FFmpeg Output (ID ${id}): ${data}`);
    });

    this.ffmpegProcess[id].stderr.on('data', (data) => {
      const message = data.toString();
      // Only log actual errors, not the regular FFmpeg output that comes through stderr
      if (message.includes('Error') || message.includes('error') || message.includes('fail')) {
        this.logger.error(`FFmpeg Error (ID ${id}): ${message}`);
      } else {
        this.logger.debug(`FFmpeg Info (ID ${id}): ${message}`);
      }
    });

    this.ffmpegProcess[id].on('close', (code) => {
      this.logger.log(`FFmpeg process for ID ${id} exited with code ${code}`);
      if (code !== 0) {
        this.logger.warn(`FFmpeg process for ID ${id} exited abnormally with code ${code}`);
      }
      if (this.ffmpegProcess[id]) delete this.ffmpegProcess[id]; // Only delete if it exists
    });

    this.ffmpegProcess[id].on('error', (err) => {
      this.logger.error(`FFmpeg process error for ID ${id}: ${err.message}`);
      if (this.ffmpegProcess[id]) delete this.ffmpegProcess[id];
    });

    this.logger.log(`Active recording IDs: ${Object.keys(this.ffmpegProcess)}`);

    return { message: 'Recording started', id, rtspUrl, outputPath };

  } catch (error) {
    this.logger.error(`Error starting FFmpeg for ID ${id}: ${error.message}`);
    throw error;
  }
 }


 stopRecording(id: number) {

  this.logger.log(`Existing recording IDs: ${Object.keys(this.ffmpegProcess)}`);

   if (!this.ffmpegProcess[id]) {
     throw new Error(`No recording in progress for ID ${id}`);
   }


   this.ffmpegProcess[id].kill('SIGINT');
   this.logger.log(`Recording stopped for ID ${id}`);
   delete this.ffmpegProcess[id];


   return { message: `Recording stopped for ID ${id}` };
 }


}
