import { DBOperationException, ResourceNotFoundException } from "../../common/exceptions.js"
import { ServiceResponseFailure, ServiceResponseSuccess } from "../../common/service_response.js"
import { Challenge } from "../models/Challenge.js"


export const getAll = async () => {
  return new ServiceResponseSuccess(
    await Challenge.find({})
  )
}

export const createChallenge = async (challenge) => {
  try {
    const newChallenge = new Challenge(challenge)
    await newChallenge.save()
    return new ServiceResponseSuccess(
      newChallenge,
      true,
    )
  } catch (e) {
    console.log(e);
    return new ServiceResponseFailure(
      new DBOperationException()
    )
  }
}
export const getChallengeById = async (challengeId) => {
  try {
    let challenge = await Challenge.findById(challengeId, '-__v')

    if (!challenge) return new ServiceResponseFailure(
      new ResourceNotFoundException(
        'Challenge not found',
      )
    )
      
    return new ServiceResponseSuccess(
      challenge,
    )
  } catch (e) {
    console.log(e);
    return new ServiceResponseFailure(
      new DBOperationException()
    )
  }
}
export const getChallengeTestsById = async (challengeId) => {
  try {
    const challenge = await Challenge.findById(challengeId)

    if (!challenge) return ServiceResponseFailure(
      new ResourceNotFoundException(
        'Challenge not found',
      )
    )
    return new ServiceResponseSuccess({
      func_name: challenge.func_name,
      tests: challenge.tests
    }) 

  } catch (e) {
    console.error(e);
    return new ServiceResponseFailure(
      new DBOperationException()
    )
  }
}

export const getChallengesByCategorie = async (categorie) => {
  try {
    const challenges = await Challenge.find({ categorie: categorie });
    return new ServiceResponseSuccess(
      challenges,
    )
  } catch (e) {
    console.error(e);
    return new ServiceResponseFailure(
      new DBOperationException()
    )
  }
}
