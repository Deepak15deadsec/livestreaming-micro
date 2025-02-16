import { Injectable } from '@nestjs/common';
import { UpdateRtspDto } from './dto/update-rtsp.dto';
import { CreateRtspDto } from '@app/contracts/rtsp/create-rtsp.dto';
import { rtspDto } from '@app/contracts/rtsp/rtsp.dto';

@Injectable()
export class RtspService {

  private rtspStreams: rtspDto[] = [
    {
      id: 1, // Example initial data
      name: 'RTSP Stream 1',
      link: 'rtsp://example.com/stream',
      path:'C/',
      createdAt: new Date().toISOString(),
    },
  ]; // In-memory storage for demonstration

  create(createRtspDto: CreateRtspDto) {
    const newRtsp = {
      id: this.generateId(), // Auto-generate ID
      ...createRtspDto, // Include name and link from the DTO
      createdAt: new Date().toISOString(), // Auto-generate created timestamp
    };

    this.rtspStreams.push(newRtsp); // Save to in-memory storage
    return newRtsp;
  }

  private generateId(): number {
    // Generate a unique ID (for demonstration, use the last ID + 1)
    const lastId = this.rtspStreams.length > 0 ? this.rtspStreams[this.rtspStreams.length - 1].id : 0;
    return lastId + 1;
  }

  findAll(): rtspDto[] {
    return this.rtspStreams; // Return all RTSP streams
  }

  findOne(id: number) {
    return `This action returns a #${id} rtsp`;
  }

  update(id: number, updateRtspDto: UpdateRtspDto) {
    return `This action updates a #${id} rtsp`;
  }

  remove(id: number) {
    return `This action removes a #${id} rtsp`;
  }
}
