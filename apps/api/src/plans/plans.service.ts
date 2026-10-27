import { Injectable, NotFoundException } from "@nestjs/common";
import { PLANS } from "./plans.data";

@Injectable()
export class PlansService {
  findAll() {
    return PLANS;
  }
  findOne(name: string) {
    const plan = PLANS.find(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );
    if (!plan)
      throw new NotFoundException(`Insurance plan '${name}' was not found`);
    return plan;
  }
}
