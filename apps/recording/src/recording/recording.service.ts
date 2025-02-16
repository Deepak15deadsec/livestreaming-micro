import { Injectable, Logger } from '@nestjs/common';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';


@Injectable()
export class RecordingService {
  private ffmpegProcess: ChildProcessWithoutNullStreams | null = null;
  private readonly logger = new Logger(RecordingService.name);

  startRecording(outputPath: string) {
    if (this.ffmpegProcess) {
      throw new Error('Recording is already in progress.');
    }

    this.logger.log(`Starting recording: ${outputPath}`);

    this.ffmpegProcess = spawn('ffmpeg', [
      '-f', 'video4linux2', // Correct input format for Linux
      '-i', '/dev/video0',  // Linux device path (Check using `v4l2-ctl --list-devices`)
      '-r', '30',           // Frame rate
      '-c:v', 'libx264',    // Codec
      '-preset', 'ultrafast',
      'output.mp4',
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
