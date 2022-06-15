import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateItemsDto } from "./dto/create-items.dto";
import { ItemsInput } from "./inputs/items.input";
import { ItemsService } from "./items.service";

@Resolver()
export class ItemsResolver {
    constructor(
    private itemsService: ItemsService,
    ) {}

    @Query(() => String)
    async hello() {
    return "Hello Items";
    }

    @Query(() => [CreateItemsDto])
    async allItems(){
        return this.itemsService.findAll()
    }

    @Mutation(() => [CreateItemsDto])
    async createItems(@Args('input') input: ItemsInput){
        return this.itemsService.create(input)
    }


}