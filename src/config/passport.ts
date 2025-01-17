import passport from "passport";
import { ObjStructure } from "../types/document";
passport.serializeUser(function (user: ObjStructure, done) {
  done(null, user);
});

passport.deserializeUser(function (user: ObjStructure, done) {
  done(null, user);
});
