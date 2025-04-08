import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AddSourceDto } from './dto/add-source.dto';

@Injectable()
export class Go2RtcService {
  private readonly logger = new Logger(Go2RtcService.name);
  private readonly baseUrl: string;
  private readonly streamServerUrl: string;

  constructor(private readonly http: HttpService) {
    // point to your local go2rtc instance
    this.baseUrl = process.env.GO2RTC_URL || 'http://localhost:1984/api';
    // Extract the base URL without '/api' for stream URLs
    this.streamServerUrl = this.baseUrl.includes('/api') 
      ? this.baseUrl.replace('/api', '') 
      : this.baseUrl;
  }

  async listSources(): Promise<any> {
    try {
      const res = await firstValueFrom(
        this.http.get(`${this.baseUrl}/streams`),
      );
      return res.data;
    } catch (error) {
      const msg = error?.response?.data || error.message || 'Failed to list sources';
      this.logger.error(`Failed to list sources: ${msg}`);
      throw new HttpException(msg, HttpStatus.BAD_GATEWAY);
    }
  }

  async addSource(dto: AddSourceDto): Promise<any> {
    try {
      this.logger.log(`Adding source ${dto.name} → ${dto.url}`);
      const res = await firstValueFrom(
        this.http.put(`${this.baseUrl}/streams`, null, {
          params: { src: dto.url, name: dto.name },
        }),
      );
      return res.data;
    } catch (error) {
      const msg = error?.response?.data || error.message || 'Failed to add source';
      this.logger.error(`Failed to add source: ${msg}`);
      throw new HttpException(msg, HttpStatus.BAD_GATEWAY);
    }
  }
  

  async removeSource(name: string): Promise<any> {
    try {
      this.logger.log(`Removing source ${name}`);
      // If baseUrl includes '/api', remove it for DELETE operations
      const realBaseUrl = this.baseUrl.includes('/api') ? this.baseUrl.replace('/api', '') : this.baseUrl;
      const url = `${realBaseUrl}/streams/${encodeURIComponent(name)}`;
      this.logger.log(`DELETE URL: ${url}`);
      const res = await firstValueFrom(
        this.http.delete(url)
      );
      return res.data;
    } catch (error) {
      const defaultMsg = 'Failed to remove source';
      const errorMsg = typeof error === 'string' && error.trim()
        ? error.trim()
        : (error.response && error.response.data && error.response.data.message && error.response.data.message.trim()) ||
          (error.message && error.message.trim()) ||
          defaultMsg;
      this.logger.error(`Failed to remove source: ${errorMsg}`);
      throw new HttpException(errorMsg, HttpStatus.BAD_GATEWAY);
    }
  }
  
  async getStreamUrl(name: string): Promise<{ name: string; url: string }> {
    this.logger.log(`Getting stream URL for ${name}`);
    const streamUrl = `${this.streamServerUrl}/stream?src=${encodeURIComponent(name)}&video=copy`;
    return { name, url: streamUrl };
  }
} 