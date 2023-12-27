import * as challengeService from "../services/challenge.service.js";

export const getAll = async (req, res) => {
  const { code, data } = await challengeService.getAll();
  return res.status(code).json(data);
}
export const createChallenge = async (req, res) => {
  const { code, data } = await challengeService.createChallenge(req.body);
  return res.status(code).json(data);
}

export const getChallengeById = async (req, res) => {
  const { code, data } = await challengeService.getChallengeById(req.params.id);
  return res.status(code).json(data);
}

export const getChallengeTestsById = async (req, res) => {
  const { code, data } = await challengeService.getChallengeTestsById(req.params.id);
  return res.status(code).json(data);
}
export const getChallengesByCategorie = async (req, res) => {
  const { code, data } = await challengeService.getChallengesByCategorie(req.params.category);
  return res.status(code).json(data);
}
