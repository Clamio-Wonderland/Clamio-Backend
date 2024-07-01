import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { CreateCommunityDto } from 'src/dto/createCommunityDto';
import { Community } from 'src/schema/community-schema';
import { DynamoDBService } from 'src/aws/dynamodb.service';

@Injectable()
export class CommunityService {
  private mapper: DataMapper;

  constructor(@Inject(DynamoDBService) dynamoDBService: DynamoDBService) {
    this.mapper = new DataMapper({
      client: dynamoDBService.getClient(),
    });
  }

  async createCommunity(
    createCommunityDto: CreateCommunityDto,
  ): Promise<Community> {
    const { name, creator_id, description, thumbnail_url } = createCommunityDto;
    const slug = `${name}-${uuidv4()}`;

    const community = Object.assign(new Community(), {
      id: Date.now(), // Example way to generate ID, consider using a better unique ID strategy
      creator_id,
      name,
      description,
      thumbnail_url,
      slug,
    });

    // Save the community to DynamoDB
    await this.mapper.put({ item: community });

    return community;
  }
}
