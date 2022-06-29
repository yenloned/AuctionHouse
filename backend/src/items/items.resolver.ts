import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { ItemsService } from './items.service';

@Resolver()
export class ItemsResolver {
    constructor(
        private itemsService: ItemsService
    ){}

    @Query(() => String)
    async hello(){
        return "fuck you user"
    }
}
