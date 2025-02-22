import { Injectable, Logger } from '@nestjs/common';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

@Injectable()
export class RecordingService {
  private ffmpegProcess: ChildProcessWithoutNullStreams | null = null;
  private readonly logger = new Logger(RecordingService.name);

  startRecording(id: number, rtspUrl: string, outputPath: string)  {
    if (this.ffmpegProcess) {
      throw new Error('Recording is already in progress.');
    }

    // const rtspUrl = 'rtsp://807e9439d5ca.entrypoint.cloud.wowza.com:1935/app-rC94792j/068b9c9a_stream2';
    
    this.logger.log(`Starting recording from RTSP stream: ${rtspUrl}`);

    this.ffmpegProcess = spawn('ffmpeg', [
      '-rtsp_transport', 'tcp', // Use TCP for better stability
      '-i', rtspUrl, // RTSP stream URL
      '-r', '30', // Frame rate
      '-c:v', 'libx264', // Video codec
      '-preset', 'ultrafast', // Encoding speed
      '-t', '3600', // Optional: Limit recording to 1 hour (remove if not needed)
      outputPath,
    ]);

    this.ffmpegProcess.stderr.on('data', (data) => {
      this.logger.error(`FFmpeg Error: ${data}`);
    });

    this.ffmpegProcess.on('close', (code) => {
      this.logger.log(`FFmpeg process exited with code ${code}`);
      this.ffmpegProcess = null;
    });

    return { message: 'Recording started', outputPath };
  }

  stopRecording() {
    if (!this.ffmpegProcess) {
      throw new Error('No recording in progress.');
    }

    this.ffmpegProcess.kill('SIGINT');
    this.logger.log('Recording stopped.');
    this.ffmpegProcess = null;
    
    return { message: 'Recording stopped' };
  }
}
