import { Router } from "express";
import { expressRouterAdapter } from "../adapters/express-router-adapter";
import { makeSignUpController } from "../factorys/signup-factory";

export default (router: Router): void => {
  router.post("/sign-up", expressRouterAdapter(makeSignUpController()));
};
