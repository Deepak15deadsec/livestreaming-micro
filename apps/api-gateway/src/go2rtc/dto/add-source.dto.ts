export class AddSourceDto {
  name: string;
  url: string;
  transport?: 'tcp' | 'udp';
} 