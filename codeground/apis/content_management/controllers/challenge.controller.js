import * as challengeService from "../services/challenge.service.js";

export const getAll = async (req, res) => {
  const serviceResponse = await challengeService.getAll();
  return res
    .status(serviceResponse.getHttpStatus())
    .json(serviceResponse.getHttpResponse());
}
export const createChallenge = async (req, res) => {
  const serviceResponse = await challengeService.createChallenge(req.body);
  return res
    .status(serviceResponse.getHttpStatus())
    .json(serviceResponse.getHttpResponse());
}

export const getChallengeById = async (req, res) => {
  const serviceResponse = await challengeService.getChallengeById(req.params.id);
  return res
    .status(serviceResponse.getHttpStatus())
    .json(serviceResponse.getHttpResponse());
}

export const getChallengeTestsById = async (req, res) => {
  const serviceResponse = await challengeService.getChallengeTestsById(req.params.id);
  return res
    .status(serviceResponse.getHttpStatus())
    .json(serviceResponse.getHttpResponse());
}
export const getChallengesByCategorie = async (req, res) => {
  const serviceResponse = await challengeService.getChallengesByCategorie(req.params.category);
  return res
    .status(serviceResponse.getHttpStatus())
    .json(serviceResponse.getHttpResponse());
}
