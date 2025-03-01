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
        '-rtsp_transport', 'tcp',
        '-i', rtspUrl,
        '-r', '30',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-t', '3600',
        outputPath,
    ]);
} catch (error) {
    this.logger.error(`Error starting FFmpeg for ID ${id}: ${error.message}`);
}



   this.ffmpegProcess[id].stderr.on('data', (data) => {
     this.logger.error(`FFmpeg Error (ID ${id}): ${data}`);
   });


   this.ffmpegProcess[id].on('close', (code) => {
     this.logger.log(`FFmpeg process for ID ${id} exited with code ${code}`);
     if (this.ffmpegProcess[id]) delete this.ffmpegProcess[id]; // Only delete if it exists
   });

   this.logger.log(`Existing recording IDs: ${Object.keys(this.ffmpegProcess)}`);

   return { message: 'Recording started', id, rtspUrl, outputPath };
 }


 stopRecording(id: number) {

  this.logger.log(`Existing recording IDs: ${Object.keys(this.ffmpegProcess)}`);

   if (!this.ffmpegProcess[id]) {
     throw new Error(`No recording in progress for ID ${id}`);
   }


   this.ffmpegProcess[id].kill('SIGKILL');
   this.logger.log(`Recording stopped for ID ${id}`);
   delete this.ffmpegProcess[id];


   return { message: `Recording stopped for ID ${id}` };
 }


}
