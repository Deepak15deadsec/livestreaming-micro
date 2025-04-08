import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AddSourceDto } from './dto/add-source.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class Go2RtcService {
  constructor(
    @Inject('GO2RTC_CLIENT') private go2rtcClient: ClientProxy,
  ) {}

  async listSources(): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.go2rtcClient.send({ cmd: 'list-sources' }, {})
      );
      return result;
    } catch (error) {
      const msg = typeof error === 'string'
        ? error
        : (error.response && error.response.data && error.response.data.message) || error.message || 'Failed to list sources';
      throw new HttpException(msg, HttpStatus.BAD_GATEWAY);
    }
  }

  async addSource(dto: AddSourceDto): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.go2rtcClient.send({ cmd: 'add-source' }, dto)
      );
      return result;
    } catch (error) {
      const msg = typeof error === 'string'
        ? error
        : (error.response && error.response.data && error.response.data.message) || error.message || 'Failed to add source';
      throw new HttpException(msg, HttpStatus.BAD_GATEWAY);
    }
  }

  async removeSource(name: string): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.go2rtcClient.send({ cmd: 'remove-source' }, name)
      );
      return result;
    } catch (error) {
      const msg = typeof error === 'string'
        ? error
        : (error.response && error.response.data && error.response.data.message) || error.message || 'Failed to remove source';
      throw new HttpException(msg, HttpStatus.BAD_GATEWAY);
    }
  }

  async getStreamUrl(name: string): Promise<{ name: string; url: string }> {
    try {
      const result = await lastValueFrom(
        this.go2rtcClient.send({ cmd: 'get-stream-url' }, name)
      );
      return result;
    } catch (error) {
      const msg = typeof error === 'string'
        ? error
        : (error.response && error.response.data && error.response.data.message && error.response.data.message.trim()) ||
          (error.message && error.message.trim()) ||
          'Failed to get stream URL';
      throw new HttpException(msg, HttpStatus.BAD_GATEWAY);
    }
  }
} 