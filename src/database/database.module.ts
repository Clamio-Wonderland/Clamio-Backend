import { Global, Module } from "@nestjs/common";
import '../config/dynamoose.config'

@Global()
@Module({
    providers: [],
    exports: []
})

export class DatabaseModule {}