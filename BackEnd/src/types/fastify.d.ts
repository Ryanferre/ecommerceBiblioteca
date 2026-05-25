import "fastify";
import { ServiceTokenPayload } from "../auth/verifyServiceToken";

declare module "fastify" {
  interface FastifyRequest {
    service: ServiceTokenPayload;
  }
}